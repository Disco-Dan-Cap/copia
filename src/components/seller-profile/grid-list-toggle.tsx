"use client";

import { cn } from "@/lib/utils";
import { GridIcon, RowsIcon } from "@/components/ui/icons";

export type ListingsView = "grid" | "list";

/**
 * Two-stop icon control for the listings layout. Shares the SegmentedControl's
 * visual language (hairline-bordered, flat, forest-filled active) but the base
 * SegmentedControl takes string labels only, so this is its own small build.
 */
export function GridListToggle({
  value,
  onChange,
}: {
  value: ListingsView;
  onChange: (v: ListingsView) => void;
}) {
  const options: { key: ListingsView; label: string; Icon: (p: { className?: string }) => React.ReactElement }[] = [
    { key: "grid", label: "Grid view", Icon: GridIcon },
    { key: "list", label: "List view", Icon: RowsIcon },
  ];

  return (
    <div
      role="radiogroup"
      aria-label="Listing layout"
      className="flex overflow-hidden rounded-[10px] border border-sage-shadow/30"
    >
      {options.map(({ key, label, Icon }) => {
        const selected = value === key;
        // One stop is always filled forest, so the seam between them is the
        // active block's edge — no hairline divider needed (matches SegmentedControl).
        return (
          <button
            key={key}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={label}
            onClick={() => onChange(key)}
            className={cn(
              "flex h-[44px] w-[46px] items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-mint",
              selected ? "bg-forest text-cream" : "text-charcoal/55 active:bg-sage-shadow/10",
            )}
          >
            <Icon className="h-[17px] w-[17px]" />
          </button>
        );
      })}
    </div>
  );
}
