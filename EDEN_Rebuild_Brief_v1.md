# Copia — Brand & Product Brief
*Source-of-truth document for the rebuild. Locks scope, brand, and tech decisions before design and build.*

**Status:** v1.8 — Stage 2 closed; iPhone-first PWA added to Stage 3 plan
**Owner:** Garrison Bullock
**Started:** May 21, 2026
**Note on naming:** The project was founded in 2021 as **EDEN**. In the 2026 rebuild it has been renamed **Copia** — see §5 for rationale. The Desktop folder still uses the EDEN name as the historical project root.

---

## 1. What we're making

A portfolio-grade rebuild of **Copia** (founded in 2021 as EDEN) — the peer-to-peer marketplace for local fresh produce originally designed and pitched in 2021 by Garrison Bullock, Stephanie Frank, and Shkar Mohammed in the University of Louisville's Venture Lab II program. The rebuild has two deliverables that work as a pair:

1. **A written case study** — problem, original 2021 vision, what changed, design process, decisions made, and rationale.
2. **A working interactive iPhone-first PWA** (Progressive Web App), responsive across breakpoints, that demos both the buyer and seller sides of the marketplace with realistic seeded data. Lives at a real URL, installable to an iPhone home screen from Safari ("Add to Home Screen"), launches in standalone mode without browser chrome, and feels native-iOS in its scrolling, gestures, safe-area handling, and touch targets. Recruiters can scroll through it on desktop; they should *also* be able to install it on their phone in two taps and use it like a real app.

The whole thing is aimed at product/UX hiring managers at tech, marketplace, and food-tech companies.

## 2. Goals for the portfolio piece

- **Show range.** Brand strategy → identity design → design system → product design → working frontend. Designer who can take an idea all the way to a shipped, functional product.
- **Show product thinking.** Not a pretty mockup — a defensible product with explicit user flows, AI rationale, and a coherent business model behind it.
- **Show storytelling.** The case study should read like a piece you'd find in a top-tier design publication. Problem → research → vision → design decisions → outcome.
- **Be skimmable in 3 minutes and deep-readable in 20.** Hiring managers skim; the curious dive.

## 3. Scope

**In scope for MVP:**
- Buyer side, end to end (discover → seller profile → product detail → cart → checkout → pickup/delivery → order history)
- Seller side, end to end (onboarding → listing creation → listing management → order management → simple analytics → messaging)
- Cross-cutting: messaging, profile/settings, notifications, search

**Stretch (only if we have time after MVP):**
- Copia University — curated growing guides, monthly planting calendar, recipe content
- Community/social layer (the EDEN Community pillar from the 2021 deck)

**Out of scope:**
- Real payments — all payment methods (card, USDC, BTC) are stubbed. UI flows look complete, no money or assets actually move.
- Real third-party delivery integration (UberEats/Grubhub — visual stub only)
- **Native iOS app written in Swift/SwiftUI** — the iPhone-first PWA is the deliverable. The case study can note React Native or native iOS as future paths but won't ship them.
- Native Android app
- Multi-language (the 2021 differentiator) — too much surface for a portfolio demo
- Real-time chat backend (mock messages with realistic timestamps is enough for the demo)

**iPhone-first PWA (in scope):**
- **Designed for iPhone primary** (390 px logical width baseline — iPhone 14/15 Pro), responsive up to iPhone Pro Max (430 px) and gracefully scaled to small phones (375 px) and tablets/desktops.
- **PWA install path** — `manifest.json` with the Copia leaf mark as the app icon (mint on forest tile per the leaf-mark spec), `theme-color` and `apple-mobile-web-app-status-bar-style` set so Safari install behaves like a real app, service worker registered for offline shell.
- **Safe-area aware** — `env(safe-area-inset-*)` for top (Dynamic Island / notch) and bottom (home indicator). Tab bars + headers sit inside the safe area; backgrounds + motifs run full-bleed underneath.
- **Native-feeling interactions** — momentum scrolling (`-webkit-overflow-scrolling: touch`), 44 pt minimum touch targets per Apple HIG, swipe-back gesture not blocked, no zoom on input focus (`font-size: 16px+` on inputs), no rubber-band-overscroll on the app shell.
- **System font stack fallback** — when Söhne isn't loaded yet, fall back to `-apple-system, BlinkMacSystemFont` (San Francisco) before generic sans-serif. Aptly Medium is always loaded as a web font; never falls back.
- **Tested in real mobile Safari**, not just Chrome DevTools' device emulator.

