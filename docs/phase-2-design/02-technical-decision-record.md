# 02 — Technical Decision Record

**2026-10-29.** D-15 approved Astro, on condition that the architecture supports the existing content models, the SEO requirements, reusable components, and a secure server-side Zoho CRM integration. This records how each condition is met. The implementation is in [`site/`](../../site/).

## Stack

| Concern | Choice | Why |
|---|---|---|
| Framework | **Astro 5** (static output) | Pages are pre-rendered HTML: fast, secure, cheap to host, excellent for SEO. Components without a client-side framework; JavaScript only where needed (menu, filters, form) |
| Content | Read **directly** from `docs/website-architecture/data/content-blocks.json`, the Insights Sheet export and the archive | One source of truth. The site cannot drift from the approved inventory, and nothing is retyped |
| Corrections | `site/src/lib/corrections.ts`, applied at build | The archive is never edited. Each correction must match exactly once or the build fails ([17](../website-architecture/17-approved-corrections-log.md)) |
| Claims gating | `site/src/lib/claims.ts` mirrors the register (12 §3) | The public build renders a claim only when it is `verified` |
| Images | `astro:assets` (responsive WebP/AVIF, width sets, lazy loading) | Archived originals and supplied photography are optimized at build. Nothing is hotlinked from Google Drive |
| Fonts | Self-hosted via Fontsource | No third-party font requests (privacy, speed). The final build ships only the chosen version's two families |
| Node | 20.3+ (developed on 22 LTS) | Astro requirement |

## The two builds

| | Review build (`npm run build`) | Public build (`npm run build:public`) |
|---|---|---|
| Purpose | Team review | What visitors will see |
| Review bar, typography A/B switch, amber tags | Shown | Removed |
| Pending claims (Home results, bios) | Shown, tagged | **Removed.** Results band hidden until ≥ 2 results are verified |
| Unapproved pages (Industries, Healthcare, Privacy draft) | Built, tagged | **Not built** until approved |
| Indexing | `noindex`, robots `Disallow: /` | Indexable, sitemap, robots points to it |

## Meeting the D-15 conditions

**Existing content models.** Pages are composed from the Phase 1 block types (09). Each block type has one parser and one component (`lib/content.ts`, [01 §6](01-design-system.md)). Insights carry the 06 §8 classification (type, industry, outcome theme, related expertise, related reading).

**SEO requirements (10).** All five live URLs are kept, and every article gets its first standalone URL at `/insights/{slug}`. Extensionless URLs with no trailing slash (`build.format: 'file'`). Canonical, Open Graph and Twitter tags on every page. Structured data: `Organization` (every page), `Service` (Expertise), `Article` + `BreadcrumbList` (articles). Generated `sitemap-index.xml` in the public build. Per-page titles and descriptions use the N-10 drafts. **Redirects** (`data/redirects.csv`, e.g. `/home` → `/`, `/blogs` → `/insights/case-studies`) are written as host rules once hosting is chosen.

**Reusable components.** `site/src/components/`: Header, Footer, PageHeader (with breadcrumbs), CtaBand, InsightCard, FitList, Icon, Blueprint, Flag. Templates: Home, Landing (Expertise, Industries, Insights), Detail (Transformation Recovery, Healthcare), Article, Listing (Case studies), About, Contact, Utility (Privacy, 404).

**Secure server-side Zoho CRM integration** (Step E). The site stays static except one server function:

```
Browser form ──POST /api/inquiry──► Server function (adapter: Netlify / Vercel / Node)
                                     1. validate every field server-side (06 §10 rules)
                                     2. spam checks: honeypot "website", time-to-submit ≥ 3 s, per-IP rate limit
                                     3. Zoho CRM: POST /crm/v{n}/Leads (OAuth self-client refresh token → access token)
                                     4. email notification to info@techtranspire.com (flag Referral)
                                     5. respond 200 only when (3) or (4) succeeded
```

- **Secrets** (`ZOHO_CLIENT_ID`, `ZOHO_CLIENT_SECRET`, `ZOHO_REFRESH_TOKEN`, `ZOHO_DC` = `.com`/`.eu`/`.in`, mail credentials) live only in the host's environment settings. They are never in the repository (`.gitignore` blocks `.env*`) and never reach the browser.
- The form already posts to `/api/inquiry`, sends the honeypot and start time, preselects Area of interest from `?interest=`, validates with the N-09 messages, and shows success **only** when the server confirms. In the static review build there is no endpoint yet, so a submission shows the failure state rather than a false "thank you".
- **Open (D-16):** hosting provider (which sets the adapter), Zoho data centre and API access, analytics tool.

## Quality gates (Step F foundations, already in place)

| Check | Command | What it proves |
|---|---|---|
| Build | `npm run build`, `npm run build:public` | Every correction matched exactly once; every card, step and stat block parsed completely (unknown icon keys or leftover lines fail the build) |
| Content integrity | `node --experimental-strip-types scripts/check-content.mjs` (after the public build) | **545 archived lines appear verbatim** in the public pages; no review tags, `noindex`, withdrawn label (C-01), withheld sentence (E-09), unverified results band, or unapproved page leaks into the public build. Deliberate exclusions are listed in the script with reasons |
| Layout | `node scripts/screenshots.mjs` (with `npx astro preview` running) | Full-page desktop (1440) and mobile (390) captures; **fails if any page scrolls horizontally** |

Still to add in Steps E–F: link checker, redirect test of every `redirects.csv` row, automated accessibility audit (axe) per template, Lighthouse performance budget.

## Running it

```
cd site
npm install
npm run dev                 # http://localhost:4321 (review mode)
npm run build && npx astro preview
npm run build:public && node --experimental-strip-types scripts/check-content.mjs
```
