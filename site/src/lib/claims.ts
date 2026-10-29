// Claims register mirror and publication rules (see src/data/publication.json).
import data from '../data/publication.json';

export type ClaimStatus = 'verified' | 'conditional' | 'pending' | 'withdrawn';
type Omission = { blocks: string[]; covers: string[]; approval: string };

export const claims = data.claims as Record<string, { status: ClaimStatus; note?: string }>;
const articleClaims = data.articles as Record<string, string[]>;
const omissions = Object.fromEntries(Object.entries(data.omissions).filter(([k]) => !k.startsWith('_'))) as Record<string, Omission>;

export const isVerified = (...ids: string[]) => ids.every((id) => claims[id]?.status === 'verified');
export const pendingOf = (...ids: string[]) => ids.filter((id) => claims[id]?.status !== 'verified');

/** Claims that still stop an article from being published (after approved omissions). */
export function blockingClaims(insightId: string): string[] {
  const covered = new Set(omissions[insightId]?.covers ?? []);
  return pendingOf(...(articleClaims[insightId] ?? [])).filter((id) => !covered.has(id));
}
export const isPublishable = (insightId: string) => blockingClaims(insightId).length === 0;
export const omittedBlocks = (insightId: string) => new Set(omissions[insightId]?.blocks ?? []);
export const caseStudyIds = data.caseStudies as string[];

export const D04_ATTRIBUTION = 'Engagement led by Mack Akhani prior to founding Tech Transpire.';
