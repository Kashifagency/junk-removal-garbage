import { notFound, permanentRedirect } from 'next/navigation';
import { AreaTemplate } from '@/components/templates/AreaTemplate';
import { PostTemplate } from '@/components/templates/PostTemplate';
import {
  AboutTemplate,
  CareersTemplate,
  ContactTemplate,
  FaqTemplate,
  GenericTemplate,
  ServiceAreasTemplate,
} from '@/components/templates/StandardPages';
import { getPageByPath, getPostBySlug, getPosts, isAreaPage, pageSeoFor, pages, postSeo, scheduledRedirectFor } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';

// Top-level WordPress pages and all posts share the /{slug}/ namespace (WP permalink "/%postname%/").
// Pages with their own route folder (/, /services/, /blog/, /blogs/) are excluded here.
const OWN_ROUTE = new Set(['/', '/services/', '/blog/', '/blogs/']);
const topLevelPages = pages.filter((p) => p.parentId === '0' && !OWN_ROUTE.has(p.path));

// ISR: re-render daily (fallback; the /api/revalidate cron refreshes at Dubai midnight) so scheduled (future-dated) posts go live without a redeploy (lib/publish.ts).
export const revalidate = 86400;
// dynamicParams stays true (default) so a scheduled post that wasn't prebuilt renders on demand once
// its date passes; unknown or not-yet-published slugs still 404 via resolve() -> notFound().

export function generateStaticParams() {
  return [...topLevelPages.map((p) => ({ slug: p.slug })), ...getPosts().map((p) => ({ slug: p.slug }))];
}

function resolve(slug: string) {
  const page = getPageByPath(`/${slug}/`);
  if (page && topLevelPages.includes(page)) return { page } as const;
  // Legacy post merged into a scheduled article (redirectFrom) whose date has now arrived.
  const moved = scheduledRedirectFor(slug);
  if (moved) permanentRedirect(moved);
  const post = getPostBySlug(slug);
  if (post) return { post } as const;
  return null;
}

export async function generateMetadata({ params }: PageProps<'/[slug]'>) {
  const { slug } = await params;
  const r = resolve(slug);
  if (!r) return {};
  if ('post' in r && r.post) {
    const seo = postSeo(r.post);
    return buildMetadata({
      ...seo,
      path: r.post.path,
      image: r.post.featuredImage,
      type: 'article',
      publishedTime: r.post.date,
      modifiedTime: r.post.modified,
    });
  }
  const seo = pageSeoFor(r.page.path, { title: r.page.title, description: '' });
  return buildMetadata({ ...seo, path: r.page.path, image: r.page.featuredImage });
}

export default async function Page({ params }: PageProps<'/[slug]'>) {
  const { slug } = await params;
  const r = resolve(slug);
  if (!r) notFound();

  if ('post' in r && r.post) return <PostTemplate post={r.post} description={postSeo(r.post).description} />;

  const page = r.page;
  const { description } = pageSeoFor(page.path, { title: page.title, description: '' });
  if (isAreaPage(page)) return <AreaTemplate page={page} description={description} />;
  switch (page.path) {
    case '/about-us/':
      return <AboutTemplate page={page} description={description} />;
    case '/careers/':
      return <CareersTemplate page={page} description={description} />;
    case '/faq/':
      return <FaqTemplate page={page} description={description} />;
    case '/contact/':
      return <ContactTemplate page={page} description={description} />;
    case '/service-areas/':
      return <ServiceAreasTemplate page={page} description={description} />;
    default:
      return <GenericTemplate page={page} description={description} />;
  }
}
