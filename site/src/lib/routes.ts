// Which routes exist in this build, so links never point at a page that was not built.
import { isReview } from './site';
import { caseStudyIds, isPublishable } from './claims';

export const isVisibleInsight = (id: string) => isReview || isPublishable(id);
export const hasCaseStudiesPage = caseStudyIds.some(isVisibleInsight);
export const CASE_STUDIES = hasCaseStudiesPage ? '/insights/case-studies' : '/insights';
