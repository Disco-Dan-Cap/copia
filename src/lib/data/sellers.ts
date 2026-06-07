import type { MapPin, Seller } from "./types";

// Twelve sellers spread across real Austin coordinates — close-in East Austin
// and Mueller, mid-range South Austin, and the Hill Country / outlying farms.
// Distance is never stored: it's computed from `location` against the buyer
// (see `lib/geo`), so every "0.8 mi" on screen is real haversine math.
//
// `story` is the profile vignette (brand voice, one <em> Fraunces-italic accent
// each). Ratings are NOT stored — they're computed from `reviews`.
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
    avatarGradient: ["#C46A4F", "#8B3A28"],
    since: 2019,
    philosophy: "No pesticides",
    contactName: "Mira",
    pickup: { venue: "the Mueller market", venueShort: "Mueller market", day: "Saturday", window: "morning", marketId: "mueller" },
    story:
      "The deer are real, which is why the tomatoes grow behind chicken wire Mira strung herself the spring she started. Four plants, four hens, and a hunch that the neighbors would rather walk over than drive out — <em>the hunch held</em>. There's a waitlist for the eggs now.",
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
    avatarGradient: ["#E8B871", "#9C6B1F"],
    since: 2016,
    philosophy: "Raw + unfiltered",
    contactName: "the beekeeper",
    pickup: { venue: "the SFC downtown market", venueShort: "SFC downtown", day: "Saturday", window: "morning", marketId: "sfc" },
    story:
      "The hives sit on a friend's acre off Manchaca, close enough that the bees work the greenbelt wildflowers all spring. Nothing is heated, nothing is filtered — what's in the jar is what the bees made, <em>crystals and all</em>. The candles are the same wax, rolled by hand once the hives go quiet for winter.",
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
    avatarGradient: ["#74B5A1", "#1C664D"],
    since: 2009,
    philosophy: "Certified organic",
    contactName: "the farm",
    pickup: { venue: "the farm in Wimberley", venueShort: "Farm gate", day: "Saturday", window: "morning", marketId: null },
    story:
      "The planting calendar tacked to the barn door is still in her grandmother's hand, and most of it still holds. Peaches come first, then the chard that shrugs off the heat, then whatever the CSA boxes need filling. <em>A drought year tells the truth</em> — the box gets smaller, the flavor gets bigger.",
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
    avatarGradient: ["#9CE5D0", "#509982"],
    since: 2021,
    philosophy: "No spray",
    contactName: "the grower",
    pickup: { venue: "the Mueller market", venueShort: "Mueller market", day: "Saturday", window: "morning", marketId: "mueller" },
    story:
      "Two raised beds and a coop that started as a 2021 project and somehow never wound down. Most weeks it's a few pints of cherry tomatoes and whatever herbs got ahead of the kitchen. <em>No promises on the eggs</em> — the hens put it to a vote.",
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
    avatarGradient: ["#509982", "#1C664D"],
    since: 2014,
    philosophy: "Certified organic",
    contactName: "the growers",
    pickup: { venue: "the garden in Dripping Springs", venueShort: "Farm gate", day: "Saturday", window: "morning", marketId: null },
    story:
      "Two acres off the highway that were pasture until 2014, now rows of peppers and squash that run right up to the fence line. The melons get planted last and picked warm, the way they're meant to be. <em>If it's on the stand, it came off the vine that morning</em>.",
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
    avatarGradient: ["#9CE5D0", "#74B5A1"],
    since: 2020,
    philosophy: "Cut to order",
    contactName: "the grower",
    pickup: { venue: "the Mueller market", venueShort: "Mueller market", day: "Saturday", window: "morning", marketId: "mueller" },
    story:
      "It started on a single rack of grow lights in a Mueller garage and took over the room by the second winter. Trays of peas, sunflower, and radish get cut the morning you pick them up — <em>nothing sits</em>. The lettuces come and go with the cool weather; the greens don't keep a calendar.",
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
    avatarGradient: ["#E8927C", "#C46A4F"],
    since: 1998,
    philosophy: "Tree-ripened",
    contactName: "the orchard",
    pickup: { venue: "the orchard in Lockhart", venueShort: "Orchard gate", day: "Saturday", window: "morning", marketId: null },
    story:
      "The oldest trees were planted before the family bought the place, and they still set the heaviest fruit. Everything is picked ripe and sold within the week, because a tree-ripened peach won't wait for anyone. <em>The June drop is the best week of the year</em> — and it's over fast.",
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
    avatarGradient: ["#74B5A1", "#30594A"],
    since: 2018,
    philosophy: "Pasture-raised",
    contactName: "the keeper",
    pickup: { venue: "the porch in Hyde Park", venueShort: "Porch pickup", day: "Sunday", window: "afternoon", marketId: null },
    story:
      "A dozen hens range the back lot under the pecans, and the eggs shift color with whatever they've gotten into that week. There's a garden too, but it's the eggs people come back for. <em>Bring the carton back</em> and the next dozen's a dollar less.",
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
    avatarGradient: ["#D8A86A", "#9C6B1F"],
    since: 2020,
    philosophy: "Naturally leavened",
    contactName: "the baker",
    pickup: { venue: "the bakery in Buda", venueShort: "Bakery", day: "Friday", window: "afternoon", marketId: null },
    story:
      "The starter is older than the bakery — it came from a friend's jar in the spring of 2020 and hasn't missed a feeding since. Loaves go in the oven Thursday night and come out Friday, and Friday is the only day they're sold. <em>When they're gone, they're gone</em>.",
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
    avatarGradient: ["#C46A4F", "#6B2235"],
    since: 2013,
    philosophy: "Spray-free",
    contactName: "the growers",
    pickup: { venue: "the patch in Bastrop", venueShort: "Farm gate", day: "Saturday", window: "morning", marketId: null },
    story:
      "The canes run in long rows out past the pines, and for three weeks in late spring they're heavy enough to bend. What doesn't sell fresh goes straight into the jam pot that afternoon. <em>The fresh season is short</em> — the jam is how you keep it past June.",
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
    avatarGradient: ["#B5874F", "#6B4A1F"],
    since: 2017,
    philosophy: "Soil first",
    contactName: "the grower",
    pickup: { venue: "the Lone Star market", venueShort: "Lone Star market", day: "Sunday", window: "morning", marketId: "lonestar" },
    story:
      "Roots don't photograph well and this grower has made peace with it. Carrots come out forked, beets come out dusty, and both taste like something the bagged kind forgot how to. <em>The cold months are the good months</em> — sweetness is what a frost does to a carrot.",
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
    avatarGradient: ["#D2674A", "#9C3F2A"],
    since: 2015,
    philosophy: "Small batch",
    contactName: "the maker",
    pickup: { venue: "the SFC downtown market", venueShort: "SFC downtown", day: "Saturday", window: "morning", marketId: "sfc" },
    story:
      "Everything is made on a South Congress stovetop in runs of forty jars, labeled by hand the same night. The salsa recipe came off a grandmother's index card; the pickles were the maker's own stubbornness. <em>Each batch tastes a little different</em> — that's the part you can't buy off a shelf.",
  },
];

// Every seller has an art-directed vignette (the 3:2 banner scene, v-{id}) and
// an identity avatar (a face or farm logo, avatar-{id}) — masters live in
// public/photos/ (see scripts/fetch-photos.mjs, scripts/fetch-avatars.mjs, and
// brand/copia-imagery-direction.md). avatarGradient stays as the designed
// fallback for both.
for (const s of sellers) {
  s.photo = `/photos/v-${s.id}.webp`;
  s.avatar = `/photos/avatar-${s.id}.webp`;
}

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
