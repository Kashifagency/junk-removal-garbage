# Keyword roadmap — money keywords first

**Scope:** commercial and transactional keywords that bring calls, WhatsApp chats and form submissions. Informational topics are included only when they directly feed a money page. No donation or charity content.

**About demand ratings:** these come from SERP research, competitor analysis and the keyword's commercial value. **No paid keyword tool was used and no search volumes were measured.** Validate in Google Search Console (after 2–4 weeks of data) and Google Keyword Planner before scaling. Re-prioritise monthly using real Search Console impressions.

Legend: **Intent** T = transactional, C = commercial, L = local. **Priority** P1 = do in the first 30 days, P2 = days 30–60, P3 = after 60 days.

## 1. Keyword → URL map (one primary keyword per URL)

Rule: **one URL owns each primary keyword.** Supporting articles target related long-tail terms and link to the owning URL. Never publish a second page for a keyword that already has an owner. That's how the current blog ended up with 12 posts competing for "junk removal dubai".

### A. Core service (owned by the homepage and service pages)

| Primary keyword | Secondary / variants | Intent | Demand (est.) | Owner URL | Priority |
|---|---|---|---|---|---|
| junk removal dubai | junk removal company dubai, junk collection dubai, junk pickup dubai | T/L | High | `/` (home) | P1 |
| junk removal near me | junk removal near me dubai | T/L | High | `/` + area pages (no Google Business Profile; consider Google Ads) | P1 |
| household junk removal dubai | house junk removal, home junk removal dubai | T | Low–Med | `/services/household-junk-removal/` | P1 |
| furniture removal dubai | furniture disposal dubai, old furniture disposal dubai, used furniture pickup dubai | T | High | `/services/furniture-appliance-disposal/` | P1 |
| construction waste removal dubai | debris removal dubai, building waste disposal dubai, renovation waste removal dubai | T | Medium | `/services/construction-waste-removal/` | P1 |
| commercial waste management dubai | commercial junk removal dubai, business waste removal dubai | T/C | Low–Med | `/services/commercial-waste-management/` | P2 |
| garden waste removal dubai | green waste collection dubai, villa garden cleanup dubai | T | Low–Med | `/services/yard-garden-waste-cleanup/` | P2 |
| rubbish removal dubai / garbage removal dubai | waste removal dubai, trash removal dubai | T/L | Medium | `/` (variants in copy, title tests) | P1 |
| same day junk removal dubai | urgent junk removal dubai | T | Medium | new article `/same-day-junk-removal-dubai/`* | P2 |

\*`same-day-junk-removal-dubai` must not clash with existing URLs. Legacy posts `same-day-junk-removal-dubai-fast-emergency-service` and `same-day-junk-removal-services-dubai-quick-cleanup` should be merged into the new page (see content-audit.md).

### B. Item pages (new: competitors rank with these and we have none)

Use the Markdown article system with the **"money article"** blueprint (content-structure.md, type 1).

| Primary keyword | Variants | Intent | Demand (est.) | New URL | Priority |
|---|---|---|---|---|---|
| sofa disposal dubai | sofa removal dubai, old sofa pickup dubai, couch disposal dubai | T | Medium | new `/sofa-disposal-dubai/` (301 `/furniture-disposal-dubai-sofa-bed-removal-service/` into it) | P1 |
| mattress disposal dubai | mattress removal dubai, bed disposal dubai | T | Medium | refresh existing `/bed-and-mattress-removal-dubai/` | P1 |
| appliance removal dubai | fridge disposal dubai, washing machine disposal dubai, old ac disposal dubai | T | Low–Med | refresh existing `/appliance-removal-services-dubai/` (301 `/washing-machine-removal-dubai/` into it) | P1 |
| e-waste disposal dubai | electronic waste collection dubai, tv disposal dubai, it equipment disposal dubai | T | Medium | `/e-waste-disposal-dubai/` | P2 |
| office furniture disposal dubai | desk disposal dubai, office chairs disposal | T | Low–Med | merge into `/office-furniture-removal-dubai/` (refresh) | P2 |
| wardrobe / cabinet disposal dubai | — | T | Low | section inside the sofa or furniture page | P3 |
| gym equipment / piano removal dubai | — | T | Low | P3 later | P3 |

### C. Clearances (high value per job)

| Primary keyword | Variants | Intent | Demand (est.) | URL | Priority |
|---|---|---|---|---|---|
| house clearance dubai | villa clearance dubai, apartment cleanout dubai, move out junk removal dubai | T | Medium | refresh `/house-cleanout-dubai-complete-home-clearing-service/` (merge the other house-cleanout post) | P1 |
| office clearance dubai | office cleanout dubai, office junk removal dubai | T | Medium | refresh `/office-cleanout-dubai-complete-commercial-clearing-service/` (merge office junk post) | P2 |
| warehouse clearance dubai | warehouse waste removal dubai | T | Low | refresh `/warehouse-waste-removal-dubai/` | P2 |
| shop / restaurant clearance dubai | restaurant equipment removal dubai | T | Low | section in the office clearance page | P3 |

