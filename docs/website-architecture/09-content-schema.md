# 09 — Content Schema

Logical, CMS-agnostic models for the rebuilt site. The same models are provided as JSON Schema (draft 2020-12) in [`data/schema/`](data/schema/), one file per entity, so they can be used by a static site generator, a Git-based CMS, or a headless CMS (see [11](11-technical-architecture.md)).

Conventions: `id` values are stable and never reused · slugs are lowercase-hyphenated (`^[a-z0-9]+(-[a-z0-9]+)*$`) · dates are ISO 8601 · references are by `id`.

---

## 0. Provenance (on every content entity)

Every content entity carries these fields (Claim, NavigationItem and Redirect carry their own source fields instead), so it is always possible to trace published text back to the original site.

| Field | Type | Req. | Notes |
|---|---|---|---|
| `source_block_ids` | string[] | yes (may be empty for new content) | Block IDs from [`data/content-blocks.json`](data/content-blocks.json), e.g. `TT-PG-002-B05` |
| `preservation_status` | enum | yes | `preserved-verbatim` · `edited-approved` · `new-pending` · `new-approved`. Only `preserved-verbatim`, `edited-approved` and `new-approved` may be published. |
| `change_record` | object[] | if edited | `{ date, field, previous_text, new_text, approved_by, decision_id }` — e.g. `E-01`, `D-04` |
| `approved_by` | string | to publish | Name or role |
| `updated_at` | date-time | yes | |

## 1. Page — [`page.schema.json`](data/schema/page.schema.json)

| Field | Type | Req. | Notes / validation |
|---|---|---|---|
| `id` | string | yes | `TT-PG-###` existing, `TT-PGN-###` new |
| `slug` | string | yes | Full path, e.g. `/services`; unique |
| `title` | string | yes | Page H1 |
| `nav_label` | string | no | e.g. "Expertise" for `/services` (D-22) |
| `parent_id` | ref Page | no | Drives breadcrumbs |
| `page_type` | enum | yes | `home` · `landing` · `capability` · `industry` · `insight-index` · `insight-listing` · `about` · `contact` · `legal` · `system` |
| `seo` | object | yes | `meta_title` (≤ 60 chars), `meta_description` (70–160), `canonical`, `robots` (`index,follow` default), `og_image` (ref Asset) |
| `sections` | Block[] | yes | Ordered |
| `status` | enum | yes | `draft` · `in-review` · `published` · `retired` |
| `priority` | enum | yes | `P0` · `P1` · `P2` |
| `legacy_urls` | string[] | no | Feeds the redirect table |

## 2. Block (section) — [`block.schema.json`](data/schema/block.schema.json)

Block types mirror the block markers already used in the source Google Docs, so existing content migrates one-to-one. This is a content shape, not a visual design.

| `type` | Fields | Existing examples |
|---|---|---|
| `banner` | `headline`, `subtext`, `background` (Asset) | TT-PG-001-B02 |
| `carousel` | `items[] { text, attribution }` | TT-PG-001-B01, TT-PG-004-B05 |
| `cards` | `heading?`, `items[] { icon_key, title, body }` | TT-PG-001-B03 |
| `hero` | `headline`, `subtext` | TT-PG-001-B04 |
| `steps` | `heading?`, `items[] { title, body }` | TT-PG-002-B04 |
| `callout` | `title`, `heading`, `body`, `tag` | TT-PG-001-B06 |
| `fitlist` | `heading?`, `items[] { fit: yes/no, text }` | TT-PG-002-B06 |
| `stats` | `heading?`, `claim_ids[]` (ref Claim) | TT-PG-001-B08 |
| `team` | `heading?`, `person_ids[]` | TT-PG-004-B04 |
| `cta` | `primary { label, target }`, `secondary?` | TT-PG-001-B09 |
| `richtext` | `heading?`, `body` (portable rich text / Markdown) | TT-PG-004-B02 |
| `form` | `form_id` (ref ConversionAction) | TT-PG-005-B05 |
| `reference-list` | `source` (`insights` / `capabilities` / `industries`), `filter`, `limit` (≤ 3 for related) | New, for related-content |

Common fields: `block_id`, `anchor` (optional), and the provenance fields. `icon_key` keeps the source's icon words (alert, target, process…); how they are drawn is decided in Phase 2.

## 3. Capability (Expertise) — [`capability.schema.json`](data/schema/capability.schema.json)

