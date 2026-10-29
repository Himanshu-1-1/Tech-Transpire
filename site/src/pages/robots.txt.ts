import type { APIRoute } from 'astro';
import { isReview } from '../lib/site';

// The review build must never be indexed; the public build points crawlers at the sitemap.
export const GET: APIRoute = ({ site }) =>
  new Response(
    isReview ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site)}\n`,
    { headers: { 'Content-Type': 'text/plain' } },
  );
