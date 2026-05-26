import { cn } from "@/lib/utils";
import { COPIA_MARK_PATHS, COPIA_MARK_VIEWBOX } from "./copia-mark";

interface LeafMarkProps {
  className?: string;
  "aria-label"?: string;
}

export function LeafMark({
  className,
  "aria-label": ariaLabel = "Copia leaf mark",
}: LeafMarkProps) {
  return (
    <svg
      className={cn("shrink-0", className)}
      viewBox={COPIA_MARK_VIEWBOX}
      fill="currentColor"
      role="img"
      aria-label={ariaLabel}
    >
      {COPIA_MARK_PATHS.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}
