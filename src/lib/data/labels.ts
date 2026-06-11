import type {
  CategoryKey,
  DietTag,
  FulfillmentMode,
  OrderStatus,
  PriceTier,
  SellerArchetype,
} from "./types";

// Human-readable labels for the enum-ish domain values. One source of truth so
// the filter sheet, chips, and cards never hardcode their own copy.

export const categoryLabels: Record<CategoryKey, string> = {
  vegetables: "Vegetables",
  fruit: "Fruit",
  eggs: "Eggs & Dairy",
  baked: "Baked & Made",
  honey: "Honey & Preserves",
  "flowers-herbs": "Flowers & Herbs",
};

export const archetypeLabels: Record<SellerArchetype, string> = {
  backyard: "Backyard grower",
  suburban: "Suburban gardener",
  "small-farm": "Small farm",
  specialty: "Specialty maker",
};

export const fulfillmentLabels: Record<FulfillmentMode, string> = {
  pickup: "Pickup",
  meetup: "Meetup",
  bicycle: "Bicycle courier",
  motorcycle: "Motorcycle / car",
  drone: "Drone",
  zipline: "Zipline drop",
};

export const orderStatusLabels: Record<OrderStatus, string> = {
  awaiting: "Awaiting confirmation",
  confirmed: "Confirmed",
  completed: "Completed",
  canceled: "Canceled",
};

export const dietLabels: Record<DietTag, string> = {
  organic: "Organic",
  "pesticide-free": "Pesticide-free",
  vegan: "Vegan",
  "gluten-free": "Gluten-free",
  "pasture-raised": "Pasture-raised",
  raw: "Raw",
};

export const priceTierLabels: Record<PriceTier, string> = {
  budget: "Under $5",
  mid: "$5–10",
  premium: "$10+",
};

/** Stable display order for the filter sheet. */
export const categoryOrder: CategoryKey[] = [
  "vegetables",
  "fruit",
  "eggs",
  "baked",
  "honey",
  "flowers-herbs",
];
export const archetypeOrder: SellerArchetype[] = [
  "backyard",
  "suburban",
  "small-farm",
  "specialty",
];
export const fulfillmentOrder: FulfillmentMode[] = [
  "pickup",
  "meetup",
  "bicycle",
  "motorcycle",
  "drone",
  "zipline",
];
export const dietOrder: DietTag[] = [
  "organic",
  "pesticide-free",
  "vegan",
  "gluten-free",
  "pasture-raised",
  "raw",
];
export const priceTierOrder: PriceTier[] = ["budget", "mid", "premium"];

/** Distance radius presets for the filter sheet (miles). */
export const distancePresets: { label: string; value: number }[] = [
  { label: "1 mi", value: 1 },
  { label: "5 mi", value: 5 },
  { label: "10 mi", value: 10 },
  { label: "25 mi", value: 25 },
];
