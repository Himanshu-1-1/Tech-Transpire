# 10 — URL, SEO and Redirect Plan

## 1. Principles

1. **Keep every live URL that works today.** `/services`, `/insights`, `/about-us` and `/contact-us` stay exactly as they are. Navigation labels can change without changing URLs (D-22, D-23).
2. **One URL per piece of content.** Every other variant 301-redirects to it.
3. **Content must be in the HTML response.** The rebuild delivers page text in server/build-generated HTML, not inside an iframe or loaded by client-side script (finding T1). This makes the content *crawlable*; it does not by itself guarantee better rankings.
4. **No thin pages for keywords.** A page exists only if 06 justifies it.

## 2. URL conventions

| Rule | Standard |
|---|---|
| Host | `https://www.techtranspire.com` is canonical. `techtranspire.com` (apex) and `http://` variants → 301 to it (D-19) |
| Case | lowercase only; mixed-case requests → 301 to lowercase |
| Trailing slash | **no trailing slash**; `/services/` → 301 `/services` (both return 200 today) |
| Word separator | hyphens |
| Slug length | aim ≤ 60 characters; drop stop-words only where meaning survives |
| Hierarchy | max two levels (`/section/item`) |
| Article slugs | derived from the listing title (Sheet), fixed at first publish and **never changed** afterwards; if a title changes, the slug stays |
| Query strings | Insights filters may use `?type=` / `?topic=`; these pages carry `rel=canonical` to `/insights` and are not listed in the sitemap |
| Reserved slugs under `/insights/` | `case-studies`, `topics`, `page` |

## 3. Legacy URL inventory and decisions

Every URL that exists, or that is linked from the current site, is listed here. The machine-readable version is [`data/redirects.csv`](data/redirects.csv).

| Legacy URL | Status today | Decision | Target | Reason |
|---|---|---|---|---|
| `/` | 200 (home) | **Preserve** | `/` | Canonical home |
| `/home` | 200 (duplicate of home) | **301** | `/` | Remove duplicate (T2) |
| `/services` | 200 | **Preserve** | `/services` | Established URL; nav label becomes "Expertise" |
| `/services/` | 200 | **301** | `/services` | Trailing-slash normalisation |
| `/insights` | 200 | **Preserve** | `/insights` | |
| `/about-us` | 200 | **Preserve** | `/about-us` | D-23 |
| `/contact-us` | 200 | **Preserve** | `/contact-us` | D-23 |
| `/contact-us/` | 200 (linked from Services and About CTAs) | **301** | `/contact-us` | Normalisation |
| `/blogs` | **404**, but linked by two CTAs | **301** | `/insights/case-studies` | Repairs broken CTAs; both CTAs promise case studies (T4) |
| `/expertise` | 404 | **301** | `/services` | Concept 06 label; people may guess it |
| `/about` | 404 | **301** | `/about-us` | Common guess |
| `/contact` | not probed | **301** | `/contact-us` | Common guess |
| `/blog`, `/case-studies` | 404 | **301** | `/insights`, `/insights/case-studies` | Common guesses |
| `http://www.techtranspire.com/*` | 301 → https | **Preserve behaviour** | `https://www…` | |
| `https://techtranspire.com/*` | **no response** | **Fix DNS, then 301** | `https://www.techtranspire.com/*` | D-19 |
| Insights articles | **no URL** (modal) | **New URLs** | `/insights/{slug}` (see 04) | Nothing to redirect; old shares pointed to `/insights` |
| Google Doc export URLs | public | **Not redirected** | — | After migration, set Docs sharing to restricted so content is not duplicated publicly (Phase 4 task) |

**Before launch, re-check this table against Search Console and backlink data (MS-05).** Any URL found there and not listed above must be added.

## 4. Canonical rules

- Every indexable page outputs a self-referencing absolute `rel=canonical`.
- Filtered and paginated Insights views canonicalise to `/insights` (pagination: page 2+ canonicalises to itself if pagination is used; at 10 articles none is needed).
- Related-evidence pairs (TT-INS-003/007, TT-INS-005/010, TT-INS-002/008) are **different texts treated as separate engagements** (company decision; identity unverified, C-18). Each keeps its own canonical; they cross-link as related reading (08 §3.5).
- Utility pages: `/privacy-policy`, `/terms`, `/accessibility` are indexable; `404` returns HTTP 404 and is `noindex`.
- The post-submission state on Contact is inline (no separate URL). If a thank-you URL is ever introduced, it is `noindex`.

## 5. Page-level SEO specification

Titles: `{Page-specific title} | Tech Transpire`, ≤ 60 characters where possible. Descriptions: unique, 140–160 characters, written from existing copy (N-10, needs approval). Starting sources are given below. They are **not** final copy.

