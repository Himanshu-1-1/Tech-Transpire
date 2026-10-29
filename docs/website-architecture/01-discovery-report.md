# 01 — Discovery Report

**Project:** Tech Transpire website rebuild — Phase 1 (Structure)
**Discovery date:** 2026-10-29
**Status:** Draft for stakeholder review

---

## 1. Summary

The current Tech Transpire website at `https://www.techtranspire.com` is a **five-page Google Sites site** whose real content is **not stored in Google Sites at all**. Each page contains a single "Custom embed" (an HTML snippet in a sandboxed iframe) that, at runtime, fetches content from **public Google Docs and a Google Sheet** through a **Google Apps Script proxy**, then renders it with JavaScript.

That architecture had three consequences for discovery:

1. A normal crawler or scraper sees only the navigation shell — every page appeared empty on first pass.
2. The authoritative copy lives in Google Docs. All of those Docs were publicly exportable, so **all page and article copy was captured verbatim** from the source Docs.
3. Search engines are likely seeing very little of the site's actual content (see §6).

**Inventory completeness:** All five navigable pages, all ten published Insights articles, two unpublished Insights drafts, eighteen image assets, the contact form specification, and all metadata were captured. Coverage of *publicly reachable* content is assessed as complete. Coverage of *company source material* is **not** complete, because the supplied Google Drive folder could not be accessed (see §4).

---

## 2. How content was captured

| Step | Method | Result |
|---|---|---|
| 1 | Downloaded HTML for `/`, `/home`, `/services`, `/insights`, `/about-us`, `/contact-us` | Only Google Sites chrome (logo, nav, "Report abuse") present in page HTML |
| 2 | Extracted the `data-code` attribute of each page's Custom embed | Found the embedded HTML app for each page, including its `DOC_ID` / `SHEET_ID` |
| 3 | Exported each Google Doc with `https://docs.google.com/document/d/{id}/export?format=html` | Full verbatim page copy for Home, Services, About |
| 4 | Exported the Insights Google Sheet (`gviz` CSV) | 12 article rows (10 published, 2 unpublished) |
| 5 | Exported each article's Google Doc | Full verbatim copy of all 10 published articles |
| 6 | Extracted Contact page copy and form from its hard-coded embed HTML | Full copy, form fields, form handler, booking link |
| 7 | Downloaded every referenced Google Drive image via the public thumbnail endpoint | 17 of 18 images archived; site logo could not be downloaded |
| 8 | Probed likely legacy URLs and domain variants | See §5 |

All captured text was converted from HTML to plain text **by script**, with no manual retyping. The verbatim archive is at [`source-archive/`](source-archive/), and a block-level, machine-readable version is at [`data/content-blocks.json`](data/content-blocks.json) (125 blocks, each carrying its archive line range).

---

## 3. What exists today

### 3.1 Pages

| ID | Nav label | URL | `<title>` | Content source |
|---|---|---|---|---|
| TT-PG-001 | Home | `/` and `/home` (both return 200) | Tech Transpire | Google Doc `1nszXWql…` |
| TT-PG-002 | Services | `/services` | Tech Transpire - Services | Google Doc `1X9fvNF9…` |
| TT-PG-003 | Insights | `/insights` | Tech Transpire - Insights | Embed + Google Sheet `1js_i1Qv…` |
| TT-PG-004 | About | `/about-us` | Tech Transpire - About | Google Doc `1dFDzRl0…` |
| TT-PG-005 | Contact Us | `/contact-us` | Tech Transpire - Contact Us | Hard-coded embed HTML |

**Current navigation order:** Home · About · Services · Insights · Contact Us.
**No footer, legal pages, privacy policy, sitemap.xml, or robots.txt exist** (sitemap.xml and robots.txt return 404).

### 3.2 Insights

Ten published articles, all authored by Mack Akhani and dated between 26 Aug 2026 and 4 Sep 2026. Three are categorised "Case Study", five "Transformation", two "Execution" (TT-INS-005 is labelled "Transformation" but is written as a case study). **Articles have no individual URLs** — each opens in a modal on `/insights`. Two further rows ("The Hidden Gaps That Sink Every Transformation Before It Starts", twice, with different dates and read times) are marked unpublished and have no linked document.

### 3.3 Services

