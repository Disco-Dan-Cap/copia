"use client";

import { useSyncExternalStore } from "react";
import { listingById } from "@/lib/data/listings";
import { sellersById } from "@/lib/data/sellers";
import type { Listing, Seller } from "@/lib/data/types";

// The basket — the buyer's first stateful surface. The house useSyncExternalStore
// pattern (same as the settings store and use-standalone), but persisted to
// localStorage so it survives a reload, and SSR-safe: the server snapshot is empty
// and the client matches it on first paint, then hydrates from storage.
//
// What's stored is intentionally lean — just { listingId, qty }. Everything else
// (price, grower, location) is joined from the seed data at read time, so the
// basket can never drift from the catalogue. The basket's native shape is GROUPED
// BY GROWER: you're not filling a cart, you're carrying a few growers' goods home.

const KEY = "copia.basket";
const MIN = 1;
const MAX = 99;

const clampQty = (n: number) => Math.max(MIN, Math.min(MAX, Math.round(n)));

export interface BasketItem {
  listingId: string;
  qty: number;
}

// ── Resolved (read) shapes, joined with the catalogue for the view ──────────
export interface BasketLine {
  listing: Listing;
  qty: number;
  lineTotal: number;
}
export interface BasketGroup {
  seller: Seller;
  lines: BasketLine[];
  subtotal: number;
}
export interface GroupedBasket {
  groups: BasketGroup[];
  itemCount: number;
  total: number;
}

// ── State + caches ──────────────────────────────────────────────────────────
let items: BasketItem[] = [];
let hydrated = false;
const listeners = new Set<() => void>();

const EMPTY_GROUPED: GroupedBasket = { groups: [], itemCount: 0, total: 0 };
// getSnapshot must return a STABLE reference between renders or useSyncExternalStore
// loops forever — so the grouped/count results are cached and only rebuilt on change.
let groupedCache: GroupedBasket = EMPTY_GROUPED;
let countCache = 0;

function recompute() {
  countCache = items.reduce((n, it) => n + it.qty, 0);

  // Group by grower, preserving the order each grower first entered the basket.
  const order: string[] = [];
  const linesBySeller = new Map<string, BasketLine[]>();
  for (const it of items) {
    const listing = listingById(it.listingId);
    if (!listing) continue; // listing pulled from the catalogue — drop quietly
    if (!linesBySeller.has(listing.sellerId)) {
      linesBySeller.set(listing.sellerId, []);
      order.push(listing.sellerId);
    }
    linesBySeller.get(listing.sellerId)!.push({
      listing,
      qty: it.qty,
      lineTotal: listing.price * it.qty,
    });
  }

  let total = 0;
  const groups: BasketGroup[] = [];
  for (const sellerId of order) {
    const seller = sellersById[sellerId];
    if (!seller) continue;
    const lines = linesBySeller.get(sellerId)!;
    const subtotal = lines.reduce((s, l) => s + l.lineTotal, 0);
    total += subtotal;
    groups.push({ seller, lines, subtotal });
  }

  groupedCache = groups.length ? { groups, itemCount: countCache, total } : EMPTY_GROUPED;
}

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    /* Safari private mode / quota — the basket just won't survive reload. */
  }
}

/** Lazy, idempotent hydrate from localStorage. Runs only on the client. */
function ensureHydrated() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    if (Array.isArray(parsed)) {
      items = parsed
        .filter(
          (x): x is BasketItem =>
            x && typeof x.listingId === "string" && typeof x.qty === "number" && x.qty > 0,
        )
        .map((x) => ({ listingId: x.listingId, qty: clampQty(x.qty) }));
    }
  } catch {
    items = [];
  }
  recompute();
}

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(cb: () => void) {
  ensureHydrated(); // first subscribe (post-mount) pulls in any persisted basket
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

// ── Mutations ─────────────────────────────────────────────────────────────
export function addItem(listing: Listing, qty = 1) {
  ensureHydrated();
  const existing = items.find((i) => i.listingId === listing.id);
  items = existing
    ? items.map((i) =>
        i.listingId === listing.id ? { ...i, qty: clampQty(i.qty + qty) } : i,
      )
    : [...items, { listingId: listing.id, qty: clampQty(qty) }];
  recompute();
  persist();
  emit();
}

export function setQty(listingId: string, qty: number) {
  ensureHydrated();
  if (qty < MIN) {
    removeItem(listingId);
    return;
  }
  items = items.map((i) => (i.listingId === listingId ? { ...i, qty: clampQty(qty) } : i));
  recompute();
  persist();
  emit();
}

export function removeItem(listingId: string) {
  ensureHydrated();
  items = items.filter((i) => i.listingId !== listingId);
  recompute();
  persist();
  emit();
}

export function clear() {
  ensureHydrated();
  items = [];
  recompute();
  persist();
  emit();
}

// ── Selectors (hooks) ────────────────────────────────────────────────────
/** Total item count — the header chrome number. */
export function useBasketCount(): number {
  return useSyncExternalStore(subscribe, () => countCache, () => 0);
}

/** The basket grouped by grower — the page's native shape. */
export function useGroupedBasket(): GroupedBasket {
  return useSyncExternalStore(subscribe, () => groupedCache, () => EMPTY_GROUPED);
}

/** How many of one listing are already in the basket — drives the add-bar settle. */
export function useBasketQty(listingId: string): number {
  return useSyncExternalStore(
    subscribe,
    () => items.find((i) => i.listingId === listingId)?.qty ?? 0,
    () => 0,
  );
}
