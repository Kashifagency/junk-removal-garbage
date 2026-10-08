import type { MetadataRoute } from 'next';
import { site } from '@/lib/content';

export default function robots(): MetadataRoute.Robots {
  // Keep Vercel preview deployments (and anything flagged NEXT_PUBLIC_NOINDEX) out of search engines.
  const isPreview = process.env.VERCEL_ENV !== undefined && process.env.VERCEL_ENV !== 'production';
  if (isPreview || process.env.NEXT_PUBLIC_NOINDEX === 'true') return { rules: [{ userAgent: '*', disallow: '/' }] };
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
