# 13 — Implementation Roadmap

The sequence runs from approved architecture → UI/UX → development → migration and QA → launch. Durations are planning estimates for a small team and are not commitments; they depend on how quickly decisions are made.

## 1. Priority classification

### P0 — Essential (required for an accurate, credible launch)

| Item | Depends on |
|---|---|
| Home, Expertise (`/services`), Insights hub, About, Contact | D-01, D-02, D-14, D-18 |
| All 10 existing articles at `/insights/{slug}` | D-09; D-04 (attribution lines) |
| Global navigation and footer | D-06 (whether Industries is shown), D-08 |
| Privacy Policy | D-13 — legal review |
| Contact form (approved field set) → Zoho CRM + email notification, with consent, spam protection and a real error state | D-12 ✅, D-16 ✅ (feasibility checks in 11 §4a) |
| Redirects, canonicals, sitemap.xml, robots.txt, metadata for every page | 10 |
| Apex domain fix | D-19 (can happen immediately) |
| Claims verified or withheld (stats, bios) | C-01 – C-17, D-05 |
| 404 page | — |

### P1 — Important (strengthens credibility, discovery, conversion)

| Item | Depends on |
|---|---|
| Case-studies listing `/insights/case-studies` | D-17 |
| Transformation Recovery detail page | D-02, N-04 copy |
| Industries landing + Healthcare page (P0 if approved in time) | D-06, N-05 copy |
| Related-content links (articles ↔ expertise ↔ industry) | 08 |
| Conversion measurement events and dashboard | D-16, analytics consent |
| Accessibility statement, Terms | D-13 |
| Editorial corrections E-01 – E-05, E-09 | D-11, D-24 |

### P2 — Expansion (after launch)

| Item | Trigger |
|---|---|
| Further `/services/{slug}` pages (e.g. process improvement / Lean) | Approved copy + at least one supporting insight |
| Further industry pages | ≥ 2 pieces of approved evidence for the sector |
| Topic landing pages `/insights/topics/{slug}` | A topic reaches about 8 items |
| Author / team profile pages | More authors, or longer profiles |
| Whitepapers and downloads | First downloadable asset exists |
| Referral-partner page | Referral programme defined |
| Testimonials | Testimonials collected with written consent |
| Site search | ~40+ content items |
| "Hidden Gaps" article | Body text written (D-10) |

**Trade-offs.** Launching P0 only (17 pages) is fastest, but leaves the CTAs that promise case studies pointing at the general Insights hub. Adding the case-studies listing costs little because it uses existing content only, so it is recommended for launch even though it is ranked P1. Industries is the item most likely to slip, because it needs new copy. The navigation is designed to work with or without it (05).

## 2. Phase plan

| Step | Phase | Activities | Output | Gate |
|---|---|---|---|---|
| 1 | **1 — close-out** | ☑ Logo and Blogs folders reconciled (2026-10-29). Remaining: share the **master** folder (MS-01, R-06); review it; update 02/07/12 if it contains content | Inventory v1.2 | Inventory confirmed complete |
| 2 | 1 | ☑ Core decisions made (D-01–D-06, D-12, D-16, D-19–D-23). Remaining: sign off recommended items, approve drafts. Claims continue in parallel and do not block | Signed decisions register | **Phase 1 approval** (14) |
| 3 | 1 → 2 | Write and approve new content N-01 – N-14 (in parallel with Phase 2). Copy is written in the content model, not in design files | Approved copy deck | Copy approved per page |
| 4 | **2 — UI/UX** | Design system and Concept 06 refinement: page templates (Home, Landing, Detail, Article, Listing, Contact, Utility), block components matching the block types in 09, responsive and accessibility specification | Design files + component inventory | Design approval |
| 5 | 2 → 3 | Confirm platform, editing workflow, hosting, form destination, analytics (D-15, D-16) | Technical decision record | Tech approval |
| 6 | **3 — Development** | Repository, environments, content schema, templates, navigation, redirects, form handling, sitemap, structured data | Staging site | Functional QA pass |
| 7 | **4 — Migration & QA** | Load content from `data/content-blocks.json` and the archive; apply approved E-xx; verbatim diff against archive (07 §3); assets with alt text; link check; accessibility audit (WCAG 2.2 AA); performance budgets; redirect test of every row in `data/redirects.csv` | QA report | Content owner sign-off |
| 8 | **5 — Launch** | Search Console baseline, DNS cut-over, smoke test, sitemap submission, unpublish Google Sites, restrict Docs sharing, retire Apps Script proxy | Live site | Post-launch checks at 1 day / 2 weeks / 6 weeks |
| 9 | 5 | Monitor 404s, crawl errors, conversions; begin P2 backlog | Optimisation log | — |

## 3. Critical path

```
D-21 Drive access ──► inventory complete ──┐
D-02 / D-06 / D-01 decisions ──────────────┼──► Phase 1 approval ──► Phase 2 design ──► Phase 3 build ──► Phase 4 QA ──► Launch
Claims C-xx verified ──────────────────────┘          │                                  ▲
                                         N-xx copy writing (parallel) ───────────────────┘
D-13 Privacy Policy (legal) ─────────────────────────────────────────────────────────────┘ (launch blocker)
D-19 apex DNS fix ── independent; do now
```

## 4. Risks

| Risk | Mitigation |
|---|---|
| Drive folder contains content that changes the structure | Close MS-01 before Phase 1 sign-off |
| Claims cannot be verified in time | Stats and bio lines are "gated" (07): the site launches without them rather than with unverified figures |
| New copy (N-xx) delays launch | P0 depends on only N-01, N-07, N-09, N-10, N-11, N-14, all short |
| Lost form submissions during cut-over | Export current Apps Script submissions; test the new form end to end before DNS change |
| Search visibility dip after migration | Redirects in place before cut-over; Search Console monitoring; no URL changes beyond those listed in 10 |
| Ongoing dependency on True Lean Solutions assets | Remove the shared stylesheet (T10); Tech Transpire owns its own design system in Phase 2 |
