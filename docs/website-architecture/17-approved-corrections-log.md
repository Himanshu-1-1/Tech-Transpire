# 17 — Approved Corrections Log

**Exact record of every change made to existing wording.** 2026-10-29.

The source archive is never edited. Corrections are applied at build time by [`site/src/lib/corrections.ts`](../../site/src/lib/corrections.ts), which fails the build unless each "Before" string occurs **exactly once** in its block. This log and that file must always match.

Approval basis:
- **D-11** (2026-10-29): E-01 to E-05 approved. The company confirmed the intended word for E-02 is "busywork".
- **D-24** (2026-10-29): TT-INS-003 publishes without the unverified C-14 sentence (E-09).
- **D-43** (2026-11-01): after the external review, the company approved the copy fixes ("Sound Familiar?", "high-stakes", punctuation) through this log, preserving meaning and brand voice, and replaced two unsupported Home claims with qualified wording. See **Applied 2026-11-01** below.
- **F-01 to F-07** (2026-10-29): approved *provided they are strictly punctuation, spelling or grammatical corrections that do not change the original meaning*. F-05 and F-06 are **not** punctuation (they are new copy), so this approval does not cover them; see below.

## Applied corrections

| ID | Block | Kind | Before (exact) | After (exact) |
|---|---|---|---|---|
| E-01 | TT-INS-002-B06 | Spelling | `rexactlyan reverting` | `rather than reverting` |
| E-02 | TT-INS-004-B02 | Spelling | `buil9work` | `busywork` |
| E-03 | TT-PG-004-B04 | Capitalization | `Kranthi Architects enterprise-grade` | `Kranthi architects enterprise-grade` |
| E-04a | TT-PG-004-B04 | Spelling | `TechTranspire's financial backbone` | `Tech Transpire's financial backbone` |
| E-04b | TT-INS-010-B10 | Spelling | `CTA: Talk to TechTranspire >` | `CTA: Talk to Tech Transpire >` |
| E-05 | TT-INS-001-B10 / B11 | Formatting | Card title "Poor preparation and no pilot" exported as a section heading after a dangling `process` icon key | Rendered as the fourth card of B10 (icon `process`). No words changed |
| E-10 | TT-PG-004-B04 | Content update (D-35, 2026-10-30) | `Mack brings over a decade of experience` | `Mack brings over two decades of experience` (the company asked for "two decade"; written grammatically). Also changes the Home founder intro, which quotes this sentence. C-10 now refers to "over two decades" |
| E-09 | TT-INS-003-B06 | Temporary omission | ` Twelve other programs subsequently replicated it.` | *(omitted)*. Restore when C-14 is verified |
| F-01 | TT-PG-001-B02 | Punctuation | `transformation points - moments` | `transformation points, moments` |
| F-02 | TT-PG-001-B03 | Punctuation | `different directions invisible` | `different directions, invisible` |
| F-03a | TT-PG-001-B05 | Punctuation | `understands it not dependent` | `understands it, not dependent` |
| F-03b | TT-PG-001-B05 | Punctuation | `actually delivered then we` | `actually delivered, then we` |
| F-04a | TT-PG-001-B07 | Punctuation | `bring clarity not simply` | `bring clarity, not simply` |
| F-04b | TT-PG-002-B06 | Punctuation | `bring clarity not simply` | `bring clarity, not simply` |
| F-07a | TT-INS-008-B01 | Punctuation | `Handoffs - Not the Steps` | `Handoffs — Not the Steps` |
| F-07b | TT-INS-008-B02 (heading) | Punctuation | `Handoffs - Not the Steps` | `Handoffs — Not the Steps` |
| F-07c | Insights Sheet, TT-INS-008 Title | Punctuation | `Handoffs - Not the Steps` | `Handoffs — Not the Steps` |

**Not changed:** the Microsoft Bookings URL contains `IntroCallwithTechTranspire`. It is a link target, not text, and stays exactly as it is.

### Why commas, not dashes (F-01 to F-04)

The design-review flags suggested dashes. The raw Google Doc export shows the pages' dashes were **deliberately removed** in the source documents: a double space remains where each dash was (for example `deep discovery &nbsp;understanding`, TT-PG-002). An earlier May 2026 draft has the dashes. Re-inserting them would reverse a choice someone made in the source. A comma is the smallest grammatical fix that keeps the meaning, so the page corrections use commas. Articles keep their own em-dash style, so F-07 uses an em dash.

### Withdrawn 2026-10-30

*Superseded 2026-11-01 (D-43): F-01 to F-04 and F-08 to F-13 are now applied; see below.* **F-01, F-02, F-03a, F-03b, F-04a and F-04b were withdrawn.** The company supplied the live homepage text and chose the **exact live wording**, character for character. These six entries were removed from `corrections.ts`; the site again shows, for example, "pulling in different directions invisible until execution fails". F-07 (article title dash) was not part of that text and remains applied. The same decision also settles F-08–F-13 below: **not applied** unless the company asks again.

Also from the live text (2026-10-30): the hero line is **"Clarity. Alignment. Execution."** (full stops), and the fit-list headings are **"This is for you if"** / **"We may not be the right fit for you if"**. These replace the build's own labels. The carousel prompt "Want to learn more?" is restored as a link to Our Method. "$3M+ Revenue impact…" stays withdrawn (D-05).

## Not covered by the F approval (still open)

