"use client";

import { useSyncExternalStore } from "react";
import type { PlanEvent } from "@/lib/data/dashboard";

// Optimistic, in-memory plan-event state — the Day-7/8 honesty pattern. Notes a
// seller jots and seeded events they remove live here, survive soft navigation,
// and reset on a hard reload. Plan events have no id, so identity is a composite
// of (dayOffset, label) — unique enough per day for the seed and freeform notes.

export interface PlanOverrides {
  added: PlanEvent[];
  deleted: string[];
}

const EMPTY: PlanOverrides = { added: [], deleted: [] };
let state: PlanOverrides = EMPTY;
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

export function usePlanOverrides(): PlanOverrides {
  return useSyncExternalStore(subscribe, () => state, () => EMPTY);
}

export function planKey(e: PlanEvent): string {
  return `${e.dayOffset}:${e.label}`;
}

export function addPlanEvent(event: PlanEvent) {
  state = { ...state, added: [...state.added, event] };
  emit();
}

export function removePlanEvent(event: PlanEvent) {
  const key = planKey(event);
  state = {
    ...state,
    deleted: [...state.deleted, key],
    added: state.added.filter((a) => planKey(a) !== key),
  };
  emit();
}

/** Seed events plus this session's additions, minus anything removed. */
export function resolvePlanEvents(seed: PlanEvent[], snap: PlanOverrides): PlanEvent[] {
  return [...seed, ...snap.added].filter((e) => !snap.deleted.includes(planKey(e)));
}
