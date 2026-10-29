# 06 — Detailed Page Blueprints

These are text-only structural specifications. They contain no layout, visual or interaction design; that is Phase 2.

**Section labels:** **[E]** existing content, migrated verbatim, cited by block ID from [`data/content-blocks.json`](data/content-blocks.json) · **[N]** new content, cited by its ID in [12-gaps-and-decisions.md](12-gaps-and-decisions.md) §4, which needs approval · **[R]** relationship-driven (generated from linked content, see [08](08-content-relationships.md)) · **[D-xx]** subject to a decision.

"Verbatim" includes the source's own headings. Block markers in the archive (BANNER, CARDS, column labels, icon keys) are structure, not copy.

---

## 1. Home

| Field | Specification |
|---|---|
| Name | Home |
| URL | `/` (`/home` → 301) |
| Parent | — |
| Primary audience | Founders, CEOs, executive teams; secondary: referral partners |
| Business objective | Establish what Tech Transpire does and for whom, then route visitors to Expertise, evidence or Contact (Objectives A, B, C) |
| Core question | "Is this the right partner for a high-stakes change we are facing?" |
| Existing source | TT-PG-001 (all blocks) |
| Assets | TT-AS-001 (banner background) — whether it is reused is a Phase 2 decision |
| Primary conversion | Start a conversation (`/contact-us`) |
| Secondary conversion | Visit Expertise; read a case study |
| Search intent | Navigational (brand) and broad "transformation advisory" |
| Dependencies | D-01, D-04, D-05, D-14, D-18, D-20 |
| Content gaps | N-01 approval, N-02 outcome copy, stat attribution |
| Priority | P0 |

**Sections in order**

1. **Positioning** — [N-01 / D-01] "Clarity Before Change. Confidence Through Execution." as H1. Supporting text [E] TT-PG-001-B02: "We bring clarity to complex systems before execution, so you move forward with confidence." and "We work with companies that are at high-stake transformation points - moments when the risk of getting it wrong is too high without upfront clarity." The existing headline "Clarity before Execution." is preserved (it is also the first company value, TT-PG-004-B03). Phase 2 decides whether it appears here as a sub-line.
2. **What we see** — [E] TT-PG-001-B01: the four "Sounds Familiar?" statements with their attributions.
3. **Problems we address** — [E] TT-PG-001-B03: six cards, verbatim. Each card links to the most relevant destination [R]: Executing the wrong plan → `/insights/executing-the-wrong-plan`; Stalled or failing implementations → `/services/transformation-recovery`; others → `/services`.
4. **Outcomes** — [N-02 / D-18] four themes, each with one sentence of new copy and links to existing evidence:

   | Theme | Evidence links |
   |---|---|
   | Better Decisions | TT-PG-001-B03 "High-stakes decisions under pressure" card; TT-INS-006 |
   | Improved Performance | TT-INS-005; TT-INS-004 |
   | Efficient Operations | TT-INS-009; TT-INS-008; TT-INS-001 |
   | Sustainable Transformation | TT-INS-010; TT-PG-001-B06 ("You are not dependent on us to move forward.") |

5. **Our Method** — [E] TT-PG-001-B04 (heading + two lines) and TT-PG-001-B05 (five steps). Links to `/services`.
6. **The outcome** — [E] TT-PG-001-B06 callout, including "6-8 weeks · From confusion to clarity" (C-15).
7. **Evidence** — [E][D-04, D-05] TT-PG-001-B08 statistics. Each figure is shown only once verified, with the approved attribution (D-04) "Engagement led by Mack Akhani prior to founding Tech Transpire." where it applies, and links to its source article. The "$3M+ Revenue impact" label (C-01) is withdrawn; the two separate $3M outcomes are shown individually, with their own labels, once verified (N-15). Unverified figures are withheld but not deleted.
8. **Fit** — [N] one line plus a link: "Is this the right fit?" → `/services#fit` (D-14). The fit list itself (TT-PG-001-B07) is not repeated here.
9. **Featured insights** — [R] three items, editor-selected (default: the newest case study plus two perspectives).
10. **Conversation** — [E] TT-PG-001-B09: "Start a Conversation" → `/contact-us`. CTA2 "See Our Work" is retargeted from `/about-us` to `/insights/case-studies` (D-20); the label is unchanged.

