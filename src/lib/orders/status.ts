import type { PlacedOrder } from "./store";

// Status in plain words — never a colored pill, never a progress meter. A past
// arrangement is told as a thing that happened ("Picked up"); a fresh one as a
// thing about to ("Arriving tomorrow afternoon"). The detail lives in the
// narration; this is just the one-line state.
export function orderStatusWords(order: PlacedOrder): string {
  const past = order.placedAtOffset < 0;
  const hasDelivery = order.delivery !== null;
  const hasPickup = order.groups.some((g) => g.fulfillment === "pickup");

  if (past) {
    if (hasDelivery && hasPickup) return "Picked up & delivered";
    return hasDelivery ? "Delivered" : "Picked up";
  }
  if (hasDelivery && hasPickup) return `Arriving ${order.delivery!.window}, pickup to come`;
  return hasDelivery ? `Arriving ${order.delivery!.window}` : "Ready for pickup";
}

/** The growers on an arrangement, named for a one-line list row. */
export function orderGrowers(order: PlacedOrder): string {
  const names = order.groups.map((g) => g.sellerName);
  if (names.length <= 1) return names[0] ?? "";
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names[0]}, ${names[1]}, and ${names.length - 2} more`;
}
