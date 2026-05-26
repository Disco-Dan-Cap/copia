import { cn } from "@/lib/utils";

interface LeafWaveProps {
  /** Tiling density. `sparse` is the in-product textural default. */
  density?: "sparse" | "medium";
  /** Opacity of the pattern fill itself (the wave color comes from `text-*`). */
  opacity?: number;
  className?: string;
}

/**
 * Leaf Wave background texture. Fills its positioned parent with the motif.
 * Set the color via a `text-*` class and overall strength via `opacity` +
 * an `opacity-*` class on the element. Requires <LeafWaveDefs> mounted once.
 */
export function LeafWave({
  density = "sparse",
  opacity = 0.5,
  className,
}: LeafWaveProps) {
  return (
    <svg
      aria-hidden
      className={cn("pointer-events-none", className)}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect
        width="100%"
        height="100%"
        fill={`url(#leafWave-${density})`}
        opacity={opacity}
      />
    </svg>
  );
}
