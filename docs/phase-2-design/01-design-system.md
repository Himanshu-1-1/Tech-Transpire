# 01 — Design System (Phase 2, v2)

**Status: Concept 06 direction approved conditionally (2026-10-29), pending review of the rendered screenshots. Typography still to choose (A or B).**
**Implementation:** the design system is now code in [`site/src/styles/global.css`](../../site/src/styles/global.css) and [`site/src/components/`](../../site/src/components/). The v1 single-file prototype ([prototypes/home.html](prototypes/home.html)) is superseded and kept for the record.

## Changes in v2 (company feedback, 2026-10-29)

| Topic | v1 | v2 |
|---|---|---|
| Theme | Light and dark | **Light only**, with selective dark navy bands (closing CTA, signature-offer panel, booking panel, footer). Dark mode not required for launch |
| Typography | Serif headings proposed | **Two versions for comparison**: A (modern sans, Inter Tight + Inter, closest to Concept 06) and B (Newsreader + Libre Franklin). Switched by `html[data-type]`; see [screenshots](screenshots/README.md) |
| Hero visual | Blueprint illustration | **Premium architectural photography** per Concept 06 (files requested, [assets/README.md](assets/README.md)). The line illustration stays only as a supporting motif (inner page headers) and as the placeholder until photos arrive |
| Hero eyebrow | "Business advisory & transformation" (new copy) | "Clarity · Alignment · Execution", the company's own lockup line (F-05, confirm) |
| Results | Dashed "Awaiting evidence" slot | **"Track record" results band after the approach, before the final conversation.** Public build: verified results only, and the band is hidden until at least two are verified. Placeholders appear only in the review build |
| Home narrative | Blueprint section order | Challenge → credibility ("Built from experience", founder) → approach (Method + The outcome) → outcomes (themes, results, insights) → conversation |
| Outcome themes | Unbordered columns | Photo cards (Concept 06), using the cover of the article that best evidences each theme, linked to it |

Sections 2–3 below describe v1 tokens; the light values still apply, and the dark-mode column is retired.

This system adapts the design to the approved content. It does not change content to fit the design. Where the design raises an editorial question, the question is listed in §10 and not applied.

## 1. Direction

Concept 06 is the approved reference: a light, calm, architectural composition led by blue, with a left-aligned brand statement, a right-side architectural visual, outcome cards and a dark closing band. We keep that composition and make it specific to Tech Transpire in three ways:

1. **Executive voice in the type.** An editorial serif for headings signals an advisory firm. It avoids the look of a software, staffing or IT-services company, which nearly always uses a single geometric sans.
2. **The logo's own blues.** The three tones of the chevron mark (deep navy, mid blue, sky) are the whole palette. There is no second accent hue.
3. **One signature moment.** The existing method ("From confusion to clarity", TT-PG-001-B06) becomes a forward track that runs from *Confusion* to *Clarity* across the five method steps and ends in a chevron, which echoes the logo. Everything around it stays quiet.

## 2. Color tokens

Every color is a token, defined for light and dark themes. Components never use a raw color.

| Token | Light | Dark | Role |
|---|---|---|---|
| `--paper` | `#F4F6F9` | `#0A111C` | Page ground (cool, blue-biased, never pure grey) |
| `--surface` | `#FFFFFF` | `#101B2B` | Cards, panels, footer |
| `--wash` | `#EAF1F9` | `#0E1C2F` | Tinted bands (Method), icon tiles |
| `--ink` | `#0F1C2E` | `#E7EEF7` | Text and headings |
| `--muted` | `#4F5D72` | `#9DAEC4` | Secondary text (AA on paper and surface) |
| `--line` / `--line-strong` | `#D9E1EB` / `#B4C2D4` | `#1F2E44` / `#34475F` | Hairlines, dividers |
| `--blue` | `#1A5DAE` | `#6EA8EC` | Accent text, links, step numerals, icons |
| `--sky` | `#3E9FDE` | `#86C8F2` | Small marks only (chevron glyphs, eyebrow on dark) |
| `--btn-bg` / hover | `#1A5DAE` / `#154E8C` | `#2E6AB8` / `#3A78C6` | Primary button; white text passes AA in both themes |
| `--band` | `#0C2242` | `#050B14` | Closing CTA band, proposal ribbon |
| `--n-bg` / `--n-ink` | `#FDEFD9` / `#7A4A00` | `#3A2A0C` / `#F2C879` | Semantic "pending / awaiting evidence" state. Kept separate from the brand accent |

Rules: blue text never sits on `--band`; on dark bands use `--band-ink` and `--sky`. Pending and verified states are semantic colors, never the brand accent.

## 3. Typography

