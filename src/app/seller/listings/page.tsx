import type { Metadata } from "next";
import { sellerBySlug } from "@/lib/data/seller-bySlug";
import { sellersById } from "@/lib/data/sellers";
import { listingsBySeller } from "@/lib/data/listings";
import { ListingsBoard } from "@/components/seller/listings/listings-board";

// Per-request so the in-season signal tracks the visitor's real month and the
// demo identity (?as=) carries through, like the rest of the seller flow.
export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Listings" };

const DEMO_SELLER = "miras-half-acre";

type SearchParams = { searchParams: Promise<{ as?: string }> };

export default async function ListingsPage({ searchParams }: SearchParams) {
  const { as } = await searchParams;
  const seller = (as ? sellerBySlug(as) : undefined) ?? sellersById[DEMO_SELLER];
  const seedListings = listingsBySeller(seller.id);
  const month = new Date().getMonth() + 1;

  return (
    <div className="flex flex-col gap-[24px] px-[24px] pb-[40px] pt-[16px] lg:px-[44px] lg:pt-[28px]">
      <header className="max-w-[620px]">
        <p className="eyebrow mb-[12px]">Listings</p>
        <h1 className="text-[30px] font-bold leading-[1.05] tracking-[-0.03em] text-deepest-forest [&_em]:font-emphasis [&_em]:font-normal [&_em]:italic [&_em]:text-forest lg:text-[38px]">
          Everything you&rsquo;re <em>growing</em>.
        </h1>
        <p className="mt-[12px] text-[15px] leading-[1.5] text-charcoal lg:text-[16px]">
          Tap any listing to edit it in place — the card you see is the card buyers get. Pause,
          relist, or take one down right here.
        </p>
      </header>

      <ListingsBoard sellerId={seller.id} seedListings={seedListings} month={month} />
    </div>
  );
}
