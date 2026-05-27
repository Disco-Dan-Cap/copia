"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

export interface Segment {
  key: string;
  label: string;
  selected: boolean;
  /** Pointer-click handler — owns the toggle/clear logic (re-tap to clear). */
  onActivate: () => void;
}

/**
 * iOS-register segmented control, styled to Copia tokens — for single-select
 * value-along-a-spectrum choices (price, distance) where connected segments
 * read as "one decision with discrete stops" rather than "pick one chip".
 * Pentagram, not Apple Settings: flat, hairline-divided, no shadow or glass.
 *
 * Presentational + keyboard only — each segment carries its own selected state
 * and activate handler, so the caller keeps the exact toggle behavior it had as
 * chips. ARIA radiogroup with roving tabindex; arrow keys move and select.
 */
export function SegmentedControl({
  segments,
  ariaLabel,
}: {
  segments: Segment[];
  ariaLabel: string;
}) {
  const btns = useRef<(HTMLButtonElement | null)[]>([]);

  const selectedIndex = segments.findIndex((s) => s.selected);
  const focusIndex = selectedIndex === -1 ? 0 : selectedIndex;

  // Move focus to a segment and select it. Guard against re-toggling an already
  // selected segment (keyboard nav selects, never clears).
  const activate = (idx: number) => {
    if (idx < 0 || idx >= segments.length) return;
    btns.current[idx]?.focus();
    if (!segments[idx].selected) segments[idx].onActivate();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const i = Number((e.target as HTMLElement).dataset.index);
    if (Number.isNaN(i)) return;
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        activate(i + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        activate(i - 1);
        break;
      case "Home":
        e.preventDefault();
        activate(0);
        break;
      case "End":
        e.preventDefault();
        activate(segments.length - 1);
        break;
      default:
        break;
    }
  };

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
      className="flex w-full overflow-hidden rounded-[12px] border border-sage-shadow/30"
    >
      {segments.map((seg, i) => {
        // A selected segment hides the dividers touching it (clean iOS seam).
        const showDivider = i > 0 && !seg.selected && !segments[i - 1].selected;
        return (
          <button
            key={seg.key}
            ref={(el) => {
              btns.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={seg.selected}
            data-index={i}
            tabIndex={i === focusIndex ? 0 : -1}
            onClick={seg.onActivate}
            className={cn(
              "flex min-h-[44px] flex-1 items-center justify-center px-[6px] text-center font-mono text-[10px] uppercase tracking-[0.1em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-mint",
              seg.selected
                ? "bg-forest text-cream active:bg-deepest-forest"
                : "text-charcoal/75 active:bg-sage-shadow/10",
              showDivider && "border-l border-sage-shadow/30",
            )}
          >
            {seg.label}
          </button>
        );
      })}
    </div>
  );
}
