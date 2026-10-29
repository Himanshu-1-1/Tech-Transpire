# 03 — Business Objectives, Audiences and Journeys

Block IDs (e.g. `TT-PG-002-B04`) refer to verbatim source blocks in [`data/content-blocks.json`](data/content-blocks.json). URLs follow [04-sitemap.md](04-sitemap.md). Decision IDs refer to [12-gaps-and-decisions.md](12-gaps-and-decisions.md).

---

## 1. Business objectives mapped to the site

| Obj. | Objective | What on the site serves it | Existing content that already does the work | Gap |
|---|---|---|---|---|
| A | Build executive credibility | Home method + outcome; About story, values, team; case studies | TT-PG-001-B04/B05/B06, TT-PG-004-B02–B05, TT-INS-002–005 | Claims attribution must be consistent before publishing stats (D-04, D-05) |
| B | Make services understandable | Expertise page (offer → engagement path → components → fit) | TT-PG-002-B02–B06 | Component cards are short (G-05); Transformation Recovery needs its own page (N-04) |
| C | Generate qualified conversations | Contact page; intro-call booking; contextual CTAs on every page | TT-PG-005-B02–B05; article CTAs | Form consent, area of interest, error state (D-12) |
| D | Support referral partners | Fit list; area of interest "Referral or partnership"; short referral paragraph | TT-PG-002-B06 (fit list) — the clearest "who to refer" content on the site | N-13 |
| E | Establish thought leadership | Insights library with individual URLs, related links | TT-INS-001–010 | Articles currently have no URLs (01 §5 T6) |
| F | Support long-term growth | Reusable content types, reserved URL patterns, taxonomy | — | Content model ([09](09-content-schema.md)) |

**Balance rule.** Each page has one primary job. Home orients, Expertise explains, Insights proves, About builds trust, Contact converts. No page tries to do all five.

---

## 2. Audience framework

"Existing capabilities" lists only what the current source content supports. No audience is promised a service the source does not describe.

### 2.1 Business owners and founders

| Field | |
|---|---|
| Challenges | Growth has outpaced systems and processes; a major change (system, process, operating model) is coming and the cost of getting it wrong is high |
| Questions | "Is my problem really an execution problem?" "Who will tell me the truth before I spend?" "Will I be dependent on consultants afterwards?" |
| Existing capabilities | Discovery and Execution Blueprint (TT-PG-002-B04); Clarity & Discovery, Design & Alignment (TT-PG-002-B05); "You are not dependent on us" (TT-PG-001-B06) |
| Trust needs | Plain explanation of method; evidence of results with honest attribution; who they would work with |
| Entry pages | `/`, `/insights/executing-the-wrong-plan`, `/services` |
| Next action | Book the 30-minute intro call; read the fit list |

### 2.2 CEOs and executive leadership

| Field | |
|---|---|
| Challenges | Hidden misalignment; executing a plan that was never validated; stalled initiatives; no clear ownership (TT-PG-001-B03) |
| Questions | "Are we solving the right problem?" "Can someone align my leadership team before we commit?" |
| Existing capabilities | Executive alignment, decision frameworks, governance model (TT-PG-002-B05 Design & Alignment); Transformation Recovery (TT-PG-002-B04) |
| Trust needs | Independence of view ("We will challenge you even when it is uncomfortable", TT-PG-004-B05); founder experience |
| Entry pages | `/`, `/about-us`, `/services` |
| Next action | Intro call; discovery conversation |

### 2.3 COOs and operations leaders

| Field | |
|---|---|
| Challenges | Slow handoffs, fragmented purchasing, long implementation cycles, improvements that don't stick |
| Questions | "Where is the time actually going?" "How do we make improvements last?" |
| Existing capabilities | Process analysis, value stream mapping, root cause analysis (TT-PG-002-B05); Adoption & Outcomes; Kaizen and VSM case material |
| Trust needs | Specific before/after evidence; methodology described concretely |
| Entry pages | `/insights/value-stream-mapping-9-5-hours-of-work-in-208-days`, `/insights/look-at-the-handoffs-not-the-steps`, `/insights/decentralized-purchasing-destroys-margins`, `/insights/mastering-kaizen-events` |
| Next action | Contact with area of interest "Discovery and clarity" |

### 2.4 CIOs, CTOs and technology leaders

| Field | |
|---|---|
| Challenges | ERP selection, vendor contracts and implementations that stall; systems inheriting process confusion |
| Questions | "Is the technology really the problem?" "Can someone independent validate the plan before we sign?" |
| Existing capabilities | System selection advisory (Clarity & Discovery); architecture and integration strategy (Design & Alignment); ERP configuration, data migration, system integration, legacy migration and sunset (Execution & Delivery) — all TT-PG-002-B05 |
| Trust needs | Advisory stance before implementation; clarity about who does the build (see D-08 on the True Lean Solutions relationship) |
| Entry pages | `/insights/executing-the-wrong-plan` ("We need to implement a new system" card, TT-INS-006-B03), `/services` |
| Next action | Discovery conversation before vendor commitment |

### 2.5 Transformation and programme leaders

