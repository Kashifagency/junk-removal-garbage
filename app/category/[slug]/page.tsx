import { notFound } from 'next/navigation';
import { PostIndex } from '@/components/templates/PostIndex';
import { categoriesInUse, categoryData } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';

// WordPress category archives (/category/{slug}/) for categories that have published posts.
export const dynamicParams = false;

export function generateStaticParams() {
  return categoriesInUse().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<'/category/[slug]'>) {
  const d = categoryData((await params).slug);
  if (!d) return {};
  return buildMetadata({
    title: `${d.term.name} – Articles`,
    description: `Articles about ${d.term.name.toLowerCase()}: guides and tips on junk removal, waste collection and cleanouts in Dubai.`,
    path: `/category/${d.term.slug}/`,
  });
}

export default async function CategoryPage({ params }: PageProps<'/category/[slug]'>) {
  const d = categoryData((await params).slug);
  if (!d) notFound();
  return <PostIndex base={`/category/${d.term.slug}/`} page={1} list={d.list} title={d.term.name} eyebrow="Category" crumb={d.term.name} />;
}