| Role | Face | Use |
|---|---|---|
| Display | **Newsreader** (Google Fonts, variable optical size), weights 400/500, italic for quotations | H1, H2, card and step titles, pull statements, CTA line |
| Body and UI | **Libre Franklin**, weights 400/500/600 | Running text, navigation, buttons, labels, metadata |

Fallbacks are declared for both (Georgia-class serif; Segoe UI / Helvetica sans).

| Step | Size | Line height | Face |
|---|---|---|---|
| H1 (Home only) | `clamp(2.55rem → 4.6rem)` | 1.04 | Display 400 |
| H2 | `clamp(1.9rem → 2.65rem)` | 1.12 | Display 400 |
| H3 display (steps, themes, articles) | 1.35–1.6rem | 1.15–1.22 | Display 400 |
| H3 UI (problem cards) | 1.1rem | 1.35 | Body 600 |
| Lead | 1.2rem | 1.55 | Body 400 |
| Body | 17px | 1.6 | Body 400 |
| Small / card body | 15–15.5px | 1.6 | Body 400 |
| Eyebrow / label | 12–12.5px, uppercase, +0.14em | 1.4 | Body 600 |

Headings use `text-wrap: balance`. Running text is capped near 65 characters per line. Article body text (Phase 2, article template) will be set at 19px, about 68ch.

## 4. Layout, grid and spacing

- **Container:** 1200px max, side gutter `max(16px, safe-area)` on phones and `max(32px, safe-area)` from 720px.
- **Section rhythm:** `clamp(64px, 8vw, 112px)` vertical padding. Sections are separated by a change of ground (paper → wash → band) or a single hairline, never both.
- **Spacing scale:** 4 · 8 · 12 · 16 · 20 · 24 · 28 · 32 · 40 · 48 · 56 · 64. Siblings are spaced with `gap`, not margins.
- **Radius:** 4px for buttons, 6px for cards and panels. Pills only for chips.
- **Elevation:** flat. One soft shadow exists in the system, on the floating hero quote. Cards use a hairline border.
- **Card discipline:** a border marks a separate object. Problem cards and article cards are objects. Outcome themes, method steps, statements and fit lines are not, so they use rules and columns instead.

## 5. Breakpoints and responsive behavior

| Width | Behavior |
|---|---|
| ≥ 1100px | Method shows five steps in a row under the track |
| < 1100px | Method becomes a vertical list: numeral column + text |
| < 1024px | Problem cards 3 → 2 columns |
| < 1000px | Outcome themes 4 → 2 columns; evidence tiles 4 → 2; articles stack in one column (max 680px) |
| < 900px | Hero stacks (copy, then visual); primary navigation collapses to a Menu button with a disclosure panel; method intro and callout stack |
| < 800px | Statements stack; footer columns stack |
| < 620px | Problem cards 1 column |
| < 520px | Header Contact button moves into the menu; evidence tiles 1 column |

Nothing scrolls horizontally at 360px. Tap targets are at least 42px high (buttons 48px).

## 6. Components and the content model

Every block type in [`block.schema.json`](../website-architecture/data/schema/block.schema.json) has one component. Templates are built only from these.

| Block type | Component | Notes |
|---|---|---|
| `hero` | **Hero** (Home) / **Page header** (inner pages) | Home: eyebrow, H1 in two lines (second line in `--blue`), lead, sub, two CTAs, architectural visual with floating quote. Inner pages: eyebrow, H1, lead, no visual |
| `banner` | **Page header** | Legacy banners map here; background images become optional architectural crops |
| `carousel` | **Statement row** | Rendered as static pull statements with their prompt as a caption. **No auto-rotating carousel**, so everything is readable at rest and nothing moves without consent |
| `cards` | **Card grid** (bordered, icon tile) or **Theme columns** (unbordered) | Icon keys from the source (`alert`, `target`, `process`, `clock`, `search`, `lightning`) map to a single line-icon set |
| `steps` | **Method track** | Numbered because the content is a true sequence. Track line animates once on load; static under reduced motion |
| `callout` | **Outcome panel** | One surface panel, two columns, with the tag line beneath a rule |
| `fitlist` | **Fit list** | Check and cross marks with "A good fit / Not a fit" labels. Full list canonical on Expertise (D-14) |
| `stats` | **Evidence tiles** | Gated. A tile renders only when its Claim is `verified`; otherwise the whole band is hidden. Attribution line (D-04) shown beneath where it applies |
| `team` | **Leadership profile** | Photo, name, title, bio. A profile renders only when its Person is confirmed (D-07) |
| `cta` | **CTA band** (dark) or **Inline CTA pair** | Primary button + text link with arrow |
| `richtext` | **Article body** | Serif headings, 19px body, pull quotes, attribution line |
| `form` | **Inquiry form** | Approved D-12 field set; inline validation, real success and failure states (N-09) |
| `reference-list` | **Related reading** | Max 3 items (08) |

