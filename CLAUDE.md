@AGENTS.md

# junkremovalgarbage.com

- **Daily articles:** "write the next three articles following the md files" → follow `.claude/skills/write-articles/SKILL.md` (queue: `docs/content-strategy/article-queue.md`).
- **Content rules:** `docs/content-strategy/content-rules.md` (no "quote" wording, no donation claims, no invented facts or prices; phone +971 55 103 1255).
- Legacy copy fixes go in `COPY_FIXES` in `scripts/extract.mjs`. Redirects for merged posts come from article `redirectFrom` / `replaces` frontmatter and `content/redirects.json`.
- Commit locally; push (which deploys to Vercel production) only when the user says "push".
