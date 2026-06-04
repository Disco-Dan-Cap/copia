import type { BasketGroup } from "@/lib/basket/store";
import type { FulfillmentByGroup, PaymentMethod } from "@/lib/checkout/plan";
import { buildPlacedOrder } from "@/lib/orders/build";
import type { PlacedOrder } from "@/lib/orders/store";
import { listingById } from "./listings";
import { sellersById } from "./sellers";

// The demo buyer's prior arrangements — a short record so /orders isn't empty on
// first arrival, and so Day-16's session-created order has seeded company to sit
// above (newest first). Built through the SAME buildPlacedOrder() the checkout
// uses, so a seeded arrangement and a freshly-settled one are indistinguishable
// in shape, narration, and totals. `placedAtOffset` is relative to today (the
// house convention), so the record stays plausibly recent whenever it's opened.

function group(sellerId: string, items: Array<[listingId: string, qty: number]>): BasketGroup {
  const seller = sellersById[sellerId];
  const lines = items.map(([id, qty]) => {
    const listing = listingById(id)!;
    return { listing, qty, lineTotal: listing.price * qty };
  });
  return { seller, lines, subtotal: lines.reduce((s, l) => s + l.lineTotal, 0) };
}

interface SeedSpec {
  ref: string;
  offset: number;
  payment: PaymentMethod;
  groups: BasketGroup[];
  /** Seller ids fulfilled by courier (the rest are pickup). */
  deliver?: string[];
  tier?: "bicycle" | "motorcycle";
}

function seed(s: SeedSpec): PlacedOrder {
  const fulfillment: FulfillmentByGroup = {};
  for (const id of s.deliver ?? []) fulfillment[id] = "delivery";
  return buildPlacedOrder({
    groups: s.groups,
    fulfillment,
    tier: s.tier ?? "bicycle",
    payment: s.payment,
    ref: s.ref,
    placedAtOffset: s.offset,
  });
}

export const buyerOrders: PlacedOrder[] = [
  // Two days ago — a market pickup from Mira, settled by card.
  seed({
    ref: "CP-4QH2",
    offset: -2,
    payment: "card",
    groups: [group("miras-half-acre", [["l-miras-eggs", 1], ["l-miras-tomatoes", 2]])],
  }),
  // Last week — honey delivered by courier, settled in USDC.
  seed({
    ref: "CP-8KM9",
    offset: -9,
    payment: "usdc",
    groups: [group("honey-and-the-comb", [["l-honey-wildflower", 2]])],
    deliver: ["honey-and-the-comb"],
    tier: "motorcycle",
  }),
  // A couple of weeks back — two growers, both pickup, settled in Bitcoin.
  seed({
    ref: "CP-2RX7",
    offset: -16,
    payment: "bitcoin",
    groups: [
      group("mueller-microgreens", [["l-mueller-pea", 2]]),
      group("wimberley-hill-farm", [["l-wim-peaches", 3]]),
    ],
  }),
];

/**
 * The buyer's full record — this session's settled orders (newest first) layered
 * over the seed. Stable sort by recency keeps same-day orders in store order.
 */
export function mergeBuyerOrders(created: PlacedOrder[]): PlacedOrder[] {
  return [...created, ...buyerOrders].sort((a, b) => b.placedAtOffset - a.placedAtOffset);
}
