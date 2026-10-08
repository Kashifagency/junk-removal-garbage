import { notFound } from 'next/navigation';
import { PostIndex, pageNumbers } from '@/components/templates/PostIndex';
import { categoriesInUse, categoryData, paginate } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return categoriesInUse().flatMap((c) => pageNumbers(paginate(categoryData(c.slug)!.list, 1).totalPages).map(({ n }) => ({ slug: c.slug, n })));
}

export async function generateMetadata({ params }: PageProps<'/category/[slug]/page/[n]'>) {
  const { slug, n } = await params;
  const d = categoryData(slug);
  if (!d) return {};
  return buildMetadata({
    title: `${d.term.name} – Articles – Page ${n}`,
    description: `Articles about ${d.term.name.toLowerCase()} in Dubai – page ${n}.`,
    path: `/category/${slug}/page/${n}/`,
  });
}

export default async function CategoryPaged({ params }: PageProps<'/category/[slug]/page/[n]'>) {
  const { slug, n } = await params;
  const d = categoryData(slug);
  const page = Number(n);
  if (!d || page < 2 || page > paginate(d.list, 1).totalPages) notFound();
  return <PostIndex base={`/category/${slug}/`} page={page} list={d.list} title={d.term.name} eyebrow="Category" crumb={d.term.name} />;
}