**Internal links:** `/services`, `/services/transformation-recovery`, `/services#fit`, `/insights/case-studies`, case-study and article URLs, `/contact-us`, `/about-us`.

---

## 2. Expertise (landing)

| Field | Specification |
|---|---|
| Name | Expertise (nav label); page H1 is existing |
| URL | `/services` |
| Parent | Home |
| Primary audience | All decision-makers comparing options; CIO/CTO; referral partners (fit list) |
| Business objective | Make the offer understandable and qualify fit (B, C, D) |
| Core question | "What exactly do you do, how does an engagement run, and are we a fit?" |
| Existing source | TT-PG-002-B01 to B07 |
| Assets | TT-AS-002 |
| Primary conversion | "Start with a Discovery Conversation" |
| Secondary conversion | Read case studies; go to Transformation Recovery |
| Search intent | Commercial investigation: "implementation clarity", "execution blueprint", "transformation recovery", "ERP selection advisory", "value stream mapping consulting" |
| Dependencies | D-02 (option A), D-03, D-14 |
| Content gaps | N-03 (short connective text, if needed) |
| Priority | P0 |

**Sections in order**

1. **Banner** — [E] TT-PG-002-B01: "What we do" / "Implementation Clarity & Execution Blueprint" / subtext.
2. **Our Offer** — [E] TT-PG-002-B02: two paragraphs, verbatim.
3. **Signature offer** — [E] TT-PG-002-B03 callout (6-8 weeks).
4. **Our Engagement** — [E] TT-PG-002-B04: Discovery → Execution Blueprint → Guided Implementation, presented as the standard path. **Transformation Recovery** (fourth step) is presented as a **separate entry point** for initiatives already under way, linking to `/services/transformation-recovery`. Wording is unchanged.
5. **The Components** — [E] TT-PG-002-B05: six cards, verbatim. Each card links to its evidence [R]:

   | Component | Related insights | Brief capability name used as an SEO/relationship alias (not a page) |
   |---|---|---|
   | Clarity & Discovery | TT-INS-005, TT-INS-008, TT-INS-006 | Process Improvement; Strategic Advisory |
   | Design & Alignment | TT-INS-006 | Strategic Advisory |
   | Execution & Delivery | TT-INS-004 | Technology Transformation (ERP, integration, migration) |
   | Transformation Recovery | TT-INS-002, TT-INS-003, TT-INS-007 | — (own page) |
   | Adoption & Outcomes | TT-INS-010, TT-INS-009 | Operational Excellence |
   | Ongoing Support | — | — |

   Process Improvement additionally draws on TT-INS-001. AI & Digital Enablement has no mapping and no evidence (D-03), so it does not appear.
6. **Our Audience (fit list)** — [E] TT-PG-002-B06, the canonical location (D-14), anchor `#fit`. [N-13] one sentence for referral partners, with a "Refer someone" link → `/contact-us?topic=referral`.
7. **CTA** — [E] TT-PG-002-B07: "Start with a Discovery Conversation" → `/contact-us?interest=discovery`; "Read Our Case Studies" retargeted from the broken `/blogs` to `/insights/case-studies`.

---

## 3. Transformation Recovery

| Field | Specification |
|---|---|
| Name | Transformation Recovery |
| URL | `/services/transformation-recovery` |
| Parent | Expertise |
| Primary audience | Transformation and programme leaders; COOs; CEOs with a stalled initiative |
| Business objective | Capture the highest-urgency demand (C) |
| Core question | "Our initiative has stalled. Can it be recovered, and how?" |
| Existing source | TT-PG-002-B04 (Transformation Recovery step), TT-PG-002-B05 (Transformation Recovery card), TT-INS-002, 003, 007 |
| Assets | None required |
| Primary conversion | Contact with topic "Stalled or underperforming initiative" |
| Secondary conversion | Read the recovery case studies |
| Search intent | "stalled project recovery", "failed implementation recovery", "project rescue consultant" |
| Dependencies | D-02, D-04, N-04 |
| Content gaps | Introduction and "when you need this" copy (N-04) |
| Priority | P1 [C] |

**Sections in order**

