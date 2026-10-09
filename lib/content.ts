import pagesData from '@/content/pages.json';
import postsData from '@/content/posts.json';
import siteData from '@/content/site.json';
import navData from '@/content/navigation.json';
import termsData from '@/content/terms.json';
import pageSeo from '@/content/page-seo.json';
import { loadArticles } from './articles';
import { classifyTopic } from './topics';
import { redirectPlan } from '../scripts/lib/redirect-plan.mjs';

export type ImageRef = { src: string; alt: string; width?: number; height?: number };
export type FaqItem = { q: string; a: string };

export type Block =
  | { type: 'hero'; eyebrow: string; title: string; text: string; image: ImageRef | null }
  | { type: 'heading'; eyebrow?: string; title: string; text?: string }
  | { type: 'text'; html: string }
  | { type: 'image'; image: ImageRef | null }
  | { type: 'card'; title: string; text: string; image: ImageRef | null; href?: string | null }
  | { type: 'feature'; icon: string; title: string; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'faq'; items: FaqItem[] }
  | { type: 'areas'; title: string; subtitle: string; columns: { title: string; items: string[] }[] }
  | { type: 'html'; html: string }
  | { type: 'map'; address: string }
  | { type: 'contactForm' }
  | { type: 'postsGrid' }
  | { type: 'omitted'; reason: string }
  | { type: 'button'; text: string; href: string | null }
  | { type: 'banner'; image: ImageRef | null };

export type Section = { blocks: Block[] };

type Seo = { title: string; description: string; ogTitle?: string; ogDescription?: string; keywords?: string[] };

export type Page = {
  id: string;
  type: 'page';
  path: string;
  slug: string;
  parentId: string;
  title: string;
  rawTitle: string;
  date: string;
  modified: string;
  seo: Seo;
  featuredImage: ImageRef | null;
  sections: Section[];
};

export type Term = { slug: string; name: string };

export type Post = {
  id: string;
  type: 'post';
  path: string;
  slug: string;
  title: string;
  date: string;
  modified: string;
  seo: Seo;
  featuredImage: ImageRef | null;
  categories: Term[];
  tags: Term[];
  excerpt: string;
  html: string;
  wordCount: number;
  /** Blog topic hub slug (see lib/topics.ts). */
  topic: string;
  /** Extra fields available on new Markdown articles. */
  source?: 'wordpress' | 'markdown';
  summary?: string[];
  faq?: FaqItem[];
  service?: string;
  areas?: string[];
  primaryKeyword?: string;
  author?: string;
};

export type NavItem = { label: string; href: string; children: { label: string; href: string }[] };

export const pages = pagesData as unknown as Page[];
// Legacy posts that were merged (redirected) or replaced in place by a Markdown article drop out of the blog.
const plan = redirectPlan();
const legacyPosts = (postsData as unknown as Omit<Post, 'topic'>[])
  .filter((p) => !plan.removed.has(p.slug) && !plan.replaced.has(p.slug))
  .map((p) => ({ ...p, source: 'wordpress' as const, topic: classifyTopic(p.title).slug }));
const legacySlugs = new Set((postsData as unknown as Post[]).map((p) => p.slug));

const RESERVED = new Set([...(pagesData as unknown as Page[]).map((p) => p.path), ...legacyPosts.map((p) => p.path), '/blog/', '/blogs/', '/feed/', '/category/', '/tag/']);
const markdownPosts: Post[] = loadArticles().map((a) => {
  const path = `/${a.slug}/`;
  if (RESERVED.has(path)) throw new Error(`content/articles/${a.file}: URL ${path} is already used by an existing page or post (to replace a legacy post at the same URL, add "replaces: true")`);
  if (a.replaces && !legacySlugs.has(a.slug)) throw new Error(`content/articles/${a.file}: "replaces: true" but no legacy post exists at /${a.slug}/`);
  const plain = a.html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return {
    id: `md-${a.slug}`,
    type: 'post',
    source: 'markdown',
    path,
    slug: a.slug,
    title: a.title,
    date: a.date,
    modified: a.updated ?? a.date,
    seo: { title: a.seoTitle ?? '', description: a.description },
    featuredImage: a.image ? { src: a.image, alt: a.imageAlt ?? a.title } : null,
    categories: [{ slug: 'junk-removal-in-dubai', name: 'Junk Removal in Dubai' }],
    tags: (a.tags ?? []).map((t) => ({ slug: t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''), name: t })),
    excerpt: a.description || plain.slice(0, 200),
    html: a.html,
    wordCount: a.wordCount,
    topic: classifyTopic(a.title, a.topic).slug,
    summary: a.summary,
    faq: a.faq,
    service: a.service,
    areas: a.areas,
    primaryKeyword: a.primaryKeyword,
    author: a.author,
  } satisfies Post;
});

export const posts: Post[] = [...markdownPosts, ...legacyPosts].sort((a, b) => b.date.localeCompare(a.date)); // newest first
export const site = {
  ...siteData,
  url: siteData.url.replace(/\/$/, ''),
};
export const navigation = navData as { primary: NavItem[]; footer: NavItem[] };
export const terms = termsData as { categories: Record<string, string>; tags: Record<string, string> };
export const defaultFaq = site.defaultFaq as FaqItem[];

/** WordPress "posts per page" (default 10) — /blog/page/2/ … match the live site. */
export const POSTS_PER_PAGE = 10;

const seoOverrides = pageSeo as unknown as Record<string, { title: string; description: string }>;

export const getPageByPath = (path: string) => pages.find((p) => p.path === path);
export const getPostBySlug = (slug: string) => posts.find((p) => p.slug === slug);

