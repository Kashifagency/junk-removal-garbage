import { absoluteUrl, posts, site } from '@/lib/content';

export const dynamic = 'force-static';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// RSS 2.0 feed at /feed/ (same URL WordPress used).
export function GET() {
  const items = posts
    .slice(0, 20)
    .map(
      (p) => `<item>
  <title>${esc(p.title)}</title>
  <link>${absoluteUrl(p.path)}</link>
  <guid isPermaLink="true">${absoluteUrl(p.path)}</guid>
  <pubDate>${new Date(p.date).toUTCString()}</pubDate>
  ${p.categories.map((c) => `<category>${esc(c.name)}</category>`).join('')}
  <description>${esc(p.excerpt)}</description>
</item>`,
    )
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${esc(site.name)} – Blog</title>
  <link>${site.url}/</link>
  <atom:link href="${absoluteUrl('/feed/')}" rel="self" type="application/rss+xml" />
  <description>Junk removal tips and guides for Dubai</description>
  <language>en</language>
  <lastBuildDate>${new Date(posts[0].modified).toUTCString()}</lastBuildDate>
${items}
</channel>
</rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