1. Introduction — [N-04].
2. What recovery involves — [E] TT-PG-002-B04, step "Transformation Recovery" (verbatim).
3. Scope — [E] TT-PG-002-B05 card "Transformation Recovery" (verbatim).
4. Signs you need it — [E] TT-PG-001-B03 cards "Stalled or failing implementations" and "No clear ownership" (verbatim, reused by reference rather than copied).
5. Evidence — [R] TT-INS-003, TT-INS-002, TT-INS-007, with attribution (D-04).
6. How it fits the full engagement — [R] link back to `/services` engagement path.
7. CTA — [N] for example "Talk to Us About a Stalled Initiative". That label already exists as an article CTA (TT-INS-002-B09), so it can be reused verbatim.

---

## 4. Industries (landing)

| Field | Specification |
|---|---|
| Name | Industries |
| URL | `/industries` |
| Parent | Home |
| Primary audience | Executives checking for relevant sector context |
| Business objective | Show where the approach has been applied, without overstating sector depth (A) |
| Core question | "Have you worked in an environment like ours?" |
| Existing source | Industry references within TT-INS-001–010 and TT-PG-004-B04 |
| Assets | None |
| Primary conversion | Healthcare page → Contact |
| Secondary conversion | Case studies |
| Search intent | Low; mainly navigational |
| Dependencies | D-06, D-04, N-05 |
| Content gaps | All connective copy (N-05) |
| Priority | P1 [C] (P0 if D-06 (a) approved before launch) |

**Sections in order**

1. Introduction — [N-05], one paragraph. Engagements that predate Tech Transpire carry the D-04 attribution.
2. Healthcare — [R] summary plus link to `/industries/healthcare`.
3. Selected experience (not linked to pages) — [R] consumer social platform (TT-INS-004). Biography-only references ("global eCommerce platforms and venture-funded technology startups", TT-PG-004-B04) may be listed only with D-07 approval.
4. CTA — Contact.

---

## 5. Healthcare

| Field | Specification |
|---|---|
| Name | Healthcare |
| URL | `/industries/healthcare` |
| Parent | Industries |
| Primary audience | Healthcare operators, healthcare technology and compliance providers, multi-location healthcare networks |
| Business objective | Credibility in the sector with the most evidence (A, C) |
| Core question | "Do you understand regulated, multi-site healthcare operations?" |
| Existing source | TT-INS-002, 003, 005, 008, 009, 010; TT-INS-001-B08; Mack Akhani bio ("PE-backed healthcare networks"). TT-INS-007 is not used as separate healthcare evidence until C-18 is resolved |
| Draft | **[drafts/healthcare-page-draft.md](drafts/healthcare-page-draft.md)**. Built almost entirely from verbatim excerpts; this is the D-06 test page |
| Assets | Case-study covers TT-AS-009, 010, 012 |
| Primary conversion | Contact |
| Secondary conversion | Case studies |
| Search intent | "healthcare operations consulting", "CMS compliance migration", "healthcare process improvement" — only as far as the evidence supports |
| Dependencies | D-06, D-04, C-08 (confidentiality), N-05 |
| Content gaps | Introduction; challenge summary (must cite only challenges described in the articles) |
| Priority | P1 [C] |

**Sections in order**

1. Introduction — [N-05].
2. Situations we have worked in — [E] verbatim client/challenge excerpts from TT-INS-002, 003, 005, 008, 009, each with its own attribution line, or held as pending (C-18), and a link to its article.
3. Relevant expertise — [R] Clarity & Discovery, Transformation Recovery, Adoption & Outcomes.
4. Case studies and insights — [R] listing.
5. CTA — Contact.

---

## 6. Insights (landing)

| Field | Specification |
|---|---|
| Name | Insights |
| URL | `/insights` |
| Parent | Home |
| Primary audience | All; search visitors; returning prospects |
| Business objective | Thought leadership and evidence library (E) |
| Core question | "What does Tech Transpire think, and what has its approach achieved?" |
| Existing source | TT-PG-003-B02 (H1 "Insights" + intro line), Insights Sheet rows |
| Assets | Card covers TT-AS-008 to TT-AS-017 |
| Primary conversion | Read an article |
| Secondary conversion | Contact |
| Search intent | Informational / navigational |
| Dependencies | Taxonomy ([09](09-content-schema.md)), D-09, D-10 |
| Content gaps | None at launch |
| Priority | P0 |

**Sections in order**

