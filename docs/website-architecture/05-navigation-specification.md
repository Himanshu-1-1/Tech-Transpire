# 05 — Navigation Specification

This document is structural only. Visual treatment of navigation, including mobile presentation, belongs to Phase 2.

---

## 1. Primary navigation

| Order | Label | URL | Status | Notes |
|---|---|---|---|---|
| 1 | Home | `/` | [E] | Logo also links to `/` |
| 2 | Expertise | `/services` | [E] | Label changes from "Services"; URL kept (D-22) |
| 3 | Industries | `/industries` | [N][C] | Only if D-06 (a) is approved before launch |
| 4 | Insights | `/insights` | [E] | |
| 5 | About | `/about-us` | [E] | URL kept (D-23) |
| 6 | Contact | `/contact-us` | [E] | Label changes from "Contact Us". Kept as the last item so it is always the final step |

**If Industries is deferred (D-06 option b):** the navigation has five items in the order Home · Expertise · Insights · About · Contact. Adding Industries later is a configuration change, not a restructure.

**Rules**
- No more than six top-level items.
- Primary items have no dropdowns at launch. Expertise has at most one detail page (Transformation Recovery) and Industries at most one (Healthcare), so a dropdown would add a step without helping anyone find anything. Revisit once a section has three or more children.
- The current section is marked as active for assistive technology (`aria-current="page"` on exact match; section-level state on child pages).
- Navigation items come from a single navigation configuration ([09-content-schema.md](09-content-schema.md)), not from hard-coded page templates.

## 2. Secondary and contextual navigation

| Context | Navigation | Rule |
|---|---|---|
| Expertise landing | In-page links to: engagement path, components, fit list (`#fit`); link to `/services/transformation-recovery` from the Transformation Recovery step and card | Sub-items appear only once their detail page exists |
| Expertise detail | "Back to Expertise" via breadcrumb; links to related components, insights and industries | |
| Industries landing | Link to `/industries/healthcare`; other sectors listed as "selected experience" without links to pages | No links to pages that don't exist |
| Insights landing | Filters: **content type** (Case study / Perspective / Guide), **topic**, **industry** | Filters must also work without JavaScript, by providing indexable type listings (e.g. `/insights/case-studies`). Topic and industry filters are client-side and not indexed. |
| Article | Breadcrumb; "Related insights" (max 3); related Expertise link; the article's own CTA | Relationship rules in [08](08-content-relationships.md) |
| About | In-page anchors: `#story`, `#values`, `#team`, `#message`, `#relationships` | Anchors are stable link targets for referrals |

## 3. Breadcrumbs

**Rules**
- Shown on every page below the first level; not shown on Home.
- The path follows the URL hierarchy, not the visitor's click path.
- The last item is the current page and is not a link.
- Labels use navigation labels ("Expertise", not "Services").
- Emitted as `BreadcrumbList` structured data with the same items.

| Page | Breadcrumb |
|---|---|
| `/services/transformation-recovery` | Home › Expertise › Transformation Recovery |
| `/industries/healthcare` | Home › Industries › Healthcare |
| `/insights/case-studies` | Home › Insights › Case studies |
| `/insights/{slug}` (case study) | Home › Insights › Case studies › {Card title} |
| `/insights/{slug}` (other types) | Home › Insights › {Card title} |
| `/privacy-policy` | Home › Privacy Policy |

Case studies show the "Case studies" level even though their URL is `/insights/{slug}`. This is the single exception to URL-based breadcrumbs, made so that visitors can return to the case-study listing. Confirm in Phase 2.

## 4. Footer

| Group | Items | Source |
|---|---|---|
| Navigation | Expertise · Industries (if live) · Insights · Case studies · About · Contact | Navigation configuration |
| Contact | Email: info@techtranspire.com · Phone: +1 (979) 479-2779 · "Book your intro call" (Microsoft Bookings link) | [E] TT-PG-005-B02, B03 — exact wording and values |
| Social | LinkedIn: "Tech Transpire" → `https://www.linkedin.com/company/techtranspire` | [E] TT-PG-005-B02 |
| Legal | Privacy Policy · Accessibility · Terms (if approved) | [N] D-13 |
| Entity line | "Tech Transpire is a DBA of Akhani LLC." | **[N] needs approval (D-08)** |
| Copyright | "© {year} Akhani LLC" or "© {year} Tech Transpire" | [N] — the owner name depends on D-08 |

The footer does not link to True Lean Solutions. That relationship is explained on About only (D-08).

## 5. Contact entry points

| Location | Entry point | Destination |
|---|---|---|
| Every page | Primary nav "Contact" | `/contact-us` |
| Every page | Footer email, phone, booking link | Direct |
| Home | "Start a Conversation" [E] TT-PG-001-B09 | `/contact-us` |
| Expertise | "Start with a Discovery Conversation" [E] TT-PG-002-B07 | `/contact-us` (area of interest preselected: Discovery and clarity) |
| Transformation Recovery | Recovery CTA [N] | `/contact-us` (preselected: Stalled or underperforming initiative) |
| About | "Work with Us" [E] TT-PG-004-B06 | `/contact-us` |
| Each article | Its own existing CTA (e.g. "Talk to Us About a Stalled Initiative") | `/contact-us`, preselected where the CTA implies a type |
| Fit list | "Refer someone" [N] (N-13) | `/contact-us` (preselected: Referral or partnership) |

Preselection uses a query parameter (`/contact-us?interest=recovery`). The canonical URL stays `/contact-us`.

## 6. Cross-link rules

1. Link only where the relationship exists in the source or the approved relationship model ([08](08-content-relationships.md)). No links added just to increase internal linking.
2. Every article links to at least one Expertise destination and at most three related insights.
3. Every Expertise component links to the insights that evidence it, if there are any.
4. Case studies link to their industry page, but only where that page exists.
5. The existing broken targets are fixed: `/blogs` → `/insights/case-studies`, and "See Our Work" → `/insights/case-studies` (D-20).
6. Link text describes the destination; generic "Read more" is not used on its own.

## 7. Site search

**Recommendation: no site-wide search at launch.**
- The site will have about 23 pages. Navigation, the Insights filters and the footer cover every destination within two clicks.
- Insights gets client-side filtering by type, topic and industry, plus a text filter over titles and excerpts.
- Revisit when Insights passes about 40 items, or analytics show visitors failing to find content. A static search index would be enough at that point; no search service is needed.
- The Google Sites "Search this site" box is platform chrome and is not carried over.

## 8. Mobile navigation (structural requirements only)

- Every primary item and the Contact entry point are reachable on small screens without horizontal scrolling.
- The menu control is a real button with an accessible name and expanded/collapsed state, operable by keyboard, and it returns focus correctly when closed.
- A "Skip to main content" link comes first on every page.
- The order of items is the same on every screen size.
- Phone and email in the footer are actionable on mobile.
