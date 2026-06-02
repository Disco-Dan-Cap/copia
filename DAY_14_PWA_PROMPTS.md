# Day 14 — PWA Polish · Claude Code prompts

Paste-ready prompts for the Day 14 build session. Run them **in order** — 14A → 14B → 14C → 14D → 14E. Each is self-contained; commit between them.

---

## Context for the session (orienting notes — not a prompt)

**Editorial north star.** PWA install flows are the single most SaaS-infected genre in mobile web. The whole point of Day 14 is to refuse that genre. The brand directive already pre-decided the posture: `brand/copia-frontend-design.md` line 172 — *"Never a 'download our app' banner... surface it as a tasteful, one-time prompt at the right moment (probably after a buyer's first successful order)."* We are executing that line, not inventing.

**Build order (locked).** Plumbing first, the human moments last:
1. **14A** — splash images, icon/maskable validation, manifest hardening (pure assets, no editorial risk).
2. **14B** — standalone-mode detection + a minimal service worker (the installability dependency + the suppression mechanism).
3. **14C** — animated in-app splash overlay (the wordmark assembling itself, seamless handoff from the native launch image).
4. **14D** — the install invitation (the one designed interruption).
5. **14E** — validation/QA pass + tee up the deferred on-device screenshots.

**Decisions locked with Garrison (2026-06-02):**
- **Splash art (resolved):** the gummy "COPIA" wordmark on retro mint — `brand/copia-splash-mint.svg` (uploaded, 1125×2436 canvas). A dark variant exists at `brand/copia-splash-dark.svg` for any future dark context. This is a deliberate, recorded deviation from directive §145's original "cornucopia" call — the directive has been updated to match.
- **Palette check (done):** the wordmark's layers are all sanctioned tokens (deepest-forest, mid-forest, sage-shadow, sage, light-sage, mint). The only off-palette value is the mint **field** `#b3e0d2` — register it as a documented splash-only token `--mint-wash` (do NOT let it ship as a stray hex; do NOT snap it to `--mint #9CE5D0`, which is too saturated for a full-bleed field).
- **Invitation model:** earned-intent, one-time, in-voice. Fires on **second visit now**; a **first-completed-order** trigger is coded but dormant until Checkout ships (buyer-completion phase) — no retrofit later.
- **Graceful decline:** dismiss never re-triggers the card. On dismiss it names its permanent home.
- **Permanent home:** the seller Settings **colophon** (exists today). Buyer side has no Settings surface yet, so the buyer dismiss copy degrades to "add Copia any time from your browser's Share menu"; the same affordance component drops into buyer Settings when that ships.
- **Installed users never see any install nudge** — standalone detection suppresses all of it.
- **Two distinct assets:** splash = the gummy wordmark on mint (brand moment); app icon tile = **leaf mark on forest** (UI chrome). Do not swap them.
- **Service worker scope:** iOS Add-to-Home-Screen needs **no** SW. The SW exists only to unlock the Android/desktop `beforeinstallprompt` path. Minimal, hand-rolled — **not** `next-pwa` (unreliable on Next 16 + Turbopack).
- **iOS launch images can't animate.** The native `apple-touch-startup-image` is a flat PNG. All motion lives in the in-app overlay (14C).

**Always load before writing UI:** `CLAUDE.md`, `EDEN_Rebuild_Brief_v1.md`, `brand/copia-frontend-design.md`. The directive's NEVER list governs every pixel here.

---

## Prompt 14A — Splash images, icon validation, manifest hardening

