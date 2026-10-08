// Validates every published page/post URL in the WordPress export against a running build.
// Checks: HTTP 200, self-referencing canonical, <title>, meta description, exactly one <h1>,
// no links to the old host, internal links resolve, redirects and 404 behaviour.
//
// Usage: npm run build && npm start   (in another terminal)
//        node scripts/validate-routes.mjs [baseUrl=http://localhost:3000] [xmlPath]
import fs from 'node:fs';
import path from 'node:path';
import { XMLParser } from 'fast-xml-parser';

const ROOT = path.resolve(import.meta.dirname, '..');
const BASE = (process.argv[2] || 'http://localhost:3000').replace(/\/$/, '');
const XML_PATH = process.argv[3] || path.resolve(ROOT, '..', 'junkremovalgarbage.WordPress.2026-10-07.xml');
const SITE = 'https://junkremovalgarbage.com';

const doc = new XMLParser({ ignoreAttributes: false, isArray: (n) => n === 'item' }).parse(fs.readFileSync(XML_PATH, 'utf8'));
const published = doc.rss.channel.item.filter((i) => ['page', 'post'].includes(i['wp:post_type']) && i['wp:status'] === 'publish');
const urls = published.map((i) => ({ type: i['wp:post_type'], path: new URL(String(i.link)).pathname, title: String(i.title) }));

const results = [];
const internalLinks = new Set();
let failures = 0;

const fetchText = async (p, opts = {}) => {
  const res = await fetch(BASE + p, { redirect: 'manual', ...opts });
  return { res, html: res.status === 200 ? await res.text() : '' };
};

for (const u of urls) {
  const { res, html } = await fetchText(u.path);
  const issues = [];
  if (res.status !== 200) issues.push(`status ${res.status}`);
  const canonical = (html.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
  if (canonical !== SITE + u.path) issues.push(`canonical ${canonical}`);
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1];
  if (!title) issues.push('no title');
  if (title && title.length > 70) issues.push(`long title (${title.length})`);
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1];
  if (!desc) issues.push('no meta description');
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) issues.push(`${h1s} h1`);
  if (/href="https?:\/\/(www\.)?junkremovalgarbage\.com/.test(html.replace(/<link rel="canonical"[^>]+>|<meta[^>]+>|<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '')))
    issues.push('links to old host');
  if (!/application\/ld\+json/.test(html)) issues.push('no JSON-LD');
  for (const m of html.matchAll(/href="(\/[^"#?]*)/g)) if (!m[1].startsWith('/_next')) internalLinks.add(m[1]);
  if (issues.length) failures++;
  results.push({ ...u, status: res.status, title, issues });
}

// Every internal link found on those pages must resolve (200, or a redirect for known aliases).
const brokenLinks = [];
for (const l of internalLinks) {
  const res = await fetch(BASE + l, { method: 'GET', redirect: 'manual' });
  if (res.status >= 400) brokenLinks.push(`${l} -> ${res.status}`);
}

// Extra checks.
const extra = [];
const expect = async (p, status, location) => {
  const res = await fetch(BASE + p, { redirect: 'manual' });
  const loc = res.headers.get('location');
  const ok = res.status === status && (!location || (loc && loc.endsWith(location)));
  extra.push(`${ok ? 'OK ' : 'FAIL'} ${p} -> ${res.status}${loc ? ' ' + loc : ''}`);
  if (!ok) failures++;
};
await expect('/this-page-does-not-exist/', 404);
await expect('/services/not-a-service/', 404);
await expect('/blog/page/5/', 404);
await expect('/blog/page/2/', 200);
await expect('/blogs/page/4/', 200);
await expect('/about-us', 308, '/about-us/');
await expect('/contact-us/', 308, '/contact/');
await expect('/dubai-waste-collection-services-reliable-solutions-for-homes-businesses/', 308, '/dubai-waste-collection-services/');
await expect('/?p=6757', 308, '/commercial-junk-removal/');
await expect('/sitemap.xml', 200);
await expect('/robots.txt', 200);
await expect('/feed/', 200);
await expect('/category/junk-removal-in-dubai/', 200);
await expect('/wp-content/uploads/2025/12/logo-1.png', 200);

const sitemap = await (await fetch(BASE + '/sitemap.xml')).text();
const missingFromSitemap = urls.filter((u) => !sitemap.includes(`<loc>${SITE}${u.path}</loc>`)).map((u) => u.path);

const report = {
  checkedAt: new Date().toISOString(),
  base: BASE,
  total: urls.length,
  pages: urls.filter((u) => u.type === 'page').length,
  posts: urls.filter((u) => u.type === 'post').length,
  failing: results.filter((r) => r.issues.length),
  brokenInternalLinks: brokenLinks,
  missingFromSitemap,
  extraChecks: extra,
  results,
};
fs.writeFileSync(path.join(ROOT, 'content', 'route-validation.json'), JSON.stringify(report, null, 2));

console.log(`Checked ${urls.length} URLs from the XML (${report.pages} pages, ${report.posts} posts)`);
for (const r of results) console.log(`${r.issues.length ? 'FAIL' : 'OK  '} ${r.status} ${r.path}${r.issues.length ? '  ← ' + r.issues.join('; ') : ''}`);
console.log('\nInternal links checked:', internalLinks.size, 'broken:', brokenLinks.length);
brokenLinks.forEach((b) => console.log('  BROKEN', b));
console.log('Missing from sitemap:', missingFromSitemap.length ? missingFromSitemap : 'none');
console.log('\nExtra checks:');
extra.forEach((e) => console.log('  ' + e));
console.log(failures || brokenLinks.length || missingFromSitemap.length ? '\nVALIDATION FAILED' : '\nALL CHECKS PASSED');
process.exit(failures || brokenLinks.length || missingFromSitemap.length ? 1 : 0);
