# Content structure: blueprints, frontmatter and linking

Every new article is a Markdown file in `content/articles/` and is shown with the single-article template. The template automatically provides:
- table of contents (from your H2/H3s)
- reading progress bar
- key takeaways box
- mid-article contact prompt
- FAQ section and FAQ schema
- related service and area boxes
- author box, share buttons, related articles, and the contact form

Copy [`content/articles/_template.md`](../../content/articles/_template.md) to start.

## 1. Frontmatter reference

| Field | Required | Rules |
|---|---|---|
| `title` | ✔ | The H1. Natural, contains the primary keyword, ideally 50–75 characters. |
| `seoTitle` | ✔ (in practice) | 60 characters or less, keyword first. If omitted, `title` is used. |
| `description` | ✔ | 140–160 characters. Used as the meta description and the intro under the H1. |
| `date` | ✔ | `YYYY-MM-DD` publish date. |
| `updated` | — | Add when meaningfully updated. Shown as "Updated …" and sent to Google. |
| `topic` | ✔ | `construction-waste` · `garden-waste` · `commercial` · `furniture-appliances` · `home-cleanouts` · `guides`. Decides the topic hub and related articles. |
| `primaryKeyword` | ✔ | The one keyword this URL owns (from keyword-roadmap.md). |
| `tags` | — | 2–4 lowercase phrases (they create /tag/ pages, which are noindexed). |
| `image`, `imageAlt` | ✔ | `/images/blog/<file>.webp` (put it in `public/images/blog/`). Alt text describes the photo and includes the keyword naturally. |
| `service` | ✔ | The money page this article supports, e.g. `/services/furniture-appliance-disposal/`. |
| `areas` | — | 1–4 area page paths to link, e.g. `[/dubai-marina/, /jumeirah-village-circle/]`. |
| `summary` | ✔ | 3–5 key-takeaway bullets, one sentence each. |
| `faq` | ✔ | 3–6 `{q, a}` pairs. Real questions with 40–80 word answers. |
| `author` | — | Defaults to "Shanan Junk Removal team". |
| `draft` | — | `true` = only visible in local preview. Set `false` to publish. |
| `replaces` | — | `true` when the article replaces the legacy WordPress post with the **same slug** (same URL, new content). |
| `redirectFrom` | — | Legacy post slugs merged into this article, e.g. `[old-post-1, old-post-2]`. Each gets a 301 to this article and drops out of the blog and sitemap automatically. |

**URL** = the file name (or `slug:`), e.g. `sofa-disposal-dubai.md` → `/sofa-disposal-dubai/`. The build fails if the URL clashes with an existing page or post.

## 2. Markdown features
- `## H2` / `### H3`: the table of contents is built from these. Write descriptive, question-style headings ("How much does sofa disposal cost in Dubai?").
- `> **Tip:** …`, `> **Note:** …`, `> **Important:** …`, `> **Warning:** …` become styled callout boxes.
- Tables with `| a | b |` are styled and scroll on mobile.
- `<!-- cta -->` on its own line places the contact prompt there. If you leave it out, the prompt appears automatically before the 3rd H2.
- Links: internal `[furniture disposal in Dubai](/services/furniture-appliance-disposal/)`. External links open in a new tab automatically.

## 3. Article blueprints

### Type 1: Money article (item or clearance service)
*Keywords like "sofa disposal dubai", "office clearance dubai". Searcher intent: hire someone now.*
**Length:** 1,200–1,800 words.

1. **Intro (60–100 words).** The situation ("Your new sofa arrives Thursday and the old one has to go") + keyword + promise of what the page covers + that we can do it today.
2. **H2: How [service] works in Dubai.** The 4 steps: photo/WhatsApp → price before work starts → we carry everything out (any floor) → responsible disposal.
3. **H2: What we take.** A specific list (types, sizes, materials) with Dubai detail.
4. **H2: What affects the price.** Volume, item type, floor and lift access, urgency, disposal type. No figures unless approved.
5. **H2: Apartments vs villas / offices.** Practical Dubai access details: service lifts, building management permission, parking, loading bays.
6. `<!-- cta -->`
7. **H2: Free municipal pickup vs private removal** (where relevant). One short paragraph plus a link to the bulky-waste guide.
8. **H2: Areas we cover.** 3–5 relevant areas linked to their area pages, plus "all of Dubai".
9. **H2: Why choose us.** Approved claims only (content-rules.md §2).
10. **FAQ** (frontmatter, 4–6 questions).
11. **Final paragraph.** Clear call to action with the phone number and WhatsApp.

