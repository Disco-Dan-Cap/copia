"use client";

import { useState } from "react";
import Link from "next/link";
import type { OrderStatus } from "@/lib/data/types";
import { OrderStatusTag } from "./order-status-tag";
import { OrderTimeline } from "./order-timeline";

/**
 * The status island — the one interactive part of the detail. Holds the order's
 * status in local state so the seller's actions feel live (3B): Confirm / Mark
 * completed / Cancel flip the status, the tag, and the timeline immediately. No
 * backend yet, so it's optimistic only and resets on reload — honest about the
 * stub. "Message {buyer}" now links to the buyer's correspondence thread.
 */
const PRIMARY =
  "rounded-[8px] bg-forest px-[18px] py-[10px] text-[13px] font-medium text-cream transition-transform active:scale-[0.98]";
const SECONDARY =
  "rounded-[8px] border border-forest/30 px-[18px] py-[10px] text-[13px] font-medium text-forest transition active:scale-[0.98] active:opacity-70";
const DESTRUCTIVE =
  "font-mono text-[10.5px] uppercase tracking-[0.14em] text-sage-shadow transition-opacity active:opacity-60";

export function OrderLifecycle({
  initialStatus,
  buyerFirst,
  scheduledWhen,
  messageHref,
}: {
  initialStatus: OrderStatus;
  buyerFirst: string;
  scheduledWhen: string;
  messageHref?: string;
}) {
  const [status, setStatus] = useState<OrderStatus>(initialStatus);

  return (
    <div className="flex flex-col gap-[20px]">
      <OrderStatusTag status={status} />

      <OrderTimeline status={status} scheduledWhen={scheduledWhen} />

      <div className="flex flex-wrap items-center gap-x-[18px] gap-y-[14px] pt-[2px]">
        {status === "awaiting" ? (
          <button type="button" className={PRIMARY} onClick={() => setStatus("confirmed")}>
            Confirm this order
          </button>
        ) : null}
        {status === "confirmed" ? (
          <button type="button" className={PRIMARY} onClick={() => setStatus("completed")}>
            Mark completed
          </button>
        ) : null}

        {status === "awaiting" || status === "confirmed" ? (
          messageHref ? (
            <Link href={messageHref} className={SECONDARY}>
              Message {buyerFirst}
            </Link>
          ) : (
            <button type="button" className={SECONDARY}>
              Message {buyerFirst}
            </button>
          )
        ) : null}

        {status === "awaiting" || status === "confirmed" ? (
          <button type="button" className={DESTRUCTIVE} onClick={() => setStatus("canceled")}>
            Cancel order
          </button>
        ) : null}

        {status === "completed" ? (
          <p className="text-[13.5px] text-mid-forest">
            Done — thanks for taking good care of this one.
          </p>
        ) : null}
        {status === "canceled" ? (
          <p className="text-[13.5px] text-mid-forest">
            This order was canceled. Nothing more to do here.
          </p>
        ) : null}
      </div>
    </div>
  );
}
