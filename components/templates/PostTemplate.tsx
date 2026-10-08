import Image from 'next/image';
import Link from 'next/link';
import { Icon, WhatsAppIcon } from '@/components/Icon';
import { PostGrid } from '@/components/sections';
import { Breadcrumbs, JsonLd, QuoteSection } from '@/components/ui';
import { formatDate, relatedPosts, servicePages, site, telHref, whatsappHref, type Post } from '@/lib/content';
import { articleLd, breadcrumbLd, graph } from '@/lib/seo';

export function PostTemplate({ post, description }: { post: Post; description: string }) {
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog/' },
    { name: post.title.length > 60 ? post.title.slice(0, 57).replace(/\s+\S*$/, '') + '…' : post.title, path: post.path },
  ];
  const minutes = Math.max(1, Math.round(post.wordCount / 220));

  return (
    <>
      <JsonLd data={graph(breadcrumbLd(trail), articleLd(post, description))} />
      <article>
        <header className="bg-ink-950">
          <div className="container-x pt-12 pb-32 sm:pt-16">
            <Breadcrumbs trail={trail} />
            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-300">
              {post.categories.map((c) => (
                <Link key={c.slug} href={`/category/${c.slug}/`} className="rounded-full bg-brand-500/15 px-3 py-1 font-semibold text-brand-300 hover:bg-brand-500/25">
                  {c.name}
                </Link>
              ))}
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span className="inline-flex items-center gap-1.5">
                <Icon name="clock" className="h-4 w-4" /> {minutes} min read
              </span>
            </div>
            <h1 className="mt-5 max-w-4xl text-3xl leading-[1.12] font-extrabold tracking-tight text-white sm:text-5xl">{post.title}</h1>
          </div>
        </header>

        <div className="container-x -mt-24">
          {post.featuredImage && (
            <div className="relative mx-auto aspect-[16/9] max-w-5xl overflow-hidden rounded-3xl bg-ink-100 shadow-2xl shadow-ink-900/10">
              <Image src={post.featuredImage.src} alt={post.featuredImage.alt || post.title} fill priority sizes="(min-width:1024px) 1024px, 100vw" className="object-cover" />
            </div>
          )}
          <div className="mx-auto grid max-w-5xl gap-12 py-14 lg:grid-cols-[1fr_280px]">
            <div className="prose-content min-w-0" dangerouslySetInnerHTML={{ __html: post.html }} />
            <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-3xl bg-ink-950 p-6 text-ink-200">
                <p className="font-display text-xl font-bold text-white">Need junk removed?</p>
                <p className="mt-2 text-sm text-ink-300">Free quotes across Dubai. Same-day service available.</p>
                <a href={telHref} className="btn-primary mt-5 w-full">
                  <Icon name="phone" className="h-4 w-4" /> {site.phone}
                </a>
                <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-3 w-full">
                  <WhatsAppIcon className="h-4 w-4" /> WhatsApp
                </a>
              </div>
              <nav aria-label="Our services" className="card p-6">
                <p className="font-semibold text-ink-900">Our services</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {servicePages.map((p) => (
                    <li key={p.id}>
                      <Link href={p.path} className="text-ink-600 hover:text-brand-600">
                        {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          </div>
          {post.tags.length > 0 && (
            <div className="mx-auto max-w-5xl border-t border-ink-100 pt-8">
              <h2 className="sr-only">Tags</h2>
              <ul className="flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <li key={t.slug}>
                    <Link href={`/tag/${t.slug}/`} className="inline-flex items-center gap-1 rounded-full bg-ink-50 px-3 py-1.5 text-xs font-medium text-ink-600 hover:bg-brand-50 hover:text-brand-700">
                      #{t.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </article>

      <section className="py-14 sm:py-20">
        <div className="container-x">
          <h2 className="text-3xl font-extrabold tracking-tight">Related articles</h2>
          <div className="mt-10">
            <PostGrid posts={relatedPosts(post)} headingLevel="h3" />
          </div>
        </div>
      </section>
      <QuoteSection />
    </>
  );
}
