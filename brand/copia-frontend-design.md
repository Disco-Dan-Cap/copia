---
name: copia-frontend-design
description: Design directive for any Copia frontend work — HTML brand artifacts, React product screens, marketing pages, the lot. Encodes the Neo-Natural visual direction and forbids the generic AI design defaults that would erase the brand. Use whenever generating UI for Copia.
license: Project-local. Adapted from anthropics/claude-code/plugins/frontend-design/SKILL.md (MIT) and localized to Copia.
---

# Copia Frontend Design Directive

## Provenance

This document is a project-local adaptation of Anthropic's `frontend-design` skill (`anthropics/claude-code/plugins/frontend-design/skills/frontend-design/SKILL.md`). The structure, headings, and the "design thinking before code" framing come from there. The specifics — what to do, what to never do — are Copia's. When this project moves into Claude Code in Stage 3, install the upstream skill (`/plugin install frontend-design@anthropics/claude-code`) as well; the two are complementary, not competing.

---

## The brand in one paragraph

Copia (formerly EDEN, founded 2021) is a peer-to-peer marketplace for local fresh produce — the "Airbnb for farmers markets" — being rebuilt in 2026 as a portfolio piece. The brand direction is **Neo-Natural**: a retro-natural identity (gummy 1972-Berkeley-co-op wordmark, op-art adjacent leaf forms, mint + forest greens) wrapped around a premium-editorial product UX (cream canvas, computed accessibility, generous whitespace, editorial type). **Heritage on the outside, future on the inside.** Lineage to keep in mind: Recess, Olipop, Liquid Death, Magic Spoon, Brightland. Every screen should look like it could have been printed on a 1972 produce-box label AND that a 2026 art-direction-led studio shipped it last week. The tension between those two readings is the brand.

---

## Required reading before writing any UI

Load these into context before designing or coding any Copia screen:

1. `EDEN_Rebuild_Brief_v1.md` — the master brief (§5 brand direction, §6 seller spectrum, §7 feature inventory)
2. `brand/copia-palette-card.html` — color system with computed contrast pairings
3. `brand/copia-leaf-mark-usage.html` — leaf mark variants, sizes, clear space, do/don't
4. `brand/copia-motif-system.html` — Leaf Wave pattern, three densities, color pairings, copy-paste SVG
5. `brand/copia-logo-svgs/` — five logo SVGs (gummy wordmark, flat wordmark, lockup with MARKETPLACE, leaf mark, cornucopia composition)

These are not references — they are constraints. If a design decision contradicts what's in those files, the files win.

---

## Design Thinking — answer these before writing code

Adapted from Anthropic's skill. Most of these answers are pre-locked for Copia; if you find yourself wanting to override them, that's a strong signal to pause and ask the user.

- **Purpose.** What problem does this specific screen solve? Who is on it (buyer, seller, both) and what archetype within that role (backyard grower vs. small farm vs. specialty maker)?
- **Tone — LOCKED.** Neo-Natural. Retro-natural identity + premium-editorial product UX. Do not invent a different tone for an individual screen; localize within the locked tone (the seller dashboard is more functional/editorial; the splash screen is more brand/retro; both still read as Copia).
- **Constraints.** In Stage 2 (brand & screen design): HTML + Tailwind-ish inline CSS, self-contained files in `/EDEN/brand/`. In Stage 3 (build): Next.js 14+ App Router, TypeScript, Tailwind, shadcn/ui as a starting layer that is **always restyled** to Copia, Supabase, Mapbox, Anthropic SDK. Mobile-first responsive. WCAG AA minimum.
- **Differentiation.** What's the one thing someone will remember from this screen? "The leaf turning into a chart on the seller dashboard." "The cornucopia mark spilling open during the splash animation." "The AI Growing Coach's letter-style monthly plan that reads like a friend wrote it." Every hero-level screen needs a memorable specific.

**Then commit.** Choose the conceptual direction for the screen and execute it with precision. Refined minimalism and bold maximalism both work in Copia — the palette card is the former, a packaging hero would be the latter. **Intentionality, not intensity.**

---

## The Copia Aesthetics Guidelines

### Typography

