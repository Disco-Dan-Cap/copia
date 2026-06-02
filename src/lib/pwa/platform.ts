// Lightweight, dependency-free platform hints for PWA branching. 14C/14D use
// these to choose the right install affordance (iOS Share-sheet copy vs the
// Android/desktop `beforeinstallprompt` flow). Deliberately NOT a UA-parsing
// library — we need only three coarse signals, and feature detection beats UA
// sniffing where it can. All functions are SSR-safe (false on the server).

/** iOS / iPadOS — including iPadOS, which reports as "Macintosh" with touch. */
export function isIOS(): boolean {
  if (typeof window === "undefined") return false;
  const ua = window.navigator.userAgent;
  const iPhoneClass = /iPad|iPhone|iPod/.test(ua);
  // iPadOS 13+ masquerades as desktop Safari; multi-touch outs it.
  const iPadOS = ua.includes("Macintosh") && window.navigator.maxTouchPoints > 1;
  return iPhoneClass || iPadOS;
}

/** Android. */
export function isAndroid(): boolean {
  if (typeof window === "undefined") return false;
  return /Android/.test(window.navigator.userAgent);
}

/**
 * Whether this browser fires `beforeinstallprompt` — the Android/desktop-Chromium
 * install hook. iOS Safari never fires it (its path is the Share-sheet "Add to
 * Home Screen"), so this is feature-detected rather than UA-sniffed.
 */
export function supportsBeforeInstallPrompt(): boolean {
  if (typeof window === "undefined") return false;
  return "onbeforeinstallprompt" in window;
}
