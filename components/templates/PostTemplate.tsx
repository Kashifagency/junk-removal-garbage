import Image from 'next/image';
import Link from 'next/link';
import { Icon, WhatsAppIcon } from '@/components/Icon';
import { PostGrid } from '@/components/sections';
import { Breadcrumbs, JsonLd, QuoteSection, SectionHead } from '@/components/ui';
import { services } from '@/lib/catalog';
import { formatDate, relatedPosts, site, telHref, whatsappHref, type Post } from '@/lib/content';
import { articleLd, breadcrumbLd, graph } from '@/lib/seo';

const slugify = (s: string) =>
  s
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-z#0-9]+;/gi, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);

/** Adds ids to <h2> headings and returns the table of contents. */
function withToc(html: string) {
  const toc: { id: string; text: string }[] = [];
  const used = new Set<string>();
  const out = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim();
    let id = slugify(inner) || `section-${toc.length + 1}`;
    while (used.has(id)) id += '-2';
    used.add(id);
    toc.push({ id, text });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  return { html: out, toc };
}

export function PostTemplate({ post, description }: { post: Post; description: string }) {
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog/' },
    { name: post.title, path: post.path },
  ];
  const minutes = Math.max(1, Math.round(post.wordCount / 220));
  const { html, toc } = withToc(post.html);

  return (
    <>
      <JsonLd data={graph(breadcrumbLd(trail), articleLd(post, description))} />
      <article>
        <header className="bg-paper">
          <div className="container-x pt-8 pb-12 sm:pt-10">
            <Breadcrumbs trail={trail} />
            <div className="mx-auto mt-10 max-w-4xl text-center sm:mt-14">
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-ink-500">
                {post.categories.map((c) => (
                  <Link key={c.slug} href={`/category/${c.slug}/`} className="rounded-full bg-white px-3 py-1 font-semibold text-brand-700 ring-1 ring-line hover:ring-brand-400">
                    {c.name}
                  </Link>
                ))}
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span aria-hidden="true">·</span>
                <span>{minutes} min read</span>
              </div>
              <h1 className="display-lg mt-6">{post.title}</h1>
            </div>
          </div>
        </header>

        {post.featuredImage && (
          <div className="bg-[linear-gradient(var(--color-paper)_50%,white_50%)]">
            <div className="container-x">
              <div className="relative mx-auto aspect-[16/9] max-w-5xl overflow-hidden rounded-[1.5rem] bg-ink-100">
                <Image src={post.featuredImage.src} alt={post.featuredImage.alt || post.title} fill priority sizes="(min-width:1024px) 1024px, 100vw" className="object-cover" />
              </div>
            </div>
          </div>
        )}

        <div className="container-x">
          <div className="mx-auto grid max-w-6xl gap-10 py-12 sm:py-16 lg:grid-cols-[1fr_17rem] lg:gap-14 xl:grid-cols-[13rem_1fr_16rem]">
            {toc.length > 2 && (
              <nav aria-label="On this page" className="hidden xl:sticky xl:top-28 xl:block xl:self-start">
                <p className="kicker">On this page</p>
                <ol className="mt-5 space-y-3 border-l border-line text-sm">
                  {toc.map((t) => (
                    <li key={t.id}>
                      <a href={`#${t.id}`} className="-ml-px block border-l-2 border-transparent pl-4 leading-snug text-ink-500 hover:border-brand-500 hover:text-ink-900">
                        {t.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            <div className={`min-w-0 ${toc.length > 2 ? '' : 'xl:col-span-2'}`}>
              {toc.length > 2 && (
                <details className="panel mb-10 xl:hidden">
                  <summary className="flex cursor-pointer list-none items-center justify-between p-5 font-semibold text-ink-900 [&::-webkit-details-marker]:hidden">
                    On this page <Icon name="chevronDown" className="h-4 w-4" />
                  </summary>
                  <ol className="space-y-2.5 px-5 pb-5 text-sm">
                    {toc.map((t, i) => (
                      <li key={t.id} className="flex gap-3">
                        <span className="text-ink-400 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                        <a href={`#${t.id}`} className="text-ink-600 hover:text-ink-900">
                          {t.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </details>
              )}
              <div className="prose-content max-w-[44rem]" dangerouslySetInnerHTML={{ __html: html }} />

              {post.tags.length > 0 && (
                <div className="mt-14 border-t border-line pt-8">
                  <h2 className="kicker">Tags</h2>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((t) => (
                      <li key={t.slug}>
                        <Link href={`/tag/${t.slug}/`} className="inline-flex rounded-full bg-paper px-3 py-1.5 text-xs font-medium text-ink-600 hover:bg-brand-50 hover:text-brand-700">
                          #{t.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-(--radius-card) bg-ink-900 p-6 text-white">
                <p className="font-display text-2xl leading-tight font-extrabold" style={{ fontStretch: '110%' }}>
                  Need junk removed?
                </p>
                <p className="mt-2 text-sm text-ink-300">Serving all areas of Dubai. Same-day service available.</p>
                <div className="mt-5 grid gap-2">
                  <a href={telHref} className="btn-primary">
                    <Icon name="phone" className="h-4 w-4" /> {site.phone}
                  </a>
                  <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                    <WhatsAppIcon className="h-4 w-4" /> WhatsApp
                  </a>
                </div>
              </div>
              <nav aria-label="Our services" className="panel p-6">
                <p className="kicker">Our services</p>
                <ul className="mt-4 space-y-1">
                  {services.map((s) => (
                    <li key={s.path}>
                      <Link href={s.path} className="group flex items-center gap-3 rounded-lg py-2 text-sm text-ink-700 hover:text-ink-900">
                        <Icon name={s.icon} className="h-4 w-4 text-brand-500" />
                        <span className="flex-1">{s.title}</span>
                        <Icon name="arrowRight" className="h-3.5 w-3.5 text-ink-300 group-hover:text-brand-500" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          </div>
        </div>
      </article>

      <section className="border-t border-line bg-paper py-16 sm:py-24">
        <div className="container-x">
          <SectionHead
            kicker="Keep reading"
            title="Related articles"
            action={
              <Link href="/blog/" className="link-arrow">
                All articles <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
            }
          />
          <div className="mt-12">
            <PostGrid posts={relatedPosts(post)} headingLevel="h3" />
          </div>
        </div>
      </section>
      <QuoteSection />
    </>
  );
}