```
Day 14A — PWA assets and manifest hardening. Plumbing only; no user-facing UI in this prompt.

Read first: CLAUDE.md, brand/copia-frontend-design.md (esp. the splash + iOS sections around §145 and §165–173, and the NEVER list), public/manifest.json, src/app/layout.tsx, src/app/globals.css (palette tokens), scripts/generate-icons.mjs. Note `sharp` is already a dependency.

GOAL
Give Copia a hand-tailored launch experience on iPhone and a hardened manifest, without touching any in-app UI.

BUILD
1. Splash images (iOS apple-touch-startup-image). iOS does NOT auto-generate these, and the native launch image MUST be a flat static PNG (no animation — that comes in 14C).
   - Source art: brand/copia-splash-mint.svg — the gummy "COPIA" wordmark (concentric layered outlines, leaf dotting the i) on the retro-mint field. This is the resolved splash per the updated directive §145.
   - Palette: register the mint field color `#b3e0d2` as a new token `--mint-wash` in globals.css (splash-only; comment it as such). The wordmark layers already map to existing tokens — verify, don't recolor. Do NOT introduce any other new hex.
   - Write scripts/generate-splash.mjs using sharp (follow the existing scripts/generate-icons.mjs pattern) to render a flat PNG per modern-iPhone size from the SVG. The wordmark stays centered and proportional; the mint field fills the rest. Output to public/splash/. Cover at minimum: 1170x2532, 1284x2778, 1179x2556, 1290x2796, 1242x2688, 1125x2436, 828x1792, 750x1334, 1080x2340 (logical-size × dpr; portrait).
   - Inject the matching <link rel="apple-touch-startup-image" media="..."> tags. In Next App Router, do this via metadata if expressible, otherwise a small set of <link> tags in the <head> of src/app/layout.tsx. Each needs the correct device-width / device-height / -webkit-device-pixel-ratio / orientation:portrait media query.