| Page | Primary search intent | Topical focus | Title source | Description source (existing wording to adapt) | Structured data |
|---|---|---|---|---|---|
| `/` | Navigational ("Tech Transpire"); commercial-investigational ("transformation advisory") | Clarity before execution; transformation advisory for mid-sized organisations | N-01 brand line | TT-PG-001-B02 subtext | `Organization`, `WebSite` |
| `/services` | Commercial ("implementation planning consultant", "execution blueprint", "ERP selection advisory") | Implementation Clarity & Execution Blueprint | TT-PG-002-B01 headline | TT-PG-002-B01 subtext | `Service` (one, for the signature offer) |
| `/services/transformation-recovery` | Problem-aware ("stalled project recovery", "failed implementation") | Recovering stalled initiatives | TT-PG-002-B05 card title | TT-PG-002-B04 "Transformation Recovery" step | `Service`, `BreadcrumbList` |
| `/industries` | Investigational | Where experience exists | N-05 | N-05 | `BreadcrumbList` |
| `/industries/healthcare` | Commercial ("healthcare operations consulting", "CMS compliance migration") | Healthcare operations, compliance-driven transformation | N-05 | N-05 | `BreadcrumbList` |
| `/insights` | Informational hub | All topics | TT-PG-003-B02 heading | TT-PG-003-B02 line (already a description) | `CollectionPage` |
| `/insights/case-studies` | "{topic} case study" | Case evidence | N-10 | N-10 | `CollectionPage` |
| `/insights/{slug}` | Informational (topic of article) | Per article | Sheet title (D-09) | Sheet excerpt (existing, verbatim) | `Article` with `author` (`Person`), `datePublished`, `dateModified`, `image`; `BreadcrumbList` |
| `/about-us` | Navigational / trust | Company, values, team | "About" | TT-PG-004-B01 subtext | `AboutPage`; `Person` for each approved profile (D-07) |
| `/contact-us` | Navigational / transactional | Contact | "Contact" | Existing embed description: "Start a conversation with Tech Transpire. Book an intro call or send us a message — we will respond within one business day." | `ContactPage` |

**Not recommended:** `Review`/`AggregateRating` (no testimonials), `FAQPage` (no FAQ), `LocalBusiness` (no published address).

`Organization` properties to use, from verified sources only: `name` "Tech Transpire", `url`, `logo` (MS-03), `email` info@techtranspire.com, `telephone` +1-979-479-2779, `sameAs` LinkedIn company page. `legalName` / `parentOrganization` only after D-08 is approved.

## 6. Heading hierarchy rules

- Exactly **one H1 per page**. Home: the brand line (D-01). Articles: the Doc H1 (D-09).
- Source section headings ("> " lines in the archive) become **H2**. Card, step and stat titles inside a block become **H3**, or are not headings at all when they are short labels (Phase 2 decides presentation, not hierarchy).
- No heading levels skipped. Headings are never used for styling only. The TT-INS-001 card title styled as a heading is corrected (E-05).
- Every article's first source heading repeats the banner headline. In the template, the banner headline is the H1 and the duplicate first section heading is not rendered as a second H1. **The text is not deleted** — the source keeps both.

## 7. Internal linking

Driven by the relationship model in [08-content-relationships.md](08-content-relationships.md):

- Every article links to at least one Expertise destination and to Contact via its **existing** CTA pair. The CTA URLs are updated to the new structure (for example `/insights` → `/insights/case-studies` where the CTA says "Read More Case Studies"), but the CTA text is unchanged.
- Expertise and Industry pages list related insights (maximum 3–4, editorially chosen).
- Breadcrumbs on every page below the top level.
- Anchor text is descriptive; no "click here".

## 8. XML sitemap and robots

- `/sitemap.xml` is generated at build time from published content only. It includes canonical URLs with `lastmod` from content `updated_at`, and excludes 404, filtered views, drafts and `noindex` pages.
- `/robots.txt`: allow all; reference the sitemap; disallow preview/staging hosts (which also send `X-Robots-Tag: noindex`).
- Submit the sitemap in Google Search Console and Bing Webmaster Tools at launch. Verify the domain property before launch so pre/post data can be compared.

## 9. Images

- Every image gets alt text (N-11). Decorative images get an empty `alt`.
- File names are descriptive (`mack-akhani.jpg`, not Drive IDs).
- Images are served at responsive sizes in modern formats. Headshots and covers are migrated from the archived originals ([`source-archive/assets/`](source-archive/assets/)).
- Open Graph image: a site default (Phase 2) plus the article cover per article.

## 10. Freshness

- Articles carry `datePublished` (from the Sheet) and `dateModified` (set when content actually changes).
- The Insights landing shows newest first by default.
- Annual review of the claims register (12, §3) and Expertise copy.

## 11. Launch SEO checklist (summary)

All legacy URLs in §3 respond as specified · no 404s in internal links · every page has unique title, description, canonical and a single H1 · sitemap valid and submitted · structured data validates · Google Docs sharing restricted after migration · Search Console baseline captured before DNS cut-over · old Google Sites version unpublished only **after** the new site serves all URLs.
