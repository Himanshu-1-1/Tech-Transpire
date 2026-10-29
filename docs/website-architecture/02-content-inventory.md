# 02 — Complete Existing Content Inventory

**Captured:** 2026-10-29 · **Scope:** every publicly reachable page, article, asset and metadata item on `www.techtranspire.com` and its source Google Docs/Sheet. **Excludes:** the inaccessible Drive folder (MS-01).

## How to read this inventory

The inventory has three layers, each traceable to the next:

| Layer | Where | Purpose |
|---|---|---|
| 1. Item records (this document) | below | One record per page or article, with the fields required by the brief |
| 2. Block records | [`data/content-blocks.json`](data/content-blocks.json) | 125 blocks; each has an ID (e.g. `TT-PG-001-B03`), type, heading, archive line range, and its **exact text** |
| 3. Verbatim archive | [`source-archive/`](source-archive/) | Plain-text export of every source; raw HTML exports in `source-archive/raw/`; image originals in `source-archive/assets/` |

"Exact body content" for each item is the archive file named in its record. It was extracted by script and **has not been retyped or edited**. The archive also keeps the source documents' own block markers (BANNER, CARDS, STEPS, CALLOUT, FITLIST, STATS, TEAM, CAROUSEL, HERO) and column labels, because they record how the company structured the content.

**ID scheme:** `TT-GL` global · `TT-PG` page · `TT-INS` insight · `TT-AS` asset · `-Bnn` block · `C-` claim · `D-` decision · `E-` editorial correction · `N-` new content · `MS-` missing source.

### Content classification used

Company identity & positioning · Advisory services · Business challenges · Methodologies & frameworks · Thought leadership · Case studies & outcomes · Leadership & people · Client trust & credentials · Contact & conversion · Legal & administrative (none exists). "Industry experience" and "Transformation capabilities" are not stand-alone categories in the source; they occur inside case studies and the Services page, and are classified there.

---

## A. Global

### TT-GL-001 — Site shell (Google Sites)

| Field | Value |
|---|---|
| Page name | (all pages) |
| Original URL | every page |
| Parent | — |
| H1 / headings | none (logo + site name "Tech Transpire") |
| Body content | [TT-GL-001-site-shell.txt](source-archive/pages/TT-GL-001-site-shell.txt) |
| Category | Navigation / platform chrome |
| Navigation | Home `/home` · About `/about-us` · Services `/services` · Insights `/insights` · Contact Us `/contact-us` (repeated as desktop, overflow "More", and mobile menus) |
| Assets | Logo TT-AS-018 (also og:image) |
| SEO metadata | og:title / og:type / og:url / og:image only; no description |
| Platform strings | "Search this site", "Embedded Files", "Skip to main content", "Skip to navigation", "Google Sites", "Report abuse", "Page details", "Page updated" |
| Status | Active |
| Proposed destination | Global header/footer ([05](05-navigation-specification.md)) |
| Preservation status | Nav labels preserved in archive; platform strings retired |
| Notes | No footer, no legal links, no contact details in the shell |

---

## B. Pages

### TT-PG-001 — Home

| Field | Value |
|---|---|
| Page name | Home |
| Original URL | `https://www.techtranspire.com/` and `https://www.techtranspire.com/home` (both 200) |
| Parent | — |
| H1 | none marked as H1 in source. Banner headline: "Clarity before Execution." |
| Headings | "Our Method" (hero) · six problem cards · five method steps (Deep discovery · Uncover the truth · Quick wins and momentum · Execution blueprint · Guided execution) · "The outcome" callout · fit list · stats |
| Body content | [TT-PG-001-home.txt](source-archive/pages/TT-PG-001-home.txt) — blocks TT-PG-001-B01 … B09 |
| Category | Company identity & positioning; Business challenges; Methodology; Client trust (stats) |
| Target audience | Mid-sized organisation leaders at "high-stake transformation points" (source wording) |
| Purpose | Inform → build trust → convert |
| CTA | "Start a Conversation" → `/contact-us`; "See Our Work" → `/about-us` (mismatch, D-20) |
| Assets | TT-AS-001 banner background |
| SEO metadata | `<title>` "Tech Transpire"; no meta description on the page; inside iframe: description "Tech Transpire — Clarity. Alignment. Execution." |
| Internal links | `/contact-us`, `/about-us` |
| External links | none |
| Status | Active; duplicate URL `/home`; stats carry claim risks C-01, C-04–C-07 |
| Proposed destination | `/` (see [07](07-content-migration.md)) |
| Preservation status | Preserved verbatim |
| Notes | Fit list identical to Services (D-14). The tagline "Clarity. Alignment. Execution." exists only in hidden metadata. |

