import type { ImageMetadata } from 'astro';

type Mod = { default: ImageMetadata };

// Archived originals (TT-AS-001 … 017) and logo files.
const archive = import.meta.glob<Mod>('../../../docs/website-architecture/source-archive/assets/*.{png,jpg}', { eager: true });
const logos = import.meta.glob<Mod>('../../../docs/website-architecture/source-archive/assets/logo/*.png', { eager: true });
// Company photography supplied for Phase 2 (see docs/phase-2-design/assets/README.md).
const photos = import.meta.glob<Mod>('../../../docs/phase-2-design/assets/*.{png,jpg,jpeg,webp}', { eager: true });

export function asset(id: string): ImageMetadata {
  const key = Object.keys(archive).find((k) => /\/(TT-AS-\d{3})\.\w+$/.exec(k)?.[1] === id);
  if (!key) throw new Error(`Unknown asset ${id}`);
  return archive[key].default;
}

// Best available original logo (TT-AS-019, no background). Replace with the vector master when supplied.
export const logo: ImageMetadata = Object.entries(logos).find(([k]) => k.endsWith('tech-transpire-logo-no-bg.png'))![1].default;

export function photo(nameFragment: string): ImageMetadata | undefined {
  const key = Object.keys(photos).find((k) => k.toLowerCase().includes(nameFragment.toLowerCase()));
  return key ? photos[key].default : undefined;
}
