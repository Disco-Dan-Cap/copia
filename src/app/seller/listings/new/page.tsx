import type { Metadata } from "next";
import type { Listing } from "@/lib/data/types";
import { sellerBySlug } from "@/lib/data/seller-bySlug";
import { sellersById } from "@/lib/data/sellers";
import { ListingEdit } from "@/components/seller/listings/listing-edit";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "New listing" };

const DEMO_SELLER = "miras-half-acre";

type SearchParams = { searchParams: Promise<{ as?: string }> };

export default async function NewListingPage({ searchParams }: SearchParams) {
  const { as } = await searchParams;
  const seller = (as ? sellerBySlug(as) : undefined) ?? sellersById[DEMO_SELLER];

  // Empty defaults (clarification E): gradient pre-seeded to sage + leaf-green so
  // the live hero isn't blank; everything else empty/active for the seller to fill.
  const empty: Listing = {
    id: "l-new",
    sellerId: seller.id,
    name: "",
    category: "vegetables",
    price: 0,
    unit: "",
    diet: [],
    gradient: ["#509982", "#74B5A1"],
    peakMonths: [],
    anchor: "",
    growingMethod: "",
    harvestCadence: "",
    pairsWith: [],
    status: "active",
  };

  return <ListingEdit mode="new" listing={empty} backAs={seller.id} />;
}
