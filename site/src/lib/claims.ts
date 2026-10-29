// Mirror of the claims register (docs/website-architecture/12-gaps-and-decisions.md §3).
// A claim renders on the public site only when its status is 'verified'. Change a status here
// only when the register records the verification.
export type ClaimStatus = 'verified' | 'conditional' | 'pending' | 'withdrawn';

export const claims: Record<string, { status: ClaimStatus; note: string }> = {
  'C-01': { status: 'withdrawn', note: '"$3M+ revenue impact" label withdrawn (D-05)' },
  'C-02': { status: 'pending', note: '$3M fraud losses prevented, global eCommerce' },
  'C-03': { status: 'pending', note: '$3M annual savings, healthcare purchasing standardization' },
  'C-04': { status: 'pending', note: '90+ locations, one supply chain engagement' },
  'C-05': { status: 'pending', note: '63% reduction, 209 → 78 days' },
  'C-06': { status: 'pending', note: '$89M purchasing volume centralized' },
  'C-07': { status: 'pending', note: '7-year initiative closed 2 years early' },
  'C-10': { status: 'conditional', note: '"over a decade": approved if the bio timeline is accurate' },
  'C-11': { status: 'verified', note: 'Lean Six Sigma Black Belt (LSSBB)' },
  'C-12': { status: 'pending', note: 'PMP, Kranthi Kumar Goli' },
  'C-13': { status: 'pending', note: 'Devjet Bag bio' },
  'C-14': { status: 'pending', note: '"Twelve other programs subsequently replicated it."' },
  'C-15': { status: 'pending', note: '"6-8 weeks" and "2 to 6 weeks" still current' },
  'C-17': { status: 'pending', note: '"Response within 1 business day" can be met' },
  'C-18': { status: 'pending', note: 'Pre-founding status of TT-INS-007 to 010' },
  'C-20': { status: 'pending', note: 'Hemang Dwivedi profile' },
};

export const isVerified = (...ids: string[]) => ids.every((id) => claims[id]?.status === 'verified');
export const pendingOf = (...ids: string[]) => ids.filter((id) => claims[id]?.status !== 'verified');

export const D04_ATTRIBUTION = 'Engagement led by Mack Akhani prior to founding Tech Transpire.';
