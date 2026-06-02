"use client";

import { useEffect } from "react";

// Registers the minimal service worker (public/sw.js) after the page has loaded.
// Its only purpose is to unlock `beforeinstallprompt` on Android / desktop
// Chromium — iOS does not need it for Add to Home Screen. Renders nothing.
//
// Dev guard: registration is skipped in development so the SW's fetch handler
// never sits in front of Next's HMR websocket traffic.

export function SwRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    const register = () => {
      navigator.serviceWorker.register("/sw.js").catch((err) => {
        // Non-fatal: the app works without it; only the install prompt is lost.
        console.error("Copia SW registration failed:", err);
      });
    };

    // Defer to load so registration never competes with first paint.
    if (document.readyState === "complete") {
      register();
      return;
    }
    window.addEventListener("load", register, { once: true });
    return () => window.removeEventListener("load", register);
  }, []);

  return null;
}
