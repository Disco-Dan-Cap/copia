"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { buyerLocation } from "@/lib/data/location";
import {
  activeFilterCount,
  defaultFilters,
  searchListings,
  type SearchFilters,
  type SearchResult,
} from "@/lib/search/query";
import { LeafWave } from "@/components/ui/leaf-wave";
import { SearchHeader } from "./search-header";
import { FilterChips } from "./filter-chips";
import { ResultsList } from "./results-list";
import { SellerCarousel } from "./seller-carousel";
import { ViewToggle } from "./view-toggle";
import { FilterSheet } from "./filter-sheet";

// mapbox-gl touches `window` and is heavy — load it client-only and keep it out
// of the initial bundle. A cream panel holds the space while it loads.
const CopiaMap = dynamic(() => import("@/components/map/copia-map").then((m) => m.CopiaMap), {
  ssr: false,
  loading: () => (
    <div className="relative h-full w-full overflow-hidden bg-cream-warm">
      <LeafWave
        density="sparse"
        opacity={0.5}
        className="absolute inset-0 h-full w-full text-sage opacity-30"
      />
    </div>
  ),
});

export function SearchScreen() {
  const params = useSearchParams();
  const [view, setView] = useState<"list" | "map">(
    params.get("view") === "map" ? "map" : "list",
  );
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedSellerId, setSelectedSellerId] = useState<string | null>(null);

  // The query seam. Today it resolves local data; Supabase later swaps in here
  // and nothing below changes.
  useEffect(() => {
    let cancelled = false;
    searchListings(filters).then((r) => {
      if (!cancelled) setResult(r);
    });
    return () => {
      cancelled = true;
    };
  }, [filters]);

  // Derive the live selection rather than clearing it in an effect: when the
  // result set shifts and the chosen seller drops out, selection falls to null
  // on its own — no cascading setState.
  const activeSelection =
    result && result.sellers.some((s) => s.seller.id === selectedSellerId)
      ? selectedSellerId
      : null;

  const clearFilters = () => setFilters((f) => ({ ...defaultFilters, query: f.query }));

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <SearchHeader
        query={filters.query}
        onQuery={(q) => setFilters((f) => ({ ...f, query: q }))}
        filterCount={activeFilterCount(filters)}
        onOpenFilters={() => setSheetOpen(true)}
      />
      <FilterChips filters={filters} setFilters={setFilters} />

      <div className="relative min-h-0 flex-1">
        {view === "list" ? (
          <ResultsList result={result} onClearFilters={clearFilters} />
        ) : (
          <>
            <CopiaMap
              className="h-full w-full"
              sellers={result?.sellers ?? []}
              buyer={buyerLocation}
              selectedSellerId={activeSelection}
              onSelectSeller={setSelectedSellerId}
            />
            <SellerCarousel
              sellers={result?.sellers ?? []}
              selectedSellerId={activeSelection}
            />
          </>
        )}

        <ViewToggle view={view} onToggle={() => setView((v) => (v === "list" ? "map" : "list"))} />
      </div>

      <FilterSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        filters={filters}
        setFilters={setFilters}
        resultCount={result?.listings.length ?? 0}
      />
    </div>
  );
}
