import type { MapPin, Seller } from "./types";

// Twelve sellers spread across real Austin coordinates — close-in East Austin
// and Mueller, mid-range South Austin, and the Hill Country / outlying farms.
// Distance is never stored: it's computed from `location` against the buyer
// (see `lib/geo`), so every "0.8 mi" on screen is real haversine math.
export const sellers: Seller[] = [
  {
    id: "miras-half-acre",
    name: "Mira's Half-Acre",
    area: "East Austin",
    blurb: "Heirloom tomatoes, basil, eggs from four hens.",
    archetype: "suburban",
    location: { lng: -97.722, lat: 30.264 },
    fulfillment: ["pickup", "meetup", "bicycle"],
    diet: ["organic", "pesticide-free"],
    newListings: 2,
    rating: 4.9,
    avatarGradient: ["#C46A4F", "#8B3A28"],
  },
  {
    id: "honey-and-the-comb",
    name: "The Honey & The Comb",
    area: "South Lamar",
    blurb: "Wildflower honey, propolis, beeswax candles.",
    archetype: "specialty",
    location: { lng: -97.767, lat: 30.248 },
    fulfillment: ["pickup", "meetup", "bicycle", "motorcycle"],
    diet: ["raw"],
    rating: 4.8,
    avatarGradient: ["#E8B871", "#9C6B1F"],
  },
  {
    id: "wimberley-hill-farm",
    name: "Wimberley Hill Farm",
    area: "Hill Country",
    blurb: "Stone fruit, leafy greens, weekly CSA boxes.",
    archetype: "small-farm",
    location: { lng: -98.099, lat: 29.997 },
    fulfillment: ["pickup", "motorcycle", "drone"],
    diet: ["organic"],
    rating: 4.7,
    avatarGradient: ["#74B5A1", "#1C664D"],
  },
  {
    id: "cherrywood-backyard",
    name: "Cherrywood Backyard",
    area: "East Austin",
    blurb: "A few raised beds: herbs, cherry tomatoes, the odd dozen eggs.",
    archetype: "backyard",
    location: { lng: -97.708, lat: 30.286 },
    fulfillment: ["pickup", "meetup"],
    diet: ["pesticide-free"],
    newListings: 1,
    rating: 4.6,
    avatarGradient: ["#9CE5D0", "#509982"],
  },
  {
    id: "dripping-market-garden",
    name: "Dripping Springs Market Garden",
    area: "Dripping Springs",
    blurb: "Peppers, summer squash, and melons by the crate.",
    archetype: "small-farm",
    location: { lng: -98.087, lat: 30.19 },
    fulfillment: ["pickup", "motorcycle", "drone", "zipline"],
    diet: ["organic"],
    rating: 4.8,
    avatarGradient: ["#509982", "#1C664D"],
  },
  {
    id: "mueller-microgreens",
    name: "Mueller Microgreens",
    area: "Mueller",
    blurb: "Trays of microgreens and tender lettuces, cut to order.",
    archetype: "suburban",
    location: { lng: -97.705, lat: 30.298 },
    fulfillment: ["pickup", "bicycle", "meetup"],
    diet: ["organic", "vegan"],
    newListings: 3,
    rating: 4.9,
    avatarGradient: ["#9CE5D0", "#74B5A1"],
  },
  {
    id: "lockhart-orchard",
    name: "Lockhart Orchard Co.",
    area: "Lockhart",
    blurb: "Peaches and plums from forty-year-old trees.",
    archetype: "small-farm",
    location: { lng: -97.67, lat: 29.884 },
    fulfillment: ["pickup", "motorcycle", "drone"],
    diet: ["organic"],
    rating: 4.7,
    avatarGradient: ["#E8927C", "#C46A4F"],
  },
  {
    id: "hyde-park-hens",
    name: "Hyde Park Hens",
    area: "Hyde Park",
    blurb: "Pasture-raised eggs and whatever the garden gives.",
    archetype: "backyard",
    location: { lng: -97.729, lat: 30.305 },
    fulfillment: ["pickup", "meetup", "bicycle"],
    diet: ["pasture-raised"],
    rating: 4.8,
    avatarGradient: ["#74B5A1", "#30594A"],
  },
  {
    id: "buda-sourdough",
    name: "Buda Sourdough",
    area: "Buda",
    blurb: "Naturally-leavened loaves and focaccia, baked Fridays.",
    archetype: "specialty",
    location: { lng: -97.84, lat: 30.085 },
    fulfillment: ["pickup", "meetup", "motorcycle"],
    diet: ["vegan"],
    newListings: 1,
    rating: 4.9,
    avatarGradient: ["#D8A86A", "#9C6B1F"],
  },
  {
    id: "bastrop-berry-patch",
    name: "Bastrop Berry Patch",
    area: "Bastrop",
    blurb: "Blackberries, dewberries, and small-batch jam.",
    archetype: "small-farm",
    location: { lng: -97.315, lat: 30.11 },
    fulfillment: ["pickup", "motorcycle", "drone"],
    diet: ["organic", "pesticide-free"],
    rating: 4.6,
    avatarGradient: ["#C46A4F", "#6B2235"],
  },
  {
    id: "round-rock-roots",
    name: "Round Rock Roots",
    area: "Round Rock",
    blurb: "Carrots, beets, and alliums — the unglamorous good stuff.",
    archetype: "suburban",
    location: { lng: -97.679, lat: 30.508 },
    fulfillment: ["pickup", "motorcycle", "meetup"],
    diet: ["organic"],
    rating: 4.5,
    avatarGradient: ["#B5874F", "#6B4A1F"],
  },
  {
    id: "soco-preserves",
    name: "South Congress Salsa & Preserves",
    area: "South Congress",
    blurb: "Salsa, pickles, and preserves in small batches.",
    archetype: "specialty",
    location: { lng: -97.751, lat: 30.248 },
    fulfillment: ["pickup", "meetup", "bicycle", "motorcycle"],
    diet: ["vegan", "gluten-free"],
    newListings: 2,
    rating: 4.7,
    avatarGradient: ["#D2674A", "#9C3F2A"],
  },
];

/** Fast id → seller lookup for joining listings to their seller. */
export const sellersById: Record<string, Seller> = Object.fromEntries(
  sellers.map((s) => [s.id, s]),
);

/** Total sellers near the buyer (drives the section + map headings). */
export const nearbySellerCount = sellers.length;

/** Curated trio for the Home "Sellers near you" rail. */
export const featuredSellers: Seller[] = [
  "miras-half-acre",
  "wimberley-hill-farm",
  "honey-and-the-comb",
].map((id) => sellersById[id]);

// Seller clusters on the stylized Home discover map (+ the buyer's own
// location). Abstract top/left percentages — the live, coordinate-driven map
// lives on the Search screen.
export const sellerMapPins: MapPin[] = [
  { topPct: 47, leftPct: 50, you: true },
  { topPct: 28, leftPct: 22, count: 3 },
  { topPct: 36, leftPct: 68, count: 2 },
  { topPct: 62, leftPct: 38, count: 4 },
  { topPct: 70, leftPct: 76, count: 1 },
  { topPct: 20, leftPct: 88, count: 2 },
];
