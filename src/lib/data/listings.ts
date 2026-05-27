import type { Listing } from "./types";

/** Display price for a listing, e.g. "$5 / lb". */
export function priceLabel(listing: Pick<Listing, "price" | "unit">): string {
  return `$${listing.price} / ${listing.unit}`;
}

// ~35 listings across the twelve sellers. Each carries a numeric price (so the
// price filter and any future smart-search math are real) plus a unit for
// display. `gradient` stands in for a Supabase Storage product photo.
export const listings: Listing[] = [
  // Mira's Half-Acre — East Austin (suburban)
  { id: "l-miras-tomatoes", sellerId: "miras-half-acre", name: "Heirloom tomatoes", category: "vegetables", price: 5, unit: "lb", diet: ["organic", "pesticide-free"], gradient: ["#C46A4F", "#8B3A28"], isNew: true },
  { id: "l-miras-basil", sellerId: "miras-half-acre", name: "Sweet basil", category: "vegetables", price: 3, unit: "bunch", diet: ["organic", "pesticide-free"], gradient: ["#74B5A1", "#1C664D"] },
  { id: "l-miras-eggs", sellerId: "miras-half-acre", name: "Backyard eggs", category: "eggs", price: 6, unit: "dozen", diet: ["pasture-raised"], gradient: ["#E8D9A8", "#C9952E"], isNew: true },

  // The Honey & The Comb — South Lamar (specialty)
  { id: "l-honey-wildflower", sellerId: "honey-and-the-comb", name: "Wildflower honey", category: "honey", price: 12, unit: "jar", diet: ["raw"], gradient: ["#E8B871", "#9C6B1F"] },
  { id: "l-honey-comb", sellerId: "honey-and-the-comb", name: "Cut comb honey", category: "honey", price: 16, unit: "jar", diet: ["raw"], gradient: ["#E8C36A", "#C49A3F"] },
  { id: "l-honey-propolis", sellerId: "honey-and-the-comb", name: "Propolis tincture", category: "honey", price: 14, unit: "bottle", diet: ["raw"], gradient: ["#D8A86A", "#9C6B1F"] },

  // Wimberley Hill Farm — Hill Country (small-farm)
  { id: "l-wim-peaches", sellerId: "wimberley-hill-farm", name: "Hill Country peaches", category: "vegetables", price: 4, unit: "lb", diet: ["organic"], gradient: ["#E8927C", "#C46A4F"], isNew: true },
  { id: "l-wim-chard", sellerId: "wimberley-hill-farm", name: "Rainbow chard", category: "vegetables", price: 4, unit: "bunch", diet: ["organic"], gradient: ["#74B5A1", "#30594A"] },
  { id: "l-wim-csa", sellerId: "wimberley-hill-farm", name: "Weekly CSA box", category: "vegetables", price: 35, unit: "box", diet: ["organic"], gradient: ["#509982", "#1C664D"] },

  // Cherrywood Backyard — East Austin (backyard)
  { id: "l-cherry-tomatoes", sellerId: "cherrywood-backyard", name: "Cherry tomatoes", category: "vegetables", price: 5, unit: "pt", diet: ["pesticide-free"], gradient: ["#C46A4F", "#8B3A28"] },
  { id: "l-cherry-herbs", sellerId: "cherrywood-backyard", name: "Mixed cutting herbs", category: "vegetables", price: 3, unit: "bunch", diet: ["pesticide-free"], gradient: ["#74B5A1", "#1C664D"] },

  // Dripping Springs Market Garden — Dripping Springs (small-farm)
  { id: "l-drip-shishito", sellerId: "dripping-market-garden", name: "Shishito peppers", category: "vegetables", price: 4, unit: "pt", diet: ["organic"], gradient: ["#509982", "#1C664D"] },
  { id: "l-drip-squash", sellerId: "dripping-market-garden", name: "Summer squash", category: "vegetables", price: 3, unit: "lb", diet: ["organic"], gradient: ["#E8C36A", "#C49A3F"] },
  { id: "l-drip-melon", sellerId: "dripping-market-garden", name: "Cantaloupe", category: "vegetables", price: 5, unit: "each", diet: ["organic"], gradient: ["#E8C36A", "#C49A3F"], isNew: true },

  // Mueller Microgreens — Mueller (suburban)
  { id: "l-mueller-pea", sellerId: "mueller-microgreens", name: "Pea microgreens", category: "vegetables", price: 6, unit: "tray", diet: ["organic", "vegan"], gradient: ["#9CE5D0", "#509982"] },
  { id: "l-mueller-lettuce", sellerId: "mueller-microgreens", name: "Butter lettuce", category: "vegetables", price: 3, unit: "head", diet: ["organic", "vegan"], gradient: ["#9CE5D0", "#74B5A1"] },
  { id: "l-mueller-sunflower", sellerId: "mueller-microgreens", name: "Sunflower shoots", category: "vegetables", price: 6, unit: "tray", diet: ["organic", "vegan"], gradient: ["#74B5A1", "#30594A"], isNew: true },

  // Lockhart Orchard Co. — Lockhart (small-farm)
  { id: "l-lock-peaches", sellerId: "lockhart-orchard", name: "Freestone peaches", category: "vegetables", price: 4, unit: "lb", diet: ["organic"], gradient: ["#E8927C", "#C46A4F"], isNew: true },
  { id: "l-lock-plums", sellerId: "lockhart-orchard", name: "Methley plums", category: "vegetables", price: 5, unit: "lb", diet: ["organic"], gradient: ["#8B5A4A", "#5A2D24"] },

  // Hyde Park Hens — Hyde Park (backyard)
  { id: "l-hyde-eggs", sellerId: "hyde-park-hens", name: "Pasture-raised eggs", category: "eggs", price: 7, unit: "dozen", diet: ["pasture-raised"], gradient: ["#E8D9A8", "#C9952E"] },
  { id: "l-hyde-duck", sellerId: "hyde-park-hens", name: "Duck eggs", category: "eggs", price: 9, unit: "half-dozen", diet: ["pasture-raised"], gradient: ["#E8C36A", "#C49A3F"] },

  // Buda Sourdough — Buda (specialty)
  { id: "l-buda-country", sellerId: "buda-sourdough", name: "Country sourdough", category: "baked", price: 8, unit: "loaf", diet: ["vegan"], gradient: ["#D8A86A", "#9C6B1F"], isNew: true },
  { id: "l-buda-focaccia", sellerId: "buda-sourdough", name: "Rosemary focaccia", category: "baked", price: 7, unit: "loaf", diet: ["vegan"], gradient: ["#E8C36A", "#C49A3F"] },
  { id: "l-buda-rye", sellerId: "buda-sourdough", name: "Seeded rye", category: "baked", price: 9, unit: "loaf", diet: ["vegan"], gradient: ["#B5874F", "#6B4A1F"] },

  // Bastrop Berry Patch — Bastrop (small-farm)
  { id: "l-bastrop-blackberry", sellerId: "bastrop-berry-patch", name: "Blackberries", category: "vegetables", price: 6, unit: "pt", diet: ["organic", "pesticide-free"], gradient: ["#9C3F4A", "#5E2630"] },
  { id: "l-bastrop-jam", sellerId: "bastrop-berry-patch", name: "Dewberry jam", category: "honey", price: 9, unit: "jar", diet: ["organic"], gradient: ["#9C3F4A", "#5E2630"], isNew: true },

  // Round Rock Roots — Round Rock (suburban)
  { id: "l-rr-carrots", sellerId: "round-rock-roots", name: "Rainbow carrots", category: "vegetables", price: 3, unit: "bunch", diet: ["organic"], gradient: ["#B5874F", "#6B4A1F"] },
  { id: "l-rr-beets", sellerId: "round-rock-roots", name: "Golden beets", category: "vegetables", price: 4, unit: "lb", diet: ["organic"], gradient: ["#E8C36A", "#C49A3F"] },
  { id: "l-rr-onions", sellerId: "round-rock-roots", name: "Spring onions", category: "vegetables", price: 2, unit: "bunch", diet: ["organic"], gradient: ["#74B5A1", "#1C664D"] },

  // South Congress Salsa & Preserves — South Congress (specialty)
  { id: "l-soco-salsa", sellerId: "soco-preserves", name: "Roasted salsa", category: "baked", price: 8, unit: "jar", diet: ["vegan", "gluten-free"], gradient: ["#D2674A", "#9C3F2A"], isNew: true },
  { id: "l-soco-pickles", sellerId: "soco-preserves", name: "Dill pickles", category: "baked", price: 7, unit: "jar", diet: ["vegan", "gluten-free"], gradient: ["#509982", "#1C664D"] },
  { id: "l-soco-figs", sellerId: "soco-preserves", name: "Fig preserves", category: "honey", price: 10, unit: "jar", diet: ["vegan", "gluten-free"], gradient: ["#8B5A4A", "#5A2D24"] },
];
