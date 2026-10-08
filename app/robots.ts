import type { MetadataRoute } from 'next';
import { site } from '@/lib/content';

export default function robots(): MetadataRoute.Robots {
  // Keep Vercel preview deployments out of search engines (VERCEL_ENV is set by Vercel automatically).
  const isPreview = process.env.VERCEL_ENV !== undefined && process.env.VERCEL_ENV !== 'production';
  if (isPreview) return { rules: [{ userAgent: '*', disallow: '/' }] };
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
