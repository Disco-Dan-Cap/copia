import type { MapPin, Seller } from "./types";

/** Total sellers near the buyer (drives the section + map headings). */
export const nearbySellerCount = 12;

export const featuredSellers: Seller[] = [
  {
    id: "miras-half-acre",
    name: "Mira's Half-Acre",
    distance: "0.8 mi",
    area: "East Austin",
    blurb: "Heirloom tomatoes, basil, eggs from four hens.",
    newListings: 2,
    avatarGradient: ["#C46A4F", "#8B3A28"],
  },
  {
    id: "wimberley-hill-farm",
    name: "Wimberley Hill Farm",
    distance: "22 mi",
    area: "Hill Country",
    blurb: "Stone fruit, leafy greens, weekly CSA boxes.",
    avatarGradient: ["#74B5A1", "#1C664D"],
  },
  {
    id: "honey-and-the-comb",
    name: "The Honey & The Comb",
    distance: "3.4 mi",
    area: "South Lamar",
    blurb: "Wildflower honey, propolis, beeswax candles.",
    avatarGradient: ["#E8B871", "#9C6B1F"],
  },
];

// Seller clusters on the stylized discover map (+ the buyer's own location).
// Counts sum to `nearbySellerCount`.
export const sellerMapPins: MapPin[] = [
  { topPct: 47, leftPct: 50, you: true },
  { topPct: 28, leftPct: 22, count: 3 },
  { topPct: 36, leftPct: 68, count: 2 },
  { topPct: 62, leftPct: 38, count: 4 },
  { topPct: 70, leftPct: 76, count: 1 },
  { topPct: 20, leftPct: 88, count: 2 },
];
