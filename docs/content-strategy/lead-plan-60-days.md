# 60-day lead plan (12 Oct – 6 Dec 2026) — without Google Business Profile

## Strategy

This business is **not using Google Business Profile**, so the site won't appear in the Google Maps "map pack". All organic leads have to come from **ranking web pages**. That shapes the plan:

- **Area pages are the main lead engine.** "junk removal [area]" searches are easy to win, and the site has **43 unique area pages**. Competitors have almost none. Each one is a separate chance to rank and convert.
- **Service and item pages capture the bigger keywords:** junk removal dubai, furniture removal dubai, sofa disposal, construction waste removal, and so on.
- **Articles build topical authority** and feed visitors to the money pages through internal links.
- **Directories, listings and outreach** add trust signals and referral traffic, without needing a Google profile.
- **Google Ads (optional)** is the only day-1 traffic source. Without the map pack, it's the most reliable bridge while organic rankings build.

## Realistic expectations

- **Organic rankings take time.** New pages on a modest domain usually need 4–12 weeks to settle. Area pages and long-tail item pages tend to rank first, because competition is weak. Broad terms like "junk removal dubai" take longer.
- **Search Console data drives decisions.** Impressions appear within 1–3 weeks of indexing. Double down on pages that get impressions.
- **Seasonality helps.** October to April is Dubai's winter leasing season, with move-ins, move-outs and renovations.

## KPIs (check weekly)

| Metric | Where | Week 4 target | Week 8 target |
|---|---|---|---|
| Leads: calls + WhatsApp clicks + form submissions | Vercel Analytics events (`call_click`, `whatsapp_click`, `form_submit`), Resend inbox | Baseline +50% | Baseline ×2–3 |
| Clicks from Google | Search Console → Performance | Baseline +30% | Baseline ×2 |
| Area pages with impressions | Search Console (filter pages containing area slugs) | 20 of 43 | 35+ of 43 |
| Queries ranking in the top 10 | Search Console | 15 | 40+ |
| Indexed pages | Search Console → Pages | All area and service pages indexed | — |

Record the **baseline in week 1**: last 28 days of Search Console clicks and the number of leads.

## Week by week

### Week 1 (12–18 Oct): indexing and tracking
- [ ] **Tracking:** enable Vercel Analytics (Vercel → Analytics → Enable). The call, WhatsApp and form events are already built in.
- [ ] **Search Console:**
  - Resubmit `/sitemap.xml`.
  - Use **URL Inspection → Request indexing** on the home page, the 5 service pages and the most important area pages, in batches each day.
  - Check Pages → "Not indexed" reasons.
- [x] **Contact form** works (Resend).
- [ ] **Area images:** generate the area photos in Antigravity from `article-images/area-image-prompts-list.txt`. Do 10–15 per day, then run `/write-articles` or `npm run images:process`.
- [ ] Approve and publish the Dubai Municipality bulky-waste guide (queue #1).
- [ ] Daily articles from the queue (`/article-image-prompts` → Antigravity → `/write-articles`).

### Week 2 (19–25 Oct): consolidate the old blog
- [ ] Keep working through the article queue. Each row carries out its part of the content audit (`replaces` / `redirectFrom`).
- [ ] **Directories, batch 1.** Use the same name, address and phone everywhere:
  - Yellow Pages UAE (confirm the correct official domain first)
  - Connect.ae
  - YallaBanana
  - ExpatWoman directory
  - your Facebook and Instagram pages
- [ ] **Customer testimonials:** ask happy customers on WhatsApp whether you may quote their feedback and first name on the website. Only use real, permitted feedback (see content-rules.md).

### Week 3 (26 Oct – 1 Nov): money-page depth
- [ ] Add 2–3 real job photos per service page whenever available.
- [ ] Check Search Console for area pages with impressions but low clicks, and improve their titles and descriptions.
- [ ] **Classifieds:** post service listings on dubizzle (services) and mourjan.com (Arabic classifieds, removal category). Link back to the most relevant area or service page.

### Week 4 (2–8 Nov): review and outreach
- [ ] **Directories, batch 2:** Yalwa UAE, 123UAE, GetListedAE, Foursquare.
- [ ] **Editorial outreach:** email the Property Finder, Bayut and Dubizzle editors who publish junk-removal and bulky-waste guides. Ask to be included as a provider, with accurate details and photos.
- [ ] **Week-4 review:** compare KPIs with the baseline, and shift effort to whatever is getting impressions.

### Weeks 5–6 (9–22 Nov): expand what works
- [ ] Refresh the area pages and articles that get the most impressions. Add a local detail, an FAQ or a photo.
- [ ] Internal links: articles that mention an area should link to its area page, and vice versa. The "Guides" sections do this automatically when `areas:` is filled in.
- [ ] Consider the Arabic pages (P3 in keyword-roadmap.md). Competition is almost non-existent.

### Weeks 7–8 (23 Nov – 6 Dec): convert and compound
- [ ] **Conversion tuning:** for pages with visits but no leads, strengthen the opening and the calls to action.
- [ ] **New area pages:** add more only where Search Console shows demand, each with genuinely unique content (content-rules.md §2b).
- [ ] Write the next 60-day plan from the data.

## Optional: Google Ads (fastest leads without the map pack)
- **Campaign:** a Search campaign on exact and phrase match money keywords: junk removal dubai, furniture removal dubai, sofa disposal dubai, construction waste removal dubai, and junk removal [top areas].
- **Landing pages:** the matching area or service page, never the homepage.
- **Assets:** call assets with +971 55 103 1255.
- **Negative keywords:** jobs, salary, buy, sell, second hand, free.
- **Tracking:** use the same conversions as above.

## Weekly routine (30–60 minutes)
1. **Search Console:** new queries, pages with impressions but low clicks, and indexing problems.
2. **Lead log:** date, source (organic / ads / directory / referral), channel (call / WhatsApp / form), service, area, won or lost.
3. **Content:** publish or refresh articles following the queue.
