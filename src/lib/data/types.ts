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
  /** The real listing this Home "ripening" card opens. All four genuinely peak in May. */
  listingId: string;
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
  avatarGradient: Gradient;
  // ── Profile fields (Day 4) ──────────────────────────────────────────────
  /**
   * The vignette that introduces the seller on their profile — 2–3 sentences
   * in the brand voice. Carries `<em>` for the single Fraunces-italic accent.
   */
  story: string;
  /** Year the operation started — the "SINCE" in the facts row. */
  since: number;
  /** Curated one-liner for the facts row, e.g. "No pesticides". Uppercased on render. */
  philosophy: string;
  /**
   * Who you address when you reach out — drives the "Ask {contactName}" CTA.
   * A first name where the brand is a person ("Mira"), a warm role noun where
   * it's a place ("the baker", "the beekeeper").
   */
  contactName: string;
  // Note: rating is no longer stored — it's computed from `reviews` via
  // `reviewStats()` so the star average reflects real seeded reviews.
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
  /**
   * Months (1–12) this item is at peak in Austin's zone 8b/9a — real growing
   * knowledge, not category guesses (basil isn't in season in January). Drives
   * the "Ready at {seller} now" strip. Preserved foods (jam, bread, pickles)
   * and year-round laying are [1..12]; an empty array means it never surfaces
   * as "in season".
   */
  peakMonths: number[];
  // ── Product-detail fields (Day 5) ────────────────────────────────────────
  /**
   * The single editorial moment — one sentence in the seller voice that names a
   * constraint, a sensory specific, or a memorable beat. Carries one `<em>` for
   * the Fraunces-italic accent. The product page tells facts; this is its only
   * prose. (The seller page tells the stories.)
   */
  anchor: string;
  /** How it's grown / made, e.g. "Open-pollinated, no spray". Structured fact. */
  growingMethod: string;
  /** When it's picked / baked / collected, e.g. "Cut to order". Structured fact. */
  harvestCadence: string;
  /** A short list of what it pairs with — rendered as hairline Söhne chips. */
  pairsWith: string[];
}

/**
 * A buyer review on a seller profile. The star average is computed from these
 * (see `reviewStats`) rather than stored on the seller.
 */
export interface Review {
  id: string;
  sellerId: string;
  /** Display name, e.g. "Dana R." */
  author: string;
  /** Reviewer's Austin neighborhood, for the mono-caps eyebrow. */
  neighborhood: string;
  /** ISO date, e.g. "2026-05-17". */
  date: string;
  body: string;
  /** Whole stars, 1–5. */
  rating: number;
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
