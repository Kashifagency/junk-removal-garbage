import type { NextConfig } from 'next';
import posts from './content/posts.json' with { type: 'json' };
import { redirectPlan } from './scripts/lib/redirect-plan.mjs';

// Redirects that keep old WordPress URLs working after the move to Vercel.
async function redirects() {
  const list = [
    // Old post slugs WordPress auto-redirected (_wp_old_slug).
    ...posts.flatMap((p) => p.oldSlugs.map((old) => ({ source: `/${old}/`, destination: p.path, permanent: true }))),
    // URLs linked from post content that never existed as pages.
    { source: '/contact-us/', destination: '/contact/', permanent: true },
    { source: '/office-clearance-dubai/', destination: '/services/commercial-waste-management/', permanent: true },
    // WordPress pagination page 1 aliases.
    { source: '/blog/page/1/', destination: '/blog/', permanent: true },
    { source: '/blogs/page/1/', destination: '/blogs/', permanent: true },
    // WordPress RSS aliases.
    { source: '/rss/', destination: '/feed/', permanent: true },
    { source: '/blog/feed/', destination: '/feed/', permanent: true },
    // All in One SEO sitemap index/sub-sitemaps -> single Next.js sitemap.
    ...['sitemap_index.xml', 'post-sitemap.xml', 'page-sitemap.xml', 'category-sitemap.xml', 'post_tag-sitemap.xml', 'sitemap.rss'].map((f) => ({ source: '/' + f, destination: '/sitemap.xml', permanent: true })),
  ];
  // Content consolidation: merged legacy posts (content/redirects.json + article "redirectFrom").
  list.push(...redirectPlan().redirects.map((r) => ({ ...r, permanent: true })));
  // Plain permalinks (?p=ID / ?page_id=ID) are handled in proxy.ts.
  return list;
}

const nextConfig: NextConfig = {
  // WordPress URLs all end with a slash; keep them identical.
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  redirects,
  async headers() {
    return [
      {
        source: '/wp-content/uploads/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ];
  },
};

export default nextConfig;
