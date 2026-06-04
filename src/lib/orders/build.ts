import type { BasketGroup } from "@/lib/basket/store";
import {
  buildPlan,
  narrate,
  type DeliveryTier,
  type FulfillmentByGroup,
  type PaymentMethod,
} from "@/lib/checkout/plan";
import type { PlacedGroup, PlacedOrder } from "./store";

// The one place a basket-shaped thing becomes a PlacedOrder. Checkout calls it on
// settle (Day 16); the buyer-order seed (Day 17) calls it too, so seeded history
// and a freshly-placed order are byte-for-byte the same shape — same consolidation,
// same narration sentence, same totals. Keeping this shared is what lets the
// confirmation note and the order-history detail be one component.

export interface PlacedOrderInput {
  groups: BasketGroup[];
  fulfillment: FulfillmentByGroup;
  tier: DeliveryTier;
  payment: PaymentMethod;
  ref: string;
  /** Day-offset relative to today (0 = placed today; negative = past). */
  placedAtOffset: number;
}

export function buildPlacedOrder(input: PlacedOrderInput): PlacedOrder {
  const { groups, fulfillment, tier, payment, ref, placedAtOffset } = input;
  const plan = buildPlan(groups, fulfillment, tier);

  // The plan already resolved which groups are delivery (guarding on capability);
  // mirror that into each PlacedGroup so history reads the true choice.
  const deliveryIds = new Set(plan.delivery.map((g) => g.seller.id));

  const placedGroups: PlacedGroup[] = groups.map((g) => ({
    sellerId: g.seller.id,
    sellerName: g.seller.name,
    area: g.seller.area,
    contactName: g.seller.contactName,
    lines: g.lines.map((l) => ({
      name: l.listing.name,
      unit: l.listing.unit,
      qty: l.qty,
      lineTotal: l.lineTotal,
    })),
    subtotal: g.subtotal,
    fulfillment: deliveryIds.has(g.seller.id) ? "delivery" : "pickup",
  }));

  return {
    ref,
    placedAtOffset,
    groups: placedGroups,
    delivery: plan.hasDelivery
      ? { tier, fee: plan.deliveryFee, window: plan.deliveryWindow }
      : null,
    payment,
    itemsTotal: plan.itemsTotal,
    total: plan.total,
    narration: narrate(plan),
  };
}
