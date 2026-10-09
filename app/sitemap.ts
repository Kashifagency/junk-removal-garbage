import type { MetadataRoute } from 'next';
import { absoluteUrl, categoriesInUse, categoryData, pages, paginate, posts } from '@/lib/content';
import { TOPICS } from '@/lib/topics';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const p of pages) {
    if (p.path === '/blogs/') continue; // duplicate of /blog/ (canonical points there)
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
  for (const t of TOPICS) {
    const list = posts.filter((p) => p.topic === t.slug);
    if (list.length >= 3) entries.push({ url: absoluteUrl(`/blog/topic/${t.slug}/`), lastModified: list[0].modified, changeFrequency: "weekly", priority: 0.5 });
  }
  // Paginated archives (/blog/page/2/ …) are crawlable via links; listing them is optional.
  const blogPages = paginate(posts, 1).totalPages;
  for (let n = 2; n <= blogPages; n++) entries.push({ url: absoluteUrl(`/blog/page/${n}/`), priority: 0.3 });
  return entries;
}