| ID | Item | Why it is not a correction | Status |
|---|---|---|---|
| F-05 | Hero eyebrow | "Clarity · Alignment · Execution", the company's own lockup line | ✅ **Approved 2026-10-29** as supporting messaging (D-29) |
| F-06 | "What we help you achieve" (Home outcome themes heading) | New copy, from the Concept 06 reference | 🟦 approve with N-02 |

## Found during the build (applied 2026-11-01 under D-43; kept for the record)

| ID | Location | Existing wording | Suggested | Kind |
|---|---|---|---|---|
| F-08 | TT-PG-001-B02 | "high-stake transformation points" | "high-stakes transformation points" | Grammar |
| F-09 | TT-PG-001-B01 | "Solving the wrong problem perfectly, is still a failure." | "Solving the wrong problem perfectly is still a failure." | Punctuation (stray comma) |
| F-10 | TT-PG-001-B08 | "Reduction in median implementation time 209 days to 78 in one engagement" | "…implementation time, 209 days to 78, in one engagement" | Punctuation (only shown once C-05 is verified) |
| F-11 | TT-PG-004-B03 / B05 | "We don't treat symptoms we find root causes"; "We don't validate ideas we validate reality"; "independent not dependent on us"; "complete openness especially when" | Commas after "symptoms", "ideas", "independent", "openness" | Punctuation (dash-removal artifacts, same pattern as F-02 to F-04) |
| F-12 | TT-PG-002-B03, B04, B05 | "deep discovery understanding your business model"; "real-world implementation not a slide deck"; "operating independently not when"; "Transformation Blueprint current to future state"; "only when tied to clear outcomes" | Commas at each removed dash | Punctuation (same pattern) |
| F-13 | TT-PG-005-B04 | "If aligned - Clear next steps"; "If not - Honest redirect" | "If aligned: clear next steps"; "If not: honest redirect" | Punctuation and capitalization |

## Applied 2026-11-01 (D-43)

Approved by the company after the external review: "Approved. Apply 'Sound Familiar?', 'high-stakes', and punctuation corrections through the corrections log. Preserve the intended meaning and brand voice." The two content updates replace claims the review flagged as unsupported, in the company's own wording.

| ID | Block | Kind | Before (exact) | After (exact) |
|---|---|---|---|---|
| H-01a | TT-PG-001-B01 | Content update | `Most transformation budgets are wasted before the first line of code is written.` | `Transformation budgets can be wasted before the first line of code is written.` |
| H-01b | TT-PG-001-B03 | Content update | `By then, the cost of fixing it is three times what it would have been upfront.` | `By then, resolving the misalignment can be significantly more expensive than addressing it upfront.` |
| F-14 | TT-PG-001-B01 | Grammar | `Sounds Familiar?` | `Sound Familiar?` |
| F-08 | TT-PG-001-B02 | Grammar | `high-stake transformation` | `high-stakes transformation` |
| F-01 | TT-PG-001-B02 | Punctuation | `transformation points - moments` | `transformation points, moments` |
| F-09 | TT-PG-001-B01 | Punctuation | `perfectly, is still a failure` | `perfectly is still a failure` |
| F-02 | TT-PG-001-B03 | Punctuation | `different directions invisible` | `different directions, invisible` |
| F-03a | TT-PG-001-B05 | Punctuation | `understands it not dependent` | `understands it, not dependent` |
| F-03b | TT-PG-001-B05 | Punctuation | `actually delivered then we` | `actually delivered, then we` |
| F-04a | TT-PG-001-B07 | Punctuation | `bring clarity not simply` | `bring clarity, not simply` |
| F-04b | TT-PG-002-B06 | Punctuation | `bring clarity not simply` | `bring clarity, not simply` |
| F-10 | TT-PG-001-B08 | Punctuation | `implementation time 209 days to 78 in one engagement` | `implementation time, 209 days to 78, in one engagement` (shown only once C-05 is verified) |
| F-11a | TT-PG-004-B03 | Punctuation | `treat symptoms we find` | `treat symptoms, we find` |
| F-11b | TT-PG-004-B05 | Punctuation | `validate ideas we validate` | `validate ideas, we validate` |
| F-11c | TT-PG-004-B05 | Punctuation | `independent not dependent on us` | `independent, not dependent on us` |
| F-11d | TT-PG-004-B03 | Punctuation | `complete openness especially when` | `complete openness, especially when` |
| F-12a | TT-PG-002-B03 | Punctuation | `deep discovery understanding` | `deep discovery, understanding` |
| F-12b | TT-PG-002-B04 | Punctuation | `implementation not a slide deck` | `implementation, not a slide deck` |
| F-12c | TT-PG-002-B04 | Punctuation | `operating independently not when` | `operating independently, not when` |
| F-12d | TT-PG-002-B05 | Punctuation | `Transformation Blueprint current to future state` | `Transformation Blueprint, current to future state` |
| F-12e | TT-PG-002-B05 | Punctuation | `augmentation only when tied` | `augmentation, only when tied` |
| F-13a | TT-PG-005-B04 | Punctuation, capitalization | `If aligned - Clear next steps` | `If aligned: clear next steps` |
| F-13b | TT-PG-005-B04 | Punctuation, capitalization | `If not - Honest redirect` | `If not: honest redirect` |

**New copy (not a correction):** Services, signature offer panel, under the "6-8 weeks" tag: "The 6–8 weeks covers discovery and the execution blueprint. Discovery typically takes 2–6 weeks within that period, depending on complexity and stakeholder availability. Guided implementation is scoped separately based on the approved blueprint." The company's definition (D-43). C-15 is verified, so the timeframe tags now appear in the public build.
