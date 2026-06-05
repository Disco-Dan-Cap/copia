import { useCallback, useSyncExternalStore } from "react";

// Seller-uploaded photos for SEED listings, persisted in localStorage and keyed
// by listing id. The seeded /photos/*.webp files on disk are never touched; an
// override simply wins over the seed at render time. This is the Day-8
// session-store pattern (optimistic, client-owned) extended to localStorage so a
// seller's photo survives a reload — the one piece of demo state we deliberately
// persist, alongside the gradient that stays as the designed fallback.
//
// Session-CREATED listings don't live here: their photo rides on the in-memory
// listing object (their id is regenerated each session, so a localStorage key
// would orphan). This store is for stable seed ids only.
//
// A stored value is the photo data URL, or `null` when the seller explicitly
// removed the photo (→ show the gradient); a missing key means "use the seed".

const KEY = "copia.listing.photos";

type Overrides = Record<string, string | null>;

let cache: Overrides | null = null;
const listeners = new Set<() => void>();
let storageBound = false;

function read(): Overrides {
  if (cache) return cache;
  if (typeof window === "undefined") return (cache = {});
  try {
    cache = JSON.parse(window.localStorage.getItem(KEY) || "{}") as Overrides;
  } catch {
    cache = {};
  }
  return cache;
}

function emit() {
  for (const l of listeners) l();
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  // Reflect edits made in another tab (the demo on two screens).
  if (!storageBound && typeof window !== "undefined") {
    storageBound = true;
    window.addEventListener("storage", (e) => {
      if (e.key === KEY) {
        cache = null; // invalidate; re-read lazily
        emit();
      }
    });
  }
  return () => {
    listeners.delete(cb);
  };
}

/** A listing's override: a data URL, `null` (removed → gradient), or `undefined` (no override → use the seed). */
export function getPhotoOverride(id: string): string | null | undefined {
  return read()[id];
}

/**
 * Persist a photo (a data URL) or an explicit removal (`null`) for a listing.
 * Returns `false` when the write fails — the localStorage quota is full — in
 * which case nothing is applied and the caller keeps the gradient.
 */
export function setPhotoOverride(id: string, value: string | null): boolean {
  const next: Overrides = { ...read(), [id]: value };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    return false; // quota — leave state untouched, keep the gradient
  }
  cache = next;
  emit();
  return true;
}

/**
 * Subscribe a component to one listing's override. SSR / first paint returns
 * `undefined` (so the server-rendered seed photo matches), then the client
 * updates if an override exists — no hydration mismatch.
 */
export function useListingPhotoOverride(id?: string): string | null | undefined {
  const getSnapshot = useCallback(() => (id ? read()[id] : undefined), [id]);
  return useSyncExternalStore(subscribe, getSnapshot, () => undefined);
}
