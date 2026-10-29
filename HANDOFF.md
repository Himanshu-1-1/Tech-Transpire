# Project Handoff — Tech Transpire Website Rebuild

**If you are a new agent or teammate taking over this project, read this file first.** It is the durable memory for the rebuild and must survive lost conversations. Update it whenever a decision is made, a claim is verified, or a step advances.

Last updated: 2026-10-29 (end of the second working session).

---

## 1. What this project is

Rebuilding **www.techtranspire.com** from scratch while **preserving existing content verbatim** and improving structure, positioning, UX and the technical foundation. Goal: a distinctive, credible, high-performing site that establishes executive trust, demonstrates experience, and turns relevant business challenges into conversations. Visitor journey: **understand the challenge → establish credibility → explain the approach → demonstrate outcomes → start a conversation.**

- **Brand:** Tech Transpire, a business advisory and transformation consulting brand. A **DBA of Akhani LLC**.
- **Brand statement (H1):** *Clarity Before Change. Confidence Through Execution.*
- **Signature offer:** *Implementation Clarity & Execution Blueprint*. **Four engagement types:** Discovery · Execution Blueprint · Guided Implementation · Transformation Recovery. **Six components:** Clarity & Discovery · Design & Alignment · Execution & Delivery · Transformation Recovery · Adoption & Outcomes · Ongoing Support. Transformation Recovery appears in both lists on purpose, as on the live site.
- **Visual direction:** Concept 06 (approved, unanimous). Premium architectural photography; light theme with selective dark navy sections. Must be unique to Tech Transpire.
- **True Lean Solutions** is a separate execution brand under Akhani LLC. Do not copy its structure or design. Not in primary nav or on Home; mentioned only in the About "Our company" paragraph.

## 2. Rules for all work

