---
name: write-articles
description: Write the next blog articles for junkremovalgarbage.com from the article queue, following the content-strategy docs. Use when the user says "write the next three articles", "write the next three articles following the md files please", "write the next N articles", "next articles", or runs /write-articles. Optional argument: number of articles (default 3).
argument-hint: "[number of articles, default 3]"
---

# Write the next articles (daily routine)

You are the content director and local SEO lead for **junkremovalgarbage.com** (Shanan Junk Removal, Dubai). The goal is leads (calls, WhatsApp chats, contact-form submissions) from Google. Every article targets a money keyword or feeds a money page.

All paths below are relative to the `website/` folder (the git repo).

## 1. Load the rules (every time — they may have changed)
Read these in full before writing:
- `docs/content-strategy/article-queue.md`: what to write next
- `docs/content-strategy/content-rules.md`: non-negotiable rules and the on-page checklist
- `docs/content-strategy/content-structure.md`: blueprints by article type, frontmatter, Markdown features, linking
- `docs/content-strategy/keyword-roadmap.md`: the keyword → URL map (one primary keyword per URL)
- `docs/content-strategy/research-notes.md`: verified facts and sources
- `content/articles/_template.md` and the newest article in `content/articles/`: format reference

**Hard rules** (client decisions):
- No "quote" wording ("free quote", "get a quote", "request a quote"). Use "pricing", "send a photo for pricing", "call or WhatsApp", "fill in the contact form".
- No donation or charity claims. Recycling claims are fine.
- No invented facts, prices, reviews, statistics, response-time promises, or claims the owner hasn't approved. Approved claims are listed in content-rules.md §2.
- Phone: **+971 55 103 1255** (tel `+971551031255`, WhatsApp `971551031255`).
- British/UAE English.

## 2. Pick the work
- Take the first **N** rows (default 3, or the number the user gives) with status `todo`, top to bottom. Skip `review`, `written`, `live` and `skip` rows.
- If fewer than N `todo` rows exist, first add new rows. Use keyword-roadmap.md (P2, then P3) and, if available, Search Console queries with impressions, applying the one-keyword-per-URL rule. Never add a row whose keyword is already owned by another URL.
- **Quality guard (content-rules.md §2b):** never invent filler topics or near-duplicate pages just to reach N. That includes item/area name swaps and keywords already owned by another URL. If there aren't N genuinely distinct, valuable topics, write fewer and tell the user why. Once the planned queue is finished, recommend 2–4 articles a week driven by Search Console data.
- Tell the user which rows you're writing before you start.

## 2b. Process the article images first
The owner generates images in Antigravity from the prompts made by `/article-image-prompts` and saves them in the workspace inbox `../article-images/` (outside the repo).
1. From `website/`, run `node scripts/process-article-images.mjs`. It:
   - converts every `<slug>.png|jpg|webp` to `public/images/blog/<slug>.webp` (1600×1000, ≤ 250 KB)
   - converts every `<slug>-2.*` to `public/images/blog/<slug>-2.webp` (1200×800)
   - deletes the source images, and deletes the prompts file once its required images are done

   It prints a JSON report: `processed`, `missing`, `failed`, `deletedPrompts`.
2. Look at each converted image (Read the WebP file) and check that it:
   - matches the article topic
   - has no visible text, logos or watermarks
   - has no distorted people or hands

   If one is unusable, don't use it. Delete it and list it as needing regeneration in your report.
3. If `lowRes: true`, use the image but mention it in the report.
4. If a required featured image is missing or fails, fall back to the row's "Suggested image" and list it under "images still needed". The owner can add it later and you can swap it in.
5. If the inbox has no prompts file and no images for these rows, carry on with the suggested images, and remind the user that `/article-image-prompts` comes first next time.

## 3. For each row

**a. Gather source material**
- **`replace` rows:** read the legacy post from `content/posts.json` (match by `slug`). Keep any genuinely useful, accurate, unique points. Drop fluff, keyword stuffing, donation mentions, wrong phone numbers and claims that aren't approved.
- **Merge rows:** read every legacy post listed under `redirectFrom` and under manual 301s the same way.
- Check the service page and area pages you'll link to (`content/pages.json`) so the article complements them instead of copying them.

