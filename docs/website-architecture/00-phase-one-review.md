# Phase 1 Review Pack: Tech Transpire Website Architecture

**Version 1.1 · 2026-10-29 · For stakeholder review and approval**

This pack answers the six review points in one place. Each section links to the detailed deliverable. Decisions approved on 2026-10-29 are applied throughout.

---

## How the structure expresses the philosophy

The site is organized around how Tech Transpire works, not as a catalogue of services. Each of the four philosophy steps has a home in the structure, built from content that already exists:

| Philosophy | Where the visitor meets it | Existing content carrying it |
|---|---|---|
| **Challenge assumptions** | Home "What we see" and "Problems we address"; the fit list | "Sounds Familiar?" statements; six problem cards; "You are primarily seeking validation for a decision that has already been made" (fit list, *no*) |
| **Discover the real problem** | Home "Our Method"; Expertise engagement path (Discovery first) | "We don't accept the problem statement at face value…"; "Uncover the truth" |
| **Establish clarity** | The signature offer, *Implementation Clarity & Execution Blueprint* | "The outcome" callout; Execution Blueprint step |
| **Create meaningful outcomes** | Outcome themes; Evidence; Case studies | "Outcomes Over Activity" value; the case-study library |

The brand statement **"Clarity Before Change. Confidence Through Execution."** opens Home. "Clarity before Execution." stays as the first company value and a supporting line.

---

## 1. Sitemap and navigation

**Primary navigation:** Home · Expertise · Industries\* · Insights · About · Contact
\*Shown only if the Healthcare page is approved (D-06). Otherwise the navigation has five items and nothing else changes.

```
/                                         Home                              existing URL
/services                                 Expertise (nav label)             existing URL kept
  /services/transformation-recovery       Transformation Recovery           new page; one new sentence
/industries                               Industries                        new, conditional (D-06)
  /industries/healthcare                  Healthcare                        new, conditional; draft ready
/insights                                 Insights                          existing URL
  /insights/case-studies                  Case studies listing              new listing of existing content
  /insights/{slug}  × 10                  Every existing article            existing content, first-ever URLs
/about-us                                 About                             existing URL
/contact-us                               Contact                           existing URL
Footer: /privacy-policy · /accessibility · /terms · Tech Transpire is a DBA of Akhani LLC.
```

**Deliberately absent:** five separate service pages, AI & Digital Enablement, outcome-theme pages, industry pages without evidence, testimonials, FAQ, partners.
**Details:** [04 Sitemap](04-sitemap.md) · [05 Navigation](05-navigation-specification.md)

## 2. Page structure

Section order for each main page. **[E]** = existing wording, **[N]** = new (draft supplied).

| Page | Sections in order |
|---|---|
| **Home** | Brand statement [N, approved] + existing subtext [E] → "Sounds Familiar?" statements [E] → six problem cards [E] → four outcome themes [N draft] → Our Method, five steps [E] → The outcome callout [E] → Evidence stats [E, gated until verified] → "Is this the right fit?" link → featured insights → Start a Conversation [E] |
| **Expertise** `/services` | Banner [E] → Our Offer [E] → Signature offer callout [E] → engagement path: Discovery → Execution Blueprint → Guided Implementation, plus Transformation Recovery as a separate entry [E] → six components, each linked to related insights [E] → fit list, canonical location [E] → CTAs [E], case-study link repaired |
| **Transformation Recovery** | Existing recovery text and component card [E] → "signs you may need it" from Home cards [E] → evidence articles → "Talk to Us About a Stalled Initiative" [E] |
| **Healthcare** | Short intro [N] → five situations quoted verbatim from articles, each with its attribution [E] → how the offer applies [N table] → gated figures → related insights → CTA |
| **Insights** | Intro [E] → filters (type, topic, industry) → all 10 articles; case studies at `/insights/case-studies` |
| **Article** (×10) | Title + standfirst [E] → full text exactly as written [E] → attribution line [E / D-04] → existing CTA pair [E] → related reading |
| **About** | Banner [E] → Our Story [E] → Our Values [E] → Our Team [E], each profile published once confirmed → Our Message [E] → Our company: Akhani LLC paragraph [N, legal review] → CTAs [E] |
| **Contact** | Start the conversation + email, phone, LinkedIn [E] → Book a 30-minute intro call [E] → What happens next [E] → **form** (Name, Company, Work email, Phone optional, Area of interest, Message, How did you hear, consent) → referral note [N] |

**Details:** [06 Page Blueprints](06-page-blueprints.md) · drafts in [drafts/](drafts/)

