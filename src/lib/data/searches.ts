// What buyers near a seller are searching for — the data behind the Coach
// Card's "See who's searching." A clearly seeded stub (a real build draws this
// from the search index); only Mira has a seed, so other identities degrade to
// an editorial line with no list. Several rows tie demand back to Mira's actual
// listing state — the closing-the-loop moment that makes the Coach feel real.

export interface SearchDemand {
  query: string;
  weekCount: number;
  nearbyCount: number;
  trend: "rising" | "steady" | "fading" | "new";
  /** One editorial line of context; may carry a single Fraunces-italic <em>. */
  note: string;
}

const MIRA_SEARCHES: SearchDemand[] = [
  {
    query: "Salad greens",
    weekCount: 14,
    nearbyCount: 5,
    trend: "rising",
    note: "Your butter lettuce is <em>listed as sold out</em> — relisting even a few heads would catch this.",
  },
  {
    query: "Heirloom tomatoes",
    weekCount: 18,
    nearbyCount: 6,
    trend: "rising",
    note: "Your strongest match. They peak here in July — a “coming soon” note now would lock in these buyers.",
  },
  {
    query: "Local eggs",
    weekCount: 11,
    nearbyCount: 4,
    trend: "steady",
    note: "You sell out most weeks — there's a <em>waitlist</em> forming you could open.",
  },
  {
    query: "Fresh basil",
    weekCount: 9,
    nearbyCount: 3,
    trend: "rising",
    note: "Your sweet basil answers this directly — it isn't surfacing high in results yet.",
  },
  {
    query: "Cut flowers",
    weekCount: 7,
    nearbyCount: 2,
    trend: "new",
    note: "New this week. Your zinnias are <em>just starting</em> — early to a small, loyal crowd.",
  },
  {
    query: "Snap peas",
    weekCount: 6,
    nearbyCount: 2,
    trend: "fading",
    note: "Winding down as the heat comes — your peas have a week or two left.",
  },
  {
    query: "Hot peppers",
    weekCount: 5,
    nearbyCount: 1,
    trend: "steady",
    note: "Quiet now, climbing toward summer — your jalapeños are <em>paused</em>; unpause when the heat sets in.",
  },
];

export function searchDemandFor(sellerId: string): SearchDemand[] {
  return sellerId === "miras-half-acre" ? MIRA_SEARCHES : [];
}
