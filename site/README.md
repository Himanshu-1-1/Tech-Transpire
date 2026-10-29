# techtranspire.com (Astro)

The website. Content is read from `../docs/website-architecture/data/` (the Phase 1 archive), never retyped. See [HANDOFF.md](../HANDOFF.md) first.

## Requirements

- **Node.js 22 LTS** (`.nvmrc`). With nvm: `nvm use`. Otherwise install the LTS from nodejs.org.
- Chrome or Edge, only for `npm run qa` and `npm run screenshots` (set `CHROME_PATH` if not found).

## Commands

| Command | What it does |
|---|---|
| `npm ci` | Install exact dependencies |
| `npm run dev` | Review site with live reload at http://localhost:4321 |
| `npm run build` | Review build → `dist/` (drafts and unverified items tagged, `noindex`) |
| `npm run build:public` | Public build → `dist-public/` (only approved, verified content) |
| `npm run preview -- --port 4322` | Serve the review build with the real server (API and redirects) |
| `npm run preview:public` | Serve the public build (`PORT=4322` to choose a port) |
| `npm test` | Contact backend tests |
| `npm run check:content` | Verbatim + publication gating + launch-blocker warnings (needs both builds) |
| `npm run check:links` | Internal links and anchors in both builds |
| **`npm run validate`** | Both builds + all checks (what CI runs) |
| `npm run qa` | Browser interaction tests against a running preview |
| `npm run screenshots` | Full-page screenshots into `docs/phase-2-design/screenshots/` |

## Where things are

| Path | What |
|---|---|
| `src/pages/` | Routes; `api/inquiry.ts` is the only server-rendered route |
| `src/components/` | Header, Footer, PageHeader, CtaBand, InsightCard, MethodPath, LineField, SystemNodes, RecoveryPath, … |
| `src/lib/` | Content parsing, corrections, claims, insights, routes, site settings |
| `src/data/publication.json` | **Publication state**: claim statuses, per-article claims, approved omissions |
| `src/server/` | Contact form: validation, Zoho CRM, email |
| `src/styles/global.css` | Design tokens and all styles |
| `src/scripts/interactions.ts` | Site-wide interactions |
| `.env.example` | Server environment variables for Zoho and SMTP (never commit values) |

## Publishing a verified article or result

1. Record the verification in `docs/website-architecture/12-gaps-and-decisions.md`.
2. Set the claim to `"verified"` in `src/data/publication.json`, or add an approved omission under `omissions`.
3. `npm run validate`. The article now builds publicly, and links, listings and redirects update automatically.
