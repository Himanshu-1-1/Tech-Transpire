# Project Handoff — Tech Transpire Website Rebuild

**If you are a new agent or teammate taking over this project, read this file first.** It is the durable memory for the rebuild and must survive lost conversations. Update it whenever a decision is made, a claim is verified, or a step advances.

Last updated: 2026-10-29.

---

## 1. What this project is

Rebuilding **www.techtranspire.com** from scratch while **preserving existing content verbatim** and improving structure, positioning, UX and the technical foundation. Goal: a distinctive, credible, high-performing site that establishes executive trust and turns relevant business challenges into conversations.

- **Brand:** Tech Transpire, a business advisory and transformation consulting brand. A **DBA of Akhani LLC**.
- **Brand statement (H1):** *Clarity Before Change. Confidence Through Execution.*
- **Signature offer:** *Implementation Clarity & Execution Blueprint*. **Four engagement types:** Discovery · Execution Blueprint · Guided Implementation · Transformation Recovery. **Six components:** Clarity & Discovery · Design & Alignment · Execution & Delivery · Transformation Recovery · Adoption & Outcomes · Ongoing Support. Transformation Recovery appears in both lists on purpose; this matches the live site.
- **Visual direction:** Concept 06, selected unanimously. The final site must be unique to Tech Transpire.
- **True Lean Solutions** is a separate execution brand under Akhani LLC. Do not copy its site structure or design. Not in primary nav or on Home.

## 2. Rules for all work

1. **Never reword existing business content** without approval. Proposed edits are logged (E-xx in Phase 1, F-xx in Phase 2) and not applied.
2. **Never invent or exaggerate** clients, testimonials, credentials, metrics, locations or years.
3. **Unverified claims stay in the register, flagged `pending`.** They are never deleted and never published until verified. The `Claim` entity gates rendering.
4. **The two $3M results are separate and never combined:** healthcare purchasing/standardization (~$3M annual savings, C-03) and global eCommerce fraud prevention (~$3M prevented losses, C-02). Neither is ever described as revenue. Exact public wording waits on evidence.
5. **Follow the Phase 2 sequence:** design approval (Step C) comes before applying the design to every page.
6. **No production deployment without explicit authorization.**
7. This repository is **public**; pending claims are not approved for publication.

## 3. Where everything lives

| Path | What |
|---|---|
| [docs/website-architecture/](docs/website-architecture/) | Phase 1: deliverables 00–16, data, source archive, drafts |
| [00-phase-one-review.md](docs/website-architecture/00-phase-one-review.md) | Phase 1 summary pack |
| [12-gaps-and-decisions.md](docs/website-architecture/12-gaps-and-decisions.md) | Register: decisions D-xx, claims C-xx, edits E-xx, new content N-xx, missing sources MS-xx |
| [16-open-decisions-matrix.md](docs/website-architecture/16-open-decisions-matrix.md) | The eight unresolved decisions with recommendations, awaiting your choice |
| [docs/phase-2-design/](docs/phase-2-design/) | Phase 2: design system, prototypes, step tracker |
| `docs/website-architecture/data/` | `content-blocks.json` (125 blocks), migration map, redirects, assets, JSON Schemas |
| `docs/website-architecture/source-archive/` | Verbatim text, raw HTML, original images, `.docx` of every page and article |

**Validate the Phase 1 data** from `docs/website-architecture/`: `perl tools/build-inventory.pl && perl tools/build-migration.pl > /dev/null`. Expect `125 blocks mapped, 0 unmapped`. Last clean run: 2026-10-29.

**Homepage proposal (published for review):** https://claude.ai/artifact/1Tbbtbrdu5p288xXVqM2dG (private until shared from the page's Share menu). Source: [docs/phase-2-design/prototypes/home.html](docs/phase-2-design/prototypes/home.html).

## 4. Completed milestones

