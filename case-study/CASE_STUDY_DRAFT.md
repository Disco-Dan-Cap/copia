# Copia Case Study — working draft

Prose drafts for the final case-study page (self-contained HTML, house brand style, per §11 of the brief). Sections accumulate here as they're approved; Claude Code builds the page last, after the on-device captures. Voice: Garrison's first person.

**Status:** ALL ELEVEN SECTIONS DRAFTED + VOICE-AUDITED (2026-06-04). Hero locked · audited against copia-voice (ban list clean; em-dash budgets enforced; closes pass fact-vs-performance; two cadence fixes; §3 triplet trimmed) · Fact-check round 2 OPEN (domain, repo visibility, naming Claude Code, Stripe). Next: Garrison full read-through → resolve round 2 → on-device captures → Claude Code prompt to build the HTML page.

---

## 1. Hero (LOCKED)

> **Copia is for buying food from your neighbors, the people who grow it — built the way a farmers market feels: calm, personal, unhurried.**

Image: single iPhone frame, buyer Home (pending on-device capture; fallback: framed screenshot from the case-study set).

---

## 2. The 2021 origin story — DRAFT

EDEN started in the first months of the pandemic, at the intersection of three things I couldn't stop noticing: grocery supply chains were buckling, people were suddenly paying close attention to what they ate, and nearly everyone I knew was looking for a second source of income. I'd also been reading about what followed the 2008 financial crisis — Uber, Lyft, and Airbnb all emerged from that recession by letting ordinary people put an idle asset to work. A car. A spare room. It seemed obvious to me that the next idle asset was the backyard.

I was finishing an Innovation MBA at the University of Louisville at the time (my first degree is in industrial design, from Auburn), and EDEN became the thing I pointed all of it at. With two co-founders from the MBA program, I wrote the business plan, ran customer discovery, built the financial model, and pitched venture capital. The vision statement we wrote in 2021 still holds: *decentralize and democratize the food supply chain.* The frame was "the Airbnb for farmers markets" — a peer-to-peer marketplace where anyone from a backyard grower to a working farm could sell what they grew, sized against a roughly $40 billion U.S. local-ecommerce market growing about 10% a year.

The pitch worked. The VC offered $1.2 million to keep building. And then I did the hardest thing in this story: I said thank you, and no. None of us were engineers — every dollar would have gone to hired hands translating my designs at arm's length — and I was the only founder ready to go all-in. We declined, and we all went and got jobs. EDEN went into a folder.

The 2021 wireframes appear in this case study on purpose. They're mint green, set on a map of Louisville, and if you look closely the tab bar says "cart" and the home screen says "150 sellers in your area!" — the exclamation point included. I designed them by hand, before AI-assisted building existed and before the brand had a discipline. They're the fossil record: most of what Copia became in 2026 is already visible in them, and most of what changed is the subject of this case study.

One more thing from the archive. Buried in a 2020 ideas document is a sentence I keep returning to: *"As artificial intelligence and autonomous robots become more advanced there's a possibility for people's unused backyards and unused plots of land to be cultivated and tended by these robots or systems."* I wrote that four years before it was reasonable. Hold that thought until §11.

---

## 3. Why now (2026) — DRAFT

The honest answer starts with what ended the first attempt. In 2021 we walked away from real money because nobody on the founding team could build the product. Every dollar of that investment would have bought translation — engineers turning a designer's intent into software at arm's length, with all the loss that implies. That barrier wasn't unusual; it was the default tax on every non-technical founder of the last twenty years.

In 2026 it simply isn't there. I rebuilt Copia — strategy, brand system, product design, and the working software — as a team of one, a designer directing AI builders the way I once would have directed contractors, except the loop runs in minutes instead of sprints. The mechanics of that are §9's story. The point here is simpler: the exact thing that killed EDEN is the thing that no longer exists.

The market spent those five years catching up to the 2021 thesis, too. The pandemic's local-food bump didn't recede into nostalgia: buying close to home stayed a values purchase that people actually act on. The side-hustle economy matured from gig apps into asset platforms; "your backyard as a listing" sounds less strange in a world that normalized renting out a spare room, a car, a parking space. And AI changed what the product itself could be. In 2021, "an app that teaches you to grow" meant a content library; we'd sketched an "EDEN University" of masterclass videos. In 2026 it means a Coach that reads your actual plot — your orders, your listings, the forecast, what your neighbors are searching for — and writes you a letter about it. The feature we couldn't build became the product's hero moment.

