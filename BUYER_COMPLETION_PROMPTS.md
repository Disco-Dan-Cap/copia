# Buyer Completion — Days 15–17 · Claude Code prompts

Paste-ready prompts for the buyer-side completion phase. Run in order — Day 15 → 16 → 17. Each is self-contained; commit between them. Safe to `/clear` Claude Code between days.

---

## Context for the phase (orienting notes — not a prompt)

**Editorial north star.** Checkout is the most SaaS-infected genre in ecommerce: the multi-step wizard (cart → address → shipping → payment → review), progress bars, upsells, urgency, trust badges. The brief explicitly flags checkout as the place to refuse the wizard. The Copia reframe: **settling up at a market stall** — one calm page where the whole exchange is visible at once.

**Decisions locked with Garrison (2026-06-03):**
- **The word is "basket," not "cart."** A basket is what you carry through a market. Rename `add-to-cart-bar` accordingly.
- **Basket groups by grower.** A P2P basket can span growers (Mira's tomatoes + Dana's eggs). You're buying from people, not a warehouse.
- **Hybrid fulfillment.** Each grower group gets its own choice (pickup at their stand/market, or delivery) — BUT all groups marked "delivery" consolidate into ONE courier run: one fee, one arrival window.
- **The narration line is the memorable moment.** The page describes the plan as a letter-style sentence that updates live: *"Your courier will collect the tomatoes from Mira's stand in East Austin and the eggs from Dana in Round Rock, and bring them to you Tuesday between 4 and 6."* Logistics as correspondence, not a shipping grid.
- **The proximity suggestion is deterministic, not AI.** If two pickup groups share a market venue (or are within a short distance per `location.ts`), one quiet in-voice line suggests a single trip. NO Claude call, NO "AI suggests" badge, NO ✨. Comment the code with why: this is the case-study beat about knowing when NOT to use the LLM. The Coach stays the hero AI moment.
- **Payments: Stripe-boring surface, grower-first meaning.** Card (default), USDC, Bitcoin as three plain, equal choices. Zero crypto theater — no wallet-connect modals, no tickers, no QR drama. When USDC/Bitcoin is selected, ONE calm computed line about grower economics (card processing ~2.9% + 30¢ vs ~zero): e.g. "about $1.12 more of this settles directly with your growers." Computed from the actual basket total — house style is computed, not estimated. All stubbed; no real money moves.
- **The emerging-markets USDC story** (paying for food in stable dollars where local currency isn't) is case-study §11 material, NOT Austin demo UI.
- **Delivery lanes are tiered.** Selectable now: bicycle, motorcycle. Pilot tier: drone, zipline drone — visible but not selectable, one quiet "coming to your area" line. All UI-only per the brief.
- **State is client-side.** Basket = a store following the house `useSyncExternalStore` pattern (cf. settings store, 14B's use-standalone) persisted to localStorage (namespaced key). Orders created at checkout follow the session-created pattern from Day 8 (`044eeb5`) and merge with seeded data.
- **Checkout calls `markFirstOrderComplete()`** from `src/lib/pwa/install-intent.ts` (wired dormant in Day 14D) — this lights up the install invitation's first-order trigger.
- **Seeding:** mostly single-grower baskets; one good multi-grower example (Mira + Dana register) to demonstrate the hybrid.
- **Old buyer screens get a light register pass** (Day 17): Home/Search/Seller/Product predate the solidified register — fix clear directive violations only, no rebuilds.

**Always load before writing UI:** `CLAUDE.md`, `EDEN_Rebuild_Brief_v1.md`, `brand/copia-frontend-design.md`. The NEVER list governs every pixel.

---

## Prompt — Day 15: The Basket

```
Day 15 — The Basket. The word is "basket," not "cart" — a basket is what you carry through a market; a cart is what you push through a supermarket.

Read first: CLAUDE.md, brand/copia-frontend-design.md (NEVER list), src/components/products/add-to-cart-bar.tsx (currently inert per the Day-3 pattern), src/lib/data/{listings,sellers,types}.ts, the house store pattern (settings store / src/lib/pwa/use-standalone.ts), src/components/app/app-header.tsx, brand/copia-hero-screens.html (buyer visual register).

GOAL
A working basket: add from any listing, view grouped by grower, adjust, persist. This is the buyer's first stateful surface — it must hold the register the seller side established.

BUILD
1. Basket store — src/lib/basket/store.ts using the house useSyncExternalStore pattern, persisted to localStorage (namespaced key, e.g. copia.basket). API: addItem(listing, qty), removeItem, setQty, clear, plus a selector that returns items GROUPED BY GROWER (the basket's native shape). SSR-safe like use-standalone.
2. Wire the add bar — rename add-to-cart-bar.tsx → add-to-basket-bar.tsx ("Add to basket"). On add: a calm acknowledgment in place (the button settles into "In your basket · 2" or similar) — NOT a toast, NOT a flying-cart animation, NOT a slide-in drawer.
3. Basket entry point — a quiet basket affordance in the app header with a count. Restrained: the count is mono chrome, not a red notification bubble (terracotta is reserved for true alerts, directive §65).
4. /basket page — route in (app). Structure:
   - Items grouped by grower: grower name + location as the group header (eyebrow register, e.g. "MIRA — EAST AUSTIN"), their items beneath with qty adjust and remove.
   - Quantities and totals computed live. A single total. Per-group subtotals only if they earn their space.
   - Primary action: "Settle up" → /checkout (route can 404/stub until Day 16 — note it).
   - Empty state in voice — one calm line, not an illustration of a sad cart. Something in the register of "Nothing in your basket yet. The market's open."  Write final copy in-voice and check against the NEVER list.
5. Seed/demo support: make sure at least one easy multi-grower basket can be assembled from seeded Austin listings (e.g., produce from two different growers) — this demo path matters for Day 16.

EDITORIAL CONSTRAINTS
- The grouping by grower IS the design statement: you're buying from people. Give the grower group headers real typographic presence.
- Refined editorial, one memorable moment: the basket should read like a market list, not a data table.

NEVER
- "You might also like" upsells, cross-sells, "frequently bought together."
- Free-shipping progress bars, "only 2 left!" urgency, countdown timers.
- Toasts, confetti, flying-cart animations, slide-out cart drawers.
- Red badge bubbles; "cart" anywhere in UI copy or new filenames.

ACCEPTANCE
- Add from a listing → basket count updates calmly → /basket shows it grouped under the right grower.
- Quantities adjust, items remove, state survives reload (localStorage).
- Empty state renders in voice. 375/390/430 px clean, 44pt targets, safe areas respected.
- npm run build passes. Report the empty-state copy and the add-acknowledgment microcopy for voice review.

COMMIT: "Day 15: the basket — grouped by grower, a market list not a cart"
```

---

## Prompt — Day 16: Settling Up (Checkout)

```
Day 16 — Settling up. THE editorial set-piece of the buyer side. The genre default is the multi-step wizard; Copia refuses it. This is ONE calm page — the whole exchange visible at once, like paying a farmer at their stall.

Read first: CLAUDE.md, brand/copia-frontend-design.md (NEVER list + §65 terracotta + voice sections), src/lib/basket/store.ts (Day 15), src/lib/data/{sellers,location,orders}.ts, src/lib/pwa/install-intent.ts (markFirstOrderComplete — wired dormant in Day 14D), the Day-8 session-created pattern (044eeb5), src/components/seller/coach/* (voice register).

GOAL
/checkout — "Settling up." One page: basket summary, per-grower fulfillment with consolidated delivery, payment rails, a live narration of the plan, one calm confirm. Then a confirmation that reads like a note, not a receipt printer.

BUILD
1. Page structure (single page, NO steps, NO progress indicator):
   - Condensed basket summary by grower (read-only here; edit link back to /basket).
   - Fulfillment, PER GROWER GROUP: each group offers "Pickup — [their stand/market, from seller data]" or "Delivery." Calm choice chips, not dropdowns.
   - CONSOLIDATION RULE: all groups marked Delivery roll into ONE courier run — one fee, one arrival window, shown as a single line beneath the groups. Never N delivery fees.
   - Delivery lane (only when ≥1 group is Delivery): selectable now-tier — bicycle, motorcycle. Pilot tier — drone, zipline drone — rendered visible but not selectable with one quiet line ("coming to your area"). No gimmick styling; the pilot tier is a calm glimpse, not a joke.
   - Payment: three plain equal choices — Card (default), USDC, Bitcoin. Stripe-boring: no network logo rows, no wallet-connect modal, no QR drama, no tickers. When USDC or Bitcoin is selected, exactly ONE calm computed line of grower economics: card fees (~2.9% + $0.30) vs ~zero, expressed in real dollars from this basket's total — e.g. "About $1.12 more of this settles directly with your growers." Computed, not estimated. Information, not a nudge — no guilt framing.
   - Total. One confirm action: "Settle up."
2. THE NARRATION LINE — the memorable moment. A letter-register sentence that describes the current plan and updates live as choices change: "Your courier will collect the tomatoes from Mira's stand in East Austin and the eggs from Dana in Round Rock, and bring them to you Tuesday between 4 and 6." / "You'll pick up from Mira at the Mueller market Saturday morning." Place it where it reads as the page speaking, not a tooltip. This is logistics as correspondence.
3. The proximity suggestion — DETERMINISTIC, NOT AI. If two or more PICKUP groups share a market venue or are near each other (use src/lib/data/location.ts distances; pick a sensible threshold), add one quiet in-voice line: "Mira and Dana are both at the Mueller market Saturday — one trip gets you both." No Claude call, no AI label, no sparkle. Leave a code comment explaining the choice: simple geometry doesn't need a model — this restraint is a case-study beat.
4. Confirm flow (stubbed — no real money):
   - "Settle up" → a brief, calm settling state (the leaf mark may be used per directive §75; never a spinner) → order created.
   - Order persistence: session-created order merged with seeded data (Day-8 pattern), so it appears in Day 17's order history.
   - Call markFirstOrderComplete() from install-intent.ts — this is the moment the dormant Day-14D trigger goes live. Remove/update the "// Day-?? Checkout will call this" comment.
5. Confirmation screen — a note confirming the arrangement, in correspondence register: names the growers, restates the plan (reuse the narration), the total, how it was settled. An order reference may exist as mono chrome, but the headline is the arrangement, not "Order #12345 confirmed!" No celebration animation.

NEVER
- Steps, wizards, progress bars, "Step N of M," accordion checkout sections that gate each other.
- Trust badges, padlock iconography rows, card-network logo strips, "100% secure."
- Crypto theater: wallet-connect, gas fees, tickers, QR ceremonies, "to the moon," any crypto iconography beyond the plain words USDC / Bitcoin.
- Urgency, scarcity, countdown, "complete your order now."
- Confetti, 🎉, exclamation-driven confirmation copy.
- A spinner anywhere. A second display font. Pure black. Gradients.

ACCEPTANCE
- Single-grower basket: page reads clean and minimal — fulfillment, payment, narration, total, settle.
- Multi-grower basket (Mira + Dana demo): per-group fulfillment works; mixed pickup+delivery produces correct narration; 2+ deliveries consolidate to ONE courier line; 2+ nearby pickups produce the proximity line.
- Crypto rails: selecting USDC/Bitcoin shows exactly one computed grower-economics line with real dollars; switching back to Card removes it.
- Settle → calm settling state → confirmation note → order persisted → markFirstOrderComplete() called (verify the install invitation can now fire for a fresh non-installed profile).
- 375/390/430 px clean; build passes. Report: final narration-line variants, the proximity line, the grower-economics line, and confirmation copy — all for voice review.

COMMIT: "Day 16: settling up — one calm page, the wizard refused"
```

---

## Prompt — Day 17: Order History + Buyer Register Pass

```
Day 17 — The buyer's record, and a register pass over the early buyer screens. Closes the buyer flow.

Read first: CLAUDE.md, brand/copia-frontend-design.md, the Day-16 confirmation + order persistence, src/lib/data/orders.ts, src/components/pwa/install-invitation.tsx (InstallAffordance — built reusable in Day 14D), then each early buyer surface: src/app/(app)/page.tsx (Home), search/, sellers/[slug]/, listings/[id]/ and their components.

GOAL
(1) /orders for the buyer — a record of arrangements, in register. (2) A light register-consistency audit of the four early buyer screens. (3) The buyer-side home for the install affordance, fulfilling Day 14D's promise.

BUILD
1. /orders (buyer) — the buyer's market record:
   - Lists seeded + session-created orders, newest first. Each entry: the growers, the short arrangement line (reuse narration), date, total, how it was settled. Status in plain words ("picked up," "arriving Tuesday"), never colored status pills.
   - Tapping an order reopens its arrangement note (the Day-16 confirmation view, re-rendered from data).
   - Empty state in voice.
   - A small colophon at the foot of /orders (mirroring the seller Settings colophon register) — and mount InstallAffordance there. This gives the buyer side its permanent install home. Update the Day-14D buyer dismiss resting line to name it ("You'll find this any time in your orders page" — or better in-voice phrasing) now that a real home exists.
2. Register audit — Home, Search, Seller profile, Product detail (built Day 2–5, before the register solidified):
   - Read each against the directive. List violations found (pure black? Inter leakage? badge bubbles? SaaS card patterns? caps body? wrong empty states?).
   - FIX ONLY CLEAR VIOLATIONS — typography tokens, colors, microcopy register, forbidden patterns. Do NOT redesign or rebuild these screens. If something is borderline or would require structural change, flag it in the report instead of changing it.
3. Screenshots: extend the capture script to take basket, settling-up (single + multi-grower), confirmation, and orders at 390x844 + 1440x900, into case-study/screenshots/.

NEVER
- Status pills/chips with semantic colors; tracking-style progress meters ("Your order is 80% there!").
- Rebuilding the early buyer screens. This is a trim, not a remodel.

ACCEPTANCE
- Settle an order → it appears in /orders → its note reopens. Empty state in voice.
- InstallAffordance lives in the /orders colophon; buyer dismiss copy updated to point there; standalone still suppresses everything (re-verify).
- Register audit reported as a list: violations found, violations fixed, borderline items flagged-not-fixed.
- New screenshots committed. 375/390/430 clean; build passes.

COMMIT: "Day 17: the buyer's record, install affordance home, register pass on early screens"
```

---

## After this phase

- **The 6 on-device iPhone captures** (per `case-study/DAY_14_DEVICE_CHECKLIST.md`) — now even better with a real buyer flow to film.
- **Case study writeup** per §11 of the brief. New beats banked from this phase: the wizard refused (one-page settling up), logistics-as-correspondence (the narration line), the deterministic suggestion (knowing when NOT to use the LLM), grower-first payment economics (computed, not estimated), the emerging-markets USDC story, and delivery lanes tiered now/pilot (honest about the dream).
