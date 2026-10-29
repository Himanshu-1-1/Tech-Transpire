# Project Handoff — Tech Transpire Website Rebuild

**If you are a new agent or teammate taking over this project, read this file first.** It is the durable memory for the rebuild and must survive lost conversations. Update it whenever a decision is made, a claim is verified, or a step advances.

Last updated: 2026-10-29 (third working session).

---

## 1. What this project is

Rebuilding **www.techtranspire.com** from scratch: preserve existing content verbatim, and improve structure, positioning, UX, visual quality and the technical foundation. Visitor journey: **understand the challenge → establish credibility → explain the approach → demonstrate outcomes → start a conversation.**

- **Brand:** Tech Transpire, a business advisory and transformation consulting brand. DBA of **Akhani LLC**. Based in **Dallas–Fort Worth, Texas** (D-27).
- **Brand statement (H1):** *Clarity Before Change. Confidence Through Execution.* Supporting line: *Clarity · Alignment · Execution*.
- **Signature offer:** *Implementation Clarity & Execution Blueprint*. **Engagements:** Discovery · Execution Blueprint · Guided Implementation · Transformation Recovery. **Components:** Clarity & Discovery · Design & Alignment · Execution & Delivery · Transformation Recovery · Adoption & Outcomes · Ongoing Support.
- **Outcome themes (approved):** Better Decisions · Improved Performance · Efficient Operations · Sustainable Transformation (homepage only, no separate pages).
- **Visual direction:** Concept 06 plus the company's reference first-fold image (light, architectural photography, blue, selective navy sections). **Typography: Version B, serif** (Newsreader + Libre Franklin), confirmed twice by the company (D-28), even where a brief says "Typography A".
- **True Lean Solutions** is a separate brand. Don't copy it; mention it only in the About "Our company" paragraph.

## 2. Rules for all work

