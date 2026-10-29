# Phase 2 screenshots: review build, 2026-10-29

Full-page captures of the Astro site (`site/`), **review build**. Desktop is 1440 px wide; mobile is 390 px (iPhone 12–15 width) at 1.5× density. Regenerate with `node scripts/screenshots.mjs` from `site/` while `npx astro preview` is running.

**Reading the review build:** a dark bar at the top marks it as not for publication. **Amber tags** mark drafts and unverified items, and a green tag marks a verified item. None of these appear on the public site, which also omits every unverified figure (the Home "Track record" band is hidden until at least two results are verified).

**Photography:** the two executive photographs requested from Drive are not yet in the repository. The hero and closing band show the architectural line illustration and a "Photograph pending" tag in their place. Once the files are added to `docs/phase-2-design/assets/`, the site uses them automatically and these screenshots can be regenerated.

## Typography comparison (Home)

| | Desktop | Mobile |
|---|---|---|
| **Version A: modern sans** (Inter Tight headings, Inter text), closest to Concept 06 | [home--sans--desktop.jpg](home--sans--desktop.jpg) | [home--sans--mobile.jpg](home--sans--mobile.jpg) |
| **Version B: refined serif headings** (Newsreader headings, Libre Franklin text) | [home--serif--desktop.jpg](home--serif--desktop.jpg) | [home--serif--mobile.jpg](home--serif--mobile.jpg) |

**Recommendation: Version A**, measured against the stated priorities:
- **Brand consistency:** the company's own lockup and wordmark artwork use a modern sans. A matches the brand as it already exists, and it matches the approved Concept 06 reference.
- **Readability:** the two are equal at headline sizes. At card-title and small-heading sizes (problem cards, values, article cards), A's sans is crisper and easier to scan than B's light serif.
- **Executive credibility and timelessness:** both are credible. A achieves it through restraint and spacing, not through a stylistic signal.

B remains a good option if the team prefers a more editorial, publication-like voice. The switch is one attribute (`data-type`); nothing else changes. To compare live, use the "A · Sans / B · Serif" switch in the review bar.

## Templates (Version A)

| Template | Page | Desktop | Mobile |
|---|---|---|---|
| Landing | Expertise `/services` | [desktop](services--sans--desktop.jpg) | [mobile](services--sans--mobile.jpg) |
| Detail | Transformation Recovery | [desktop](services-transformation-recovery--sans--desktop.jpg) | [mobile](services-transformation-recovery--sans--mobile.jpg) |
| Landing | Industries *(hidden from public nav until N-05 is approved)* | [desktop](industries--sans--desktop.jpg) | [mobile](industries--sans--mobile.jpg) |
| Detail | Healthcare *(draft N-05)* | [desktop](industries-healthcare--sans--desktop.jpg) | [mobile](industries-healthcare--sans--mobile.jpg) |
| Listing | Insights | [desktop](insights--sans--desktop.jpg) | [mobile](insights--sans--mobile.jpg) |
| Listing | Case studies | [desktop](insights-case-studies--sans--desktop.jpg) | [mobile](insights-case-studies--sans--mobile.jpg) |
| Article | A Seven-Year Migration, Closed in 19 Hours | [desktop](insights-seven-year-migration-closed-in-19-hours--sans--desktop.jpg) | [mobile](insights-seven-year-migration-closed-in-19-hours--sans--mobile.jpg) |
| About | About `/about-us` | [desktop](about-us--sans--desktop.jpg) | [mobile](about-us--sans--mobile.jpg) |
| Contact | Contact `/contact-us` | [desktop](contact-us--sans--desktop.jpg) | [mobile](contact-us--sans--mobile.jpg) |

All 21 review pages were also checked automatically for horizontal overflow at both widths: none.