- **Display: Aptly Medium, always.** No substitutions in hero contexts, wordmarks, marketing headlines, or anywhere the user is meant to feel the brand. Identified from the source SVG (`Copia logo - B.svg`, font-family: AptlyMedium).
- **Body / UI: Söhne** (Klim Type Foundry) in production. **Inter** is the stand-in for the brand-artifact HTML files only because Söhne is licensed; mark any Inter usage as a TEMPORARY substitution and never let it ship.
- **Mono: JetBrains Mono** for eyebrow labels, section numbers, hex codes, and any chrome that should feel like documentation. 10–12px, uppercase, letter-spacing ~0.12–0.18em.
- **Pair the families, don't blend them.** Aptly carries the brand voice. Söhne carries the message. Mono carries the metadata. Each family stays in its lane.
- **Italics are rare and load-bearing.** A single italic phrase in a headline ("seamless *and* personalized") is allowed when it earns the emphasis. Italic body copy is never used decoratively.

### Color & Theme

The full system lives in `brand/copia-palette-card.html`. Critical rules:

- **Cream (`#FAF6EE`) is the in-product canvas.** Not mint. Mint is for brand moments — splash, marketing hero, packaging, the wash behind the gummy logo. Mint at screen scale exhausts the eye; cream at screen scale invites the eye to stay.
- **Charcoal (`#1A1A1A`) carries body, never pure black.** Pure `#000` on cream reads digital and harsh — the opposite of Copia.
- **Forest (`#1C664D`) carries voice.** Headlines, primary buttons, the wordmark itself. Body type stays charcoal.
- **Terracotta (`#C46A4F`) is the only spike.** Notifications, badges, "new" markers, urgent CTAs. If terracotta appears more than once per screen, something's wrong with the screen.
- **CSS variables for the whole palette, no inline hex.** Even in HTML artifacts.
- **Dominant colors with sharp accents > timid, evenly-distributed palettes.** A screen that is 70% cream, 20% forest, 8% sage, 2% terracotta beats a screen with five equal-weight greens.

### Motion

- **One well-orchestrated reveal beats five scattered micro-interactions.** When the splash screen loads, the gummy wordmark settles in with a single staggered animation — the multi-layer offset shadows resolving from outside-in, then the leaf landing on the P. That moment is worth all the motion budget for that screen.
- **Hover states should feel like the leaf catches light.** Subtle. A 200–300ms color/opacity shift that suggests the surface is alive without insisting.
- **CSS for HTML, Motion (motion.dev) for React.** No Framer Motion legacy, no GSAP unless absolutely necessary.
- **Respect `prefers-reduced-motion`.** Always.
- **No motion for motion's sake.** Loading spinners can use the leaf mark; gratuitous "AI thinking" sparkle animations are forbidden.

### Spatial Composition

- **Editorial mode (in-product, palette card, leaf mark spec).** Generous whitespace. Single-column 1100px max. Section numbers in the eyebrow. Hairline rules in forest at 30% opacity. Don't be afraid of an empty third of the screen — restraint is the design.
- **Brand-moment mode (splash, marketing hero, packaging).** Mint full-bleed. Wordmark or cornucopia composition centered. Almost nothing else. The viewer should feel the gesture before they read.
- **Asymmetry is allowed when it's the point.** A 60/40 split that puts the seller's photo on one side and their listings inventory on the other reads more like a magazine spread than a database. Use it when the content asks for it; don't force it.
- **Grid-breaking elements.** A leaf mark that hangs slightly off the edge of a card. A headline that crosses the column rule. Use sparingly and always intentionally.

### Backgrounds & Visual Details

- **The Leaf Wave motif at sparse density (`leafWave-sparse`) at 0.5 opacity or lower is the in-product textural default.** Used for empty states, splash screens inside the app, anywhere that wants warmth without busy-ness.
- **Dense motif (`leafWave-dense`) only behind quiet content.** A wordmark, a single big headline, a logo lockup. Not behind cards, lists, or paragraphs.
- **Cream surfaces should feel like paper, not screen.** A very subtle grain or noise overlay (~3–5% opacity) is appropriate on hero surfaces. Pure flat cream is fine but feels slightly digital.
- **Shadows are warm and soft.** `0 8px 24px rgba(30, 61, 48, 0.12)` not `rgba(0, 0, 0, 0.5)`. The shadow color comes from `--deepest-forest`, not black.
- **No glassmorphism, no neumorphism, no skeuomorphism.** These conflict with the retro-print brand DNA.

