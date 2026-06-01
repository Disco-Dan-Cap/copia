"use client";

import { useSyncExternalStore } from "react";
import type { Conversation, Message } from "@/lib/data/messages";
import { conversations } from "@/lib/data/messages";

// Optimistic, in-memory correspondence state — the Days 7/8 honesty pattern.
// Opening a thread marks it read (the terracotta dot clears from the inbox row
// and the nav); sent replies append locally. Both survive soft navigation and
// reset on a hard reload — nothing is persisted.

export interface MessageOverrides {
  read: string[];
  sent: Record<string, Message[]>;
}

const EMPTY: MessageOverrides = { read: [], sent: {} };
let state: MessageOverrides = EMPTY;
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

export function useMessageStore(): MessageOverrides {
  return useSyncExternalStore(subscribe, () => state, () => EMPTY);
}

export function markRead(id: string) {
  if (state.read.includes(id)) return;
  state = { ...state, read: [...state.read, id] };
  emit();
}

export function appendMessage(id: string, message: Message) {
  state = {
    ...state,
    sent: { ...state.sent, [id]: [...(state.sent[id] ?? []), message] },
  };
  emit();
}

/** A conversation is unread when seeded unread and not yet opened this session. */
export function isUnread(c: Conversation, snap: MessageOverrides): boolean {
  return Boolean(c.unread) && !snap.read.includes(c.id);
}

/** Any unread across the seeded threads — drives the subtle nav dot (no count). */
export function useHasUnread(): boolean {
  const snap = useMessageStore();
  return conversations.some((c) => c.unread && !snap.read.includes(c.id));
}