### TT-PG-002 — Services

| Field | Value |
|---|---|
| Page name | Services |
| Original URL | `https://www.techtranspire.com/services` |
| Parent | — |
| H1 | none marked; banner eyebrow "What we do", headline "Implementation Clarity & Execution Blueprint" |
| Headings | Our Offer · Signature offer (callout) · Our Engagement (Discovery · Execution Blueprint · Guided Implementation · Transformation Recovery) · The Components (Clarity & Discovery · Design & Alignment · Execution & Delivery · Transformation Recovery · Adoption & Outcomes · Ongoing Support) · Our Audience (fit list) |
| Body content | [TT-PG-002-services.txt](source-archive/pages/TT-PG-002-services.txt) — blocks TT-PG-002-B01 … B07 |
| Category | Advisory services; Methodology |
| Target audience | Mid-sized organisations facing high-stakes system, process or operational transformation |
| Purpose | Inform → convert |
| CTA | "Start with a Discovery Conversation" → `/contact-us/`; "Read Our Case Studies" → `/blogs` (**404**) |
| Assets | TT-AS-002 banner background (shared with About) |
| SEO metadata | `<title>` "Tech Transpire - Services"; no meta description |
| Internal links | `/contact-us/`, `/blogs` |
| External links | none |
| Status | Active; one broken CTA |
| Proposed destination | `/services`, nav label "Expertise" |
| Preservation status | Preserved verbatim |
| Notes | Only service source on the site. Technology terms present: ERP selection/configuration, system integration, data migration, legacy system migration and sunset, architecture and integration strategy. "selective IT augmentation only when tied to clear outcomes, never as standalone body-shop work" is a useful positioning boundary against staffing. |

### TT-PG-003 — Insights

| Field | Value |
|---|---|
| Page name | Insights |
| Original URL | `https://www.techtranspire.com/insights` |
| Parent | — |
| H1 | "Insights" |
| Headings | — (cards generated from the Sheet) |
| Body content | [TT-PG-003-insights.txt](source-archive/pages/TT-PG-003-insights.txt); listing data [insights-index-sheet.csv](source-archive/insights-index-sheet.csv) |
| Category | Thought leadership (hub) |
| Target audience | All |
| Purpose | Educate |
| CTA | none on the listing; each article has its own CTA pair |
| Assets | card covers TT-AS-007 … 017 |
| SEO metadata | `<title>` "Tech Transpire - Insights"; inside iframe: "Practical insights on turning Clarity and Alignment into disciplined Execution—and measurable business results." |
| Internal links | none (modal UI) |
| External links | none |
| Status | Active; articles have no URLs |
| Proposed destination | `/insights` |
| Preservation status | Preserved verbatim |
| Notes | Filter bar built from the legacy "Category" values: Case Study, Execution, Transformation |

### TT-PG-004 — About

| Field | Value |
|---|---|
| Page name | About |
| Original URL | `https://www.techtranspire.com/about-us` |
| Parent | — |
| H1 | none marked; banner eyebrow "Built from experience", headline "We built the company we always wanted to be part of." |
| Headings | Our Story · Our Values (Clarity Before Execution · Ownership Without Permission · Solve the Right Problem · Outcomes Over Activity · High Standards, Always · Honesty, Integrity, and Transparency) · Our Team · Our Message |
| Body content | [TT-PG-004-about-us.txt](source-archive/pages/TT-PG-004-about-us.txt) — blocks TT-PG-004-B01 … B06 |
| Category | Company identity; Leadership & people; Client trust & credentials |
| Target audience | All; especially referral partners and executives assessing credibility |
| Purpose | Build trust → convert |
| CTA | "Work with Us" → `/contact-us/`; "See Our Case Studies" → `/blogs` (**404**) |
| Assets | TT-AS-002 banner; headshots TT-AS-003 (Mack Akhani), TT-AS-004 (Hemang Dwivedi), TT-AS-005 (Kranthi Kumar Goli), TT-AS-006 (Devjet Bag) |
| SEO metadata | `<title>` "Tech Transpire - About"; no meta description |
| Internal links | `/contact-us/`, `/blogs` |
| External links | linkedin.com/in/mackakhani · linkedin.com/in/hemangdwivedi · linkedin.com/in/kranthikumargoli/ · linkedin.com/in/devjet-bag-832860160/ |
| Status | Active; one broken CTA; claims C-02, C-10–C-13 |
| Proposed destination | `/about-us` |
| Preservation status | Preserved verbatim |
| Notes | No mention of Akhani LLC or True Lean Solutions (D-08). No founding date, location or company size is stated anywhere on the site. |

