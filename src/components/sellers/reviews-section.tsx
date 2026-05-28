"use client";

import { useState } from "react";
import type { Review } from "@/lib/data/types";
import type { ReviewStats } from "@/lib/data/reviews";
import { ReviewCard } from "./review-card";

const VISIBLE = 3;

/**
 * Reviews as UGC — the buyer voice that extends the seller's story. Header
 * carries the computed star average; the list shows three, then a "Show all".
 * A seller with no reviews gets an editorial empty state rather than a blank.
 */
export function ReviewsSection({
  reviews,
  stats,
  sellerName,
}: {
  reviews: Review[];
  stats: ReviewStats;
  sellerName: string;
}) {
  const [showAll, setShowAll] = useState(false);
  const shown = showAll ? reviews : reviews.slice(0, VISIBLE);

  return (
    <section className="pt-[32px]">
      <div className="px-[24px] pb-[14px] font-mono text-[10px] uppercase tracking-[0.14em] text-mid-forest">
        Reviews
        {stats.count > 0 ? (
          <>
            {" · "}
            <span className="text-forest">★ {stats.average.toFixed(1)}</span>
            {" · "}
            {stats.count} {stats.count === 1 ? "review" : "reviews"}
          </>
        ) : null}
      </div>

      {stats.count === 0 ? (
        <div className="mx-[24px] rounded-[14px] border border-sage-shadow/25 bg-cream-warm px-[20px] py-[28px] text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-mid-forest">
            Too new for reviews · Be the first
          </p>
          <p className="mt-[8px] text-[13px] leading-[1.5] text-charcoal">
            No one&rsquo;s written about {sellerName} yet. After your first pickup, you can.
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-[12px] px-[24px]">
            {shown.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
          {reviews.length > VISIBLE && !showAll ? (
            <div className="px-[24px] pt-[14px]">
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="inline-flex min-h-[44px] items-center font-mono text-[10px] uppercase tracking-[0.12em] text-forest active:opacity-60"
              >
                Show all {reviews.length} reviews
              </button>
            </div>
          ) : null}
        </>
      )}
    </section>
  );
}
