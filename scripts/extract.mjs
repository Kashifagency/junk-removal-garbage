// Extracts pages, posts, menus, SEO metadata and media references from the WordPress WXR export
// (including Elementor JSON) into normalised JSON under /content.
//
// Usage: node scripts/extract.mjs [path-to-wxr.xml]
import fs from 'node:fs';
import path from 'node:path';
import { XMLParser } from 'fast-xml-parser';
import { wpautop } from './lib/wpautop.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const XML_PATH = process.argv[2] || path.resolve(ROOT, '..', 'junkremovalgarbage.WordPress.2026-10-07.xml');
const OUT = path.join(ROOT, 'content');
const SITE = 'https://junkremovalgarbage.com';

// Business phone (replaces the old WordPress-era number +971 55 765 1866 and its typo variants everywhere).
const PHONE_DISPLAY = '+971 55 103 1255';
const PHONE_E164 = '+971551031255';
const WHATSAPP = '971551031255';
const OLD_PHONE_SPACED = /(?:\+971|\b0)[ -]?55[ -]?765[ -]?1(?:866|666|855)\b/g;
const OLD_PHONE_DIGITS = /\+?971557651(?:866|666|855)\b/g;
const replacePhones = (text) =>
  text
    .replace(OLD_PHONE_DIGITS, (m) => (m.startsWith('+') ? PHONE_E164 : WHATSAPP))
    .replace(OLD_PHONE_SPACED, PHONE_DISPLAY);

const parser = new XMLParser({
  ignoreAttributes: false,
  processEntities: true,
  htmlEntities: true,
  isArray: (n) => ['item', 'wp:postmeta', 'category', 'wp:category', 'wp:tag'].includes(n),
});
const doc = parser.parse(fs.readFileSync(XML_PATH, 'utf8'));
const channel = doc.rss.channel;
const items = channel.item;

const str = (v) => (v == null ? '' : String(v));
const meta = (it, key) => {
  const m = (it['wp:postmeta'] || []).find((x) => x['wp:meta_key'] === key);
  return m ? str(m['wp:meta_value']) : '';
};
const byId = new Map(items.map((it) => [String(it['wp:post_id']), it]));

