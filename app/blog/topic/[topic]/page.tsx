import { notFound } from 'next/navigation';
import { PostIndex } from '@/components/templates/PostIndex';
import { posts } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { TOPICS, topicBySlug } from '@/lib/topics';

// Topic hubs: /blog/topic/{slug}/ — groups articles so each money keyword has a supporting cluster.
export const dynamicParams = false;

export function generateStaticParams() {
  return TOPICS.filter((t) => posts.some((p) => p.topic === t.slug)).map((t) => ({ topic: t.slug }));
}

export async function generateMetadata({ params }: PageProps<'/blog/topic/[topic]'>) {
  const t = topicBySlug((await params).topic);
  if (!t) return {};
  return buildMetadata({ title: `${t.name} – Junk Removal Guides Dubai`, description: t.description, path: `/blog/topic/${t.slug}/` });
}

export default async function TopicPage({ params }: PageProps<'/blog/topic/[topic]'>) {
  const t = topicBySlug((await params).topic);
  if (!t) notFound();
  const list = posts.filter((p) => p.topic === t.slug);
  return <PostIndex base={`/blog/topic/${t.slug}/`} page={1} list={list} perPage={list.length || 1} title={t.name} eyebrow="Topic" intro={t.description} crumb={t.name} activeTopic={t.slug} />;
}
