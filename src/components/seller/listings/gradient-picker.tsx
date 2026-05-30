"use client";

import { LeafWave } from "@/components/ui/leaf-wave";
import { cn } from "@/lib/utils";

// The gradient picker — the design moment of this surface. Two slots, each a row
// of swatches, with the live hero reacting the instant you tap. The palette is
// the curated produce set (decision 3ii), distilled from the 23 colors the seed
// listings actually use — NOT the green-heavy 10 brand tokens, which couldn't
// make a tomato red. No color wheel, no hex field.

const PRODUCE: { name: string; hex: string }[] = [
  { name: "Leaf", hex: "#74B5A1" },
  { name: "Mint", hex: "#9CE5D0" },
  { name: "Sage", hex: "#509982" },
  { name: "Forest", hex: "#1C664D" },
  { name: "Deep forest", hex: "#30594A" },
  { name: "Tomato", hex: "#C46A4F" },
  { name: "Dark tomato", hex: "#8B3A28" },
  { name: "Peach", hex: "#E8927C" },
  { name: "Honey", hex: "#E8C36A" },
  { name: "Amber", hex: "#C49A3F" },
  { name: "Berry", hex: "#9C3F4A" },
  { name: "Rye", hex: "#B5874F" },
];

function Slot({
  label,
  value,
  onPick,
}: {
  label: string;
  value: string;
  onPick: (hex: string) => void;
}) {
  return (
    <div>
      <div className="mb-[8px] font-mono text-[9.5px] uppercase tracking-[0.14em] text-mid-forest">
        {label}
      </div>
      <div className="flex flex-wrap gap-[8px]">
        {PRODUCE.map((c) => {
          const selected = value.toUpperCase() === c.hex.toUpperCase();
          return (
            <button
              key={c.hex}
              type="button"
              aria-label={c.name}
              aria-pressed={selected}
              onClick={() => onPick(c.hex)}
              style={{ backgroundColor: c.hex }}
              className={cn(
                "h-[30px] w-[30px] rounded-full transition-transform active:scale-90",
                selected
                  ? "ring-2 ring-forest ring-offset-2 ring-offset-cream"
                  : "ring-1 ring-inset ring-forest/15",
              )}
            />
          );
        })}
      </div>
    </div>
  );
}

export function GradientPicker({
  from,
  to,
  onChange,
}: {
  from: string;
  to: string;
  onChange: (gradient: [string, string]) => void;
}) {
  return (
    <div className="flex flex-col gap-[16px]">
      <div
        className="relative h-[200px] w-full overflow-hidden rounded-[14px]"
        style={{ backgroundImage: `linear-gradient(135deg, ${from} 0%, ${to} 100%)` }}
      >
        <LeafWave
          density="sparse"
          opacity={0.6}
          className="absolute inset-0 h-full w-full text-cream opacity-20"
        />
      </div>
      <Slot label="Gradient · From" value={from} onPick={(hex) => onChange([hex, to])} />
      <Slot label="Gradient · To" value={to} onPick={(hex) => onChange([from, hex])} />
    </div>
  );
}
