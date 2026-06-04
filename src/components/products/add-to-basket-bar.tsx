"use client";

import { useState } from "react";
import Link from "next/link";
import type { Listing } from "@/lib/data/types";
import { addItem, useBasketQty } from "@/lib/basket/store";

const MIN = 1;
const MAX = 12;

/**
 * Bottom action bar. The quantity stepper sets how many to add; "Add to basket"
 * puts them in the basket and settles, in place, into a calm acknowledgment —
 * "In your basket · 2" — with a quiet way through to the basket. No toast, no
 * flying basket, no slide-in drawer: the button itself is the receipt.
 *
 * Rendered as a flex item above the tab bar (not sticky). Solid cream + a top
 * hairline — no backdrop blur.
 */
export function AddToBasketBar({ listing }: { listing: Listing }) {
  const [qty, setQty] = useState(MIN);
  const inBasket = useBasketQty(listing.id);
  const total = listing.price * qty;

  return (
    <div className="shrink-0 border-t border-forest/12 bg-cream px-[20px] pt-[10px] pb-[10px]">
      {inBasket > 0 ? (
        <div className="mb-[8px] flex items-center justify-center">
          <Link
            href="/basket"
            className="flex min-h-[36px] items-center gap-[6px] font-mono text-[10.5px] uppercase tracking-[0.14em] text-mid-forest underline decoration-mid-forest/30 underline-offset-4 transition-opacity active:opacity-60"
          >
            View basket
            <span aria-hidden>→</span>
          </Link>
        </div>
      ) : null}

      <div className="flex items-center gap-[12px]">
        <div className="flex items-center rounded-full border border-sage-shadow/40">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(MIN, q - 1))}
            disabled={qty <= MIN}
            aria-label="Decrease quantity"
            className="flex h-[44px] w-[40px] items-center justify-center rounded-l-full text-[20px] leading-none text-forest transition-colors active:bg-sage-shadow/10 disabled:opacity-30"
          >
            −
          </button>
          <span className="min-w-[58px] text-center text-[13px] font-semibold tabular-nums text-deepest-forest">
            {qty} {listing.unit}
          </span>
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(MAX, q + 1))}
            disabled={qty >= MAX}
            aria-label="Increase quantity"
            className="flex h-[44px] w-[40px] items-center justify-center rounded-r-full text-[20px] leading-none text-forest transition-colors active:bg-sage-shadow/10 disabled:opacity-30"
          >
            +
          </button>
        </div>
        <button
          type="button"
          onClick={() => addItem(listing, qty)}
          className="flex h-[48px] flex-1 items-center justify-center gap-[8px] rounded-full bg-forest text-[14px] font-semibold text-cream transition-transform active:scale-[0.98]"
        >
          {inBasket > 0 ? (
            <>
              In your basket
              <span className="opacity-70" aria-hidden>·</span>
              <span className="tabular-nums">{inBasket}</span>
            </>
          ) : (
            <>
              Add to basket
              <span className="opacity-70" aria-hidden>·</span>
              <span className="tabular-nums">${total}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
