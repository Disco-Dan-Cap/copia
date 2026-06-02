/*
 * Copia — minimal service worker.
 *
 * Its SOLE job is to satisfy the installability criterion that requires a fetch
 * handler, so Android / desktop Chromium will fire `beforeinstallprompt` and
 * offer "Install Copia". iOS does NOT need this — its Add-to-Home-Screen path
 * works without a service worker at all.
 *
 * Deliberately NOT an offline strategy: no precache, no Cache Storage, no
 * Workbox, no next-pwa. We never want a stale demo. The fetch handler is a
 * network-first pass-through — it forwards every request straight to the
 * network and caches nothing — so the live demo always reflects the deployed
 * build. The handler exists only so the browser sees one.
 */

self.addEventListener("install", () => {
  // Activate immediately instead of waiting for old clients to close.
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  // Take control of open pages right away, so the install criterion is met on
  // first load without a manual refresh.
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  // Non-GET (e.g. /api/coach POSTs) and cross-origin (Mapbox, fonts) pass
  // through untouched — the SW never sits in their path.
  if (request.method !== "GET") return;
  if (new URL(request.url).origin !== self.location.origin) return;
  // Network-first pass-through. No caching, no offline support (out of scope).
  event.respondWith(fetch(request));
});