### D. Area pages: 43 pages, one per area (the main lead engine without Google Business Profile)

Pattern: **"junk removal [area]"**, plus variants like "furniture disposal [area]" and "rubbish removal [area]". Each area is owned by exactly **one** URL, and no other page may target it. Content lives in `content/local-content.json` (the original 10) and `content/area-pages.json` (the 33 added on 9 Oct 2026). The list and regions are in `content/area-list.json`.

| Area page (owner) | Primary keyword |
|---|---|
| `/dubai-marina/` | junk removal dubai marina, furniture disposal dubai marina |
| `/jumeirah-village-circle/` | junk removal jvc, junk removal jumeirah village circle |
| `/palm-jumeirah/` | junk removal palm jumeirah |
| `/downtown-dubai/` | junk removal downtown dubai (Business Bay now has its own page) |
| `/al-barsha/` | junk removal al barsha |
| `/al-quoz/` | junk removal al quoz, construction waste removal al quoz |
| `/arabian-ranches/` | junk removal arabian ranches |
| `/the-meadows-springs/` | junk removal the meadows, junk removal the springs |
| `/al-sufouh/` | junk removal al sufouh, junk removal umm suqeim |
| `/junk-removal-jumeirah-bay-island/` | junk removal jumeirah bay island |
| `/junk-removal-business-bay/` | junk removal business bay |
| `/junk-removal-difc/` | junk removal difc |
| `/junk-removal-dubai-creek-harbour/` | junk removal dubai creek harbour |
| `/junk-removal-al-jaddaf/` | junk removal al jaddaf |
| `/junk-removal-mbr-city/` | junk removal mohammed bin rashid city, junk removal meydan |
| `/junk-removal-jlt/` | junk removal jumeirah lake towers, junk removal jlt |
| `/junk-removal-jbr/` | junk removal jumeirah beach residence, junk removal jbr |
| `/junk-removal-the-greens/` | junk removal the greens & the views |
| `/junk-removal-barsha-heights/` | junk removal barsha heights, junk removal tecom |
| `/junk-removal-jumeirah/` | junk removal jumeirah |
| `/junk-removal-deira/` | junk removal deira |
| `/junk-removal-bur-dubai/` | junk removal bur dubai |
| `/junk-removal-al-karama/` | junk removal al karama |
| `/junk-removal-dubai-hills-estate/` | junk removal dubai hills estate |
| `/junk-removal-emirates-hills/` | junk removal emirates hills |
| `/junk-removal-damac-hills/` | junk removal damac hills |
| `/junk-removal-mudon/` | junk removal mudon |
| `/junk-removal-al-furjan/` | junk removal al furjan |
| `/junk-removal-jvt/` | junk removal jumeirah village triangle, junk removal jvt |
| `/junk-removal-motor-city/` | junk removal motor city |
| `/junk-removal-dubai-sports-city/` | junk removal dubai sports city |
| `/junk-removal-arjan/` | junk removal arjan |
| `/junk-removal-town-square/` | junk removal town square |
| `/junk-removal-discovery-gardens/` | junk removal discovery gardens |
| `/junk-removal-mirdif/` | junk removal mirdif |
| `/junk-removal-al-qusais/` | junk removal al qusais |
| `/junk-removal-al-nahda/` | junk removal al nahda |
| `/junk-removal-al-warqa/` | junk removal al warqa |
| `/junk-removal-international-city/` | junk removal international city |
| `/junk-removal-dubai-silicon-oasis/` | junk removal dubai silicon oasis |
| `/junk-removal-jebel-ali/` | junk removal jebel ali |
| `/junk-removal-dubai-investments-park/` | junk removal dubai investments park, junk removal dip |
| `/junk-removal-dubai-south/` | junk removal dubai south |

**Adding more areas:** only add an area where Search Console shows demand, and only with genuinely unique local content (content-rules.md §2b). Use `node scripts/merge-area-drafts.mjs` to check overlap; aim for 5% or less of shared phrases.

### E. Cost and commercial-investigation terms

