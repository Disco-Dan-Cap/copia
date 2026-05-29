import type { Order } from "./types";
import { listingById } from "./listings";

// ~26 orders across the twelve sellers. `dayOffset` is relative to today, so the
// dashboard is always alive whenever it's opened (the same honesty pattern as
// peakMonths-vs-current-month). Totals are computed, never stored. Mira's
// Half-Acre (the demo seller) is densest; brand-new sellers (Cherrywood, Hyde
// Park) have none, which exercises the empty state.
//
// Buyers reuse review-author names for continuity — the people who review also
// order.
export const orders: Order[] = [
  // ── Mira's Half-Acre (demo seller) ──────────────────────────────────────
  // Today: three orders → 2 confirmed · 1 awaiting · first pickup 4:30 PM.
  { id: "o-mira-1", listingId: "l-miras-eggs", buyer: "Dana R.", quantity: 2, fulfillment: "pickup", status: "confirmed", dayOffset: 0, pickupTime: "4:30 PM" },
  { id: "o-mira-2", listingId: "l-miras-tomatoes", buyer: "Marcus T.", quantity: 3, fulfillment: "pickup", status: "confirmed", dayOffset: 0, pickupTime: "5:15 PM" },
  { id: "o-mira-3", listingId: "l-miras-basil", buyer: "Priya N.", quantity: 2, fulfillment: "meetup", status: "awaiting", dayOffset: 0, note: "Can you do 6pm instead?" },
  // This week (completed)
  { id: "o-mira-4", listingId: "l-miras-eggs", buyer: "Will C.", quantity: 1, fulfillment: "pickup", status: "completed", dayOffset: -2 },
  { id: "o-mira-5", listingId: "l-miras-lettuce", buyer: "Jess R.", quantity: 2, fulfillment: "bicycle", status: "completed", dayOffset: -5 },
  { id: "o-mira-6", listingId: "l-miras-zinnias", buyer: "Tomás G.", quantity: 2, fulfillment: "pickup", status: "completed", dayOffset: -1 },
  { id: "o-mira-7", listingId: "l-miras-peas", buyer: "Dana R.", quantity: 3, fulfillment: "meetup", status: "completed", dayOffset: -4 },
  { id: "o-mira-8", listingId: "l-miras-squash", buyer: "Sela K.", quantity: 2, fulfillment: "pickup", status: "completed", dayOffset: -6 },
  // Last week (for the trend comparison)
  { id: "o-mira-9", listingId: "l-miras-eggs", buyer: "Marcus T.", quantity: 3, fulfillment: "pickup", status: "completed", dayOffset: -8 },
  { id: "o-mira-10", listingId: "l-miras-eggs", buyer: "Priya N.", quantity: 4, fulfillment: "pickup", status: "completed", dayOffset: -9 },
  { id: "o-mira-11", listingId: "l-miras-cherry", buyer: "Will C.", quantity: 2, fulfillment: "meetup", status: "completed", dayOffset: -12 },
  { id: "o-mira-12", listingId: "l-miras-basil", buyer: "Dana R.", quantity: 3, fulfillment: "pickup", status: "completed", dayOffset: -7 },
  // Upcoming (calendar only — not counted as sales)
  { id: "o-mira-13", listingId: "l-miras-eggs", buyer: "Jess R.", quantity: 2, fulfillment: "pickup", status: "confirmed", dayOffset: 2 },

  // ── Mueller Microgreens ─────────────────────────────────────────────────
  { id: "o-mue-1", listingId: "l-mueller-pea", buyer: "Devin K.", quantity: 2, fulfillment: "pickup", status: "confirmed", dayOffset: 0, pickupTime: "3:00 PM" },
  { id: "o-mue-2", listingId: "l-mueller-sunflower", buyer: "Iris L.", quantity: 1, fulfillment: "bicycle", status: "completed", dayOffset: -1 },
  { id: "o-mue-3", listingId: "l-mueller-lettuce", buyer: "Sam O.", quantity: 3, fulfillment: "pickup", status: "completed", dayOffset: -4 },

  // ── Wimberley Hill Farm ─────────────────────────────────────────────────
  { id: "o-wim-1", listingId: "l-wim-csa", buyer: "Becca L.", quantity: 1, fulfillment: "pickup", status: "confirmed", dayOffset: 0, pickupTime: "9:00 AM" },
  { id: "o-wim-2", listingId: "l-wim-peaches", buyer: "Tomás G.", quantity: 4, fulfillment: "pickup", status: "completed", dayOffset: -3 },

  // ── The Honey & The Comb ────────────────────────────────────────────────
  { id: "o-hon-1", listingId: "l-honey-wildflower", buyer: "Sofia M.", quantity: 2, fulfillment: "pickup", status: "completed", dayOffset: -2 },
  { id: "o-hon-2", listingId: "l-honey-comb", buyer: "Reza A.", quantity: 1, fulfillment: "motorcycle", status: "confirmed", dayOffset: 1 },

  // ── Buda Sourdough ──────────────────────────────────────────────────────
  { id: "o-bud-1", listingId: "l-buda-country", buyer: "Frank L.", quantity: 2, fulfillment: "pickup", status: "confirmed", dayOffset: 0, pickupTime: "8:00 AM" },
  { id: "o-bud-2", listingId: "l-buda-focaccia", buyer: "Asha P.", quantity: 1, fulfillment: "pickup", status: "completed", dayOffset: -7 },

  // ── A few more, spread across active sellers ────────────────────────────
  { id: "o-dri-1", listingId: "l-drip-squash", buyer: "Cole H.", quantity: 3, fulfillment: "pickup", status: "completed", dayOffset: -2 },
  { id: "o-loc-1", listingId: "l-lock-peaches", buyer: "Maria C.", quantity: 5, fulfillment: "pickup", status: "completed", dayOffset: -1 },
  { id: "o-soc-1", listingId: "l-soco-salsa", buyer: "Val R.", quantity: 2, fulfillment: "pickup", status: "completed", dayOffset: -3 },
  { id: "o-rr-1", listingId: "l-rr-carrots", buyer: "Hina T.", quantity: 2, fulfillment: "pickup", status: "completed", dayOffset: -6 },
];