In 2021, EDEN needed a team and capital. In 2026, Copia needed a folder of old documents and seventeen days of building.

---

## 4. Research — DRAFT

In the spring of 2021 our team ran structured customer discovery: 47 interviews across three groups — growers and sellers, buyers, and food-industry experts. [FACT-CHECK: exact count/breakdown.]

What we heard sorted itself quickly. **Sellers didn't need help growing — they needed help with everything after the harvest.** Analytics, marketing, an online presence they didn't have time to manage, and above all the final mile: getting food the last few suburban kilometers to the person who wants it. **Buyers said "support local" and meant it, but convenience decided.** Most would pay some premium for fresh and local — and would still defect to the supermarket the moment local got complicated. **The experts kept pointing at the same place:** final-mile friction is where local food dies, and the platform that solves it should be a platform, not a content provider.

And then the surprises, the things we didn't expect: most people don't actually care about *organic* — they value *local* over organic, and some actively avoid the organic label. Honey and egg sellers have no trouble selling — supply, not demand, is the bottleneck at the small end. And the one that mattered most: **many buyers are latent sellers.** The person buying tomatoes at the stand has a yard, and a notion.

Five years later, those findings read like a spec for what we built. Convenience decides → checkout is one calm page, the multi-step wizard refused. Sellers need analytics and marketing, not lectures → the seller dashboard is a letter, the analytics page is a grower's almanac, and the Growing Coach reads the week's demand signals and writes them back as a note from a neighbor. The final mile is the killer → deliveries from multiple growers consolidate into a single courier run, and the delivery lanes are tiered honestly, bicycle couriers now, drone corridors as the pilot. Local beats organic → the product's language centers the grower and the place — Mira, East Austin, the Mueller market on a Saturday morning — and never a certification badge. And the latent-seller insight became the company's long arc: the buyer-to-seller conversion is the endgame, and §11 is about what finally removes its last barrier.

---

## 5. Vision & differentiators — DRAFT

The frame that sold the 2021 pitch still describes the company best: **the Airbnb for farmers markets.** Airbnb's insight was never really about travel. It was that an enormous supply of underused assets could be matched to existing demand if a platform absorbed the friction and the trust problem. Copia points the same insight at food. The supply side of local food is radically underused — backyards, side yards, community plots, small farms with no distribution — and the demand side already shows up at every farmers market, every Saturday, in every city. What's missing is the absorbing layer: discovery, trust, logistics, and payment, handled so simply that a person with twelve tomato plants can behave like a business.

What makes Copia different is less any single feature than a posture, held everywhere at once. It sells people, not products: the basket groups by grower, and the checkout narrates your plan in a sentence that names Mira and the Mueller market, never "the grower." It is calm in a category that shouts: one-page checkout, no urgency, no badges, no upsell. Its AI is a craft, not a logo: the Growing Coach reads your actual plot and writes you a weekly letter, and the checkout's smartest suggestion deliberately isn't AI at all. Its money respects the grower: three payment rails presented plainly, with one computed line about who keeps what. And it is built, ultimately, to convert buyers into sellers, because the most reliable thing our 2021 research found was that the person buying tomatoes has a yard, and a notion.

Then there's the name. Eden evokes solitude — paradise, a private garden, a place you withdraw to — and a marketplace is the opposite of that. **Copia** is Latin for abundance, the root of *cornucopia*, and abundance is something you share. The mechanics favored the change too: five letters, two syllables, far more ownable than EDEN (over-used across food, hospitality, dating, and beauty), and it sits in the same short-Latinate register as Aesop and Olipop, names that read premium and editorial. In bilingual Austin there's a quiet bonus: *copia*'s first dictionary definition in Spanish is abundance. The old name had five years of sentiment behind it; the new one did more work. The decision made itself.

---

## 6. Brand — DRAFT

The direction is called **Neo-Natural**: a retro-natural identity wrapped around a premium-editorial product. Heritage on the outside, future on the inside. The brief reduced it to two sentences that governed everything after: *the brand says "this could have existed in 1972 in a Berkeley co-op." The product says "this is the most thoughtful piece of software you've ever used to buy a tomato."* The tension between those two sentences is the brand.

