import Image from 'next/image';
import Link from 'next/link';
import { ArticleToc, type TocItem } from '@/components/blog/ArticleToc';
import { ReadingProgress } from '@/components/blog/ReadingProgress';
import { ShareButtons } from '@/components/blog/ShareButtons';
import { Icon, WhatsAppIcon } from '@/components/Icon';
import { PostGrid } from '@/components/sections';
import { Breadcrumbs, JsonLd, QuoteSection, SectionHead } from '@/components/ui';
import { services } from '@/lib/catalog';
import { absoluteUrl, areaName, formatDate, getPageByPath, relatedPosts, site, telHref, whatsappHref, type Post } from '@/lib/content';
import { articleLd, breadcrumbLd, faqLd, graph } from '@/lib/seo';
import { topicBySlug } from '@/lib/topics';

const slugify = (s: string) =>
  s
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-z#0-9]+;/gi, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);

/** Adds ids to <h2>/<h3> headings and returns the table of contents. */
function withToc(html: string) {
  const toc: TocItem[] = [];
  const used = new Set<string>();
  const out = html.replace(/<h([23])(?:\s[^>]*)?>([\s\S]*?)<\/h\1>/g, (_, lvl: string, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&#39;|&rsquo;/g, '’').trim();
    if (!text) return _;
    let id = slugify(inner) || `section-${toc.length + 1}`;
    while (used.has(id)) id += '-2';
    used.add(id);
    toc.push({ id, text, level: Number(lvl) as 2 | 3 });
    return `<h${lvl} id="${id}">${inner}</h${lvl}>`;
  });
  return { html: out, toc };
}

/** Splits the article before its 3rd H2 so a contact prompt can sit mid-article. */
function splitForCta(html: string) {
  const marker = '<!-- cta -->';
  if (html.includes(marker)) return html.split(marker, 2) as [string, string];
  const re = /<h2[\s>]/g;
  let m: RegExpExecArray | null;
  let count = 0;
  while ((m = re.exec(html))) {
    count++;
    if (count === 3) return [html.slice(0, m.index), html.slice(m.index)] as [string, string];
  }
  return [html, ''] as [string, string];
}

function InlineCta({ serviceTitle }: { serviceTitle?: string }) {
  return (
    <aside className="not-prose my-12 overflow-hidden rounded-(--radius-card) bg-ink-900 text-white" aria-label="Contact us">
      <div className="grid gap-6 p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:p-8">
        <div>
          <p className="kicker !text-brand-300">Need it gone?</p>
          <p className="mt-2 font-display text-2xl leading-tight font-extrabold" style={{ fontStretch: '108%' }}>
            {serviceTitle ? `Book ${serviceTitle.toLowerCase()} in Dubai` : 'Book junk removal anywhere in Dubai'}
          </p>
          <p className="mt-2 text-sm text-ink-300">Same-day service available. Call, WhatsApp or fill in the form.</p>
        </div>
        <div className="flex flex-col gap-2 sm:w-52">
          <a href={telHref} className="btn-primary !min-h-11">
            <Icon name="phone" className="h-4 w-4" /> {site.phone}
          </a>
          <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp !min-h-11">
            <WhatsAppIcon className="h-4 w-4" /> WhatsApp
          </a>
        </div>
      </div>
    </aside>
  );
}

