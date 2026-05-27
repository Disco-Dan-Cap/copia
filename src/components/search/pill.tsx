import { cn } from "@/lib/utils";

/** Shared toggle pill used by the quick chips and the filter sheet. */
export function Pill({
  active,
  onClick,
  children,
  className,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex min-h-[40px] items-center whitespace-nowrap rounded-full px-[15px] font-mono text-[10px] uppercase tracking-[0.1em] transition-colors active:opacity-70",
        active
          ? "bg-forest text-cream"
          : "bg-cream-warm text-mid-forest ring-1 ring-sage-shadow/30",
        className,
      )}
    >
      {children}
    </button>
  );
}