**Payment design (in scope):**
- Three payment lanes at checkout: **card**, **USDC**, **Bitcoin**. Equal visual weight, no Web3 maximalist copy. The brand is farm-co-op-in-1972, not crypto-bro — payments feel like quiet financial infrastructure.
- **Sellers choose which methods they accept** as part of their dashboard settings. This ties into the seller spectrum: Backyard Growers might accept only card + USDC, Small Farms accept all three, Specialty Makers may want Bitcoin as a hold-asset.
- **USDC** stays priced in USD, settles in USDC. Familiar number, modern rails.
- **Bitcoin** displays USD equivalent + BTC amount with a "rate locked for 5 minutes" UI to remove volatility friction in the moment.
- Case study framing: small farmers are squeezed by payment-processor fees on already-thin margins. USDC settles instantly at near-zero cost. Bitcoin gives sellers a hold-asset option. Modern payments for traditional commerce.

## 4. Demo setting

**Locked: Austin, TX.**

Austin is the right setting because it serves the full Copia thesis — not just buyers finding local sellers, but buyers *becoming* sellers. The original seven-step journey (Introduction → Education → Implementation → Cultivation → Transaction → Liberation) requires that ordinary users can actually grow something to sell. That breaks in dense urban markets like Brooklyn or Manhattan and works in Austin:

- **Climate.** USDA zone 8b/9a, long growing season, mild winters. Tomatoes, peppers, herbs, leafy greens, squash can be grown most of the year. The "I'm going to plant a few rows and sell on Copia" story is plausible.
- **Land.** Real yards in central Austin, bigger yards in the suburbs (Round Rock, Pflugerville, Cedar Park), and the Hill Country region (Lockhart, Bastrop, Wimberley, Dripping Springs) is dense with small and medium farms within delivery range.
- **Cultural fit.** Strong food city — Whole Foods + HEB origin story, real farmers market scene (Mueller, SFC Downtown, Barton Creek), serious BBQ + Tex-Mex + farm-to-table identity. Recruiters recognize it instantly.
- **Narrative.** Suburbanites converting lawns to gardens for side income is a credible, current cultural story in Austin in a way it just isn't in dense urban markets.

## 5. Brand rebrand direction — "Neo-Natural" + the rename

**Locked: Neo-Natural.** A full rebrand that pairs a retro-natural brand identity with a premium-editorial product UX. Heritage on the outside, future on the inside.

The original 2021 brand DNA — the gummy "EDEN" wordmark on retro mint — is recovered, not retired. The case study reframes the 2021 design as the foundation, the rename to Copia as the strategic pivot, and the polished logo system + motif system + design system as the extension. (The Leaf Wave motif was invented fresh for Copia in May 2026 from the leaf-mark paths — the original 2021 brand did not include a pattern asset.)

**The rename: EDEN → Copia (locked, May 2026).**

The product was founded in 2021 as **EDEN** — biblical, evocative of paradise and a private garden. Revisiting the brand in 2026, the founding name was the wrong fit for what the product actually is:

- **EDEN evoked solitude.** A garden of one. Paradise as a place you withdraw to.
- **Copia evokes the harvest.** Abundance shared — what comes out of all those gardens together, brought to a common table or marketplace.

A peer-to-peer marketplace is *literally an act of abundance shared*. The name should do that work.

**Why Copia specifically:**
- Latin root: *abundance, plenty, wealth*. Direct ancestor of *cornucopia* — the horn of plenty, the harvest symbol.
- Short (5 letters, 2 syllables), easy to type, easy to say, easy to own.
- Uncommon as a consumer brand — radically more ownable than EDEN (which is over-used in food, hospitality, dating, beauty).
- Sits in the same naming register as Aesop, Olipop, Aperol — short Latinate names read as premium and editorial, which matches the locked brand direction.
- Bilingual bonus for Austin: "copia" in Spanish primarily means *copy*, but per the RAE its first definition is *"abundancia o gran cantidad de algo"* — abundance. Dual reading is a feature.

