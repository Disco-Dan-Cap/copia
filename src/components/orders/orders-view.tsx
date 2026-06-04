"use client";

import Link from "next/link";
import { LeafMark } from "@/components/ui/leaf-mark";
import { usePlacedOrders, type PlacedOrder } from "@/lib/orders/store";
import { mergeBuyerOrders } from "@/lib/data/buyer-orders";
import { orderGrowers, orderStatusWords } from "@/lib/orders/status";
import { relativeDayLabel } from "@/lib/order-format";
import { formatEditorialCount } from "@/lib/format";
import { OrdersColophon } from "./orders-colophon";

/**
 * The buyer's record — a ledger of arrangements, not an order-tracking dashboard.
 * Each entry restates the plan in the buyer's own register and carries plain-word
 * status (never a colored pill, never a progress meter). Newest first: this
 * session's settled orders layered over the seeded history.
 */
export function OrdersView() {
  const created = usePlacedOrders();
  const orders = mergeBuyerOrders(created);

  if (orders.length === 0) return <EmptyRecord />;

  const count = `${formatEditorialCount(orders.length).toLowerCase()} ${orders.length === 1 ? "arrangement" : "arrangements"}`;

  return (
    <main className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
      <header className="safe-top px-[24px] pt-[18px] pb-[8px]">
        <h1 className="font-display text-[30px] font-bold leading-[1.05] tracking-[-0.03em] text-forest">
          Your orders
        </h1>
        <p className="mt-[6px] font-mono text-[10.5px] uppercase tracking-[0.14em] text-mid-forest">
          {count}
        </p>
      </header>

      <div className="flex flex-col gap-[12px] px-[24px] pb-[20px] pt-[14px]">
        {orders.map((order) => (
          <OrderRow key={order.ref} order={order} />
        ))}
      </div>

      <OrdersColophon />
      <div className="h-[24px]" />
    </main>
  );
}

function OrderRow({ order }: { order: PlacedOrder }) {
  return (
    <Link
      href={`/orders/${order.ref}`}
      className="block rounded-[14px] border border-sage-shadow/25 bg-cream-warm p-[16px] transition-transform active:scale-[0.99]"
    >
      <div className="flex items-baseline justify-between gap-[12px]">
        <span className="text-[15px] font-semibold leading-[1.25] tracking-[-0.01em] text-deepest-forest">
          {orderGrowers(order)}
        </span>
        <span className="shrink-0 font-mono text-[9.5px] uppercase tracking-[0.12em] text-sage-shadow">
          {relativeDayLabel(new Date(), order.placedAtOffset)}
        </span>
      </div>

      {/* The arrangement, restated — the same sentence the page spoke at settle. */}
      <p className="mt-[8px] line-clamp-2 text-[13.5px] leading-[1.5] text-charcoal">
        {order.narration}
      </p>

      <div className="mt-[12px] flex items-baseline justify-between gap-[12px]">
        <span className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-mid-forest">
          {orderStatusWords(order)}
        </span>
        <span className="shrink-0 text-[13px] font-semibold tabular-nums text-deepest-forest">
          ${order.total}
        </span>
      </div>
    </Link>
  );
}

function EmptyRecord() {
  return (
    <main className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
      <div className="flex min-h-full flex-col items-center justify-center px-[32px] pb-[60px] text-center">
        <LeafMark className="h-[40px] w-[29px] text-sage opacity-80" />
        <p className="mt-[20px] font-display text-[24px] font-bold leading-[1.15] tracking-[-0.02em] text-forest">
          No arrangements yet.
        </p>
        <p className="mt-[8px] text-[15px] leading-[1.5] text-mid-forest">
          When you settle up with a grower, it&rsquo;ll keep here.
        </p>
        <Link
          href="/"
          className="mt-[22px] inline-flex min-h-[44px] items-center gap-[6px] font-mono text-[11px] uppercase tracking-[0.14em] text-forest underline decoration-forest/30 underline-offset-4 transition-opacity active:opacity-60"
        >
          See what&rsquo;s near you
          <span aria-hidden>→</span>
        </Link>
      </div>
    </main>
  );
}