// ---------------------------------------------------------------- text helpers
const decode = (s) =>
  str(s)
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8217;/g, '’')
    .replace(/&#8216;/g, '‘')
    .replace(/&#8220;/g, '“')
    .replace(/&#8221;/g, '”')
    .replace(/&#039;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

const plain = (s) => decode(str(s).replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();

const KEEP_UPPER = new Set(['JVC', 'JLT', 'UAE', 'LLC', 'FAQ', 'AC', 'TV', 'TVS', 'DIY', 'E-WASTE', '24/7']);
const SMALL = new Set(['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'in', 'of', 'on', 'or', 'the', 'to', 'with', 'vs', 'from']);
// Elementor headings were typed in ALL CAPS; convert those to Title Case (design handles emphasis).
export function titleCase(s) {
  const t = plain(s);
  const letters = t.replace(/[^A-Za-z]/g, '');
  const upperRatio = letters ? letters.replace(/[^A-Z]/g, '').length / letters.length : 0;
  const mostlyUpper = upperRatio >= 0.6;
  return t
    .split(' ')
    .map((w, i) => {
      if (KEEP_UPPER.has(w.toUpperCase().replace(/[^A-Z0-9/-]/g, ''))) return w.toUpperCase();
      // In mixed-case headings only convert words that are fully upper case.
      if (!mostlyUpper && !(w.length > 1 && w === w.toUpperCase() && /[A-Z]{2}/.test(w))) return w;
      const lw = w.toLowerCase();
      if (i > 0 && SMALL.has(lw)) return lw;
      return lw.replace(/(^|[-/(])([a-z])/g, (_, a, b) => a + b.toUpperCase());
    })
    .join(' ');
}

const siteRe = /https?:\/\/(?:www\.)?junkremovalgarbage\.com/gi;
// Make internal links root-relative so the new site never links to the old host.
const localiseUrls = (html) =>
  str(html)
    .replace(new RegExp(`(href|src)=(["'])${siteRe.source}(/[^"']*)?\\2`, 'gi'), (_, attr, q, p) => `${attr}=${q}${p || '/'}${q}`)
    .replace(/\s(srcset|sizes)=(["'])[^"']*\2/gi, '');

const localPath = (url) => {
  if (!url) return '';
  const m = str(url).match(/^https?:\/\/(?:www\.)?junkremovalgarbage\.com(\/.*)$/i);
  return m ? m[1] : url;
};

// ---------------------------------------------------------------- media
const media = new Map(); // url -> {url, alt, width, height, attachmentId}
const attachments = new Map();
for (const it of items.filter((i) => i['wp:post_type'] === 'attachment')) {
  const url = str(it['wp:attachment_url']);
  const metaRaw = meta(it, '_wp_attachment_metadata');
  const w = metaRaw.match(/s:5:"width";i:(\d+)/);
  const h = metaRaw.match(/s:6:"height";i:(\d+)/);
  const sizes = [...metaRaw.matchAll(/s:4:"file";s:\d+:"([^"]+)"/g)].map((m) => m[1]);
  const rec = {
    id: String(it['wp:post_id']),
    url,
    alt: plain(meta(it, '_wp_attachment_image_alt')),
    title: plain(it.title),
    width: w ? +w[1] : undefined,
    height: h ? +h[1] : undefined,
    sizes,
  };
  attachments.set(rec.id, rec);
}
const imageRef = (url, alt = '', id) => {
  if (!url) return null;
  const att = id ? attachments.get(String(id)) : [...attachments.values()].find((a) => a.url === url);
  const rec = {
    src: localPath(url),
    alt: plain(alt) || att?.alt || '',
    width: att?.url === url ? att.width : undefined,
    height: att?.url === url ? att.height : undefined,
  };
  media.set(url, { url, external: !siteRe.test(url) });
  siteRe.lastIndex = 0;
  return rec;
};

// ---------------------------------------------------------------- Elementor
// Copy fixes for template leftovers and obvious errors in the source (no new claims are added).
const COPY_FIXES = [
  [/Al Qouz Fourth/g, 'Al Quoz 4, Dubai'],
  [/same-day cargo transport services in Dubai\. For scheduled moves/g, 'same-day junk removal in Dubai. For scheduled collections'],
  [/ensures timely pickup and delivery across Dubai/g, 'ensures timely pickup across Dubai'],
  [/^which areas/i, 'Which areas'],
  [/What Our Clients Says/g, 'What Our Clients Say'],
];
const fix = (s) => COPY_FIXES.reduce((acc, [re, rep]) => acc.replace(re, rep), str(s));

function faqFromTemplate(templateId) {
  const t = byId.get(String(templateId));
  if (!t) return [];
  const out = [];
  walk(JSON.parse(meta(t, '_elementor_data') || '[]'), (e) => {
    if (e.widgetType === 'eel-faq-accordion' || e.widgetType === 'accordion' || e.widgetType === 'toggle') {
      for (const f of e.settings.faq_items || e.settings.tabs || []) {
        out.push({
          q: fix(plain(f.title || f.tab_title)).replace(/^\d+\.\s*/, ''),
          a: fix(plain(f.description || f.tab_content)),
        });
      }
    }
  });
  return out;
}

function walk(els, fn) {
  for (const e of els || []) {
    fn(e);
    if (e.elements) walk(e.elements, fn);
  }
}

// Extract the per-area "Service Areas" HTML widget into structured data.
function parseAreasHtml(html) {
  const body = html.replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<head[\s\S]*?<\/head>/gi, '');
  const h2 = plain((body.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i) || [])[1]);
  const sub = plain((body.match(/class="section-subtitle"[^>]*>([\s\S]*?)<\/p>/i) || [])[1]);
  const columns = [...body.matchAll(/<div class="area-column">([\s\S]*?)<\/div>/gi)].map((m) => ({
    title: plain((m[1].match(/<h3[^>]*>([\s\S]*?)<\/h3>/i) || [])[1]),
    items: [...m[1].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map((li) => plain(li[1])),
  }));
  if (!columns.length) return { type: 'html', html: localiseUrls(body) };
  return { type: 'areas', title: h2, subtitle: sub, columns };
}

// Convert one top-level Elementor container into a list of normalised blocks.
function convertSection(section) {
  const blocks = [];
  const handled = new Set();

  walk([section], (e) => {
    if (handled.has(e.id)) return;
    const s = e.settings || {};

    // A container holding [image, image-box] is a linked service card.
    if (e.elType === 'container' && e.elements?.length === 2) {
      const [a, b] = e.elements;
      if (a.widgetType === 'image' && b.widgetType === 'image-box') {
        blocks.push({
          type: 'card',
          title: titleCase(b.settings.title_text),
          text: fix(plain(b.settings.description_text)),
          image: imageRef(a.settings.image?.url, a.settings.image?.alt || b.settings.title_text, a.settings.image?.id),
          href: localPath(s.link?.url) || null,
        });
        walk(e.elements, (x) => handled.add(x.id));
        return;
      }
    }

    switch (e.widgetType) {
      case 'eel-easy-slider':
        for (const sl of s.easy_icon_box || []) {
          blocks.push({
            type: 'hero',
            eyebrow: fix(plain(sl.sub__title)),
            title: titleCase(sl._title),
            text: fix(plain(sl._description)),
            image: imageRef(sl.slide_image?.url, '', sl.slide_image?.id),
          });
        }
        break;
      case 'eel-heading':
      case 'eel-animated-title':
        blocks.push({ type: 'heading', eyebrow: titleCase(s.sub_title), title: fix(titleCase(s.title)), text: fix(plain(s.description)) });
        break;
      case 'heading':
        if (s.link?.url?.startsWith('tel:')) break;
        blocks.push({ type: 'heading', title: fix(titleCase(s.title)) });
        break;
      case 'text-editor': {
        const html = localiseUrls(wpautop(fix(s.editor)))
          .replace(/\sclass="ds-markdown-paragraph"/g, '')
          .replace(/<p>\s*(&nbsp;)?\s*<\/p>/g, '');
        if (plain(html)) blocks.push({ type: 'text', html });
        break;
      }
      case 'image':
        if (s.image?.url) blocks.push({ type: 'image', image: imageRef(s.image.url, s.image.alt, s.image.id) });
        break;
      case 'image-box':
        blocks.push({ type: 'card', title: titleCase(s.title_text), text: fix(plain(s.description_text)), image: imageRef(s.image?.url, s.image?.alt, s.image?.id) });
        break;
      case 'eel-icon-box':
        blocks.push({ type: 'feature', icon: s.icon?.value || s.icon || '', title: titleCase(s.procs_title), text: fix(plain(s._description)) });
        break;
      case 'icon-list':
        blocks.push({ type: 'list', items: (s.icon_list || []).map((i) => fix(plain(i.text)).replace(/:$/, '')).filter(Boolean) });
        break;
      case 'eel-tab-advance':
        for (const tab of s.tabs || []) {
          if (tab.content_source === 'template' && tab.content_template) {
            blocks.push({ type: 'faq', items: faqFromTemplate(tab.content_template) });
          }
        }
        break;
      case 'eel-faq-accordion':
        blocks.push({ type: 'faq', items: (s.faq_items || []).map((f) => ({ q: plain(f.title), a: plain(f.description) })) });
        break;
      case 'html':
        blocks.push(parseAreasHtml(s.html || ''));
        break;
      case 'google_maps':
        blocks.push({ type: 'map', address: plain(s.address) });
        break;
      case 'eel-cf7':
      case 'shortcode':
        if (e.widgetType === 'eel-cf7' || /contact-form-7/.test(s.shortcode)) blocks.push({ type: 'contactForm' });
        break;
      case 'eel-blog-grid':
        blocks.push({ type: 'postsGrid' });
        break;
      case 'eel-testimonials-slider':
        // Testimonials on the old site are theme placeholder text (unverifiable); intentionally not migrated.
        blocks.push({ type: 'omitted', reason: 'testimonials' });
        break;
      case 'eel-advace-button':
      case 'button':
        blocks.push({ type: 'button', text: plain(s.button_text || s.text), href: localPath(s.button_link?.url || s.link?.url) || null });
        break;
      default:
        break;
    }
    // Section background images (e.g. breadcrumb banner).
    if (e.elType === 'container' && s.background_image?.url && s._title === 'Breadcrumb') {
      blocks.push({ type: 'banner', image: imageRef(s.background_image.url) });
    }
  });
  return blocks;
}

function elementorBlocks(it) {
  const raw = meta(it, '_elementor_data');
  if (!raw) return [];
  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    return [];
  }
  return data.map((section) => ({ blocks: convertSection(section) })).filter((s) => s.blocks.length);
}

// ---------------------------------------------------------------- pages and posts
const pathFor = (it) => new URL(str(it.link)).pathname;
const seoFor = (it) => ({
  title: plain(meta(it, '_aioseo_title')),
  description: plain(meta(it, '_aioseo_description')),
  ogTitle: plain(meta(it, '_aioseo_og_title')),
  ogDescription: plain(meta(it, '_aioseo_og_description')),
  keywords: [...meta(it, '_aioseo_keywords').matchAll(/s:\d+:"([^"]*)"/g)].map((m) => m[1]),
});
const dates = (it) => ({
  date: str(it['wp:post_date_gmt']).replace(' ', 'T') + 'Z',
  modified: str(it['wp:post_modified_gmt']).replace(' ', 'T') + 'Z',
});
const featured = (it) => {
  const id = meta(it, '_thumbnail_id');
  const a = id && attachments.get(id);
  return a ? imageRef(a.url, a.alt || plain(it.title), a.id) : null;
};

const published = items.filter((i) => ['page', 'post'].includes(i['wp:post_type']) && i['wp:status'] === 'publish');

const pages = published
  .filter((i) => i['wp:post_type'] === 'page')
  .map((it) => ({
    id: String(it['wp:post_id']),
    type: 'page',
    path: pathFor(it),
    slug: str(it['wp:post_name']),
    parentId: String(it['wp:post_parent'] || 0),
    title: fix(titleCase(it.title)),
    rawTitle: plain(it.title),
    template: meta(it, '_wp_page_template'),
    ...dates(it),
    seo: seoFor(it),
    featuredImage: featured(it),
    sections: elementorBlocks(it),
    fallbackText: plain(it['content:encoded']).slice(0, 400),
  }))
  .map(fixServicePage);

// Service sub-pages were cloned from the construction page; remove the copied-over leftovers.
function fixServicePage(page) {
  if (!page.path.startsWith('/services/') || page.path === '/services/' || page.path.includes('construction')) return page;
  for (const s of page.sections) {
    for (const b of s.blocks) {
      if (b.type === 'heading') {
        b.title = b.title.replace(/^Why Choose Our Construction Waste Removal\?$/, `Why Choose Our ${page.title} Service?`).replace(/^Professional Construction /, 'Professional ');
      }
      if (b.type === 'list') {
        b.items = b.items
          .filter((i) => i !== 'Packaging and leftover construction materials')
          .map((i) => i.replace('Safe handling of heavy construction debris', 'Safe handling of heavy, bulky items'));
      }
    }
  }
  return page;
}

const termList = (it, domain) =>
  (it.category || [])
    .filter((c) => c['@_domain'] === domain)
    .map((c) => ({ slug: str(c['@_nicename']), name: plain(c['#text']) }));

// Internal links in post bodies that point to URLs which never existed on the site.
const LINK_FIXES = { '/contact-us/': '/contact/', '/office-clearance-dubai/': '/services/commercial-waste-management/' };
export const linkFixLog = [];

function cleanPostHtml(raw, slug) {
  // Newlines inside tags (e.g. multi-line alt text) would otherwise become <br /> in wpautop.
  let h = str(raw).replace(/<[^>]+>/g, (t) => t.replace(/\s*\n\s*/g, ' '));
  h = localiseUrls(wpautop(h));
  h = h
    .replace(/\s(data-[a-z-]+|class)="[^"]*"/gi, (m, a) => (a === 'class' && /align(left|right|center)/.test(m) ? m : ''))
    .replace(/<(\/?)h1(\s|>)/gi, '<$1h2$2')
    .replace(/<span>([\s\S]*?)<\/span>/gi, '$1')
    .replace(/<p>\s*(&nbsp;| )?\s*<\/p>/g, '');
  // All tel: links use the business number; the source had typos (…1666, …1855, missing +).
  h = h.replace(/href="tel:[^"]*"/gi, (m) => {
    if (m !== 'href="tel:+971557651866"') linkFixLog.push({ slug, from: m, to: `tel:${PHONE_E164}` });
    return `href="tel:${PHONE_E164}"`;
  });
  h = h.replace(/\+971 55 765 1666/g, '+971 55 765 1866');
  h = h.replace(/href="(\/[^"#?]*)([^"]*)"/g, (m, p, rest) => {
    if (LINK_FIXES[p]) {
      linkFixLog.push({ slug, from: p, to: LINK_FIXES[p] });
      return `href="${LINK_FIXES[p]}${rest}"`;
    }
    return m;
  });
  h = h.replace(/<a href="(https?:\/\/[^"]+)"/g, '<a href="$1" target="_blank" rel="noopener noreferrer"');
  return h;
}

const posts = published
  .filter((i) => i['wp:post_type'] === 'post')
  .map((it) => {
    const html = cleanPostHtml(it['content:encoded'], str(it['wp:post_name']));
    const excerpt = plain(it['excerpt:encoded']) || plain(html).slice(0, 220).replace(/\s+\S*$/, '') + '…';
    return {
      id: String(it['wp:post_id']),
      type: 'post',
      path: pathFor(it),
      slug: str(it['wp:post_name']),
      title: plain(it.title),
      ...dates(it),
      seo: seoFor(it),
      featuredImage: featured(it),
      categories: termList(it, 'category'),
      tags: termList(it, 'post_tag'),
      excerpt,
      html,
      oldSlugs: (it['wp:postmeta'] || []).filter((m) => m['wp:meta_key'] === '_wp_old_slug').map((m) => str(m['wp:meta_value'])),
      wordCount: plain(html).split(' ').length,
      hasElementor: !!meta(it, '_elementor_data'),
    };
  })
  .sort((a, b) => b.date.localeCompare(a.date));

// Collect inline media references from post bodies.
for (const p of posts) {
  for (const m of str(byId.get(p.id)['content:encoded']).matchAll(/https?:\/\/[^"'\s)]+\/wp-content\/uploads\/[^"'\s)]+/g)) {
    media.set(m[0], { url: m[0], external: false });
  }
}
// Always keep every attachment original (also preserves old /wp-content/uploads/ image URLs).
for (const a of attachments.values()) if (!media.has(a.url)) media.set(a.url, { url: a.url, external: false, unreferenced: true });

// ---------------------------------------------------------------- menus
const menus = {};
for (const it of items.filter((i) => i['wp:post_type'] === 'nav_menu_item')) {
  const menu = (it.category || []).find((c) => c['@_domain'] === 'nav_menu');
  if (!menu) continue;
  const objId = meta(it, '_menu_item_object_id');
  const target = byId.get(objId);
  const entry = {
    id: String(it['wp:post_id']),
    parent: meta(it, '_menu_item_menu_item_parent'),
    order: +it['wp:menu_order'],
    label: plain(it.title) || (target ? fix(titleCase(target.title)) : ''),
    href: meta(it, '_menu_item_type') === 'custom' ? meta(it, '_menu_item_url') : target ? pathFor(target) : '',
  };
  (menus[plain(menu['#text'])] ||= []).push(entry);
}
const tree = (list) => {
  const sorted = [...list].sort((a, b) => a.order - b.order);
  const top = sorted.filter((e) => e.parent === '0');
  return top.map((t) => ({ label: t.label, href: t.href, children: sorted.filter((c) => c.parent === t.id).map(({ label, href }) => ({ label, href })) }));
};
const navigation = {
  primary: tree(menus['Primary Menu'] || []),
  footer: tree(menus['Footer Menu 2'] || []),
};

// ---------------------------------------------------------------- site / business details
const site = {
  url: SITE,
  name: 'Shanan Junk Removal',
  legalName: 'Shanan Cargo Transport LLC',
  wpTitle: plain(channel.title),
  phone: PHONE_DISPLAY,
  phoneE164: PHONE_E164,
  whatsapp: WHATSAPP,
  email: 'shanancargotransportsofficial@gmail.com',
  address: { street: 'Al Quoz 4', locality: 'Dubai', country: 'AE' },
  logo: imageRef(`${SITE}/wp-content/uploads/2025/12/logo-1.png`, 'Shanan Junk Removal logo'),
  defaultFaq: faqFromTemplate(759),
};

// ---------------------------------------------------------------- terms
const terms = { categories: {}, tags: {} };
for (const c of channel['wp:category'] || []) terms.categories[str(c['wp:category_nicename'])] = plain(c['wp:cat_name']);
for (const t of channel['wp:tag'] || []) terms.tags[str(t['wp:tag_slug'])] = plain(t['wp:tag_name']);

// ---------------------------------------------------------------- write
fs.mkdirSync(OUT, { recursive: true });
const write = (f, d) => fs.writeFileSync(path.join(OUT, f), replacePhones(JSON.stringify(d, null, 2)));
write('site.json', site);
write('link-fixes.json', linkFixLog);
write('navigation.json', navigation);
write('pages.json', pages);
write('posts.json', posts);
write('terms.json', terms);
write('media.json', [...media.values()].sort((a, b) => a.url.localeCompare(b.url)));
write(
  'routes.json',
  published.map((it) => ({ id: String(it['wp:post_id']), type: it['wp:post_type'], path: pathFor(it), title: plain(it.title) })),
);

console.log(`pages: ${pages.length}, posts: ${posts.length}, media refs: ${media.size}`);
console.log('menus:', Object.keys(menus).join(', '));
