# Migration report: junkremovalgarbage.com → Next.js

Source: `junkremovalgarbage.WordPress.2026-10-07.xml` (WordPress 6.9.10, Elementor 3.34, All in One SEO).
Status: built and validated locally, ready to deploy on Vercel. WordPress will be shut down after launch.

**Decisions since the first report:**

- **Hosting:** Vercel, with the domain connected to Vercel.
- **Quote-form email:** Resend.
- **Business phone / WhatsApp:** +971 55 103 1255.
- **WordPress:** shut down once the new site is live.

## 1. URL coverage

| | Count | Result |
| --- | --- | --- |
| Published pages in the XML | 24 | All return 200 at the same path |
| Published posts in the XML | 38 | All return 200 at the same path (`/%postname%/`) |
| **Total** | **62** | All pass `npm run validate:routes` |

For each of the 62 URLs, the validator checks:

- HTTP 200
- a self-referencing canonical on `https://junkremovalgarbage.com`
- a title and a meta description
- exactly one `<h1>`
- JSON-LD present
- no links back to the old host
- the URL is listed in `sitemap.xml`

It also follows all 141 internal links found on those pages, and none are broken. Full output: `content/route-validation.json`.

Routes added to keep WordPress behaviour:

- **Blog pagination:** `/blog/page/2/` to `/blog/page/4/`, 10 posts per page, the same as the live site (where `/page/5/` returns 404). The same pagination exists for `/blogs/` and `/category/junk-removal-in-dubai/`.
- **Archives:** `/category/junk-removal-in-dubai/`, plus 75 tag archives at `/tag/{slug}/`. Tag archives are set to noindex,follow because they are thin.
- **Feeds and SEO files:** `/feed/` (RSS), `/sitemap.xml`, `/robots.txt`.
- **404 handling:** unknown URLs return a real 404 status with a custom page.

## 2. Redirects implemented (need separate verification)

| From | To | Why |
| --- | --- | --- |
| 5 old post slugs (`_wp_old_slug`), e.g. `/dubai-waste-collection-services-reliable-solutions-for-homes-businesses/` | the current post URL | WordPress redirected these automatically |
| `/contact-us/` | `/contact/` | Linked from a post but never existed |
| `/office-clearance-dubai/` | `/services/commercial-waste-management/` | Linked from a post but never existed |
| `/?p={id}`, `/?page_id={id}` | the pretty URL | WordPress plain permalinks (handled in `proxy.ts`) |
| `/blog/page/1/`, `/blogs/page/1/` | `/blog/`, `/blogs/` | WordPress aliases |
| `/rss/`, `/blog/feed/` | `/feed/` | Feed aliases |
| `/sitemap_index.xml`, `/post-sitemap.xml`, `/page-sitemap.xml`, `/category-sitemap.xml`, `/post_tag-sitemap.xml`, `/sitemap.rss` | `/sitemap.xml` | Old AIOSEO sitemap URLs |
| URLs without a trailing slash | the same URL with a slash (308) | `trailingSlash: true` |

**Do these before WordPress is shut down. They can't be recovered afterwards.**

- **Redirects outside the XML.** The export does not include `.htaccess` rules, the AIOSEO Redirects module, or redirects from other plugins and the host. Check them in WP Admin (AIOSEO → Redirects, and any redirect plugin) and in the hosting panel. Send me any you find and I'll add them to `next.config.ts`.
- **Backups.** Keep the XML export and a full WordPress backup (files + database) somewhere safe, in case anything needs recovering later.
- **Live header scripts.** Note any analytics or tracking codes the live site uses (Google Analytics, Tag Manager, Meta Pixel), so they can be set up on the new site.

**Handled by Vercel:** HTTP→HTTPS happens automatically. For www→non-www, set `junkremovalgarbage.com` as the primary domain and have www redirect to it (see the README).
- **WordPress URLs that are not rebuilt** and will now return 404:
  - author archives (`/author/...`)
  - date archives
  - attachment pages
  - `/wp-json/`, `/wp-admin/`
  - `/comments/feed/`
  - the empty WordPress categories Freight, Logistic, Shipping and Uncategorized

  Check Search Console for any of these that receive traffic.
- **Old blog-widget pagination.** The old Elementor grid paginated with query strings (`/blog/?paged_c593752=2`, `/blogs/?paged_a435e3f=2`). Those URLs now show page 1, which matches their old canonical. The crawlable equivalents are `/blog/page/N/`.
- **Duplicate listings.** `/blog/` and `/blogs/` list the same posts, and both had self-canonicals on the live site, which is preserved here. Consider pointing one at the other (canonical or 301) after launch.

## 3. SEO metadata

- **Pages:** the XML has **no** AIOSEO title or description for any of the 24 pages. New ones were written in `content/page-seo.json`, each 65 characters or less.
- **Post titles:** 2 posts had AIOSEO titles and were preserved as-is. The other 36 had none, so a title was derived from the post title: the part before its first "–", "|" or ":", plus the brand name while the whole title stays at 65 characters or less.
- **Post descriptions:** 18 posts had AIOSEO descriptions and were preserved. The other 20 got a description generated from the first sentences of the post.
- **Every page has:**
  - a canonical URL
  - Open Graph and Twitter tags
  - BreadcrumbList JSON-LD
  - site-wide LocalBusiness and WebSite JSON-LD
- **Extra structured data by page type:**
  - Service on service and area pages
  - FAQPage where the FAQ is shown
  - BlogPosting on posts
  - CollectionPage on listings
- **Fixes inside post content:**
  - `<h1>` tags became `<h2>`, so each page has one H1
  - ChatGPT `data-start`/`data-end` attributes were removed
  - stray `<br>` tags inside image alt text were fixed