The case study tells the EDEN → Copia rename as a first-class narrative beat: founder self-critique, mature brand strategy, why a name change is sometimes the most important design decision in a product.

**Strategic frame.** Brands like Recess, Olipop, Liquid Death, Magic Spoon, and Brightland live at the intersection of retro brand identity and modern product UX. Copia belongs in that lineage. The brand says *"this could have existed in 1972 in a Berkeley co-op."* The product says *"this is the most thoughtful piece of software you've ever used to buy a tomato."* The tension between those two statements is the brand.

**Palette (locked, extracted from the source logo SVGs):**
- **Retro mint** `#9CE5D0` — hero / brand moments, splash screens, marketing pages, packaging
- **Light sage** `#74B5A1` — surfaces, soft fills, tags, info cards
- **Sage** `#509982` — the leaf mark, "MARKETPLACE" sub-line, illustrative accents
- **Sage shadow** `#4E8472` — dividers, borders, low-emphasis chrome (not for type)
- **Mid forest** `#30594A` — secondary type, eyebrow labels, mono captions
- **Forest** `#1C664D` — primary brand color, the COPIA wordmark, headlines, primary buttons
- **Deepest forest** `#1E3D30` — type on light, pressed states, outline strokes
- **Cream** `#FAF6EE` — the in-product canvas (mint is for brand moments, cream is for screens)
- **Charcoal** `#1A1A1A` (never pure black) — body type
- **Terracotta** `#C46A4F` — the single warm accent. Notifications, badges, urgent CTAs. The only non-green color in the system.

Full system with computed WCAG contrast pairings: `/brand/copia-palette-card.html`.

**Typography (locked):**
- **Display / wordmark: Aptly Medium** (Indian Type Foundry). Identified from the source COPIA wordmark SVG. The chunky retro condensed grotesque the wordmark is set in — also used for hero headlines and any moment that should feel like the brand is speaking. No "close enough" substitutes; if Aptly isn't loaded, render the wordmark as an SVG outline.
- **Body / UI: Söhne** (Klim Type Foundry). The editorial workhorse — pairs gorgeously with Aptly's apertures, sits in the same register as Frieze, The New Yorker, Bloomberg. **Inter** is the stand-in in brand-artifact HTML files only (Söhne is licensed); it never ships to production.
- **Mono: JetBrains Mono** for eyebrow labels, section numbers, hex codes, and documentation-style chrome. 10–12 px, uppercase, letter-spacing 0.12–0.18em.
- **Rare italic** for editorial emphasis — a single italic phrase in a headline ("seamless *and* personalized") when it earns the emphasis. Italic body copy is never used decoratively.

