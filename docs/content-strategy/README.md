# Content & local SEO strategy — junkremovalgarbage.com

**Owner role:** Content Director / Local SEO lead
**Goal:** consistent inbound leads (calls, WhatsApp chats, contact-form submissions) from Google within **60 days** (by early December 2026), then compounding growth.
**Market:** Dubai, English first. Arabic is a later, low-cost add-on (see the keyword roadmap).

## The documents

| File | What it's for | Who uses it |
|---|---|---|
| [article-queue.md](article-queue.md) | Ordered list of articles to write, with status. Used by the daily "write the next three articles" routine | Writers / Claude |
| [lead-plan-60-days.md](lead-plan-60-days.md) | Week-by-week plan, KPIs, what moves leads fastest | Owner + SEO lead |
| [keyword-roadmap.md](keyword-roadmap.md) | Money keywords, clusters, which URL targets which keyword, publishing calendar | SEO lead + writers |
| [content-rules.md](content-rules.md) | Non-negotiable rules: voice, facts, claims, on-page SEO checklist | Every writer, every article |
| [content-structure.md](content-structure.md) | Article blueprints by type, required sections, word counts, frontmatter, internal links | Writers |
| [content-audit.md](content-audit.md) | The 38 existing posts: keep, refresh, merge or redirect | SEO lead / developer |
| [local-seo-playbook.md](local-seo-playbook.md) | Google Business Profile, citations, reviews, tracking | Owner + SEO lead |
| [research-notes.md](research-notes.md) | Market research with sources: competitors, regulations, pricing signals, seasonality | Reference |

The copy-paste article template is in [`content/articles/_template.md`](../../content/articles/_template.md).

## Strategy in one page

1. **Money pages first.** Leads come from people searching to *hire* (e.g. "junk removal dubai", "sofa disposal dubai", "construction waste removal dubai", "junk removal jvc"). Every piece of content exists either to rank for one of those, or to push authority and visitors to the page that does.
2. **Google Business Profile is the fastest lead channel.** The Map Pack shows above organic results for "near me" and "[service] dubai" searches. Google Local Services Ads are **not available in the UAE**, so it's the Map Pack, organic results and Google Ads. Optimise and post weekly from week 1.
3. **Fix the existing blog before adding to it.** 36 of 38 posts are thin and about a dozen compete for the same keyword. Merging them into a few strong pages (with 301 redirects) concentrates their authority. See `content-audit.md`.
4. **Win where competitors are weak.** Competitors are mostly small exact-match-domain sites with no real area pages, empty blogs and no Arabic. We already have 10 area pages and a proper blog system, so we deepen them and publish item pages they don't have.
5. **Convert every visit.** Every article ends with call, WhatsApp and the contact form, and has a contact prompt mid-article (built into the template). Track every click.
6. **Honesty sells.** Clear answers about the free Dubai Municipality service and who it doesn't cover, plus pricing that's clear before work starts. No fake reviews, no invented numbers, no donation claims.

## Daily routine with Claude

1. **`/article-image-prompts`.** Claude picks the next three articles and writes `article-images/YYYY-MM-DD-prompts.txt` in the workspace folder, with one image prompt per image and the exact filename to save it as.
2. **Generate the images in Antigravity** and save them in `article-images/` with those filenames.
3. **`/write-articles`** (or say "write the next three articles following the md files please"). Claude then:
   - converts the images to WebP (`npm run images:process`) and deletes the source images and prompts file
   - writes the articles following these docs, using the new images and including the replace and merge redirects
   - builds the site, checks all URLs, updates the queue and commits locally
4. Say **"push"** to publish.

## Publishing workflow (for writers)

1. Copy `content/articles/_template.md` to `content/articles/<slug>.md`. The slug becomes the URL `/<slug>/`, so use the primary keyword, e.g. `sofa-disposal-dubai`.
2. Write the article following `content-structure.md`, then check it against the checklist in `content-rules.md`.
3. Add the image to `public/images/blog/` (WebP, 1600×1000, under 250 KB).
4. Preview locally: `npm run dev`, then open `http://localhost:3000/<slug>/`. Drafts (`draft: true`) only show in local preview.
5. Set `draft: false`, commit and push. Vercel deploys it, and it appears automatically in the blog, its topic hub, the sitemap and the RSS feed.
6. In Google Search Console, use URL Inspection → Request indexing on the new URL.