## 4. Media

- **99 of 99** upload files referenced from the site's own domain were downloaded to `public/wp-content/uploads/`, keeping their original paths. **0 missing.** All 88 attachment originals are included.
- **1 external image was not downloaded:** `https://reactheme.com/products/wordpress/logixpress/wp-content/uploads/2025/10/3-2.webp`. It was a theme-demo banner on the Careers page, not a business asset.
- Page images go through `next/image`, which serves AVIF/WebP at responsive sizes. Images inside post bodies keep the WordPress-resized files (e.g. `-600x600.png`) as lazy-loaded `<img>` tags.
- The header uses a cropped version of `logo-1.png`. The favicon and apple-touch icon were made from the logo mark.
- Report: `content/media-report.json`.

## 5. Content changes and things not migrated (need client review)

**Deliberately not migrated**

- **Testimonials** ("Ahmed Raza, Operations Manager, Gulf Trade LLC", etc.). These are the theme's placeholder entries, repeated on every page, and cannot be verified. Publishing them as real reviews would be misleading. If the business has genuine reviews (for example from Google Business Profile), add them.
- **Careers job listings.** All 10 jobs ("Freight Handling Specialist", "Logistics Systems Engineer", …) are logistics-theme demo content. They were replaced with a general careers enquiry page that says no vacancies are listed.
- **Theme leftovers.** The hero slider's "Fast Global Shipping / End-to-End Tracking / …" features and the logistics one-page menus were dropped.
- **Comments.** The 20 comments in the export are all automatic internal pingbacks between posts, so none were migrated, and no comment form was rebuilt.

**Wording corrections, with no new claims added**

- **FAQ:** "same-day cargo transport services… scheduled moves… pickup and delivery" became the junk-removal equivalent.
- **Service pages (copied from the construction page):**
  - the "Why Choose Our Construction Waste Removal?" heading was fixed on the household and yard pages
  - "Professional Construction Furniture & Appliance Disposal" became "Professional Furniture & Appliance Disposal"
  - the stray list item "Packaging and leftover construction materials" was removed from the furniture and yard pages
- **Home page:** the second "Why choose us" card repeated the first card's text, so the cards use the cleaner copy from the location pages.
- **Address:** "Al Qouz Fourth" became "Al Quoz 4, Dubai".
- **Headings:** ALL-CAPS Elementor headings were converted to Title Case.

**Phone number.** The site now uses **+971 55 103 1255** everywhere:

- the header, footer, buttons, mobile action bar and structured data
- every `tel:` link
- WhatsApp links (`wa.me/971551031255`)
- the hero and contact copy, the FAQ answers, page SEO descriptions, and 38 posts

The extractor replaces the old number +971 55 765 1866 in every format it appeared in, including the typo variants in the source (…765 1666, …7651855, and the number without +971). 16 broken `tel:` links in posts were rewritten as part of this; the list is in `content/link-fixes.json`.

**Points the client should confirm**

- **Claims from the original copy, kept as they were:** "fully insured", "licensed", "24/7 availability", "same-day service", "transparent pricing, no hidden fees".
- **Email address:** the site shows `shanancargotransportsofficial@gmail.com`, but the WordPress account uses `shanancargotransportofficial@gmail.com` (no "s"). Confirm which one should receive enquiries.
- **Brand names differ across sources:**
  - logo: "JunkRemovalGarbage"
  - page copy: "Shanan Junk Removal"
  - copyright: "Shanan Cargo Transport LLC"
  - the truck in the hero photo: "Shanan Transports LLC"

  The site currently uses Shanan Junk Removal as the name, JunkRemovalGarbage as the alternate name, and Shanan Cargo Transport LLC as the legal name.
- **Outbound links:** 7 posts link to `https://junkremovalsservicesindubai.com/`, a different domain. They were kept as they were (opening in a new tab). Confirm this is intended.
- **Missing business details:** no opening hours, exact street address or social profiles exist in the export, so none were added to the LocalBusiness data. Add them if available.

## 6. Configuration required before launch (Vercel + Resend)

1. **Deploy to Vercel.** Import the repo with **Root Directory** set to `website`. Commit `public/wp-content/uploads/` (about 29 MB); it holds every site image now that WordPress is going away.
2. **Resend.**
   - Verify `junkremovalgarbage.com` in Resend by adding its SPF/DKIM DNS records. The form sends from `quotes@junkremovalgarbage.com`.
   - Set `RESEND_API_KEY` in Vercel, then redeploy. It is the only environment variable the site uses. Enquiries go to the business email shown on the site; the addresses are set in `app/api/quote/route.ts`.
   - Without the key, `/api/quote/` returns a 503 and tells visitors to call or WhatsApp. Calls, WhatsApp and the form's "Send via WhatsApp" button work without any setup.
3. **Domain.**
   - Add `junkremovalgarbage.com` and `www` in Vercel → Domains, with the non-www domain as primary.
   - Point DNS at Vercel as instructed.
   - Keep any existing MX/email DNS records when changing DNS, so mailboxes keep working.
4. **Spam protection.** The form has a honeypot field and a best-effort rate limit (per function instance). Consider adding Cloudflare Turnstile or the Vercel Firewall if spam appears.
5. **Analytics and verification.** No analytics script is built in. Vercel Web Analytics can be enabled from the dashboard. Verify Google Search Console with a DNS TXT record at your domain provider.
6. **Maps.** Area and contact pages use keyless Google Maps embeds. No setup is needed.
7. **After launch.**
   - Submit `/sitemap.xml` in Google Search Console and watch the coverage report for 404s.
   - Update the phone number on the Google Business Profile, WhatsApp Business and other listings to +971 55 103 1255, so it matches the website.
