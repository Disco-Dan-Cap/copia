"use client";

import { useState } from "react";
import type { DietTag } from "@/lib/data/types";
import { dietLabels, dietOrder } from "@/lib/data/labels";

// Diet markers as toggleable chips — a closed enum (clarification B), the
// canonical DietTag set. Tap a chip to drop it; "+ add" reveals the remaining
// tags as ghost chips to tap in. No checkbox dropdown.

export function DietChipsEditor({
  value,
  onChange,
}: {
  value: DietTag[];
  onChange: (value: DietTag[]) => void;
}) {
  const [adding, setAdding] = useState(false);
  const available = dietOrder.filter((d) => !value.includes(d));

  return (
    <div className="flex flex-wrap items-center gap-[6px]">
      {value.map((d) => (
        <button
          key={d}
          type="button"
          onClick={() => onChange(value.filter((x) => x !== d))}
          className="group inline-flex items-center gap-[5px] rounded-full bg-light-sage/25 px-[10px] py-[4px] font-mono text-[9.5px] uppercase tracking-[0.1em] text-forest transition-opacity active:opacity-60"
        >
          {dietLabels[d]}
          <span aria-hidden className="text-forest/50">
            ×
          </span>
        </button>
      ))}

      {adding ? (
        available.map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => {
              onChange([...value, d]);
              setAdding(false);
            }}
            className="rounded-full border border-dashed border-sage-shadow/50 px-[10px] py-[4px] font-mono text-[9.5px] uppercase tracking-[0.1em] text-sage-shadow transition-opacity active:opacity-60"
          >
            {dietLabels[d]}
          </button>
        ))
      ) : available.length > 0 ? (
        <button
          type="button"
          onClick={() => setAdding(true)}
          className="rounded-full border border-dashed border-sage-shadow/50 px-[10px] py-[4px] font-mono text-[9.5px] uppercase tracking-[0.1em] text-sage-shadow transition-opacity active:opacity-60"
        >
          + add
        </button>
      ) : null}
    </div>
  );
}
