import Link from "next/link";

/**
 * Real search demand that met a listing the buyer couldn't buy — the "relist and
 * you'd catch this" loop from Days 7–8. The reason tag is terracotta, matching
 * the sold-out/paused status color the listing surfaces already use (one
 * consistent color language across surfaces). Links to the listing to relist.
 */
export function DemandGapRow({
  query,
  weekCount,
  name,
  reason,
  href,
}: {
  query: string;
  weekCount: number;
  name: string;
  reason: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="block border-t border-forest/12 py-[14px] transition-opacity first:border-t-0 first:pt-0 active:opacity-60"
    >
      <div className="flex items-baseline justify-between gap-[12px]">
        <span className="text-[16px] font-medium text-deepest-forest">{query}</span>
        <span className="shrink-0 font-mono text-[9.5px] uppercase tracking-[0.14em] text-terracotta">
          {reason}
        </span>
      </div>
      <p className="mt-[4px] max-w-[560px] text-[13.5px] leading-[1.45] text-mid-forest">
        {weekCount} searched nearby this week — your {name.toLowerCase()}{" "}
        {reason === "Sold out" ? "sold through" : "is paused"}.
      </p>
    </Link>
  );
}