1. Heading and intro — [E] TT-PG-003-B02: "Insights" / "Practical insights on turning Clarity and Alignment into disciplined Execution—and measurable business results."
2. Filters — content type, topic, industry (see [05](05-navigation-specification.md) §2). This replaces the existing single "category" filter ("All" + categories).
3. Listing — [E] card fields from the Sheet: cover, card title, excerpt, author, date, read time. Newest first. Drafts (D-10) are excluded.
4. Link to `/insights/case-studies`.
5. CTA — Contact.

Pagination is not needed below 24 items.

---

## 7. Case studies (listing)

| Field | Specification |
|---|---|
| Name | Case studies |
| URL | `/insights/case-studies` |
| Parent | Insights |
| Primary audience | Executives looking for proof; referral partners |
| Business objective | Give "See Our Work" / "Read Our Case Studies" a real destination (A) — D-17, D-20 |
| Core question | "What results has this approach produced?" |
| Existing source | Articles with content type Case study (TT-INS-002, 003, 004, 005) |
| Assets | TT-AS-009–012 |
| Primary conversion | Read a case study |
| Secondary conversion | Contact |
| Search intent | "transformation case studies", brand + "case studies" |
| Dependencies | D-04 attribution note; D-17 |
| Content gaps | [N] one-sentence intro, including the founder-experience attribution |
| Priority | P1 |

Sections: intro [N]; listing [R]; CTA.

---

## 8. Article template (all ten insights)

| Field | Specification |
|---|---|
| Name | Individual insight |
| URL | `/insights/{slug}` |
| Parent | Insights (Case studies for type = Case study, breadcrumb only) |
| Primary audience | Search and social visitors; prospects in evaluation |
| Business objective | Demonstrate thinking and evidence; move readers to Expertise or Contact (E, C) |
| Core question | The article's own subject |
| Existing source | TT-INS-001 … 010, full text verbatim |
| Assets | Card cover (listing / social image) |
| Primary conversion | The article's own existing CTA (every article has one) |
| Secondary conversion | Related insight; related Expertise |
| Search intent | Informational |
| Dependencies | D-04 (TT-INS-007–010), D-09 (titles), D-11 (corrections) |
| Content gaps | Meta descriptions (N-10; the excerpt is the default); alt text (N-11) |
| Priority | P0 |

**Sections in order**

1. Banner — [E] block B01: H1 from the Doc (D-09) and subtitle line.
2. Body — [E] all body blocks in source order. Block types (section, cards, steps, stats, callout, carousel, fitlist) map to reusable content components (see [09](09-content-schema.md)).
3. Attribution line — [E] where present; [E-07 / D-04] added where approved.
4. Tag line — [E] the callout tag (e.g. "Kaizen event · CMS compliance · Data integrity · Legacy consolidation").
5. CTA — [E] the article's final block (CTA and CTA2), with links normalised to new URLs.
6. Author and date — [E] Sheet metadata.
7. Related — [R] up to three related insights plus one Expertise link.

**Per-article mapping** (type, topic, industry and outcome are **proposed** classifications; the legacy Sheet category is kept in the model)

