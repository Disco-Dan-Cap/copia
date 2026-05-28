import type { Review } from "./types";

// ~47 buyer reviews across the twelve sellers. Written to read like real Austin
// people — short, specific, never generic praise. Ratings carry honest variance:
// most 5s and 4s, with Round Rock (cosmetically rough roots) and Bastrop (a slow
// berry shipment) landing in the low-4s for defensible reasons. The star average
// on each profile is computed from these (see `reviewStats`) — nothing hardcoded.
export const reviews: Review[] = [
  // Mira's Half-Acre → 4.8
  { id: "r-miras-1", sellerId: "miras-half-acre", author: "Dana R.", neighborhood: "Cherrywood", date: "2026-05-17", rating: 5, body: "Picked up the heirlooms Saturday and Mira threw in a sprig of basil. Perfect with mozzarella." },
  { id: "r-miras-2", sellerId: "miras-half-acre", author: "Marcus T.", neighborhood: "Mueller", date: "2026-05-09", rating: 5, body: "Eggs were still warm when I got home. Yolks orange like marigolds." },
  { id: "r-miras-3", sellerId: "miras-half-acre", author: "Priya N.", neighborhood: "Hyde Park", date: "2026-04-28", rating: 5, body: "Asked about the chicken wire and got the whole deer saga back over text. Best tomatoes on the east side, and I've tried them all." },
  { id: "r-miras-4", sellerId: "miras-half-acre", author: "Will C.", neighborhood: "East Austin", date: "2026-04-12", rating: 4, body: "Basil and eggs were great. Tomatoes weren't ready yet in April — worth the wait though." },

  // The Honey & The Comb → 4.6
  { id: "r-honey-1", sellerId: "honey-and-the-comb", author: "Sofia M.", neighborhood: "Bouldin Creek", date: "2026-05-20", rating: 5, body: "The comb honey is unreal on toast. You can taste the wildflowers, whatever that means — but you can." },
  { id: "r-honey-2", sellerId: "honey-and-the-comb", author: "Reza A.", neighborhood: "Zilker", date: "2026-05-02", rating: 5, body: "Crystallized a little by the time it got to me and I almost complained, then remembered that's the raw kind. Warmed the jar, good as new." },
  { id: "r-honey-3", sellerId: "honey-and-the-comb", author: "Hannah K.", neighborhood: "Travis Heights", date: "2026-04-19", rating: 5, body: "Bought the candles as a gift and kept them. House smells like a beehive in the best way." },
  { id: "r-honey-4", sellerId: "honey-and-the-comb", author: "Greg D.", neighborhood: "South Lamar", date: "2026-03-30", rating: 4, body: "Great honey, fair price. Pickup window was tight for my schedule but they worked with me." },
  { id: "r-honey-5", sellerId: "honey-and-the-comb", author: "Lena P.", neighborhood: "Barton Hills", date: "2026-03-11", rating: 4, body: "Propolis tincture is the real deal. Wish the jars were a touch bigger for the price." },

  // Wimberley Hill Farm → 4.7
  { id: "r-wim-1", sellerId: "wimberley-hill-farm", author: "Tomás G.", neighborhood: "Oak Hill", date: "2026-05-15", rating: 5, body: "First peaches of the year from the CSA box and I ate three before I got home. The chard's been great too." },
  { id: "r-wim-2", sellerId: "wimberley-hill-farm", author: "Becca L.", neighborhood: "Dripping Springs", date: "2026-04-25", rating: 5, body: "Box was a little smaller this week and they sent a note about the dry spell. Appreciated the honesty, and everything still tasted incredible." },
  { id: "r-wim-3", sellerId: "wimberley-hill-farm", author: "Marcus W.", neighborhood: "Buda", date: "2026-04-08", rating: 4, body: "Solid CSA. Some weeks lean heavy on greens, but that's farming, not their fault." },

  // Cherrywood Backyard → 4.7
  { id: "r-cherry-1", sellerId: "cherrywood-backyard", author: "Jess R.", neighborhood: "Cherrywood", date: "2026-05-19", rating: 5, body: "Two blocks away and the cherry tomatoes are sweeter than anything at the store. Kids eat them like candy." },
  { id: "r-cherry-2", sellerId: "cherrywood-backyard", author: "Owen P.", neighborhood: "Mueller", date: "2026-05-06", rating: 4, body: "Great herbs, but they sell out fast — it really is just a backyard. Get on the early list." },
  { id: "r-cherry-3", sellerId: "cherrywood-backyard", author: "Amara T.", neighborhood: "East Austin", date: "2026-04-20", rating: 5, body: "Got the odd dozen eggs once and they were fantastic. No promises is right, but worth the gamble." },

  // Dripping Springs Market Garden → 4.8
  { id: "r-drip-1", sellerId: "dripping-market-garden", author: "Cole H.", neighborhood: "Dripping Springs", date: "2026-05-21", rating: 5, body: "Shishitos by the pint all summer. Maybe one in ten brings the heat — that's the fun of it." },
  { id: "r-drip-2", sellerId: "dripping-market-garden", author: "Nadia F.", neighborhood: "Oak Hill", date: "2026-05-10", rating: 5, body: "Cantaloupe was still warm from the field and you could smell it through the bag." },
  { id: "r-drip-3", sellerId: "dripping-market-garden", author: "Pat M.", neighborhood: "Bee Cave", date: "2026-04-30", rating: 5, body: "Summer squash never sees the inside of a cooler here. You can tell." },
  { id: "r-drip-4", sellerId: "dripping-market-garden", author: "Ruth S.", neighborhood: "Sunset Valley", date: "2026-04-14", rating: 4, body: "Everything's great in season. Showed up early spring and the stand was mostly starts, so time it right." },

  // Mueller Microgreens → 4.8
  { id: "r-mueller-1", sellerId: "mueller-microgreens", author: "Devin K.", neighborhood: "Mueller", date: "2026-05-22", rating: 5, body: "Cut while I waited. The pea shoots lasted a full week in the fridge, which never happens." },
  { id: "r-mueller-2", sellerId: "mueller-microgreens", author: "Iris L.", neighborhood: "Windsor Park", date: "2026-05-13", rating: 5, body: "Sunflower shoots on everything now. Nutty and crunchy and gone in two days at my house." },
  { id: "r-mueller-3", sellerId: "mueller-microgreens", author: "Sam O.", neighborhood: "Cherrywood", date: "2026-05-01", rating: 5, body: "Butter lettuce in spring is so good I'm sad it disappears when it warms up." },
  { id: "r-mueller-4", sellerId: "mueller-microgreens", author: "Bri N.", neighborhood: "Hyde Park", date: "2026-04-17", rating: 5, body: "The radish micros have a real kick. Great on tacos." },
  { id: "r-mueller-5", sellerId: "mueller-microgreens", author: "Jordan V.", neighborhood: "Mueller", date: "2026-03-29", rating: 4, body: "Lettuce was gone by the time I messaged — cool-season only. The micros never disappoint though." },

  // Lockhart Orchard Co. → 5.0
  { id: "r-lock-1", sellerId: "lockhart-orchard", author: "Maria C.", neighborhood: "Lockhart", date: "2026-05-18", rating: 5, body: "Got in early on the freestones. A tree-ripened peach really is a different fruit. Sticky elbows, no regrets." },
  { id: "r-lock-2", sellerId: "lockhart-orchard", author: "Hank B.", neighborhood: "Buda", date: "2026-05-12", rating: 5, body: "The Methley plums are tart and perfect. Drove out for them and would do it again." },
  { id: "r-lock-3", sellerId: "lockhart-orchard", author: "Cee D.", neighborhood: "Kyle", date: "2026-05-04", rating: 5, body: "Bought a half bushel and froze half. Best decision of the spring." },
  { id: "r-lock-4", sellerId: "lockhart-orchard", author: "Lupe R.", neighborhood: "San Marcos", date: "2026-04-27", rating: 5, body: "They told me to wait two weeks for the good peaches instead of selling me the early ones. That's trust." },

  // Hyde Park Hens → 4.7
  { id: "r-hyde-1", sellerId: "hyde-park-hens", author: "Nina H.", neighborhood: "Hyde Park", date: "2026-05-16", rating: 5, body: "Brought my carton back and the next dozen was a dollar off. Eggs are unbeatable." },
  { id: "r-hyde-2", sellerId: "hyde-park-hens", author: "Theo M.", neighborhood: "North Loop", date: "2026-05-03", rating: 5, body: "Duck eggs made the best pasta I've ever pulled off. Worth every penny." },
  { id: "r-hyde-3", sellerId: "hyde-park-hens", author: "Gabriela S.", neighborhood: "Hyde Park", date: "2026-04-22", rating: 4, body: "Eggs are excellent. The garden veg is hit or miss depending on the week, but they're upfront about it." },

  // Buda Sourdough → 4.8
  { id: "r-buda-1", sellerId: "buda-sourdough", author: "Frank L.", neighborhood: "Buda", date: "2026-05-23", rating: 5, body: "The crust on the country loaf is worth setting an alarm for. Friday mornings only — they're not kidding." },
  { id: "r-buda-2", sellerId: "buda-sourdough", author: "Asha P.", neighborhood: "Manchaca", date: "2026-05-16", rating: 5, body: "Rosemary focaccia disappeared before lunch at our house. Ordered two the next time." },
  { id: "r-buda-3", sellerId: "buda-sourdough", author: "Dylan R.", neighborhood: "Kyle", date: "2026-05-09", rating: 5, body: "Seeded rye is dense and proper. Tastes like the bakeries I miss from back home." },
  { id: "r-buda-4", sellerId: "buda-sourdough", author: "Mara T.", neighborhood: "Buda", date: "2026-04-25", rating: 5, body: "Sold out twice before I got there. Third time I pre-ordered — problem solved, and the loaf was perfect." },
  { id: "r-buda-5", sellerId: "buda-sourdough", author: "Quinn A.", neighborhood: "South Austin", date: "2026-04-11", rating: 4, body: "Excellent bread. Just wish they baked more than one day a week." },

  // Bastrop Berry Patch → 4.3
  { id: "r-bastrop-1", sellerId: "bastrop-berry-patch", author: "Cora J.", neighborhood: "Bastrop", date: "2026-05-20", rating: 5, body: "Picked-that-morning blackberries that didn't survive the drive home. The jam is the next best thing all year." },
  { id: "r-bastrop-2", sellerId: "bastrop-berry-patch", author: "Eli W.", neighborhood: "Smithville", date: "2026-05-11", rating: 5, body: "Dewberry jam on biscuits — that's the whole review." },
  { id: "r-bastrop-3", sellerId: "bastrop-berry-patch", author: "Renee F.", neighborhood: "East Austin", date: "2026-04-29", rating: 4, body: "Berries are fragile and a couple were crushed by pickup. Still delicious, but eat them the same day." },
  { id: "r-bastrop-4", sellerId: "bastrop-berry-patch", author: "Marcus B.", neighborhood: "Cedar Creek", date: "2026-04-15", rating: 3, body: "Shipping was slow and the first pint arrived soft. They made it right with an extra jar of jam, which was honestly the best part." },

  // Round Rock Roots → 4.3
  { id: "r-rr-1", sellerId: "round-rock-roots", author: "Hina T.", neighborhood: "Round Rock", date: "2026-03-18", rating: 5, body: "Forked, dirty, and the sweetest carrots I've had since my grandfather's garden. Don't come for the looks." },
  { id: "r-rr-2", sellerId: "round-rock-roots", author: "Paul M.", neighborhood: "Pflugerville", date: "2026-02-26", rating: 4, body: "Beets were great roasted. A couple were on the small side, but the flavor made up for it." },
  { id: "r-rr-3", sellerId: "round-rock-roots", author: "Sang L.", neighborhood: "Round Rock", date: "2026-01-30", rating: 4, body: "Good winter roots. Had to scrub a lot of dirt off — comes with the territory, I suppose." },

  // South Congress Salsa & Preserves → 4.8
  { id: "r-soco-1", sellerId: "soco-preserves", author: "Val R.", neighborhood: "Travis Heights", date: "2026-05-21", rating: 5, body: "The roasted salsa has a smokiness I can't replicate at home. Buy two — you'll finish one in the car." },
  { id: "r-soco-2", sellerId: "soco-preserves", author: "Dom K.", neighborhood: "Bouldin Creek", date: "2026-05-08", rating: 5, body: "Dill pickles are properly garlicky and snappy. Gone in a weekend." },
  { id: "r-soco-3", sellerId: "soco-preserves", author: "Lia S.", neighborhood: "South Congress", date: "2026-04-24", rating: 4, body: "Fig preserves are lovely. The batch I got was looser than last time — they did say each one's different." },
  { id: "r-soco-4", sellerId: "soco-preserves", author: "Theo G.", neighborhood: "Riverside", date: "2026-04-09", rating: 5, body: "Hand-labeled jars, real ingredients, no weird stuff. Tastes like someone's kitchen, in the best way." },
];

export interface ReviewStats {
  /** Raw mean of ratings (format with `.toFixed(1)` for display). 0 if none. */
  average: number;
  count: number;
}

/** A seller's reviews, newest first. */
export function reviewsBySeller(sellerId: string): Review[] {
  return reviews
    .filter((r) => r.sellerId === sellerId)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** Computed star average + count for a seller — the source of truth for ratings. */
export function reviewStats(sellerId: string): ReviewStats {
  const own = reviews.filter((r) => r.sellerId === sellerId);
  if (own.length === 0) return { average: 0, count: 0 };
  const sum = own.reduce((acc, r) => acc + r.rating, 0);
  return { average: sum / own.length, count: own.length };
}
