import type { Listing } from "@/lib/data/types";
import { priceLabel, listingStatus } from "@/lib/data/listings";
import { cn } from "@/lib/utils";
import { PhotoFill } from "@/components/media/photo-fill";

const STATUS_LABEL: Record<NonNullable<Listing["status"]>, string> = {
  active: "Active",
  "sold-out": "Sold out",
  paused: "Paused",
};

/**
 * Dense seller-management listing card (the hero's listings strip): thumbnail,
 * name, an availability/price meta-row, and a status dot — terracotta when sold
 * out or paused, forest when active.
 */
export function SellerListingCard({ listing, month }: { listing: Listing; month: number }) {
  const status = listingStatus(listing);
  const flagged = status !== "active";
  const inSeason = listing.peakMonths.includes(month);

  return (
    <div className="rounded-[10px] border border-sage-shadow/25 bg-cream-warm p-[14px]">
      <div
        className="relative mb-[12px] h-[80px] w-full overflow-hidden rounded-[6px]"
        style={{ backgroundImage: `linear-gradient(135deg, ${listing.gradient[0]} 0%, ${listing.gradient[1]} 100%)` }}
      >
        <PhotoFill src={listing.photo} alt={listing.name} />
      </div>
      <div className="text-[13px] font-semibold tracking-[-0.01em] text-deepest-forest">
        {listing.name}
      </div>
      <div className="mt-[6px] flex justify-between gap-[8px] font-mono text-[9.5px] uppercase tracking-[0.1em] text-mid-forest">
        <span>{inSeason ? "In season" : "Out of season"}</span>
        <span className="text-forest">{priceLabel(listing)}</span>
      </div>
      <div
        className={cn(
          "mt-[8px] flex items-center gap-[5px] font-mono text-[9.5px] uppercase tracking-[0.1em]",
          flagged ? "text-terracotta" : "text-mid-forest",
        )}
      >
        <span className={cn("h-[5px] w-[5px] rounded-full", flagged ? "bg-terracotta" : "bg-forest")} />
        {STATUS_LABEL[status]}
      </div>
    </div>
  );
}
