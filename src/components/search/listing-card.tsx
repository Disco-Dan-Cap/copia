import { priceLabel } from "@/lib/data/listings";
import { dietLabels } from "@/lib/data/labels";
import { formatDistance } from "@/lib/geo";
import type { ListingResult } from "@/lib/search/query";

/**
 * A single search result: the product, its seller, computed distance, and
 * price. Non-interactive on Day 3 — seller and product detail screens are
 * later buyer-flow days, so the card doesn't pretend to navigate.
 */
export function ListingCard({ listing, seller, distanceMi }: ListingResult) {
  return (
    <article className="flex gap-[14px] rounded-[14px] border border-sage-shadow/25 bg-cream-warm p-[14px]">
      <div
        className="relative h-[64px] w-[64px] shrink-0 overflow-hidden rounded-[12px]"
        style={{
          backgroundImage: `linear-gradient(135deg, ${listing.gradient[0]} 0%, ${listing.gradient[1]} 100%)`,
        }}
      >
        {listing.isNew ? (
          <span className="absolute left-[5px] top-[5px] rounded-full bg-terracotta px-[6px] py-[2px] font-mono text-[7.5px] font-semibold uppercase tracking-[0.1em] text-cream">
            New
          </span>
        ) : null}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-[10px]">
          <div className="text-[14.5px] font-semibold leading-[1.2] tracking-[-0.01em] text-deepest-forest">
            {listing.name}
          </div>
          <div className="shrink-0 text-[13px] font-semibold text-forest">{priceLabel(listing)}</div>
        </div>
        <div className="mt-[3px] font-mono text-[9.5px] uppercase tracking-[0.1em] text-mid-forest">
          {seller.name}
        </div>
        <div className="mt-[8px] flex flex-wrap items-center gap-x-[7px] gap-y-[4px] font-mono text-[9px] uppercase tracking-[0.1em] text-sage-shadow">
          <span>{formatDistance(distanceMi)}</span>
          <span aria-hidden>·</span>
          <span>{seller.area}</span>
          {listing.diet[0] ? (
            <span className="rounded-full bg-light-sage/25 px-[7px] py-[2px] text-sage">
              {dietLabels[listing.diet[0]]}
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
