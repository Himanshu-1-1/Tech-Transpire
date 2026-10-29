# 15 — Technical Remediation Checklist

**Rule:** no changes are made to the live production website as part of this project unless the company explicitly approves the specific change. Items in section A are **owner actions** on the current site. They are documented here so the owner can carry them out, or approve them, at a time of their choosing. Sections B and C belong to the new build.

Status key: ☐ open · ◐ in progress · ☑ done · ⏸ waiting on a decision

## A. Current live site (owner action, needs approval before anyone acts)

| ✓ | ID | Issue (finding) | Action | Owner | Notes / risk |
|---|---|---|---|---|---|
| ☐ | R-01 | `techtranspire.com` (apex) does not respond (T7) | 1) Identify the registrar/DNS host and record the current DNS records (screenshot). 2) Confirm how `www` is pointed at Google Sites (CNAME `ghs.googlehosted.com`). 3) Add apex forwarding: a registrar "domain forwarding" 301 to `https://www.techtranspire.com` **with HTTPS on the apex**, or an apex record to a redirect service that issues TLS certificates. 4) Test `http://` and `https://` apex → `https://www.` with a 301. | Domain owner | Low risk if `www` records are untouched. Google Sites cannot serve the apex itself. Repeat the check at the new host's DNS cut-over (B-03). |
| ☐ | R-02 | "Read Our Case Studies" (Services) and "See Our Case Studies" (About) link to `/blogs`, which returns 404 (T4) | In the source Google Docs, change the CTA2 URL to `https://www.techtranspire.com/insights`: Services Doc `1X9fvNF9…` line `CTA2: Read Our Case Studies > …/blogs`; About Doc `1dFDzRl0…` line `CTA2: See Our Case Studies > …/blogs`. Labels stay the same. | Content owner | **Editing these Docs changes the live site immediately**, because the site reads them at runtime. In the new build these CTAs point to `/insights/case-studies`, and `/blogs` 301s there. |
| ☐ | R-03 | Home "See Our Work" links to `/about-us` (T5) | Optional interim fix: change the CTA2 URL in the Home Doc `1nszXWql…` to `/insights`. | Content owner | Same live-edit caution as R-02 |
| ☐ | R-04 | Contact form shows success even when the submission fails (T8) | Until launch, check the Apps Script destination for received submissions against inbox expectations every week. Optional code fix: in the Contact embed, replace `.catch(showSuccess)` with an error message showing email and phone. | Site owner | Enquiries may currently be lost without anyone knowing |
| ☐ | R-05 | Existing form submissions stored by Apps Script `AKfycbz8nPkA…` | Find where the script writes (Sheet/email), export all submissions, and import the relevant ones into Zoho CRM before the old form is retired. | Site owner | Needed so no historical lead is lost |
| ☐ | R-06 | Master Drive folder is private (MS-01) | Share as "Anyone with the link — Viewer", or grant access to the project account, so the Google Sites project and reference material can be reconciled. | Drive owner | Blocks verification of C-02 / C-19 source material |

## B. New build: migration and launch

| ✓ | ID | Item | Spec | Gate |
|---|---|---|---|---|
| ☐ | B-01 | Preserve all valid URLs | `/`, `/services`, `/insights`, `/about-us`, `/contact-us` serve 200 on the new site | Phase 4 QA |
| ☐ | B-02 | Redirect map | Every row in [`data/redirects.csv`](data/redirects.csv) tested: correct 301 target, single hop, no loops | Phase 4 QA |
| ☐ | B-03 | Canonical host | Apex and `http://` → `https://www.techtranspire.com` (re-check R-01 at the new host) | Launch |
| ☐ | B-04 | Trailing slash and case normalization | `/services/` → `/services`; uppercase → lowercase | Phase 4 |
| ☐ | B-05 | `/blogs`, `/home`, guessed URLs | 301 as listed in [10 §3](10-seo-url-plan.md) | Phase 4 |
| ☐ | B-06 | Search Console | Verify the domain property **before** cut-over; record a baseline (indexed pages, queries, links); submit the sitemap after launch | Before DNS change |
| ☐ | B-07 | Re-check legacy URLs against Search Console and backlink data | Add any URL found there that is missing from the redirect map | Before launch |
| ☐ | B-08 | sitemap.xml and robots.txt | Generated from published content; staging is `noindex` | Phase 3 |
| ☐ | B-09 | Contact form → Zoho CRM + email | As specified in [11 §4a](11-technical-architecture.md) and [06 §10](06-page-blueprints.md#10-contact); end-to-end test of success, partial failure and total failure | Phase 4 |
| ☐ | B-10 | Spam protection | Honeypot, minimum submit time, rate limit; challenge only if needed | Phase 3 |
| ☐ | B-11 | Privacy consent + Privacy Policy live | Legal-approved text ([drafts/privacy-policy-draft.md](drafts/privacy-policy-draft.md)) | **Launch blocker** |
| ☐ | B-12 | Email authentication | SPF, DKIM and DMARC for the notification sender domain | Before form launch |
| ☐ | B-13 | Secrets | Zoho and email credentials only in host environment secrets; none in Git or content | Phase 3 |
| ☐ | B-14 | Remove legacy runtime dependencies | No references to the Apps Script proxy, the Google Sheet, Drive thumbnails, or the `trueleansolutions/website-stylesheet` CDN file (T10) | Phase 4 (grep check) |
| ☐ | B-15 | Images self-hosted | Assets from `source-archive/assets/` (including the logo files in `assets/logo/`) served from the new site with alt text | Phase 4 |
| ☐ | B-16 | 404 handling | Unknown paths return HTTP 404 with the N-14 page | Phase 4 |
| ☐ | B-17 | Claims gate | No unverified claim (12 §3) renders. Build fails if a gated claim lacks `verification_status = verified` | Phase 3 |
| ☐ | B-18 | Accessibility | WCAG 2.2 AA audit, including form errors and focus handling | Phase 4 |
| ☐ | B-19 | Performance | Budgets as set in [11 §7](11-technical-architecture.md) | Phase 4 |

## C. After cut-over

| ✓ | ID | Item | When |
|---|---|---|---|
| ☐ | L-01 | Smoke test every top-level URL and the form | Launch hour |
| ☐ | L-02 | Unpublish the Google Sites site **only after** the new site serves all URLs | Launch day |
| ☐ | L-03 | Restrict sharing on the source Google Docs and Sheet (they are public today). **Do not do this before cut-over**: the live site depends on them being public | After L-02 |
| ☐ | L-04 | Disable the Apps Script content proxy and the old form script | After L-02 |
| ☐ | L-05 | Monitor 404s, crawl errors and form delivery | Day 1, week 2, week 6 |
