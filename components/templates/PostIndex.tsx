import { Pagination, PostCard, PostGrid } from '@/components/sections';
import { JsonLd, PageHeader, QuoteSection } from '@/components/ui';
import { absoluteUrl, paginate, type Post } from '@/lib/content';
import { breadcrumbLd, graph } from '@/lib/seo';

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
}: {
  base: string;
  page: number;
  list: Post[];
  title: string;
  eyebrow?: string;
  intro?: string;
  crumb: string;
  perPage?: number;
}) {
  const { items, totalPages } = paginate(list, page, perPage);
  const path = page === 1 ? base : `${base}page/${page}/`;
  const trail = [
    { name: 'Home', path: '/' },
    { name: crumb, path: base },
    ...(page > 1 ? [{ name: `Page ${page}`, path }] : []),
  ];
  const [lead, ...rest] = page === 1 && items.length > 3 ? items : [undefined, ...items];
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
      <PageHeader title={page > 1 ? `${title} — page ${page}` : title} kicker={eyebrow} intro={intro} trail={trail} />
      <section className="py-14 sm:py-20">
        <div className="container-x">
          {lead && (
            <div className="mb-16 border-b border-line pb-16">
              <PostCard post={lead} size="lg" row />
            </div>
          )}
          <PostGrid posts={rest.filter((p): p is Post => !!p)} />
          <Pagination base={base} page={page} totalPages={totalPages} />
        </div>
      </section>
      <QuoteSection />
    </>
  );
}

export const pageNumbers = (total: number) => Array.from({ length: Math.max(0, total - 1) }, (_, i) => ({ n: String(i + 2) }));
