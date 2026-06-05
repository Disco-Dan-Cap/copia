"use client";

import Link from "next/link";
import { LeafMark } from "@/components/ui/leaf-mark";
import { PhotoFill } from "@/components/media/photo-fill";
import { priceLabel } from "@/lib/data/listings";
import { formatEditorialCount } from "@/lib/format";
import {
  removeItem,
  setQty,
  useGroupedBasket,
  type BasketGroup,
  type BasketLine,
} from "@/lib/basket/store";

const MIN = 1;
const MAX = 12;

/**
 * The basket — a market list, not a data table. Items group under the grower
 * they came from, because the whole premise is that you're buying from people:
 * the grower group header carries the typographic weight (the stall sign), the
 * items sit quietly beneath it. One grand total; a quiet per-grower subtotal so
 * you can see what each person is owed.
 */
export function BasketView() {
  const { groups, itemCount, total } = useGroupedBasket();

  if (groups.length === 0) return <EmptyBasket />;

  const things = `${formatEditorialCount(itemCount).toLowerCase()} ${itemCount === 1 ? "thing" : "things"}`;
  const growers = `${formatEditorialCount(groups.length).toLowerCase()} ${groups.length === 1 ? "grower" : "growers"}`;

  return (
    <>
      <main className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <header className="safe-top px-[24px] pt-[18px] pb-[8px]">
          <h1 className="font-display text-[30px] font-bold leading-[1.05] tracking-[-0.03em] text-forest">
            Your basket
          </h1>
          <p className="mt-[6px] font-mono text-[10.5px] uppercase tracking-[0.14em] text-mid-forest">
            {things} from {growers}
          </p>
        </header>

        <div className="flex flex-col gap-[30px] px-[24px] pb-[28px] pt-[14px]">
          {groups.map((group) => (
            <GrowerGroup key={group.seller.id} group={group} />
          ))}
        </div>
      </main>

      <SettleBar total={total} />
    </>
  );
}

function GrowerGroup({ group }: { group: BasketGroup }) {
  const { seller, lines, subtotal } = group;

  return (
    <section className="border-t border-forest/12 pt-[22px] first:border-t-0 first:pt-0">
      {/* The stall sign — a small vignette of the grower's plot beside the
          location eyebrow and their name. Line items below stay text-only: a
          market list, not a cart. The avatarGradient is the photo's fallback. */}
      <header className="flex items-center gap-[12px]">
        <div
          className="relative h-[46px] w-[46px] shrink-0 overflow-hidden rounded-[12px]"
          style={{ backgroundImage: `linear-gradient(135deg, ${seller.avatarGradient[0]} 0%, ${seller.avatarGradient[1]} 100%)` }}
        >
          <PhotoFill src={seller.photo} alt={seller.name} />
        </div>
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-sage-shadow">
            {seller.area}
          </p>
          <Link
            href={`/sellers/${seller.id}`}
            className="mt-[3px] inline-block font-display text-[22px] font-bold leading-[1.1] tracking-[-0.02em] text-forest underline decoration-forest/0 underline-offset-4 transition-colors active:decoration-forest/40"
          >
            {seller.name}
          </Link>
        </div>
      </header>

      <ul className="mt-[16px] flex flex-col gap-[18px]">
        {lines.map((line) => (
          <BasketRow key={line.listing.id} line={line} />
        ))}
      </ul>

      {/* Quiet per-grower tally — what this stall is owed. Neutral label so it
          reads right for every grower name (a person or a place alike). */}
      <div className="mt-[16px] flex items-baseline justify-end gap-[8px]">
        <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-sage-shadow">
          Their share
        </span>
        <span className="text-[14px] font-semibold tabular-nums text-deepest-forest">
          ${subtotal}
        </span>
      </div>
    </section>
  );
}

function BasketRow({ line }: { line: BasketLine }) {
  const { listing, qty, lineTotal } = line;

  return (
    <li>
      <div className="flex items-baseline justify-between gap-[12px]">
        <p className="text-[16px] leading-[1.3] text-charcoal">{listing.name}</p>
        <span className="shrink-0 text-[15px] font-semibold tabular-nums text-deepest-forest">
          ${lineTotal}
        </span>
      </div>
      <p className="mt-[2px] font-mono text-[10px] uppercase tracking-[0.1em] text-sage-shadow">
        {priceLabel(listing)}
      </p>

      <div className="mt-[10px] flex items-center justify-between">
        <div className="flex items-center rounded-full border border-sage-shadow/40">
          <button
            type="button"
            onClick={() => setQty(listing.id, qty - 1)}
            disabled={qty <= MIN}
            aria-label={`Decrease ${listing.name}`}
            className="flex h-[44px] w-[40px] items-center justify-center rounded-l-full text-[20px] leading-none text-forest transition-colors active:bg-sage-shadow/10 disabled:opacity-30"
          >
            −
          </button>
          <span className="min-w-[54px] text-center text-[13px] font-semibold tabular-nums text-deepest-forest">
            {qty} {listing.unit}
          </span>
          <button
            type="button"
            onClick={() => setQty(listing.id, qty + 1)}
            disabled={qty >= MAX}
            aria-label={`Increase ${listing.name}`}
            className="flex h-[44px] w-[40px] items-center justify-center rounded-r-full text-[20px] leading-none text-forest transition-colors active:bg-sage-shadow/10 disabled:opacity-30"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={() => removeItem(listing.id)}
          className="inline-flex min-h-[44px] items-center px-[4px] text-[13px] text-mid-forest underline decoration-mid-forest/30 underline-offset-2 transition-opacity active:opacity-60"
        >
          Remove
        </button>
      </div>
    </li>
  );
}

function SettleBar({ total }: { total: number }) {
  return (
    <div className="shrink-0 border-t border-forest/12 bg-cream px-[20px] pt-[12px] pb-[10px]">
      <div className="mb-[10px] flex items-baseline justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-sage-shadow">
          Total
        </span>
        <span className="font-display text-[22px] font-bold tabular-nums tracking-[-0.02em] text-forest">
          ${total}
        </span>
      </div>
      {/* /checkout is stubbed until Day 16 — this will 404 in the meantime. */}
      <Link
        href="/checkout"
        className="flex h-[48px] w-full items-center justify-center rounded-full bg-forest text-[14px] font-semibold text-cream transition-transform active:scale-[0.98]"
      >
        Settle up
      </Link>
    </div>
  );
}

function EmptyBasket() {
  return (
    <main className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
      <div className="flex min-h-full flex-col items-center justify-center px-[32px] pb-[60px] text-center">
        <LeafMark className="h-[40px] w-[29px] text-sage opacity-80" />
        <p className="mt-[20px] font-display text-[24px] font-bold leading-[1.15] tracking-[-0.02em] text-forest">
          Nothing in your basket yet.
        </p>
        <p className="mt-[8px] text-[15px] leading-[1.5] text-mid-forest">
          The market&rsquo;s open.
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