### TT-PG-005 — Contact Us

| Field | Value |
|---|---|
| Page name | Contact Us |
| Original URL | `https://www.techtranspire.com/contact-us` |
| Parent | — |
| H1 | none marked; eyebrow "Get in touch"; heading "Start the conversation." |
| Headings | Start the conversation. · Book a 30-minute intro call · What happens next · Send us a message |
| Body content | [TT-PG-005-contact-us.txt](source-archive/pages/TT-PG-005-contact-us.txt) — blocks TT-PG-005-B01 … B05 |
| Category | Contact & conversion |
| Target audience | Prospects; referral partners (via the "Referral" source option) |
| Purpose | Convert |
| CTA | "Book your intro call" (Microsoft Bookings); "Send message" (form) |
| Form fields | First name* · Last name* · Work email* · Company · Annual revenue (approximate) [Under $5M / $5M – $20M / $20M – $50M / $50M – $200M / $200M+] · Describe your situation* · How did you hear about us? [LinkedIn / Facebook / Referral / Search / Other] (* required) |
| Form handler | POST to Google Apps Script `AKfycbz8nPkA…/exec`; success message shown even on failure (T8) |
| Success message | "Thank you — we have received your message and will be in touch within one business day." |
| Assets | none |
| SEO metadata | `<title>` "Tech Transpire - Contact Us"; inside iframe: "Start a conversation with Tech Transpire. Book an intro call or send us a message — we will respond within one business day." |
| Internal links | none |
| External links | `mailto:info@techtranspire.com` · `tel:+19794792779` · `https://www.linkedin.com/company/techtranspire` · `https://outlook.office.com/book/IntroCallwithTechTranspire@techtranspire.com/` |
| Status | Active; no consent, no privacy link (T9) |
| Proposed destination | `/contact-us` |
| Preservation status | Preserved verbatim |
| Notes | Field placeholder text ("John", "Doe", "john@company.com", "What is the challenge you are facing? What have you tried so far? What does success look like?") is recorded in the raw embed. |

---

## C. Insights (articles)

