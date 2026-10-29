// Post-build step for the GitHub Pages preview (npm run build:pages).
// The site is served under /Tech-Transpire/, but page templates link to root paths ("/services").
// Astro already prefixes its own assets via `base`; this prefixes every remaining root-relative
// href/src/action/srcset and meta-refresh target, then adds .nojekyll so Pages serves /_astro.
//   node scripts/pages-base.mjs dist-pages
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const BASE = '/Tech-Transpire';
const dir = path.resolve(process.argv[2] ?? 'dist-pages');
const walk = (d) => readdirSync(d).flatMap((f) => {
  const p = path.join(d, f);
  return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : [];
});
// A root-relative path that is not protocol-relative and not already prefixed.
const ROOT = `\\/(?!\\/|${BASE.slice(1)}(?:[/"#?]|$))`;
const attr = new RegExp(`(\\s(?:href|src|action|poster)=")${ROOT}`, 'g');
const refresh = new RegExp(`(url=)${ROOT}`, 'gi');
const srcset = /(\ssrcset=")([^"]*)"/g;

let files = 0;
let changes = 0;
for (const f of walk(dir)) {
  const before = readFileSync(f, 'utf8');
  const after = before
    .replace(attr, (_, a) => (changes++, `${a}${BASE}/`))
    .replace(refresh, (_, a) => (changes++, `${a}${BASE}/`))
    .replace(srcset, (_, a, list) => `${a}${list.split(',').map((s) => s.trim().replace(new RegExp(`^${ROOT}`), () => (changes++, `${BASE}/`))).join(', ')}"`);
  if (after !== before) { writeFileSync(f, after); files++; }
}
writeFileSync(path.join(dir, '.nojekyll'), '');
console.log(`pages-base: ${changes} root links prefixed with ${BASE} in ${files} pages; .nojekyll written`);
