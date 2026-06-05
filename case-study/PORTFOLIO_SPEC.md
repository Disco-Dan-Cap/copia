# Copia portfolio case study — spec derived from reference teardown

Teardown of the references Garrison supplied (2026-06-04): dzierson.com (home + 3 projects), calebixca.com (3 case studies), dousanmiao.com/private-space, alexslakas.medium.com (LinkedIn Home & Sharing). Purpose: define the compressed, hiring-facing version of the Copia case study. The long-form draft (CASE_STUDY_DRAFT.md) remains the source material and can ship separately as "the full story."

---

## What the references actually do

**Dousan Miao — Android Private Space** (Google design lead; the strongest model)
~600 visible words for a Google I/O-launched flagship feature. Structure: title + one-line value statement + SHIPPED chip → at-a-glance card (product, role, timeline, skills, team) → a user quote as the emotional hook → Problem with a number (28% have leaked private info) → Research as THREE bold mini-findings (~20 words each, from 900 participants) → Solution one-liner + capability bullets → four decision sections, each a heading + 2–3 sentences of *why* → Impact (I/O, OEM adoption, MKBHD top-5). Numbers do the credibility work throughout: 28%, 50%, 900, 29%, 0.6% DAU.

**Caleb Ixca** (~700–900 words each)
Problem/Solution/Timeline/Team header block before anything else → a "How might we…" question as the section pivot → role as 4–5 verb-led bullets → research → journey → "product thinking" → annotated design iterations → outcomes with concrete external validation (Warriors partnership, Netwrix acquisition) → **Personal Reflection** close (the humanizing move). Also: an embedded "Want to ask me a question?" AI Q&A with suggested chips. Brands himself "AI-Powered Designer" — the AI fluency is the differentiator, not a disclaimer.

**William Dzierson** (~400–600 words per project)
Media-first: the page LEADS with videos/screens whose captions carry the narrative; the prose summary comes after. "My Involvement" block names tools explicitly (Cursor, v0, OpenAI, ElevenLabs, Supabase/PGVector). Project record states "Built with the partnership of Opus 4.6" — AI direction claimed proudly, with specifics. Portfolio centerpiece is Willbot, an AI agent answering questions about him.

**Alex Slakas — LinkedIn** (~1,100 words; the ceiling)
FAANG-corporate format: Role and Impact as front-loaded bullet blocks, metrics in the impact bullets, guiding principles numbered, From→To comparisons, press links as external proof. The most bullet-driven and least personal of the set — useful as a format reference, not a voice reference.

## The patterns (what we adopt)

1. **At-a-glance block near the top.** Role, timeline, stack, scope, live link. Managers look for it first; every reference has it.
2. **A number in the first 100 words.** $1M–$1.5M declined, 47 interviews, 17 build days — we have better numbers than most.
3. **Findings and decisions as scannable units:** bold mini-headline + 1–3 sentences. Never paragraph runs.
4. **Captions carry the narrative** (dzierson). Our screenshots already encode the decisions; the caption explains the refusal, the image proves it shipped.
5. **Concrete external proof in the impact section.** We don't have users; our proof is: live and installable in ten seconds, real AI in production, the repo with every build prompt, installability verified by Chrome's own criteria.
6. **A personal reflection close** (Caleb) — ours exists already in voice ("I tried to talk myself into the month grid once…" register).
7. **AI fluency stated proudly with specifics** (dzierson, Caleb). Confirms the §9 lean-in decision; the portfolio version names Claude Code and the directive/NEVER-list method in one tight block.
8. **Word budget: 600–900 visible words.** Long-form lives behind a "full story" link.

## The Copia portfolio structure (target)

1. **Hero** — one screen (iPhone frame, buyer Home or splash), the locked hero sentence, status chips: LIVE · iPHONE PWA · 2026.
2. **At a glance** — Role: founder, sole designer & builder · Founded 2021 as EDEN, rebuilt 2026 · 17 build days · Next.js/Supabase/Mapbox/Claude · 9 seller surfaces + full buyer flow + 1 production AI feature · [Try it live].
3. **The story, four sentences.** Founded in my MBA, 2021. Pitched VCs; offered $1–1.5M; declined — no founder could code. 2026: rebuilt alone, directing AI. Seventeen days. *(Links to full story.)*
4. **Research, three findings** (from 47 interviews, 2021): Convenience decides — buyers defect the moment local gets complicated. Sellers need help after the harvest — analytics, marketing, the final mile. Buyers are latent sellers — the tomato buyer has a yard. (+ the surprise: people choose local over organic.)
5. **Decisions** — 6 visual units, image + headline + ≤3 sentences why:
   - The 2021 wireframe next to the 2026 product (the before/after; "cart" and "!" vs basket and calm)
   - One calm page instead of the checkout wizard (+ the narration line as the image's caption)
   - The calendar that refuses the month grid (bounded 4 weeks; nobody buys squash a month out)
   - An almanac, not analytics (no charting library; the question is "what should I do Saturday")
   - The Coach: AI as a weekly letter, not a chatbot (+ the disclosure line)
   - Where AI isn't: the market-day suggestion is geometry (knowing when not to use the model)
6. **How it was built** — the §9 lean-in in one block: directed Claude Code under a written design directive + NEVER list; every word voice-reviewed; prompts in the repo; 16s → 0.26s Coach first-paint as the engineering proof.
7. **Reflection + what's next** — 2–3 sentences, ending on the robot-gardens thread in one line.
8. **Try it** — live link + install instruction + GitHub.

Visible word budget: ~700. Everything else lives in the full story.

## Open ideas (Garrison to decide)

- ~~"Ask the Coach about this project"~~ — DECLINED (2026-06-04): Garrison plans one site-level AI chatbot for the whole portfolio (Willbot-style, covering him + all projects), so a per-project Q&A would be redundant and competing. The Copia case study stays static; the future portfolio bot can ingest it as source material.
- ~~Full-story link~~ — RESOLVED (2026-06-04): not published for now; the long-form stays as source material (and future feed for the site-level portfolio bot). The portfolio page stands alone.
- ~~Domain~~ — RESOLVED (2026-06-04): stays on copia-virid.vercel.app; no paid domain. The app will be embedded/linked inside the portfolio site, so the URL is plumbing, not brand.
- ~~Repo visibility~~ — RESOLVED (2026-06-04): private. The draft no longer links GitHub anywhere; §6 reframes the prompt set as an interview walkthrough offer ("committed alongside the code; I walk people through them on request").
