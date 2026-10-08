import { notFound } from 'next/navigation';
import { PostIndex } from '@/components/templates/PostIndex';
import { posts, tagsInUse } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';

// WordPress tag archives (/tag/{slug}/). Kept so existing links resolve, but marked noindex
// because most tags hold only one or two posts (thin content).
export const dynamicParams = false;

export function generateStaticParams() {
  return tagsInUse().map((t) => ({ slug: t.slug }));
}

const tagData = (slug: string) => {
  const term = tagsInUse().find((t) => t.slug === slug);
  return term ? { term, list: posts.filter((p) => p.tags.some((t) => t.slug === slug)) } : null;
};

export async function generateMetadata({ params }: PageProps<'/tag/[slug]'>) {
  const d = tagData((await params).slug);
  if (!d) return {};
  return buildMetadata({ title: `${d.term.name} – Articles`, description: `Articles tagged “${d.term.name}”.`, path: `/tag/${d.term.slug}/`, noindex: true });
}

export default async function TagPage({ params }: PageProps<'/tag/[slug]'>) {
  const d = tagData((await params).slug);
  if (!d) notFound();
  // Tag archives are small; show all posts on one page.
  return <PostIndex base={`/tag/${d.term.slug}/`} page={1} list={d.list} perPage={d.list.length} title={`#${d.term.name}`} eyebrow="Tag" crumb={d.term.name} />;
}