### Type 2: Cost guide
*"junk removal cost dubai", "furniture disposal cost dubai". Intent: comparing before buying.*
**Length:** 1,500–2,200 words.

1. Direct answer up front: what decides the price, and that a photo gets an exact figure fast.
2. H2: The main price factors, one H3 each (volume, item type, access, urgency, disposal type, location).
3. H2: A table of typical job types (single item / room / full apartment / villa / renovation / office) with what affects each. **Use AED ranges only if the owner approves them.**
4. H2: Hidden costs to ask any provider about (stairs, waiting time, disposal fees). Advice only, no competitor names.
5. H2: Free options and their limits (link the bulky-waste guide).
6. H2: How to get an accurate price fast (photo checklist).
7. FAQ + call to action.

### Type 3: Supporting guide (feeds a money page)
*"dubai municipality bulky waste", "construction waste disposal rules dubai". Intent: researching; we turn them into leads.*
**Length:** 1,000–1,600 words.

1. Answer the question directly with sourced facts (link official sources).
2. Explain who it applies to and who it doesn't.
3. A comparison table (official / DIY option vs private service).
4. `<!-- cta -->`, then "When a private service is the better choice" (link money pages and area pages).
5. FAQ + call to action.

Example: `content/articles/dubai-municipality-bulky-waste-vs-private-junk-removal.md`.

### Type 4: Area support article (only for the top-performing areas)
*"junk removal [area]". It supports the area page and never replaces it.*
**Length:** 900–1,300 words.

Cover genuinely local detail: building types (towers vs villas), access and service lifts, community rules, parking and loading, typical jobs in that area, and nearby areas served. Link the area page prominently.

## 4. Existing service and area pages

Unique copy for the money pages lives in two JSON files. Edit them directly; the extractor never overwrites them.

| File | Per page | Shown as |
|---|---|---|
| `content/local-content.json` | `heading`, `paragraphs` (2), `tips` (4), `jobs` (4), `nearby`, `faq` (4) for each of the 10 area pages | Local guide section, "Before collection day", "Typical jobs", area FAQ and FAQ schema |
| `content/service-content.json` | `pricing` (factors), `notTaken`, `faq` for each of the 5 service pages | "How pricing works", "What we don't take", service FAQ and FAQ schema |

**Rules:**
- Every area and service page must stay unique. Never copy sentences between areas, and keep shared text under about 30%.
- When you add a new area page, add its entry to `local-content.json` at the same time.

## 4b. Further upgrades (developer edits)
Service and area pages are the main money pages and are edited in code (`content/pages.json` via the extractor, or in the page templates). Planned upgrades (lead-plan weeks 3–4):
- **Service pages:** a unique FAQ per service, a "what we take / don't take" list, a "how pricing works" section, real job photos, and links to their 2–3 best articles.
- **Area pages:** a unique local guide and FAQ per area (done for all 43), links to related articles (done via "Guides"), and real testimonials once there are enough.

## 5. Internal linking model

```
            Home ("junk removal dubai")
           /          |              \
   Service pages   Area pages     Blog hub (/blog/)
   (money)         (money/local)   └ Topic hubs (/blog/topic/…)
      ▲   ▲            ▲                 └ Articles
      │   └────────────┼────── every article links UP to 1 service + 1–2 areas
      └────────────────┴────── every service and area page links DOWN to its best 2–3 articles
```

- Anchor text describes the target ("sofa disposal in Dubai", "junk removal in JVC"). Vary it naturally. Never use "click here".
- Two to five internal links per 1,000 words is plenty.
- **Automatic downward links:** service and area pages show a "Guides" section with their 3 most relevant articles. Articles that list the page in `service:` or `areas:` come first, then same-topic articles. Fill in those frontmatter fields accurately and new articles get linked from the money pages automatically.
- The topic hub, related articles and service sidebar are added automatically. You only write the in-text links.