1. **Never reword existing business content** without approval. Approved corrections are applied at build time from `site/src/lib/corrections.ts` and logged exactly in [17](docs/website-architecture/17-approved-corrections-log.md). The archive is never edited.
2. **Never invent or exaggerate** clients, testimonials, credentials, metrics, locations or years. New copy is labelled N-xx and needs approval.
3. **Unverified claims stay in the register, flagged `pending`.** They are never deleted and never published on site-level pages until verified (`site/src/lib/claims.ts` mirrors the register).
4. **Case-study articles publish as authored (D-25)**, verbatim, with the pre-founding attribution line where it applies. Only site-level results are gated.
5. **The two $3M results are separate and never combined:** healthcare purchasing standardization (~$3M annual savings, C-03) and global eCommerce fraud prevention (~$3M prevented losses, C-02). Neither is ever described as revenue. A third "$3M" (a consulting firm's annual revenue, May 2026 draft) must never be combined with either.
6. **No production deployment without explicit authorization.**
7. Drive: use the connected account; never change sharing on files without asking. Identify exact files when something is needed.
8. This repository is **public**. Pending claims are not approved for publication.

## 3. Where everything lives

| Path | What |
|---|---|
| [docs/website-architecture/](docs/website-architecture/) | Phase 1: deliverables 00–18, data, source archive, drafts |
| [12-gaps-and-decisions.md](docs/website-architecture/12-gaps-and-decisions.md) | **The register**: decisions D-xx, claims C-xx, edits E-xx, new content N-xx, missing sources MS-xx |
| [17-approved-corrections-log.md](docs/website-architecture/17-approved-corrections-log.md) | Exact record of every wording change; open F-05/F-06 and new F-08–F-13 |
| [18-drive-master-reconciliation.md](docs/website-architecture/18-drive-master-reconciliation.md) | Master Drive folder review; the superseded May 2026 draft |
| [docs/phase-2-design/](docs/phase-2-design/) | Phase 2: design system, technical decision record, **screenshots**, photography folder |
| [site/](site/) | **The website** (Astro 5). Reads content straight from `docs/website-architecture/data/` |

### Running the site

```
cd site && npm install
npm run dev                                   # review build at http://localhost:4321
npm run build && npx astro preview            # review build, production-like
npm run build:public && npm run check:content # public build + verbatim/gating checks
node scripts/screenshots.mjs --pages=/ --types=sans,serif   # needs preview running and local Chrome
```
Node 20.3+ is required. The machine used on 2026-10-29 had no system Node; a portable Node 22 was used from the session scratchpad. Install Node LTS for ongoing work.

**Review build vs public build:** the review build shows drafts and pending items with amber tags, plus an A/B typography switch, and is `noindex`. The public build strips all of that, omits unverified figures and unapproved pages, and is indexable. See [02-technical-decision-record.md](docs/phase-2-design/02-technical-decision-record.md).

## 4. Completed milestones

| Date | Milestone |
|---|---|
| 2026-10-29 | Phase 1 architecture authored (00–15), 125/125 blocks mapped |
| 2026-10-29 | Project recovered after a lost conversation; this handoff created |
| 2026-10-29 | **Phase 1 approved in principle**; decisions D-01–D-04, D-06 recorded |
| 2026-10-29 | **All eight open decisions approved** (D-09, D-10, D-11, D-14, D-15, D-17, D-18, D-24); D-25 decided (case studies publish as authored) |
| 2026-10-29 | Corrections E-01–E-05, E-09, F-01–F-04, F-07 applied and logged (17) |
| 2026-10-29 | **MS-01 closed**: master Drive folder reviewed via the company account (18) |
| 2026-10-29 | Phase 2 v1 prototype; feedback received; **Concept 06 approved conditionally** |
| 2026-10-29 | **Astro site built**: all templates, 21 review pages / 18 public pages; content from the Phase 1 data; claims gating; content-integrity check (545 verbatim lines) passing; full-page screenshots with A/B typography comparison |

## 5. Approved decisions (summary; full text in 12 §5)

D-01 brand statement H1 · D-02 signature offer, 4 engagements, 6 components · D-03 no AI & Digital Enablement page · D-04 pre-founding attribution line · D-05 two separate $3M outcomes · **D-06** Industries with Healthcare first; hidden from nav until approved content is ready · D-08 Akhani LLC line in footer and About, subject to legal · **D-09** Doc H1 on page, Sheet title on cards/SEO · **D-10** "Hidden Gaps" held · **D-11** E-01–E-05 (E-02 = "busywork") · D-12 simple form, no annual revenue, Facebook optional · **D-14** fit list canonical on `/services#fit` · **D-15 Astro**, secure server-side Zoho · D-16 Zoho CRM + email · **D-17** case-studies page, no unverified summary figures · **D-18** outcome themes on Home; type filter only · D-19–D-23 · **D-24** TT-INS-003 without the C-14 sentence · **D-25** case studies publish as authored · Phase 2: light theme only; architectural photography; results band after the approach, verified only.

## 6. Current status

| Phase | Status |
|---|---|
| 1. Structure | Approved in principle |
| 2. UI/UX | **Step C pending**: rendered screenshots delivered for review; typography A/B to choose. Steps D–F largely built in `site/` (see [phase-2-design/README](docs/phase-2-design/README.md)) |
| 3. Development | Astro site exists. Open: Zoho/email server function, hosting adapter, redirects, analytics |
| 4. Migration & QA | Content migrated by construction (renders from the data). Open: link, redirect, accessibility, performance checks |
| 5. Launch | Not started. Requires explicit authorization |

## 7. Outstanding approvals (owner: company)

1. **Design review** of the [screenshots](docs/phase-2-design/screenshots/README.md) and the **typography choice** (recommendation: Version A, modern sans).
2. **Photography:** add `Executive Meeting Above the Skyline.png` and `Executive Lounge Meeting Overlooking the City.png` to `docs/phase-2-design/assets/` and confirm usage rights.
3. **New copy:** F-05 hero eyebrow "Clarity · Alignment · Execution"; F-06 / N-02 "What we help you achieve" + theme lines; "Track record" / "Results from the work"; N-04 labels and sentence; N-05 Healthcare page; N-06 Option B; N-13; N-14; N-16; N-17 case-studies lead; small UI labels (e.g. "A good fit", "Already under way?", "Recovery in practice").
4. **Corrections:** F-08–F-13 (punctuation and grammar found during the build).
5. **New decisions:** D-26 publish pricing? (recommend not at launch) · D-27 show Dallas–Fort Worth location? (recommend yes if accurate).
6. **Legal:** Privacy Policy draft (N-07); Akhani LLC wording (N-06). Launch blockers.

## 8. Open questions and pending verification

| Item | Owner |
|---|---|
| C-02 / C-03 (the two $3M results), C-04–C-09, C-14, C-18 (pre-founding status of TT-INS-007–010) | Mack |
| C-10 "over a decade" timeline (gates the Home founder block and Mack's profile) | Mack |
| C-12 PMP · C-13 bio · C-20 profile | Kranthi · Devjet · Hemang |
| C-15 "6-8 weeks" / "2 to 6 weeks" and C-17 "1 business day" still current? | Company |
| Vector logo master (MS-08). The logo folder has PNG/JPG only; the site uses the best original PNG | Company |
| Newer headshots exist in Drive (`Mack Akhani.png`, `Mack Prof. Headshot FB.png`); `Mayank Pujara.png` is a person not on the site. Which to use? | Company |
| Hosting provider; Zoho data centre and API access; analytics tool (D-16) | Company |
| "Industry Research" memo (Drive, Oct 12): use third-party statistics in a "Why clarity matters" section? Each figure needs checking against its original source | Company |

## 9. Next steps

1. **Company:** review screenshots, choose A or B, add the two photos, answer §7–§8.
2. **Agent, on approval:** lock the typography (ship only that version's fonts), regenerate screenshots with real photography, polish templates from feedback.
3. **Step E:** implement `/api/inquiry` (Zoho lead + email; secrets in host env), choose the hosting adapter, write redirects from `data/redirects.csv`, add consented analytics if chosen.
4. **Step F:** link check, redirect tests, axe accessibility audit per template, Lighthouse budgets, final content diff, launch checklist (15). **No deployment without explicit authorization.**
