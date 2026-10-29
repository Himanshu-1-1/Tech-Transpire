// Content integrity checks for the PUBLIC build (run `npm run build:public` first).
//   node --experimental-strip-types scripts/check-content.mjs
// 1. Verbatim: every archived line of every migrated block appears in the built page,
//    after only the approved corrections (src/lib/corrections.ts).
// 2. Gating: nothing pending, withdrawn or in review leaks into the public build.
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { applyTo } from '../src/lib/corrections.ts';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist-public');
const blocks = JSON.parse(readFileSync(path.join(root, '../docs/website-architecture/data/content-blocks.json'), 'utf8')).map(applyTo);
if (!existsSync(dist)) throw new Error('dist-public not found. Run: npm run build:public');

const decode = (s) => s
  .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
  .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
  .replace(/&nbsp;/g, ' ').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
  .replace(/\s+/g, ' ');
const norm = (s) => s.replace(/\s+/g, ' ').trim();
const page = (file) => (existsSync(path.join(dist, file)) ? decode(readFileSync(path.join(dist, file), 'utf8')) : null);

const MARKERS = new Set(['Title', 'Body', 'Tag', 'Text', 'Label', 'Headline', 'Subtext', 'Background (optional)', 'Attribution', '>', 'yes', 'no']);
const ICONS = new Set(['alert', 'target', 'process', 'clock', 'search', 'lightning', 'star', 'check', 'shield', 'people', 'growth', 'chart', 'settings', 'tool', 'repeat', 'list', 'zap']);
const contentLines = (b) => b.text.filter((l) => !MARKERS.has(l) && !ICONS.has(l) && !/^(GDRIVE:|CTA2?:|\[LINK|https?:)/.test(l) && !/^\d$/.test(l)).map(norm).filter(Boolean);

// Where each source is published, and which blocks are deliberately not published as-is.
const sources = {
  'TT-PG-001': 'index.html',
  'TT-PG-002': 'services.html',
  'TT-PG-004': 'about-us.html',
};
const slugs = {
  'TT-INS-001': 'mastering-kaizen-events', 'TT-INS-002': 'two-quarters-of-migration-work-cleared-in-a-single-day', 'TT-INS-003': 'seven-year-migration-closed-in-19-hours',
  'TT-INS-004': 'weekend-scrum-to-kanban-migration-across-nine-teams', 'TT-INS-005': 'value-stream-mapping-9-5-hours-of-work-in-208-days', 'TT-INS-006': 'executing-the-wrong-plan',
  'TT-INS-007': 'the-19-hour-project-rapid-execution', 'TT-INS-008': 'look-at-the-handoffs-not-the-steps', 'TT-INS-009': 'decentralized-purchasing-destroys-margins', 'TT-INS-010': 'why-transformation-programs-fail-after-a-strong-start',
};
for (const [id, slug] of Object.entries(slugs)) sources[id] = `insights/${slug}.html`;
// Deliberate exclusions, each with its reason:
//   TT-PG-001-B08  Home stats: gated claims (C-01 withdrawn; C-04–C-07 pending)
//   TT-PG-004-B04  Team profiles: publish per person when confirmed (D-07)
//   TT-PG-001-B07  Home fit list: consolidated onto /services#fit (D-14); Home shows a teaser
//   TT-PG-001-B02  "Clarity before Execution." banner headline replaced by the D-01 brand statement
//                  (kept on Home as the Method eyebrow, and as the first company value)
//   TT-PG-001-B01  "Want to learn more?": carousel navigation prompt, not used without the carousel
const notVerbatim = new Set(['TT-PG-001-B08', 'TT-PG-004-B04', 'TT-PG-001-B07', 'TT-PG-001-B01:Want to learn more?']);

const failures = [];
let checked = 0;
for (const b of blocks) {
  const file = sources[b.source_id];
  if (!file || notVerbatim.has(b.block_id)) continue;
  const html = page(file);
  if (html === null) { failures.push(`${b.block_id}: page ${file} missing`); continue; }
  for (const line of contentLines(b)) {
    if (notVerbatim.has(`${b.block_id}:${line}`)) continue;
    checked++;
    if (!html.includes(line)) failures.push(`${b.block_id} → ${file}: missing "${line.slice(0, 80)}…"`);
  }
  if (b.heading) { checked++; if (!html.includes(norm(b.heading))) failures.push(`${b.block_id} → ${file}: heading missing "${b.heading}"`); }
}

// Gating checks.
const all = Object.values(sources).map((f) => [f, page(f) ?? '']).concat([['contact-us.html', page('contact-us.html') ?? ''], ['insights.html', page('insights.html') ?? '']]);
const gates = [
  ['review banner', (t) => t.includes('Review build')],
  ['withdrawn C-01 label', (t) => t.includes('Revenue impact')],
  ['E-09 withheld sentence', (t) => t.includes('Twelve other programs subsequently replicated it')],
];
for (const [file, text] of all) for (const [name, leak] of gates) if (leak(text)) failures.push(`GATE ${name} leaked into ${file}`);
for (const f of all.map(([f]) => f)) {
  const raw = readFileSync(path.join(dist, f), 'utf8');
  if (raw.includes('class="flag')) failures.push(`GATE review flag rendered in ${f}`);
  if (raw.includes('noindex')) failures.push(`GATE noindex left in ${f}`);
}
const home = readFileSync(path.join(dist, 'index.html'), 'utf8');
if (home.includes('class="results"')) failures.push('GATE results band rendered with unverified claims');
if (existsSync(path.join(dist, 'industries.html'))) failures.push('GATE Industries built before N-05 approval');
if (existsSync(path.join(dist, 'privacy-policy.html'))) failures.push('GATE Privacy Policy draft built before legal approval');

console.log(`Verbatim lines checked: ${checked}`);
if (failures.length) {
  console.error(`${failures.length} problem(s):\n` + failures.map((f) => `  - ${f}`).join('\n'));
  process.exit(1);
}
console.log('All content and gating checks passed.');
