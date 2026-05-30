"use client";

import Link from "next/link";
import type { Listing } from "@/lib/data/types";
import { priceLabel, listingStatus } from "@/lib/data/listings";
import { StatusWord } from "./status-word";

/**
 * One listing on the management board — a hairline log row (the Day-7 register),
 * not a spreadsheet cell. The left block (swatch + name + meta) links to the
 * edit surface; the status word sits outside that link as its own control, so
 * the row carries a quick verb without an action column and without nesting a
 * button inside an anchor. Seed and session-created listings both link — the
 * edit route resolves either from the store. (`href` stays optional as a guard.)
 */
export function ListingBoardRow({
  listing,
  month,
  href,
  onStatus,
}: {
  listing: Listing;
  month: number;
  href?: string;
  onStatus: (status: NonNullable<Listing["status"]>) => void;
}) {
  const inSeason = listing.peakMonths.includes(month);

  const left = (
    <>
      <span
        className="h-[40px] w-[40px] shrink-0 rounded-[8px]"
        style={{ backgroundImage: `linear-gradient(135deg, ${listing.gradient[0]} 0%, ${listing.gradient[1]} 100%)` }}
      />
      <span className="min-w-0">
        <span className="block truncate text-[16px] font-medium tracking-[-0.01em] text-deepest-forest">
          {listing.name || "Untitled"}
        </span>
        <span className="mt-[2px] flex gap-[8px] font-mono text-[9.5px] uppercase tracking-[0.1em] text-mid-forest">
          <span className="text-forest">{priceLabel(listing)}</span>
          <span aria-hidden>·</span>
          <span>{inSeason ? "In season" : "Out of season"}</span>
        </span>
      </span>
    </>
  );

  return (
    <div className="flex items-center justify-between gap-[12px] border-t border-forest/15 py-[14px] first:border-t-0 first:pt-0">
      {href ? (
        <Link href={href} className="flex min-w-0 flex-1 items-center gap-[12px] transition-opacity active:opacity-60">
          {left}
        </Link>
      ) : (
        <div className="flex min-w-0 flex-1 items-center gap-[12px]">{left}</div>
      )}
      <StatusWord status={listingStatus(listing)} onChange={onStatus} className="shrink-0" />
    </div>
  );
}