export function PostTemplate({ post, description }: { post: Post; description: string }) {
  const topic = topicBySlug(post.topic);
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog/' },
    ...(topic ? [{ name: topic.name, path: `/blog/topic/${topic.slug}/` }] : []),
    { name: post.title, path: post.path },
  ];
  const minutes = Math.max(1, Math.round(post.wordCount / 220));
  const { html, toc } = withToc(post.html);
  const [before, after] = splitForCta(html);
  const servicePath = post.service ?? topic?.service;
  const service = services.find((s) => s.path === servicePath);
  const areas = (post.areas ?? []).map((p) => getPageByPath(p)).filter((p) => !!p);
  const updated = post.modified && post.modified.slice(0, 10) !== post.date.slice(0, 10) ? post.modified : null;
  const showToc = toc.filter((t) => t.level === 2).length > 2;

  return (
    <>
      <JsonLd data={graph(breadcrumbLd(trail), articleLd(post, description), ...(post.faq?.length ? [faqLd(post.faq)] : []))} />
      <ReadingProgress targetId="article-body" />

      <article>
        {/* ---------------------------------------------------------- header */}
        <header className="bg-paper">
          <div className="container-x pt-8 pb-12 sm:pt-10 sm:pb-16">
            <Breadcrumbs trail={trail} />
            <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div>
                {topic && (
                  <Link href={`/blog/topic/${topic.slug}/`} className="kicker hover:text-ink-900">
                    <span className="h-2 w-2 rounded-full bg-brand-500" /> {topic.name}
                  </Link>
                )}
                <h1 className="display-lg mt-5">{post.title}</h1>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-600">{description}</p>
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-600">
                  <span className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white ring-1 ring-line">
                      <Image src="/brand/mark.png" alt="" width={22} height={22} />
                    </span>
                    <span>
                      <span className="block font-semibold text-ink-900">{post.author ?? `${site.name} team`}</span>
                      <span className="block text-xs text-ink-500">Junk removal specialists, Dubai</span>
                    </span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Icon name="calendar" className="h-4 w-4 text-ink-400" />
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    {updated && (
                      <>
                        <span aria-hidden="true">·</span> Updated <time dateTime={updated}>{formatDate(updated)}</time>
                      </>
                    )}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Icon name="clock" className="h-4 w-4 text-ink-400" /> {minutes} min read
                  </span>
                </div>
              </div>
              {post.featuredImage && (
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-ink-100">
                  <Image src={post.featuredImage.src} alt={post.featuredImage.alt || post.title} fill priority sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ---------------------------------------------------------- body */}
        <div className="container-x">
          <div className={`mx-auto grid max-w-6xl gap-10 py-12 sm:py-16 lg:gap-14 ${showToc ? 'lg:grid-cols-[15rem_1fr] xl:grid-cols-[15rem_1fr_15rem]' : 'lg:grid-cols-[1fr_16rem]'}`}>
            {showToc && (
              <nav aria-label="Table of contents" className="hidden lg:sticky lg:top-28 lg:block lg:max-h-[calc(100vh-8rem)] lg:self-start lg:overflow-y-auto">
                <p className="kicker mb-4">Table of contents</p>
                <ArticleToc items={toc} />
              </nav>
            )}

            <div id="article-body" className="min-w-0">
              {showToc && (
                <details className="panel mb-10 lg:hidden" open>
                  <summary className="flex cursor-pointer list-none items-center justify-between p-5 font-display text-lg font-bold text-ink-900 [&::-webkit-details-marker]:hidden">
                    Table of contents <Icon name="chevronDown" className="h-4 w-4" />
                  </summary>
                  <div className="px-5 pb-5">
                    <ArticleToc items={toc} variant="inline" />
                  </div>
                </details>
              )}

              {post.summary && post.summary.length > 0 && (
                <section aria-labelledby="takeaways" className="mb-10 rounded-(--radius-card) border-l-4 border-brand-500 bg-paper p-6 sm:p-7">
                  <h2 id="takeaways" className="font-display text-lg font-extrabold">
                    Key takeaways
                  </h2>
                  <ul className="mt-4 space-y-2.5">
                    {post.summary.map((s) => (
                      <li key={s} className="flex gap-3 text-[1.02rem] leading-relaxed text-ink-700">
                        <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-brand-600" strokeWidth={3} />
                        {s}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <div className="prose-content max-w-[44rem]" dangerouslySetInnerHTML={{ __html: before }} />
              {after && (
                <>
                  <div className="max-w-[44rem]">
                    <InlineCta serviceTitle={service?.title} />
                  </div>
                  <div className="prose-content max-w-[44rem]" dangerouslySetInnerHTML={{ __html: after }} />
                </>
              )}

              {post.faq && post.faq.length > 0 && (
                <section aria-labelledby="article-faq" className="mt-14 max-w-[44rem]">
                  <h2 id="article-faq" className="font-display text-[1.6rem] font-extrabold sm:text-[1.9rem]">
                    Frequently asked questions
                  </h2>
                  <div className="mt-6 border-t border-ink-900">
                    {post.faq.map((f, i) => (
                      <details key={f.q} className="group border-b border-line" {...(i === 0 ? { open: true } : {})}>
                        <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-5 text-left font-semibold text-ink-900 [&::-webkit-details-marker]:hidden">
                          {f.q}
                          <Icon name="plus" className="mt-1 h-4 w-4 shrink-0 transition-transform group-open:rotate-45" />
                        </summary>
                        <p className="-mt-1 pb-6 leading-relaxed text-ink-600">{f.a}</p>
                      </details>
                    ))}
                  </div>
                </section>
              )}

              {/* related service + areas */}
              {(service || areas.length > 0) && (
                <section className="mt-14 grid max-w-[44rem] gap-4 sm:grid-cols-2">
                  {service && (
                    <Link href={service.path} className="group panel flex flex-col p-6 transition hover:border-ink-900">
                      <span className="kicker">Related service</span>
                      <span className="mt-3 flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                          <Icon name={service.icon} className="h-5 w-5" />
                        </span>
                        <span className="font-display text-lg font-bold text-ink-900" style={{ fontStretch: '106%' }}>
                          {service.title}
                        </span>
                      </span>
                      <span className="mt-3 text-sm text-ink-500">{service.short}</span>
                      <span className="link-arrow mt-4 self-start text-sm">
                        View service <Icon name="arrowRight" className="h-4 w-4" />
                      </span>
                    </Link>
                  )}
                  {areas.length > 0 && (
                    <div className="panel p-6">
                      <span className="kicker">Areas covered</span>
                      <ul className="mt-3 space-y-1.5">
                        {areas.map((a) => (
                          <li key={a!.id}>
                            <Link href={a!.path} className="flex items-center gap-2 text-ink-800 hover:text-brand-600">
                              <Icon name="pin" className="h-4 w-4 text-brand-500" /> Junk removal in {areaName(a!)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </section>
              )}

              <div className="mt-12 max-w-[44rem] border-t border-line pt-8">
                <ShareButtons url={absoluteUrl(post.path)} title={post.title} />
              </div>

              {/* author / E-E-A-T */}
              <section className="mt-8 flex max-w-[44rem] gap-5 rounded-(--radius-card) bg-paper p-6" aria-label="About the author">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-line">
                  <Image src="/brand/mark.png" alt="" width={32} height={32} />
                </span>
                <div>
                  <p className="font-display text-lg font-bold text-ink-900">Written by the {site.name} team</p>
                  <p className="mt-1 text-[0.95rem] leading-relaxed text-ink-600">
                    We remove household junk, furniture, appliances, construction debris and garden waste for homes and businesses across Dubai, from our base in Al Quoz.
                  </p>
                  <Link href="/about-us/" className="link-arrow mt-3 text-sm">
                    About us <Icon name="arrowRight" className="h-4 w-4" />
                  </Link>
                </div>
              </section>

              {post.tags.length > 0 && (
                <ul className="mt-8 flex max-w-[44rem] flex-wrap gap-2">
                  {post.tags.map((t) => (
                    <li key={t.slug}>
                      <Link href={`/tag/${t.slug}/`} className="inline-flex rounded-full bg-paper px-3 py-1.5 text-xs font-medium text-ink-600 hover:bg-brand-50 hover:text-brand-700">
                        #{t.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <aside className={`space-y-5 lg:sticky lg:top-28 lg:self-start ${showToc ? 'lg:col-start-2 xl:col-start-3' : ''}`}>
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
                  <a href="#contact-form" className="btn-line-light">
                    Fill in the form
                  </a>
                </div>
              </div>
              <nav aria-label="Our services" className="panel hidden p-6 xl:block">
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
              <Link href={topic ? `/blog/topic/${topic.slug}/` : '/blog/'} className="link-arrow">
                {topic ? `More on ${topic.name.toLowerCase()}` : 'All articles'} <Icon name="arrowRight" className="h-4 w-4" />
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
