# 60-day lead plan (12 Oct – 6 Dec 2026)

## Realistic expectations

- **Organic blog rankings take time.** New articles on a domain with modest authority usually need 4–12 weeks to settle. Within 60 days, most leads will come from **Google Business Profile (GBP) and the existing money pages** (service and area pages), helped by the content and fixes below. Blog articles start contributing in weeks 6–8 and compound after that.
- **The fastest guaranteed traffic is Google Ads**, which works from day 1 and is optional. If the budget exists, run a small Search campaign on 10–20 exact and phrase money keywords (see the keyword roadmap, cluster A) pointing at the service pages. Treat it as the lead bridge while SEO builds.
- **Seasonality is on our side.** October to April is Dubai's winter leasing season (new move-ins, move-outs, renovations), so demand for clear-outs is rising now. Sources are in research-notes.md.

## KPIs (check weekly)

| Metric | Where | Week 4 target | Week 8 target |
|---|---|---|---|
| Leads: calls + WhatsApp clicks + form submissions | Vercel Analytics events (`call_click`, `whatsapp_click`, `form_submit`), GBP Insights, Resend inbox | Baseline +50% | Baseline ×2–3 |
| GBP calls / website clicks / direction requests | GBP Performance | Growing weekly | Growing weekly |
| Google reviews (genuine customers only) | GBP | +8 | +20 |
| Clicks from Google | Search Console → Performance | Baseline +30% | Baseline ×2 |
| Money pages in the top 10 (local) | Search Console (filter by page) | 5 queries | 15+ queries |
| Indexed pages | Search Console → Pages | All new pages indexed | — |

Record the **baseline in week 1**: last 28 days of Search Console clicks, GBP calls and leads.

## Week by week

### Week 1 (12–18 Oct): foundations and tracking
- [ ] **Tracking.**
  - Vercel Analytics plus call, WhatsApp and form events are **already built into the site**. Turn them on in Vercel → Analytics → Enable. Custom events need Vercel Pro; page views work on Hobby.
  - Use a unique WhatsApp greeting per source (website vs GBP) so you can tell them apart.
- [ ] **Search Console.**
  - Confirm the sitemap is processed.
  - Check Pages → "Not indexed" reasons.
  - Request indexing for home, the 5 service pages and the 10 area pages.
- [ ] **Google Business Profile.** Full checklist in local-seo-playbook.md.
  - Primary category, services, service areas (all 10 areas plus Dubai), description, opening hours, and phone **055 103 1255**.
  - Add 15+ real photos of the truck, crew and jobs.
- [ ] **NAP consistency.** Update the phone number everywhere: GBP, WhatsApp Business, Facebook/Instagram, any old listings.
- [x] **Contact form.** Working via Resend (no domain verification needed). Send yourself a test after any change.
- [ ] Publish article #1, the Dubai Municipality bulky waste guide (already drafted). Review the facts, then set `draft: false`.

### Week 2 (19–25 Oct): consolidate the old blog (biggest SEO lift)
- [ ] Do the **merge and redirect plan** in content-audit.md, groups 1–4: merge thin duplicates into the strongest URL, rewrite that URL properly, and add 301s in `next.config.ts`.
- [ ] Start **reviews**: message every customer from the last 3 months with the GBP review link. Ask after every job from now on.
- [ ] **Citations, batch 1:** Bing Places, Apple Business Connect, Facebook page, Yellow Pages UAE, Connect.ae. Same name, address and phone everywhere.
- [ ] Publish article #2: **Sofa disposal Dubai** (item page, transactional).

### Week 3 (26 Oct – 1 Nov): money-page depth
- [ ] Expand each **service page** with a unique FAQ, a "what we take / don't take" list, a "how pricing works" section (no figures unless approved) and 2–3 real job photos.
- [ ] **GBP:** first weekly post (offer or job photo), and answer 5 likely questions in Q&A.
- [ ] Publish articles #3–4: **Mattress & bed disposal Dubai** and **Old AC & appliance disposal Dubai**.

### Week 4 (2–8 Nov): area pages and review
- [ ] Add a unique local paragraph and FAQ to each **area page** (building types, access, parking and lift notes for that community), with no copy-paste between areas.
- [ ] **Citations, batch 2:** Dubai Chamber directory, YallaBanana, ExpatWoman, Yalwa, 123UAE.
- [ ] Publish articles #5–6: **Junk removal cost in Dubai** (honest explainer of price factors) and **Construction / renovation waste removal in Dubai**.
- [ ] **Week-4 review:** compare KPIs to the baseline and adjust the plan to whatever is getting impressions.

### Weeks 5–6 (9–22 Nov): expand clusters
- [ ] Articles #7–10: **Office clearance Dubai**, **House / villa clearance Dubai (moving out)**, **E-waste & electronics disposal Dubai**, **Garden waste removal for villas**.
- [ ] Refresh the merged legacy posts from audit groups 5–7.
- [ ] Internal links: every new article links to its money page and 1–2 area pages, and every money page links back to its 2–3 best articles.
- [ ] **Outreach:** ask Property Finder / Bayut / Dubizzle editors to include us in their junk-removal provider lists. Supply accurate details and photos.

### Weeks 7–8 (23 Nov – 6 Dec): convert and compound
- [ ] Articles #11–12: **Same-day junk removal Dubai** and a **"junk removal [area]" deep dive** for the best-performing area in Search Console.
- [ ] **Conversion tuning:** check which pages get impressions but few clicks (rewrite titles and descriptions), and which get visits but no leads (strengthen the CTAs).
- [ ] **GBP:** 20+ reviews and weekly posts. Keep answering every review.
- [ ] **Optional:** 3 Arabic landing pages (home, furniture disposal, construction waste). Arabic competition is nearly zero.
- [ ] Write the **next-60-days plan** from the data.

## Weekly routine (30–60 minutes)
1. Search Console: queries gaining impressions, and pages with impressions but low CTR.
2. GBP: one post, answer reviews and questions, add photos from the week's jobs.
3. Log leads by source (call / WhatsApp / form, and website vs GBP).
4. Publish or refresh 1–2 articles following the calendar in keyword-roadmap.md.
