import { PostIndex } from '@/components/templates/PostIndex';
import { pageSeoFor, posts } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';

const seo = pageSeoFor('/blogs/', { title: 'Blogs', description: '' });

export function generateMetadata() {
  return buildMetadata({ ...seo, path: '/blogs/' });
}

export default function BlogsPage() {
  return <PostIndex base="/blogs/" page={1} list={posts} title="Blogs" eyebrow="Articles" intro={seo.description} crumb="Blogs" hubs />;
}
