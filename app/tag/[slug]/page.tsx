import { notFound } from 'next/navigation';
import { PostIndex } from '@/components/templates/PostIndex';
import { tagData, tagsInUse } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';

// WordPress tag archives (/tag/{slug}/). Kept so existing links resolve, but marked noindex
// because most tags hold only one or two posts (thin content).
// ISR: re-render daily (fallback; the /api/revalidate cron refreshes at Dubai midnight) so scheduled (future-dated) posts go live without a redeploy (lib/publish.ts).
export const revalidate = 86400;
// dynamicParams stays true; tags without published posts -> 404 (tagData returns null).

export function generateStaticParams() {
  return tagsInUse().map((t) => ({ slug: t.slug }));
}

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
