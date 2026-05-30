"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { listingById } from "@/lib/data/listings";
import { demandForListing } from "@/lib/data/searches";
import { ListingEdit } from "@/components/seller/listings/listing-edit";
import {
  isCreatedListing,
  resolveListing,
  useBoardOverrides,
} from "@/components/seller/listings/store";

// Client route so session-created listings (which live only in the in-memory
// store, not the seed) are fully editable, indistinguishable from seed
// listings. Resolution is store-first with a seed fallback; the no-backend
// honesty holds because a hard reload wipes the store, at which point a
// created-listing URL correctly resolves to "gone". useSearchParams sits behind
// Suspense so the static build doesn't de-opt.

function EditListingRoute() {
  const { id } = useParams<{ id: string }>();
  const as = useSearchParams().get("as") ?? undefined;
  const overrides = useBoardOverrides();

  const listing = resolveListing(id, listingById(id), overrides);
  const backHref = `/seller/listings${as ? `?as=${as}` : ""}`;

  if (!listing) {
    return (
      <div className="flex min-h-[40vh] flex-col items-start justify-center gap-[12px] px-[24px] lg:px-[44px]">
        <p className="font-emphasis text-[22px] italic leading-[1.3] text-forest">
          That listing isn&rsquo;t here anymore.
        </p>
        <Link
          href={backHref}
          className="inline-flex items-center gap-[6px] border-b border-forest pb-[1px] font-mono text-[10px] uppercase tracking-[0.14em] text-forest transition-opacity active:opacity-60"
        >
          <span aria-hidden>←</span> All listings
        </Link>
      </div>
    );
  }

  return (
    <ListingEdit
      mode="edit"
      listing={listing}
      demand={demandForListing(id)}
      backAs={as ?? listing.sellerId}
      isCreated={isCreatedListing(id, overrides)}
    />
  );
}

export default function EditListingPage() {
  return (
    <Suspense fallback={null}>
      <EditListingRoute />
    </Suspense>
  );
}
