"use client";

import { useState } from "react";
import type { Listing } from "@/lib/data/types";
import { cn } from "@/lib/utils";

// The D1-B mechanism: the status word IS the control. No action-column button —
// the word a seller already reads becomes tappable, and tapping reveals the
// other states inline as mono-caps words (never a bordered dropdown). Used on
// both the board row and the edit surface, so the two never drift.

type ListingStatusValue = NonNullable<Listing["status"]>;

const LABEL: Record<ListingStatusValue, string> = {
  active: "Active",
  "sold-out": "Sold out",
  paused: "Paused",
};
const ALL: ListingStatusValue[] = ["active", "sold-out", "paused"];

export function StatusWord({
  status,
  onChange,
  className,
}: {
  status: ListingStatusValue;
  onChange: (status: ListingStatusValue) => void;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const flagged = status !== "active";

  if (open) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-[10px] font-mono text-[9.5px] uppercase tracking-[0.1em]",
          className,
        )}
      >
        {ALL.filter((s) => s !== status).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => {
              onChange(s);
              setOpen(false);
            }}
            className="text-forest underline decoration-forest/30 underline-offset-2 transition-opacity active:opacity-60"
          >
            → {LABEL[s]}
          </button>
        ))}
        <button
          type="button"
          aria-label="Cancel"
          onClick={() => setOpen(false)}
          className="text-sage-shadow transition-opacity active:opacity-60"
        >
          ×
        </button>
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label={`Status: ${LABEL[status]} — tap to change`}
      className={cn(
        "inline-flex items-center gap-[5px] font-mono text-[9.5px] uppercase tracking-[0.1em] transition-opacity active:opacity-60",
        flagged ? "text-terracotta" : "text-mid-forest",
        className,
      )}
    >
      <span className={cn("h-[5px] w-[5px] rounded-full", flagged ? "bg-terracotta" : "bg-forest")} />
      {LABEL[status]}
    </button>
  );
}