1. **Never reword existing business content** without approval. Corrections live in `site/src/lib/corrections.ts`, logged in [17](docs/website-architecture/17-approved-corrections-log.md).
2. **Never invent or exaggerate.** New copy is labelled and flagged for approval.
3. **Three content states (D-25 revised):** preserved source (archive, untouched) → internal review (review build) → approved for publication (public build). **Unverified claims are never published.** Articles with unverified claims are **held** unless an omission is approved ([19](docs/website-architecture/19-article-claims-report.md)). The same applies to bios, results, Healthcare and metadata.
4. **The $3M results are separate and never combined:** C-03 healthcare purchasing savings; C-02 eCommerce fraud prevention; a third $3M (consulting firm revenue, May draft) is never used.
5. **Photos (D-30):** only labelled original photographs. No AI-generated portraits of real people. Don't introduce Mayank Pujara.
6. **No pricing** at launch (D-26).
7. **Secrets** only in server environment variables. **Never show a false form success.**
8. **No deployment without explicit authorization.** The site is not launch-ready until a real contact submission reaches Zoho CRM and email.
9. Drive: use the connected account; never change file sharing (the connector can't undo it). Ask the company to download files.
10. This repository is **public**.

## 3. Where everything lives

| Path | What |
|---|---|
| [docs/website-architecture/](docs/website-architecture/) | Phase 1: 00–19, data, source archive, drafts |
| [12-gaps-and-decisions.md](docs/website-architecture/12-gaps-and-decisions.md) | **The register** (D-01–D-30, C-xx, E/F-xx, N-xx, MS-xx) |
| [19-article-claims-report.md](docs/website-architecture/19-article-claims-report.md) | Exact unverified claims (AC-xx per article, H-xx site-level) and what unblocks each |
| [docs/phase-2-design/](docs/phase-2-design/README.md) | Phase 2: tech record (02), interaction system (03), contact/Zoho (04), **readiness checklist (05)**, screenshots, photo requests |
| [site/](site/README.md) | **The website** (Astro 5, Node 22 LTS) |
| `site/src/data/publication.json` | **Publication state**: claim statuses, per-article claim lists, approved omissions |
| `.github/workflows/validate.yml` | CI: `npm run validate` on every push |

### Running and checking

```
cd site && npm ci                       # Node 22 LTS (.nvmrc)
npm run dev                             # review site, http://localhost:4321 (no on-page markers)
npm run dev:markers                     # same, with amber tags + "Review build" strip (REVIEW_MARKERS=1)
npm run validate                        # both builds + tests + content/gating + links (CI)
npm run build && npm run preview -- --port 4322
npm run qa                              # 49 browser checks against :4322
npm run screenshots                     # 1440/768/390 into docs/phase-2-design/screenshots
npm run deploy:pages                    # static review preview → gh-pages branch (D-34)
```

**Shareable review preview (D-34):** https://himanshu-1-1.github.io/Tech-Transpire/ (GitHub Pages, `gh-pages` branch). It is the review build (all content, no on-page markers, `noindex`), static, under `/Tech-Transpire/`. It has no server, so the contact form shows its failure message. It does **not** update automatically: run `npm run deploy:pages` after changes. This is not the production launch (05 O-6 still applies).
The machine used on 2026-10-29 had no system Node; a portable Node 22 from the session scratchpad was used. Install Node 22 LTS for ongoing work.

## 4. Completed milestones

| Date | Milestone |
|---|---|
| 2026-10-29 | Phase 1 architecture (00–15); 125/125 blocks mapped; project recovered; handoff created |
| 2026-10-29 | Phase 1 approved in principle; D-01–D-24 decided; corrections applied; MS-01 closed (18) |
| 2026-10-29 | Astro site built (all templates) with content rendered from the Phase 1 data |
| 2026-10-29 | **D-25 corrected:** claims report (19); publication gating implemented; 8 articles held |
| 2026-10-29 | **Typography B, D-26–D-30** recorded; Dallas–Fort Worth added to footer, About, Contact, JSON-LD |
| 2026-10-29 | **Premium design and interaction system (v3):** reference first fold, serif display system, signature "Confusion → Clarity" method graphic, magnetic CTAs, cursor halo, card spotlight, scroll reveals, concept graphics, reading progress, animated mobile menu (03) |
| 2026-10-29 | **Contact backend:** `/api/inquiry` with Zoho CRM + SMTP, spam protection, honest states; 14 unit tests |
| 2026-10-29 | **Validation workflow:** `npm run validate`, link checker, CI; browser QA 42/42; 31 screenshots |
| 2026-10-29 | Bugs found by QA and fixed: inner pages 500 on the Node server (output format); same-site form posts 403 (origin check → JSON); first submit click lost after correcting a field |
| 2026-10-30 | Hero photograph supplied and integrated (TT-AS-024; rights to confirm) |
| 2026-10-30 | **v4 premium layer** ([03](docs/phase-2-design/03-interaction-system.md)): page transitions, cursor v2, 3D tilt + gradient borders, word reveals, hero depth chips, light-blue signature method graphic, blueprint grid, brand-blue closing band, section rail. Palette: white + light blue + blue (footer stays navy). QA 46/46 |
| 2026-10-30 | **D-31 exact live wording:** company supplied the live homepage text. F-01–F-04 withdrawn; "Clarity. Alignment. Execution."; original fit-list headings; "Want to learn more?" restored. 63/65 live lines verbatim (the other two are the withdrawn $3M+ label) |
| 2026-10-30 | **Scroll-linked motion** (03): page progress bar, hero exit parallax, card-photo parallax, footer drift, stronger reveals. QA 46/46 |
| 2026-10-30 | **"Sounds Familiar?" redesign:** clean white (a photo backdrop was tried and rejected by the company); interactive `FaultLines` SVG (lines fall into alignment under a lens that follows the pointer); interactive statement and problem cards (spotlight, icon redraw, accent bar, focus dimming; centre-of-screen highlight on touch). QA 46/46 |
| 2026-10-30 | **D-32 Word files reviewed:** Home/Services/About match the archive; Home now shows the full fit list and "See Our Work →"; content check covers CTA labels (582 lines). Temp-TT draft = superseded (18). Word files gitignored (public repo) |
| 2026-10-30 | **Hero fixes:** jiggle near the top (header shrink moved the page and re-crossed the scroll threshold; footprint now constant, new QA check, 47/47); chip data path now brand blue; underline hugs "Through Execution." (clip wipe instead of dash draw) |
| 2026-10-30 | **On-page review markers off** (company request): amber tags, "Review build" strip and review notes hidden by default; `npm run dev:markers` / `REVIEW_MARKERS=1` brings them back. Items stay tracked in 12 and 19. Review build still shows unverified content and stays `noindex`; public build unchanged |
| 2026-10-30 | **Mack Akhani photo** supplied by the company and placed (D-33, TT-AS-025): Home founder card and About team tile, framed per placement; rights to confirm |
| 2026-10-30 | **Flip statements + dot cursor:** "Sounds Familiar?" statements flip in 3D on desktop to animated drawings (simple front cards on phones); trailing cursor ring removed, dot only. QA 49/49 |

## 5. Approved decisions (full text in 12 §5)

D-01 brand statement · D-02 signature offer · D-03 no AI page · D-04 pre-founding attribution · D-05 two separate $3M · D-06 Industries + Healthcare (hidden in nav until approved) · D-08 Akhani LLC line (legal) · D-09 titles · D-10 Hidden Gaps held · D-11 E-01–E-05 (E-02 "busywork") · D-12 simple form · D-14 fit list on Expertise · **D-15 Astro** · D-16 Zoho + email · D-17 case-studies page (no unverified summary figures) · D-18 themes on Home, type filter only · D-19–D-23 · D-24 TT-INS-003 without the C-14 sentence · **D-25 revised (hold unverified)** · **D-26 no pricing** · **D-27 Dallas–Fort Worth** · **D-28 typography B** · **D-29 wording** (hero line, themes, "Selected Experience") · **D-30 photos**.

## 6. Current status

| Area | Status |
|---|---|
| Design and templates | Complete in review. Waiting for photography (3 files) |
| Public build | 9 pages: Home, Expertise, Transformation Recovery, Insights, 2 articles (006, 008), About, Contact, 404. Industries, Healthcare, Privacy, case studies and 8 articles held |
| Contact | Works end to end with mocks; shows the honest failure until Zoho/SMTP are configured |
| Validation | `npm run validate` passes; QA 42/42; no overflow 320–1440; JS ≤ 2.3 KB gz per page |
| Launch | **Not ready.** See the blockers in [05](docs/phase-2-design/05-production-readiness-checklist.md) |

## 7. Outstanding approvals and inputs (owner: company)

1. **Photography:** the **hero photo is in place** (`hero-glass-office-skyline.png`, supplied 2026-10-29; confirm its rights, TT-AS-024). **Mack Akhani photo in place (D-33).** Still wanted in `docs/phase-2-design/assets/`: `Executive Lounge Meeting Overlooking the City.png` (closing band). Note: the dev server must be restarted after adding files there.
2. **Claims ([19](docs/website-architecture/19-article-claims-report.md)):** verify, or approve omissions, to release articles. Fastest path: the 005/010 engagement (C-05) and the 001/002 engagement figures; omissions for 001 (B08), 009 (stats + tag + heading), 010 (stats + sentence).
3. **Launch-blocking wording:** H-01 "three times…" · C-15 "6-8 weeks" / "2 to 6 weeks" · C-17 "1 business day".
4. **New copy:** N-02 theme lines and the "What we help you achieve" heading · "Selected Experience" intro line · N-04 labels and sentence · N-05 Healthcare · N-06 · N-13 · N-14 · N-16 · N-17 · small UI labels ("A good fit", "Already under way?", "Recovery in practice", concept-graphic labels such as "Stalled" / "Back on a defined path").
5. **Wording rule (D-31, D-32):** the company's Word files (`Home Page.docx`, `Services page.docx`, `About Us .docx`, local only) are the reference; existing text is used exactly as on the live site; no punctuation fixes (F-01–F-04 withdrawn, F-08–F-13 not applied).
6. **Profiles:** C-10, C-12, C-13, C-20; approved real photos for Kranthi and Devjet.
7. **Legal:** Privacy Policy (N-07), Akhani LLC wording (N-06), image rights.
8. **Zoho/SMTP/hosting** (04 steps 1–5), then the end-to-end test (05 F-1).

## 8. Next steps

1. **Company:** §7 items 1–3 and 8 unblock the most.
2. **Agent, when photos arrive:** rebuild; check hero blending and LCP; regenerate screenshots; run Lighthouse on staging (05 R-3).
3. **Agent:** add an axe accessibility audit to `npm run qa` (05 A-6); run the external link check on a networked machine (05 F-5); `npm audit` (05 P-6).
4. **With hosting chosen:** swap the adapter if needed; security headers; apex/https/trailing-slash rules; staging URL for the team; real Zoho + email test.
5. **Launch only with explicit authorization** (05 O-6).