| Primary keyword | Variants | Intent | Demand (est.) | URL | Priority |
|---|---|---|---|---|---|
| junk removal cost dubai | junk removal price dubai, how much does junk removal cost in dubai | C | Medium | new `/junk-removal-cost-dubai/` | P1 |
| cheap junk removal dubai | affordable junk removal dubai | C/T | Medium | refresh `/cheap-junk-removal-dubai/` → "affordable" angle | P2 |
| free junk removal dubai | free furniture pickup dubai, free bulky waste dubai | C/T | Medium | `/dubai-municipality-bulky-waste-vs-private-junk-removal/` (drafted) | P1 |
| furniture disposal cost dubai | sofa disposal price dubai | C | Low–Med | section in the cost page + item pages | P2 |
| construction waste removal cost dubai | debris removal price dubai | C | Low | section in the cost page | P2 |

**Pricing rule:** only publish figures the owner has approved, written in writing as ranges with the factors that change them. Otherwise explain the factors (volume, item type, floor and lift access, urgency, disposal type) and push to "send a photo for an exact price".

### F. Supporting informational (each one feeds a money page)

| Keyword | Feeds | URL | Priority |
|---|---|---|---|
| dubai municipality bulky waste / 800900 | junk removal dubai, free junk removal | `/dubai-municipality-bulky-waste-vs-private-junk-removal/` | P1 |
| how to dispose of furniture in dubai | furniture removal dubai | section/FAQ in the sofa and furniture pages | P2 |
| construction waste disposal rules dubai | construction waste removal dubai | new `/construction-waste-disposal-rules-dubai/` | P2 |
| fine for dumping waste dubai | junk removal dubai | FAQ in the bulky-waste guide (verify the fine amounts first) | P3 |
| how to dispose of old ac dubai | appliance removal dubai | section in the appliance page | P2 |

### G. Arabic (P3, low demand, almost no competition)

نقل أثاث قديم دبي · التخلص من الأثاث القديم دبي · إزالة المخلفات دبي · التخلص من مخلفات البناء دبي.
Plan: 3 Arabic landing pages (home, furniture disposal, construction waste) written by a native speaker, with `hreflang`. A developer task is needed to add an `/ar/` route.

## 2. Publishing calendar (first 60 days)

| # | Week | Title (working) | Primary keyword | Type | Links to |
|---|---|---|---|---|---|
| 1 | 1 | Dubai Municipality Free Bulky Waste Pickup vs Private Junk Removal | bulky waste removal dubai / free junk removal dubai | Supporting → money | household service, 4 area pages |
| 2 | 2 | Sofa Disposal in Dubai: Same-Day Old Sofa Removal | sofa disposal dubai | Money article | furniture service |
| 3 | 3 | Mattress & Bed Disposal in Dubai (refresh `/bed-and-mattress-removal-dubai/`) | mattress disposal dubai | Money (refresh) | furniture service |
| 4 | 3 | Appliance Disposal in Dubai: Fridges, Washing Machines & Old ACs (refresh `/appliance-removal-services-dubai/`) | appliance removal dubai | Money (refresh) | furniture service |
| 5 | 4 | How Much Does Junk Removal Cost in Dubai? | junk removal cost dubai | Cost guide | home + all services |
| 6 | 4 | Construction & Renovation Waste Removal in Dubai: What to Know | construction waste removal dubai (supports the service page) | Supporting → money | construction service, Al Quoz |
| 7 | 5 | Office Clearance in Dubai (refresh + merge) | office clearance dubai | Money (refresh) | commercial service, Downtown/Business Bay |
| 8 | 5 | House & Villa Clearance in Dubai When Moving Out (refresh + merge) | house clearance dubai | Money (refresh) | household service, Arabian Ranches, Meadows |
| 9 | 6 | E-Waste & Electronics Disposal in Dubai | e-waste disposal dubai | Money article | furniture service, commercial service |
| 10 | 6 | Garden Waste Removal for Dubai Villas (refresh) | garden waste removal dubai (supports) | Supporting → money | garden service, Arabian Ranches, Meadows |
| 11 | 7 | Same-Day Junk Removal in Dubai (merge 2 legacy posts) | same day junk removal dubai | Money article | home, household service |
| 12 | 8 | Junk Removal in [best-performing area] — local guide | junk removal [area] | Area support | that area page |

Refreshes of the legacy posts (content-audit.md) run alongside, about 2–3 per week.

## 3. Title and URL conventions

- **URL:** the primary keyword, lowercase, hyphenated, no dates or years (e.g. `/sofa-disposal-dubai/`, not `/sofa-disposal-dubai-2026/`).
- **SEO title (≤ 60 characters):** keyword first, then the benefit. For example: `Sofa Disposal Dubai | Same-Day Old Sofa Removal`.
- **H1:** a natural, human version containing the keyword. For example: "Sofa Disposal in Dubai: How to Get Rid of an Old Sofa the Right Way".
- **Meta description (140–160 characters):** keyword + specific benefit + call to action. Mention the area if the page is local.
