"use client";

import { useState } from "react";
import Link from "next/link";
import type { Listing } from "@/lib/data/types";
import { listingStatus } from "@/lib/data/listings";
import { formatEditorialCount } from "@/lib/format";
import { cn } from "@/lib/utils";
import { SellerListingCard } from "./seller-listing-card";

type Filter = "all" | "active" | "sold-out" | "paused";

const TABS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "sold-out", label: "Sold out" },
  { key: "paused", label: "Paused" },
];

/**
 * The dashboard's listings section — a real client-side filter on status (not a
 * static screenshot). The full management view is a later route; this is the
 * preview with a working All · Active · Sold out · Paused filter.
 */
export function ListingsPreview({
  listings,
  month,
  manageHref,
}: {
  listings: Listing[];
  month: number;
  manageHref?: string;
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = filter === "all" ? listings : listings.filter((l) => listingStatus(l) === filter);

  const heading = `Your listings · ${formatEditorialCount(listings.length)} total`;

  return (
    <section>
      <div className="mb-[16px] flex flex-wrap items-baseline justify-between gap-y-[8px]">
        {manageHref ? (
          <Link
            href={manageHref}
            className="group inline-flex items-baseline gap-[8px] text-[16px] font-semibold tracking-[-0.015em] text-deepest-forest transition-opacity active:opacity-60"
          >
            {heading}
            <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-forest underline decoration-forest/30 underline-offset-[3px] transition-colors group-hover:decoration-forest">
              Manage →
            </span>
          </Link>
        ) : (
          <h2 className="text-[16px] font-semibold tracking-[-0.015em] text-deepest-forest">
            {heading}
          </h2>
        )}
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
        <p className="rounded-[10px] border border-sage-shadow/25 bg-cream-warm px-[16px] py-[20px] text-[13px] text-mid-forest">
          Nothing {filter === "all" ? "listed" : `marked “${TABS.find((t) => t.key === filter)?.label.toLowerCase()}”`} right now.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-[12px] lg:grid-cols-4">
          {shown.map((l) => (
            <SellerListingCard key={l.id} listing={l} month={month} />
          ))}
        </div>
      )}
    </section>
  );
}
