import type {
  CategoryKey,
  DietTag,
  FulfillmentMode,
  Listing,
  PriceTier,
  Seller,
  SellerArchetype,
} from "@/lib/data/types";
import { listings } from "@/lib/data/listings";
import { sellers, sellersById } from "@/lib/data/sellers";
import { buyerLocation } from "@/lib/data/location";
import { haversineMi } from "@/lib/geo";

// ─── Filter shape ─────────────────────────────────────────────────────────

export interface SearchFilters {
  /** Free-text query against listing name, seller name, area, category. */
  query: string;
  categories: CategoryKey[];
  priceTier: PriceTier | null;
  /** Radius in miles; null = any distance. */
  maxDistanceMi: number | null;
  fulfillment: FulfillmentMode[];
  diet: DietTag[];
  archetypes: SellerArchetype[];
  /** Restrict to a single seller — set when a map pin is tapped. */
  sellerId: string | null;
}

export const defaultFilters: SearchFilters = {
  query: "",
  categories: [],
  priceTier: null,
  maxDistanceMi: null,
  fulfillment: [],
  diet: [],
  archetypes: [],
  sellerId: null,
};

/** Count of facets active in the filter sheet (drives the "Filters" badge). */
export function activeFilterCount(f: SearchFilters): number {
  return (
    f.categories.length +
    f.fulfillment.length +
    f.diet.length +
    f.archetypes.length +
    (f.priceTier ? 1 : 0) +
    (f.maxDistanceMi != null ? 1 : 0)
  );
}

// ─── Result shape ─────────────────────────────────────────────────────────

export interface ListingResult {
  listing: Listing;
  seller: Seller;
  distanceMi: number;
}

export interface SellerResult {
  seller: Seller;
  distanceMi: number;
  /** How many of this seller's listings matched — labels the map pin. */
  matchCount: number;
}

export interface SearchResult {
  /** Flat, distance-sorted listings for the results list. */
  listings: ListingResult[];
  /** Distinct sellers among the matches — the map pins. Same query, two views. */
  sellers: SellerResult[];
}

// ─── Logic ──────────────────────────────────────────────────────────────────

function inTier(price: number, tier: PriceTier): boolean {
  if (tier === "budget") return price < 5;
  if (tier === "mid") return price >= 5 && price <= 10;
  return price > 10; // premium
}

/**
 * Pure, synchronous filter over the seed data. Semantics: categories /
 * archetypes / fulfillment match on ANY selected (OR); diet must match ALL
 * selected (AND, e.g. vegan + gluten-free). Distance is computed from real
 * coordinates against the buyer.
 */
export function filterListings(filters: SearchFilters): SearchResult {
  const q = filters.query.trim().toLowerCase();

  const distanceById = new Map<string, number>();
  for (const s of sellers) {
    distanceById.set(s.id, haversineMi(buyerLocation, s.location));
  }

  const matched: ListingResult[] = [];

  for (const listing of listings) {
    const seller = sellersById[listing.sellerId];
    if (!seller) continue;
    const distanceMi = distanceById.get(seller.id) ?? Infinity;

    if (filters.sellerId && seller.id !== filters.sellerId) continue;
    if (filters.categories.length && !filters.categories.includes(listing.category)) continue;
    if (filters.priceTier && !inTier(listing.price, filters.priceTier)) continue;
    if (filters.maxDistanceMi != null && distanceMi > filters.maxDistanceMi) continue;
    if (filters.archetypes.length && !filters.archetypes.includes(seller.archetype)) continue;
    if (
      filters.fulfillment.length &&
      !filters.fulfillment.some((m) => seller.fulfillment.includes(m))
    ) {
      continue;
    }
    if (filters.diet.length && !filters.diet.every((d) => listing.diet.includes(d))) continue;
    if (q) {
      const haystack =
        `${listing.name} ${seller.name} ${seller.area} ${listing.category}`.toLowerCase();
      if (!haystack.includes(q)) continue;
    }

    matched.push({ listing, seller, distanceMi });
  }

  matched.sort(
    (a, b) => a.distanceMi - b.distanceMi || a.listing.price - b.listing.price,
  );

  const sellerResults = new Map<string, SellerResult>();
  for (const r of matched) {
    const existing = sellerResults.get(r.seller.id);
    if (existing) existing.matchCount += 1;
    else
      sellerResults.set(r.seller.id, {
        seller: r.seller,
        distanceMi: r.distanceMi,
        matchCount: 1,
      });
  }

  return {
    listings: matched,
    sellers: [...sellerResults.values()].sort((a, b) => a.distanceMi - b.distanceMi),
  };
}

/**
 * The query seam the UI calls. Today it resolves the local filter; when
 * Supabase lands this becomes the network/RPC call and the components that
 * await it don't change.
 */
export async function searchListings(filters: SearchFilters): Promise<SearchResult> {
  return filterListings(filters);
}
