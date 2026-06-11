import type { Listing } from "./types";

/** Display price for a listing, e.g. "$5 / lb". */
export function priceLabel(listing: Pick<Listing, "price" | "unit">): string {
  return `$${listing.price} / ${listing.unit}`;
}

/** Laying hens, honey, and preserved goods don't have a season — they're always on. */
const YEAR_ROUND = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

// 32 listings across the twelve sellers. Each carries a numeric price (so the
// price filter and any future smart-search math are real) plus a unit for
// display. `gradient` stands in for a Supabase Storage product photo.
// `peakMonths` is real Austin (zone 8b/9a) growing knowledge — it drives the
// "Ready at {seller} now" strip and the product peak window.
//
// `anchor` is the one editorial sentence per product (one Fraunces <em> accent);
// growingMethod / harvestCadence / pairsWith are the structured facts.
export const listings: Listing[] = [
  // Mira's Half-Acre — East Austin (suburban)
  {
    id: "l-miras-tomatoes", sellerId: "miras-half-acre", name: "Heirloom tomatoes", category: "vegetables", price: 5, unit: "lb",
    diet: ["organic", "pesticide-free"], gradient: ["#C46A4F", "#8B3A28"], isNew: true, peakMonths: [6, 7, 8, 9],
    anchor: "Picked dead ripe, which is why they bruise if you look at them wrong — eat them <em>the day you get them</em>.",
    growingMethod: "Open-pollinated, no spray", harvestCadence: "Picked at dawn, sold the same day",
    pairsWith: ["Fresh mozzarella", "Basil", "Flaky salt"],
  },
  {
    id: "l-miras-basil", sellerId: "miras-half-acre", name: "Sweet basil", category: "flowers-herbs", price: 3, unit: "bunch",
    diet: ["organic", "pesticide-free"], gradient: ["#74B5A1", "#1C664D"], peakMonths: [5, 6, 7, 8, 9],
    anchor: "Cut in the cool of the morning so it doesn't wilt by noon — <em>smell it before you take it home</em>.",
    growingMethod: "Open-pollinated, no spray", harvestCadence: "Cut to order",
    pairsWith: ["Tomatoes", "Pine nuts", "Parmesan"],
  },
  {
    id: "l-miras-eggs", sellerId: "miras-half-acre", name: "Backyard eggs", category: "eggs", price: 6, unit: "dozen",
    diet: ["pasture-raised"], gradient: ["#E8D9A8", "#C9952E"], isNew: true, peakMonths: YEAR_ROUND,
    anchor: "Four hens, so some weeks the dozen takes a day to fill — <em>worth the wait for those yolks</em>.",
    growingMethod: "Pasture-raised, soy-free feed", harvestCadence: "Collected daily",
    pairsWith: ["Good butter", "Chives", "Cracked pepper"],
  },
  {
    id: "l-miras-cherry", sellerId: "miras-half-acre", name: "Cherry tomatoes", category: "vegetables", price: 5, unit: "pt",
    diet: ["pesticide-free"], gradient: ["#C46A4F", "#8B3A28"], peakMonths: [5, 6, 7, 8, 9],
    anchor: "The deer leave the cherries alone — too much reaching for too little — so these are the one tomato Mira doesn't fence, <em>and the first ripe every year</em>.",
    growingMethod: "Open-pollinated, no spray", harvestCadence: "Picked as they color",
    pairsWith: ["Snacking", "Blistered", "Salads"],
  },
  {
    id: "l-miras-lettuce", sellerId: "miras-half-acre", name: "Butter lettuce", category: "vegetables", price: 4, unit: "head",
    diet: ["pesticide-free"], gradient: ["#9CE5D0", "#509982"], peakMonths: [3, 4, 5, 10, 11], status: "sold-out",
    anchor: "Fast in the cool of the raised beds and gone the second it turns hot — <em>spring and fall only</em>, then it bolts.",
    growingMethod: "No spray, cut whole", harvestCadence: "Cut cool seasons",
    pairsWith: ["Soft herbs", "A light vinaigrette"],
  },
  {
    id: "l-miras-peas", sellerId: "miras-half-acre", name: "Sugar snap peas", category: "vegetables", price: 4, unit: "lb",
    diet: ["pesticide-free"], gradient: ["#74B5A1", "#1C664D"], peakMonths: [3, 4, 5],
    anchor: "Trellised up the back fence where the deer can't be bothered to look, sweet enough to <em>eat standing in the bed</em>.",
    growingMethod: "No spray", harvestCadence: "Picked every other morning",
    pairsWith: ["Raw", "Stir-fry", "Crudité"],
  },
  {
    id: "l-miras-squash", sellerId: "miras-half-acre", name: "Summer squash", category: "vegetables", price: 3, unit: "lb",
    diet: ["organic", "pesticide-free"], gradient: ["#E8C36A", "#C49A3F"], peakMonths: [5, 6, 7, 8],
    anchor: "Two plants is plenty — a thing every gardener learns <em>exactly once</em> — so it's picked small and sold the same day.",
    growingMethod: "Open-pollinated, no spray", harvestCadence: "Picked small, daily",
    pairsWith: ["Grilled", "Ribboned", "Skillet"],
  },
  {
    id: "l-miras-zinnias", sellerId: "miras-half-acre", name: "Cut zinnias", category: "flowers-herbs", price: 8, unit: "bunch",
    diet: ["pesticide-free"], gradient: ["#E8927C", "#C46A4F"], peakMonths: [5, 6, 7, 8, 9, 10],
    anchor: "Planted along the tomato row to pull the bees in, then earned a row of their own — <em>cut them and they only make more</em>.",
    growingMethod: "No spray, cut at dawn", harvestCadence: "Cut to order",
    pairsWith: ["A jar on the table", "The porch"],
  },
  {
    id: "l-miras-jalapenos", sellerId: "miras-half-acre", name: "Jalapeños", category: "vegetables", price: 4, unit: "pt",
    diet: ["pesticide-free"], gradient: ["#509982", "#1C664D"], peakMonths: [6, 7, 8, 9, 10], status: "paused",
    anchor: "Paused until the nights stop cooling off, because a pepper won't bother getting hot <em>until summer means it</em>.",
    growingMethod: "No spray", harvestCadence: "Picked green or red",
    pairsWith: ["Salsa", "Pickled", "Cornbread"],
  },

  // The Honey & The Comb — South Lamar (specialty)
  {
    id: "l-honey-wildflower", sellerId: "honey-and-the-comb", name: "Wildflower honey", category: "honey", price: 12, unit: "jar",
    diet: ["raw"], gradient: ["#E8B871", "#9C6B1F"], peakMonths: YEAR_ROUND,
    anchor: "Whatever the bees found that month is what you taste — <em>no two jars are the same</em>.",
    growingMethod: "Raw, cold-extracted, unfiltered", harvestCadence: "Spun by the season, jarred to order",
    pairsWith: ["Sharp cheese", "Black tea", "Warm biscuits"],
  },
  {
    id: "l-honey-comb", sellerId: "honey-and-the-comb", name: "Cut comb honey", category: "honey", price: 16, unit: "jar",
    diet: ["raw"], gradient: ["#E8C36A", "#C49A3F"], peakMonths: YEAR_ROUND,
    anchor: "The whole comb, wax and all, cut straight from the frame — <em>chew the wax, that's the best part</em>.",
    growingMethod: "Raw, never heated", harvestCadence: "Cut to order from the frame",
    pairsWith: ["Aged cheddar", "Sourdough", "Pears"],
  },
  {
    id: "l-honey-propolis", sellerId: "honey-and-the-comb", name: "Propolis tincture", category: "honey", price: 14, unit: "bottle",
    diet: ["raw"], gradient: ["#D8A86A", "#9C6B1F"], peakMonths: YEAR_ROUND,
    anchor: "The resin the bees seal the hive with, tinctured slow — <em>bitter, in the way that means it's working</em>.",
    growingMethod: "Raw propolis, alcohol-extracted", harvestCadence: "Made in small lots",
    pairsWith: ["Hot tea", "Lemon"],
  },

  // Wimberley Hill Farm — Hill Country (small-farm)
  {
    id: "l-wim-peaches", sellerId: "wimberley-hill-farm", name: "Hill Country peaches", category: "fruit", price: 4, unit: "lb",
    diet: ["organic"], gradient: ["#E8927C", "#C46A4F"], isNew: true, peakMonths: [5, 6, 7],
    anchor: "Tree-ripened and freestone, so the pit slips clean — <em>cobbler weather</em>.",
    growingMethod: "Certified organic", harvestCadence: "Picked ripe, twice a week",
    pairsWith: ["Vanilla ice cream", "Cream", "Bourbon"],
  },
  {
    id: "l-wim-chard", sellerId: "wimberley-hill-farm", name: "Rainbow chard", category: "vegetables", price: 4, unit: "bunch",
    diet: ["organic"], gradient: ["#74B5A1", "#30594A"], peakMonths: [3, 4, 5, 10, 11],
    anchor: "Stems come red, gold, and white, and it takes the heat better than spinach ever did — <em>cook the stems first</em>.",
    growingMethod: "Certified organic", harvestCadence: "Cut Tuesday and Friday",
    pairsWith: ["Garlic", "Lemon", "Olive oil"],
  },
  {
    id: "l-wim-csa", sellerId: "wimberley-hill-farm", name: "Weekly CSA box", category: "vegetables", price: 35, unit: "box",
    diet: ["organic"], gradient: ["#509982", "#1C664D"], peakMonths: [4, 5, 6, 10, 11],
    anchor: "You get what the field gives that week, which means the box <em>tells you what season it is</em>.",
    growingMethod: "Certified organic", harvestCadence: "Packed the morning of pickup",
    pairsWith: ["A loose plan", "An open fridge"],
  },

  // Cherrywood Backyard — East Austin (backyard)
  {
    id: "l-cherry-tomatoes", sellerId: "cherrywood-backyard", name: "Cherry tomatoes", category: "vegetables", price: 5, unit: "pt",
    diet: ["pesticide-free"], gradient: ["#C46A4F", "#8B3A28"], peakMonths: [5, 6, 7, 8, 9],
    anchor: "Sweet enough they mostly don't survive the walk home — <em>that's the review</em>.",
    growingMethod: "No spray", harvestCadence: "Picked as they ripen",
    pairsWith: ["Olive oil", "Sea salt", "Basil"],
  },
  {
    id: "l-cherry-herbs", sellerId: "cherrywood-backyard", name: "Mixed cutting herbs", category: "flowers-herbs", price: 3, unit: "bunch",
    diet: ["pesticide-free"], gradient: ["#74B5A1", "#1C664D"], peakMonths: [3, 4, 5, 6, 7, 8, 9, 10],
    anchor: "Whatever's gotten ahead of the kitchen that week — <em>ask what's good before you commit</em>.",
    growingMethod: "No spray", harvestCadence: "Cut to order",
    pairsWith: ["Roast chicken", "Soft cheese", "Eggs"],
  },

  // Dripping Springs Market Garden — Dripping Springs (small-farm)
  {
    id: "l-drip-shishito", sellerId: "dripping-market-garden", name: "Shishito peppers", category: "vegetables", price: 4, unit: "pt",
    diet: ["organic"], gradient: ["#509982", "#1C664D"], peakMonths: [6, 7, 8, 9, 10],
    anchor: "Blistered in a hot pan they're sweet and grassy, except <em>one in ten will catch you</em>.",
    growingMethod: "Certified organic", harvestCadence: "Picked through summer",
    pairsWith: ["Hot oil", "Flaky salt", "Lime"],
  },
  {
    id: "l-drip-squash", sellerId: "dripping-market-garden", name: "Summer squash", category: "vegetables", price: 3, unit: "lb",
    diet: ["organic"], gradient: ["#E8C36A", "#C49A3F"], peakMonths: [5, 6, 7, 8],
    anchor: "Picked small, before the seeds set, so it's tender enough to <em>eat raw if you want</em>.",
    growingMethod: "Certified organic", harvestCadence: "Picked every other day",
    pairsWith: ["Mint", "Lemon", "Ricotta"],
  },
  {
    id: "l-drip-melon", sellerId: "dripping-market-garden", name: "Cantaloupe", category: "fruit", price: 5, unit: "each",
    diet: ["organic"], gradient: ["#E8C36A", "#C49A3F"], isNew: true, peakMonths: [6, 7, 8],
    anchor: "Cut from the vine only when it slips free on its own — <em>you'll smell it through the bag</em>.",
    growingMethod: "Certified organic", harvestCadence: "Picked at full slip",
    pairsWith: ["Prosciutto", "Lime", "Chili salt"],
  },

  // Mueller Microgreens — Mueller (suburban)
  {
    id: "l-mueller-pea", sellerId: "mueller-microgreens", name: "Pea microgreens", category: "vegetables", price: 6, unit: "tray",
    diet: ["organic", "vegan"], gradient: ["#9CE5D0", "#509982"], peakMonths: YEAR_ROUND,
    anchor: "Crisp and sweet, tasting exactly like the pea pod they never got to become — <em>cut the morning you collect them</em>.",
    growingMethod: "Tray-grown, no spray", harvestCadence: "Cut to order",
    pairsWith: ["Avocado toast", "Soft eggs", "Sesame"],
  },
  {
    id: "l-mueller-lettuce", sellerId: "mueller-microgreens", name: "Butter lettuce", category: "vegetables", price: 3, unit: "head",
    diet: ["organic", "vegan"], gradient: ["#9CE5D0", "#74B5A1"], peakMonths: [3, 4, 5, 10, 11],
    anchor: "Cut whole with the roots still on, so it keeps a week if you <em>leave it be until dinner</em>.",
    growingMethod: "Grown cool, sold roots-on", harvestCadence: "Cool seasons only",
    pairsWith: ["Soft herbs", "A light vinaigrette"],
  },
  {
    id: "l-mueller-sunflower", sellerId: "mueller-microgreens", name: "Sunflower shoots", category: "vegetables", price: 6, unit: "tray",
    diet: ["organic", "vegan"], gradient: ["#74B5A1", "#30594A"], isNew: true, peakMonths: YEAR_ROUND,
    anchor: "Nutty and crunchy with the seed husk still clinging — <em>pull the husk or don't, your call</em>.",
    growingMethod: "Tray-grown, no spray", harvestCadence: "Cut to order",
    pairsWith: ["Grain bowls", "Tahini", "Citrus"],
  },

  // Lockhart Orchard Co. — Lockhart (small-farm)
  {
    id: "l-lock-peaches", sellerId: "lockhart-orchard", name: "Freestone peaches", category: "fruit", price: 4, unit: "lb",
    diet: ["organic"], gradient: ["#E8927C", "#C46A4F"], isNew: true, peakMonths: [5, 6, 7],
    anchor: "From trees older than the people picking them, left on the branch until <em>they let go on their own</em>.",
    growingMethod: "Certified organic, tree-ripened", harvestCadence: "Picked ripe, sold within the week",
    pairsWith: ["Cream", "Cornmeal", "Brown sugar"],
  },
  {
    id: "l-lock-plums", sellerId: "lockhart-orchard", name: "Methley plums", category: "fruit", price: 5, unit: "lb",
    diet: ["organic"], gradient: ["#8B5A4A", "#5A2D24"], peakMonths: [5, 6],
    anchor: "Small and dark, tart at the skin with the sweet right behind it — <em>eat them over the sink</em>.",
    growingMethod: "Certified organic", harvestCadence: "Picked late May into June",
    pairsWith: ["Yogurt", "Honey", "Almonds"],
  },

  // Hyde Park Hens — Hyde Park (backyard)
  {
    id: "l-hyde-eggs", sellerId: "hyde-park-hens", name: "Pasture-raised eggs", category: "eggs", price: 7, unit: "dozen",
    diet: ["pasture-raised"], gradient: ["#E8D9A8", "#C9952E"], peakMonths: YEAR_ROUND,
    anchor: "Shells come in whatever color the hens feel like, and the yolks <em>stand up like a dome</em>.",
    growingMethod: "Pasture-raised, soy-free feed", harvestCadence: "Collected daily",
    pairsWith: ["Buttered toast", "Black pepper", "Hot sauce"],
  },
  {
    id: "l-hyde-duck", sellerId: "hyde-park-hens", name: "Duck eggs", category: "eggs", price: 9, unit: "half-dozen",
    diet: ["pasture-raised"], gradient: ["#E8C36A", "#C49A3F"], peakMonths: [3, 4, 5, 6, 7, 8, 9],
    anchor: "Bigger and richer, built for baking — one duck egg does <em>what two chicken eggs can't</em>.",
    growingMethod: "Pasture-raised", harvestCadence: "Collected daily, spring through summer",
    pairsWith: ["Fresh pasta", "Custard", "Cake"],
  },

  // Buda Sourdough — Buda (specialty)
  {
    id: "l-buda-country", sellerId: "buda-sourdough", name: "Country sourdough", category: "baked", price: 8, unit: "loaf",
    diet: ["vegan"], gradient: ["#D8A86A", "#9C6B1F"], isNew: true, peakMonths: YEAR_ROUND,
    anchor: "A long cold rise and a dark crust, sliced best <em>once it's fully cooled</em> — give it the hour.",
    growingMethod: "Naturally leavened, long-fermented", harvestCadence: "Baked Friday morning",
    pairsWith: ["Salted butter", "Olive oil", "Sharp cheese"],
  },
  {
    id: "l-buda-focaccia", sellerId: "buda-sourdough", name: "Rosemary focaccia", category: "baked", price: 7, unit: "loaf",
    diet: ["vegan"], gradient: ["#E8C36A", "#C49A3F"], peakMonths: YEAR_ROUND,
    anchor: "Dimpled, heavy with olive oil, rosemary off the back step — <em>best torn, not cut</em>.",
    growingMethod: "Naturally leavened", harvestCadence: "Baked Friday morning",
    pairsWith: ["Soft cheese", "Tomatoes", "More olive oil"],
  },
  {
    id: "l-buda-rye", sellerId: "buda-sourdough", name: "Seeded rye", category: "baked", price: 9, unit: "loaf",
    diet: ["vegan"], gradient: ["#B5874F", "#6B4A1F"], peakMonths: YEAR_ROUND,
    anchor: "Dense and dark, packed with caraway and seed — <em>cut it thin</em>, it isn't a sandwich loaf.",
    growingMethod: "Naturally leavened", harvestCadence: "Baked Friday morning",
    pairsWith: ["Smoked fish", "Cultured butter", "Mustard"],
  },

  // Bastrop Berry Patch — Bastrop (small-farm)
  {
    id: "l-bastrop-blackberry", sellerId: "bastrop-berry-patch", name: "Blackberries", category: "fruit", price: 6, unit: "pt",
    diet: ["organic", "pesticide-free"], gradient: ["#9C3F4A", "#5E2630"], peakMonths: [5, 6],
    anchor: "Picked the morning you get them because <em>they won't make it to tomorrow</em> — eat them today.",
    growingMethod: "Spray-free", harvestCadence: "Picked at dawn, late spring only",
    pairsWith: ["Cream", "Lemon", "Shortcake"],
  },
  {
    id: "l-bastrop-jam", sellerId: "bastrop-berry-patch", name: "Dewberry jam", category: "honey", price: 9, unit: "jar",
    diet: ["organic"], gradient: ["#9C3F4A", "#5E2630"], isNew: true, peakMonths: YEAR_ROUND,
    anchor: "Cooked down the same afternoon the berries come off the cane — <em>summer, in a jar, in January</em>.",
    growingMethod: "Small-batch, low sugar", harvestCadence: "Made at the peak of the picking",
    pairsWith: ["Biscuits", "Butter", "Sharp cheese"],
  },

  // Round Rock Roots — Round Rock (suburban)
  {
    id: "l-rr-carrots", sellerId: "round-rock-roots", name: "Rainbow carrots", category: "vegetables", price: 3, unit: "bunch",
    diet: ["organic"], gradient: ["#B5874F", "#6B4A1F"], peakMonths: [1, 2, 3, 4, 11, 12],
    anchor: "Forked, uneven, and dirt-on, because <em>that's what a real carrot looks like</em> — and tastes like.",
    growingMethod: "Certified organic", harvestCadence: "Pulled through the cool months",
    pairsWith: ["Brown butter", "Thyme", "Honey"],
  },
  {
    id: "l-rr-beets", sellerId: "round-rock-roots", name: "Golden beets", category: "vegetables", price: 4, unit: "lb",
    diet: ["organic"], gradient: ["#E8C36A", "#C49A3F"], peakMonths: [1, 2, 3, 4, 11, 12],
    anchor: "Sweeter and milder than the red kind, and they <em>won't stain your hands</em> doing it.",
    growingMethod: "Certified organic", harvestCadence: "Pulled through the cool months",
    pairsWith: ["Goat cheese", "Walnuts", "Orange"],
  },
  {
    id: "l-rr-onions", sellerId: "round-rock-roots", name: "Spring onions", category: "vegetables", price: 2, unit: "bunch",
    diet: ["organic"], gradient: ["#74B5A1", "#1C664D"], peakMonths: [2, 3, 4, 5],
    anchor: "Pulled young with the green tops on, mild enough to <em>use the whole thing</em>.",
    growingMethod: "Certified organic", harvestCadence: "Pulled in spring",
    pairsWith: ["Soft scrambled eggs", "Butter", "Flaky salt"],
  },

  // South Congress Salsa & Preserves — South Congress (specialty)
  {
    id: "l-soco-salsa", sellerId: "soco-preserves", name: "Roasted salsa", category: "honey", price: 8, unit: "jar",
    diet: ["vegan", "gluten-free"], gradient: ["#D2674A", "#9C3F2A"], isNew: true, peakMonths: YEAR_ROUND,
    anchor: "Tomatoes and chiles charred dark before they're blended, which is where <em>the smoke comes from</em>.",
    growingMethod: "Small-batch, fire-roasted", harvestCadence: "Made in runs of forty jars",
    pairsWith: ["Tortilla chips", "Eggs", "Carnitas"],
  },
  {
    id: "l-soco-pickles", sellerId: "soco-preserves", name: "Dill pickles", category: "honey", price: 7, unit: "jar",
    diet: ["vegan", "gluten-free"], gradient: ["#509982", "#1C664D"], peakMonths: YEAR_ROUND,
    anchor: "Cured in brine, not shocked with vinegar, so they stay <em>snappy instead of soft</em>.",
    growingMethod: "Lacto-fermented, small batch", harvestCadence: "Made in runs of forty jars",
    pairsWith: ["Sandwiches", "Cheese boards", "Bloody Marys"],
  },
  {
    id: "l-soco-figs", sellerId: "soco-preserves", name: "Fig preserves", category: "honey", price: 10, unit: "jar",
    diet: ["vegan", "gluten-free"], gradient: ["#8B5A4A", "#5A2D24"], peakMonths: YEAR_ROUND,
    anchor: "Whole figs cooked slow until they're jammy but still <em>holding their shape</em>.",
    growingMethod: "Small-batch, low sugar", harvestCadence: "Made when the figs come in",
    pairsWith: ["Brie", "Prosciutto", "Toast"],
  },
];

