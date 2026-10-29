// Approved editorial corrections, applied at build time to the verbatim archive text.
// The archive itself is never edited. Each `before` must occur exactly once in its block,
// otherwise the build fails, so a correction can never silently drift or double-apply.
// Human-readable log: docs/website-architecture/17-approved-corrections-log.md

export type Correction = {
  id: string;
  block: string;
  field?: 'text' | 'heading';
  before: string;
  after: string;
  kind: 'spelling' | 'capitalization' | 'punctuation' | 'temporary omission';
  approval: string;
};

export const corrections: Correction[] = [
  { id: 'E-01', block: 'TT-INS-002-B06', before: 'rexactlyan reverting', after: 'rather than reverting', kind: 'spelling', approval: 'D-11' },
  { id: 'E-02', block: 'TT-INS-004-B02', before: 'buil9work', after: 'busywork', kind: 'spelling', approval: 'D-11; intended word confirmed by the company' },
  { id: 'E-03', block: 'TT-PG-004-B04', before: 'Kranthi Architects enterprise-grade', after: 'Kranthi architects enterprise-grade', kind: 'capitalization', approval: 'D-11' },
  { id: 'E-04a', block: 'TT-PG-004-B04', before: "TechTranspire's financial backbone", after: "Tech Transpire's financial backbone", kind: 'spelling', approval: 'D-11' },
  { id: 'E-04b', block: 'TT-INS-010-B10', before: 'CTA: Talk to TechTranspire >', after: 'CTA: Talk to Tech Transpire >', kind: 'spelling', approval: 'D-11 (link URL untouched)' },
  { id: 'E-09', block: 'TT-INS-003-B06', before: ' Twelve other programs subsequently replicated it.', after: '', kind: 'temporary omission', approval: 'D-24; restore when C-14 is verified' },
  { id: 'F-01', block: 'TT-PG-001-B02', before: 'transformation points - moments', after: 'transformation points, moments', kind: 'punctuation', approval: 'F-01–F-07 approval (punctuation only)' },
  { id: 'F-02', block: 'TT-PG-001-B03', before: 'different directions invisible', after: 'different directions, invisible', kind: 'punctuation', approval: 'F-01–F-07 approval (punctuation only)' },
  { id: 'F-03a', block: 'TT-PG-001-B05', before: 'understands it not dependent', after: 'understands it, not dependent', kind: 'punctuation', approval: 'F-01–F-07 approval (punctuation only)' },
  { id: 'F-03b', block: 'TT-PG-001-B05', before: 'actually delivered then we', after: 'actually delivered, then we', kind: 'punctuation', approval: 'F-01–F-07 approval (punctuation only)' },
  { id: 'F-04a', block: 'TT-PG-001-B07', before: 'bring clarity not simply', after: 'bring clarity, not simply', kind: 'punctuation', approval: 'F-01–F-07 approval (punctuation only)' },
  { id: 'F-04b', block: 'TT-PG-002-B06', before: 'bring clarity not simply', after: 'bring clarity, not simply', kind: 'punctuation', approval: 'F-01–F-07 approval (punctuation only)' },
  { id: 'F-07a', block: 'TT-INS-008-B01', before: 'Handoffs - Not the Steps', after: 'Handoffs — Not the Steps', kind: 'punctuation', approval: 'F-01–F-07 approval (punctuation only)' },
  { id: 'F-07b', block: 'TT-INS-008-B02', field: 'heading', before: 'Handoffs - Not the Steps', after: 'Handoffs — Not the Steps', kind: 'punctuation', approval: 'F-01–F-07 approval (punctuation only)' },
];

// Corrections to Insights Sheet fields (card title), keyed by insight ID.
export const sheetCorrections: Record<string, { id: string; field: 'Title'; before: string; after: string }[]> = {
  'TT-INS-008': [{ id: 'F-07c', field: 'Title', before: 'Handoffs - Not the Steps', after: 'Handoffs — Not the Steps' }],
};

function countOccurrences(haystack: string, needle: string) {
  let n = 0;
  for (let i = haystack.indexOf(needle); i >= 0; i = haystack.indexOf(needle, i + needle.length)) n++;
  return n;
}

export function applyTo<T extends { block_id: string; heading: string; text: string[] }>(block: T): T {
  const mine = corrections.filter((c) => c.block === block.block_id);
  if (!mine.length) return block;
  let heading = block.heading;
  let text = [...block.text];
  for (const c of mine) {
    if (c.field === 'heading') {
      if (countOccurrences(heading, c.before) !== 1) throw new Error(`${c.id}: expected one match in ${c.block} heading`);
      heading = heading.replace(c.before, c.after);
    } else {
      const hits = text.reduce((n, t) => n + countOccurrences(t, c.before), 0);
      if (hits !== 1) throw new Error(`${c.id}: expected one match in ${c.block}, found ${hits}`);
      text = text.map((t) => (t.includes(c.before) ? t.replace(c.before, c.after) : t));
    }
  }
  return { ...block, heading, text };
}

export function correctSheetField(insightId: string, field: 'Title', value: string) {
  for (const c of sheetCorrections[insightId] ?? []) {
    if (c.field !== field) continue;
    if (countOccurrences(value, c.before) !== 1) throw new Error(`${c.id}: expected one match in ${insightId} ${field}`);
    value = value.replace(c.before, c.after);
  }
  return value;
}