The current site presents **one signature offer**, *Implementation Clarity & Execution Blueprint* (6–8 weeks), delivered through four engagement types (Discovery, Execution Blueprint, Guided Implementation, Transformation Recovery) and six component areas (Clarity & Discovery, Design & Alignment, Execution & Delivery, Transformation Recovery, Adoption & Outcomes, Ongoing Support).

**The five capability groups proposed in the brief — Strategic Advisory, Process Improvement, Technology Transformation, Operational Excellence, AI & Digital Enablement — do not appear anywhere on the current site.** See [12-gaps-and-decisions.md](12-gaps-and-decisions.md), D-02 and D-03.

### 3.4 Industries

No industries page or industry list exists. Industry context appears only inside case studies and biographies: healthcare (compliance provider serving hospital systems; healthcare e-learning platform; PE-backed eye care network), a consumer social platform, global eCommerce and venture-funded technology start-ups (biography only), and CRM/SaaS platforms (biography only).

### 3.5 People

Four profiles on About, each with photo, title, biography, and LinkedIn link: Mack Akhani (Founder & CEO), Hemang Dwivedi (Operations and Technology Leader), Kranthi Kumar Goli (QA Architect | QA Manager | PMP Certified), Devjet Bag (Accountant).

### 3.6 Contact and conversion

- Email `info@techtranspire.com`, phone `+1 (979) 479-2779`, LinkedIn company page.
- 30-minute intro call booking via Microsoft Bookings (`outlook.office.com/book/IntroCallwithTechTranspire@techtranspire.com/`).
- A contact form (first name, last name, work email, company, annual revenue range, situation, referral source) posting to a Google Apps Script endpoint.
- No physical address is published.

### 3.7 Not present on the current site

Brand line "Clarity Before Change. Confidence Through Execution." · the four Concept 06 outcome themes · any mention of Akhani LLC or True Lean Solutions · testimonials (a `REVIEWS_SHEET_ID` placeholder exists in the page code but is unconfigured) · client logos · certifications page · industries · whitepapers or downloadable files · videos (the code supports them; none are used) · privacy policy · analytics.

---

## 4. Access limitations and missing sources

| ID | Source | Status | Impact |
|---|---|---|---|
| MS-01 | Google Drive folder `1jmmKeDXAV6aIy-oFlknSZ9RrSd0C3NA6` (supplied by the user) | **Inaccessible** — redirects to Google sign-in (private) | Any additional content in that folder (drafts, decks, brand files, Concept 06, case material) is **not** reflected in this inventory. Share the folder as "Anyone with the link — Viewer" or export it, then re-run discovery. |
| MS-02 | Concept 06 design file | Not supplied; known only from the brief's description | Used for navigation labels and outcome themes only, as instructed |
| MS-03 | Site logo master file | Shown on site but download blocked by Google; no vector/master source | Required before Phase 2 |
| MS-04 | Google Sites page history / earlier site versions | Not accessible without editor access | Cannot confirm whether previously published pages were removed |
| MS-05 | Google Search Console and analytics data | No analytics tag present; Search Console not accessible | Cannot identify which URLs receive search traffic or have backlinks |
| MS-06 | Privacy policy, terms, legal entity wording | Do not exist | Must be created and approved (P0 for privacy policy) |
| MS-07 | Brand guidelines | Not supplied | Phase 2 dependency |
| MS-08 | Testimonials / reviews | Feature scaffolded but never configured; no source | No testimonials may be published until supplied with consent |
| MS-09 | Verification evidence for quantified claims | Not supplied | See claims register in [12-gaps-and-decisions.md](12-gaps-and-decisions.md) §3 |

---

## 5. Technical findings

