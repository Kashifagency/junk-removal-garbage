import { notFound } from 'next/navigation';
import { blocksOf } from '@/components/sections';
import { ServiceTemplate } from '@/components/templates/ServiceTemplate';
import { pageSeoFor, servicePages } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map((p) => ({ slug: p.slug }));
}

const find = (slug: string) => servicePages.find((p) => p.slug === slug);

export async function generateMetadata({ params }: PageProps<'/services/[slug]'>) {
  const page = find((await params).slug);
  if (!page) return {};
  const seo = pageSeoFor(page.path, { title: page.title, description: '' });
  return buildMetadata({ ...seo, path: page.path, image: blocksOf(page, 'image')[0]?.image });
}

export default async function ServicePage({ params }: PageProps<'/services/[slug]'>) {
  const page = find((await params).slug);
  if (!page) notFound();
  return <ServiceTemplate page={page} description={pageSeoFor(page.path, { title: page.title, description: '' }).description} />;
}
