"use client";

import type { PlanEvent } from "@/lib/data/dashboard";
import { PLAN_EVENT_STYLE } from "@/components/seller/plan-event-style";
import { cn } from "@/lib/utils";

/**
 * A plan event on the calendar — a small kind-colored dot + label, NOT a solid
 * color block (that's the Google-Calendar reflex the brief forbids). Tap to
 * remove it (optimistic). `note` is the neutral user-added kind: no dot, just a
 * quiet sage-shadow label, the lightest possible chip.
 */
export function PlanEventChip({
  event,
  onDelete,
}: {
  event: PlanEvent;
  onDelete: (event: PlanEvent) => void;
}) {
  const isNote = event.kind === "note";

  return (
    <button
      type="button"
      onClick={() => onDelete(event)}
      aria-label={`Remove "${event.label}"`}
      className={cn(
        "group inline-flex items-center gap-[6px] rounded-full py-[3px] pl-[8px] pr-[9px] text-[13px] leading-none transition-opacity active:opacity-60",
        isNote ? "text-sage-shadow" : "bg-cream-warm text-charcoal",
      )}
    >
      {!isNote ? (
        <span className={cn("h-[6px] w-[6px] shrink-0 rounded-full", PLAN_EVENT_STYLE[event.kind].bg)} />
      ) : null}
      {event.label}
      <span aria-hidden className="text-sage-shadow/50 transition-colors group-hover:text-sage-shadow">
        ×
      </span>
    </button>
  );
}