Global components: **Header** (sticky, translucent, logo + 4 links + Contact button), **Mobile menu**, **Footer** (brand line, Explore, Get in touch, legal bar with the Akhani LLC line), **Breadcrumbs** (inner pages, per 05), **Article card**, **Chip** (category, pending state), **Buttons** (primary, light-on-dark, text-with-arrow).

## 7. Page templates (to be designed in Step D after approval)

| Template | Pages | Built from |
|---|---|---|
| Home | `/` | Prototype in this folder |
| Landing | `/services`, `/industries`, `/insights` | Page header, card grid, method track, fit list, CTA |
| Detail | `/services/transformation-recovery`, `/industries/healthcare` | Page header, richtext, theme columns, related reading, CTA |
| Article | `/insights/{slug}` ×10 | Article header, article body, attribution, CTA pair, related reading |
| Listing | `/insights`, `/insights/case-studies` | Filters (type, topic, industry), article card grid |
| About | `/about-us` | Page header, story, values, leadership profiles (gated), Akhani LLC paragraph, CTA |
| Contact | `/contact-us` | Contact details, booking block, "What happens next", inquiry form |
| Utility | 404, Privacy, Accessibility, Terms | Page header, richtext |

## 8. Accessibility (target WCAG 2.2 AA)

- Text contrast checked against both themes; muted text meets 4.5:1 on paper and surface.
- Visible focus ring (2px, `--focus`) on every interactive element. Keyboard order follows reading order.
- Landmarks: one `header`, `nav` with labels, `main`, `footer`. One H1 per page; headings never skip a level for styling.
- Menu button uses `aria-expanded` and `aria-controls`. No hover-only content.
- Decorative SVGs are `aria-hidden`; the hero illustration has a text alternative.
- `prefers-reduced-motion` disables the track animation and all transitions.
- No carousel auto-rotation, no autoplaying media.
- Forms: visible labels, error text tied to fields, no placeholder-only labels.

## 9. Performance budget (production)

- Two font families, subset, `font-display: swap`, preconnect. No icon font (inline SVG).
- Largest Contentful Paint < 2.0s on 4G; CLS < 0.05; JS on Home < 15 KB (menu toggle only).
- Hero visual: SVG illustration (~3 KB) or a single responsive AVIF/WebP photograph < 120 KB at desktop width.
- Logo served as SVG in production (the supplied PNG is 500 KB; an SVG trace of the mark is needed, MS-08 below).

## 10. Editorial flags raised by the design (not applied)

These came up while laying out existing copy. None has been changed.

| ID | Location | Observation | Suggested |
|---|---|---|---|
| F-01 | Home sub (TT-PG-001-B02) | Spaced hyphen used as a dash: "transformation points - moments" | En or em dash. Typographic only |
| F-02 | Problem card "Hidden misalignment" | "pulling in different directions invisible until execution fails" reads as a missing dash | "…different directions, invisible until…" |
| F-03 | Method step 4 and step 5 | "Built so your team understands it not dependent on us"; "actually delivered then we make sure" read as missing punctuation | Add a dash or full stop |
| F-04 | Fit list line 2 | "bring clarity not simply validate" | "bring clarity, not simply validate" |
| F-05 | Hero eyebrow | "Business advisory & transformation" is new UI copy | Approve, change, or remove |
| F-06 | Outcome section heading | "What we help you achieve" comes from Concept 06 and is new copy | Approve with N-02 |
| F-07 | Article card title TT-INS-008 | "Look at the Handoffs - Not the Steps" has a spaced hyphen | En dash. Typographic only |

## 11. Open design decisions for you

1. **Hero visual:** the prototype uses an architectural blueprint illustration (ties to *Execution Blueprint*, costs nothing, no licensing). The alternative is licensed architectural photography, as in Concept 06. Either fits the system.
2. **Dark mode:** included and fully specified. Keep it for launch, or ship light-only first.
3. **Evidence band:** hidden until at least two results are verified, or shown as soon as one is.

## Missing sources for Phase 2

| ID | Item | Needed for |
|---|---|---|
| MS-02 | Concept 06 source file (the image in hand is a screenshot) | Fine detail of spacing and photography crops |
| MS-07 | Brand guidelines, if any | Confirms or replaces §2–3 |
| MS-08 | Vector (SVG/AI/EPS) logo | Sharp, light-weight logo in production |
| MS-09 | Leadership photography (consented) | About page profiles |