| ID | Slug | H1 (Doc) | Card title (Sheet) | Legacy category | Proposed type | Topics | Industry | Outcome theme | Related service |
|---|---|---|---|---|---|---|---|---|---|
| TT-INS-001 | mastering-kaizen-events | Most Kaizen Events Fail. Here Is What the Successful Ones Do Differently. | Mastering Kaizen Events | Transformation | Guide | Continuous improvement; Kaizen | Healthcare (example) | Efficient Operations | Clarity & Discovery; Adoption & Outcomes |
| TT-INS-002 | two-quarters-of-migration-work-cleared-in-a-single-day | Two Quarters of Migration Work, Cleared in a Single Day | same | Case Study | Case study | Kaizen; Compliance; Legacy consolidation | Healthcare | Improved Performance | Transformation Recovery |
| TT-INS-003 | seven-year-migration-closed-in-19-hours | A Seven-Year Migration, Closed in 19 Hours | same | Case Study | Case study | Kaizen; Compliance; Legacy retirement | Healthcare | Improved Performance | Transformation Recovery |
| TT-INS-004 | weekend-scrum-to-kanban-migration-across-nine-teams | A Product With One Launch Date Does Not Need Sprints | A Weekend Scrum-to-Kanban Migration Across Nine Teams | Case Study | Case study | Delivery process; Kanban | Consumer technology | Improved Performance | Execution & Delivery |
| TT-INS-005 | value-stream-mapping-9-5-hours-of-work-in-208-days | 208 Days of Elapsed Time. 9.5 Hours of Actual Work. | What Value Stream Mapping Found: 9.5 Hours of Work Inside 208 Days of Delays | Transformation | Case study (structure: At a Glance / Client / Challenge / Results) | Value stream mapping; Lean | Healthcare | Improved Performance | Clarity & Discovery |
| TT-INS-006 | executing-the-wrong-plan | You Don't Have an Execution Problem. You're Executing the Wrong Plan. | same | Transformation | Perspective | Discovery; Root cause | — | Better Decisions | Clarity & Discovery; Design & Alignment |
| TT-INS-007 | the-19-hour-project-rapid-execution | The 19-Hour Project: What Rapid Execution Actually Looks Like | same | Execution | Perspective | Rapid execution; Kaizen | Healthcare | Improved Performance | Transformation Recovery |
| TT-INS-008 | look-at-the-handoffs-not-the-steps | When Processes Break Down, Look at the Handoffs - Not the Steps | same | Transformation | Perspective | Process handoffs; Value stream mapping | Healthcare | Efficient Operations | Clarity & Discovery |
| TT-INS-009 | decentralized-purchasing-destroys-margins | Supply Chain at Scale: How Decentralized Purchasing Silently Destroys Margins | same | Execution | Perspective | Supply chain; Multi-location | Healthcare | Efficient Operations | Adoption & Outcomes; Design & Alignment |
| TT-INS-010 | why-transformation-programs-fail-after-a-strong-start | Why Transformation Programs Fail After a Strong Start | same | Transformation | Perspective | Capability transfer; Sustainability | Healthcare | Sustainable Transformation | Adoption & Outcomes |

---

## 9. About

| Field | Specification |
|---|---|
| Name | About |
| URL | `/about-us` |
| Parent | Home |
| Primary audience | All evaluating trust; referral partners |
| Business objective | Credibility through philosophy, values and people (A) |
| Core question | "Who are these people and how do they work?" |
| Existing source | TT-PG-004-B01 to B06 |
| Assets | TT-AS-002; headshots TT-AS-003 (Mack Akhani), TT-AS-004 (Hemang Dwivedi), TT-AS-005 (Kranthi Kumar Goli), TT-AS-006 (Devjet Bag) |
| Primary conversion | "Work with Us" |
| Secondary conversion | Case studies; LinkedIn profiles |
| Search intent | Navigational (brand, founder name) |
| Dependencies | D-07, D-08, C-10 to C-13, E-03, E-04 |
| Content gaps | Business relationships paragraph (N-06) |
| Priority | P0 |

**Sections in order** (anchors in brackets)