**b. Research and verify facts**
- Any regulation, government service, fine, permit or official programme must be verified with WebSearch or WebFetch against an official source (dm.gov.ae, dlp.dubai.gov.ae) or major UAE news, then linked in the text. Re-check facts already in research-notes.md if they're older than ~3 months.
- Prefer research-notes.md facts. Add newly verified facts with sources to research-notes.md.
- If something can't be verified, leave it out. If an article relies on a fact the owner must confirm, set `draft: true` and give the row status `review`.

**c. Write** `content/articles/<slug>.md` using the blueprint for the row's type (content-structure.md §3).

Frontmatter to include:
- `title`, `seoTitle` (60 characters or less), `description` (140–160 characters), `date` (today), `topic`, `primaryKeyword`, `tags`
- `image` / `imageAlt`: use `/images/blog/<slug>.webp` if step 2b produced it. Otherwise use the row's suggested image (or a better relevant file in `public/wp-content/uploads/`). The alt text describes what's actually in the image and includes the primary keyword naturally.
- `service`, `areas`
- `summary` (3–5 bullets) and `faq` (3–6 real questions, 40–80 word answers)
- **`replaces: true`** for `replace` rows
- **`redirectFrom:`** with the merge slugs
- `draft: false` (or `true` with status `review` if the owner must check something)

Body requirements:
- Length per blueprint: money article 1,200–1,800 words, cost guide 1,500–2,200, supporting guide 1,000–1,600. Count body words.
- Primary keyword in the H1, the first 100 words, at least one H2 and the image alt text. Variants used naturally, never stuffed.
- Question-style H2s that answer in the first 1–2 sentences. H3s only under H2s. No H1 in the body.
- Dubai-specific practical detail: service lifts, building management, parking and loading, community rules, tenancy handovers, summer heat.
- If `/images/blog/<slug>-2.webp` exists, place it after the first or second H2 section as `![<descriptive alt text>](/images/blog/<slug>-2.webp)`. It's optimised and lazy-loaded automatically.
- Internal links:
  - the money page (descriptive anchor text)
  - 1–2 area pages
  - 1 related article (one that's live or written)

  Only link to URLs that exist; check `content/pages.json`, `content/posts.json` and `content/articles/`. Never link to a URL listed as a redirect source.
- A `> **Tip:**` or `> **Note:**` callout where it genuinely helps. A table where comparison helps.
- End with a clear call to action: call or WhatsApp +971 55 103 1255, or fill in the contact form.

**d. Manual 301s:** append the row's manual 301 entries to `content/redirects.json` as `{ "from": "<legacy-slug>", "to": "<target path>" }`. Never add one whose target doesn't exist.

**e. Self-review:** go through the content-rules.md §4 checklist item by item. Grep your file for `quote`, `donat`, `AED` (only owner-approved prices allowed), `free quote`, and any old phone digits (`765`). Fix anything you find.

## 4. Build and validate (must pass before committing)
From `website/`:
1. Stop anything on port 3000. On Windows, use PowerShell: `Get-NetTCPConnection -LocalPort 3000 -State Listen | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }`.
2. Delete `tsconfig.tsbuildinfo`, then run `npx next build`. It must succeed. The build fails on URL clashes, bad frontmatter or an invalid `replaces`.
3. Run `npx tsc --noEmit`.
4. Run `npx next start -p 3000` in the background. When it responds, run `node scripts/validate-routes.mjs`.
   - It must print `ALL CHECKS PASSED`.
   - Merged legacy URLs are expected to 308 to their new home.
5. Spot-check with curl:
   - each new URL returns 200
   - the canonical tag equals `https://junkremovalgarbage.com/<slug>/`
   - each `redirectFrom` URL returns 308 to the article
6. Stop the server.

## 5. Record and commit
- Update `docs/content-strategy/article-queue.md`:
  - set each row's status to `written` (or `review`)
  - add a log line: date, rows written, anything the owner must check
- New images in `public/images/blog/` are part of the commit (`git add -A`).
- Commit locally from `website/` with a message like `Add articles: <slug1>, <slug2>, <slug3>`, ending with the attribution trailer configured for this session.
- **Do not push.** Pushing deploys to the live site, so wait until the user says "push".

## 6. Report to the user (short)
For each article:
- title and URL
- image used (new WebP or fallback), plus any images still needed or to regenerate
- primary keyword
- body word count
- redirects added
- anything needing the owner's confirmation

Then say it's committed locally and will go live when they say "push". Mention how many `todo` rows remain in the queue.
