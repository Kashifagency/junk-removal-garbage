# Content rules

Every article, page, directory listing and social post must follow these rules. If a rule and a "quick win" conflict, the rule wins.

## 1. Purpose
- **Every piece of content must earn a lead or push authority to a page that does.** Before writing, name the money page it supports (see keyword-roadmap.md). If there isn't one, don't write it.
- **One primary keyword per URL.** Check the keyword map first. If a URL already owns the keyword, improve that page instead of creating a new one.
- **No donation or charity content**, and no claims that items are donated. Recycling claims are fine ("materials are recycled whenever possible").
- **No off-topic content.** We are a junk removal and waste company, not a cleaning, moving or skip-hire company. Don't target "cleaning services dubai", "movers dubai" or "skip hire dubai" unless the business actually starts offering those services.

## 2. Truth and claims (non-negotiable)
- **Never invent facts, numbers, reviews or testimonials.** No made-up customer names, star ratings, "8,000+ jobs", "since 2012", response-time guarantees or prices.
- **Business claims must come from the owner.** Approved claims currently on the site:
  - same-day or next-day service available
  - pricing is clear before work starts
  - eco-friendly disposal with recycling whenever possible
  - fully insured, licensed and professional
  - residential and commercial
  - all Dubai areas

  Anything new ("30-minute response", "24/7", "cheapest in Dubai", "certificate of disposal") needs written confirmation from the owner before it's published.
- **Prices:** do not publish figures unless the owner approves them in writing. Explain the factors that change the price instead, and use "send a photo on WhatsApp for an exact price".
- **Regulations, fines and government services** (Dubai Municipality, 800900, fines, C&D rules): link the official or news source, keep wording close to the source, and say "check current conditions". Re-verify before every refresh. Don't mix up emirates: Tadweer is Abu Dhabi, Dubai Municipality is Dubai.
- **No competitor bashing.** Comparisons are fine ("free municipal service vs private"), but don't name or disparage competitors.
- **Contact language:** we use a **contact form, call and WhatsApp**. Don't write "free quote", "get a quote" or "request a quote". Say "send a photo for pricing", "call or WhatsApp", or "fill in the contact form".

## 2b. Quality and Google's spam policies (scaled content)
Google ranks content written for people, and penalises "scaled content abuse": many pages made mainly to rank, with little unique value. That applies whether pages are written by people or AI. To stay on the right side of it:
- **Every article answers a different searcher need.** Never publish near-duplicates that just swap the item or area name (e.g. "sofa disposal Dubai Marina", "sofa disposal JVC"…). Area intent belongs on the area pages.
- **Add something only we can say:** practical Dubai logistics (lifts, building rules, handovers), real job details and real photos as they become available, and clear answers to the owner's common customer questions.
- **Human review before publishing.** The owner or editor skims every article for accuracy and tone before it's pushed. The `review` status exists for anything uncertain.
- **Cadence follows the queue, not a quota.** Three articles a day is fine while the queue has distinct topics: the 17 planned items, roughly the first 6 days, many of them refreshes and merges. Once it runs out, slow to **2–4 high-quality articles a week**, driven by Search Console queries, rather than inventing filler topics.
- **Refresh beats new.** Updating a page that already gets impressions often lifts rankings faster than publishing a new one.
- **FAQ markup:** keep writing FAQs, because they help readers and AI answers, and the FAQ schema is valid. But since 2023 Google shows FAQ rich results only for well-known government and health sites, so don't expect FAQ snippets in search results.

## 3. Voice and style
- **Audience:** Dubai residents (often expats, often in apartments), villa owners, property managers and office managers. They're busy, they have a deadline (moving out, handover, renovation), and they want it gone without hassle.
- **Tone:** clear, practical, confident and friendly. Write like an experienced crew lead explaining the job, not like an advert.
- **British/UAE English:** "colour", "organise", "neighbourhood", "villa", "apartment", "building management". Use AED for currency.
- Short sentences and paragraphs (2–4 sentences). One idea per paragraph.
- Answer the question in the first 1–2 sentences under each H2, then add detail. This helps readers, featured snippets and AI answers.
- Be specific to Dubai: lifts and loading bays, building management permissions, service lifts, parking, community rules (Emaar, Nakheel and similar), summer heat, tenancy handovers.
- No fluff ("In today's fast-paced world…"), no keyword stuffing, no all-caps headings, no emoji in headings.

## 4. On-page SEO checklist (tick all before publishing)
- [ ] **Primary keyword** appears in: the URL slug, SEO title (near the start), H1, the first 100 words, at least one H2, the image alt text and the meta description.
- [ ] **SEO title** is 60 characters or less and unique. **Meta description** is 140–160 characters with a benefit and a call to action.
- [ ] **H1:** exactly one (the template creates it from `title`). Content headings start at H2, and H3s sit under H2s. Never skip levels.
- [ ] **Length** matches the blueprint for the article type (content-structure.md). Depth beats length, so don't pad.
- [ ] **Internal links:** 1 link to the money page (descriptive anchor, e.g. "furniture disposal in Dubai", never "click here"), 1–2 area pages, and 1 related article. Make sure the money page links back.
- [ ] **External links:** only to authoritative sources (dm.gov.ae, dlp.dubai.gov.ae, major UAE news). These open in a new tab automatically.
- [ ] **FAQ:** 3–6 real questions with 40–80 word answers (frontmatter `faq`). This becomes FAQ schema.
- [ ] **Key takeaways:** 3–5 bullets (frontmatter `summary`).
- [ ] **Image:** real job photos are best whenever available. Otherwise use AI images generated from the `/article-image-prompts` house style (photorealistic, Dubai setting, no text or logos, faces not the focus).
  - Converted automatically to WebP: featured 1600×1000, in-article 1200×800, each 250 KB or less.
  - Alt text describes what's actually in the image.
  - AI images are illustrative only. Never present one as a specific real customer's job.
- [ ] **CTA:** the template adds a mid-article contact prompt plus the end form. The last paragraph must also tell the reader what to do next (call or WhatsApp 055 103 1255, or fill in the form).
- [ ] **No "quote" wording, no donation claims, no unapproved numbers.**
- [ ] Spell-checked. All links work. Preview looks right on mobile.

## 5. Local signals
- Name real Dubai areas naturally where they're relevant, and link the matching area page. Never stuff lists of 20 areas.
- Business details must be identical everywhere: **Shanan Junk Removal · Al Quoz 4, Dubai · +971 55 103 1255**.
- Area pages need **unique local detail** (access, building types, typical jobs). Never duplicate copy between areas and only swap the name.

## 6. Updating content
- Refresh money articles every 3–6 months. Set `updated:` in the frontmatter when the change is meaningful (new section, new facts), not for typo fixes.
- When merging posts, keep the strongest URL, move the best content into it, and add a 301 from the old URLs in `next.config.ts`. Never delete a URL without a redirect.
