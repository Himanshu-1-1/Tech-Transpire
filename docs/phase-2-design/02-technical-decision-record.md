# 02 — Technical Decision Record

**Updated 2026-10-29.** D-15 approved Astro, on condition that the architecture supports the existing content models, the SEO requirements, reusable components, and a secure server-side Zoho CRM integration. Implementation: [`site/`](../../site/).

## Stack

| Concern | Choice | Why |
|---|---|---|
| Runtime | **Node.js 22 LTS** (`site/.nvmrc`, `engines: >=22.11 <23`) | Supported LTS; Astro 5 requirement |
| Framework | **Astro 5**: static pages + one server route | Fast, secure, SEO-friendly HTML; JavaScript only where needed |
| Server adapter | `@astrojs/node` (standalone) | Runs `/api/inquiry` and real 301 redirects on any Node host. Swap for `@astrojs/netlify` / `@astrojs/vercel` once hosting is chosen; nothing else changes |
| Output | `build.format: 'directory'` (`/services/index.html`), `trailingSlash: 'never'` | Every host and the Node server resolve `/services`. Canonical URLs have no trailing slash. (The earlier `'file'` format made the Node server return 500 for every inner page; found by browser QA and fixed) |
| Content | Read directly from `docs/website-architecture/data/` and the archive | One source of truth; nothing retyped |
| Corrections | `src/lib/corrections.ts`, exact-match, build fails on drift | 17 |
| Publication gating | `src/data/publication.json` (claims, per-article claim lists, approved omissions) → `src/lib/claims.ts`, `src/lib/routes.ts` | An article, result, profile or page renders publicly only when its claims are verified (D-25 revised, 19) |
| Images | `astro:assets` (AVIF/WebP, width sets, lazy) | Archived originals and supplied photography; nothing hotlinked from Drive |
| Fonts | Self-hosted Fontsource: Newsreader + Libre Franklin (D-28) | No third-party requests |
| Interactions | `src/scripts/interactions.ts` + component scripts; CSS motion tokens | 03 |
| Email | `nodemailer` over SMTP | 04 |

## The two builds

| | Review (`npm run build` → `dist/`) | Public (`npm run build:public` → `dist-public/`) |
|---|---|---|
| Review bar and amber tags | Shown | Removed |
| Held articles (unverified claims) | Built, tagged "Held" | **Not built**; all links, related reading and listings adapt |
| Selected Experience results, bios, C-15 tags | Shown, tagged | Removed until verified |
| Industries, Healthcare, Privacy draft | Built | Not built until approved |
| Indexing | `noindex`; robots `Disallow: /` | Indexable; sitemap |

## D-15 conditions

- **Content models:** each Phase 1 block type has one parser (`src/lib/content.ts`) and one component. Card parsing fails the build on unknown icon keys or leftover lines, so content cannot be dropped silently.
- **SEO:** URLs preserved; canonical, OG and Twitter tags; JSON-LD `ProfessionalService` (with Dallas–Fort Worth), `Service`, `Article`, `BreadcrumbList`; sitemap; legacy path redirects generated from `data/redirects.csv` (301 on the server; targets adjust when a page is held). Apex, https and trailing-slash rules are host configuration.
- **Reusable components:** Header, Footer, PageHeader, CtaBand, InsightCard, FitList, Icon, Flag, MethodPath, LineField, SystemNodes, RecoveryPath, Blueprint (placeholder art).
- **Secure Zoho integration:** implemented (04). Credentials only in server environment variables; the browser receives none. JSON posting (CSRF-safe), honeypot, timing, rate limit, server-side validation; success only on confirmed receipt.

## Quality gates

| Command | What it proves |
|---|---|
| `npm run build`, `npm run build:public` | Corrections match exactly once; all blocks parse completely |
| `npm test` | Contact backend: 14 tests (validation, spam, rate limit, Zoho, email, failure paths) |
| `npm run check:content` | 545 archived lines verbatim (review); publication gating (public); launch-blocker warnings |
| `npm run check:links` | Every internal link, asset and `#anchor` resolves in both builds |
| **`npm run validate`** | All of the above. **CI runs it on every push** (`.github/workflows/validate.yml`) |
| `npm run qa` (preview running) | 42 browser checks: JS errors, overflow at 320/1440, menu, keyboard, magnetic, cursor, reduced motion, reading progress, form states, API, redirects |
| `npm run screenshots` (preview running) | Full-page captures at 1440/768/390; fails on overflow or page errors |

## Running it on another machine

```
# Node 22 LTS (nvm use, or install from nodejs.org)
cd site
npm ci
npm run dev                      # http://localhost:4321, review mode, live reload
npm run validate                 # full build + checks, as CI does
npm run build && npm run preview -- --port 4322
npm run qa                       # in a second terminal, against :4322
```
Chrome (or Edge) must be installed for `qa` and `screenshots`; set `CHROME_PATH` if it is not found.