## 3. Mapping existing content to the new structure

| | |
|---|---|
| Content captured | 5 pages, 10 articles, 2 drafts, 23 assets, the form, all metadata |
| Content blocks | **125**, every one mapped to a destination ([07](07-content-migration.md)) |
| Moved verbatim | 104 blocks, plus 13 CTAs with only their link updated |
| Changed wording | **None without approval**. The contact form is replaced by your approved field set; typo fixes await approval (E-01 – E-05) |
| Duplicates | 1: the fit list (identical on Home and Services), kept once on Expertise |
| Drive reconciliation | Blogs folder: 10/10 files identical to the live site. Logo folder: archived. **Master folder: still private** |
| URLs | All five live URLs kept. `/home` → `/`; broken `/blogs` → case studies; full map in [10](10-seo-url-plan.md) |

## 4. How expertise, industries, outcomes, case studies and insights relate

```
 Business challenge (6 Home cards)
        │ addressed by
        ▼
 Signature offer ── 4 engagement types ── 6 components ──► Outcome themes (4)
        ▲                                   ▲    ▲               ▲
        │ demonstrated by                    │    │ context        │ evidenced by
 Insights / Case studies (10) ──────────────┘   Industry (Healthcare) │
        │ authored by / led by                                         │
        ▼                                                              │
 People (profiles, when confirmed)          Claims & evidence (gated) ┘
 Referral partner ──► fit list ──► Contact (Area of interest)
```

Rules: every link must be justified by source text. Related reading is limited to 3 items. Articles with similar engagements are **cross-linked but never merged**: TT-INS-003 and TT-INS-007 are separate engagements, as you decided. The brief's five capability names are kept as internal search aliases only, not as pages.
**Details:** [08 Relationships](08-content-relationships.md)

## 5. Content model and technical architecture

- **Content model:** 16 entities: Page, Block, Capability, Engagement type, Challenge, Industry, Insight, Person, Outcome theme, Claim, Testimonial, Asset, Navigation, Site settings, Conversion action, Redirect. Every entity records its source block IDs and preservation status. A **Claim** entity gates publication, so an unverified figure cannot render. JSON Schemas are in `data/schema/` ([09](09-content-schema.md)).
- **Platform (recommended, final choice open):** a statically generated site with content stored as files under version control. Astro is the leading candidate; the editing tool is chosen once editors are named ([11](11-technical-architecture.md)).
- **Contact form:** server function → **Zoho CRM lead** + **email notification** to info@techtranspire.com. Includes honeypot, timing and rate-limit spam protection, a real success or failure state, and no personal data in analytics ([11 §4a](11-technical-architecture.md)).
- **Remediation checklist:** apex domain, `/blogs` buttons, silent form failures, URL preservation, and the safe order for retiring Google Sites, Docs and Apps Script ([15](15-technical-remediation-checklist.md)). Live-site items are **owner actions**; we make no production changes.

## 6. What is still open

**Needs your review (drafts ready):**
1. [Healthcare page](drafts/healthcare-page-draft.md): decides whether Industries appears in the navigation (D-06)
2. [Outcome lines, Transformation Recovery, Akhani LLC wording (Option A or B), form messages, meta descriptions, referral note, 404](drafts/new-content-drafts.md)
3. [Privacy Policy first draft](drafts/privacy-policy-draft.md), for legal review
4. Recommended items awaiting a yes: D-09, D-10, D-11, D-14, D-15, D-17, D-18, D-24 ([12 §5](12-gaps-and-decisions.md))

**Pending verification (does not block the structure; not published until verified):**

| ID | Item | Who |
|---|---|---|
| C-02 / C-19 | $3M fraud losses prevented (global eCommerce): evidence is in the private master folder | Mack / Drive owner |
| C-03 – C-09 | Case-study figures ($3M savings, 90+ locations, 63%, $89M, 7 years, $311K, 1,938 hours) | Mack |
| C-10 | "Over a decade": confirm the timeline behind it | Mack |
| C-12 | PMP | Kranthi |
| C-13 | Bio and qualifications | Devjet |
| C-14 | "Twelve other programs replicated it" | Mack |
| C-18 | Are TT-INS-007, 008, 009, 010 pre-founding engagements? (If so, they get the attribution line) | Mack |
| C-20 | Hemang profile confirmation | Hemang |

**Access:** the master Drive folder still requires sign-in. Share it as "Anyone with the link — Viewer" to close discovery (MS-01).

**Ready to approve?** Use the [Phase 1 Approval Checklist](14-phase-one-approval.md).
