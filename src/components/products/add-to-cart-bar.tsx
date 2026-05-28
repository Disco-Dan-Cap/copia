"use client";

import { useState } from "react";
import type { Listing } from "@/lib/data/types";

const MIN = 1;
const MAX = 12;

/**
 * Bottom action bar. The quantity stepper is genuinely interactive (local
 * state, live total) so it reads like a real product; "Add to cart" is inert
 * per the Day-3 pattern — pressable with an :active state, no cart yet.
 *
 * Rendered as a flex item above the tab bar (not sticky), so it's always
 * visible and the tab bar below owns the home-indicator safe area. Solid cream
 * + a top hairline — no backdrop blur.
 */
export function AddToCartBar({ listing }: { listing: Listing }) {
  const [qty, setQty] = useState(MIN);
  const total = listing.price * qty;

  return (
    <div className="shrink-0 border-t border-forest/12 bg-cream px-[20px] pt-[10px] pb-[10px]">
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
          className="flex h-[48px] flex-1 items-center justify-center gap-[8px] rounded-full bg-forest text-[14px] font-semibold text-cream transition-transform active:scale-[0.98]"
        >
          Add to cart
          <span className="opacity-80">·</span>
          <span className="tabular-nums">${total}</span>
        </button>
      </div>
    </div>
  );
}
