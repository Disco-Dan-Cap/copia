// Domain types for the buyer flow. Shaped to match the eventual Supabase
// schema so the move from these local seed modules to live queries is a
// data-layer swap, not a component rewrite.
//
// `gradient` fields are placeholders standing in for real product / seller
// photos (Supabase Storage URLs) — a [from, to] pair for a 135° linear fill.

export type Gradient = readonly [from: string, to: string];

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
  /** Display distance from the buyer, e.g. "0.8 mi". */
  distance: string;
  /** Austin area / neighborhood. */
  area: string;
  /** One-line description of what they grow / make. */
  blurb: string;
  /** Count of listings added recently; omit/0 if none. */
  newListings?: number;
  avatarGradient: Gradient;
}

export type CategoryKey = "vegetables" | "eggs" | "baked" | "honey";

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
