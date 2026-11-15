import { notFound } from 'next/navigation';
import { PostIndex, pageNumbers } from '@/components/templates/PostIndex';
import { getPosts, pageSeoFor, paginate } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';

// WordPress-style pagination: /blogs/page/2/ … (page 1 lives at /blogs/).
// ISR: re-render hourly so scheduled (future-dated) posts go live without a redeploy (lib/publish.ts).
export const revalidate = 3600;
// dynamicParams stays true so new pages appear when scheduled posts go live; out-of-range n -> 404.
const totalPages = () => paginate(getPosts(), 1).totalPages;
const seo = pageSeoFor('/blogs/', { title: 'Blogs', description: '' });

export function generateStaticParams() {
  return pageNumbers(totalPages());
}

export async function generateMetadata({ params }: PageProps<'/blogs/page/[n]'>) {
  const n = Number((await params).n);
  return buildMetadata({ title: `${seo.title} – Page ${n}`, description: `${seo.description} Page ${n}.`, path: `/blogs/page/${n}/`, canonical: `/blog/page/${n}/` });
}

export default async function BlogsPaged({ params }: PageProps<'/blogs/page/[n]'>) {
  const n = Number((await params).n);
  if (!Number.isInteger(n) || n < 2 || n > totalPages()) notFound();
  return <PostIndex base="/blogs/" page={n} list={getPosts()} title="Blogs" eyebrow="Articles" intro={seo.description} crumb="Blogs" />;
}