export const SERVICE_PAGE_PARENT = '25';
export const servicePages = pages.filter((p) => p.parentId === SERVICE_PAGE_PARENT);

// Location pages: order taken from the "Service Areas" submenu.
export const areaPages: Page[] = (navigation.primary.find((n) => n.href === '/service-areas/')?.children ?? [])
  .map((c) => getPageByPath(c.href))
  .filter((p): p is Page => !!p)
  .reverse();

export const isAreaPage = (p: Page) => areaPages.some((a) => a.id === p.id);

/** Human name for a location page, e.g. "Dubai Marina", "The Meadows & Springs". */
export const areaName = (p: Page) =>
  p.title.replace(/^Junk Removal\s+/i, '').replace(' / ', ' & ');

export function pageSeoFor(path: string, fallback: { title: string; description: string }) {
  return seoOverrides[path] ?? fallback;
}

// Posts without an AIOSEO title: use the part of the post title before its first separator.
function shortTitle(t: string) {
  if (t.length <= 60) return t;
  const m = t.match(/^(.{12,}?)(?:\s[–|-]\s|:\s|\?\s)/);
  let s = m ? m[1] + (t[m[1].length] === '?' ? '?' : '') : t;
  if (s.length > 60) s = s.slice(0, 57).replace(/\s+\S*$/, '') + '…';
  return s;
}

// Fixes for broken AIOSEO data in the export (e.g. a description copied from another post).
const DESCRIPTION_OVERRIDES: Record<string, string> = {
  'furniture-disposal-dubai-sofa-bed-removal-service':
    'Furniture disposal in Dubai: sofa, bed and mattress removal from apartments and villas, with responsible disposal. Call or WhatsApp +971 55 103 1255.',
};

export function postSeo(post: Post) {
  const title = post.seo.title || shortTitle(post.title);
  const description = DESCRIPTION_OVERRIDES[post.slug] || post.seo.description || post.excerpt.replace(/…$/, '').slice(0, 155).replace(/\s+\S*$/, '') + '…';
  return { title, description };
}

export const allBlocks = (p: Page) => p.sections.flatMap((s) => s.blocks);
export const firstBlock = <T extends Block['type']>(p: Page, type: T) =>
  allBlocks(p).find((b) => b.type === type) as Extract<Block, { type: T }> | undefined;

export function paginate<T>(list: T[], page: number, perPage = POSTS_PER_PAGE) {
  const totalPages = Math.max(1, Math.ceil(list.length / perPage));
  return { items: list.slice((page - 1) * perPage, page * perPage), totalPages, page };
}

export const categoriesInUse = () => {
  const map = new Map<string, Term>();
  posts.forEach((p) => p.categories.forEach((c) => map.set(c.slug, c)));
  return [...map.values()];
};
export const tagsInUse = () => {
  const map = new Map<string, Term>();
  posts.forEach((p) => p.tags.forEach((t) => map.set(t.slug, t)));
  return [...map.values()];
};

export const categoryData = (slug: string) => {
  const term = categoriesInUse().find((c) => c.slug === slug);
  return term ? { term, list: posts.filter((p) => p.categories.some((c) => c.slug === slug)) } : null;
};

export const relatedPosts = (post: Post, n = 3) => {
  const tagSet = new Set(post.tags.map((t) => t.slug));
  return posts
    .filter((p) => p.id !== post.id)
    .map((p) => ({ p, score: (p.topic === post.topic ? 5 : 0) + p.tags.filter((t) => tagSet.has(t.slug)).length }))
    .sort((a, b) => b.score - a.score || b.p.date.localeCompare(a.p.date))
    .slice(0, n)
    .map((x) => x.p);
};

export const telHref = `tel:${site.phoneE164}`;
export const whatsappHref = (text = 'Hi, I need junk removal in Dubai.') =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

export const absoluteUrl = (path: string) => `${site.url}${path}`;

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Dubai' });

// ---------------------------------------------------------------- unique per-page content (SEO)
import localContentData from '@/content/local-content.json';
import serviceContentData from '@/content/service-content.json';

export type LocalContent = { heading: string; paragraphs: string[]; tips: string[]; jobs: string[]; nearby: string[]; faq: FaqItem[] };
export type ServiceContent = { pricing: string[]; notTaken: string[]; faq: FaqItem[] };

export const localContentFor = (path: string) => (localContentData as unknown as Record<string, LocalContent>)[path];
export const serviceContentFor = (path: string) => (serviceContentData as unknown as Record<string, ServiceContent>)[path];

// ---------------------------------------------------------------- money page → article links (internal linking)
import { TOPICS } from './topics';

/**
 * Best articles to link from a service or area page: articles that name this page in their
 * frontmatter (`service` / `areas`) first, then same-topic articles; newest first within each group.
 */
export function guidesFor(opts: { service?: string; area?: string }, n = 3): Post[] {
  const topic = opts.service ? TOPICS.find((t) => t.service === opts.service)?.slug : undefined;
  const score = (p: Post) =>
    (opts.service && p.service === opts.service ? 4 : 0) +
    (opts.area && p.areas?.includes(opts.area) ? 4 : 0) +
    (topic && p.topic === topic ? 2 : 0) +
    (p.source === 'markdown' ? 1 : 0);
  return posts
    .map((p) => ({ p, s: score(p) }))
    .filter((x) => x.s >= 2 || (opts.area && x.s >= 1))
    .sort((a, b) => b.s - a.s || b.p.date.localeCompare(a.p.date))
    .slice(0, n)
    .map((x) => x.p);
}
