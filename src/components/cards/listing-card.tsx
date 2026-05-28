import { priceLabel } from "@/lib/data/listings";
import { dietLabels } from "@/lib/data/labels";
import { formatDistance } from "@/lib/geo";
import { cn } from "@/lib/utils";
import type { Listing, Seller } from "@/lib/data/types";

export interface ListingCardProps {
  listing: Listing;
  seller: Seller;
  /** Computed distance to the seller. Shown only in the list variant + when showSeller. */
  distanceMi?: number;
  /**
   * `list` — horizontal row (search results, seller "list" view).
   * `grid` — vertical tile (seller "grid" view, in-season strip).
   */
  variant?: "list" | "grid";
  /**
   * Show the seller name + distance/area meta. True for search (cards span
   * sellers); false on a seller's own profile (it's redundant there).
   */
  showSeller?: boolean;
}

function NewBadge() {
  return (
    <span className="absolute left-[5px] top-[5px] rounded-full bg-terracotta px-[6px] py-[2px] font-mono text-[7.5px] font-semibold uppercase tracking-[0.1em] text-cream">
      New
    </span>
  );
}

function DietChip({ listing }: { listing: Listing }) {
  if (!listing.diet[0]) return null;
  return (
    <span className="whitespace-nowrap rounded-full bg-light-sage/25 px-[7px] py-[2px] text-sage">
      {dietLabels[listing.diet[0]]}
    </span>
  );
}

/**
 * Product card shared across Search and the seller profile. Day-3 list row plus
 * a Day-4 grid tile. Presentational and inert — callers that navigate (Search)
 * wrap it in a Link; the seller profile renders it static until the product
 * detail route lands.
 */
export function ListingCard({
  listing,
  seller,
  distanceMi,
  variant = "list",
  showSeller = true,
}: ListingCardProps) {
  const gradient = `linear-gradient(135deg, ${listing.gradient[0]} 0%, ${listing.gradient[1]} 100%)`;

  if (variant === "grid") {
    return (
      <article className="flex flex-col rounded-[14px] border border-sage-shadow/25 bg-cream-warm p-[12px]">
        <div
          className="relative mb-[10px] aspect-[4/3] w-full overflow-hidden rounded-[10px]"
          style={{ backgroundImage: gradient }}
        >
          {listing.isNew ? <NewBadge /> : null}
        </div>
        {showSeller ? (
          <div className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-mid-forest">
            {seller.name}
          </div>
        ) : null}
        <div className="text-[13.5px] font-semibold leading-[1.2] tracking-[-0.01em] text-deepest-forest">
          {listing.name}
        </div>
        {/* Grid stacks: image → title → price → chip. The chip gets its own row
            because at 2-column width it can't share one with the price. */}
        <div className="mt-[6px] text-[13px] font-semibold text-forest">{priceLabel(listing)}</div>
        {listing.diet[0] ? (
          <div className="mt-[8px] font-mono text-[9px] uppercase tracking-[0.1em]">
            <DietChip listing={listing} />
          </div>
        ) : null}
      </article>
    );
  }

  // list variant
  return (
    <article className="flex gap-[14px] rounded-[14px] border border-sage-shadow/25 bg-cream-warm p-[14px]">
      <div
        className="relative h-[64px] w-[64px] shrink-0 overflow-hidden rounded-[12px]"
        style={{ backgroundImage: gradient }}
      >
        {listing.isNew ? <NewBadge /> : null}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-[10px]">
          <div className="text-[14.5px] font-semibold leading-[1.2] tracking-[-0.01em] text-deepest-forest">
            {listing.name}
          </div>
          <div className="shrink-0 text-[13px] font-semibold text-forest">{priceLabel(listing)}</div>
        </div>
        {showSeller ? (
          <div className="mt-[3px] font-mono text-[9.5px] uppercase tracking-[0.1em] text-mid-forest">
            {seller.name}
          </div>
        ) : null}
        <div
          className={cn(
            "flex flex-wrap items-center gap-x-[7px] gap-y-[4px] font-mono text-[9px] uppercase tracking-[0.1em] text-sage-shadow",
            showSeller ? "mt-[8px]" : "mt-[6px]",
          )}
        >
          {showSeller && distanceMi != null ? (
            <>
              <span>{formatDistance(distanceMi)}</span>
              <span aria-hidden>·</span>
              <span>{seller.area}</span>
            </>
          ) : null}
          <DietChip listing={listing} />
        </div>
      </div>
    </article>
  );
}
