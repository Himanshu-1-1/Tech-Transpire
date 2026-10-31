import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';
import { readFileSync } from 'node:fs';

// SITE_MODE=public builds what visitors will see: gated claims and held items are removed,
// review flags are stripped, and pages are indexable. Any other value builds the review site.
const mode = process.env.SITE_MODE === 'public' ? 'public' : 'review';

// Is any case study publishable? Mirrors src/lib/claims.ts so redirects never target a missing page.
const pub = JSON.parse(readFileSync(new URL('./src/data/publication.json', import.meta.url), 'utf8'));
const publishable = (id) => {
  const covered = new Set(pub.omissions?.[id]?.covers ?? []);
  return (pub.articles[id] ?? []).every((c) => covered.has(c) || pub.claims[c]?.status === 'verified');
};
const caseStudies = mode === 'review' || pub.caseStudies.some(publishable) ? '/insights/case-studies' : '/insights';

// Path redirects from the Phase 1 map (docs/website-architecture/data/redirects.csv).
// Trailing-slash, apex-domain and http→https rules are host configuration (see 02 TDR).
const csv = readFileSync(new URL('../docs/website-architecture/data/redirects.csv', import.meta.url), 'utf8').trim().split(/\r?\n/).slice(1);
const redirects = Object.fromEntries(
  csv
    .map((line) => line.split(','))
    .filter(([source, , action, , target]) => action === 'redirect' && source.startsWith('/') && !source.endsWith('/') && target.startsWith('/'))
    .map(([source, , , , target]) => [source, { status: 301, destination: target === '/insights/case-studies' ? caseStudies : target }]),
);

// PAGES=1 builds a static review preview for GitHub Pages, served under /Tech-Transpire/.
// No server there: the contact form shows its honest failure message. Root-relative links are
// prefixed after the build by scripts/pages-base.mjs.
const pages = process.env.PAGES === '1';
const PAGES_BASE = '/Tech-Transpire';

// The contact endpoint exists only where a server runs (src/server/inquiry-route.ts).
const inquiryRoute = {
  name: 'inquiry-route',
  hooks: {
    'astro:config:setup': ({ injectRoute }) => injectRoute({ pattern: '/api/inquiry', entrypoint: './src/server/inquiry-route.ts', prerender: false }),
  },
};

export default defineConfig({
  site: pages ? 'https://himanshu-1-1.github.io' : 'https://www.techtranspire.com',
  base: pages ? PAGES_BASE : undefined,
  trailingSlash: 'never',
  // Directory output (contact-us/index.html) so any static host or the Node server resolves
  // /contact-us without a trailing slash. Canonical URLs are unchanged.
  build: { format: 'directory' },
  outDir: pages ? './dist-pages' : mode === 'public' ? './dist-public' : './dist',
  // Static pages plus one server route (/api/inquiry). The Node adapter runs on any Node host;
  // swap for @astrojs/netlify or @astrojs/vercel once hosting is chosen (D-16).
  adapter: pages ? undefined : node({ mode: 'standalone' }),
  redirects,
  integrations: [
    ...(pages ? [] : [inquiryRoute]),
    ...(mode === 'public' && !pages ? [sitemap({ filter: (page) => !page.includes('/api/') })] : []),
  ],
  vite: {
    // Content and assets live in ../docs (Phase 1 archive), outside the Astro root.
    server: { fs: { allow: ['..'] } },
    define: { __SITE_MODE__: JSON.stringify(mode), __REVIEW_MARKERS__: JSON.stringify(process.env.REVIEW_MARKERS === '1'), __PAGES__: JSON.stringify(pages) },
  },
});