| Field | |
|---|---|
| Challenges | Initiatives running for years; momentum lost mid-execution; vendor misalignment |
| Questions | "Can this be recovered?" "How fast, and what does recovery involve?" |
| Existing capabilities | Transformation Recovery — "the highest-urgency engagement type and one of our strongest differentiators" (TT-PG-002-B04) |
| Trust needs | Recovery case studies (TT-INS-002, 003, 007) |
| Entry pages | `/services/transformation-recovery`, `/insights/seven-year-migration-closed-in-19-hours` |
| Next action | Contact with area of interest "Recovering a stalled or underperforming initiative" |

### 2.6 Private equity and investment stakeholders — *partially evidenced*

| Field | |
|---|---|
| Evidence | A PE-backed eye care operator (TT-INS-009-B04); "PE-backed healthcare networks" (Mack Akhani bio, TT-PG-004-B04); one division "became a viable acquisition target and was subsequently acquired" (TT-INS-003-B07) |
| What may be said | That relevant founder experience exists, with attribution (D-04) |
| What must not be said | That Tech Transpire offers a PE, due-diligence or portfolio-operations service — no source describes one |
| Entry pages | `/insights/decentralized-purchasing-destroys-margins` |
| Next action | General intro call. no dedicated page or area-of-interest option. |

### 2.7 Strategic referral partners

| Field | |
|---|---|
| Challenges | Need to know quickly whom to refer and when |
| Questions | "What does a good-fit client look like?" "What happens after I refer someone?" |
| Existing content | **The fit list (TT-PG-002-B06)** is effectively a referral brief: five "good fit" and five "not a fit" criteria. "What happens next" (TT-PG-005-B04) explains the process after contact. |
| Trust needs | Assurance that referrals get an honest redirect when the fit is wrong ("If not - Honest redirect", TT-PG-005-B04) |
| Entry pages | `/services#fit` (fit list), `/contact-us` |
| Next action | area of interest "Referral or partnership" (N-09); short referral paragraph (N-13) |

---

## 3. User journeys

### Journey 1 — CEO

| Step | |
|---|---|
| Entry | `/` (direct or referral) |
| Information need | "Is this my problem, and is this firm credible?" |
| Pages | `/` → problem cards and method → `/services` → `/about-us` (team) → `/contact-us` |
| Transitions | Problem card → Expertise; "Our Method" → Expertise engagement path; outcome section → case studies |
| Potential confusion | Seeing "Expertise" in navigation but "Services" in the URL (harmless); results without attribution (fixed by D-04) |
| Next action | Book intro call |

### Journey 2 — COO

| Step | |
|---|---|
| Entry | Search → `/insights/look-at-the-handoffs-not-the-steps` or `/insights/value-stream-mapping-9-5-hours-of-work-in-208-days` |
| Information need | "Can they diagnose what's really wrong in our operations?" |
| Pages | Article → related component on `/services` (Clarity & Discovery) → related case study → `/contact-us` |
| Transitions | Article CTA (existing, e.g. "Book a Process Assessment") → Contact; related-content links → Expertise |
| Potential confusion | Article CTAs name assessments ("Value Stream Assessment", "Process Assessment") that are not listed as offers on Expertise. Route them to Contact with an area of interest type; flag for D-02 follow-up. |
| Next action | Contact — "Discovery conversation" |

### Journey 3 — CIO / CTO

| Step | |
|---|---|
| Entry | Search or LinkedIn → `/insights/executing-the-wrong-plan` |
| Information need | "Independent advice before a technology commitment" |
| Pages | Article → `/services` (Clarity & Discovery: system selection advisory) → `/about-us` (business relationships paragraph) → `/contact-us` |
| Transitions | "We need to implement a new system" card → Expertise |
| Potential confusion | Whether Tech Transpire builds systems itself. Answered by the Execution & Delivery component and the D-08 relationship statement. |
| Next action | Discovery conversation |

### Journey 4 — Referral partner

| Step | |
|---|---|
| Entry | Link shared by Tech Transpire → `/services#fit` or `/` |
| Information need | "Who should I send?" |
| Pages | Fit list → "What happens next" on `/contact-us` |
| Transitions | Home link "Is this the right fit?" → Services fit list (D-14) |
| Potential confusion | No dedicated partner page — intentional (12 §6) |
| Next action | Contact form, area of interest "Referral or partnership" |

### Journey 5 — Thought-leadership visitor

| Step | |
|---|---|
| Entry | Search → any `/insights/{slug}` |
| Information need | The article's topic |
| Pages | Article → related articles (same topic/industry) → related Expertise component → `/contact-us` |
| Transitions | Breadcrumb to `/insights`; related links; the article's own existing CTA |
| Potential confusion | Today articles cannot be reached from search at all (T6); the new URLs resolve this |
| Next action | Read another article, or contact |

### Journey 6 — Returning visitor

| Step | |
|---|---|
| Entry | Direct → `/` or a bookmarked deep link |
| Information need | A specific service, person, article or contact method |
| Pages | Primary nav → target page; Insights filters; footer contact details |
| Transitions | One click from any page to Contact (nav + footer) |
| Potential confusion | People have no individual URLs; they're reached via `/about-us#team`. Acceptable at four profiles. |
| Next action | Book call / send message |
