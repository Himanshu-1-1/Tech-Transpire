// Insights: card fields come verbatim from the Insights Sheet export; headline and standfirst
// from each article's banner block (D-09). Classification follows 06 §8 and 08 §3.4.
import sheetCsv from '../../../docs/website-architecture/source-archive/insights-index-sheet.csv?raw';
import raw from '../../../docs/website-architecture/data/content-blocks.json';
import { block, blocksOf, lines } from './content';
import { correctSheetField } from './corrections';
import { isVisibleInsight } from './routes';

export type InsightType = 'case-study' | 'perspective' | 'guide';
export const TYPE_LABEL: Record<InsightType, string> = { 'case-study': 'Case study', perspective: 'Perspective', guide: 'Guide' };

type Meta = {
  slug: string;
  type: InsightType;
  industry?: string;
  outcomes: string[];
  expertise: { label: string; href: string };
  related: string[];
  cover: string;
};

// Expertise links point at /services anchors until a component has its own page.
const svc = (label: string, anchor = 'components') => ({ label, href: `/services#${anchor}` });
const recovery = { label: 'Transformation Recovery', href: '/services/transformation-recovery' };

const META: Record<string, Meta> = {
  'TT-INS-001': { slug: 'mastering-kaizen-events', type: 'guide', industry: 'Healthcare', outcomes: ['Efficient Operations', 'Sustainable Transformation'], expertise: svc('Clarity & Discovery'), related: ['TT-INS-002', 'TT-INS-005', 'TT-INS-010'], cover: 'TT-AS-008' },
  'TT-INS-002': { slug: 'two-quarters-of-migration-work-cleared-in-a-single-day', type: 'case-study', industry: 'Healthcare', outcomes: ['Improved Performance'], expertise: recovery, related: ['TT-INS-003', 'TT-INS-008', 'TT-INS-001'], cover: 'TT-AS-009' },
  'TT-INS-003': { slug: 'seven-year-migration-closed-in-19-hours', type: 'case-study', industry: 'Healthcare', outcomes: ['Improved Performance'], expertise: recovery, related: ['TT-INS-007', 'TT-INS-002', 'TT-INS-001'], cover: 'TT-AS-010' },
  'TT-INS-004': { slug: 'weekend-scrum-to-kanban-migration-across-nine-teams', type: 'case-study', industry: 'Consumer technology', outcomes: ['Efficient Operations'], expertise: svc('Execution & Delivery'), related: ['TT-INS-008', 'TT-INS-009', 'TT-INS-002'], cover: 'TT-AS-011' },
  'TT-INS-005': { slug: 'value-stream-mapping-9-5-hours-of-work-in-208-days', type: 'case-study', industry: 'Healthcare', outcomes: ['Improved Performance', 'Efficient Operations'], expertise: svc('Clarity & Discovery'), related: ['TT-INS-010', 'TT-INS-008', 'TT-INS-001'], cover: 'TT-AS-012' },
  'TT-INS-006': { slug: 'executing-the-wrong-plan', type: 'perspective', outcomes: ['Better Decisions'], expertise: svc('Clarity & Discovery'), related: ['TT-INS-008', 'TT-INS-005', 'TT-INS-009'], cover: 'TT-AS-013' },
  'TT-INS-007': { slug: 'the-19-hour-project-rapid-execution', type: 'perspective', industry: 'Healthcare', outcomes: ['Improved Performance'], expertise: recovery, related: ['TT-INS-003', 'TT-INS-002', 'TT-INS-001'], cover: 'TT-AS-014' },
  'TT-INS-008': { slug: 'look-at-the-handoffs-not-the-steps', type: 'perspective', industry: 'Healthcare', outcomes: ['Efficient Operations'], expertise: svc('Clarity & Discovery'), related: ['TT-INS-002', 'TT-INS-005', 'TT-INS-006'], cover: 'TT-AS-015' },
  'TT-INS-009': { slug: 'decentralized-purchasing-destroys-margins', type: 'perspective', industry: 'Healthcare', outcomes: ['Efficient Operations'], expertise: svc('Execution & Delivery'), related: ['TT-INS-008', 'TT-INS-004', 'TT-INS-010'], cover: 'TT-AS-016' },
  'TT-INS-010': { slug: 'why-transformation-programs-fail-after-a-strong-start', type: 'perspective', industry: 'Healthcare', outcomes: ['Sustainable Transformation'], expertise: svc('Adoption & Outcomes'), related: ['TT-INS-005', 'TT-INS-001', 'TT-INS-009'], cover: 'TT-AS-017' },
};

function parseCsv(text: string): Record<string, string>[] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (ch === '"') quoted = false;
      else field += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ',') { row.push(field); field = ''; }
    else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i++;
      row.push(field); field = '';
      if (row.some((f) => f !== '')) rows.push(row);
      row = [];
    } else field += ch;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  const [header, ...body] = rows;
  return body.map((r) => Object.fromEntries(header.map((h, i) => [h, r[i] ?? ''])));
}

const docToInsight = new Map(
  (raw as { source_id: string; source_document: string }[])
    .filter((b) => b.source_id.startsWith('TT-INS'))
    .map((b) => [b.source_document.replace('Google Doc ', ''), b.source_id]),
);

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export type Insight = Meta & {
  id: string;
  cardTitle: string;
  h1: string;
  standfirst: string;
  excerpt: string;
  author: string;
  category: string;
  readTime: string;
  dateIso: string;
  dateLabel: string;
  hasAttribution: boolean;
};

export const insights: Insight[] = parseCsv(sheetCsv)
  .filter((r) => r.published === 'TRUE')
  .map((r) => {
    const id = docToInsight.get(r.doc_id);
    if (!id || !META[id]) throw new Error(`Insights Sheet row without an archived article: ${r.Title}`);
    const [m, d, y] = r.Date.split('/').map(Number);
    const [h1, standfirst] = lines(block(`${id}-B01`));
    return {
      id,
      ...META[id],
      cardTitle: correctSheetField(id, 'Title', r.Title),
      h1,
      standfirst,
      excerpt: r.Excerpt,
      author: r.Author,
      category: r.Category,
      readTime: r['Read Time'],
      dateIso: `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`,
      dateLabel: `${MONTHS[m - 1]} ${d}, ${y}`,
      hasAttribution: blocksOf(id).some((b) => b.text.some((t) => /prior to founding Tech Transpire/.test(t))),
    };
  })
  .sort((a, b) => b.dateIso.localeCompare(a.dateIso) || a.id.localeCompare(b.id));

/** Insights published in this build: all in review; only fully verified ones in public. */
export const visibleInsights = insights.filter((i) => isVisibleInsight(i.id));
export const visibleById = (ids: string[]) => ids.filter(isVisibleInsight).map(insightById);

export const insightById = (id: string) => {
  const i = insights.find((x) => x.id === id);
  if (!i) throw new Error(`Unknown insight ${id}`);
  return i;
};
export const insightHref = (i: Insight) => `/insights/${i.slug}`;