| Date | Milestone |
|---|---|
| 2026-10-29 | Phase 1 architecture authored: deliverables 00–15, 125/125 content blocks mapped, source archive, schemas, drafts |
| 2026-10-29 | Project recovered after a lost conversation; no conflicts found; this handoff file created |
| 2026-10-29 | **Phase 1 approved in principle** to proceed into Phase 2. Verification, legal and publication items carried as launch gates |
| 2026-10-29 | Open-decisions matrix prepared (16) |
| 2026-10-29 | **Phase 2 Steps A and B:** technical status confirmed (no code yet); design system v1 and Concept 06 homepage prototype proposed |

## 5. Approved decisions

| ID | Decision |
|---|---|
| D-01 | Brand statement "Clarity Before Change. Confidence Through Execution." is the Home H1 |
| D-02 | Expertise built on the signature offer, four engagement types, six components. Not split into five service pages |
| D-03 | No standalone AI & Digital Enablement page at launch |
| D-04 | Pre-founding results carry: "Engagement led by Mack Akhani prior to founding Tech Transpire." Which articles it covers is open (C-18) |
| D-05 | Two separate $3M outcomes, never combined, never "revenue" |
| D-06 | Industries included, Healthcare first, built from approved source content only. Hidden from primary nav until enough approved content exists |
| D-08 | "Tech Transpire is a DBA of Akhani LLC" in footer and About, discreetly, subject to legal wording |
| D-12 | Simple inquiry form. Annual revenue removed (not required). Facebook kept as an optional lead source |
| D-16 | Form → Zoho CRM lead + email notification (feasibility checks open) |
| D-19, D-20, D-22, D-23 | Apex domain fix; `/blogs` CTAs repaired; keep `/services`, `/about-us`, `/contact-us` |

## 6. Current status

| Phase | Status |
|---|---|
| 1. Structure | **Approved in principle** (2026-10-29) |
| 2. UI/UX | **Step C: awaiting design approval** of the design system and homepage prototype |
| 3. Development | Not started. Platform recommendation: Astro static site, content in git (D-15, open) |
| 4. Content migration & QA | Not started |
| 5. Launch | Not started. Requires explicit authorization |

## 7. Outstanding approvals (owner: company)

1. **Design approval (Step C):** design system v1 and homepage direction. Includes three design choices: hero visual (blueprint illustration or licensed photography), dark mode at launch, and when the evidence band appears ([01 §11](docs/phase-2-design/01-design-system.md)).
2. **Open decisions D-09, D-10, D-11, D-14, D-15, D-17, D-18, D-24:** see [16](docs/website-architecture/16-open-decisions-matrix.md).
3. **Editorial flags F-01 – F-07** from the design ([01 §10](docs/phase-2-design/01-design-system.md)) and **E-01 – E-05, E-09** from Phase 1.
4. **Copy drafts** N-02, N-04, N-05, N-06 (Option A or B), N-09, N-10, N-13, N-14.
5. **Legal:** Privacy Policy draft (N-07); Akhani LLC wording (N-06). Launch blockers, not design blockers.

## 8. Open questions and pending verification

| Item | Owner |
|---|---|
| Master Drive folder still private (MS-01). Share as "Anyone with the link — Viewer" | Drive owner |
| C-02, C-03 (the two $3M results), C-04 – C-09, C-14, C-18 | Mack |
| C-10 "over a decade" timeline | Mack |
| C-12 PMP | Kranthi |
| C-13 bio | Devjet |
| C-20 profile | Hemang |
| C-15 "6-8 weeks" and C-17 "1 business day" still current? | Company |
| Concept 06 source file (MS-02), brand guidelines (MS-07), vector logo (MS-08), leadership photos (MS-09) | Company |
| Zoho CRM data centre and API access; analytics tool (D-16) | Company |

## 9. Next steps

1. **You:** review the homepage prototype and design system; approve or request changes (Step C). Answer the decision matrix (16).
2. **On approval:** Step D. Design the remaining templates (Landing, Detail, Article, Listing, About, Contact, Utility) as prototypes in `docs/phase-2-design/prototypes/`, then confirm D-15 and scaffold the production site.
3. **Then:** Step E (content migration from `content-blocks.json`, navigation, Zoho form, responsive, accessibility) and Step F (testing, SEO validation, verbatim content diff, launch readiness).
