import Image from 'next/image';
import Link from 'next/link';
import { BlogSearch } from '@/components/blog/BlogSearch';
import { Pagination, PostCard, PostGrid } from '@/components/sections';
import { Breadcrumbs, JsonLd, QuoteSection, SectionHead } from '@/components/ui';
import { absoluteUrl, paginate, posts as allPosts, type Post } from '@/lib/content';
import { breadcrumbLd, graph } from '@/lib/seo';
import { TOPICS, topicBySlug } from '@/lib/topics';

const searchItems = () => allPosts.map((p) => ({ title: p.title, path: p.path, excerpt: p.excerpt, topic: topicBySlug(p.topic)?.name ?? '' }));
const topicCount = (slug: string) => allPosts.filter((p) => p.topic === slug).length;

export function TopicChips({ active }: { active?: string }) {
  return (
    <ul className="flex flex-wrap gap-2">
      <li>
        <Link
          href="/blog/"
          className={`inline-flex min-h-10 items-center rounded-full px-4 text-sm font-medium transition ${!active ? 'bg-ink-900 text-white' : 'border border-ink-200 bg-white text-ink-700 hover:border-ink-900'}`}
        >
          All articles
        </Link>
      </li>
      {TOPICS.filter((t) => topicCount(t.slug) > 0).map((t) => (
        <li key={t.slug}>
          <Link
            href={`/blog/topic/${t.slug}/`}
            aria-current={active === t.slug ? 'page' : undefined}
            className={`inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-sm font-medium transition ${active === t.slug ? 'bg-ink-900 text-white' : 'border border-ink-200 bg-white text-ink-700 hover:border-ink-900'}`}
          >
            {t.name} <span className={active === t.slug ? 'text-ink-400' : 'text-ink-400'}>{topicCount(t.slug)}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Blog header: breadcrumb, title, intro, search and topic chips. */
export function BlogHeader({ title, kicker, intro, trail, activeTopic }: { title: string; kicker?: string; intro?: string; trail: { name: string; path: string }[]; activeTopic?: string }) {
  return (
    <section className="border-b border-line bg-paper">
      <div className="container-x pt-8 pb-12 sm:pt-10 sm:pb-14">
        <Breadcrumbs trail={trail} />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            {kicker && <p className="kicker">{kicker}</p>}
            <h1 className="display-xl mt-4">{title}</h1>
            {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-600">{intro}</p>}
          </div>
          <BlogSearch items={searchItems()} />
        </div>
        <div className="mt-10">
          <TopicChips active={activeTopic} />
        </div>
      </div>
    </section>
  );
}

function TopicHubs() {
  return (
    <section className="bg-paper py-16 sm:py-20">
      <div className="container-x">
        <SectionHead kicker="Browse by topic" title="Find the right guide for your job" />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.filter((t) => topicCount(t.slug) > 0).map((t) => {
            const latest = allPosts.find((p) => p.topic === t.slug);
            return (
              <li key={t.slug}>
                <Link href={`/blog/topic/${t.slug}/`} className="group panel flex h-full overflow-hidden transition hover:border-ink-900">
                  {latest?.featuredImage && (
                    <span className="relative hidden w-28 shrink-0 sm:block">
                      <Image src={latest.featuredImage.src} alt="" fill sizes="112px" className="object-cover" />
                    </span>
                  )}
                  <span className="flex flex-1 flex-col p-5">
                    <span className="flex items-center justify-between gap-3">
                      <span className="font-display text-lg font-bold text-ink-900 group-hover:text-brand-600" style={{ fontStretch: '106%' }}>
                        {t.name}
                      </span>
                      <span className="rounded-full bg-paper px-2.5 py-0.5 text-xs font-semibold text-ink-600">{topicCount(t.slug)}</span>
                    </span>
                    <span className="mt-2 line-clamp-2 text-sm text-ink-500">{t.description}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/** Paginated post listing used by /blog/, /blogs/, category and tag archives. */
export function PostIndex({
  base,
  page,
  list,
  title,
  eyebrow,
  intro,
  crumb,
  perPage,
  hubs = false,
  activeTopic,
}: {
  base: string;
  page: number;
  list: Post[];
  title: string;
  eyebrow?: string;
  intro?: string;
  crumb: string;
  perPage?: number;
  hubs?: boolean;
  activeTopic?: string;
}) {
  const { items, totalPages } = paginate(list, page, perPage);
  const path = page === 1 ? base : `${base}page/${page}/`;
  const trail = [
    { name: 'Home', path: '/' },
    ...(base.startsWith('/blog/topic/') ? [{ name: 'Blog', path: '/blog/' }] : []),
    { name: crumb, path: base },
    ...(page > 1 ? [{ name: `Page ${page}`, path }] : []),
  ];
  const featured = page === 1 && items.length > 4;
  const [lead, second, third, ...rest] = featured ? items : [undefined, undefined, undefined, ...items];

  return (
    <>
      <JsonLd
        data={graph(breadcrumbLd(trail), {
          '@type': 'CollectionPage',
          name: title,
          url: absoluteUrl(path),
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: items.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: absoluteUrl(p.path), name: p.title })),
          },
        })}
      />
      <BlogHeader title={page > 1 ? `${title} — page ${page}` : title} kicker={eyebrow} intro={intro} trail={trail} activeTopic={activeTopic} />

      {featured && lead && (
        <section className="pt-14 sm:pt-20">
          <div className="container-x grid gap-x-10 gap-y-12 lg:grid-cols-[1.45fr_1fr]">
            <PostCard post={lead} size="lg" />
            <div className="grid content-start gap-y-10">
              <p className="kicker">Also new</p>
              {[second, third].filter((p): p is Post => !!p).map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {hubs && page === 1 && (
        <div className="mt-16 sm:mt-20">
          <TopicHubs />
        </div>
      )}

      <section className="py-14 sm:py-20">
        <div className="container-x">
          {featured && <SectionHead kicker="Latest articles" title="More junk removal guides" />}
          <div className={featured ? 'mt-10' : ''}>
            <PostGrid posts={rest.filter((p): p is Post => !!p)} />
          </div>
          <Pagination base={base} page={page} totalPages={totalPages} />
        </div>
      </section>
      <QuoteSection />
    </>
  );
}

export const pageNumbers = (total: number) => Array.from({ length: Math.max(0, total - 1) }, (_, i) => ({ n: String(i + 2) }));

