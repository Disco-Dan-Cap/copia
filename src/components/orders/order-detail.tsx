"use client";

import Link from "next/link";
import { BackButton } from "@/components/app/back-button";
import { LeafMark } from "@/components/ui/leaf-mark";
import { usePlacedOrderByRef, type PlacedOrder } from "@/lib/orders/store";
import { orderStatusWords } from "@/lib/orders/status";
import { relativeDayLabel } from "@/lib/order-format";
import { ArrangementNote } from "./arrangement-note";

// The order detail — the Day-16 confirmation note, reopened from data. Resolves
// store-first (a session-created order wins) with the seeded order as the SSR
// fallback prop, mirroring the listings-edit pattern. A ref that resolves to
// nothing (e.g. a hard reload onto a session order's URL after the store reset)
// gets a calm "isn't here" rather than a hard 404.
export function OrderDetail({
  orderRef,
  seedOrder,
}: {
  orderRef: string;
  seedOrder: PlacedOrder | null;
}) {
  const order = usePlacedOrderByRef(orderRef) ?? seedOrder;

  if (!order) return <NotHere />;

  const eyebrow = `${orderStatusWords(order)} — ${relativeDayLabel(new Date(), order.placedAtOffset)}`;

  const footer = (
    <Link
      href="/orders"
      className="mt-[24px] inline-flex min-h-[44px] items-center gap-[6px] font-mono text-[11px] uppercase tracking-[0.14em] text-forest underline decoration-forest/30 underline-offset-4 transition-opacity active:opacity-60"
    >
      Back to your orders
      <span aria-hidden>→</span>
    </Link>
  );

  return (
    <main className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
      <div className="safe-top px-[16px] pt-[12px]">
        <BackButton />
      </div>
      <ArrangementNote order={order} eyebrow={eyebrow} headline="Your arrangement." footer={footer} />
    </main>
  );
}

function NotHere() {
  return (
    <main className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
      <div className="flex min-h-full flex-col items-center justify-center px-[32px] pb-[60px] text-center">
        <LeafMark className="h-[40px] w-[29px] text-sage opacity-80" />
        <p className="mt-[20px] font-display text-[24px] font-bold leading-[1.15] tracking-[-0.02em] text-forest">
          This arrangement isn&rsquo;t here.
        </p>
        <p className="mt-[8px] text-[15px] leading-[1.5] text-mid-forest">
          It may have been placed in another session.
        </p>
        <Link
          href="/orders"
          className="mt-[22px] inline-flex min-h-[44px] items-center gap-[6px] font-mono text-[11px] uppercase tracking-[0.14em] text-forest underline decoration-forest/30 underline-offset-4 transition-opacity active:opacity-60"
        >
          Your orders
          <span aria-hidden>→</span>
        </Link>
      </div>
    </main>
  );
}
