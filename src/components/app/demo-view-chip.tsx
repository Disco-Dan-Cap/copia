import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Buyer ↔ seller demo toggle. Reads as meta-chrome in the exact register of the
 * dashboard's "Viewing as" identity chip — dashed hairline, mono-caps, muted —
 * so it's obvious this is a portfolio affordance for exploring both sides, not
 * in-product navigation. `tone="dark"` adapts the muted colors for the
 * deepest-forest seller sidebar (sage-shadow fails contrast there).
 */
export function DemoViewChip({
  href,
  label,
  dir,
  tone = "light",
  className,
}: {
  href: string;
  label: string;
  dir: "back" | "forward";
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-[6px] rounded-full border border-dashed px-[11px] py-[6px] font-mono text-[8.5px] uppercase tracking-[0.16em] transition-opacity active:opacity-60",
        tone === "dark"
          ? "border-cream/25 text-cream/55"
          : "border-sage-shadow/50 text-sage-shadow",
        className,
      )}
    >
      {dir === "back" ? <span aria-hidden>←</span> : null}
      {label}
      {dir === "forward" ? <span aria-hidden>→</span> : null}
    </Link>
  );
}
