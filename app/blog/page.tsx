import { PostIndex } from '@/components/templates/PostIndex';
import { getPosts, pageSeoFor } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';

// ISR: re-render daily (fallback; the /api/revalidate cron refreshes at Dubai midnight) so scheduled (future-dated) posts go live without a redeploy (lib/publish.ts).
export const revalidate = 86400;

const seo = pageSeoFor('/blog/', { title: 'Blog', description: '' });

export function generateMetadata() {
  return buildMetadata({ ...seo, path: '/blog/' });
}

export default function BlogPage() {
  return <PostIndex base="/blog/" page={1} list={getPosts()} title="Junk Removal Blog" eyebrow="Guides & tips" intro={seo.description} crumb="Blog" hubs />;
}
