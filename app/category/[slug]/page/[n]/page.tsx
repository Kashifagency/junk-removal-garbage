import { notFound } from 'next/navigation';
import { PostIndex, pageNumbers } from '@/components/templates/PostIndex';
import { categoriesInUse, categoryData, paginate } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';

// ISR: re-render daily (fallback; the /api/revalidate cron refreshes at Dubai midnight) so scheduled (future-dated) posts go live without a redeploy (lib/publish.ts).
export const revalidate = 86400;
// dynamicParams stays true so new pages appear when scheduled posts go live; out-of-range n -> 404.

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
  if (!d || !Number.isInteger(page) || page < 2 || page > paginate(d.list, 1).totalPages) notFound();
  return <PostIndex base={`/category/${slug}/`} page={page} list={d.list} title={d.term.name} eyebrow="Category" crumb={d.term.name} />;
}
