# Project Handoff — Tech Transpire Website Rebuild

**If you are a new agent or teammate taking over this project, read this file first, then [docs/website-architecture/00-phase-one-review.md](docs/website-architecture/00-phase-one-review.md).**

This file is the durable memory for the rebuild. It survives lost conversations. Keep it current: when a decision is made, a claim is verified, or a phase advances, update the relevant line here.

Last updated: 2026-10-29.

---

## 1. What this project is

Rebuilding **www.techtranspire.com** from scratch while **preserving existing content verbatim** and improving structure, positioning, UX and the technical foundation.

- **Brand:** Tech Transpire — business advisory and transformation consulting, a DBA of **Akhani LLC**.
- **Brand statement (approved H1):** *Clarity Before Change. Confidence Through Execution.* (D-01 / N-01)
- **Signature offer:** *Implementation Clarity & Execution Blueprint*, delivered through **four engagement types** (Discovery · Execution Blueprint · Guided Implementation · Transformation Recovery) and **six components** (Clarity & Discovery · Design & Alignment · Execution & Delivery · Transformation Recovery · Adoption & Outcomes · Ongoing Support). *(Transformation Recovery is intentionally both an engagement type and a component — this matches the live site; it is not an error.)*
- **Approved visual direction:** Concept 06 — but **UI/UX has not started and must not start until Phase 1 is signed off.**
- **True Lean Solutions** is a *separate* execution brand. Do **not** copy its structure or design, and do not promote it in primary nav or on Home (D-08).

## 2. The rules that govern all work here

1. **Do not start visual redesign** until the Phase 1 approval checklist's blocking items are signed (14).
2. **Never reword existing business content** without approval. Existing wording is preserved verbatim; proposed edits live only as E-xx items in [12 §7](docs/website-architecture/12-gaps-and-decisions.md).
3. **Never invent** clients, testimonials, credentials, metrics, case-study figures, locations or years.
4. **Unverified metrics and credentials stay in the source, flagged `pending`** — never deleted, never published until verified. Structural work does not wait on them. The content model's `Claim` entity gates rendering so an unverified figure cannot ship.
5. This repository is **public**: pending claims in [12 §3](docs/website-architecture/12-gaps-and-decisions.md) are not approved for publication.

## 3. Where everything lives

| Path | What |
|---|---|
| [docs/website-architecture/](docs/website-architecture/) | All Phase 1 deliverables (00–15), data, source archive, drafts |
| [00-phase-one-review.md](docs/website-architecture/00-phase-one-review.md) | **Start here** — the six review points in one pack (v1.1) |
| [12-gaps-and-decisions.md](docs/website-architecture/12-gaps-and-decisions.md) | The register: decisions (D-xx), claims (C-xx), edits (E-xx), new content (N-xx), missing sources (MS-xx) |
| [14-phase-one-approval.md](docs/website-architecture/14-phase-one-approval.md) | The sign-off checklist — the gate to Phase 2 |
| `docs/website-architecture/data/` | `content-blocks.json` (125 blocks), migration map, redirects, assets, JSON Schemas |
| `docs/website-architecture/source-archive/` | Verbatim text, raw HTML, original images and `.docx` of every page and article |
| `docs/website-architecture/drafts/` | New content awaiting approval (Healthcare, Privacy Policy, N-xx) |
| `docs/website-architecture/tools/` | Perl scripts that regenerate the data files from the archive |

**Validate the data pipeline** from `docs/website-architecture/`:
`perl tools/build-inventory.pl && perl tools/build-migration.pl > /dev/null`
It reports `125 blocks mapped, 0 unmapped` and **fails if any block is unmapped**. Last run clean on 2026-10-29.

## 4. Status

| Phase | Status |
|---|---|
| **1. Structure** (architecture, content preservation, technical foundation) | **Complete and internally consistent; awaiting stakeholder approval** |
| 2. UI/UX (Concept 06) | Not started — blocked on Phase 1 sign-off |
| 3. Development | Not started |
| 4. Content migration & QA | Not started |
| 5. Launch | Not started |

### Phase 1 deliverables — all authored
00 Review pack · 01 Discovery · 02 Inventory · 03 Audience & objectives · 04 Sitemap · 05 Navigation · 06 Page blueprints · 07 Content migration (125/125 mapped) · 08 Relationships · 09 Content schema (16 entities + JSON Schemas) · 10 SEO/URL plan · 11 Technical architecture · 12 Gaps & decisions · 13 Roadmap · 14 Approval checklist · 15 Remediation checklist. Drafts: Healthcare, Privacy Policy, new-content-drafts.

## 5. What remains — and who owns it

**None of the remaining Phase 1 items are agent authoring tasks.** They are human decisions, confirmations or access grants. An agent cannot close them by writing more documents.

### Blocking Phase 2 sign-off (owner: company / stakeholders)
- Accept business objectives A–F and the audience list, incl. whether PE/investor stakeholders are a real target (03).
- Approve the IA set: sitemap (04), navigation & footer (05), page blueprints (06), relationship model (08), content schema (09), user journeys (03).
- Approve SEO/redirect plan (10) and the technical approach in principle (11).
- Decide **D-06 Industries/Healthcare** — this sets whether nav has 5 or 6 items. Review [drafts/healthcare-page-draft.md](docs/website-architecture/drafts/healthcare-page-draft.md). *(Navigation is specified for both variants, so it does not block Phase 2 design.)*

### Launch blockers, not Phase 2 blockers (owner: company / counsel)
- **Master Drive folder is still private** (MS-01 / G-11). Share as "Anyone with the link — Viewer" so the Google Sites project and the $3M fraud reference material can be reconciled.
- Privacy Policy (D-13 / N-07): legal review of the first draft.

### Claims & credentials pending verification (owner: named people) — do not publish until ✅
Mack (C-02–C-10, C-14, C-18), Kranthi (C-12 PMP), Devjet (C-13 bio), Hemang (C-20 profile). Full table: [12 §3](docs/website-architecture/12-gaps-and-decisions.md). C-11 (LSSBB) is confirmed.

### Recommended, awaiting a yes (owner: company)
D-09, D-10, D-11, D-14, D-15, D-17, D-18, D-24. Copy drafts N-02, N-04, N-05, N-06, N-09, N-10, N-13, N-14 await approval (can run in parallel with Phase 2).

## 6. Conflicts between the files and the documented decisions

**None found** on 2026-10-29. The deliverables are internally consistent, faithful to the source archive, and aligned with the master brief (brand statement, signature offer, four engagements, six components, Concept 06, Akhani LLC / True Lean Solutions separation). The build pipeline validates clean.

## 7. When Phase 1 is approved, do this next

1. Record the sign-off in [14-phase-one-approval.md](docs/website-architecture/14-phase-one-approval.md) and flip the Phase 1 row in [README.md](README.md) and §4 above.
2. Begin Phase 2 (UI/UX) per [13 §2 step 4](docs/website-architecture/13-implementation-roadmap.md): design system + Concept 06 refinement, page templates matching the block types in 09. Supply the Concept 06 reference image to design (MS-02).
3. Keep claims gated: the build must refuse to render any `Claim` whose status is not verified.