| Field | Type | Req. | Notes |
|---|---|---|---|
| `id` | string | yes | `CAP-01` … `CAP-06` |
| `name` | string | yes | Existing component title, e.g. "Clarity & Discovery" |
| `slug` | string | yes | |
| `summary` | string | yes | Existing card body verbatim |
| `aliases` | string[] | no | Brief names (08 §4), used for search synonyms and metadata only |
| `has_detail_page` | boolean | yes | `false` unless approved (D-02) |
| `challenges` | ref Challenge[] | no | With `basis` |
| `outcome_themes` | ref OutcomeTheme[] | no | |
| `engagement_types` | ref EngagementType[] | no | |
| `related_industries`, `related_insights`, `related_capabilities` | refs | no | Each relation `{ id, basis }` |
| `original_source` | string | yes | e.g. `TT-PG-002-B05` |

## 4. EngagementType — [`engagement-type.schema.json`](data/schema/engagement-type.schema.json)

`id` (`ENG-01…04`) · `name` · `body` (verbatim) · `order` · `entry_point` (boolean — Discovery and Transformation Recovery are entry points) · `typical_duration` (text, from source only, e.g. "2 to 6 weeks") · `capabilities[]` · provenance.

## 5. Challenge — [`challenge.schema.json`](data/schema/challenge.schema.json)

`id` (`CHL-01…09`) · `title` · `body` · `icon_key` · `capabilities[] { id, basis }` · provenance.

## 6. Industry — [`industry.schema.json`](data/schema/industry.schema.json)

| Field | Type | Req. | Notes |
|---|---|---|---|
| `id`, `name`, `slug` | string | yes | |
| `evidence_level` | enum | yes | `evidenced` (may have page) · `selected-experience` (landing mention only) |
| `approved_description` | richtext | for page | New content — `new-pending` until approved (N-05) |
| `verified_experience` | ref Insight[] | yes | Minimum 2 for `evidenced` |
| `operating_considerations` | string[] | no | Only from source (e.g. "CMS compliance" in TT-INS-002/003) |
| `related_capabilities`, `related_resources` | refs | no | |
| `has_detail_page` | boolean | yes | |

## 7. Insight — [`insight.schema.json`](data/schema/insight.schema.json)

| Field | Type | Req. | Notes |
|---|---|---|---|
| `id` | string | yes | `TT-INS-###` |
| `slug` | string | yes | From listing title (see [10](10-seo-url-plan.md)) |
| `listing_title` | string | yes | Sheet title — card and SEO title (D-09) |
| `h1` | string | yes | Doc headline — page H1 (D-09) |
| `excerpt` | string | yes | Sheet excerpt, verbatim |
| `subtitle` | string | no | Doc banner subtext |
| `content_type` | enum | yes | `perspective` · `case-study` · `guide` · `whitepaper` |
| `legacy_category` | enum | yes | `Case Study` · `Execution` · `Transformation` — kept for traceability |
| `topics` | string[] | no | Controlled list, max 3 (e.g. Kaizen, Value stream mapping, Supply chain, Stalled initiatives, Capability transfer). Source tag lines (e.g. "Kaizen · PDCA · …") are kept verbatim in `source_tags` |
| `capabilities` | ref[] | no | Max 2 primary (08 §5) |
| `industries` | ref[] | no | Max 1 primary |
| `outcome_themes` | ref[] | no | |
| `author_id` | ref Person | yes | |
| `attribution_note` | string | no | e.g. "Engagement led by Mack Akhani prior to founding Tech Transpire." (D-04) |
| `published_at`, `updated_at` | date | yes / no | Sheet dates converted (E-08) |
| `read_time_minutes` | integer | no | From Sheet |
| `body` | Block[] | yes | Same block types as pages |
| `cover` | ref Asset | no | |
| `attachments` | ref Asset[] | no | For whitepapers |
| `claim_ids` | ref Claim[] | no | Stats used in the body |
| `related` | `{ id, basis }[]` | no | Max 3; related-evidence pair (08 §3.5) first |
| `seo` | object | yes | As Page |
| `legacy_source` | object | yes | `{ doc_id, sheet_row, sheet_id }` |
| `status` | enum | yes | `draft` · `published` · `retired` |

## 8. Person — [`person.schema.json`](data/schema/person.schema.json)

`id` · `name` · `approved_title` (verbatim) · `biography` (verbatim) · `credentials[]` (each a Claim ref, e.g. C-11, C-12) · `headshot` (Asset) · `linkedin_url` · `capabilities[] { id, basis }` · `is_author` · `show_on_about` (boolean) · `publication_approval { approved, approved_by, date }` — a profile may not render without the person's own approval · provenance.

## 9. OutcomeTheme — [`outcome-theme.schema.json`](data/schema/outcome-theme.schema.json)

