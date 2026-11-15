import { PostIndex } from '@/components/templates/PostIndex';
import { getPosts, pageSeoFor } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';

// ISR: re-render daily (fallback; the /api/revalidate cron refreshes at Dubai midnight) so scheduled (future-dated) posts go live without a redeploy (lib/publish.ts).
export const revalidate = 86400;

const seo = pageSeoFor('/blogs/', { title: 'Blogs', description: '' });

export function generateMetadata() {
  // /blogs/ lists the same articles as /blog/, so /blog/ is the canonical version.
  return buildMetadata({ ...seo, path: '/blogs/', canonical: '/blog/' });
}

export default function BlogsPage() {
  return <PostIndex base="/blogs/" page={1} list={getPosts()} title="Blogs" eyebrow="Articles" intro={seo.description} crumb="Blogs" hubs />;
}
