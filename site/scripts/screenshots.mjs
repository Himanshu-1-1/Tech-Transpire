// Full-page screenshots of the built site for design review.
//   npm run build && npm run preview -- --port 4322   (in another shell)
//   node scripts/screenshots.mjs --base=http://localhost:4322 [--pages=/,/services] [--devices=desktop,tablet,mobile] [--out=...]
// Captures the settled state (reduced-motion emulation skips entrance animations).
// Fails if any page scrolls horizontally. Uses local Chrome (or CHROME_PATH); no download.
import puppeteer from 'puppeteer-core';
import { mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const arg = (name, fallback) => process.argv.find((a) => a.startsWith(`--${name}=`))?.split('=')[1] ?? fallback;
const base = arg('base', 'http://localhost:4322');
const pages = arg('pages', '/').split(',');
const out = path.resolve(arg('out', '../docs/phase-2-design/screenshots'));
const firstFold = process.argv.includes('--fold');
const all = {
  desktop: { width: 1440, height: 900, scale: 1 },
  tablet: { width: 768, height: 1024, scale: 1, mobile: true },
  mobile: { width: 390, height: 844, scale: 1.5, mobile: true },
};
const devices = arg('devices', 'desktop,tablet,mobile').split(',').map((n) => ({ name: n, ...all[n] }));

const chrome = process.env.CHROME_PATH ?? [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
].find((p) => existsSync(p));
if (!chrome) throw new Error('Chrome not found. Set CHROME_PATH.');

await mkdir(out, { recursive: true });
const browser = await puppeteer.launch({ executablePath: chrome, headless: true, args: ['--hide-scrollbars'] });
const errors = [];
try {
  for (const pagePath of pages) {
    for (const d of devices) {
      const page = await browser.newPage();
      page.on('pageerror', (e) => errors.push(`${pagePath} (${d.name}): ${e.message}`));
      await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
      await page.setViewport({ width: d.width, height: d.height, deviceScaleFactor: d.scale, isMobile: !!d.mobile, hasTouch: !!d.mobile });
      await page.goto(`${base}${pagePath}`, { waitUntil: 'networkidle0' });
      await page.evaluate(async () => {
        document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-in'));
        document.querySelectorAll('img[loading="lazy"]').forEach((img) => img.setAttribute('loading', 'eager'));
        await document.fonts.ready;
        await Promise.all([...document.images].filter((i) => !i.complete).map((i) => new Promise((r) => { i.onload = i.onerror = r; })));
      });
      await new Promise((r) => setTimeout(r, 300));
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (overflow > 0) errors.push(`OVERFLOW ${pagePath} (${d.name}): ${overflow}px wider than the viewport`);
      const slug = pagePath === '/' ? 'home' : pagePath.replace(/^\//, '').replace(/[/?=&]/g, '-');
      const file = path.join(out, `${slug}--${d.name}${firstFold ? '--fold' : ''}.jpg`);
      await page.screenshot({ path: file, fullPage: !firstFold, type: 'jpeg', quality: 82 });
      console.log('saved', path.basename(file));
      await page.close();
    }
  }
} finally {
  await browser.close();
}
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
