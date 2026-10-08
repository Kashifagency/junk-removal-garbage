import type { Metadata } from 'next';
import { absoluteUrl, site, type FaqItem, type ImageRef, type Post } from './content';

const DEFAULT_OG = '/wp-content/uploads/2025/12/Gemini_Generated_Image_ip6gtkip6gtkip6g.webp';

export function buildMetadata(opts: {
  title: string;
  description: string;
  path: string;
  image?: ImageRef | null;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
}): Metadata {
  const image = opts.image?.src || DEFAULT_OG;
  return {
    // Append the brand only while the full title stays within ~65 characters.
    title: { absolute: opts.title.includes(site.name) || opts.title.length + site.name.length > 62 ? opts.title : `${opts.title} | ${site.name}` },
    description: opts.description,
    alternates: { canonical: opts.path },
    robots: opts.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: opts.type ?? 'website',
      url: opts.path,
      siteName: site.name,
      locale: 'en_AE',
      title: opts.title,
      description: opts.description,
      images: [{ url: image, alt: opts.image?.alt || site.name }],
      ...(opts.type === 'article' ? { publishedTime: opts.publishedTime, modifiedTime: opts.modifiedTime } : {}),
    },
    twitter: { card: 'summary_large_image', title: opts.title, description: opts.description, images: [image] },
  };
}

// ---------------------------------------------------------------- JSON-LD
const orgId = `${site.url}/#business`;

export function localBusinessLd() {
  return {
    '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
    '@id': orgId,
    name: site.name,
    alternateName: 'JunkRemovalGarbage',
    legalName: site.legalName,
    url: `${site.url}/`,
    logo: absoluteUrl('/brand/logo.png'),
    image: absoluteUrl(DEFAULT_OG),
    telephone: site.phoneE164,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: 'Dubai',
      addressCountry: site.address.country,
    },
    areaServed: { '@type': 'City', name: 'Dubai' },
    sameAs: [`https://wa.me/${site.whatsapp}`],
  };
}

export function websiteLd() {
  return {
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    url: `${site.url}/`,
    name: site.name,
    alternateName: 'JunkRemovalGarbage',
    inLanguage: 'en',
    publisher: { '@id': orgId },
  };
}

export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, item: absoluteUrl(t.path) })),
  };
}

export function faqLd(items: FaqItem[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

export function serviceLd(opts: { name: string; description: string; path: string; area?: string }) {
  return {
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    serviceType: 'Junk removal',
    provider: { '@id': orgId },
    areaServed: { '@type': 'Place', name: opts.area ? `${opts.area}, Dubai` : 'Dubai' },
  };
}

export function articleLd(post: Post, description: string) {
  return {
    '@type': 'BlogPosting',
    headline: post.title.slice(0, 110),
    description,
    url: absoluteUrl(post.path),
    mainEntityOfPage: absoluteUrl(post.path),
    datePublished: post.date,
    dateModified: post.modified,
    image: post.featuredImage ? [absoluteUrl(post.featuredImage.src)] : undefined,
    author: { '@type': 'Organization', name: site.name, url: `${site.url}/` },
    publisher: { '@id': orgId },
    articleSection: post.categories[0]?.name,
    keywords: post.tags.map((t) => t.name).join(', ') || undefined,
    wordCount: post.wordCount,
  };
}

export function graph(...nodes: object[]) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
