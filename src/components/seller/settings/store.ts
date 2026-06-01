"use client";

import { useSyncExternalStore } from "react";

// Optimistic, in-memory settings state — the same Day-7 honesty pattern the
// listings board uses, keyed by sellerId so the ?as= demo switch keeps each
// stall's edits separate. NOT persisted: a hard reload starts from the seed
// defaults again, exactly the "reset on reload" guarantee the seller surfaces
// have promised since Day 7. Server snapshot is always empty so SSR matches the
// client's first paint.

export interface StallEdits {
  bio?: string;
  growing?: string;
  pickup?: string;
  reach?: string;
  paused?: boolean;
  pauseReason?: string;
}

type State = Record<string, StallEdits>;

const EMPTY_EDITS: StallEdits = {};
let state: State = {};
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

/** This session's edits for one stall (stable reference until it changes). */
export function useStallEdits(sellerId: string): StallEdits {
  return useSyncExternalStore(
    subscribe,
    () => state[sellerId] ?? EMPTY_EDITS,
    () => EMPTY_EDITS,
  );
}

export function setStallField(sellerId: string, patch: Partial<StallEdits>) {
  state = { ...state, [sellerId]: { ...state[sellerId], ...patch } };
  emit();
}
