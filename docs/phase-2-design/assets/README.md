# Phase 2 photography

Put company-owned or properly licensed photography here, **keeping the original filenames**. The site picks the files up automatically at build time and removes the "pending" placeholders.

## In use

| File | Supplied | Used for | Rights |
|---|---|---|---|
| `Hero section.jpg` (1280×720) | Saved by the company, 2026-10-30 (the Drive "Executive Lounge Meeting Overlooking the City" scene) | **Home hero** since 2026-10-30, anchored right (`--hero-pos: 100% 50%`) so all four people show; method chips moved into the sky | **Unconfirmed**: confirm ownership or licence before production (TT-AS-026). A higher-resolution copy (≥ 1920px wide) would look sharper on large screens |
| `hero-glass-office-skyline.png` (1672×941) | By the company in chat, 2026-10-29 | Backup hero: used only if no "hero section"/"lounge" photo is present | **Unconfirmed**: confirm ownership or licence before production (`assets.csv` TT-AS-024) |
| `Mack Akhani.png` (1024×1536) | By the company in chat, 2026-10-30, as "the Mack Akhani image" | **Home "Built from experience"** (focal 50% 16%) and **About team tile** (focal 62% 20%, zoom 1.6) | Company-approved for use (D-33). Confirm ownership/licence before production (TT-AS-025) |
| `Kranthi Kumar Goli.png` (1024×1536) | By the company in chat, 2026-11-01, as "goli photo" | **About team tile** (focal 62% 18%), replacing the initials placeholder | Supplied as his photo; replaces the AI-generated archive image TT-AS-005, which stays unused. Confirm ownership/licence before production (TT-AS-027) |
| `Devjet Bag.png` (1083×1452) | By the company in chat, 2026-11-01, as "devjet photo" | **About team tile** (focal 50% 24%), replacing the initials placeholder | Supplied as his photo; replaces the AI-generated archive image TT-AS-006, which stays unused. Confirm ownership/licence before production (TT-AS-028) |
| `Hemang Dwivedi.png` (1254×1254) | By the company in chat, 2026-11-01, as "hemang" | **About team tile** (focal 46% 30%), replacing the Drive headshot TT-AS-004 | Confirm ownership/licence before production (TT-AS-029) |
| `Wally Potts.png` (1254×1254) | By the company in chat, 2026-11-01, with his resume and bio sheet | **About advisor card** for Dr. Wally Potts (focal 52% 30%), replacing the initials | Matches the portrait on his own bio sheet; the office backdrop with the Tech Transpire sign looks generated. Confirm his consent and ownership/licence before production (TT-AS-030) |
| `Sanket Thakkar.png` (1254×1254) | By the company in chat, 2026-11-01, as "sanket" | **About advisor card** for Sanket Thakkar (focal 50% 34%), replacing the initials | The office backdrop with the Tech Transpire sign looks generated. Confirm his consent and ownership/licence before production (TT-AS-031) |

## Still requested

| File (exact name) | Drive location | Drive ID | Used for |
|---|---|---|---|
| `Executive Meeting Above the Skyline.png` | 202610 Tech Transpire Re-Write non image content | `1Ja0WokRhMG60uzJjqp3AQ3M7YKXGjxg7` | Optional now (the hero has a photo). If added, remove or rename the current hero file so only one "skyline" image remains |
| `Executive Lounge Meeting Overlooking the City.png` | same folder | `1f_xVQoIMsF3IwZbTGYN92nEjEvFc-sqo` | Home closing conversation band |

**Why these are not downloaded automatically:** the files require sign-in. The Drive connector can only share with named accounts, and it cannot remove a permission afterwards, so no sharing was changed (2026-10-29). Download each from Drive and save it into this folder.

## Rules (D-30)

- Leadership portraits must be labelled originals of the real person. AI-generated portraits are not used unless separately approved. The archived TT-AS-003 (Mack), TT-AS-005 (Kranthi) and TT-AS-006 (Devjet) are AI-generated ("ChatGPT Image…", "Gemini_Generated_Image…") and are therefore not shown.
- For each file, confirm ownership or a web-use licence. Record it in `docs/website-architecture/data/assets.csv` (`usage_rights`) before production.
- Do not use images with baked-in website text or controls.