---

## Platform: iOS / iPhone-first

Copia is built as an iPhone-first responsive Progressive Web App. The iPhone is the primary canvas; desktop is the secondary experience for recruiters and stakeholders clicking around. Every screen is designed to live on an iPhone first and prove out at scale second.

### Baseline

- **Logical width 390 px** — the iPhone 14/15/16 Pro size. Design at this width by default.
- **Responsive ladder.** Small (375 px, iPhone Mini / iPhone SE), baseline (390 px, iPhone 14 Pro), large (430 px, iPhone Pro Max). Tablet (768 px) and desktop (1024+ px) are derivative; never the primary view.
- **Test in real mobile Safari**, not just Chrome DevTools' device emulator. The emulator lies about touch behavior, scroll feel, font rendering, viewport units, and PWA install flow.

### Safe areas are sacred

Use `env(safe-area-inset-top)` and `env(safe-area-inset-bottom)` for any UI chrome — headers, tab bars, sticky CTAs. Backgrounds and motifs run full-bleed underneath; content respects the inset.

- **Top inset (44–59 px)** — Dynamic Island / notch zone. Status bar lives here. App headers begin below this.
- **Bottom inset (34 px)** — home-indicator gutter. Tab bars and bottom-anchored CTAs sit above this; their tap area can extend down into it visually but the touch target itself stays above.
- **Left / right insets** — relevant only in landscape (which Copia doesn't optimize for). Default `0` in portrait.

### Touch targets — 44 pt minimum, Apple HIG

Every tappable element is at least **44 × 44 pt** (≈ 44 × 44 CSS px). This applies to:

- Tab bar icons (visually smaller, but the hitbox is 44 pt)
- Icon-only buttons in headers
- List-row affordances (chevrons, action buttons)
- Form-field labels acting as tap targets
- Any anchor in a navigation menu

Use generous vertical padding on list rows (12–16 px top + bottom) to hit this without the row looking inflated.

### Inputs do not zoom on focus

Mobile Safari auto-zooms when a focused input has `font-size < 16px`. **Every text input, textarea, and select must have `font-size: 16px` or larger.** No exceptions — even on small-phone breakpoints.

### Scroll feel

- **Momentum on iOS** — `-webkit-overflow-scrolling: touch` on any scrollable container (horizontal scrollers, modals, drawers). Without it, scrolling feels dead-flat compared to native apps.
- **Disable pull-to-refresh on the app shell** — `overscroll-behavior-y: contain` (or `none` on body) so the page itself doesn't rubber-band-refresh when a user scrolls past the top of a sticky section. Allow it inside specific scrollable regions where it makes sense (e.g., a feed).
- **Don't intercept the left-edge swipe-back gesture.** iOS users expect to swipe from the left edge to go back. Custom horizontal swipes inside content are fine; full-screen left-edge handlers are forbidden.

### PWA install path — the brand DOES live on the home screen

The PWA install is a brand moment. Get it right.

- **`manifest.json`** — `name: "Copia"`, `short_name: "Copia"`, `display: "standalone"`, `start_url: "/"`, `theme_color: "#1C664D"` (forest), `background_color: "#FAF6EE"` (cream — for the splash before the app loads).
- **App icon** — the leaf mark in mint (`#9CE5D0`) centered on a forest (`#1C664D`) rounded square tile per the leaf-mark usage spec. Provide 192 × 192 and 512 × 512 at minimum; ideally include 180 × 180 as `apple-touch-icon` so Safari uses it instead of taking a screenshot.
- **Apple-specific meta tags** in `<head>`:
  - `<meta name="apple-mobile-web-app-capable" content="yes">` — enables standalone mode when launched from home screen
  - `<meta name="apple-mobile-web-app-status-bar-style" content="default">` — keeps the status bar legible against cream. Use `black-translucent` only when paired with a full-bleed dark hero AND proper safe-area handling
  - `<meta name="apple-mobile-web-app-title" content="Copia">` — the label under the home-screen icon
  - `<link rel="apple-touch-icon" href="/apple-touch-icon.png">` — 180 × 180
- **Splash screens** — iOS doesn't auto-generate them. Provide hand-tailored splash images for the main iPhone sizes. This is a *brand moment*; don't ship a generic white screen. **Direction (revised 2026-06-02, supersedes the original "cornucopia composition" call):** the splash is the **gummy "COPIA" wordmark on retro mint** — the layered/echoed-outline construction in `brand/copia-splash-mint.svg`. Rationale: the wordmark assembling itself from its concentric layers is a stronger single-moment beat than the cornucopia, the gummy wordmark is sanctioned here because a splash is a brand moment (the gummy-wordmark prohibition is nav/chrome-only, §"NEVER"), and there is no production cornucopia SVG. The mint field pairs with the dark status bar and transitions calmly into the cream app; a dark variant exists at `brand/copia-splash-dark.svg` for any future dark context. The native iOS launch image is a flat PNG (iOS can't animate launch images); the motion lives in an in-app splash overlay (see build notes).
- **Standalone-mode awareness** — when `window.matchMedia('(display-mode: standalone)').matches`, the app is launched from the home screen. Hide any "browser-only" hints (like "Add to Home Screen" prompts).

### State styling for touch

- **`:active` and `:focus-visible` matter; `:hover` mostly doesn't.** Design pressed states (slightly darker, ~95% scale, or a brief opacity dip) for every primary interactive element.
- **Tap highlights** — disable the default blue rectangle with `-webkit-tap-highlight-color: transparent` on `<body>` or `<html>`, then design custom press states. The default is iOS Safari's signature "this looks unfinished" tell.

### Font fallback stack

The full body stack — even though we always load Söhne — is:

```css
font-family: "Söhne", -apple-system, BlinkMacSystemFont, "SF Pro Text", "Inter", system-ui, sans-serif;
```

`-apple-system` resolves to San Francisco on iOS, so the FOUT (flash of unstyled text) before Söhne loads looks intentional, not broken. Inter is in there for the brand-artifact HTML files during Stage 2 only.

Aptly Medium has no system fallback — render the wordmark from SVG outlines if Aptly hasn't loaded yet.

### iOS-specific NEVERs

Adding to the broader NEVER list below:

- **Never fake a back button** that fights the system swipe-back. If you need a back arrow, put it in the header AND don't intercept the left-edge swipe.
- **Never a custom keyboard.** Use the native iOS keyboard. Set `inputmode` (`numeric`, `decimal`, `email`, etc.) so iOS shows the right one.
- **Never copy that says "this website."** It's an app. Refer to it as Copia, the app, or just leave it implicit.
- **Never a "download our app" banner** on the web view. The path is "Add to Home Screen" via Safari share sheet; we'll surface that as a tasteful, one-time prompt at the right moment (probably after a buyer's first successful order).
- **Never a status-bar color that fights the screen.** If the screen is cream, the status bar is dark. If the screen is forest or mint full-bleed, plan the status bar (`black-translucent` with proper top-inset handling).

### Why iPhone-first (the case study beat)

When the case study explains the platform decision, the framing is: *"iPhone-first PWA, not Swift app — because the goal is to ship something installable on a recruiter's phone in 10 seconds, demonstrate the product across web and mobile contexts with one codebase, and keep React Native and native iOS open as future paths without burning weeks now."* Future-path optionality is the strategic argument. Speed-to-recruiter-hand is the practical one.

---

## NEVER (Copia-specific anti-patterns)

### Visual

- **Never pure black.** Use `--charcoal` (`#1A1A1A`).
- **Never gradients across two brand colors.** Forest-to-mint gradients look like every other sustainability startup. Single-color blocks only.
- **Never default shadcn/ui without restyling.** shadcn is a starting layer; every component must be passed through Copia's CSS variable system before shipping.
- **Never default Material Design components.** No Material Symbols icons, no MUI, no Material elevation.
- **Never the leaf mark stacked on its own pattern.** Don't put the leaf on top of the Leaf Wave motif. The mark says "Copia"; the pattern means "Copia"; they collide.
- **Never body text directly on the motif.** Cream panel underneath, or knock the motif out.
- **Never the cornucopia composition for app nav, favicon, or any UI chrome.** That asset is for marketing identity contexts only.

### Typographic

- **Never Inter in production.** It is a Söhne stand-in for brand-artifact HTML files only.
- **Never "close enough" condensed sans as a substitute for Aptly Medium.** Bebas Neue, Oswald, Anton, Saira Condensed — all wrong. If Aptly isn't loaded, render the wordmark from SVG.
- **Never the gummy wordmark in app nav.** Use the simplified wordmark or the leaf mark.
- **Never ALL CAPS body copy.** Eyebrow labels and section chrome can be caps + letter-spaced; body never.
- **Never two display fonts on the same screen.** Aptly is the only display; everything else is Söhne or mono.
- **Never Google Fonts "trending" defaults.** Space Grotesk, Plus Jakarta Sans, DM Sans, Manrope — all forbidden. The frontend-design SKILL.md explicitly calls out the "AI converging on Space Grotesk" failure mode.

### Generic UI tropes

- **Never the dashboard "metric card with up-arrow."** If the seller dashboard needs metrics, design them as editorial figures, not analytics-app cards.
- **Never the SaaS hero formula** ("Build X better" + product screenshot + gradient background + three-up feature row).
- **Never the marketplace "trust badges row"** (As Seen In / 5-Star Rating / Featured Partners). Quietly earn trust through copy and craft, not stamps.
- **Never the "AI sparkle" emoji (✨) for AI features.** Copia's AI moments — the Growing Coach especially — have their own visual language built from the leaf mark.
- **Never purple gradients on white. Anywhere.** This is the canonical "AI slop" tell.
- **Never the "Loading…" text spinner.** Use the leaf mark animating.
- **Never iOS/Android system blue for links.** Forest, always.

### Copy

- **Never marketing-speak hyperbole.** "Revolutionary," "game-changing," "AI-powered," "next-generation," "seamless" — all forbidden in product copy and headlines. The brand voice from the brief: *"warm, confident, slightly knowing. Never preachy. Never crunchy. Reads like a thoughtful editor wrote it, not a marketing team."*
- **Never "Welcome back, [Name]!"** Use something like "Good to see you" or just the function.
- **Never the emoji-in-button-text pattern** ("🌱 Start growing").

---

## When in doubt — three diagnostic questions

Before shipping any screen, run it through these:

1. **Would a 1972 Berkeley food co-op print this label?** If the design feels purely digital with no print-design DNA, the retro half of Neo-Natural is missing.
2. **Would a 2026 art-direction-led studio (e.g., COLLINS, Order, Pentagram NY) ship this screen?** If it feels like Bootstrap + a green palette swap, the editorial half is missing.
3. **Is there one specific moment a user would remember and describe to a friend?** If you can't name it, the screen is competent but unmemorable — go back and find the moment.

If any answer is no, redesign before shipping.

---

## Implementation complexity scales with vision

Adapted from the upstream skill: maximalist designs need elaborate code with extensive animations and effects. Minimalist or refined designs need restraint, precision, and meticulous attention to spacing, typography, and subtle details.

Copia is **mostly refined** with **occasional maximalist moments**. The palette card, leaf mark spec, and motif system are refined to the millimeter. The splash screen, packaging hero, and case study cover should feel maximalist — full-bleed, hand-set, deliberate. Don't confuse "refined" with "thin" or "maximalist" with "busy."

---

## Production handoff

When this project moves to Stage 3 (Claude Code build):

1. Install Anthropic's upstream skill: `/plugin install frontend-design@anthropics/claude-code`
2. Copy this file (or its frontmatter+body) to `.claude/skills/copia-frontend-design/SKILL.md` in the project root so it auto-loads alongside the Anthropic skill.
3. The two skills work together: upstream provides the general "don't make generic AI UI" guardrail; this provides the Copia-specific direction and forbidden patterns.

---

## Remember

Claude is capable of extraordinary creative work on this project. Don't hold back. Commit fully to Neo-Natural. Every Copia screen should make a designer who has never heard of the project say "wait — what is this, who made this, how do I find more of their work."

That reaction is the case study. The work is the proof.
