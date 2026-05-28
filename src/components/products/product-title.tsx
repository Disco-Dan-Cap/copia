import type { Listing } from "@/lib/data/types";
import { priceLabel } from "@/lib/data/listings";
import { categoryLabels } from "@/lib/data/labels";

/**
 * Title block — mono-caps eyebrow (category + the in-season signal, the page's
 * single terracotta spike), product name in Aptly, price in forest.
 */
export function ProductTitle({ listing, inSeason }: { listing: Listing; inSeason: boolean }) {
  return (
    <section className="px-[24px] pt-[20px]">
      <div className="flex items-center gap-[8px] font-mono text-[10px] uppercase tracking-[0.12em] text-mid-forest">
        <span>{categoryLabels[listing.category]}</span>
        <span aria-hidden>·</span>
        {inSeason ? (
          <span className="flex items-center gap-[5px] text-terracotta">
            <span className="h-[5px] w-[5px] rounded-full bg-terracotta" />
            In season now
          </span>
        ) : (
          <span className="text-sage-shadow">Out of season</span>
        )}
      </div>
      <h1 className="mt-[9px] font-display text-[30px] font-medium leading-[1.02] tracking-[-0.02em] text-forest">
        {listing.name}
      </h1>
      <div className="mt-[7px] text-[18px] font-semibold text-forest">{priceLabel(listing)}</div>
    </section>
  );
}
