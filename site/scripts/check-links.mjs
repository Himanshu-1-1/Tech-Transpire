// Internal link check over a built site: every href/src/srcset target and #anchor must exist.
//   node scripts/check-links.mjs [dist/client | dist-public/client] [--external]
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv.find((a, i) => i > 1 && !a.startsWith('--')) ?? 'dist/client');
const checkExternal = process.argv.includes('--external');
if (!existsSync(root)) throw new Error(`${root} not found. Build first.`);

// Server routes and redirect sources are valid targets even though no file exists for them.
const serverRoutes = new Set(['/api/inquiry']);
const csv = readFileSync(path.resolve(import.meta.dirname, '../../docs/website-architecture/data/redirects.csv'), 'utf8').trim().split(/\r?\n/).slice(1);
for (const line of csv) { const [source, , action] = line.split(','); if (action === 'redirect' && source.startsWith('/')) serverRoutes.add(source.replace(/\/$/, '')); }

const pages = [];
const walk = (dir) => readdirSync(dir).forEach((f) => { const p = path.join(dir, f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && pages.push(p); });
walk(root);

const ids = new Map();
const idsOf = (file) => {
  if (!ids.has(file)) ids.set(file, new Set([...readFileSync(file, 'utf8').matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  return ids.get(file);
};
const fileFor = (urlPath) => {
  const p = decodeURIComponent(urlPath).replace(/\/$/, '') || '/';
  const candidates = p === '/' ? ['index.html'] : [p.slice(1), `${p.slice(1)}.html`, `${p.slice(1)}/index.html`];
  return candidates.map((c) => path.join(root, c)).find((c) => existsSync(c) && statSync(c).isFile());
};

const problems = [];
const external = new Set();
let checked = 0;
for (const page of pages) {
  const html = readFileSync(page, 'utf8').replace(/<script[\s\S]*?<\/script>/g, '');
  const rel = '/' + path.relative(root, page).replace(/\\/g, '/');
  const urls = [
    ...[...html.matchAll(/\s(?:href|src|action)="([^"]+)"/g)].map((m) => m[1]),
    ...[...html.matchAll(/\ssrcset="([^"]+)"/g)].flatMap((m) => m[1].split(',').map((s) => s.trim().split(/\s+/)[0])),
  ];
  for (const raw of urls) {
    const url = raw.replace(/&amp;/g, '&');
    if (/^(mailto:|tel:|data:|javascript:)/.test(url)) continue;
    if (/^https?:\/\//.test(url)) { if (!url.startsWith('https://www.techtranspire.com')) external.add(url); continue; }
    checked++;
    const [beforeHash, hash] = url.split('#');
    const target = beforeHash.split('?')[0];
    if (!target) { if (hash && !idsOf(page).has(hash)) problems.push(`${rel}: missing anchor #${hash}`); continue; }
    if (!target.startsWith('/')) { problems.push(`${rel}: relative URL "${url}"`); continue; }
    if (serverRoutes.has(target)) continue;
    const file = fileFor(target);
    if (!file) { problems.push(`${rel}: broken link ${url}`); continue; }
    if (hash && file.endsWith('.html') && !idsOf(file).has(hash)) problems.push(`${rel}: ${target} has no #${hash}`);
  }
}

if (checkExternal) {
  for (const url of external) {
    try {
      const res = await fetch(url, { method: 'HEAD', redirect: 'follow' });
      if (res.status >= 400 && res.status !== 405 && res.status !== 999) problems.push(`external ${res.status}: ${url}`);
    } catch (e) { problems.push(`external unreachable: ${url}`); }
  }
}

console.log(`Pages: ${pages.length} · internal links checked: ${checked} · external links: ${external.size}${checkExternal ? ' (checked)' : ' (not fetched; use --external)'}`);
if (problems.length) { console.error(`${problems.length} problem(s):\n` + [...new Set(problems)].map((p) => `  - ${p}`).join('\n')); process.exit(1); }
console.log('All internal links and anchors resolve.');