1. Banner — [E] TT-PG-004-B01: "Built from experience" / "We built the company we always wanted to be part of." / subtext.
2. Our Story `#story` — [E] TT-PG-004-B02, six paragraphs.
3. Our Values `#values` — [E] TT-PG-004-B03, six values.
4. Our Team `#team` — [E] TT-PG-004-B04, four profiles in source order, each with name, role, bio and LinkedIn link [D-07]. **Each profile publishes only when confirmed:** Mack (C-10 timeline check; LSSBB confirmed, C-11), Kranthi (C-12), Devjet (C-13), Hemang (C-20). Unconfirmed profiles are hidden, not deleted. If only one profile is confirmed at launch, the section heading stays "Our Team".
5. Our Message `#message` — [E] TT-PG-004-B05, five statements and the closing line "Everything we touch becomes better than before".
6. Business relationships `#relationships` — [N-06 / D-08] **(approved, subject to legal wording; draft Option B in [drafts/new-content-drafts.md](drafts/new-content-drafts.md#n-06--business-relationship-subject-to-legal-wording-review))**: a short factual paragraph saying that Tech Transpire is a DBA of Akhani LLC, which also operates True Lean Solutions for engineering and implementation work that Tech Transpire may introduce where appropriate. No logo, no navigation entry.
7. CTA — [E] TT-PG-004-B06: "Work with Us" → `/contact-us`; "See Our Case Studies" retargeted from `/blogs` to `/insights/case-studies`.

---

## 10. Contact

| Field | Specification |
|---|---|
| Name | Contact |
| URL | `/contact-us` |
| Parent | Home |
| Primary audience | All prospects; referral partners |
| Business objective | Qualified conversations (C, D) |
| Core question | "How do I start, and what happens next?" |
| Existing source | TT-PG-005-B01 to B05 |
| Assets | None |
| Primary conversion | Book the intro call (Microsoft Bookings) |
| Secondary conversion | Submit the form |
| Search intent | Navigational |
| Dependencies | D-12, D-13, D-16, C-17 |
| Content gaps | N-09 (consent text, error message), N-13 — drafts in [drafts/new-content-drafts.md](drafts/new-content-drafts.md) |
| Priority | P0 |

**Sections in order**

1. Heading — [E] TT-PG-005-B01/B02: "Get in touch" / "Start the conversation."
2. Direct contact — [E] TT-PG-005-B02: Email info@techtranspire.com; Phone +1 (979) 479-2779; LinkedIn "Tech Transpire".
3. Intro call — [E] TT-PG-005-B03: "Fastest path forward" / "Book a 30-minute intro call" / "We prioritize the right fit over volume. Every conversation starts with alignment." / "Book your intro call".
4. What happens next — [E] TT-PG-005-B04, four steps.
5. Form — [E] TT-PG-005-B05 intro "Send us a message" / "Prefer to write first? …", plus [N-09] additions.
6. Referral note — [N-13] one sentence for referral partners.

**Form specification** (approved field set, D-12, 2026-10-29)

The approved form replaces the legacy form. The legacy labels, options and placeholders stay in the archive (TT-PG-005-B05) and are not deleted. Annual revenue is **removed** from the form.

| # | Field | Label | Type | Required | Validation | Zoho CRM Lead field |
|---|---|---|---|---|---|---|
| 1 | name | Name | text | Yes | 2–120 characters | `First_Name` + `Last_Name` (split on the last space; a single word goes to `Last_Name`, which Zoho requires) |
| 2 | company | Company | text | Yes | 1–120 characters | `Company` (required by Zoho Leads) |
| 3 | email | Work email [E] | email | Yes | Valid syntax. Free-mail domains are allowed, because referral partners may use them | `Email` |
| 4 | phone | Phone (optional) | tel | No | 7–20 characters: digits, spaces, `+ ( ) -` | `Phone` |
| 5 | areaOfInterest | Area of interest | select | Yes | One of the options below; preselected from `?interest=` on contextual CTAs | `Area_of_Interest` (custom picklist) |
| 6 | message | Message | textarea | Yes | 20–4,000 characters. The legacy placeholder [E] "What is the challenge you are facing? What have you tried so far? What does success look like?" is kept as helper text | `Description` |
| 7 | source | How did you hear about us? | select | No | One of the options below | `Lead_Source` |
| 8 | consent | [N-09] Privacy consent statement linking to `/privacy-policy` | checkbox | Yes | Must be checked | `Privacy_Consent` (custom boolean) + timestamp |
| — | website | Honeypot field (hidden from people and from assistive technology) | text | — | Must be empty; otherwise the submission is discarded silently | not sent |

**Area of interest options:** taken from the existing engagement types (TT-PG-002-B04), so visitors pick the company's own vocabulary.

| Option label | Basis | Preselected from |
|---|---|---|
| Discovery and clarity | [E] engagement type "Discovery" | Home and Expertise CTAs |
| Execution blueprint | [E] engagement type "Execution Blueprint" | — |
| Guided implementation | [E] engagement type "Guided Implementation" | — |
| Recovering a stalled or underperforming initiative | [E] engagement type "Transformation Recovery" | Transformation Recovery page; "stalled initiative" article CTAs |
| Referral or partnership | [N] | Referral note (N-13) |
| Something else | [N] | — |

**"How did you hear about us?" options:** [E] LinkedIn · [E] Facebook · [E] Referral · [E] Search · [N] Event or presentation · [N] Existing client or colleague · [E] Other. The two [N] options need approval.

**Spam protection:** honeypot, plus a minimum time-to-submit check (under 3 seconds is rejected), plus server-side rate limiting per IP, plus a privacy-respecting challenge (e.g. Cloudflare Turnstile) added only if spam gets through. None of these collect personal data beyond the request itself.

**Processing and states**

| Item | Requirement |
|---|---|
| Submission | A server-side endpoint validates every field, checks spam signals, then (1) creates a **Lead in Zoho CRM** and (2) sends an **email notification** to info@techtranspire.com. Replaces the `no-cors` Apps Script call. |
| Zoho integration | Preferred: Zoho CRM REST API (`/crm/v{n}/Leads`), called from the server with OAuth credentials (self-client refresh token) kept in environment secrets. Fallback: Zoho Web-to-Lead form posted from the server. The data centre domain (`.com` / `.eu` / `.in`) must match the Zoho account. Details in [11](11-technical-architecture.md). |
| Email notification | Sent by the endpoint, or by a Zoho CRM workflow rule on Lead creation (D-16 sub-decision). Subject: `New website inquiry — {Area of interest} — {Company}`. Body: all fields plus the Zoho Lead link. **Referral or partnership** inquiries are flagged in the subject. |
| Partial failure | If Zoho is unavailable, the email is still sent with the full submission and a "not in CRM" flag, and the visitor sees success, because the inquiry was received. If **both** fail, the visitor sees the failure state. |
| Success state | [E] "Thank you — we have received your message and will be in touch within one business day." Shown only when the server confirms receipt. |
| Validation error | [N] Inline messages per field; focus moves to the first invalid field; the error summary is announced to assistive technology. Replaces the existing `alert()`. |
| Failure state | [N] The message says the submission did not go through, gives the email and phone as alternatives, and keeps the visitor's input. Never show success on failure (fixes T8). |
| Measurement events | `contact_form_start` (first field focus); `generate_lead` (server-confirmed success; parameters `area_of_interest`, `source`); `contact_form_error` (type: validation/server); `booking_click` (intro call link); `email_click`; `phone_click`; `linkedin_click` |
| Data | No personal data in analytics parameters. Retention period as stated in the Privacy Policy. |

---

## 11. Privacy Policy

| Field | Specification |
|---|---|
| URL / parent | `/privacy-policy` / Home (footer only) |
| Audience / objective | All visitors; legal compliance |
| Core question | "What happens to my data?" |
| Existing source | None |
| Sections | [N-07] Who we are (entity per D-08); data collected (form fields, booking, analytics); purpose; retention; sharing (form processor, CRM, analytics vendor per D-16); rights and contact; cookies; last-updated date |
| Assets / links | Links from the contact form consent field and the footer |
| Conversion | None |
| Search intent | None (indexable, low priority) |
| Dependencies | D-13, D-16; legal review |
| Gaps | All content |
| Priority | P0 |

## 12. Accessibility Statement

| Field | Specification |
|---|---|
| URL / parent | `/accessibility` / Home (footer only) |
| Audience / objective | Visitors with access needs; good practice |
| Core question | "Is this site accessible, and how do I report a problem?" |
| Existing source | None |
| Sections | [N-08] Commitment and target standard (WCAG 2.2 AA — to be confirmed in Phase 2); known limitations; how to contact (existing email and phone); date |
| Conversion / intent | None |
| Dependencies | D-13; Phase 4 audit |
| Gaps | All content |
| Priority | P1 |

## 13. Terms of Use

| Field | Specification |
|---|---|
| URL / parent | `/terms` / Home (footer only) |
| Audience / objective | Legal |
| Core question | "On what terms is this content provided?" |
| Existing source | None |
| Sections | [N-08] To be drafted by counsel: use of content, no professional advice from site content, liability, governing law |
| Dependencies | D-13 — build only if approved |
| Gaps | All content |
| Priority | P1 [C] |

## 14. 404 — Not found

| Field | Specification |
|---|---|
| URL | Any unmatched path; returns HTTP 404 (never a 200 or a redirect to Home) |
| Audience / objective | Visitors following old or mistyped links; recovery |
| Core question | "Where should I go instead?" |
| Existing source | None |
| Sections | [N-14] Short message; links to Home, Expertise, Insights, Contact |
| Conversion | Contact link |
| Search intent | None (`noindex`) |
| Dependencies | Redirect map in [10](10-seo-url-plan.md) handles known legacy paths first |
| Priority | P0 |
