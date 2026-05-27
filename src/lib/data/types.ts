// Domain types for the buyer flow. Shaped to match the eventual Supabase
// schema so the move from these local seed modules to live queries is a
// data-layer swap, not a component rewrite.
//
// `gradient` fields are placeholders standing in for real product / seller
// photos (Supabase Storage URLs) — a [from, to] pair for a 135° linear fill.

export type Gradient = readonly [from: string, to: string];

/** A geographic point. `lng, lat` order matches GeoJSON / Mapbox convention. */
export interface LngLat {
  lng: number;
  lat: number;
}

// ─── Enumerations (will become Postgres enums / lookup tables) ──────────────

/** The four seller archetypes from the brief §6 seller spectrum. */
export type SellerArchetype = "backyard" | "suburban" | "small-farm" | "specialty";

/** Fulfillment lanes a seller offers. All delivery modes are UI-only stubs. */
export type FulfillmentMode =
  | "pickup"
  | "meetup"
  | "bicycle"
  | "motorcycle"
  | "drone"
  | "zipline";

/** Diet / lifestyle markers used for filtering. */
export type DietTag =
  | "organic"
  | "pesticide-free"
  | "vegan"
  | "gluten-free"
  | "pasture-raised"
  | "raw";

export type CategoryKey = "vegetables" | "eggs" | "baked" | "honey";

/** Coarse price buckets for the filter sheet. */
export type PriceTier = "budget" | "mid" | "premium";

// ─── Entities ───────────────────────────────────────────────────────────────

export interface SeasonalItem {
  id: string;
  name: string;
  /** Neighborhood / town the item comes from. */
  where: string;
  /** Display price, e.g. "$4 / lb". */
  price: string;
  gradient: Gradient;
}

export interface Seller {
  id: string;
  name: string;
  /** Austin area / neighborhood. */
  area: string;
  /** One-line description of what they grow / make. */
  blurb: string;
  archetype: SellerArchetype;
  /** Real coordinates — drives the live map and computed distance. */
  location: LngLat;
  /** Fulfillment lanes this seller offers. */
  fulfillment: FulfillmentMode[];
  /** Seller-level lifestyle markers (e.g. a certified-organic farm). */
  diet: DietTag[];
  /** Count of listings added recently; omit/0 if none. */
  newListings?: number;
  /** 0–5, one decimal. Optional. */
  rating?: number;
  avatarGradient: Gradient;
}

export interface Listing {
  id: string;
  sellerId: string;
  name: string;
  category: CategoryKey;
  /** Numeric USD price; format for display via `priceLabel`. */
  price: number;
  /** Unit the price is per, e.g. "lb", "bunch", "dozen", "pt", "jar". */
  unit: string;
  diet: DietTag[];
  gradient: Gradient;
  /** Recently listed — drives "new" markers. */
  isNew?: boolean;
}

export interface Category {
  id: string;
  label: string;
  count: number;
  icon: CategoryKey;
}

export interface MapPin {
  topPct: number;
  leftPct: number;
  /** Number of sellers in this cluster. Omit for the buyer's own location. */
  count?: number;
  /** Marks the buyer's current position. */
  you?: boolean;
}
