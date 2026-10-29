// Reads the Phase 1 content blocks (docs/website-architecture/data/content-blocks.json) and turns
// the source documents' table rows into typed structures. Text is never rewritten here: the only
// changes are the approved corrections in ./corrections.ts.
import raw from '../../../docs/website-architecture/data/content-blocks.json';
import { applyTo } from './corrections';

export type Block = {
  block_id: string;
  source_id: string;
  block_type: string;
  heading: string;
  text: string[];
};

const all: Block[] = (raw as Block[]).map((b) => applyTo(b));
const byId = new Map(all.map((b) => [b.block_id, b]));

export function block(id: string): Block {
  const b = byId.get(id);
  if (!b) throw new Error(`Unknown content block ${id}`);
  return b;
}

export const blocksOf = (sourceId: string) => all.filter((b) => b.source_id === sourceId);

// Column labels and image references that the source documents use as table markup.
const MARKERS = new Set(['Title', 'Body', 'Tag', 'Text', 'Label', 'Headline', 'Subtext', 'Background (optional)', 'Attribution', '>']);
export const ICON_KEYS = new Set(['alert', 'target', 'process', 'clock', 'search', 'lightning', 'star', 'check', 'shield', 'people', 'growth', 'chart', 'settings', 'tool', 'repeat', 'list', 'zap']);

export const lines = (b: Block) => b.text.filter((l) => !MARKERS.has(l) && !l.startsWith('GDRIVE:'));

function pairs(values: string[], id: string): [string, string][] {
  if (values.length % 2) throw new Error(`${id}: expected label/value pairs`);
  const out: [string, string][] = [];
  for (let i = 0; i < values.length; i += 2) out.push([values[i], values[i + 1]]);
  return out;
}

export type Card = { icon: string; title: string; body: string };
export function cards(b: Block): Card[] {
  const l = lines(b);
  const out: Card[] = [];
  let i = 0;
  while (i + 2 < l.length) {
    if (!ICON_KEYS.has(l[i])) throw new Error(`${b.block_id}: unknown icon key "${l[i]}" — add it to ICON_KEYS and Icon.astro`);
    out.push({ icon: l[i], title: l[i + 1], body: l[i + 2] });
    i += 3;
  }
  // Only a single dangling icon key may remain (E-05 is restored by the article template).
  if (l.length - i > 1 || (l.length - i === 1 && !ICON_KEYS.has(l[i]))) throw new Error(`${b.block_id}: unparsed card lines`);
  return out;
}

export const steps = (b: Block) => pairs(lines(b), b.block_id).map(([title, body]) => ({ title, body }));
export const stats = (b: Block) => pairs(lines(b), b.block_id).map(([value, label]) => ({ value, label }));
export const fitlist = (b: Block) => pairs(lines(b), b.block_id).map(([kind, text]) => ({ fit: kind === 'yes', text }));

export type Callout = { title: string; lead?: string; body: string[]; tag?: string; attribution?: string };
const ATTRIBUTION = /^Engagement (led|facilitated) by /;
export function callout(b: Block): Callout {
  const [title, ...rest] = lines(b);
  const out: Callout = { title, body: [] };
  for (const l of rest) {
    if (ATTRIBUTION.test(l)) out.attribution = l;
    else if (l.includes(' · ') && l.length < 160) out.tag = l;
    else if (!out.lead) out.lead = l;
    else out.body.push(l);
  }
  return out;
}

// Legacy CTA targets are normalised to the new URL map (10-seo-url-plan, D-20).
export type Cta = { label: string; href: string };
export function ctas(b: Block): Cta[] {
  return b.text
    .map((t) => t.match(/^CTA2?: (.+?) > (\S+)$/))
    .filter((m): m is RegExpMatchArray => !!m)
    .map(([, label, url]) => ({ label, href: newUrl(url, label) }));
}

export function newUrl(legacy: string, label = ''): string {
  const path = legacy.replace(/^https?:\/\/www\.techtranspire\.com/, '').replace(/\/$/, '') || '/';
  if (/case stud/i.test(label) || path === '/blogs') return '/insights/case-studies';
  if (path === '/contact-us') {
    if (/stalled/i.test(label)) return '/contact-us?interest=recovery';
    if (/discovery/i.test(label)) return '/contact-us?interest=discovery';
    return '/contact-us';
  }
  if (path === '/home') return '/';
  return path;
}

// The paragraph of a block that contains `fragment`, verbatim. Fails the build if it is missing.
export function paragraph(blockId: string, fragment: string): string {
  const p = block(blockId).text.find((t) => t.includes(fragment));
  if (!p) throw new Error(`${blockId}: no paragraph contains "${fragment}"`);
  return p;
}

// Home "Sounds Familiar?" carousel: statement followed by its prompt.
export const carouselPairs = (b: Block) => pairs(lines(b), b.block_id).map(([statement, prompt]) => ({ statement, prompt }));

export type Person = { name: string; role: string; bio: string[]; linkedin: string; photoDriveId: string };
export function team(b: Block): Person[] {
  const people: Person[] = [];
  let current: string[] = [];
  let drive = '';
  const flush = () => {
    if (!current.length) return;
    const [name, role, ...rest] = current;
    const linkedin = rest.pop() ?? '';
    people.push({ name: name.trim(), role, bio: rest, linkedin, photoDriveId: drive });
  };
  for (const t of b.text) {
    if (t.startsWith('GDRIVE:')) {
      flush();
      current = [];
      drive = t.replace('GDRIVE:', '').trim();
    } else if (!['Name', 'Role', 'Bio', 'LinkedIn'].includes(t)) current.push(t);
  }
  flush();
  return people;
}
