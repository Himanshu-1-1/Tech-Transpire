// "Selected Experience" on Home. Values and labels come from the Home stats block
// (TT-PG-001-B08) or the approved N-15 pattern for the two separate $3M outcomes (D-05).
// A result is public only when its claim is verified and its attribution is known;
// the band needs at least two such results.
import { block, stats } from './content';
import { isVerified, D04_ATTRIBUTION } from './claims';
import { isReview } from './site';
import { insights } from './insights';

export type Result = {
  claim: string;
  value: string;
  label: string;
  source: string;
  attribution?: string;
  attributionPending?: boolean;
  insightId?: string;
  insightSlug?: string;
};

const home = Object.fromEntries(stats(block('TT-PG-001-B08')).map((s) => [s.value, s.label]));
const slug = (id: string) => insights.find((i) => i.id === id)?.slug;

// Order keeps the two $3M outcomes apart so they never read as one figure.
export const results: Result[] = [
  { claim: 'C-05', value: '63%', label: home['63%'], source: 'TT-PG-001-B08', attribution: D04_ATTRIBUTION, insightId: 'TT-INS-005' },
  { claim: 'C-06', value: '$89M', label: home['$89M'], source: 'TT-PG-001-B08', attributionPending: true, insightId: 'TT-INS-009' },
  { claim: 'C-07', value: '7 yrs', label: home['7 yrs'], source: 'TT-PG-001-B08', attribution: D04_ATTRIBUTION, insightId: 'TT-INS-003' },
  { claim: 'C-03', value: '$3M', label: 'Annual savings from purchasing standardization in a healthcare network', source: 'N-15', attributionPending: true, insightId: 'TT-INS-009' },
  { claim: 'C-04', value: '90+', label: home['90+'], source: 'TT-PG-001-B08', attributionPending: true, insightId: 'TT-INS-009' },
  { claim: 'C-02', value: '$3M', label: 'Fraud losses prevented for a global eCommerce business', source: 'N-15', attribution: D04_ATTRIBUTION },
].map((r) => ({ ...r, insightSlug: r.insightId ? slug(r.insightId) : undefined }));

for (const r of results) if (!r.label) throw new Error(`Result ${r.claim}: label not found in source`);

const publicResults = results.filter((r) => isVerified(r.claim) && !r.attributionPending);
export const visibleResults = isReview ? results : publicResults.length >= 2 ? publicResults : [];
