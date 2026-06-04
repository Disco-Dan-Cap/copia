import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { listingById } from "@/lib/data/listings";
import { sellersById } from "@/lib/data/sellers";
import { ProductHero } from "@/components/products/product-hero";
import { ProductTitle } from "@/components/products/product-title";
import { ProductAnchor } from "@/components/products/product-anchor";
import { ProductFacts } from "@/components/products/product-facts";
import { GrowerBlock } from "@/components/products/grower-block";
import { AddToBasketBar } from "@/components/products/add-to-basket-bar";

// Rendered per request so the in-season signal / peak window stay honest to the
// visitor's actual month (same as the seller profile).
export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const listing = listingById(id);
  return { title: listing?.name ?? "Listing" };
}

export default async function ProductPage({ params }: Params) {
  const { id } = await params;
  const listing = listingById(id);
  if (!listing) notFound();

  const seller = sellersById[listing.sellerId];
  if (!seller) notFound();

  const month = new Date().getMonth() + 1;
  const inSeason = listing.peakMonths.includes(month);

  return (
    <>
      <main className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <ProductHero listing={listing} />
        <ProductTitle listing={listing} inSeason={inSeason} />
        <ProductAnchor listing={listing} />
        <ProductFacts listing={listing} />
        <GrowerBlock seller={seller} />
        <div className="h-[28px]" />
      </main>
      <AddToBasketBar listing={listing} />
    </>
  );
}
