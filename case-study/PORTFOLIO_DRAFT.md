# Copia — portfolio case study (compressed)

The hiring-facing version, per PORTFOLIO_SPEC.md. Target ~700 visible words; every line sourced from the audited long-form (CASE_STUDY_DRAFT.md). Image slots marked [ ]. Voice: copia-voice governed.

---

## 1 · Hero

[iPhone frame — buyer Home]

`LIVE · IPHONE-FIRST PWA · 2026`

> **Copia is for buying food from your neighbors, the people who grow it — built the way a farmers market feels: calm, personal, unhurried.**

---

## 2 · At a glance

| | |
|---|---|
| **Role** | Founder · sole designer & builder |
| **Founded** | 2021 (as EDEN) · rebuilt 2026 |
| **Build** | 17 days, directing AI |
| **Stack** | Next.js · TypeScript · Supabase · Mapbox · Claude · Vercel |
| **Shipped** | 9 seller surfaces · full buyer flow · 1 production AI feature |
| **Live** | [copia-virid.vercel.app] |

---

## 3 · The short version

I founded Copia in my MBA in 2021, as EDEN. We pitched VCs and were offered $1.2M. I declined: I was the only founder all-in, and I had no technical co-founder to build with. By 2026, AI had removed that barrier — so I went back and built what I'd envisioned all along, alone, directing AI through every screen and every sentence. Seventeen build days, live in production.

---

## 4 · What 47 interviews said (2021)

**Convenience decides.** Buyers mean it when they say "support local" — and defect the moment local gets complicated.

**Sellers need help after the harvest.** Analytics, marketing, and the final mile. Not growing advice.

**Buyers are latent sellers.** The person buying tomatoes has a yard, and a notion.

And the surprise: people value *local* over *organic*. Some actively avoid the organic label.

---

## 5 · Decisions

**2021 next to 2026.** [old wireframe | new Home, side by side]
The 2021 wireframe says "cart" and "150 sellers in your area!" The 2026 product contains neither the word nor the punctuation. The rebuild kept the mint and the gummy wordmark; the discipline is new.

**One calm page instead of the checkout wizard.** [settling-up screen]
Every grower group picks pickup or delivery; deliveries consolidate into one courier run with one fee. The whole plan reads back as a sentence: *"You'll collect the heirloom tomatoes from Mira at the Mueller market Saturday morning."*

**A calendar that refuses the month grid.** [seller calendar]
Nobody buys squash a month out, so the seller calendar is an agenda bounded at four weeks. The genre default would have fought how fresh food is actually bought.

**An almanac, not analytics.** [seller analytics]
Built with no charting library. A grower's question isn't "what's my trend line" — it's "what happened, and what should I do Saturday."

**AI as a letter, not a chatbot.** [Growing Coach]
The Coach reads your plot — orders, listings, the forecast, what neighbors are searching — and writes you a weekly note. Disclosed in the product's own voice; no "Powered by" badge.

**Where AI isn't.** [checkout suggestion line]
When two growers share a market day, the page suggests one trip. That's geometry, not a model — knowing where *not* to use AI is part of AI design.

---

## 6 · How it was built

I directed Claude Code the way a creative director runs a studio: a written design directive with a NEVER list banning the generic-app vocabulary, a paste-ready brief for each build day, and every word of copy reviewed before merge. Every brief is committed alongside the code. One engineering proof: the Coach's cold first paint went from 16 seconds to 0.26, by fetching the letter behind the brand's leaf-draw animation.

---

## 7 · Reflection

The hardest part wasn't building — it was refusing: the month grid, the progress bars, the trust badges, the sparkle. Next would be real payments (Stripe for cards; USDC settlement matters most where the local currency doesn't hold), and the long thread from my 2020 notes: robot-tended backyards removing the last labor barrier between "I'd like to sell some tomatoes" and "I am, in fact, selling tomatoes."

---

## 8 · Try it

**copia-virid.vercel.app** — open it in Safari on an iPhone. Put three things from three growers in your basket and settle up. For the full effect, add it to your home screen: the wordmark assembles itself on the way in.

---

*Word count (visible prose, excluding chrome): ~640.*