`id` (`OUT-01…04`) · `name` · `description` (new content, `new-pending`, N-02) · `capabilities[]` · `supporting_proof[]` (Insight or Claim refs) · provenance.

## 10. Claim / evidence — [`claim.schema.json`](data/schema/claim.schema.json)

Stops unverified numbers from being published.

| Field | Type | Req. | Notes |
|---|---|---|---|
| `claim_id` | string | yes | `C-01` … |
| `value` | string | yes | e.g. "$89M" |
| `label` | string | yes | Exact wording |
| `source_block_ids` | string[] | yes | Where it appears |
| `substantiated_by` | ref Insight | no | |
| `attribution` | enum | yes | `tech-transpire` · `founder-prior-experience` · `individual` |
| `verification_status` | enum | yes | `unverified` · `verified` · `rejected` — **only `verified` renders** |
| `verified_by`, `verified_at`, `evidence_note` | | when verified | |

## 11. Testimonial / client story consent — [`testimonial.schema.json`](data/schema/testimonial.schema.json)

`id` · `source` (where it came from) · `consent_status` (`none` · `requested` · `granted` · `withdrawn`) · `consent_record` (reference to the written consent) · `client_attribution` (`named` · `anonymised` · `role-only`) · `approved_wording` · `publication_approval` · `capabilities[]` · `industries[]` · `outcome_evidence[]` (Claim refs). Renders only when `consent_status = granted`. No testimonials exist today (MS-08); case studies are anonymised and use `client_attribution = anonymised`.

## 12. Asset — [`asset.schema.json`](data/schema/asset.schema.json)

`asset_id` (`TT-AS-###`, from [`data/assets.csv`](data/assets.csv)) · `original_filename` · `file_type` · `original_url` / Drive ID · `archived_copy` (path in `source-archive/assets/`) · `usage_rights` (`owned` · `licensed` · `unconfirmed`) · `alt_text` · `alt_text_source` (`new-pending` until approved — none exist, G-02) · `decorative` (boolean) · `related_pages[]` · `migration_status` (`pending` · `migrated` · `replaced` · `retired`).

## 13. NavigationItem — [`navigation-item.schema.json`](data/schema/navigation-item.schema.json)

`id` · `menu` (`primary` · `footer` · `utility`) · `label` · `target` (Page ref or URL) · `order` · `children[]` · `visible_from` (date, for staged launch of D-06).

## 14. SiteSettings / business configuration — [`site-settings.schema.json`](data/schema/site-settings.schema.json)

Single record so business facts are edited in one place: `site_name` ("Tech Transpire") · `tagline` (D-01) · `legal_entity_line` (D-08) · `email` (`info@techtranspire.com`) · `phone` (`+1 (979) 479-2779`, E.164 `+19794792779`) · `linkedin_url` · `booking_url` (Microsoft Bookings) · `response_promise` ("within one business day", C-17) · `default_seo` · `analytics` (provider IDs, consent mode) · `canonical_host` (`https://www.techtranspire.com`).

## 15. ConversionAction / form — [`conversion-action.schema.json`](data/schema/conversion-action.schema.json)

| Field | Notes |
|---|---|
| `id`, `name` | e.g. `CONV-01 Book intro call`, `CONV-02 Send message` |
| `type` | `booking-link` · `form` · `email` · `phone` |
| `audience`, `motivation` | From [03](03-audience-and-objectives.md) |
| `fields[]` | `{ name, label, type, required, options[], validation, max_length, crm_field }`. The approved field set is in [06 §10](06-page-blueprints.md#10-contact) |
| `area_of_interest_options[]` | `{ value, label, basis_block, crm_value }`. Options derive from the existing engagement types, TT-PG-002-B04 (D-12) |
| `consent` | `{ text, privacy_policy_ref, required }` |
| `destinations[]` | `{ role: primary / notification / fallback, kind: zoho-crm / email / webhook, target }`. Approved: primary = Zoho CRM Leads, notification = email to info@techtranspire.com (D-16). Credentials are never stored in content |
| `states` | `{ success_message, error_message, validation_messages }`. Success is shown **only** on confirmed delivery (fixes T8) |
| `spam_protection` | honeypot / min-submit-time / rate limit / challenge |
| `tracking_event` | `{ name, parameters }`, e.g. `generate_lead { area_of_interest, page }`. No personal data in events |

## 16. Redirect — [`redirect.schema.json`](data/schema/redirect.schema.json)

`from` (path) · `to` (path or URL) · `status` (`301` · `308` · `410`) · `reason` · `source_ref` (inventory ID) · `verified_at`.
