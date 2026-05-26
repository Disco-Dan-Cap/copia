# Stage 3 Kickoff — Moving to Claude Code

You're done with Stage 2 in Cowork. Time to open Claude Code and start building. This doc walks you through the handoff in five steps.

---

## 1. Make sure Claude Code is installed

Open Terminal (or iTerm) and run:

```sh
claude --version
```

- **If you see a version number**, you're good. Skip to step 2.
- **If you see "command not found"**, install it:

  ```sh
  npm install -g @anthropic-ai/claude-code
  ```

  (Requires Node.js. If you don't have Node, install it first from nodejs.org or via Homebrew: `brew install node`.)

  Then re-run `claude --version` to confirm.

---

## 2. Navigate to the project folder

```sh
cd ~/Desktop/EDEN
```

You can confirm you're in the right place by running:

```sh
ls
```

You should see `EDEN_Rebuild_Brief_v1.md`, `CLAUDE.md`, the `brand/` folder, and the historical 2021 assets.

---

## 3. Start Claude Code

In that same Terminal window:

```sh
claude
```

Claude Code will start and automatically read the `CLAUDE.md` file in this directory, which loads the full project context — what Copia is, where the brief lives, where the brand artifacts are, what the tech stack is, what the constraints are. You don't have to brief it; the file already did.

---

## 4. Paste this as your first message

Copy everything between the lines below and paste it as your first prompt:

---

```
We're starting Stage 3 of the Copia rebuild. You should have just auto-loaded CLAUDE.md — if not, please read it now, plus EDEN_Rebuild_Brief_v1.md and brand/copia-frontend-design.md, before doing anything else.

Three setup tasks before we start building:

1. Install the frontend-design plugin:
   /plugin install frontend-design@anthropics/claude-code

2. Copy our project-local design directive into Claude Code's skills folder so it auto-activates alongside the Anthropic plugin:
   mkdir -p .claude/skills/copia-frontend-design
   cp brand/copia-frontend-design.md .claude/skills/copia-frontend-design/SKILL.md

3. Skim brand/copia-hero-screens.html so you have the visual target for what we're building.

Then propose a Day 1 plan. I want to:
- Scaffold the Next.js + TypeScript + Tailwind + shadcn/ui + next-pwa + Supabase + Mapbox + Anthropic SDK stack
- Wire all Copia design tokens (the 10 palette colors, the type stack with Aptly Medium + Söhne fallback + JetBrains Mono, the spacing scale) into Tailwind config and CSS variables
- Drop the leaf-mark SVG into /public/ as favicon + 180x180 apple-touch-icon
- Set up the manifest.json with the mint-on-forest app-icon tile per the leaf-mark usage spec
- Build a /design-system/ internal route that renders the live component library as a single page (the foundation everything else extends from)

Don't actually scaffold yet — propose the plan first so we can review the file structure, the package list, and the order of operations. Once I approve, we start scaffolding.
```

---

## 5. What to expect

Claude Code will read the brief + directive + hero screens, install the frontend-design plugin, set up the local skill, and come back with a Day 1 plan you can review and approve. From there:

- **Day 1–2:** Scaffold + design tokens + design-system internal route + PWA setup
- **Day 3–6:** Buyer flow end-to-end (Home → Search → Seller → Product → Cart → Checkout → Orders) with seeded Austin data
- **Day 7–10:** Seller flow end-to-end (Onboarding → Listings → Orders → Calendar → Analytics)
- **Day 11–13:** AI features against the Claude SDK — Growing Coach last because it's the hero moment
- **Day 14:** PWA polish (splash screens, install prompt), Vercel deploy
- **Day 15+:** Case study writeup

Roughly two focused weeks. Realistic if you're spending half-days; longer if it's evenings + weekends.

---

## What to do if anything goes wrong

- **Claude Code can't find a file** → it might be looking in the wrong cwd. Confirm you're in `~/Desktop/EDEN` and try again.
- **Plugin install fails** → try `/plugin search frontend-design` to see the exact installation command.
- **You want to come back to Cowork mid-build** → totally fine. The brief + brand files are the same source of truth in both. Cowork can help with planning, content writing, brand decisions, case-study draft, etc. Claude Code is where the code lives.

---

## What Cowork did vs. what Claude Code will do

| | Cowork (Stage 1 + 2) | Claude Code (Stage 3) |
|---|---|---|
| Brief, scope, brand decisions | ✓ | reads the existing brief |
| Brand artifacts (palette, marks, motif, screens) | ✓ | reads + applies them |
| Actual app code (Next.js, components, API routes) | — | ✓ |
| Database schema, seed data, migrations | — | ✓ |
| Deploy + PWA install path | — | ✓ |
| Case study writeup | both | both |

Welcome to Stage 3. Have fun.
