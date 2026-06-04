# Copia — Project Context

This file is auto-loaded by Claude Code on every session in this directory. Read it first.

## What this project is

**Copia** (originally founded in 2021 as EDEN) — a peer-to-peer marketplace for local fresh produce, "the Airbnb for farmers markets," being rebuilt in 2026 as a portfolio piece for Garrison Bullock. The deliverable is an **iPhone-first responsive PWA** plus a written case study, aimed at product/UX hiring managers.

## Status

**Stage 1 (Plan & Scope):** closed. See changelog in the brief.
**Stage 2 (Brand identity + 3 hero screens):** closed. All artifacts live in `/brand/`.
**Stage 3 (Build):** starting. This is the work happening in Claude Code.

## Required reading before any work

Always load these into context before designing, coding, or planning anything for this project:

1. `EDEN_Rebuild_Brief_v1.md` — master brief (scope, brand, tech stack, schedule, case study structure). Source of truth.
2. `brand/copia-frontend-design.md` — design directive that encodes the Neo-Natural visual direction, the iPhone-first PWA requirements, and the long list of generic-AI defaults we explicitly forbid. **This file is structured as an installable SKILL.md** — copy it to `.claude/skills/copia-frontend-design/SKILL.md` so it auto-loads alongside the upstream `frontend-design` plugin.
2b. `brand/copia-voice.md` — the writing-voice directive (added 2026-06-04): the register, the case-study prose rules, and the ban list of AI-prose tells. Governs every sentence the way the frontend directive governs every pixel. **Also structured as an installable SKILL.md** — copy it to `.claude/skills/copia-voice/SKILL.md`.
3. `brand/copia-palette-card.html` — color system with computed WCAG contrast pairings.
4. `brand/copia-leaf-mark-usage.html` — leaf mark variants, sizes, app icon, lockups, do/don't.
5. `brand/copia-motif-system.html` — the Leaf Wave pattern at three densities with production-ready SVG.
6. `brand/copia-hero-screens.html` — the three validated hero screens (buyer Home, seller Dashboard, AI Growing Coach). These are the visual targets for the build.
7. `brand/copia-logo-svgs/` — five logo SVGs (gummy wordmark, flat wordmark, lockup with MARKETPLACE, leaf mark, cornucopia composition).

These are not references. They are constraints. If a build decision contradicts what's in these files, the files win — escalate to Garrison if the contradiction is intentional.

## Recommended plugin install

Before doing any frontend work, run:

```
/plugin install frontend-design@anthropics/claude-code
```

Then copy this project's directive into the local skills folder so both plugins activate together:

```
mkdir -p .claude/skills/copia-frontend-design .claude/skills/copia-voice
cp brand/copia-frontend-design.md .claude/skills/copia-frontend-design/SKILL.md
cp brand/copia-voice.md .claude/skills/copia-voice/SKILL.md
```

The upstream plugin provides the general "don't ship generic AI UI" guardrail; the local one provides the Copia-specific direction and forbidden patterns.

## Tech stack (locked)

- **Framework:** Next.js 14+ (App Router), TypeScript
- **Styling:** Tailwind CSS, configured with Copia design tokens as CSS variables
- **Components:** shadcn/ui as the base, always restyled to Copia via the design system's CSS variable layer (never default shadcn shipping)
- **PWA:** `next-pwa` (or hand-rolled service worker), `manifest.json` with the Copia leaf mark as the iOS app icon (mint on forest tile), Apple-specific meta tags for standalone-mode install
- **Database + auth + storage:** Supabase (Postgres, auth, file storage for product photos)
- **Maps:** Mapbox
- **AI:** Anthropic SDK (Claude)
- **Hosting:** Vercel
- **Email:** Resend (if needed)
- **Analytics:** Vercel Analytics or Plausible

## Critical constraints

- **iPhone-first PWA**, not a native Swift app. 390 px logical width baseline. Safe-area handling via `env(safe-area-inset-*)`. 44 pt minimum touch targets. 16 px+ font-size on inputs (to prevent iOS Safari zoom-on-focus). Test in real mobile Safari, not just Chrome DevTools.
- **Demo city:** Austin, TX. All seeded data should be Austin-specific (East Austin, Hill Country, Round Rock, Dripping Springs, Wimberley, etc.).
- **Stubbed payments only** — card, USDC, Bitcoin lanes designed but no real money moves. Same for delivery integrations (bicycle / motorcycle / drone / zipline drone all UI-only).
- **No real users, no real funding.** This is a portfolio piece. The demo is convincing because it's well-built, not because it's real.

## Build order (suggested)

1. Scaffold Next.js + Tailwind + Supabase + Mapbox + Anthropic SDK with `next-pwa`. Wire CSS variables from the palette card. Drop the leaf-mark SVG into `/public/` as both favicon and `apple-touch-icon`.
2. Build a `/design-system/` route that renders the live component library + the palette card + the motif system as a single internal page (Storybook-style). This is the foundation everything else extends.
3. Buyer flow end-to-end (Home → Search → Seller profile → Product → Cart → Checkout → Order history). Seed Austin sellers + products. Stub payment.
4. Seller flow end-to-end (Onboarding → Listing creation → Listings management → Orders → Calendar → Analytics). Tie into the same seeded data.
5. AI features wired against the Claude SDK. **Growing Coach last** — it's the hero AI moment of the case study and should be polished, not rushed.
6. PWA polish: splash screens, app icon tile, install prompt UX, standalone-mode detection.
7. Deploy to Vercel. Acquire a domain (suggest `copia.market` or similar).
8. Write the case study, organized per `§11` of the brief.

## Anti-patterns — read the directive before writing any UI

`brand/copia-frontend-design.md` lists every visual / typographic / generic-UI failure mode we explicitly forbid. Read it before generating any component. Highlights: never pure black (use charcoal `#1A1A1A`), never Inter in production (it's a Söhne stand-in only), never default shadcn shipping, never the dashboard "metric card with up-arrow," never AI sparkle ✨ emoji, never purple gradients, never trust-badge rows, never SaaS-hero formula.

## How Garrison wants to work

- Confirm direction before scaffolding. Don't generate a 200-file Next.js skeleton without alignment first.
- One memorable moment per screen — design for it.
- Refined editorial > maximalist busy. Restraint is the system.
- iPhone-first means **test on iPhone**, not just emulate it.
