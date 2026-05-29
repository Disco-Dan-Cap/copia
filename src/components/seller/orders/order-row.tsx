import Link from "next/link";
import type { Order } from "@/lib/data/types";
import { listingById } from "@/lib/data/listings";
import { orderTotal } from "@/lib/data/orders";
import { fulfillmentLabels } from "@/lib/data/labels";
import { relativeDayLabel } from "@/lib/order-format";
import { cn } from "@/lib/utils";
import { OrderStatusTag } from "./order-status-tag";

/**
 * One order as a log entry — NOT a table row. No action buttons live here; the
 * whole entry is the tap target and the verbs wait on the detail screen. That's
 * the editorial line this screen exists to hold: a daily log, not a spreadsheet.
 * Hairline-divided, the same register as the search-demand rows.
 */
export function OrderRow({
  order,
  now,
  sellerId,
}: {
  order: Order;
  now: Date;
  sellerId: string;
}) {
  const listing = listingById(order.listingId);
  const name = listing?.name ?? "Listing";
  const total = orderTotal(order);
  const canceled = order.status === "canceled";
  // Today's orders carry a real pickup hour; others fall back to the day label.
  const when = order.pickupTime ?? relativeDayLabel(now, order.dayOffset);

  return (
    <Link
      href={`/seller/orders/${order.id}?as=${sellerId}`}
      className="block border-t border-forest/15 py-[18px] transition-opacity first:border-t-0 first:pt-0 active:opacity-60"
    >
      <div className="flex items-baseline justify-between gap-[12px]">
        <h3
          className={cn(
            "text-[17px] font-medium tracking-[-0.01em] text-deepest-forest",
            canceled && "text-mid-forest line-through",
          )}
        >
          {order.buyer}
        </h3>
        <OrderStatusTag status={order.status} className="shrink-0" />
      </div>
      <div className={cn("mt-[3px] text-[14px] text-mid-forest", canceled && "line-through")}>
        {order.quantity} × {name} · ${total}
      </div>
      <div className="mt-[6px] font-mono text-[10px] uppercase tracking-[0.1em] text-sage-shadow">
        {fulfillmentLabels[order.fulfillment]} · {when}
      </div>
      {order.note ? (
        <p className="mt-[8px] max-w-[520px] font-emphasis text-[14px] italic leading-[1.5] text-mid-forest">
          “{order.note}”
        </p>
      ) : null}
    </Link>
  );
}
