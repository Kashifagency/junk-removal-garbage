import { notFound } from 'next/navigation';
import { PostIndex, pageNumbers } from '@/components/templates/PostIndex';
import { pageSeoFor, paginate, posts } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';

// WordPress-style pagination: /blog/page/2/ … (page 1 lives at /blog/).
export const dynamicParams = false;
const totalPages = paginate(posts, 1).totalPages;
const seo = pageSeoFor('/blog/', { title: 'Blog', description: '' });

export function generateStaticParams() {
  return pageNumbers(totalPages);
}

export async function generateMetadata({ params }: PageProps<'/blog/page/[n]'>) {
  const n = Number((await params).n);
  return buildMetadata({ title: `${seo.title} – Page ${n}`, description: `${seo.description} Page ${n} of ${totalPages}.`, path: `/blog/page/${n}/` });
}

export default async function BlogPaged({ params }: PageProps<'/blog/page/[n]'>) {
  const n = Number((await params).n);
  if (!Number.isInteger(n) || n < 2 || n > totalPages) notFound();
  return <PostIndex base="/blog/" page={n} list={posts} title="Junk Removal Blog" eyebrow="Blog" intro={seo.description} crumb="Blog" />;
}
