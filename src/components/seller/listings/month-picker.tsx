"use client";

import { formatPeakWindow } from "@/lib/data/listings";
import { cn } from "@/lib/utils";

// A row of 12 tappable month words with the live human peak window beneath —
// NOT a calendar grid or a checkbox column. The readout reuses formatPeakWindow
// (clarification H) so the editor and the buyer product page always print the
// same string for the same data.

const ABBR = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function MonthPicker({
  months,
  onChange,
}: {
  months: number[];
  onChange: (months: number[]) => void;
}) {
  const toggle = (n: number) =>
    onChange(
      months.includes(n)
        ? months.filter((m) => m !== n)
        : [...months, n].sort((a, b) => a - b),
    );

  return (
    <div>
      <div className="flex flex-wrap gap-[6px]">
        {ABBR.map((label, i) => {
          const n = i + 1;
          const on = months.includes(n);
          return (
            <button
              key={n}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(n)}
              className={cn(
                "rounded-full px-[10px] py-[6px] font-mono text-[9.5px] uppercase tracking-[0.1em] transition-colors",
                on ? "bg-forest text-cream" : "border border-sage-shadow/30 text-sage-shadow",
              )}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div className="mt-[10px] font-mono text-[10px] uppercase tracking-[0.14em] text-mid-forest">
        Peak · {formatPeakWindow(months)}
      </div>
    </div>
  );
}
