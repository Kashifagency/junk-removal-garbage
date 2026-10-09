# Content audit — the 38 legacy WordPress posts

**Problem:** 36 of 38 posts are thin (140–680 words). About 12 compete for "junk removal dubai", 4 for "furniture removal dubai" and 3 for "construction waste removal dubai". Several of those also compete with the matching **service page**. This keyword cannibalisation splits ranking signals and makes the site look low-quality. One post is off-topic (cleaning services), one targets a competitor's brand name ("Take My Junk"), and 11 mention donating items, which the business doesn't do.

**Fix:** consolidate **38 → 13 strong posts**, plus new money pages from the keyword roadmap. For every 301:
1. Move any genuinely useful content (unique tips, local detail) into the target page before redirecting.
2. Add the redirect to `next.config.ts` (snippet below).
3. Rewrite the target page properly, using the blueprints in content-structure.md.
4. Never redirect to a page that doesn't exist yet. For `/sofa-disposal-dubai/` and `/same-day-junk-removal-dubai/`, publish the new page first.

**Order of work (lead plan week 2 onwards):** G1 → G5 → G9 → G3 → G7 → G8 → G6 → G4 → G2 → G10 → G11.

| Group | URL | Words | Action | Notes |
|---|---|---|---|---|
| G1 | `/cheap-junk-removal-dubai/` | 338 | REFRESH | Owner of "cheap / affordable junk removal dubai". Rewrite honestly (price factors, no "cheapest" claims). |
| G1 | `/junk-removal-garbage-in-dubai-affordable-reliable-service/` | 676 | 301 → /junk-removal-services-in-dubai-a-complete-guide-for-homes-businesses/ | Generic duplicate of "junk removal dubai". |
| G1 | `/junk-removal-near-me-dubai/` | 407 | 301 → /junk-removal-services-in-dubai-a-complete-guide-for-homes-businesses/ | Generic duplicate. "near me" is won by GBP + home. |
| G1 | `/junk-removal-service-in-dubai/` | 386 | 301 → /junk-removal-services-in-dubai-a-complete-guide-for-homes-businesses/ | Generic duplicate. |
| G1 | `/junk-removal-garbage-services-in-dubai-2026/` | 588 | 301 → /junk-removal-services-in-dubai-a-complete-guide-for-homes-businesses/ | Generic duplicate, and the year in the URL dates it. |
| G1 | `/junk-removal-services-in-dubai-a-complete-guide-for-homes-businesses/` | 566 | REFRESH (hub) | Becomes THE complete guide to junk removal in Dubai (2,000+ words). Supports the homepage, links to all services. Absorbs 6 generic posts. |
| G1 | `/take-my-junk-dubai-complete-removal-service/` | 576 | 301 → /junk-removal-services-in-dubai-a-complete-guide-for-homes-businesses/ | "Take My Junk" is a competitor brand name, so do not target it. |
| G1 | `/junk-removal-dubai-fast-affordable-service/` | 144 | 301 → /junk-removal-services-in-dubai-a-complete-guide-for-homes-businesses/ | Thin (144 words). |
| G2 | `/professional-junk-removal/` | 2759 | KEEP | Strong long-form guide. Absorbs `professional-junk-removal-service-dubai`. Remove the donation mentions. |
| G2 | `/professional-junk-removal-service-dubai/` | 430 | 301 → /professional-junk-removal/ | Thin duplicate. |
| G3 | `/garbage-pickup-dubai/` | 227 | REFRESH (owner) | Owner of "garbage pickup / garbage collection dubai". Absorbs 3 posts. |
| G3 | `/dubai-waste-collection-services/` | 357 | 301 → /garbage-pickup-dubai/ | Thin duplicate. |
| G3 | `/waste-management-near-me-dubai/` | 391 | 301 → /garbage-pickup-dubai/ | Thin duplicate. |
| G3 | `/garbage-pickup-dubai-same-day-service/` | 264 | 301 → /garbage-pickup-dubai/ | Duplicate. |
| G4 | `/same-day-junk-removal-dubai-fast-emergency-service/` | 490 | 301 → /same-day-junk-removal-dubai/ (new) | Merge into the new clean-URL same-day page (calendar #11). |
| G4 | `/same-day-junk-removal-services-dubai-quick-cleanup/` | 162 | 301 → /same-day-junk-removal-dubai/ (new) | Thin (162 words). |
| G5 | `/furniture-removal-dubai-2/` | 563 | 301 → /services/furniture-appliance-disposal/ | Duplicate of the money keyword. Move any useful lines into the service page first. |
| G5 | `/old-furniture-removal-dubai/` | 283 | REFRESH | Long-tail owner of "old furniture disposal dubai". Supports the furniture service page. Remove the donation mentions. |
| G5 | `/furniture-removal-services-dubai/` | 353 | 301 → /services/furniture-appliance-disposal/ | Duplicate of the money keyword. |
| G5 | `/furniture-removal-dubai/` | 330 | 301 → /services/furniture-appliance-disposal/ | Duplicate of the money keyword. |
| G5 | `/furniture-disposal-dubai-sofa-bed-removal-service/` | 281 | 301 → /sofa-disposal-dubai/ (new) | Merge into the new sofa page (calendar #2). |
| G6 | `/washing-machine-removal-dubai/` | 240 | 301 → /appliance-removal-services-dubai/ | Merge into the appliance page. |
| G6 | `/bed-and-mattress-removal-dubai/` | 258 | REFRESH (owner) | Owner of "mattress disposal dubai" (calendar #3). |
| G6 | `/appliance-removal-services-dubai/` | 312 | REFRESH (owner) | Owner of "appliance removal dubai" (calendar #4). Absorbs the washing machine post. |
| G7 | `/residential-junk-removal-dubai/` | 489 | 301 → /house-cleanout-dubai-complete-home-clearing-service/ | Thin duplicate of household clearance. |
| G7 | `/house-cleanout-dubai-complete-junk-removal-service/` | 449 | 301 → /house-cleanout-dubai-complete-home-clearing-service/ | Duplicate. |
| G7 | `/house-cleanout-dubai-complete-home-clearing-service/` | 477 | REFRESH (owner) | Owner of "house / villa clearance dubai" (calendar #8). Absorbs 2 posts. Remove the donation mentions. |
| G8 | `/commercial-junk-removal/` | 2934 | KEEP | Strong long-form guide (2,900+ words). Add links to /services/commercial-waste-management/ and Downtown/Business Bay. Absorbs `commercial-junk-removal-dubai`. Remove the donation mentions. |
| G8 | `/office-furniture-removal-dubai/` | 224 | REFRESH | Owner of "office furniture disposal dubai" (224 words → 1,200+). Remove the donation mentions. |
| G8 | `/commercial-junk-removal-dubai/` | 234 | 301 → /commercial-junk-removal/ | Thin duplicate (234 words). |
| G8 | `/warehouse-waste-removal-dubai/` | 227 | REFRESH | Owner of "warehouse clearance dubai" (227 words → 1,000+). |
| G8 | `/office-junk-removal-dubai/` | 239 | 301 → /office-cleanout-dubai-complete-commercial-clearing-service/ | Thin duplicate of office clearance. |
| G8 | `/office-cleanout-dubai-complete-commercial-clearing-service/` | 484 | REFRESH (owner) | Owner of "office clearance dubai" (calendar #7). Absorbs the office junk post. |
| G9 | `/construction-waste-removal-dubai/` | 348 | 301 → /services/construction-waste-removal/ | Slug = money keyword, so it competes with the service page. Move the best content into the service page. |
| G9 | `/construction-removal-service-in-dubai-2026/` | 490 | 301 → /services/construction-waste-removal/ | Duplicate of the money keyword, and the year in the URL dates it. |
| G9 | `/construction-waste-removal-dubai-best-price-fast-service/` | 263 | 301 → /services/construction-waste-removal/ | Duplicate of the money keyword. |
| G10 | `/garden-waste-removal-dubai/` | 510 | REFRESH | Rewrite as a supporting guide for villa garden waste (calendar #10). Must link to /services/yard-garden-waste-cleanup/. Remove the off-topic tags. |
| G11 | `/cleaning-services-dubai/` | 413 | 301 → /services/household-junk-removal/ | OFF-TOPIC (we are not a cleaning company). Remove from the blog. |

## Groups
- **G1 Generic "junk removal dubai":** all merge into the refreshed complete guide (`/junk-removal-services-in-dubai-a-complete-guide-for-homes-businesses/`), which supports the homepage. `cheap-junk-removal-dubai` stays, refreshed for the affordable angle.
- **G2 Professional:** merge into `/professional-junk-removal/`.
- **G3 Garbage pickup / collection:** merge into `/garbage-pickup-dubai/`.
- **G4 Same-day:** new `/same-day-junk-removal-dubai/`, then redirect both old same-day posts.
- **G5 Furniture:** keyword owned by `/services/furniture-appliance-disposal/`. Duplicates 301 there. `old-furniture-removal-dubai` stays as long-tail. The sofa/bed post goes into the new sofa page.
- **G6 Appliances & mattresses:** `appliance-removal-services-dubai` and `bed-and-mattress-removal-dubai` are refreshed as owners.
- **G7 House clearance:** merge into `/house-cleanout-dubai-complete-home-clearing-service/`.
- **G8 Office & commercial:** office clearance, office furniture and warehouse pages refreshed. Duplicates merged.
- **G9 Construction:** keyword owned by `/services/construction-waste-removal/`. All 3 posts 301 there. New supporting article: `/construction-waste-disposal-rules-dubai/`.
- **G10 Garden:** refresh as a supporting article.
- **G11 Off-topic:** redirect.

## Redirect snippet (add to `redirects()` in next.config.ts once each target is ready)

```ts
    { source: '/junk-removal-garbage-in-dubai-affordable-reliable-service/', destination: '/junk-removal-services-in-dubai-a-complete-guide-for-homes-businesses/', permanent: true },
    { source: '/junk-removal-near-me-dubai/', destination: '/junk-removal-services-in-dubai-a-complete-guide-for-homes-businesses/', permanent: true },
    { source: '/junk-removal-service-in-dubai/', destination: '/junk-removal-services-in-dubai-a-complete-guide-for-homes-businesses/', permanent: true },
    { source: '/junk-removal-garbage-services-in-dubai-2026/', destination: '/junk-removal-services-in-dubai-a-complete-guide-for-homes-businesses/', permanent: true },
    { source: '/take-my-junk-dubai-complete-removal-service/', destination: '/junk-removal-services-in-dubai-a-complete-guide-for-homes-businesses/', permanent: true },
    { source: '/junk-removal-dubai-fast-affordable-service/', destination: '/junk-removal-services-in-dubai-a-complete-guide-for-homes-businesses/', permanent: true },
    { source: '/professional-junk-removal-service-dubai/', destination: '/professional-junk-removal/', permanent: true },
    { source: '/dubai-waste-collection-services/', destination: '/garbage-pickup-dubai/', permanent: true },
    { source: '/waste-management-near-me-dubai/', destination: '/garbage-pickup-dubai/', permanent: true },
    { source: '/garbage-pickup-dubai-same-day-service/', destination: '/garbage-pickup-dubai/', permanent: true },
    { source: '/same-day-junk-removal-dubai-fast-emergency-service/', destination: '/same-day-junk-removal-dubai/', permanent: true },
    { source: '/same-day-junk-removal-services-dubai-quick-cleanup/', destination: '/same-day-junk-removal-dubai/', permanent: true },
    { source: '/furniture-removal-dubai-2/', destination: '/services/furniture-appliance-disposal/', permanent: true },
    { source: '/furniture-removal-services-dubai/', destination: '/services/furniture-appliance-disposal/', permanent: true },
    { source: '/furniture-removal-dubai/', destination: '/services/furniture-appliance-disposal/', permanent: true },
    { source: '/furniture-disposal-dubai-sofa-bed-removal-service/', destination: '/sofa-disposal-dubai/', permanent: true },
    { source: '/washing-machine-removal-dubai/', destination: '/appliance-removal-services-dubai/', permanent: true },
    { source: '/residential-junk-removal-dubai/', destination: '/house-cleanout-dubai-complete-home-clearing-service/', permanent: true },
    { source: '/house-cleanout-dubai-complete-junk-removal-service/', destination: '/house-cleanout-dubai-complete-home-clearing-service/', permanent: true },
    { source: '/commercial-junk-removal-dubai/', destination: '/commercial-junk-removal/', permanent: true },
    { source: '/office-junk-removal-dubai/', destination: '/office-cleanout-dubai-complete-commercial-clearing-service/', permanent: true },
    { source: '/construction-waste-removal-dubai/', destination: '/services/construction-waste-removal/', permanent: true },
    { source: '/construction-removal-service-in-dubai-2026/', destination: '/services/construction-waste-removal/', permanent: true },
    { source: '/construction-waste-removal-dubai-best-price-fast-service/', destination: '/services/construction-waste-removal/', permanent: true },
    { source: '/cleaning-services-dubai/', destination: '/services/household-junk-removal/', permanent: true },
```

After deploying redirects:
1. Remove the redirected posts from `content/posts.json` (the developer can add a skip list in `scripts/extract.mjs`), so they leave the blog, sitemap and RSS feed.
2. Update `scripts/validate-routes.mjs` to expect 308 for those URLs, then run `npm run validate:routes`.
3. In Search Console, inspect a few redirected URLs and resubmit the sitemap.
