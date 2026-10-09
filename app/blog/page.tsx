import { PostIndex } from '@/components/templates/PostIndex';
import { pageSeoFor, posts } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';

const seo = pageSeoFor('/blog/', { title: 'Blog', description: '' });

export function generateMetadata() {
  return buildMetadata({ ...seo, path: '/blog/' });
}

export default function BlogPage() {
  return <PostIndex base="/blog/" page={1} list={posts} title="Junk Removal Blog" eyebrow="Guides & tips" intro={seo.description} crumb="Blog" hubs />;
}
