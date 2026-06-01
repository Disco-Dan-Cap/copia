import Link from "next/link";

/**
 * A ledger row — rank, crop, and the season's take, with a thin forest measure
 * rule beneath whose length is the crop's share of the top earner. NOT a chart:
 * no axis, no gridlines, no tooltip, no legend — a hand-ruled measure mark in a
 * record. The egg row running far past the rest IS the season's story, read at
 * a glance. The name links to the listing.
 */
export function CropLedgerRow({
  rank,
  name,
  revenue,
  proportion,
  href,
}: {
  rank: number;
  name: string;
  revenue: number;
  proportion: number;
  href: string;
}) {
  return (
    <div className="py-[13px]">
      <div className="flex items-baseline gap-[10px]">
        <span className="font-mono text-[11px] tabular-nums text-sage-shadow">{rank}</span>
        <Link
          href={href}
          className="flex-1 text-[16px] font-medium tracking-[-0.01em] text-deepest-forest transition-opacity active:opacity-60"
        >
          {name}
        </Link>
        <span className="font-mono text-[13px] tabular-nums text-forest">${revenue}</span>
      </div>
      <div className="mt-[7px] h-[2px] w-full overflow-hidden rounded-full bg-sage-shadow/15">
        <div
          className="h-full rounded-full bg-forest"
          style={{ width: `${Math.max(proportion * 100, 2)}%` }}
        />
      </div>
    </div>
  );
}
