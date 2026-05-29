import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { orderById, orderTotal } from "@/lib/data/orders";
import { listingById } from "@/lib/data/listings";
import { fulfillmentLabels } from "@/lib/data/labels";
import { relativeDayLabel, scheduledWhen } from "@/lib/order-format";
import { OrderLifecycle } from "@/components/seller/orders/order-lifecycle";

// Per-request: the timeline's day labels track the visitor's real date.
export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Order" };

type Params = { params: Promise<{ id: string }>; searchParams: Promise<{ as?: string }> };

const FACT_LABEL = "font-mono text-[9.5px] uppercase tracking-[0.14em] text-mid-forest";
const FACT_VALUE = "mt-[3px] text-[15px] text-deepest-forest";

export default async function OrderDetailPage({ params, searchParams }: Params) {
  const { id } = await params;
  const { as } = await searchParams;
  const order = orderById(id);
  if (!order) notFound();

  const listing = listingById(order.listingId);
  const name = listing?.name ?? "Listing";
  const total = orderTotal(order);
  const now = new Date();

  // Identity carries through to the back link; fall back to this order's own
  // seller so the link is always coherent.
  const backAs = as ?? listing?.sellerId ?? "";
  const buyerFirst = order.buyer.split(" ")[0];
  const dayLabel = relativeDayLabel(now, order.dayOffset);
  const when = scheduledWhen(now, order.dayOffset, order.pickupTime);

  return (
    <div className="flex flex-col gap-[28px] px-[24px] pb-[48px] pt-[16px] lg:px-[44px] lg:pt-[28px]">
      <Link
        href={`/seller/orders${backAs ? `?as=${backAs}` : ""}`}
        className="inline-flex items-center gap-[6px] font-mono text-[10px] uppercase tracking-[0.14em] text-mid-forest transition-opacity active:opacity-60"
      >
        <span aria-hidden>←</span> All orders
      </Link>

      <header className="max-w-[600px]">
        <p className="eyebrow mb-[10px]">
          {fulfillmentLabels[order.fulfillment]} · {dayLabel}
        </p>
        <h1 className="text-[30px] font-bold leading-[1.08] tracking-[-0.03em] text-deepest-forest lg:text-[36px]">
          {buyerFirst}&rsquo;s {name.toLowerCase()}.
        </h1>
      </header>

      <dl className="grid max-w-[600px] grid-cols-2 gap-x-[20px] gap-y-[20px] border-y border-forest/20 py-[22px] sm:grid-cols-4">
        <div>
          <dt className={FACT_LABEL}>Buyer</dt>
          <dd className={FACT_VALUE}>{order.buyer}</dd>
        </div>
        <div>
          <dt className={FACT_LABEL}>Quantity</dt>
          <dd className={FACT_VALUE}>
            {order.quantity} × {listing?.unit ?? "unit"}
          </dd>
        </div>
        <div>
          <dt className={FACT_LABEL}>Total</dt>
          <dd className={FACT_VALUE}>${total}</dd>
        </div>
        <div>
          <dt className={FACT_LABEL}>{order.pickupTime ? "Pickup" : "Scheduled"}</dt>
          <dd className={FACT_VALUE}>{when}</dd>
        </div>
      </dl>

      {order.note ? (
        <figure className="max-w-[560px]">
          <blockquote className="font-emphasis text-[19px] italic leading-[1.45] text-forest">
            “{order.note}”
          </blockquote>
          <figcaption className="mt-[8px] font-mono text-[9.5px] uppercase tracking-[0.14em] text-mid-forest">
            From {order.buyer}
          </figcaption>
        </figure>
      ) : null}

      <OrderLifecycle initialStatus={order.status} buyerFirst={buyerFirst} scheduledWhen={when} />
    </div>
  );
}
