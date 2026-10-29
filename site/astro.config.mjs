import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_MODE=public builds what visitors will see: gated claims and held items are removed,
// review flags are stripped, and pages are indexable. Any other value builds the review site.
const mode = process.env.SITE_MODE === 'public' ? 'public' : 'review';

export default defineConfig({
  site: 'https://www.techtranspire.com',
  outDir: mode === 'public' ? './dist-public' : './dist',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: mode === 'public' ? [sitemap()] : [],
  vite: {
    // Content and assets live in ../docs (Phase 1 archive), outside the Astro root.
    server: { fs: { allow: ['..'] } },
    define: { __SITE_MODE__: JSON.stringify(mode) },
  },
});
