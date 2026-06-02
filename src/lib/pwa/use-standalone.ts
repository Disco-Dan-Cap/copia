"use client";

import { useSyncExternalStore } from "react";

// Standalone detection — is Copia running as an installed PWA (launched from a
// home-screen / desktop icon) rather than inside a browser tab?
//
// Two signals, because no single one covers every platform:
//   - matchMedia('(display-mode: standalone)') — the standard, used by Android
//     Chrome, desktop Chromium, and modern iOS once installed.
//   - navigator.standalone === true — the legacy iOS-Safari-only flag, kept as a
//     belt-and-suspenders fallback.
//
// NOTE: this can only be *fully* verified on-device. In a normal DevTools tab it
// reads false unless you emulate display-mode. Per §146 of the brand directive,
// callers use this to hide "Add to Home Screen" hints once the app is installed.

const STANDALONE_QUERY = "(display-mode: standalone)";

/** Plain, non-React check. SSR-safe — returns false on the server. */
export function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  const mql = window.matchMedia?.(STANDALONE_QUERY);
  const displayModeStandalone = mql ? mql.matches : false;
  const iosStandalone =
    "standalone" in window.navigator &&
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
  return displayModeStandalone || iosStandalone;
}

function subscribe(onChange: () => void): () => void {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mql = window.matchMedia(STANDALONE_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

/**
 * useStandalone() — true when launched from an installed icon, false in a normal
 * tab. Returns false during SSR and on the first hydration pass (matching the
 * server snapshot), then settles to the real value after mount and updates
 * whenever the display-mode media query flips.
 */
export function useStandalone(): boolean {
  return useSyncExternalStore(subscribe, isStandalone, () => false);
}
