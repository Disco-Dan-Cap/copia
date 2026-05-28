"use client";

import { useSyncExternalStore } from "react";
import type { Listing, Seller } from "@/lib/data/types";
import { ListingCard } from "@/components/cards/listing-card";
import { GridListToggle, type ListingsView } from "./grid-list-toggle";

const STORAGE_KEY = "copia.sellerListingsView";
const VIEW_EVENT = "copia:listings-view";

// localStorage-backed view preference via useSyncExternalStore: grid is the
// server snapshot, so first paint always matches (no hydration mismatch), and
// the client re-reads the saved value once subscribed — no setState-in-effect.
function subscribe(onChange: () => void): () => void {
  window.addEventListener("storage", onChange);
  window.addEventListener(VIEW_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(VIEW_EVENT, onChange);
  };
}

function useListingsView(): [ListingsView, (v: ListingsView) => void] {
  const view = useSyncExternalStore<ListingsView>(
    subscribe,
    () => (localStorage.getItem(STORAGE_KEY) === "list" ? "list" : "grid"),
    () => "grid",
  );
  const choose = (v: ListingsView) => {
    localStorage.setItem(STORAGE_KEY, v);
    window.dispatchEvent(new Event(VIEW_EVENT));
  };
  return [view, choose];
}

/**
 * Every listing a seller offers, with a grid/list density toggle whose choice
 * persists in localStorage. Grid is the default.
 */
export function ListingsSection({
  seller,
  listings,
}: {
  seller: Seller;
  listings: Listing[];
}) {
  const [view, choose] = useListingsView();

  return (
    <section className="pt-[32px]">
      <div className="flex items-center justify-between px-[24px] pb-[14px]">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-mid-forest">
          All listings · {listings.length}
        </span>
        <GridListToggle value={view} onChange={choose} />
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-2 gap-[12px] px-[24px]">
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              seller={seller}
              variant="grid"
              showSeller={false}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-[12px] px-[24px]">
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              seller={seller}
              variant="list"
              showSeller={false}
            />
          ))}
        </div>
      )}
    </section>
  );
}
