import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { listingById } from "@/lib/data/listings";
import { demandForListing } from "@/lib/data/searches";
import { ListingEdit } from "@/components/seller/listings/listing-edit";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }>; searchParams: Promise<{ as?: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const listing = listingById(id);
  return { title: listing ? `Edit · ${listing.name}` : "Listing" };
}

export default async function EditListingPage({ params, searchParams }: Params) {
  const { id } = await params;
  const { as } = await searchParams;
  const listing = listingById(id);
  if (!listing) notFound();

  // Identity carries through to the back link; fall back to this listing's own
  // seller so the link is always coherent.
  const backAs = as ?? listing.sellerId;
  const demand = demandForListing(id);

  return <ListingEdit mode="edit" listing={listing} demand={demand} backAs={backAs} />;
}