// Every seed listing ships with an art-directed photo named for its id — the
// master lives at public/photos/{id}.webp (see scripts/fetch-photos.mjs and
// brand/copia-imagery-direction.md). Assigned by id so the 38 paths can't drift.
// Session-created listings never enter this array, so they keep their picked
// gradient — the photo layer is additive, the gradient is the designed fallback.
for (const l of listings) l.photo = `/photos/${l.id}.webp`;

/** Listings belonging to one seller, in seed order. */
export function listingsBySeller(sellerId: string): Listing[] {
  return listings.filter((l) => l.sellerId === sellerId);
}

/** A seller's listings that are at peak in the given month (1–12). */
export function inSeasonListings(sellerId: string, month: number): Listing[] {
  return listings.filter(
    (l) => l.sellerId === sellerId && l.peakMonths.includes(month),
  );
}

/** Slug = id (already URL-safe). The product-detail route's one resolver seam. */
export function listingById(id: string): Listing | undefined {
  return listings.find((l) => l.id === id);
}

/** A listing's seller-side status, defaulting to active when unset. */
export function listingStatus(listing: Listing): NonNullable<Listing["status"]> {
  return listing.status ?? "active";
}

const MONTH_ABBR = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/**
 * Human peak window from `peakMonths`. Handles:
 * - year-round       [1..12]            → "Year-round"
 * - continuous range [6,7,8,9]          → "Jun–Sep"   (stone fruit)
 * - single month     [5]                → "May"
 * - split range      [3,4,5,10,11]      → "Mar–May · Oct–Nov"  (cool-season greens)
 * - wrapping winter  [1,2,3,4,11,12]    → "Nov–Apr"   (the Dec→Jan gap is merged)
 * - empty            []                 → "Varies"
 * Honey/preserves are [1..12] → "Year-round"; stone fruit is one clean range.
 */
export function formatPeakWindow(months: number[]): string {
  if (months.length === 0) return "Varies";
  if (months.length >= 12) return "Year-round";

  const sorted = [...new Set(months)].sort((a, b) => a - b);
  const runs: [number, number][] = [];
  let start = sorted[0];
  let prev = sorted[0];
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] === prev + 1) prev = sorted[i];
    else {
      runs.push([start, prev]);
      start = sorted[i];
      prev = sorted[i];
    }
  }
  runs.push([start, prev]);

  // Merge a Dec→Jan wrap into one window (e.g. [1..4] + [11,12] → Nov–Apr).
  if (runs.length > 1 && runs[0][0] === 1 && runs[runs.length - 1][1] === 12) {
    const last = runs.pop()!;
    runs[0] = [last[0], runs[0][1]];
  }

  const fmt = ([a, b]: [number, number]) =>
    a === b ? MONTH_ABBR[a - 1] : `${MONTH_ABBR[a - 1]}–${MONTH_ABBR[b - 1]}`;
  return runs.map(fmt).join(" · ");
}
