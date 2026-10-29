# Tech Transpire Website Rebuild — Phase 1: Structure

Phase 1 covers discovery, content preservation, information architecture and the technical foundation. **It contains no UI design.** Phase 2 (UI/UX, refining Concept 06) begins after [14-phase-one-approval.md](14-phase-one-approval.md) is signed.

## Start here

0. **[00 Phase 1 Review Pack](00-phase-one-review.md)**: the six review points in one document (v1.1, with the 2026-10-29 decisions)
1. [01 Discovery Report](01-discovery-report.md): what exists, how it was captured, what could not be accessed
2. [12 Gaps & Decisions](12-gaps-and-decisions.md): decisions (D-01 – D-24) with their approval status, and the claims register (C-01 – C-20)
3. [04 Sitemap](04-sitemap.md): the proposed structure

## Deliverables

| # | Document | Content |
|---|---|---|
| 1 | [01-discovery-report.md](01-discovery-report.md) | Findings, access limits, technical issues |
| 2 | [02-content-inventory.md](02-content-inventory.md) | Page-by-page and article-by-article inventory |
| 3 | [03-audience-and-objectives.md](03-audience-and-objectives.md) | Objectives, audiences, user journeys |
| 4 | [04-sitemap.md](04-sitemap.md) | Site hierarchy: existing vs new |
| 5 | [05-navigation-specification.md](05-navigation-specification.md) | Primary, secondary, footer, breadcrumbs, search |
| 6 | [06-page-blueprints.md](06-page-blueprints.md) | Specification for every page |
| 7 | [07-content-migration.md](07-content-migration.md) | Every content block → destination, with completeness check |
| 8 | [08-content-relationships.md](08-content-relationships.md) | How capabilities, industries, insights, outcomes and people connect |
| 9 | [09-content-schema.md](09-content-schema.md) | Logical content models (JSON Schema in `data/schema/`) |
| 10 | [10-seo-url-plan.md](10-seo-url-plan.md) | URLs, redirects, canonicals, metadata, structured data |
| 11 | [11-technical-architecture.md](11-technical-architecture.md) | Platform options and recommendation |
| 12 | [12-gaps-and-decisions.md](12-gaps-and-decisions.md) | Verified / incomplete / proposed / approval / not recommended |
| 13 | [13-implementation-roadmap.md](13-implementation-roadmap.md) | P0/P1/P2, phase sequence, risks |
| 14 | [14-phase-one-approval.md](14-phase-one-approval.md) | Sign-off checklist |
| 15 | [15-technical-remediation-checklist.md](15-technical-remediation-checklist.md) | Live-site fixes (owner actions) and migration/launch checks |
| 16 | [16-open-decisions-matrix.md](16-open-decisions-matrix.md) | The eight unresolved decisions, with recommendations, awaiting sign-off |
| — | [drafts/](drafts/) | New content for approval: Healthcare page, Privacy Policy, other N-xx items |

## Data and source files

| Path | Content |
|---|---|
| `source-archive/pages/`, `source-archive/insights/` | Verbatim text of every page and article (script-extracted, unedited) |
| `source-archive/raw/` | Raw HTML: Google Sites pages, embeds, Google Doc exports |
| `source-archive/assets/` | Original images (TT-AS-001 – 017), logo files in `assets/logo/` (TT-AS-019 – 023); `.docx` originals in `raw/drive-docx/` |
| `source-archive/insights-index-sheet.csv` | The Insights Google Sheet (non-empty rows) |
| `data/content-blocks.json` | 125 content blocks with IDs and exact text, ready for import |
| `data/migration-map.csv` | Block → destination mapping |
| `data/redirects.csv` | Legacy URL handling |
| `data/assets.csv` | Asset register |
| `data/schema/*.schema.json` | Content model as JSON Schema |
| `tools/` | Perl scripts that regenerate the data files from the archive |

## Regenerating

From this folder: `perl tools/build-inventory.pl && perl tools/build-migration.pl > /dev/null`. The migration script fails if any block is unmapped.

## Conventions

- **[E]** existing content (verbatim) · **[N]** new content needing approval · **[C]** conditional on a decision
- Existing wording is never changed in these documents. Proposed changes are listed separately as E-xx (12 §7).
