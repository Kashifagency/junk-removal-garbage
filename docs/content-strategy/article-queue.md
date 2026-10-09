# Article queue

The ordered work list for daily article writing. **"Write the next three articles"** means: take the first three rows with status `todo`, from top to bottom. The full procedure is in the project skill `.claude/skills/write-articles/SKILL.md`.

**Statuses:**
- `todo`: not written yet
- `written`: article file created, built and validated, committed locally (goes live on push)
- `review`: needs the owner's fact check before publishing (kept as `draft: true`)
- `live`: pushed and deployed
- `skip`: dropped (say why in Notes)

**Actions:**
- `new`: a new file at a new URL
- `replace`: a new Markdown file with the **same slug** as a legacy post, plus `replaces: true` in its frontmatter (same URL, better content)
- `merge`: list the legacy slugs in `redirectFrom:` and they get 301s to this article automatically
- `manual 301`: entries go into `content/redirects.json` (for legacy posts merged into a service page)

Rows are ordered by lead impact. Keep this table updated every time you write. When fewer than 6 `todo` rows remain, add new rows from keyword-roadmap.md (P2 → P3) and from Search Console queries that are getting impressions, following the one-keyword-per-URL rule.

| # | Status | Action | File / URL slug | Primary keyword | Type | Topic | Service (money page) | Areas | Merge: `redirectFrom` (→ this article) | Manual 301s (`content/redirects.json`) | Suggested image |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | review | new | `dubai-municipality-bulky-waste-vs-private-junk-removal` | bulky waste removal dubai | Supporting | guides | /services/household-junk-removal/ | dubai-marina, jumeirah-village-circle, palm-jumeirah, arabian-ranches | — | — | /wp-content/uploads/2026/08/apartment-junk-removal.webp |
| 2 | written | new | `sofa-disposal-dubai` | sofa disposal dubai | Money | furniture-appliances | /services/furniture-appliance-disposal/ | dubai-marina, jumeirah-village-circle, downtown-dubai | furniture-disposal-dubai-sofa-bed-removal-service | — | /wp-content/uploads/2025/12/vertical-shot-young-delivery-men-moving-objects-out-car-scaled.webp |
| 3 | written | replace | `bed-and-mattress-removal-dubai` | mattress disposal dubai | Money | furniture-appliances | /services/furniture-appliance-disposal/ | al-barsha, jumeirah-village-circle | — | — | /wp-content/uploads/2026/01/young-couple-moving-new-home-unpacking-carboard-boxes-almost-done-moving-scaled.jpg |
| 4 | written | replace | `appliance-removal-services-dubai` | appliance removal dubai (fridge, washing machine, old AC) | Money | furniture-appliances | /services/furniture-appliance-disposal/ | dubai-marina, al-barsha | washing-machine-removal-dubai | — | /wp-content/uploads/2026/03/apartment-junk-removal-dubai.png |
| 5 | todo | new | `junk-removal-cost-dubai` | junk removal cost dubai | Cost guide | guides | /services/household-junk-removal/ | — | — | — | /wp-content/uploads/2026/08/apartment-junk-removal.webp |
| 6 | todo | replace | `junk-removal-services-in-dubai-a-complete-guide-for-homes-businesses` | junk removal services dubai (hub supporting the homepage) | Supporting hub | guides | /services/household-junk-removal/ | dubai-marina, jumeirah-village-circle, downtown-dubai, al-quoz | junk-removal-garbage-in-dubai-affordable-reliable-service, junk-removal-near-me-dubai, junk-removal-service-in-dubai, junk-removal-garbage-services-in-dubai-2026, take-my-junk-dubai-complete-removal-service, junk-removal-dubai-fast-affordable-service | professional-junk-removal-service-dubai → /professional-junk-removal/ | /wp-content/uploads/2026/01/waste-removal-services.png |
| 7 | todo | new | `construction-waste-disposal-rules-dubai` | construction waste disposal rules dubai | Supporting | construction-waste | /services/construction-waste-removal/ | al-quoz, downtown-dubai | — | construction-waste-removal-dubai, construction-removal-service-in-dubai-2026, construction-waste-removal-dubai-best-price-fast-service → /services/construction-waste-removal/ | /wp-content/uploads/2025/12/ruins-russian-s-war-ukraine-scaled.webp |
| 8 | todo | replace | `office-cleanout-dubai-complete-commercial-clearing-service` | office clearance dubai | Money | commercial | /services/commercial-waste-management/ | downtown-dubai, al-barsha | office-junk-removal-dubai | commercial-junk-removal-dubai → /commercial-junk-removal/ | /wp-content/uploads/2026/02/Minimalist-Workspace.png |
| 9 | todo | replace | `house-cleanout-dubai-complete-home-clearing-service` | house clearance dubai (villa / apartment, moving out) | Money | home-cleanouts | /services/household-junk-removal/ | arabian-ranches, the-meadows-springs, palm-jumeirah | house-cleanout-dubai-complete-junk-removal-service, residential-junk-removal-dubai | cleaning-services-dubai → /services/household-junk-removal/ | /wp-content/uploads/2025/12/high-angle-house-interior-with-clutter-1-wecompress.com_-scaled.webp |
| 10 | todo | new | `e-waste-disposal-dubai` | e-waste disposal dubai | Money | furniture-appliances | /services/furniture-appliance-disposal/ | downtown-dubai, al-quoz | — | — | /wp-content/uploads/2026/02/Minimalist-Workspace.png |
| 11 | todo | replace | `garden-waste-removal-dubai` | garden waste removal dubai (villas) | Supporting | garden-waste | /services/yard-garden-waste-cleanup/ | arabian-ranches, the-meadows-springs, palm-jumeirah | — | — | /wp-content/uploads/2026/03/Man-Raking-Autumn-Leaves.png |
| 12 | todo | new | `same-day-junk-removal-dubai` | same day junk removal dubai | Money | guides | /services/household-junk-removal/ | dubai-marina, jumeirah-village-circle, downtown-dubai | same-day-junk-removal-dubai-fast-emergency-service, same-day-junk-removal-services-dubai-quick-cleanup | — | /wp-content/uploads/2025/12/Gemini_Generated_Image_ip6gtkip6gtkip6g.webp |
| 13 | todo | replace | `garbage-pickup-dubai` | garbage pickup dubai / garbage collection dubai | Money | guides | /services/household-junk-removal/ | al-barsha, jumeirah-village-circle | garbage-pickup-dubai-same-day-service, dubai-waste-collection-services, waste-management-near-me-dubai | — | /wp-content/uploads/2025/12/black-bags-trash-garbage-bin-daytime-wecompress.com_-scaled.webp |
| 14 | todo | replace | `old-furniture-removal-dubai` | old furniture disposal dubai | Supporting | furniture-appliances | /services/furniture-appliance-disposal/ | dubai-marina, al-barsha | — | furniture-removal-dubai, furniture-removal-dubai-2, furniture-removal-services-dubai → /services/furniture-appliance-disposal/ | /wp-content/uploads/2025/12/scene-with-miscellaneous-items-being-sold-yard-sale-bargains-wecompress.com_-scaled.jpg |
| 15 | todo | replace | `cheap-junk-removal-dubai` | affordable / cheap junk removal dubai | Cost / commercial | guides | /services/household-junk-removal/ | — | — | — | /wp-content/uploads/2026/03/close-up-trash-bags-filled-with-trash-after-cleaning-environment-scaled.jpg |
| 16 | todo | replace | `office-furniture-removal-dubai` | office furniture disposal dubai | Money | commercial | /services/commercial-waste-management/ | downtown-dubai, al-quoz | — | — | /wp-content/uploads/2026/02/Delivery-Truck-Scene.png |
| 17 | todo | replace | `warehouse-waste-removal-dubai` | warehouse clearance dubai | Money | commercial | /services/commercial-waste-management/ | al-quoz | — | — | /wp-content/uploads/2026/01/Modern-Commercial-Warehouse-Operations.png |
| 18 | todo | new | `move-out-junk-removal-dubai` | move out junk removal dubai (end of tenancy) | Money | home-cleanouts | /services/household-junk-removal/ | jumeirah-village-circle, dubai-marina, downtown-dubai | — | — | /wp-content/uploads/2026/03/young-couple-moving-new-home-together-african-american-couple-with-cardboard-boxes-scaled.jpg |

## Log
Add one line per writing session: the date, the rows written, and anything for the owner to check.

- 2026-10-09: queue created. #1 drafted, awaiting owner review.
- 2026-10-09: image prompts created for #2, #3, #4.
- 2026-10-09: written #2 sofa-disposal-dubai (new, merges furniture-disposal-dubai-sofa-bed-removal-service), #3 bed-and-mattress-removal-dubai (replaces legacy), #4 appliance-removal-services-dubai (replaces legacy, merges washing-machine-removal-dubai). 6 Antigravity images converted to WebP. Owner check: appliance article states we do not disconnect gas/electrical connections or uninstall AC units (please confirm).
