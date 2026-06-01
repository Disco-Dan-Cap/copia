import { ordersBySeller, orderTotal } from "./orders";
import { listingById, listingStatus } from "./listings";
import { searchDemandFor } from "./searches";
import { reviewStats, reviewsBySeller } from "./reviews";

// The grower's almanac — the season so far, derived entirely from the seeded
// surfaces (orders, listings, search demand, reviews). No invented SaaS metrics,
// no charts, no charting dependency. Just the numbers a grower actually keeps:
// what sold, who came back, what people came looking for and didn't find.

const MONTH = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// ── Crops that earned their bed ─────────────────────────────────────────────
export interface CropEarning {
  listingId: string;
  name: string;
  revenue: number;
}

/** Revenue per listing (confirmed + completed), highest first. The proportion
 *  for the ledger rule is computed in the component against the top earner. */
export function revenueByListing(sellerId: string): CropEarning[] {
  const map = new Map<string, number>();
  for (const o of ordersBySeller(sellerId)) {
    if (o.status !== "confirmed" && o.status !== "completed") continue;
    map.set(o.listingId, (map.get(o.listingId) ?? 0) + orderTotal(o));
  }
  return [...map.entries()]
    .map(([listingId, revenue]) => ({
      listingId,
      name: listingById(listingId)?.name ?? "—",
      revenue,
    }))
    .filter((c) => c.revenue > 0)
    .sort((a, b) => b.revenue - a.revenue);
}

// ── The ones who keep coming back ───────────────────────────────────────────
export interface RepeatBuyer {
  buyer: string;
  orderCount: number;
  /** The hand-authored remembered detail — what makes them a person, not a row. */
  line: string;
}

// Mira's returning buyers, each remembered by a real detail from their reviews,
// orders, and message threads — never a category. Other sellers fall back to a
// plain count so the section still reads true.
const BUYER_LINES: Record<string, string> = {
  "Dana R.": "three baskets this season, and the one who writes about the basil.",
  "Marcus T.": "two, and swears the yolks are the color of marigolds.",
  "Priya N.": "two, and still asking about the deer.",
  "Will C.": "two, and still waiting on the heirlooms since April.",
  "Jess R.": "two, and didn't expect to fall for the zinnias.",
};

const COUNT_WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

function buyerLine(buyer: string, count: number): string {
  if (BUYER_LINES[buyer]) return BUYER_LINES[buyer];
  const word = count <= 10 ? COUNT_WORDS[count] : String(count);
  return `${word} orders this season.`;
}

/** Buyers with 2+ non-canceled orders, most loyal first (count, then spend). */
export function repeatBuyers(sellerId: string): RepeatBuyer[] {
  const map = new Map<string, { count: number; revenue: number }>();
  for (const o of ordersBySeller(sellerId)) {
    if (o.status === "canceled") continue;
    const e = map.get(o.buyer) ?? { count: 0, revenue: 0 };
    e.count += 1;
    if (o.status === "confirmed" || o.status === "completed") e.revenue += orderTotal(o);
    map.set(o.buyer, e);
  }
  return [...map.entries()]
    .filter(([, e]) => e.count >= 2)
    .sort((a, b) => b[1].count - a[1].count || b[1].revenue - a[1].revenue)
    .map(([buyer, e]) => ({ buyer, orderCount: e.count, line: buyerLine(buyer, e.count) }));
}

// ── Searched, and didn't find ───────────────────────────────────────────────
export interface DemandGap {
  query: string;
  weekCount: number;
  listingId: string;
  name: string;
  reason: string;
}

/** Where real search demand met a listing the buyer couldn't buy — sold out or
 *  paused. The "relist and you'd catch this" loop, tied back to Days 7–8. */
export function demandGaps(sellerId: string): DemandGap[] {
  const gaps: DemandGap[] = [];
  for (const d of searchDemandFor(sellerId)) {
    if (!d.listingId) continue;
    const listing = listingById(d.listingId);
    if (!listing) continue;
    const status = listingStatus(listing);
    if (status !== "sold-out" && status !== "paused") continue;
    gaps.push({
      query: d.query,
      weekCount: d.weekCount,
      listingId: listing.id,
      name: listing.name,
      reason: status === "sold-out" ? "Sold out" : "Paused",
    });
  }
  return gaps;
}

// ── Season frame ────────────────────────────────────────────────────────────
export interface SeasonFrame {
  /** Non-canceled baskets this season. */
  baskets: number;
  spanLabel: string;
  reviewCount: number;
  reviewAvg: number;
  /** True when there's any sales record to show; false → the young-season state. */
  hasRecord: boolean;
}

export function seasonFrame(sellerId: string, now: Date): SeasonFrame {
  const baskets = ordersBySeller(sellerId).filter((o) => o.status !== "canceled").length;
  const stats = reviewStats(sellerId);
  const own = reviewsBySeller(sellerId); // newest first
  const earliest = own.length ? own[own.length - 1].date : null;
  const startMonth = earliest ? MONTH[Number(earliest.slice(5, 7)) - 1] : MONTH[now.getMonth()];
  const spanLabel = `${startMonth}–${MONTH[now.getMonth()]} ${now.getFullYear()}`;
  return {
    baskets,
    spanLabel,
    reviewCount: stats.count,
    reviewAvg: stats.average,
    hasRecord: revenueByListing(sellerId).length > 0,
  };
}

// The hand-authored opening — Mira's season in one editorial sentence (the
// dashboard's "written like a letter" voice). Other sellers get the young-season
// line so the surface always opens in voice, never with "no data."
const SEASON_OPENINGS: Record<string, string> = {
  "miras-half-acre":
    "Thirteen baskets out since the first warm week, and the four hens have outearned everything in the beds — eggs first, then a surprising wall of zinnias.",
};
const YOUNG_SEASON =
  "The season's still finding its shape here — the record fills in as baskets go out and buyers come back.";

export function seasonOpeningFor(sellerId: string): string {
  return SEASON_OPENINGS[sellerId] ?? YOUNG_SEASON;
}
