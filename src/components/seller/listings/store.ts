"use client";

import { useSyncExternalStore } from "react";
import type { Listing } from "@/lib/data/types";

// Optimistic, in-memory board state — the Day-7 honesty pattern extended across
// routes. Edits, deletes, and creates made on the detail/new screens need to be
// visible when we navigate back to the board, so they live in a module-level
// store that survives client-side (soft) navigation. It is NOT persisted, so a
// hard reload starts from the seed again — exactly the "reset on reload"
// guarantee we promised. Server-rendered pages always emit the pure seed; the
// board merges these overrides in on the client.

export interface BoardOverrides {
  /** Field patches per listing id (partial Listing). */
  edits: Record<string, Partial<Listing>>;
  /** Ids removed from the board. */
  deleted: string[];
  /** Listings created this session, newest first. */
  created: Listing[];
}

const EMPTY: BoardOverrides = { edits: {}, deleted: [], created: [] };
let state: BoardOverrides = EMPTY;
let counter = 0;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

// Server snapshot is always EMPTY (the seed) so SSR matches the client's first
// paint and there's no hydration mismatch.
export function useBoardOverrides(): BoardOverrides {
  return useSyncExternalStore(subscribe, () => state, () => EMPTY);
}

export function applyEdit(id: string, patch: Partial<Listing>) {
  state = {
    ...state,
    edits: { ...state.edits, [id]: { ...state.edits[id], ...patch } },
  };
  emit();
}

export function deleteListing(id: string) {
  if (state.deleted.includes(id)) return;
  state = { ...state, deleted: [...state.deleted, id] };
  emit();
}

/** A stable, collision-free id for a session-created listing. */
export function nextListingId(): string {
  counter += 1;
  return `l-new-${counter}`;
}

export function createListing(listing: Listing) {
  state = { ...state, created: [listing, ...state.created] };
  emit();
}

/**
 * Resolve a single listing for the edit route, store-first: a session-created
 * listing (if any) wins, otherwise the server seed, with edits patched on top.
 * Returns null when neither exists — e.g. a hard reload onto a created
 * listing's URL after the store has reset, which is correct (it's gone).
 */
export function resolveListing(
  id: string,
  seed: Listing | undefined,
  snap: BoardOverrides,
): Listing | null {
  const base = snap.created.find((l) => l.id === id) ?? seed;
  if (!base) return null;
  return snap.edits[id] ? { ...base, ...snap.edits[id] } : base;
}

/** Whether an id belongs to a listing created this session (vs. the seed). */
export function isCreatedListing(id: string, snap: BoardOverrides): boolean {
  return snap.created.some((l) => l.id === id);
}

/**
 * Merge the seed with this session's overrides for one seller: created listings
 * lead (so a new one lands at the top), deletes drop out, edits patch in.
 */
export function resolveBoardListings(
  sellerId: string,
  seed: Listing[],
  snap: BoardOverrides,
): Listing[] {
  const created = snap.created.filter((l) => l.sellerId === sellerId);
  return [...created, ...seed]
    .filter((l) => !snap.deleted.includes(l.id))
    .map((l) => (snap.edits[l.id] ? { ...l, ...snap.edits[l.id] } : l));
}
