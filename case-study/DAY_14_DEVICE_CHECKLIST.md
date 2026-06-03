# Day 14 — On-device PWA proof set (deferred)

The Day 14 install experience is validated in headless Chromium (installability,
manifest, service worker, icons, standalone suppression, both invitation branches)
and captured for the case study at 390×844 and 1440×900. But the directive is
explicit — **"iPhone-first means test on iPhone"** (`brand/copia-frontend-design.md`
§102) — and six captures can only be produced on a physical device. They are the
proof that the install actually lands, in the one place an emulator cannot vouch for.

These are **deferred, not skipped.** Everything they depend on is already shipped and
verified in CI; what's missing is a real iPhone, real Mobile Safari, and the real
home screen. Capture them on an iPhone running iOS 17+ (a Pro at 390pt is the
baseline), in good light, and drop them into `case-study/screenshots/device/`.

## Why these can't be faked

- iOS only honours `apple-touch-icon`, the startup-image `<link>`s, and
  `display-mode: standalone` **once the app is actually added to the home screen** via
  the Safari Share sheet. There is no emulator path to a real home-screen tile, a real
  native launch image, or real standalone chrome-removal.
- Chrome DevTools / Playwright can *force* `display-mode: standalone`, which is how the
  splash-only-in-standalone and invitation-suppression checks were proven — but a
  forced media query is not the installed OS state, and never shows the system chrome
  (status bar, home indicator, app switcher) the way the device does.

## The six captures owed

| # | Capture | What it proves | How to get it |
|---|---------|----------------|---------------|
| 1 | **Home-screen icon tile** | The `apple-touch-icon` (mint leaf on forest, 180×180, flattened — no black-composite) renders as a crisp rounded tile labelled "Copia". | After Add to Home Screen, photograph (or screenshot) the new tile on the home grid. Confirm the leaf sits centered, the forest fills the squircle, and the label reads "Copia". |
| 2 | **Splash mid-launch** | The native launch image (`public/splash/*.png`, gummy wordmark on mint) and the in-app splash overlay (14C) read as **one continuous moment** — no white flash, no seam. | Cold-launch from the home-screen icon and screen-record; pull the frame just after the tap where the wordmark is on the mint field. The native PNG and the overlay's first frame should be indistinguishable. |
| 3 | **Standalone app, no browser chrome** | Launched from the icon, Copia runs full-screen — no Safari address bar, no toolbar — with the cream canvas under a legible dark status bar and safe-area insets respected. | Open Copia from the home-screen icon (not a tab). Screenshot any primary surface (Home or seller Dashboard). Confirm zero Safari chrome and that content clears the Dynamic Island / home indicator. |
| 4 | **Install invitation on iOS, for real** | The earned-intent invitation (14D) renders as the calm bottom-sheet it does in the captures — cream card, Aptly headline, Söhne body, the hand-drawn Share glyph — in real Mobile Safari, not an emulator. | In Safari (a normal tab), reach the invitation honestly: visit twice across sessions. Screenshot the sheet as it appears at the foot of the screen. |
| 5 | **Share-sheet Add-to-Home-Screen step** | The instructional copy points at the true system path: the iOS Share sheet with "Add to Home Screen" present, matching the glyph and wording in the invitation. | Open Safari's Share sheet on Copia and screenshot it with "Add to Home Screen" visible. This is the step the iOS invitation copy describes. |
| 6 | **Installed icon among other apps** | Copia's tile holds its own next to native and third-party icons — the brand earns its place on the home screen, not just in the browser. | Screenshot the home-screen page (or app library) showing the Copia tile beside other installed apps. |

## Acceptance for the deferred set

- Six images in `case-study/screenshots/device/`, captured on a physical iPhone (iOS 17+).
- Note the device + iOS version in the case-study copy where these land (§11 of the brief).
- Cross-check #1 against `public/apple-touch-icon.png` and #2 against `public/splash/` —
  the device renders should match the committed assets, confirming the pipeline end-to-end.
