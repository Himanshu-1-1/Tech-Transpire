// Full-page screenshots of the built site for design review.
// Usage: npm run build && npx astro preview (in another shell), then
//   node scripts/screenshots.mjs [--pages=/,/services] [--types=sans,serif] [--out=../docs/phase-2-design/screenshots]
// Uses the locally installed Chrome (or CHROME_PATH); no browser download.
import puppeteer from 'puppeteer-core';
import { mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const arg = (name, fallback) => process.argv.find((a) => a.startsWith(`--${name}=`))?.split('=')[1] ?? fallback;
const base = arg('base', 'http://localhost:4321');
const pages = arg('pages', '/').split(',');
const types = arg('types', 'sans').split(',');
const out = path.resolve(arg('out', '../docs/phase-2-design/screenshots'));
const devices = [
  { name: 'desktop', width: 1440, height: 900, scale: 1 },
  { name: 'mobile', width: 390, height: 844, scale: 1.5, mobile: true },
];

const chrome = process.env.CHROME_PATH ?? [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
].find((p) => existsSync(p));
if (!chrome) throw new Error('Chrome not found. Set CHROME_PATH.');

await mkdir(out, { recursive: true });
const browser = await puppeteer.launch({ executablePath: chrome, headless: true, args: ['--hide-scrollbars'] });
try {
  for (const pagePath of pages) {
    for (const type of types) {
      for (const d of devices) {
        const page = await browser.newPage();
        await page.setViewport({ width: d.width, height: d.height, deviceScaleFactor: d.scale, isMobile: !!d.mobile, hasTouch: !!d.mobile });
        const url = `${base}${pagePath}${pagePath.includes('?') ? '&' : '?'}type=${type}`;
        await page.goto(url, { waitUntil: 'networkidle0' });
        await page.evaluate(async () => {
          document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-in'));
          document.querySelectorAll('img[loading="lazy"]').forEach((img) => img.setAttribute('loading', 'eager'));
          await document.fonts.ready;
          await Promise.all([...document.images].filter((i) => !i.complete).map((i) => new Promise((r) => { i.onload = i.onerror = r; })));
        });
        await new Promise((r) => setTimeout(r, 400));
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        if (overflow > 0) {
          console.error(`OVERFLOW ${pagePath} (${d.name}): page is ${overflow}px wider than the viewport`);
          process.exitCode = 1;
        }
        const slug = pagePath === '/' ? 'home' : pagePath.replace(/^\//, '').replace(/[/?=&]/g, '-');
        const file = path.join(out, `${slug}--${type}--${d.name}.jpg`);
        await page.screenshot({ path: file, fullPage: true, type: 'jpeg', quality: 82 });
        console.log('saved', path.relative(process.cwd(), file));
        await page.close();
      }
    }
  }
} finally {
  await browser.close();
}
