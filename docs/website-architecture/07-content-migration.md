# 07 — Content Migration Matrix

Every block of existing content is mapped to a destination in the new structure. The matrix is **generated** from [`data/content-blocks.json`](data/content-blocks.json) by [`tools/build-migration.pl`](tools/build-migration.pl). The script refuses to finish if any block is left unmapped, so the completeness check below is mechanical, not a manual claim. Machine-readable output: [`data/migration-map.csv`](data/migration-map.csv).

## 1. Treatment definitions

| Treatment | Meaning |
|---|---|
| **verbatim** | Moved without any change to wording. Only presentation changes (Phase 2). |
| **verbatim, gated** | Moved verbatim, but not published until the referenced claims (C-xx) or decisions are approved. |
| **verbatim text, URL updated** | CTA wording unchanged; link target updated to the new URL structure. |
| **verbatim + new H1** / **verbatim + additions** | Existing text unchanged; new, separately-approved content (N-xx) added alongside. |
| **consolidated** | Identical duplicate merged into one canonical location; nothing is lost (the duplicate's text is identical). |
| **restructure** | Navigation or chrome rebuilt; company content within it preserved. |
| **replaced (approved)** | Superseded by an explicitly approved replacement (the contact form, D-12). The original is kept in the archive. |
| **retire** | Not company content (platform chrome or embed `<title>` strings replaced by proper metadata). Retained in the archive. |

**No existing wording is edited by this matrix.** Wording changes happen only through approved editorial corrections (E-xx) and claim decisions (D-04, D-05) in [12-gaps-and-decisions.md](12-gaps-and-decisions.md).

## 2. Page-level summary

| Legacy item | Legacy URL | New destination | Blocks |
|---|---|---|---|
| TT-GL-001 Site shell | all pages | Global header / footer / SiteSettings | 1 |
| TT-PG-001 Home | `/`, `/home` | `/` (fit list → `/services`) | 9 |
| TT-PG-002 Services | `/services` | `/services` (label "Expertise") | 7 |
| TT-PG-003 Insights | `/insights` | `/insights` | 2 |
| TT-PG-004 About | `/about-us` | `/about-us` | 6 |
| TT-PG-005 Contact | `/contact-us` | `/contact-us` + SiteSettings | 5 |
| TT-INS-001 … 010 | modal on `/insights` | `/insights/{slug}` (see [04](04-sitemap.md)) | 95 |
| Insights Sheet rows (metadata) | Google Sheet | Insight entries: listing title, excerpt, author, date, legacy category, read time, cover | 12 rows → 10 published + 2 drafts (D-10) |
| Assets TT-AS-001 … 018 | Google Drive / Sites | Asset library ([`data/assets.csv`](data/assets.csv)) | 18 |

## 3. Preservation and completeness check

```
125 blocks mapped, 0 unmapped. consolidated: 1; replaced (approved): 1; restructure: 1; retire: 2; verbatim: 104; verbatim + new H1: 1; verbatim text, URL updated: 13; verbatim, gated: 2
```

| Check | Result |
|---|---|
| Source documents captured | 5 pages + site shell + 10 articles + 1 Sheet (12 rows) — all publicly reachable sources |
| Blocks captured | 125 |
| Blocks mapped to a destination | 125 |
| Blocks with wording changed by migration | 0 (changes only via approved E-xx / D-04). One block, the contact form, is **replaced by an approved new field set** (D-12); the legacy form is archived |
| Blocks retired | 2 (embed `<title>` strings only; retained in archive) |
| Duplicates consolidated | 1 (fit list: Home = Services) |
| Assets inventoried / archived | 18 / 17 site images, plus 5 logo files from the logo folder (MS-03 closed) |
| Unpublished Sheet rows | 2, retained as drafts (D-10) |
| Drive "Blogs and case studies" folder | 10 .docx files, word-for-word identical to TT-INS-001…010 (reconciled 2026-10-29) |
| **Sources not covered** | Master Drive folder (MS-01) is still private. The Google Sites project and other reference material are **not yet reconciled** |

**Phase 4 verification method:** after content entry, run a text diff of each rendered page against its archive file (`source-archive/…`). Every archive line must appear on the destination page unless the matrix marks it *retire*, *consolidated* (present at the canonical location) or an approved E-xx correction applies.

## 4. Sheet metadata migration (Insights)

| ID | Listing title (Sheet) | Doc H1 (if different) | Date | Legacy category | Read time | Cover |
|---|---|---|---|---|---|---|
| TT-INS-001 | Mastering Kaizen Events | Most Kaizen Events Fail. Here Is What the Successful Ones Do Differently. | 2026-08-26 | Transformation | 3 min read | TT-AS-008 |
| TT-INS-002 | Two Quarters of Migration Work, Cleared in a Single Day | — | 2026-09-02 | Case Study | 5 min read | TT-AS-009 |
| TT-INS-003 | A Seven-Year Migration, Closed in 19 Hours | — | 2026-09-02 | Case Study | 4 min read | TT-AS-010 |
| TT-INS-004 | A Weekend Scrum-to-Kanban Migration Across Nine Teams | A Product With One Launch Date Does Not Need Sprints | 2026-09-02 | Case Study | 5 min read | TT-AS-011 |
| TT-INS-005 | What Value Stream Mapping Found: 9.5 Hours of Work Inside 208 Days of Delays | 208 Days of Elapsed Time. 9.5 Hours of Actual Work. | 2026-09-02 | Transformation | 5 min read | TT-AS-012 |
| TT-INS-006 | You Don't Have an Execution Problem. You're Executing the Wrong Plan. | — | 2026-09-04 | Transformation | 3 min read | TT-AS-013 |
| TT-INS-007 | The 19-Hour Project: What Rapid Execution Actually Looks Like | — | 2026-09-04 | Execution | 3 min read | TT-AS-014 |
| TT-INS-008 | When Processes Break Down, Look at the Handoffs - Not the Steps | — | 2026-09-04 | Transformation | 3 min read | TT-AS-015 |
| TT-INS-009 | Supply Chain at Scale: How Decentralized Purchasing Silently Destroys Margins | — | 2026-09-04 | Execution | 3 min read | TT-AS-016 |
| TT-INS-010 | Why Transformation Programs Fail After a Strong Start | — | 2026-09-04 | Transformation | 4 min read | TT-AS-017 |
| draft | The Hidden Gaps That Sink Every Transformation Before It Starts (×2) | no document | May 7 / May 8, 2026 | Execution | 4 / 5 min read | TT-AS-007 / none |

Excerpts are migrated verbatim from the Sheet (see [`source-archive/insights-index-sheet.csv`](source-archive/insights-index-sheet.csv)). Note: the Sheet labels TT-INS-005 "Transformation" although it follows the same Client / Challenge / What We Did / Results structure as the four "Case Study" items, and TT-INS-009 ("Execution") contains a case example within a perspective piece. The new taxonomy (09) keeps this original value in `legacy_category` and assigns `content_type` separately, for approval.

## 5. Block-level matrix

| Block | Destination | Section | Treatment | Refs | Notes |
|---|---|---|---|---|---|
| TT-GL-001-B01 | Global header/footer | Navigation + logo | restructure | D-22 | Nav labels/order change to Concept 06; Google Sites chrome ("Report abuse", "Page updated", "Search this site") retired as platform UI, not company content; logo TT-AS-018 |
| TT-PG-001-B01 | `/` | Challenges (problem statements) | verbatim |  | Four statements with their attribution lines |
| TT-PG-001-B02 | `/` | Hero | verbatim + new H1 | D-01 N-01 | "Clarity before Execution." kept as hero lead-in or secondary heading per D-01; both subtext lines verbatim; background TT-AS-001 |
| TT-PG-001-B03 | `/` | Challenges (problem cards) | verbatim |  | Six cards; each links to a related Expertise component (08) |
| TT-PG-001-B04 | `/` | Approach (Our Method intro) | verbatim |  |  |
| TT-PG-001-B05 | `/` | Approach (five steps) | verbatim |  | Also reusable on /services |
| TT-PG-001-B06 | `/` | Outcome callout | verbatim | C-15 |  |
| TT-PG-001-B07 | `/services` | Fit list (canonical) | consolidated | D-14 | Identical to TT-PG-002-B06; Home keeps a link "Is this the right fit?" to /services#fit (N) |
| TT-PG-001-B08 | `/` | Evidence (stats) | verbatim, gated | D-04 D-05 C-01 C-04 C-05 C-06 C-07 N-15 | Each figure renders only when verified, with its D-04 attribution; C-01 label withdrawn (source archived) and replaced per N-15 |
| TT-PG-001-B09 | `/` | Conversation CTA | verbatim text, URL updated | D-20 | CTA2 "See Our Work" retargeted /about-us -> /insights/case-studies |
| TT-PG-002-B01 | `/services` | Banner | verbatim |  | Background TT-AS-002 |
| TT-PG-002-B02 | `/services` | Our Offer | verbatim |  |  |
| TT-PG-002-B03 | `/services` | Signature offer callout | verbatim | C-15 |  |
| TT-PG-002-B04 | `/services` | Our Engagement (4 types) | verbatim |  | Transformation Recovery step also excerpted on /services/transformation-recovery (P1) |
| TT-PG-002-B05 | `/services` | The Components (6) | verbatim | D-02 | Each card links to related insights; Transformation Recovery card links to its detail page (P1) |
| TT-PG-002-B06 | `/services` | Fit list (canonical) | verbatim | D-14 | Anchor #fit; referenced from Home, Contact and referral pathway |
| TT-PG-002-B07 | `/services` | Conversation CTA | verbatim text, URL updated |  | CTA2 "Read Our Case Studies" /blogs (404) -> /insights/case-studies; CTA1 /contact-us/ -> /contact-us |
| TT-PG-003-B01 | (retired) | - | retire |  | Embed <title> "Tech Transpire â Insights": replaced by page metadata (10) |
| TT-PG-003-B02 | `/insights` | Intro | verbatim |  | Heading + intro line; "All" filter and loading strings are UI, replaced by Phase 2/3 equivalents |
| TT-PG-004-B01 | `/about-us` | Banner | verbatim |  | Background TT-AS-002 |
| TT-PG-004-B02 | `/about-us` | Our Story | verbatim |  |  |
| TT-PG-004-B03 | `/about-us` | Our Values | verbatim |  |  |
| TT-PG-004-B04 | `/about-us` | Our Team | verbatim, gated | D-07 C-02 C-10 C-11 C-12 C-13 C-20 E-03 E-04 | Profiles publish individually as confirmed; four Person entries; headshots TT-AS-003..006; LinkedIn URLs kept |
| TT-PG-004-B05 | `/about-us` | Our Message | verbatim | C-16 | Five statements + closing line |
| TT-PG-004-B06 | `/about-us` | Conversation CTA | verbatim text, URL updated |  | CTA2 "See Our Case Studies" /blogs (404) -> /insights/case-studies |
| TT-PG-005-B01 | (retired) | - | retire |  | Embed <title> and eyebrow "Get in touch": title replaced by metadata; eyebrow kept as Phase 2 option |
| TT-PG-005-B02 | `/contact-us + footer + SiteSettings` | Contact details | verbatim |  | Email, phone and LinkedIn held once in SiteSettings and reused |
| TT-PG-005-B03 | `/contact-us` | Book an intro call | verbatim |  | Booking URL held in SiteSettings |
| TT-PG-005-B04 | `/contact-us` | What happens next | verbatim | C-17 |  |
| TT-PG-005-B05 | `/contact-us` | Form | replaced (approved) | D-12 N-09 | Approved new field set (D-12): Name, Company, Work email, Phone (optional), Area of interest, Message, source, consent. Legacy labels/options archived, not deleted; Annual revenue removed. Success text kept verbatim |
| TT-INS-001-B01 | `/insights/mastering-kaizen-events` | Article header | verbatim | D-09 | Headline = H1; subtext = standfirst; "GDRIVE: your-logo-file-id" is an unfilled template placeholder, not an asset |
| TT-INS-001-B02 | `/insights/mastering-kaizen-events` | Most Kaizen Events Fail. Here Is What the Successful Ones Do Differently. | verbatim |  | First section heading repeats H1; kept in source, not rendered as second H1 (10 Â§6) |
| TT-INS-001-B03 | `/insights/mastering-kaizen-events` | Kaizen and a Kaizen Event Are Not the Same Thing | verbatim |  |  |
| TT-INS-001-B04 | `/insights/mastering-kaizen-events` | Preparation Decides the Outcome | verbatim |  |  |
| TT-INS-001-B05 | `/insights/mastering-kaizen-events` | Design the Room Before You Design the Agenda | verbatim |  |  |
| TT-INS-001-B06 | `/insights/mastering-kaizen-events` | (cards) | verbatim |  |  |
| TT-INS-001-B07 | `/insights/mastering-kaizen-events` | Running the Event | verbatim |  |  |
| TT-INS-001-B08 | `/insights/mastering-kaizen-events` | What It Looks Like When It Works | verbatim |  |  |
| TT-INS-001-B09 | `/insights/mastering-kaizen-events` | Sustaining the Gains | verbatim |  |  |
| TT-INS-001-B10 | `/insights/mastering-kaizen-events` | Where Kaizen Events Go Wrong | verbatim |  |  |
| TT-INS-001-B11 | `/insights/mastering-kaizen-events` | Poor preparation and no pilot | verbatim | E-05 | Card title styled as heading in source; restore as 4th card of B10 |
| TT-INS-001-B12 | `/insights/mastering-kaizen-events` | (callout) | verbatim |  |  |
| TT-INS-001-B13 | `/insights/mastering-kaizen-events` | Closing CTA | verbatim text, URL updated |  | Link targets mapped to new URLs (10 Â§7) |
| TT-INS-002-B01 | `/insights/two-quarters-of-migration-work-cleared-in-a-single-day` | Article header | verbatim | D-09 | Headline = H1; subtext = standfirst; "GDRIVE: your-logo-file-id" is an unfilled template placeholder, not an asset |
| TT-INS-002-B02 | `/insights/two-quarters-of-migration-work-cleared-in-a-single-day` | At a Glance | verbatim |  |  |
| TT-INS-002-B03 | `/insights/two-quarters-of-migration-work-cleared-in-a-single-day` | The Client | verbatim |  |  |
| TT-INS-002-B04 | `/insights/two-quarters-of-migration-work-cleared-in-a-single-day` | The Challenge | verbatim |  |  |
| TT-INS-002-B05 | `/insights/two-quarters-of-migration-work-cleared-in-a-single-day` | (cards) | verbatim |  |  |
| TT-INS-002-B06 | `/insights/two-quarters-of-migration-work-cleared-in-a-single-day` | What We Did | verbatim | E-01 |  |
| TT-INS-002-B07 | `/insights/two-quarters-of-migration-work-cleared-in-a-single-day` | The Results | verbatim |  |  |
| TT-INS-002-B08 | `/insights/two-quarters-of-migration-work-cleared-in-a-single-day` | (callout) | verbatim |  |  |
| TT-INS-002-B09 | `/insights/two-quarters-of-migration-work-cleared-in-a-single-day` | Closing CTA | verbatim text, URL updated |  | Link targets mapped to new URLs (10 Â§7) |
| TT-INS-003-B01 | `/insights/seven-year-migration-closed-in-19-hours` | Article header | verbatim | D-09 | Headline = H1; subtext = standfirst; "GDRIVE: your-logo-file-id" is an unfilled template placeholder, not an asset |
| TT-INS-003-B02 | `/insights/seven-year-migration-closed-in-19-hours` | At a Glance | verbatim |  |  |
| TT-INS-003-B03 | `/insights/seven-year-migration-closed-in-19-hours` | The Client | verbatim |  |  |
| TT-INS-003-B04 | `/insights/seven-year-migration-closed-in-19-hours` | The Challenge | verbatim |  |  |
| TT-INS-003-B05 | `/insights/seven-year-migration-closed-in-19-hours` | (cards) | verbatim |  |  |
| TT-INS-003-B06 | `/insights/seven-year-migration-closed-in-19-hours` | What We Did | verbatim | C-14 D-24 E-09 |  |
| TT-INS-003-B07 | `/insights/seven-year-migration-closed-in-19-hours` | The Results | verbatim | C-08 |  |
| TT-INS-003-B08 | `/insights/seven-year-migration-closed-in-19-hours` | (callout) | verbatim |  |  |
| TT-INS-003-B09 | `/insights/seven-year-migration-closed-in-19-hours` | Closing CTA | verbatim text, URL updated |  | Link targets mapped to new URLs (10 Â§7) |
| TT-INS-004-B01 | `/insights/weekend-scrum-to-kanban-migration-across-nine-teams` | Article header | verbatim | D-09 | Headline = H1; subtext = standfirst; "GDRIVE: your-logo-file-id" is an unfilled template placeholder, not an asset |
| TT-INS-004-B02 | `/insights/weekend-scrum-to-kanban-migration-across-nine-teams` | At a Glance | verbatim | E-02 C-09 |  |
| TT-INS-004-B03 | `/insights/weekend-scrum-to-kanban-migration-across-nine-teams` | The Client | verbatim |  |  |
| TT-INS-004-B04 | `/insights/weekend-scrum-to-kanban-migration-across-nine-teams` | The Challenge | verbatim |  |  |
| TT-INS-004-B05 | `/insights/weekend-scrum-to-kanban-migration-across-nine-teams` | (cards) | verbatim |  |  |
| TT-INS-004-B06 | `/insights/weekend-scrum-to-kanban-migration-across-nine-teams` | What We Did | verbatim |  |  |
| TT-INS-004-B07 | `/insights/weekend-scrum-to-kanban-migration-across-nine-teams` | The Results | verbatim |  |  |
| TT-INS-004-B08 | `/insights/weekend-scrum-to-kanban-migration-across-nine-teams` | (callout) | verbatim |  |  |
| TT-INS-004-B09 | `/insights/weekend-scrum-to-kanban-migration-across-nine-teams` | Closing CTA | verbatim text, URL updated |  | Link targets mapped to new URLs (10 Â§7) |
| TT-INS-005-B01 | `/insights/value-stream-mapping-9-5-hours-of-work-in-208-days` | Article header | verbatim | D-09 | Headline = H1; subtext = standfirst; "GDRIVE: your-logo-file-id" is an unfilled template placeholder, not an asset |
| TT-INS-005-B02 | `/insights/value-stream-mapping-9-5-hours-of-work-in-208-days` | At a Glance | verbatim |  |  |
| TT-INS-005-B03 | `/insights/value-stream-mapping-9-5-hours-of-work-in-208-days` | The Client | verbatim |  |  |
| TT-INS-005-B04 | `/insights/value-stream-mapping-9-5-hours-of-work-in-208-days` | The Challenge | verbatim |  |  |
| TT-INS-005-B05 | `/insights/value-stream-mapping-9-5-hours-of-work-in-208-days` | (cards) | verbatim |  |  |
| TT-INS-005-B06 | `/insights/value-stream-mapping-9-5-hours-of-work-in-208-days` | What We Did | verbatim |  |  |
| TT-INS-005-B07 | `/insights/value-stream-mapping-9-5-hours-of-work-in-208-days` | The Results | verbatim |  |  |
| TT-INS-005-B08 | `/insights/value-stream-mapping-9-5-hours-of-work-in-208-days` | (callout) | verbatim |  |  |
| TT-INS-005-B09 | `/insights/value-stream-mapping-9-5-hours-of-work-in-208-days` | Closing CTA | verbatim text, URL updated |  | Link targets mapped to new URLs (10 Â§7) |
| TT-INS-006-B01 | `/insights/executing-the-wrong-plan` | Article header | verbatim | D-09 | Headline = H1; subtext = standfirst; "GDRIVE: your-logo-file-id" is an unfilled template placeholder, not an asset |
| TT-INS-006-B02 | `/insights/executing-the-wrong-plan` | You Don't Have an Execution Problem. You're Executing the Wrong Plan. | verbatim |  | First section heading repeats H1; kept in source, not rendered as second H1 (10 Â§6) |
| TT-INS-006-B03 | `/insights/executing-the-wrong-plan` | What We Hear vs. What Is Really Happening | verbatim |  |  |
| TT-INS-006-B04 | `/insights/executing-the-wrong-plan` | The Cost of Executing the Wrong Plan | verbatim |  |  |
| TT-INS-006-B05 | `/insights/executing-the-wrong-plan` | (carousel) | verbatim |  |  |
| TT-INS-006-B06 | `/insights/executing-the-wrong-plan` | How We Work | verbatim |  |  |
| TT-INS-006-B07 | `/insights/executing-the-wrong-plan` | (callout) | verbatim |  |  |
| TT-INS-006-B08 | `/insights/executing-the-wrong-plan` | Ready to Make Sure You Are Solving the Right Problem? | verbatim |  |  |
| TT-INS-006-B09 | `/insights/executing-the-wrong-plan` | Closing CTA | verbatim text, URL updated |  | Link targets mapped to new URLs (10 Â§7) |
| TT-INS-007-B01 | `/insights/the-19-hour-project-rapid-execution` | Article header | verbatim | D-09 | Headline = H1; subtext = standfirst; "GDRIVE: your-logo-file-id" is an unfilled template placeholder, not an asset |
| TT-INS-007-B02 | `/insights/the-19-hour-project-rapid-execution` | The 19-Hour Project: What Rapid Execution Actually Looks Like | verbatim |  | First section heading repeats H1; kept in source, not rendered as second H1 (10 Â§6) |
| TT-INS-007-B03 | `/insights/the-19-hour-project-rapid-execution` | The Problem | verbatim | C-07 C-18 | Separate engagement from TT-INS-003 unless verified (C-18); client description kept as written |
| TT-INS-007-B04 | `/insights/the-19-hour-project-rapid-execution` | (stats) | verbatim |  |  |
| TT-INS-007-B05 | `/insights/the-19-hour-project-rapid-execution` | What We Did | verbatim |  |  |
| TT-INS-007-B06 | `/insights/the-19-hour-project-rapid-execution` | The Real Lesson | verbatim |  |  |
| TT-INS-007-B07 | `/insights/the-19-hour-project-rapid-execution` | (cards) | verbatim |  |  |
| TT-INS-007-B08 | `/insights/the-19-hour-project-rapid-execution` | (callout) | verbatim |  |  |
| TT-INS-007-B09 | `/insights/the-19-hour-project-rapid-execution` | Your Organization Has Stalled Initiatives Too | verbatim |  |  |
| TT-INS-007-B10 | `/insights/the-19-hour-project-rapid-execution` | Closing CTA | verbatim text, URL updated | D-04 E-07 C-18 | Link targets mapped to new URLs (10 Â§7); attribution line added per D-04 once C-18 confirms pre-founding |
| TT-INS-008-B01 | `/insights/look-at-the-handoffs-not-the-steps` | Article header | verbatim | D-09 | Headline = H1; subtext = standfirst; "GDRIVE: your-logo-file-id" is an unfilled template placeholder, not an asset |
| TT-INS-008-B02 | `/insights/look-at-the-handoffs-not-the-steps` | When Processes Break Down, Look at the Handoffs - Not the Steps | verbatim |  | First section heading repeats H1; kept in source, not rendered as second H1 (10 Â§6) |
| TT-INS-008-B03 | `/insights/look-at-the-handoffs-not-the-steps` | Where Problems Actually Live | verbatim |  |  |
| TT-INS-008-B04 | `/insights/look-at-the-handoffs-not-the-steps` | What This Looked Like in Practice | verbatim |  |  |
| TT-INS-008-B05 | `/insights/look-at-the-handoffs-not-the-steps` | How We Find What Others Miss | verbatim |  |  |
| TT-INS-008-B06 | `/insights/look-at-the-handoffs-not-the-steps` | (callout) | verbatim |  |  |
| TT-INS-008-B07 | `/insights/look-at-the-handoffs-not-the-steps` | (fitlist) | verbatim |  |  |
| TT-INS-008-B08 | `/insights/look-at-the-handoffs-not-the-steps` | Closing CTA | verbatim text, URL updated | D-04 E-07 C-18 | Link targets mapped to new URLs (10 Â§7); attribution line added per D-04 once C-18 confirms pre-founding |
| TT-INS-009-B01 | `/insights/decentralized-purchasing-destroys-margins` | Article header | verbatim | D-09 | Headline = H1; subtext = standfirst; "GDRIVE: your-logo-file-id" is an unfilled template placeholder, not an asset |
| TT-INS-009-B02 | `/insights/decentralized-purchasing-destroys-margins` | Supply Chain at Scale: How Decentralized Purchasing Silently Destroys Margins | verbatim |  | First section heading repeats H1; kept in source, not rendered as second H1 (10 Â§6) |
| TT-INS-009-B03 | `/insights/decentralized-purchasing-destroys-margins` | What Decentralization Actually Costs | verbatim |  |  |
| TT-INS-009-B04 | `/insights/decentralized-purchasing-destroys-margins` | What We Did for a 90-Location Eye Care Network | verbatim |  |  |
| TT-INS-009-B05 | `/insights/decentralized-purchasing-destroys-margins` | (stats) | verbatim | C-03 |  |
| TT-INS-009-B06 | `/insights/decentralized-purchasing-destroys-margins` | How We Approached the Centralization | verbatim |  |  |
| TT-INS-009-B07 | `/insights/decentralized-purchasing-destroys-margins` | (callout) | verbatim |  |  |
| TT-INS-009-B08 | `/insights/decentralized-purchasing-destroys-margins` | Ready to See What Centralization Could Mean for Your Network? | verbatim |  |  |
| TT-INS-009-B09 | `/insights/decentralized-purchasing-destroys-margins` | Closing CTA | verbatim text, URL updated | D-04 E-07 C-18 | Link targets mapped to new URLs (10 Â§7); attribution line added per D-04 once C-18 confirms pre-founding |
| TT-INS-010-B01 | `/insights/why-transformation-programs-fail-after-a-strong-start` | Article header | verbatim | D-09 | Headline = H1; subtext = standfirst; "GDRIVE: your-logo-file-id" is an unfilled template placeholder, not an asset |
| TT-INS-010-B02 | `/insights/why-transformation-programs-fail-after-a-strong-start` | Why Transformation Programs Fail After a Strong Start | verbatim |  | First section heading repeats H1; kept in source, not rendered as second H1 (10 Â§6) |
| TT-INS-010-B03 | `/insights/why-transformation-programs-fail-after-a-strong-start` | Why Gains Disappear | verbatim |  |  |
| TT-INS-010-B04 | `/insights/why-transformation-programs-fail-after-a-strong-start` | What We Did Differently — And What It Produced | verbatim |  |  |
| TT-INS-010-B05 | `/insights/why-transformation-programs-fail-after-a-strong-start` | (stats) | verbatim |  |  |
| TT-INS-010-B06 | `/insights/why-transformation-programs-fail-after-a-strong-start` | How We Build for Sustainability | verbatim |  |  |
| TT-INS-010-B07 | `/insights/why-transformation-programs-fail-after-a-strong-start` | (fitlist) | verbatim |  |  |
| TT-INS-010-B08 | `/insights/why-transformation-programs-fail-after-a-strong-start` | (callout) | verbatim |  |  |
| TT-INS-010-B09 | `/insights/why-transformation-programs-fail-after-a-strong-start` | Ready for a Transformation That Sticks? | verbatim |  |  |
| TT-INS-010-B10 | `/insights/why-transformation-programs-fail-after-a-strong-start` | Closing CTA | verbatim text, URL updated | D-04 E-07 C-18 | Link targets mapped to new URLs (10 Â§7); attribution line added per D-04 once C-18 confirms pre-founding |
