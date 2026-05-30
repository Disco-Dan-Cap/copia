import Link from "next/link";
import type { Order } from "@/lib/data/types";
import { listingById } from "@/lib/data/listings";
import { fulfillmentLabels } from "@/lib/data/labels";

/**
 * A pickup on the planner — derived from a real order, so it's read-only but
 * links straight to that order's detail (the Day-7 surface). Pickups never carry
 * the buyer's order note here; notes are day-level only, and the order detail is
 * where the buyer's words live.
 */
export function PickupRow({ order, sellerId }: { order: Order; sellerId: string }) {
  const listing = listingById(order.listingId);
  const name = listing?.name ?? "Listing";
  const meta = order.pickupTime ?? fulfillmentLabels[order.fulfillment];

  return (
    <Link
      href={`/seller/orders/${order.id}?as=${sellerId}`}
      className="flex items-baseline justify-between gap-[10px] py-[3px] transition-opacity active:opacity-60"
    >
      <span className="min-w-0 text-[14px] leading-[1.4] text-mid-forest">
        <span className="font-medium text-deepest-forest">{order.buyer}</span> · {order.quantity} × {name}
      </span>
      <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.1em] text-mid-forest">
        {meta} <span className="text-forest">→</span>
      </span>
    </Link>
  );
}
