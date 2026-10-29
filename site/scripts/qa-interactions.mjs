// Browser QA of interactions against a running preview (npm run preview -- --port 4322).
//   node scripts/qa-interactions.mjs [--base=http://localhost:4322]
// Checks: no JS errors, no horizontal overflow at 320 px, mobile menu (open, Escape, link),
// method graphic keyboard focus, magnetic CTA, cursor halo never over form fields, reduced
// motion shows all content, reading progress, contact form validation and honest failure state,
// legacy redirects and the API status when no integration is configured.
import puppeteer from 'puppeteer-core';
import { existsSync } from 'node:fs';

const base = process.argv.find((a) => a.startsWith('--base='))?.split('=')[1] ?? 'http://localhost:4322';
const chrome = process.env.CHROME_PATH ?? ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', '/usr/bin/google-chrome'].find((p) => existsSync(p));
const pages = ['/', '/services', '/services/transformation-recovery', '/industries', '/industries/healthcare', '/insights', '/insights/case-studies', '/insights/look-at-the-handoffs-not-the-steps', '/about-us', '/contact-us', '/privacy-policy', '/404'];
const results = [];
const check = (name, ok, detail = '') => { results.push({ name, ok, detail }); console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`); };

const browser = await puppeteer.launch({ executablePath: chrome, headless: true });
try {
  // 1. JS errors and overflow on every page at 320 px and 1440 px
  for (const w of [320, 1440]) {
    for (const p of pages) {
      const page = await browser.newPage();
      const errs = [];
      page.on('pageerror', (e) => errs.push(e.message));
      page.on('console', (m) => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push(m.text()); });
      await page.setViewport({ width: w, height: 900 });
      await page.goto(base + p, { waitUntil: 'networkidle0' });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      check(`${p} @${w}px: no JS errors, no horizontal overflow`, !errs.length && overflow <= 0, [...errs, overflow > 0 ? `overflow ${overflow}px` : ''].filter(Boolean).join('; '));
      await page.close();
    }
  }

  // 2. Mobile menu
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.goto(base + '/', { waitUntil: 'networkidle0' });
    await page.click('.menu-btn');
    await new Promise((r) => setTimeout(r, 350));
    const open = await page.evaluate(() => ({ exp: document.querySelector('.menu-btn').getAttribute('aria-expanded'), hidden: document.getElementById('mobile-nav').hidden }));
    check('Mobile menu opens (aria-expanded, panel visible)', open.exp === 'true' && !open.hidden);
    await page.keyboard.press('Escape');
    await new Promise((r) => setTimeout(r, 350));
    const closed = await page.evaluate(() => ({ exp: document.querySelector('.menu-btn').getAttribute('aria-expanded'), hidden: document.getElementById('mobile-nav').hidden, focus: document.activeElement?.className }));
    check('Escape closes the menu and returns focus to the button', closed.exp === 'false' && closed.hidden && /menu-btn/.test(closed.focus));
    await page.click('.menu-btn');
    await new Promise((r) => setTimeout(r, 350));
    await page.click('#mobile-nav a[href="/services"]');
    const navigated = await page.waitForFunction(() => location.pathname === '/services', { timeout: 8000 }).then(() => true, () => false);
    check('Menu link navigates', navigated, page.url());
    await page.close();
  }

  // 3. Desktop interactions
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(base + '/', { waitUntil: 'networkidle0' });
    const fx = await page.evaluate(() => document.documentElement.classList.contains('fx-pointer'));
    check('Pointer effects enabled on a desktop pointer', fx);
    const btn = await page.$('.hero [data-magnetic]');
    const box = await btn.boundingBox();
    await page.mouse.move(box.x + box.width * 0.9, box.y + box.height * 0.5, { steps: 4 });
    await new Promise((r) => setTimeout(r, 120));
    const mx = await page.evaluate(() => getComputedStyle(document.querySelector('.hero [data-magnetic]')).getPropertyValue('--mx'));
    check('Magnetic CTA follows the pointer by a few px', parseFloat(mx) > 0 && parseFloat(mx) <= 6, `--mx=${mx}`);
    const halo = await page.evaluate(() => document.querySelector('.cursor-ring')?.dataset.state);
    check('Cursor ring morphs over a button', halo === 'button');
    const dotPos = await page.evaluate(() => document.querySelector('.cursor-dot')?.style.transform ?? '');
    const [dx, dy] = (dotPos.match(/-?[\d.]+/g) ?? []).map(Number).slice(1);
    check('Cursor dot sits exactly at the pointer (±1px)', Math.abs(dx - (box.x + box.width * 0.9)) <= 1 && Math.abs(dy - (box.y + box.height * 0.5)) <= 1, dotPos);
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    const reached = await page.waitForFunction(() => location.pathname === '/contact-us' && document.getElementById('f-name'), { timeout: 8000 }).then(() => true, () => false);
    check('Magnetic CTA remains clickable (navigates to contact)', reached, page.url());
    await new Promise((r) => setTimeout(r, 500));
    const input = await page.$('#f-name');
    const ib = await input.boundingBox();
    await page.mouse.move(ib.x + 20, ib.y + 10, { steps: 3 });
    await new Promise((r) => setTimeout(r, 80));
    const haloInput = await page.evaluate(() => document.querySelector('.cursor-ring')?.dataset.state ?? '');
    const cursor = await page.evaluate(() => getComputedStyle(document.getElementById('f-name')).cursor);
    check('Over form fields the custom cursor hides and the native text cursor returns', haloInput === 'field' && cursor === 'text', `state=${haloInput} cursor=${cursor}`);
    await page.close();
  }

  // 3b. Client-side navigation (view transitions): interactions re-initialise
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(base + '/', { waitUntil: 'networkidle0' });
    await page.click('.hdr-cta');
    await page.waitForFunction(() => location.pathname === '/contact-us' && document.getElementById('inquiry'), { timeout: 8000 });
    await new Promise((r) => setTimeout(r, 400));
    await page.click('button[type=submit]');
    const errs = await page.evaluate(() => document.querySelectorAll('.field .err').length);
    check('After client-side navigation, the contact form is wired (validation runs)', errs >= 4, `${errs} errors shown`);
    await page.evaluate(() => document.querySelector('a.brand').click());
    await page.waitForFunction(() => location.pathname === '/' && document.querySelector('[data-method]'), { timeout: 8000 });
    await new Promise((r) => setTimeout(r, 400));
    await page.focus('.method-node[data-step="1"]');
    const active = await page.evaluate(() => document.querySelector('[data-method]').dataset.active);
    check('After navigating back, the method graphic is wired', active === '1');
    const cursors = await page.evaluate(() => document.querySelectorAll('.cursor-ring').length);
    check('Exactly one custom cursor after navigations', cursors === 1, `${cursors}`);
    await page.close();
  }

  // 4. Method graphic: keyboard focus highlights the step
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(base + '/#method', { waitUntil: 'networkidle0' });
    await page.focus('.method-node[data-step="2"]');
    const st = await page.evaluate(() => ({ active: document.querySelector('[data-method]').dataset.active, li: document.querySelector('.method-steps li[data-step="2"]').classList.contains('is-active'), segs: document.querySelectorAll('.m-seg.on').length }));
    check('Method node focus highlights its step and the path up to it', st.active === '2' && st.li && st.segs === 3, JSON.stringify(st));
    await page.close();
  }

  // 5. Reduced motion: content visible without scrolling or animation
  {
    const page = await browser.newPage();
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(base + '/', { waitUntil: 'networkidle0' });
    const hidden = await page.evaluate(() => [...document.querySelectorAll('.reveal, .method-steps li, .method-node')].filter((el) => getComputedStyle(el).opacity === '0').length);
    const fx = await page.evaluate(() => document.documentElement.classList.contains('fx-pointer'));
    check('Reduced motion: no content left invisible, pointer effects off', hidden === 0 && !fx, `${hidden} hidden`);
    await page.close();
  }

  // 6. Reading progress on an article
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(base + '/insights/look-at-the-handoffs-not-the-steps', { waitUntil: 'networkidle0' });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await new Promise((r) => setTimeout(r, 200));
    const t = await page.evaluate(() => getComputedStyle(document.querySelector('.reading-progress')).transform);
    const sx = t.startsWith('matrix') ? parseFloat(t.slice(7).split(',')[0]) : 0;
    check('Reading progress reflects scroll position', sx > 0.2 && sx < 1, `scaleX≈${sx.toFixed(2)}`);
    await page.close();
  }

  // 7. Contact form: validation and honest failure state with no integration configured
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(base + '/contact-us?interest=recovery', { waitUntil: 'networkidle0' });
    check('Area of interest preselected from ?interest=', (await page.$eval('#f-interest', (s) => s.value)) === 'recovery');
    await page.click('button[type=submit]');
    const v = await page.evaluate(() => ({ summary: document.getElementById('form-summary').hidden, errs: document.querySelectorAll('.field .err').length, focus: document.activeElement?.id }));
    check('Empty submit shows inline errors and focuses the first field', !v.summary && v.errs >= 4 && v.focus === 'f-name', JSON.stringify(v));
    await page.type('#f-name', 'QA Tester');
    await page.type('#f-company', 'QA Company');
    await page.type('#f-email', 'qa@example.com');
    await page.type('#f-message', 'This is an automated QA submission. Please ignore it.');
    await page.click('#f-consent');
    await new Promise((r) => setTimeout(r, 3200));
    const [apiRes] = await Promise.all([
      page.waitForResponse((r) => r.url().includes('/api/inquiry'), { timeout: 10000 }),
      page.click('button[type=submit]'),
    ]);
    await page.waitForFunction(() => !document.querySelector('button[type=submit]').disabled, { timeout: 5000 });
    const out = await page.evaluate(() => ({ ok: !document.getElementById('form-ok').hidden, msg: document.getElementById('form-summary').textContent }));
    check('Valid submission reaches the server (not blocked by the origin check)', apiRes.status() !== 403, `HTTP ${apiRes.status()}`);
    check('Without Zoho/SMTP configured, the API returns 503 and the visitor sees the failure message (no false success)', apiRes.status() === 503 && !out.ok && /didn't go through/.test(out.msg), out.msg.slice(0, 60));
    await page.close();
  }

  // 8. API and redirects
  const api = await fetch(base + '/api/inquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: 'A' }) });
  check('API rejects invalid data with 422', api.status === 422);
  const home = await fetch(base + '/home', { redirect: 'manual' });
  check('Legacy /home redirects 301 to /', home.status === 301 && /\/$/.test(home.headers.get('location') ?? ''), `${home.status} → ${home.headers.get('location')}`);
  const blogs = await fetch(base + '/blogs', { redirect: 'manual' });
  check('Legacy /blogs redirects 301', blogs.status === 301, `${blogs.status} → ${blogs.headers.get('location')}`);
} finally {
  await browser.close();
}
const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed.`);
if (failed.length) process.exitCode = 1;
