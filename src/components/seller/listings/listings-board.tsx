"use client";

import { useState } from "react";
import Link from "next/link";
import type { Listing } from "@/lib/data/types";
import { listingStatus } from "@/lib/data/listings";
import { formatEditorialCount } from "@/lib/format";
import { cn } from "@/lib/utils";
import { ListingBoardRow } from "./listing-board-row";
import { applyEdit, resolveBoardListings, useBoardOverrides } from "./store";

// The full management board — the roomier version of the dashboard's listings
// preview. A status filter (reused pattern) over a hairline row stream, with the
// live count reflecting session creates/deletes. Status flips happen on the row
// via the status word; everything else lives on the edit surface.

type Filter = "all" | "active" | "sold-out" | "paused";

const TABS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "sold-out", label: "Sold out" },
  { key: "paused", label: "Paused" },
];

export function ListingsBoard({
  sellerId,
  seedListings,
  month,
}: {
  sellerId: string;
  seedListings: Listing[];
  month: number;
}) {
  const overrides = useBoardOverrides();
  const listings = resolveBoardListings(sellerId, seedListings, overrides);
  const [filter, setFilter] = useState<Filter>("all");
  const shown = filter === "all" ? listings : listings.filter((l) => listingStatus(l) === filter);

  return (
    <section className="flex flex-col gap-[18px]">
      <div className="flex flex-wrap items-baseline justify-between gap-y-[10px]">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mid-forest">
          {formatEditorialCount(listings.length)} total
        </p>
        <div className="flex gap-[4px]">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setFilter(t.key)}
              aria-pressed={filter === t.key}
              className={cn(
                "rounded-full px-[10px] py-[6px] font-mono text-[9.5px] uppercase tracking-[0.1em] transition-colors",
                filter === t.key ? "bg-forest text-cream" : "text-mid-forest active:bg-sage-shadow/10",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {shown.length === 0 ? (
        <p className="max-w-[520px] text-[15px] leading-[1.55] text-mid-forest">
          {listings.length === 0
            ? "Quiet here. New ground — add your first listing below."
            : `Nothing marked “${TABS.find((t) => t.key === filter)?.label.toLowerCase()}” right now.`}
        </p>
      ) : (
        <div>
          {shown.map((l) => (
            <ListingBoardRow
              key={l.id}
              listing={l}
              month={month}
              href={l.id.startsWith("l-new-") ? undefined : `/seller/listings/${l.id}?as=${sellerId}`}
              onStatus={(status) => applyEdit(l.id, { status })}
            />
          ))}
        </div>
      )}

      <Link
        href={`/seller/listings/new?as=${sellerId}`}
        className="mt-[6px] inline-flex w-fit items-center gap-[8px] border-b border-forest pb-[2px] font-mono text-[10px] uppercase tracking-[0.14em] text-forest transition-opacity active:opacity-60"
      >
        + Add a listing
      </Link>
    </section>
  );
}
