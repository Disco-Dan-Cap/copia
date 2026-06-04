"use client";

import { useSyncExternalStore } from "react";
import type { DeliveryTier, PaymentMethod } from "@/lib/checkout/plan";

// The buyer's placed orders — what checkout creates and Day 17's order history
// reads. The Day-8 merge pattern (session-created records layered over the seed)
// extended to the buyer side, but persisted to localStorage like the basket:
// an order you placed should survive a reload, and the confirmation note is
// reachable again. Day 17 will merge these created orders ahead of any seeded
// buyer history.
//
// Shape note: a placed order is an ARRANGEMENT, not a row. One order spans
// several growers, each with their own fulfillment, consolidated under one
// courier run and one settle. The grower/line data is denormalized in at
// write time (names, areas, totals) so the history doesn't have to re-join the
// catalogue — and so a created order reads correctly even if seed ids drift.

const KEY = "copia.orders";

export interface PlacedLine {
  name: string;
  unit: string;
  qty: number;
  lineTotal: number;
}

export interface PlacedGroup {
  sellerId: string;
  sellerName: string;
  area: string;
  contactName: string;
  lines: PlacedLine[];
  subtotal: number;
  fulfillment: "pickup" | "delivery";
}

export interface PlacedOrder {
  /** Mono-chrome reference, e.g. "CP-7K4M2". Chrome, not the headline. */
  ref: string;
  /** Day-offset convention shared with the seed (0 = the day it was placed). */
  placedAtOffset: number;
  groups: PlacedGroup[];
  /** One consolidated courier run, or null when it's all pickup. */
  delivery: { tier: DeliveryTier; fee: number; window: string } | null;
  payment: PaymentMethod;
  itemsTotal: number;
  total: number;
  /** The arrangement sentence, saved so history restates it the same way. */
  narration: string;
}

// ── State ─────────────────────────────────────────────────────────────────
let orders: PlacedOrder[] = [];
let hydrated = false;
const listeners = new Set<() => void>();

const EMPTY: PlacedOrder[] = [];
// useSyncExternalStore needs a stable reference between renders.
let snapshot: PlacedOrder[] = EMPTY;

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(orders));
  } catch {
    /* Safari private mode / quota — the order just won't survive reload. */
  }
}

function ensureHydrated() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    if (Array.isArray(parsed)) {
      orders = parsed.filter((o): o is PlacedOrder => o && typeof o.ref === "string");
      snapshot = orders;
    }
  } catch {
    orders = [];
  }
}

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(cb: () => void) {
  ensureHydrated();
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

/**
 * A readable, collision-resistant reference. Created on a user click (so the
 * Date access is client-only and SSR-safe), uppercased base-36 — it reads like
 * something stamped on a receipt, which is exactly the only thing it is.
 */
export function nextOrderRef(): string {
  const stamp = Date.now().toString(36).toUpperCase().slice(-5);
  return `CP-${stamp}`;
}

/** Record a placed order, newest first. Returns the same order for convenience. */
export function placeOrder(order: PlacedOrder): PlacedOrder {
  ensureHydrated();
  orders = [order, ...orders];
  snapshot = orders;
  persist();
  emit();
  return order;
}

/** Every placed order, newest first — Day 17's history feed (created records). */
export function usePlacedOrders(): PlacedOrder[] {
  return useSyncExternalStore(subscribe, () => snapshot, () => EMPTY);
}

/** One placed order by reference, or undefined. */
export function placedOrderByRef(ref: string): PlacedOrder | undefined {
  ensureHydrated();
  return orders.find((o) => o.ref === ref);
}
