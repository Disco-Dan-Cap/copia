import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sellerBySlug } from "@/lib/data/seller-bySlug";
import { inSeasonListings, listingsBySeller } from "@/lib/data/listings";
import { reviewStats, reviewsBySeller } from "@/lib/data/reviews";
import { SellerHero } from "@/components/sellers/seller-hero";
import { SellerStory } from "@/components/sellers/seller-story";
import { SeasonalStrip } from "@/components/sellers/seasonal-strip";
import { ListingsSection } from "@/components/sellers/listings-section";
import { ReviewsSection } from "@/components/sellers/reviews-section";

// Rendered per request so the "what's in season" strip is honest to the
// visitor's actual month — a recruiter opening this in August sees August.
export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const seller = sellerBySlug(slug);
  return { title: seller?.name ?? "Seller" };
}

export default async function SellerProfilePage({ params }: Params) {
  const { slug } = await params;
  const seller = sellerBySlug(slug);
  if (!seller) notFound();

  const month = new Date().getMonth() + 1;
  const allListings = listingsBySeller(seller.id);
  const seasonal = inSeasonListings(seller.id, month);
  const reviews = reviewsBySeller(seller.id);
  const stats = reviewStats(seller.id);

  return (
    <main className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
      <SellerHero seller={seller} />
      <SellerStory seller={seller} />
      <SeasonalStrip seller={seller} listings={seasonal} />
      <ListingsSection seller={seller} listings={allListings} />
      <ReviewsSection reviews={reviews} stats={stats} sellerName={seller.name} />
      <div className="h-[40px]" />
    </main>
  );
}
