"use client";

import Link from "next/link";
import { BasketIcon } from "@/components/ui/icons";
import { useBasketCount } from "@/lib/basket/store";

/**
 * The basket affordance in the buyer header. The count is quiet mono chrome set
 * beside the mark — never a red notification bubble (terracotta is reserved for
 * true alerts, directive §65). Zero in the basket shows the mark alone.
 */
export function BasketLink() {
  const count = useBasketCount();

  return (
    <Link
      href="/basket"
      aria-label={count > 0 ? `Basket — ${count} ${count === 1 ? "item" : "items"}` : "Basket — empty"}
      className="flex min-h-[44px] items-center gap-[6px] text-forest transition-opacity active:opacity-60"
    >
      <BasketIcon className="h-[22px] w-[22px]" />
      {count > 0 ? (
        <span className="font-mono text-[11px] tabular-nums tracking-[0.04em] text-mid-forest">
          {count}
        </span>
      ) : null}
    </Link>
  );
}