**Logo system — three pressure levels (Copia, May 2026):**
- **Full gummy lockup** — the puffy "COPIA" wordmark with multi-layer mint/forest offset shadow and the leaf integrated into the bowl of the P. Direct DNA continuation of the 2021 EDEN gummy logo. Used on splash, marketing pages, hero moments, packaging-style surfaces. Needs a "no outline" variant for use over photography or on cream surfaces.
- **Flat lockup with sub-line** — the flat single-weight COPIA wordmark in forest green with a sage sub-line slot (currently set as "MARKETPLACE"; the slot can also carry "Austin," a tagline, or be omitted). Used on app store listings, marketing one-pagers, and any context where the gummy version is too playful.
- **Simplified wordmark** — flat COPIA, forest green, leaf integrated, single-tier. The in-product workhorse. Used in app nav, headers, transactional emails, anywhere needing legibility at small sizes.
- **Leaf mark** — the standalone leaf in sage (#509982), portrait viewBox. Used as app icon, favicon, watermark, badges. Minimum size 16×22px digital. Full usage spec at `/brand/copia-leaf-mark-usage.html`.
- **Identity composition (cornucopia mark)** — the five leaf paths re-arranged into a flowing horizontal cornucopia gesture (sage), with the flat COPIA wordmark in Aptly Medium (forest) emerging from inside the arrangement. Landscape viewBox (1390×632). **The brand-identity expression** — used for marketing site hero, event signage, posters, packaging, press kit lead image, social profile banner, case study brand-reveal moment. *Not* for app nav, favicons, or tight UI chrome (use the simpler lockup or standalone mark for those).

**Brand motifs:**
- **Leaf Wave motif** — a tile-able pattern of the leaf-mark form at three densities (`leafWave-dense`, `leafWave-medium`, `leafWave-sparse`), invented fresh for Copia in May 2026 using the leaf-mark paths. Single-color only, four approved color pairings. Used with restraint on splash screens, loading states, marketing pages, and the case study itself. Full spec at `/brand/copia-motif-system.html`.
- **Leaf mark** as standalone symbol. Full usage rules at `/brand/copia-leaf-mark-usage.html`.

**Photography style:**
- Lifestyle-staged, never sterile studio.
- Warm tones, soft grain, golden-hour lighting where possible.
- Real Austin: backyards, raised beds, Hill Country farms, real growers and buyers.
- Produce photographed with intention (texture, dirt, imperfections welcome).

**Voice:**
- Warm, confident, slightly knowing. Never preachy. Never crunchy.
- Short sentences for hero copy, fuller sentences for explanations.
- Reads like a thoughtful editor wrote it, not a marketing team.

## 6. The seller spectrum

Copia's product design has to feel right for four distinct seller archetypes. The same app, four different first-day experiences:

- **The Backyard Grower.** One tomato plant, a few herbs, eggs from a backyard chicken. Casual, learning, will list one or two items. Needs help pricing, growing, and feeling legitimate enough to charge money.
- **The Suburban Gardener.** Quarter-acre plot, raised beds, intentional about growing for sale. Listing 5–15 items in a season. Wants the growing coach, the planning calendar, the small-but-real income.
- **The Small Farm.** 1–50 acres, often family-run, in the Hill Country region. Already commercial, probably already selling at a farmers market or running a CSA. Wants reach, analytics, and a less painful logistics layer. Mid-volume seller.
- **The Specialty Maker.** Honey, eggs, baked goods, jam, sourdough, salsa. Often doesn't grow at all but lives adjacent to this community. Easy to onboard (your 2021 customer-discovery surprise was that honey + egg sellers were the easiest).

**This matters for product design because:**
- Seller onboarding has to ask "what kind of grower/maker are you?" and adapt accordingly. A backyard grower's onboarding shouldn't ask the same questions as a 30-acre farmer.
- The seller dashboard needs to feel right at every scale — not overwhelming for the casual grower, not underpowered for the small farm.
- The **buyer-to-seller conversion flow** is a first-class product loop. Someone signs up as a buyer, learns from the growing coach over weeks or months, plants a few things, and graduates to listing their first item. That conversion is the heart of Copia's story and needs visible product surface — a "Start growing to sell" CTA, an onboarding path that doesn't require switching accounts, and progress visible to the user.
- The **AI growing coach** earns extra narrative weight because of this. It's not just a feature — it's the bridge that makes the backyard-to-seller conversion possible. Without it, the seller cold start is impossibly hard. With it, anyone with a balcony can plausibly become a seller. Still "lighter-touch AI" overall, but this is the AI moment that carries the case study.

## 7. Feature inventory

**Buyer side (MVP):**
- Onboarding (account, role select, location/neighborhood, dietary preferences)
- Home / Discover — map of nearby sellers + featured products + categorical entry points
- Search & filters — categories, price, distance, delivery options, diet/lifestyle, seller
- Seller profile page — story, products, ratings, "what's in season"
- Product detail page
- Cart
- Checkout — fulfillment + payment. Fulfillment options: **pickup**, **buyer–seller meetup**, or **delivery**. Delivery sub-options visible in the UI (all stubbed, no real integration): **bicycle courier**, **motorcycle / car** (Uber Eats / DoorDash-style), **standard drone**, **zipline drone with parachute drop**. Each delivery mode has its own ETA, price, range constraint, and small explainer — the seller spectrum determines which lanes a given seller offers (a Backyard Grower probably won't offer drone; a Small Farm probably will). Payment methods: card / USDC / Bitcoin, all stubbed.
- QR code pickup confirmation
- Order history
- Messaging (buyer ↔ seller)
- Favorites
- Profile / settings / notifications
- **"Start growing to sell" entry point** — visible from the buyer experience, drops the user into the seller onboarding flow without losing their buyer account

**Seller side (MVP):**
- Seller onboarding — **adaptive flow that asks "what kind of grower/maker are you?" first** (backyard, suburban gardener, small farm, specialty maker) and tailors the rest. Verification, location, what you grow/make, schedule.
- Seller dashboard — today's orders, this week's sales, weather, what's selling, a single AI insight card
- Listing creation — photo upload, AI-assisted description and price suggestion, inventory + availability
- Listing management — active, sold out, paused, edit
- Order management — incoming, accepted, in progress, completed
- Availability calendar — what you'll have when (the part that fixes farmers-market unpredictability)
- Messaging (seller ↔ buyers)
- Simple analytics — sales over time, top products, repeat buyers, demand signals
- **Payment method preferences** — which payment lanes the seller accepts (card / USDC / Bitcoin), with rationale and tradeoff copy
- Profile / settings

**AI features, woven throughout (lighter touch overall, growing coach gets weight):**
- **AI Growing Coach (the bridge feature).** Personalized to user's zone, yard size, sunlight, and skill level. Tells a backyard grower in zone 9a what to plant this month, when to water, when to harvest, what's likely to sell well in their neighborhood. This is the structural AI feature — it makes the buyer-to-seller conversion possible. Lives in onboarding and on the dashboard for active growers.
- Photo-to-listing (snap a basket of tomatoes → drafted listing with description + suggested price + estimated weight)
- Smart search on the buyer side ("dinner for 4, mostly veggies, $30" → assembled cart)
- Demand-forecasting hints on seller dashboard ("3 buyers in your area searching for basil this week")
- Buyer recommendations ("based on your past orders + what's in season near you")

The case study will frame this as "AI as the invisible improvement to a 2021 product" — and specifically as the unlock that made Copia's most ambitious idea (turning ordinary people into growers and sellers) actually achievable.

## 8. Design system principles

The design system is a portfolio artifact in its own right. Worth doing properly.

- **Single source of truth** for color, type scale, spacing, radius, shadow.
- **Component library** documented alongside the app (Storybook-style page or design-system gallery as part of the case study).
- **iPhone-first responsive.** Every screen designed for iPhone primary (390 px baseline), responsive up to iPhone Pro Max (430 px) and gracefully scaled to small phones (375 px), tablets, and desktop. Desktop is a secondary experience for recruiters clicking around.
- **iPhone safe-area + HIG sympathies.** All chrome respects `env(safe-area-inset-top/bottom)`. Touch targets are 44 pt minimum (Apple HIG). Scrolling uses momentum behavior. Inputs are 16 px+ font-size to prevent zoom-on-focus.
- **Accessibility.** WCAG AA contrast, keyboard navigation, semantic HTML, `prefers-reduced-motion` respected. Demonstrates seriousness.
- **Motion.** Subtle, intentional — transitions, hover states, micro-interactions that feel like a real product. One well-orchestrated load reveal beats five scattered animations.

**Brand-system artifacts (live in `/brand/`):**
- `copia-palette-card.html` — color system with computed WCAG contrast pairings
- `copia-leaf-mark-usage.html` — variants, sizes, clear space, app icon, lockups, do/don't
- `copia-motif-system.html` — the Leaf Wave pattern at three densities, with production-ready SVG
- `copia-frontend-design.md` — design directive that encodes Neo-Natural and forbids generic AI defaults (portable to Claude Code as a SKILL.md in Stage 3)
- `copia-logo-svgs/` — five logo SVGs (gummy wordmark, flat wordmark, lockup with MARKETPLACE, leaf mark, cornucopia composition)

## 9. Tech stack

Locked recommendation, optimized for: fast build in Claude Code, modern stack recruiters recognize, deployable to a real URL, capable of all the AI features without infra heroics.

- **Framework:** Next.js 14+ (App Router), TypeScript
- **Styling:** Tailwind CSS, configured with Copia design tokens as CSS variables
- **Components:** shadcn/ui as the base, always restyled to Copia via the design system's CSS variable layer
- **PWA:** `next-pwa` (or hand-rolled service worker if it gives us cleaner control), `manifest.json` with the Copia leaf mark as the iOS app icon (mint on forest tile, multiple sizes including the 180 px Apple touch icon), Apple-specific meta tags (`apple-mobile-web-app-capable`, `apple-mobile-web-app-status-bar-style`, `apple-touch-icon`)
- **Database + auth + storage:** Supabase (Postgres, auth, file storage for product photos)
- **Maps:** Mapbox (free tier covers a portfolio demo)
- **AI:** Anthropic API via the Claude SDK
- **Hosting:** Vercel
- **Email (if needed):** Resend
- **Analytics (light):** Vercel Analytics or Plausible

This stack is well-known, well-documented, fast to build with Claude Code, and produces a portfolio piece that demonstrates current technical fluency.

## 10. Schedule — rough "few focused weeks" plan

**Week 1 — Foundation.** Lock the brief, pick the brand direction, develop the brand identity (logo, palette, type, basic system). Output: brand guidelines doc + 2–3 hero screens designed in the new system.

**Week 2 — Full design.** Design every screen on both buyer and seller sides in the new system. Output: complete Figma (or HTML mockup) covering MVP scope.

**Week 3 — Build the buyer side.** Move to Claude Code. Stand up the project, build the buyer flow against seeded data, deploy a first version to a URL.

**Week 4 — Build the seller side + AI features.** Complete the seller flow, wire up AI features against the Claude API, polish, write the case study.

If a fifth week is needed for stretch (Copia University) or polish, that's fine. The risk is dragging past that point.

## 11. Case study structure

Final case study, sketched:

1. **Hero.** One sentence, one image. The pitch.
2. **The 2021 origin story.** Pandemic, supply chains, founder context, original team.
3. **Why now (2026).** What's changed: local-food momentum, AI as native UX, side-hustle economy maturity.
4. **Research.** Original customer discovery insights from 2021, refreshed with what we know now.
5. **Vision & differentiators.** The "Airbnb for farmers markets" frame, what makes Copia different, and why the rename from EDEN was the right strategic move.
6. **Brand.** Rebrand rationale, identity reveal, applied design system.
7. **Product design.** Buyer flow + seller flow walkthroughs, key screens, decisions made.
8. **AI integration.** Where AI lives, why each placement, how it serves the user.
9. **Build.** Tech stack, architecture decisions, deploy story — including the "why iPhone-first PWA instead of a Swift app" decision (faster to ship, recruiters can install in 10 seconds, leaves React Native and native iOS open as future paths without burning weeks now).
10. **Try it.** Link to the live demo + GitHub.
11. **What I'd do next.** Honest roadmap if this were a real venture in 2026, including the forward-looking thread: drone + zipline-drop fulfillment as the near-term unlock for hyper-local delivery economics, and humanoid garden assistants (e.g., Tesla Optimus) as the long-term unlock for the buyer-to-seller conversion — a robot that tends the garden while you're at work, picks at peak ripeness, and packages for fulfillment removes the last labor barrier between "I'd like to sell some tomatoes" and "I am, in fact, selling tomatoes." This is the Copia endgame: technology in service of the most analog product on earth.

## 12. Out-of-scope reminders

We will *not* pursue real funding, real users, or real production launch as part of this. This is a portfolio piece. The demo is convincing because it's well-built, not because it's real. If after the rebuild Garrison wants to actually pursue Copia as a venture again, that's a separate conversation.

---

## Open decisions for Garrison

Before Stage 2 starts, lock these:

1. ~~Demo city.~~ **Locked: Austin, TX.**
2. ~~Brand direction.~~ **Locked: Neo-Natural.**
3. ~~Scope adjustments.~~ **Locked.** Crypto payments brought in (v1.3). Forward-looking delivery modes added (v1.4).
4. ~~Feature inventory completeness.~~ **Locked (v1.4).**

**Stage 1 is closed. Moving to Stage 2: brand identity design.**

---

## Changelog

- **v1.8 (May 26, 2026)** — iPhone-first PWA added as the explicit deliverable shape. Updated §1 (now an "installable PWA," not just a "responsive web app"), §3 (added iPhone-first PWA in-scope subsection, moved native iOS app explicitly to out-of-scope), §8 (added iPhone safe-area + HIG touch-target principles), §9 (added PWA stack: next-pwa, manifest with leaf-mark app icon, Apple-specific meta tags), §11 (case study #9 now includes the "why PWA not Swift" decision). Frontend-design directive also updated with an iOS / iPhone-first platform section.
- **v1.7 (May 26, 2026)** — EDEN→Copia housekeeping sweep across the brief body. Updated §4 (Demo setting), §5 (Strategic frame, op-art claim retracted in favor of the actually-invented Leaf Wave motif), §6 (seller spectrum), §7 (AI features closing paragraph), §9 (tech stack — shadcn restyling note), §10 (schedule), §11 (case study structure — added "rename was strategically right" beat), §12 (out-of-scope). Replaced §5 palette estimates with the actually-locked hex values extracted from logo SVGs. Replaced §5 typography candidates list with locked picks (Aptly Medium display, Söhne body, JetBrains Mono mono). Replaced §5 motifs section with the real Leaf Wave system. Added §8 brand-system artifacts subsection pointing to the live deliverables in `/brand/`. EDEN is now used in the brief only where it refers to the historical 2021 project; the current/future product is consistently called Copia.
- **v1.6 (May 25, 2026)** — Added the Identity Composition (cornucopia mark) as the fifth tier of the Copia logo system. Landscape lockup where the five leaf paths are re-arranged into a flowing cornucopia gesture with the flat COPIA wordmark integrated inside. Brand-identity expression for marketing site, signage, packaging, social banners, case study reveal. Saved to `/brand/copia-logo-svgs/copia-mark-with-name.svg`.
- **v1.5 (May 25, 2026)** — **EDEN renamed to Copia.** Garrison delivered a refined wordmark system (gummy full lockup, flat lockup with "MARKETPLACE" sub-line, simplified single-tier wordmark) that continues the DNA of the 2021 EDEN logo. Rationale: EDEN evokes solitude, Copia (Latin for *abundance*, root of *cornucopia*) evokes the harvest shared — the right name for a peer-to-peer marketplace. Brief retitled. §5 expanded with rename rationale and updated logo system. Case study now has the EDEN → Copia rename as a first-class narrative beat. Leaf mark still to be built as the third tier of the logo system.
- **v1.4 (May 22, 2026)** — Stage 1 locked. Expanded fulfillment design to include forward-looking delivery modes (bicycle courier, motorcycle/car à la Uber Eats, standard drone, zipline drone with parachute drop). Sellers choose which delivery lanes they offer (ties into the seller spectrum). Added humanoid garden assistants (Tesla Optimus) to the case study's "What I'd do next" section as the long-term unlock for the buyer-to-seller conversion.
- **v1.3 (May 21, 2026)** — Brought crypto payments back into scope (had been listed as out-of-scope in v1.0). Added a payment-design subsection. Three payment lanes at checkout (card / USDC / Bitcoin), all stubbed. Sellers choose which methods they accept, tying back to the seller spectrum. Established design constraint that payments feel like quiet infrastructure, not Web3 maximalism.
- **v1.2 (May 21, 2026)** — Locked the brand direction as "Neo-Natural" after Garrison shared reference apps (Uber Eats premium, Fresh app, FreshMart) and the 2021 EDEN brand assets (gummy mint-on-forest wordmark + op-art leaf pattern). Replaced the three proposed brand directions with a single locked direction that combines retro-natural brand identity with premium-editorial product UX. Defined palette, typography direction, logo system (three pressure levels), brand motifs, photography style, and voice.
- **v1.1 (May 21, 2026)** — Locked Austin as demo city after Garrison flagged that the EDEN thesis requires users to be able to *grow* to sell, not just buy. Added §6 "The seller spectrum" — backyard / suburban / small farm / specialty maker. Made buyer-to-seller conversion a first-class product flow. Repositioned the AI growing coach as the structural bridge feature that makes the conversion possible.
- **v1.0 (May 21, 2026)** — Initial draft.
