import { notFound } from 'next/navigation';
import { PostIndex } from '@/components/templates/PostIndex';
import { getPosts } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { TOPICS, topicBySlug } from '@/lib/topics';

// Topic hubs: /blog/topic/{slug}/ — groups articles so each money keyword has a supporting cluster.
// ISR: re-render daily (fallback; the /api/revalidate cron refreshes at Dubai midnight) so scheduled (future-dated) posts go live without a redeploy (lib/publish.ts).
export const revalidate = 86400;
// dynamicParams stays true so a hub appears when its first scheduled post goes live; empty/unknown -> 404.

export function generateStaticParams() {
  return TOPICS.filter((t) => getPosts().some((p) => p.topic === t.slug)).map((t) => ({ topic: t.slug }));
}

export async function generateMetadata({ params }: PageProps<'/blog/topic/[topic]'>) {
  const t = topicBySlug((await params).topic);
  if (!t) return {};
  const count = getPosts().filter((p) => p.topic === t.slug).length;
  // Hubs with fewer than 3 articles are thin: keep them out of the index until they grow.
  return buildMetadata({ title: `${t.name} – Junk Removal Guides Dubai`, description: t.description, path: `/blog/topic/${t.slug}/`, noindex: count < 3 });
}

export default async function TopicPage({ params }: PageProps<'/blog/topic/[topic]'>) {
  const t = topicBySlug((await params).topic);
  if (!t) notFound();
  const list = getPosts().filter((p) => p.topic === t.slug);
  if (!list.length) notFound();
  return <PostIndex base={`/blog/topic/${t.slug}/`} page={1} list={list} perPage={list.length || 1} title={t.name} eyebrow="Topic" intro={t.description} crumb={t.name} activeTopic={t.slug} />;
}