/** Computed total for an order — price × quantity, never stored. */
export function orderTotal(order: Order): number {
  const listing = listingById(order.listingId);
  return listing ? listing.price * order.quantity : 0;
}

/** Every order belonging to a seller (joined through the listing). */
export function ordersBySeller(sellerId: string): Order[] {
  return orders.filter((o) => listingById(o.listingId)?.sellerId === sellerId);
}

/** A seller's orders scheduled for today (dayOffset 0), earliest pickup first. */
export function todaysOrders(sellerId: string): Order[] {
  return ordersBySeller(sellerId)
    .filter((o) => o.dayOffset === 0)
    .sort((a, b) => (a.pickupTime ?? "~").localeCompare(b.pickupTime ?? "~"));
}

export interface SalesStats {
  /** Confirmed + completed revenue in the last 7 days (incl. today). */
  thisWeek: number;
  /** Confirmed + completed revenue in the 7 days before that. */
  lastWeek: number;
  /** Whole-percent week-over-week change, or null when there's no prior week. */
  trendPct: number | null;
  /** Name of the listing that drove the most revenue this week. */
  topListing: string | null;
}

/** Week-over-week sales for a seller, computed from the seeded orders. */
export function sellerSalesStats(sellerId: string): SalesStats {
  const own = ordersBySeller(sellerId).filter(
    (o) => o.status === "confirmed" || o.status === "completed",
  );
  const inWindow = (o: Order, from: number, to: number) =>
    o.dayOffset >= from && o.dayOffset <= to;

  const thisWeekOrders = own.filter((o) => inWindow(o, -6, 0));
  const thisWeek = thisWeekOrders.reduce((sum, o) => sum + orderTotal(o), 0);
  const lastWeek = own
    .filter((o) => inWindow(o, -13, -7))
    .reduce((sum, o) => sum + orderTotal(o), 0);

  const trendPct =
    lastWeek > 0 ? Math.round(((thisWeek - lastWeek) / lastWeek) * 100) : null;

  const byListing = new Map<string, number>();
  for (const o of thisWeekOrders) {
    const listing = listingById(o.listingId);
    if (!listing) continue;
    byListing.set(listing.name, (byListing.get(listing.name) ?? 0) + orderTotal(o));
  }
  let topListing: string | null = null;
  let topRevenue = 0;
  for (const [name, rev] of byListing) {
    if (rev > topRevenue) {
      topRevenue = rev;
      topListing = name;
    }
  }

  return { thisWeek, lastWeek, trendPct, topListing };
}
