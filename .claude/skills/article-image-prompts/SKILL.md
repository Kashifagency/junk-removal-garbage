---
name: article-image-prompts
description: Create today's image-prompt file for the next blog articles (for the user to generate in Antigravity). Use when the user says "create the image prompts", "image prompts for the next three articles", "prepare images for the next articles", or runs /article-image-prompts. Optional argument: number of articles (default 3). Run this BEFORE /write-articles.
argument-hint: "[number of articles, default 3]"
---

# Image prompts for the next articles (step 1 of the daily routine)

Claude doesn't create images. The owner generates them in **Antigravity** from the prompts you write here. Then `/write-articles` converts them to WebP and uses them.

Paths are relative to the workspace root (`Junk removal garbage/`):
- Inbox folder: `article-images/` (outside the git repo, keep its `README.txt`)
- Queue: `website/docs/content-strategy/article-queue.md`

## 1. Pick the articles
- Read the queue and take the first **N** rows with status `todo` (default 3). These are exactly the rows `/write-articles` will write next.
- If `article-images/` already has a `*-prompts.txt` covering those slugs, don't duplicate it. Tell the user it's waiting for images.
- For each row, note the slug, title idea, primary keyword, topic, service and areas. Skim the row's service page and any legacy post it replaces, so the image matches what the article will say.

## 2. Write two prompts per article
- **Featured image (required):** `SAVE AS: <slug>.png`. Landscape **16:10**, at least **1600×1000**. It shows at the top of the article, in blog cards and in social shares, so it must read clearly even small.
- **In-article image (optional):** `SAVE AS: <slug>-2.png`. Landscape **3:2**, at least **1200×800**. It shows a different moment: a process step, a detail, or a before/after style scene.

**House style.** Every prompt must include this, so all articles look like one brand:
- Photorealistic documentary photography, natural daylight, warm tones, sharp focus, realistic textures, clean composition with some empty space.
- Recognisably **Dubai**, matched to the topic and areas:
  - Dubai Marina or Downtown towers seen through a window or from a street
  - villa communities with palms and sand-coloured walls
  - Al Quoz warehouses and workshops
  - apartment service lifts, corridors and loading bays
- **Crew:** 2–3 workers in plain dark-grey work uniforms with orange accents and work gloves. **No logos, no text and no lettering on clothes.**
- **Vehicle** (if shown): a white light pickup truck with a cargo bed and **no lettering or logos**.
- People are shown from the side or behind, or busy working. No posed smiling at the camera. Faces are never the focus, and no children.
- The items match the article exactly: sofa, mattress, fridge, rubble bags, palm fronds, office desks, and so on.

**Negative prompt** (add to every prompt): `text, words, letters, logos, watermark, brand names, signage text, distorted hands, extra fingers, cartoon, illustration, 3d render, oversaturated, blurry, people looking at camera, children`

**Honesty.** Images are illustrative. Never prompt for a scene that pretends to be a specific real customer, building or event, such as a named tower's lobby, a famous landmark interior, or a "before/after of Mr X's villa".

## 3. Save the prompts file
Write `article-images/YYYY-MM-DD-prompts.txt` (today's date), in exactly this format. The `SAVE AS:` lines are read by the conversion script, so keep them exact.

```
IMAGE PROMPTS — YYYY-MM-DD
Generate each image in Antigravity and save it in this folder with the exact SAVE AS filename.
Then ask Claude: /write-articles

========================================================================
1. <Article working title>   (queue #<n>, keyword: <primary keyword>)
========================================================================

SAVE AS: <slug>.png        ← featured image, REQUIRED
SIZE: 16:10 landscape, at least 1600x1000
PROMPT:
<one detailed paragraph: subject, action, Dubai setting, items, lighting, camera/lens, house style>
NEGATIVE:
<negative prompt>

SAVE AS: <slug>-2.png      ← in-article image, optional
SIZE: 3:2 landscape, at least 1200x800
PROMPT:
<…>
NEGATIVE:
<…>

(repeat for each article)
```

## 4. Record and report
- Add a log line to `article-queue.md`: `YYYY-MM-DD: image prompts created for #a, #b, #c (waiting for images)`. Do not change row statuses.
- Tell the user:
  1. the prompts file path
  2. the list of exact filenames to save, marking which are required and which are optional
  3. the next step: generate the images in Antigravity, save them in `article-images/`, then run `/write-articles`
- Don't commit anything. The inbox folder is outside the repo, and the queue log gets committed with the articles later.
