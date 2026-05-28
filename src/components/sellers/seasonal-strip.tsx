import Link from "next/link";
import type { Listing, Seller } from "@/lib/data/types";
import { possessive } from "@/lib/data/seller-bySlug";
import { ListingCard } from "@/components/cards/listing-card";

/**
 * The "what's in season" strip. The page passes only the listings at peak this
 * month, so the data is honest — a seller with one thing ready shows one card,
 * and a seller with nothing ready isn't rendered at all (the page omits it).
 */
export function SeasonalStrip({
  seller,
  listings,
}: {
  seller: Seller;
  listings: Listing[];
}) {
  if (listings.length === 0) return null;

  return (
    <section className="pt-[28px]">
      <div className="px-[24px] pb-[12px]">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-mid-forest">
          Ready at {possessive(seller.name)} now
        </span>
      </div>
      <div className="scroll-x-momentum flex gap-[12px] overflow-x-auto px-[24px] pb-[4px]">
        {listings.map((listing) => (
          <Link
            key={listing.id}
            href={`/listings/${listing.id}`}
            className="block w-[150px] shrink-0 rounded-[14px] transition-transform active:scale-[0.98]"
          >
            <ListingCard listing={listing} seller={seller} variant="grid" showSeller={false} />
          </Link>
        ))}
      </div>
    </section>
  );
}