| # | Finding | Evidence | Consequence |
|---|---|---|---|
| T1 | Page content is rendered client-side inside a sandboxed iframe, fetched from Google Docs through an Apps Script proxy | `data-code` embeds; `PROXY` constant | Search engines may not associate this text with techtranspire.com; content disappears if the proxy, Docs sharing, or quota fails |
| T2 | `/` and `/home` both serve the homepage with HTTP 200 | Probe | Duplicate URL, no canonical |
| T3 | No meta descriptions on the indexable page shell; descriptions exist only inside the iframe | Page `<head>` | Search snippets are uncontrolled |
| T4 | `/blogs` returns 404, yet is the target of "Read Our Case Studies" (Services) and "See Our Case Studies" (About) | TT-PG-002-B07, TT-PG-004-B06 | Two broken CTAs on live pages |
| T5 | Home CTA "See Our Work" points to `/about-us`, which contains no work examples | TT-PG-001-B09 | Mismatched destination |
| T6 | Insights articles have no URLs | Modal-based rendering | Articles cannot be linked, shared, or indexed individually; no legacy article URLs exist to redirect |
| T7 | Apex domain `techtranspire.com` does not respond (HTTPS and HTTP); `http://www.` correctly 301s to `https://www.` | Probe | Visitors typing the bare domain fail |
| T8 | Contact form shows its success message even when submission fails (`.catch(showSuccess)`, `no-cors`) | Embed source | Enquiries can be silently lost |
| T9 | Contact form has no consent notice and no privacy policy link | Embed source | Compliance gap |
| T10 | Shared stylesheet loaded from `cdn.jsdelivr.net/gh/trueleansolutions/website-stylesheet` | Embed `<link>` | Tech Transpire's presentation currently depends on a True Lean Solutions repository; to be removed in the rebuild |
| T11 | No analytics or tag manager present | Page source | No baseline traffic data |
| T12 | Google Sites shell includes "Search this site", "Report abuse", "Page updated" | TT-GL-001 | Platform chrome; not company content |

---

## 6. Content quality findings (recorded, not changed)

The full list, with the existing wording and the suggested replacement for each, is in [12-gaps-and-decisions.md](12-gaps-and-decisions.md). The main items:

- **Attribution inconsistency.** Four case studies end with "Engagement led by Mack Akhani prior to founding Tech Transpire." Four other articles, and the homepage statistics, present results from the same engagements as "we" with no such note.
- **One figure, three meanings.** "$3M" appears as "Revenue impact from founder-led transformation engagements" (Home), "prevented $3M in fraud losses" (Mack Akhani bio), and "$3M annual savings through preferred pricing" (TT-INS-009).
- **Same engagement described two ways.** TT-INS-003 describes the client as "a healthcare compliance provider"; TT-INS-007 describes what appears to be the same 19-hour engagement as "a healthcare SaaS client".
- **Title mismatches.** For TT-INS-001, -004 and -005 the listing title in the Sheet differs from the H1 inside the article Doc.
- **Duplicated block.** The "fit list" (5 yes / 5 no) is identical on Home and Services.
- **Typos in source:** "rexactlyan" (TT-INS-002), "buil9work" (TT-INS-004), "Kranthi Architects" (capitalised verb), "TechTranspire" (no space) in two places.
- **Formatting defect:** one card title in TT-INS-001 is styled as a section heading.

---

## 7. What discovery did not do

- It did not review the True Lean Solutions website, in line with the brief's instruction not to use it as a template.
- It did not use third-party profiles (LinkedIn, data brokers) as content sources. Only content published on techtranspire.com, or in Tech Transpire's own source Docs, is treated as existing material.
- It did not change any source content.

---

## 8. Update 2026-10-29: Drive folders and reconciliation

| Folder | Access | Contents | Reconciliation result |
|---|---|---|---|
| Master website folder `1jmmKeDX…` | **Still private** (sign-in required; re-tested) | Per the company: the original Google Sites project, page sources, blogs, case studies, other materials | **Not reconciled.** MS-01 remains open. Owner action R-06 in [15](15-technical-remediation-checklist.md) |
| Logo assets `1DISWN51…` | Public | 5 files: `Tech Transpire Logo (NO BG).png`, `Tech Transpire Logo.png` (both 1080×1080), and three white-background JPGs (two share a filename and have different dates) | Archived in `source-archive/assets/logo/`; registered as TT-AS-019 – 023. **MS-03 closed.** |
| Blogs and case studies `15Dy4QFJ…` | Public | 10 `.docx` files | **Fully reconciled.** These are the same Drive files the live site renders (identical file IDs). A word-level diff of each `.docx` against the archived published text found **0 differences** in all 10. Originals archived in `source-archive/raw/drive-docx/` |

**Consequences:** the published Insights content *is* the source material; there are no unpublished revisions or extra case studies in that folder. The company has also referred to source material for a **$3M fraud-prevention outcome (global eCommerce)**. That material is not in any accessible folder, so it is tracked as C-19.