The 2021 DNA was recovered, not retired. The best thing about the original EDEN brand — the gummy script wordmark on retro mint — survives directly in Copia's gummy wordmark, puffy letterforms with layered mint-and-forest offsets and the leaf dotting the *i*. The rebrand is an inheritance, not a do-over; the 2021 wireframes and the 2026 splash screen are visibly the same family, one generation apart.

The system underneath is built like documentation because it had to actually govern a build. A ten-value palette extracted from the logo SVGs themselves — forest to sage to mint to cream, charcoal for body (never pure black), and one terracotta spike that's only allowed to appear once per screen — shipped with computed WCAG contrast pairings, not vibes. Type in three lanes: Aptly Medium when the brand speaks, Söhne when the product speaks, JetBrains Mono for the chrome. A logo system at three pressure levels, from the gummy lockup down to the standalone leaf mark that became the app icon. And the Leaf Wave motif: a tileable pattern at three densities, invented in 2026 from the leaf mark's own paths, because the 2021 brand never had a pattern asset.

The receipts are part of this case study: the palette card, the leaf-mark usage spec, and the motif system are self-contained documents in the register of Apple Design Resources or a Pentagram guidelines book — every rule shipped with its rationale. For a product designer, the system documentation *is* a deliverable. And the voice got rules too: warm, confident, slightly knowing; never preachy, never crunchy; reads like a thoughtful editor wrote it. Every word in the product (§7's subject) was written under those rules and audited against a NEVER list that bans the entire generic-app vocabulary, from "Get the app" to the sparkle emoji.

---

## 7. Product design — DRAFT

The method, in one sentence: for every screen, identify what the generic version would be — the SaaS default the genre expects — and refuse it for something from the world of actual markets. One memorable moment per screen. Restraint as the system.

**The seller side** shipped first: nine surfaces. The dashboard is written like a letter from your own stall, not a wall of metric cards. Demand signals arrive as plain sentences — *"18 people near you searched for heirloom tomatoes this week"* — not trend arrows. The availability calendar is an agenda bounded at four weeks, and the bound is the point: nobody buys squash a month out, so instead of shipping the reflexive Google-Calendar month grid, the range itself reinforces how fresh food is actually bought. (I tried to talk myself into the month grid once. The brief won.) Messages are correspondence, not chat bubbles. Analytics is a grower's almanac, built with no charting library at all, because the question a grower asks isn't "what's my trend line," it's "what happened, and what should I do Saturday." Settings is a stall ledger. And the ninth surface, the Coach, is §8's story.

**The buyer side** is a single arc: discover, basket, settle up, record. The basket groups by grower, because you're buying from people: three items reads as "THREE THINGS FROM THREE GROWERS," and each group shows that grower's share of the total. Checkout is where the genre pressure was strongest and the refusal mattered most. Instead of the five-step wizard, **one calm page**: every grower group chooses pickup or delivery, anything marked delivery consolidates into a single courier run with one fee, and the whole plan is narrated back as a sentence the page speaks: *"You'll collect the heirloom tomatoes and backyard eggs from Mira at the Mueller market Saturday morning."* When two growers share a market day, the page quietly mentions one trip gets you both. Delivery lanes are tiered honestly: bicycle and motorcycle couriers selectable today, drone and zipline-drop visible as pilots, never pretended live. Payment is three plain choices — card, USDC, Bitcoin — with exactly one computed line about what each means for the grower. The confirmation's headline is two words: *"It's arranged."*

The 2021 wireframes hang over this whole section as the before picture. The old home screen said "150 sellers in your area!" over a cart icon; the new product hasn't a single exclamation point in it. The discipline was enforced by a written NEVER list — the design system bans the generic-app vocabulary outright, from progress bars to trust badges to the sparkle emoji — and every shipped surface was audited against it. Defining a product by what it refuses turned out to be the most practical design tool in the project.

---

## 8. AI integration — DRAFT

The brief called for AI "woven throughout, with a lighter touch overall." In practice the discipline sharpened into a placement rule: **AI lives where it changes what the product is — and nowhere else.**

Where it lives is the **Growing Coach**, and the Coach is a weekly letter, not a chatbot. It reads your actual plot — your orders, your listings, the weather ahead, what your neighbors searched for — and writes you a note that weaves the evidence into sentences instead of citing it: the Saturday pickup times, the basil swap a buyer proposed on Tuesday, the eighteen heirloom-tomato searches in your neighborhood, all arrive as things a knowledgeable neighbor would mention, not as sourced bullet points. When a seller asks it something hard (*can I make this a real income?*), it answers like a neighbor too: *"that's a real question, and the honest answer is: not yet, and not this week,"* followed by the grounded version of why. The disclosure is a single line in the product's own voice: *"The Coach reads your plot — your orders, your listings, the forecast, what your neighbors are searching — and writes you a note each week."* No "Powered by" badge. The AI is disclosed as craftsmanship, not stamped as a vendor logo.

The Coach carries the AI weight because it's the **bridge feature** — the thing that makes Copia's most ambitious idea achievable. Our 2021 research found that many buyers are latent sellers; the Coach is what walks a person with a yard and a notion from one side of the marketplace to the other. In 2021 this feature was sketched as "EDEN University," a library of masterclass videos. What AI changed isn't that the product can *teach* — it's that the product can *know you* and write to you about your own garden.

Just as deliberate is where AI **isn't**. The checkout's smartest moment — noticing that two of your growers share a market day and suggesting one trip — is geometry, not a model. Distances and seeded schedules answer the question; a language model would have added latency, cost, and a failure mode to a calculation that cannot be wrong. There's a comment in the code saying exactly that. Knowing where not to use the model is part of AI design, and I wanted at least one place in the product that proves the restraint is a choice.

The rest of the brief's AI inventory — photo-to-listing, natural-language search, recommendations — are designed slots, not shipped features. They belong to §11.

---

## 9. Build — DRAFT

The build method is the part of this project I'd most want another designer to steal. I built Copia as a team of one by working the way a creative director runs a studio — except the studio was AI. Two roles, deliberately separated: a planning partner that held the brief, pressure-tested every framing decision, drafted the build prompts, and reviewed every word of user-facing copy; and Claude Code in the terminal, which wrote the software.

Between them sat the actual management layer: **documents.** The brief as the single source of truth. A frontend design directive — installed so it auto-loads into every build session — encoding the visual system and a NEVER list of every generic-app pattern the product refuses. And a paste-ready prompt for each build day, with the editorial constraints, the acceptance criteria, and the commit message written before any code existed. Direction moved from drawing every screen to governing every screen. The prompts are in the repo; they read less like tickets and more like creative briefs.

The quality control was unglamorous and constant. Nothing merged unreviewed. Every build day ends in a commit traceable to a written prompt. Every piece of copy went through voice review against the NEVER list — and the reviews caught real things: a narration engine that wrote "the grower" instead of a person's name on the one page whose thesis is *you're buying from people*; an install prompt one adjective away from SaaS chrome. As the system matured, register audits swept the earliest screens to keep the whole product in one voice. Seventeen build days produced nine seller surfaces, the full buyer arc, the PWA install experience, and one production AI feature.

The stack is deliberately boring: Next.js with TypeScript, Tailwind with the brand palette as design tokens, shadcn components restyled through the token layer (never shipped default), Supabase, Mapbox, the Anthropic SDK for the Coach (with prompt caching), deployed on Vercel. The performance story I'm proudest of: the Coach's first paint on a cold week went from 16 seconds to 0.26 — by fetching the letter client-side behind the leaf-draw animation, the brand moment absorbing the latency.

And the platform decision: **an iPhone-first PWA, not a Swift app.** Faster to ship; installable from Safari in ten seconds, which matters when the audience is a recruiter with a coffee break; and it leaves React Native or native iOS open as future paths without burning weeks now. The PWA isn't a compromise shell, either — hand-tailored splash screens for every iPhone size, an install invitation that waits for earned intent and never nags, standalone detection so the installed app knows what it is. It behaves like an app because it was designed like one, down to the safe-area insets.

---

## 10. Try it — DRAFT

The live product: **copia-virid.vercel.app** [FINAL DOMAIN TBD — brief suggests acquiring copia.market]. Open it in Safari on an iPhone and give it a minute of honest use: browse the Austin growers, put three things from three growers in your basket, and settle up — watch the page describe your plan back to you. For the full effect, add it to your home screen (Share → Add to Home Screen) and launch it from the icon: the wordmark assembles itself on the way in.

The code, including every build prompt: **github.com/Disco-Dan-Cap/copia** [CONFIRM: repo public?]

What's real and what isn't: the growers and produce are seeded Austin demo data; payments are fully stubbed — no money moves; the delivery lanes are UI only. The Growing Coach is real AI, live in production, reading the demo plot and writing actual letters.

---

## 11. What I'd do next — DRAFT

Honestly, and in order. **Near term:** finish the designed AI slots — photo-to-listing (snap a basket of tomatoes, get a drafted listing), natural-language search ("dinner for four, mostly veggies, $30"), seasonal recommendations. QR pickup confirmation. Buyer onboarding and favorites. Then real payments: Stripe for cards, true USDC settlement for the crypto rail — which matters most outside the U.S., where paying for food in stable dollars is a hedge against a volatile local currency, not a novelty. And the unglamorous real-company work the 2021 research already flagged: cottage-food law varies by state and shapes what a backyard grower can legally sell; urban and rural Copia are two different business cases and need their own models.

**The middle distance is delivery economics.** Final-mile cost is the structural reason local food loses to the supermarket, and it's where the 2021 industry experts said platforms go to die. Bicycle couriers prove the experience; drones change the math. A zipline-style parachute drop doesn't need a landing site, which makes hyper-local produce delivery viable at neighborhood density — that's why the pilot lanes are already drawn into the checkout, waiting.

**And the long thread.** In a 2020 ideas document, before any of this had a name, I wrote that as AI and autonomous robots matured, unused backyards could be "cultivated and tended by these robots or systems." In 2026 that's no longer science fiction — it's a product-roadmap question about humanoid garden assistants. A robot that tends the garden while you're at work, picks at peak ripeness, and packages for fulfillment removes the last labor barrier between "I'd like to sell some tomatoes" and "I am, in fact, selling tomatoes." Our research said the buyers are latent sellers. The Coach lowers the knowledge barrier; the robot lowers the labor barrier. The 2021 customer journey ended in a step we named *Liberation* — and this is the Copia endgame: technology in service of the most analog product on earth.

---

## Fact-check round 2 — OPEN

1. **§10 domain** — staying on copia-virid.vercel.app, or acquiring copia.market (or similar) before the case study ships?
2. **§10 repo** — is the GitHub repo public (or will it be)? The §9 story invites readers to look at the prompts — strongest if they actually can.
3. **§9** — comfortable naming Claude / Claude Code explicitly? Current draft names Claude Code once; can generalize to "AI coding tools" if preferred.
4. **§11 Stripe** — named per your "like a Shopify store" framing; fine?

---

## Fact-check round 1 — RESOLVED (2026-06-04)

1. **Team** — no names; "two co-founders from the MBA program." (First names available as a warmer alternative if Garrison changes his mind.)
2. **Interviews** — 47 stands.
3. **The VC pitch** — offer of $1M–$1.5M; declined because no technical founder and uneven team commitment; everyone got jobs. Drafted into §2 ("the hardest thing in this story") and used as the hinge for §3. **Garrison to re-read the characterization** — it's his story and the gentlest fair phrasing matters.
4. **$40B / 10.2%** — kept, framed as 2021 sizing. Optional: refresh with one current (2026) market stat in §3 during final pass — needs a web check, not done yet.
5. **Louisville** — named, as the contrast with Austin 2026.
6. **Robots quote** — in, verbatim (lightly cleaned).
7. **Omitted:** EDEN coin entirely; financial-model figures (the model is mentioned as an artifact only — signals business literacy without inviting scrutiny of stale projections). The only number §2 carries is the offer.

**Open for Garrison's re-read:** §2 VC paragraph phrasing · §3 in full (esp. "seventeen days of building" — the Day 1–17 framing; comfortable with that count?).

---

## Continuity gems banked for later sections (not yet placed)

- 2021 idea note: "Tell a story while you are growing" → §8, the Coach's direct ancestor.
- 2021 differentiators list already includes "accepts payments in multiple forms" + "cryptocurrency and blockchain" → §7 payment rails lineage.
- 2021 customer journey ended in a step literally named "Liberation" → possible callback in §11.
- 2021 SWOT: "side income that grows while you work" → seller-flow framing.
- CD-deck buyer archetype (community, environment, wellbeing) → §5 differentiators.