2. App icon tile validation (the leaf-on-forest tile — UI chrome, distinct from the splash).
   - Verify public/apple-touch-icon.png is 180x180, leaf mark in mint on a forest (#1C664D) tile, no transparency (iOS composites transparent icons on black).
   - The current maskable icon reuses icon-512 — verify the leaf sits inside the maskable safe zone (center 80%, ~409px diameter). If it clips, generate a properly padded public/icon-512-maskable.png (leaf at ~66% of canvas on forest) and point the maskable manifest entry at it. Keep the non-maskable icons full-bleed.
3. Manifest hardening (public/manifest.json):
   - Add "id": "/", "scope": "/", "lang": "en-US", "categories": ["shopping","food","lifestyle"], "orientation": "portrait".
   - Add a "screenshots" array using the case-study captures in case-study/screenshots/ (form_factor "narrow" for mobile, "wide" for desktop) so Android/desktop install UI shows real product, not a blank card. Copy the chosen few into public/ if needed.
   - Confirm theme_color #1C664D and background_color #FAF6EE match the live palette tokens; do not introduce new colors here.

EDITORIAL CONSTRAINTS
- Splash = gummy wordmark on mint. Icon tile = leaf on forest. Never the reverse.
- Never a generic white launch screen (directive §145). Never pure black (#000) anywhere — charcoal #1A1A1A if a dark value is needed.

NEVER
- next-pwa. No service worker in this prompt at all.
- New brand colors beyond the single documented --mint-wash. No gradients, no second display font.
- Animating the native launch image — it is a flat PNG by platform necessity.

ACCEPTANCE
- npm run build passes.
- public/splash/ contains the full PNG set; layout <head> has matching startup-image links.
- --mint-wash is defined once in globals.css with a splash-only comment; no other new hex introduced.
- manifest.json validates (no trailing commas) and references real icon + screenshot files that exist on disk.
- Report back: list every generated file and the final manifest.json.

COMMIT: "Day 14A: PWA splash (gummy wordmark on mint), maskable icon, manifest hardening"
```

---

## Prompt 14B — Standalone detection + minimal service worker

```
Day 14B — Standalone-mode detection and a minimal service worker. Still mostly plumbing; the one visible effect is that an installed app stops showing any install affordance.

Read first: src/app/layout.tsx, src/lib/ (note the existing structure), and brand/copia-frontend-design.md iOS section (§146, §165–173). 14A must be merged first.

GOAL
(1) Let the app know, anywhere, whether it is running installed (standalone) vs in a browser tab. (2) Register a minimal service worker so the Android/desktop install path can fire — WITHOUT affecting iOS behavior.

BUILD
1. Standalone detection — src/lib/pwa/use-standalone.ts (client hook) + a plain helper isStandalone() for non-React use:
   - true if `window.matchMedia('(display-mode: standalone)').matches` OR `('standalone' in navigator) && (navigator as any).standalone === true` (iOS).
   - SSR-safe: returns false during server render / before mount; updates on mount and on the media-query change event.
2. Platform hint — src/lib/pwa/platform.ts: isIOS(), isAndroid(), supportsBeforeInstallPrompt(). Used by 14C/14D to branch behaviour. Keep it dependency-free; no UA-parsing library.
3. Minimal service worker — public/sw.js:
   - A deliberately tiny SW: install + activate (skipWaiting / clients.claim) and a pass-through fetch handler (network-first, no aggressive caching — we are NOT building offline support today, only satisfying the installability criterion that requires a fetch handler).
   - Register it from a small client component (e.g. src/components/pwa/sw-register.tsx) mounted in layout, guarded by `'serviceWorker' in navigator` and production-only if that's the existing convention. Do not register in dev if it interferes with HMR.
   - Comment the file clearly: its sole job is to unlock beforeinstallprompt on Android/desktop; iOS does not need it for Add to Home Screen.

EDITORIAL / TECH CONSTRAINTS
- No offline caching strategy, no precaching, no Workbox, no next-pwa. Minimum viable SW only.
- Do not intercept navigation, do not cache HTML aggressively (would stale the live demo). Network-first pass-through.
- Nothing in this prompt renders visible chrome.

ACCEPTANCE
- npm run build passes; SW registers without console errors in a production build; unregistering/re-registering works on reload.
- useStandalone() returns true when launched from an installed icon, false in a normal tab (note this can only be fully verified on-device — leave a comment saying so).

COMMIT: "Day 14B: standalone detection hook + minimal service worker (Android/desktop install unlock)"
```

---

## Prompt 14C — Animated in-app splash overlay

```
Day 14C — The animated splash overlay. This is where the wordmark assembles itself. It must feel like ONE continuous moment with the native launch image, not a second splash stacked on the first.

Read first: brand/copia-splash-mint.svg, src/lib/pwa/use-standalone.ts (from 14B), and how the Coach's leaf-draw animation is built (src/components/seller/coach/* / src/components/ui/copia-mark.ts) — reuse that motion vocabulary, don't invent a new one.

THE PRINCIPLE
The native iOS launch image (14A) is a flat PNG of the FINAL composition. The overlay's job is to make that frozen image come alive the instant the app paints, then dissolve into the product. Motion is allowed here because it IS the brand mark — the directive forbids "motion for motion's sake," not motion that is the identity assembling (cf. the Coach leaf-draw).

BUILD
1. src/components/pwa/splash-overlay.tsx — a full-screen overlay on the --mint-wash field, rendering the wordmark SVG inline so its layers are animatable.
   - Animation: the concentric/echoed outline layers radiate outward from the wordmark (or draw in sequence), settling into the exact final composition that matches the native PNG. Keep it short (~700–1100ms), eased, calm. One gesture, not a show.
   - Seamless handoff: the overlay's FIRST frame must be visually identical to the native launch PNG (same field color, same wordmark position/scale), so the native→overlay transition is invisible. Then it animates, then fades out (~250ms) to reveal the app.
   - Use the existing motion library already in the project (motion / framer) consistent with the Coach; respect prefers-reduced-motion (skip straight to the settled state and a quick fade).
2. Show it only at the right moment:
   - Only on first paint of a standalone launch (useStandalone() === true) — a tab visit in the browser does NOT get the overlay (the browser already showed chrome; an overlay there would be theatre).
   - Show at most once per app launch; never block interaction longer than the animation; never re-trigger on client-side navigation.
3. Status bar / safe area: the mint field is light, so the dark status bar (statusBarStyle default) is correct; respect top/bottom safe-area insets so the field bleeds fully but the wordmark stays centered in the safe region.

NEVER
- A spinner, a progress bar, a percentage, "Loading…", or any AI sparkle.
- Showing the overlay in a normal browser tab, or on every route change.
- A second display font, gradients, pure black, or recoloring the wordmark off-token.
- Blocking the app behind the animation if assets are ready — the overlay is a grace note, not a gate.

ACCEPTANCE
- Simulated standalone (display-mode: standalone): overlay plays once on first paint, hands off invisibly from the static field, dissolves into the app.
- Normal tab: no overlay.
- prefers-reduced-motion: settled state + quick fade, no radiating animation.
- npm run build passes; 60fps-feel on a mid iPhone; no layout shift when it dismisses.
- Report back with a short description of the final motion and the handoff approach.

COMMIT: "Day 14C: animated splash overlay — the wordmark assembling itself, seamless from launch image"
```

---

## Prompt 14D — The install invitation (the one designed interruption)

```
Day 14D — The install invitation. THIS is the editorial moment of Day 14. Read the directive in full before writing a single line of copy or markup; everything here is governed by the Copia voice and the NEVER list.

Read first: brand/copia-frontend-design.md (entire NEVER list + iOS §165–173 + §172 specifically), the seller Settings colophon at src/components/seller/settings/colophon.tsx, src/components/seller/settings/settings-ledger.tsx, src/lib/pwa/* from 14B, and how existing surfaces handle voice (src/components/seller/coach/* for the "letter from a neighbor" register).

THE PRINCIPLE
This is an invitation, not a CTA. Like being handed a key on your way out, not a popup on your way in. It is offered once, in Copia's voice, only after the visitor has shown they mean to stay — and declining it costs nothing because the door stays open in a known place. The directive forbids the "download our app" banner outright (§172); this is the sanctioned alternative.

BUILD
1. Earned-intent trigger — src/lib/pwa/install-intent.ts:
   - Track visit count in localStorage (key namespaced, e.g. copia.pwa.visits). Increment once per session (guard against same-session double counts).
   - Expose shouldOfferInstall(): true when (visits >= 2) OR (a future "firstOrderCompleted" flag is set) — AND not already installed (useStandalone/isStandalone) AND not previously dismissed (copia.pwa.inviteDismissed) AND not already installed-via-appinstalled.
   - Wire the firstOrderCompleted flag NOW as a dormant function markFirstOrderComplete() that sets the localStorage flag. It will be called from Checkout when that ships — leave a // Day-?? Checkout will call this comment. Do not build Checkout.
2. The invitation component — src/components/pwa/install-invitation.tsx:
   - A calm, dismissible card that appears inline / as a gentle bottom sheet that the user can ignore — NOT a center-screen modal that blocks the app, NOT a full-bleed interstitial. It should feel like a note slipped in, not a gate.
   - Branch on platform:
       • iOS (no beforeinstallprompt): INSTRUCTIONAL. Calm copy that points to Share → Add to Home Screen, referencing the native iOS Share glyph (draw it as a small inline SVG that matches the system glyph; never a Material icon). Refer to it as "Copia" or "the app" — never "this website" (directive §171).
       • Android/desktop: capture the beforeinstallprompt event (preventDefault, stash it), and the invitation's affordance calls prompt() on it. If the event never arrives, fall back to the instructional copy rather than showing a dead button.
   - Dismiss ("Not now" register, not an X in a SaaS toast): sets copia.pwa.inviteDismissed and the card never returns. On dismiss, the card names its resting place before it goes:
       • Seller context (a Settings surface exists): "You'll find this any time in Settings."
       • Buyer context (no Settings yet): "You can add Copia any time from your browser's Share menu."
   - Listen for the appinstalled event; if it fires, mark installed and never offer again.
3. Permanent home — add a quiet affordance to the seller Settings colophon (colophon.tsx): a single in-voice line, e.g. "Add Copia to your home screen," that opens the same instructional content. This is the promise the dismiss copy makes good on. Make it a small reusable piece so buyer Settings can mount it later.
4. Mount the invitation once, app-wide, in the appropriate layout, gated entirely by shouldOfferInstall().

VOICE
- Copia register: neighborly, calm, plain. Aptly for any display line, Söhne for body, mono only for chrome. One italic phrase max, and only if it earns it.
- Write the final copy in-voice, then check it against the directive NEVER list before finishing. If a line could appear in any generic PWA, rewrite it.

NEVER (hard fails — re-read directive)
- "Install our app for the best experience!", "Get the app", urgency, countdowns, "best experience," trust badges, ✨/sparkle, exclamation-driven copy.
- A blocking modal or an interstitial on first paint. No nag that re-appears after dismissal. No appearance for installed users.
- Material icons, default shadcn toast styling, gradients, pure black, a second display font.
- Copy that calls Copia "this website."
- Intercepting the iOS left-edge swipe-back.

ACCEPTANCE
- Fresh visitor: nothing on visit 1; on visit 2 the invitation appears once.
- Dismiss → never returns this session or next; seller-side resting line is present in Settings colophon and opens the same content.
- Simulated standalone (display-mode: standalone): invitation never appears.
- npm run build passes; works at 375 / 390 / 430 px widths with safe-area insets respected; 44pt touch targets; inputs (if any) 16px+.
- Report the final copy for both platform branches and both dismiss contexts so it can be reviewed against the brand voice.

COMMIT: "Day 14D: install invitation — an invitation, not a banner (earned-intent, one-time)"
```

---

## Prompt 14E — Validation pass + tee up device proof

```
Day 14E — Validate the Day 14 PWA work and prepare the deferred on-device proof set. No new features.

GOAL
Confirm the install experience is correct, calm, and installable, and stage what still needs a real iPhone.

DO
1. Run the production build (npm run build && npm run start) and a Lighthouse PWA / installability check against it. Report: installable = yes/no, manifest valid, SW registered, icons + maskable pass, theme/background colors correct. Fix any hard failures (do NOT add features to chase soft suggestions like offline support — that's explicitly out of scope).
2. Self-audit against the directive NEVER list for 14C (splash overlay) and 14D (invitation) specifically. Quote the final invitation copy and confirm, line by line, that none of it trips a NEVER. If anything is borderline, flag it rather than silently keeping it.
3. Standalone suppression: verify via a forced display-mode override that the invitation and any install affordance are hidden when standalone, and that the splash overlay only plays in standalone.
4. Update the Playwright screenshot script (or add a small one) to capture the NEW surfaces at 390x844 and 1440x900: the splash overlay (settled frame), the install invitation (iOS branch + Android branch states), and the Settings colophon resting line. Save into case-study/screenshots/ alongside the existing set. Gated states may need a forced-render flag/query param for the screenshotter — add one guarded to non-production or a test param.
5. Write a short case-study/DAY_14_DEVICE_CHECKLIST.md listing the 6 on-device captures still owed (the deferred PWA install proof set): home-screen icon tile, the splash mid-launch, the standalone app with no browser chrome, the install invitation as it really renders on iOS, the Share-sheet Add-to-Home-Screen step, and the installed icon among other home-screen apps. These require a physical iPhone (directive: "iPhone-first means test on iPhone").

ACCEPTANCE
- A short written report: Lighthouse installability result, the NEVER-list line-by-line on the final copy, confirmation of standalone suppression + splash-only-in-standalone, the new screenshots committed, and the device checklist written.

COMMIT: "Day 14E: PWA validation, new-surface screenshots, on-device proof checklist"
```

---

## After Day 14

- Capture the **6 on-device screenshots** (per `DAY_14_DEVICE_CHECKLIST.md`) on a real iPhone before they go stale.
- Then **buyer-side completion** — Cart + Checkout. Checkout is where `markFirstOrderComplete()` (built dormant in 14D) gets called, lighting up the first-order install trigger for free.
- Then the **case study writeup** per §11 of the brief.
