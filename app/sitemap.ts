import type { MetadataRoute } from 'next';
import { absoluteUrl, categoriesInUse, categoryData, pages, paginate, posts } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const p of pages) {
    entries.push({
      url: absoluteUrl(p.path),
      lastModified: p.modified,
      changeFrequency: p.path === '/' ? 'weekly' : 'monthly',
      priority: p.path === '/' ? 1 : p.path.startsWith('/services/') ? 0.9 : 0.7,
      images: p.featuredImage ? [absoluteUrl(p.featuredImage.src)] : undefined,
    });
  }
  for (const p of posts) {
    entries.push({
      url: absoluteUrl(p.path),
      lastModified: p.modified,
      changeFrequency: 'monthly',
      priority: 0.6,
      images: p.featuredImage ? [absoluteUrl(p.featuredImage.src)] : undefined,
    });
  }
  for (const c of categoriesInUse()) {
    entries.push({ url: absoluteUrl(`/category/${c.slug}/`), lastModified: categoryData(c.slug)!.list[0]?.modified, priority: 0.4 });
  }
  // Paginated archives (/blog/page/2/ …) are crawlable via links; listing them is optional.
  const blogPages = paginate(posts, 1).totalPages;
  for (let n = 2; n <= blogPages; n++) entries.push({ url: absoluteUrl(`/blog/page/${n}/`), priority: 0.3 });
  return entries;
}