Fields shared by all ten: **Author** Mack Akhani · **Parent** Insights · **Original URL** none (modal on `/insights`) · **Category** Thought leadership / Case studies & outcomes · **Purpose** educate → build trust → convert · **SEO metadata** none per article · **Status** Active (published = TRUE) · **Preservation status** preserved verbatim · **Proposed destination** `/insights/{slug}` (see [04](04-sitemap.md), [07](07-content-migration.md)). The listing title, excerpt, date, legacy category, read time and cover for each are tabulated in [07 §4](07-content-migration.md#4-sheet-metadata-migration-insights).

| ID | Legacy category | Proposed type | Industry context in text | "Prior to founding" attribution? | Issues |
|---|---|---|---|---|---|
| TT-INS-001 | Transformation | Guide | Healthcare compliance (example) | — (example only) | E-05; title mismatch (D-09) |
| TT-INS-002 | Case Study | Case study | Healthcare compliance provider | Yes | E-01 |
| TT-INS-003 | Case Study | Case study | Healthcare compliance provider (hospital systems) | Yes | C-08, C-14 |
| TT-INS-004 | Case Study | Case study | Consumer social platform (technology) | Yes | E-02; title mismatch |
| TT-INS-005 | Transformation | Case study | Healthcare e-learning platform | Yes ("Mack Akhani, LSSBB … prior to founding") | Title mismatch; C-11 |
| TT-INS-006 | Transformation | Perspective | — | n/a | — |
| TT-INS-007 | Execution | Perspective (case-based) | "healthcare SaaS client" | **No** | E-06, E-07 |
| TT-INS-008 | Transformation | Perspective (case-based) | Healthcare (Medicare data loss) | **No** | E-07 |
| TT-INS-009 | Execution | Perspective (case-based) | PE-backed eye care network (80+ clinics, 10 surgery centers) | **No** | C-03, E-07 |
| TT-INS-010 | Transformation | Perspective (case-based) | Healthcare e-learning platform | **No** | E-07; E-04 |

### Drafts (unpublished)

| Sheet row | Title | Excerpt (verbatim) | Date | Status |
|---|---|---|---|---|
| 2 | The Hidden Gaps That Sink Every Transformation Before It Starts | "The most expensive mistakes in business transformation don't happen during execution — they happen in the weeks before it begins." | May 7, 2026 | published = FALSE; doc_id is a placeholder; cover TT-AS-007 |
| 3 | (same title and excerpt) | (same) | May 8, 2026 | published = FALSE; doc_id and cover are placeholders; duplicate row |

### Per-article records

### TT-INS-001

- **File:** [TT-INS-001-mastering-kaizen-events.txt](source-archive/insights/TT-INS-001-mastering-kaizen-events.txt)
- **H1 (Doc):** Most Kaizen Events Fail. Here Is What the Successful Ones Do Differently.
- **Standfirst:** The difference between an event that holds and an event that evaporates is almost entirely what happens before the first session and after the last one.
- **H2s:** Kaizen and a Kaizen Event Are Not the Same Thing · Preparation Decides the Outcome · Design the Room Before You Design the Agenda · Running the Event · What It Looks Like When It Works · Sustaining the Gains · Where Kaizen Events Go Wrong · Poor preparation and no pilot · Let Us Help You Run Kaizen Events That Deliver Lasting Results
- **Internal links:** https://www.techtranspire.com/contact-us https://www.techtranspire.com/insights https://www.techtranspire.com/services
- **External links:** none
- **Approx. words:** 1479

### TT-INS-002

- **File:** [TT-INS-002-two-quarters-of-migration-work-cleared-in-a-single-day.txt](source-archive/insights/TT-INS-002-two-quarters-of-migration-work-cleared-in-a-single-day.txt)
- **H1 (Doc):** Two Quarters of Migration Work, Cleared in a Single Day
- **Standfirst:** Healthcare compliance provider · One-day Kaizen event · 65 client migrations actioned in a single day against a prior rate of 30 per quarter
- **H2s:** At a Glance · The Client · The Challenge · What We Did · The Results · Have an Initiative That Has Been Running Too Long?
- **Internal links:** https://www.techtranspire.com/contact-us https://www.techtranspire.com/insights
- **External links:** none
- **Approx. words:** 813

### TT-INS-003

- **File:** [TT-INS-003-seven-year-migration-closed-in-19-hours.txt](source-archive/insights/TT-INS-003-seven-year-migration-closed-in-19-hours.txt)
- **H1 (Doc):** A Seven-Year Migration, Closed in 19 Hours
- **Standfirst:** Healthcare compliance provider · Three-day Kaizen event · 389 hospitals migrated and a seven-year initiative closed two years ahead of projection
- **H2s:** At a Glance · The Client · The Challenge · What We Did · The Results · Have an Initiative That Has Been Running for Years?
- **Internal links:** https://www.techtranspire.com/contact-us https://www.techtranspire.com/insights
- **External links:** none
- **Approx. words:** 846

### TT-INS-004

- **File:** [TT-INS-004-weekend-scrum-to-kanban-migration-across-nine-teams.txt](source-archive/insights/TT-INS-004-weekend-scrum-to-kanban-migration-across-nine-teams.txt)
- **H1 (Doc):** A Product With One Launch Date Does Not Need Sprints
- **Standfirst:** Consumer social platform · Nine teams shifted from sprint-based delivery to continuous feature flow, with zero disruption to active development
- **H2s:** At a Glance · The Client · The Challenge · What We Did · The Results · Is Your Delivery Cadence Serving Your Release Model?
- **Internal links:** https://www.techtranspire.com/contact-us https://www.techtranspire.com/insights
- **External links:** none
- **Approx. words:** 1121

### TT-INS-005

- **File:** [TT-INS-005-value-stream-mapping-9-5-hours-of-work-in-208-days.txt](source-archive/insights/TT-INS-005-value-stream-mapping-9-5-hours-of-work-in-208-days.txt)
- **H1 (Doc):** 208 Days of Elapsed Time. 9.5 Hours of Actual Work.
- **Standfirst:** Healthcare e-learning platform · Value stream mapping across seven departments · Median customer implementation reduced from 209 days to 78
- **H2s:** At a Glance · The Client · The Challenge · What We Did · The Results · Do You Know Where Your Time Actually Goes?
- **Internal links:** https://www.techtranspire.com/contact-us https://www.techtranspire.com/insights
- **External links:** none
- **Approx. words:** 1124

### TT-INS-006

- **File:** [TT-INS-006-executing-the-wrong-plan.txt](source-archive/insights/TT-INS-006-executing-the-wrong-plan.txt)
- **H1 (Doc):** You Don't Have an Execution Problem. You're Executing the Wrong Plan.
- **Standfirst:** We bring clarity to complex business problems before they turn into expensive execution mistakes.
- **H2s:** What We Hear vs. What Is Really Happening · The Cost of Executing the Wrong Plan · How We Work · Ready to Make Sure You Are Solving the Right Problem?
- **Internal links:** https://www.techtranspire.com/contact-us https://www.techtranspire.com/insights https://www.techtranspire.com/services
- **External links:** none
- **Approx. words:** 555

### TT-INS-007

- **File:** [TT-INS-007-the-19-hour-project-rapid-execution.txt](source-archive/insights/TT-INS-007-the-19-hour-project-rapid-execution.txt)
- **H1 (Doc):** The 19-Hour Project: What Rapid Execution Actually Looks Like
- **Standfirst:** Real speed comes from clarity, preparation, and structured execution - not pressure.
- **H2s:** The Problem · What We Did · The Real Lesson · Your Organization Has Stalled Initiatives Too
- **Internal links:** https://www.techtranspire.com/contact-us https://www.techtranspire.com/insights
- **External links:** none
- **Approx. words:** 562

### TT-INS-008

- **File:** [TT-INS-008-look-at-the-handoffs-not-the-steps.txt](source-archive/insights/TT-INS-008-look-at-the-handoffs-not-the-steps.txt)
- **H1 (Doc):** When Processes Break Down, Look at the Handoffs - Not the Steps
- **Standfirst:** The most costly problems in any operational system don't live inside the steps. They live between them.
- **H2s:** Where Problems Actually Live · What This Looked Like in Practice · How We Find What Others Miss · Let Us Find the Gaps Your Process Reviews Are Missing
- **Internal links:** https://www.techtranspire.com/contact-us https://www.techtranspire.com/insights https://www.techtranspire.com/services
- **External links:** none
- **Approx. words:** 590

### TT-INS-009

- **File:** [TT-INS-009-decentralized-purchasing-destroys-margins.txt](source-archive/insights/TT-INS-009-decentralized-purchasing-destroys-margins.txt)
- **H1 (Doc):** Supply Chain at Scale: How Decentralized Purchasing Silently Destroys Margins
- **Standfirst:** The margin improvement sitting in fragmented purchasing is almost always larger than leadership thinks.
- **H2s:** What Decentralization Actually Costs · What We Did for a 90-Location Eye Care Network · How We Approached the Centralization · Ready to See What Centralization Could Mean for Your Network?
- **Internal links:** https://www.techtranspire.com/contact-us https://www.techtranspire.com/insights
- **External links:** none
- **Approx. words:** 550

### TT-INS-010

- **File:** [TT-INS-010-why-transformation-programs-fail-after-a-strong-start.txt](source-archive/insights/TT-INS-010-why-transformation-programs-fail-after-a-strong-start.txt)
- **H1 (Doc):** Why Transformation Programs Fail After a Strong Start
- **Standfirst:** The mark of a successful engagement is not what the consulting team accomplished. It is how capable the client organization is when the engagement ends.
- **H2s:** Why Gains Disappear · What We Did Differently — And What It Produced · How We Build for Sustainability · Ready for a Transformation That Sticks?
- **Internal links:** https://www.techtranspire.com/contact-us https://www.techtranspire.com/insights
- **External links:** none
- **Approx. words:** 684

---

## D. Assets

See [`data/assets.csv`](data/assets.csv) (18 assets): 2 banner backgrounds, 4 headshots, 11 Insights covers (10 published + 1 draft) and 1 logo. All are hosted on Google Drive or googleusercontent. Usage rights are unconfirmed for every one (some may be stock, so licences need confirming), and none has alt text. **No PDFs, videos or downloadable documents exist.** The article template value "GDRIVE: your-logo-file-id", present in all ten articles, is an unfilled placeholder, not an asset.

## E. External services referenced by the site

| Service | Purpose | Identifier | Migration note |
|---|---|---|---|
| Google Apps Script (content proxy) | Fetches Docs for rendering | `AKfycbywApEj…/exec` | Retire after migration |
| Google Apps Script (form) | Receives contact form | `AKfycbz8nPkA…/exec` | Replace (D-16); confirm where submissions are stored today and export them |
| Google Sheet | Insights index | `1js_i1QvSDhZMQG4rB4_nCTnmlNuc7Na0qgh0wfoBN5k` | Migrated ([07 §4](07-content-migration.md)) |
| Google Docs | Page and article copy | 13 Doc IDs (see archive file headers) | Migrated; restrict sharing after launch |
| Microsoft Bookings | Intro call scheduling | `IntroCallwithTechTranspire@techtranspire.com` | Keep |
| jsDelivr / GitHub `trueleansolutions/website-stylesheet` | Shared stylesheet | commit `d9afbde` | Remove the dependency (T10) |
| Google Fonts | Mulish, Nunito | — | Phase 2 decision |
| LinkedIn | Company page | `linkedin.com/company/techtranspire` | Keep |
