import { Pagination, PostGrid } from '@/components/sections';
import { JsonLd, PageHero, QuoteSection } from '@/components/ui';
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
      <PageHero title={page > 1 ? `${title} – Page ${page}` : title} eyebrow={eyebrow} intro={intro} trail={trail} />
      <section className="py-14 sm:py-20">
        <div className="container-x">
          <PostGrid posts={items} />
          <Pagination base={base} page={page} totalPages={totalPages} />
        </div>
      </section>
      <QuoteSection />
    </>
  );
}

export const pageNumbers = (total: number) => Array.from({ length: Math.max(0, total - 1) }, (_, i) => ({ n: String(i + 2) }));
