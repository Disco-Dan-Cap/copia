import type { Listing } from "@/lib/data/types";
import { formatPeakWindow } from "@/lib/data/listings";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-[14px] border-t border-sage-shadow/20 px-[16px] py-[13px] first:border-t-0">
      <dt className="w-[84px] shrink-0 pt-[2px] font-mono text-[9.5px] uppercase tracking-[0.12em] text-mid-forest">
        {label}
      </dt>
      <dd className="min-w-0 flex-1 text-[14px] leading-[1.45] text-charcoal">{children}</dd>
    </div>
  );
}

/**
 * The structured-honesty core: peak window (from peakMonths), growing method,
 * harvest cadence, and what it pairs with. Pairs render as hairline-outlined
 * Söhne chips — deliberately unlike the mono-caps light-sage diet chips, since
 * they mean something different.
 */
export function ProductFacts({ listing }: { listing: Listing }) {
  return (
    <section className="px-[24px] pt-[24px]">
      <dl className="overflow-hidden rounded-[14px] border border-sage-shadow/25 bg-cream-warm">
        <Row label="Peak">{formatPeakWindow(listing.peakMonths)}</Row>
        <Row label="Method">{listing.growingMethod}</Row>
        <Row label="Harvest">{listing.harvestCadence}</Row>
        <Row label="Pairs with">
          <div className="flex flex-wrap gap-[6px]">
            {listing.pairsWith.map((p) => (
              <span
                key={p}
                className="whitespace-nowrap rounded-full border border-sage-shadow/40 px-[10px] py-[3px] text-[12.5px] leading-none text-charcoal"
              >
                {p}
              </span>
            ))}
          </div>
        </Row>
      </dl>
    </section>
  );
}
