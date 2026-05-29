import type { Review } from "@/lib/data/types";
import { StarIcon } from "@/components/ui/icons";

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

/** "2026-05-17" → "MAY 17" without a Date object (no timezone surprises). */
function formatReviewDate(iso: string): string {
  const [, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}`;
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex shrink-0 items-center gap-[2px]" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon
          key={i}
          className={i < rating ? "h-[11px] w-[11px] text-forest" : "h-[11px] w-[11px] text-sage-shadow/30"}
        />
      ))}
    </span>
  );
}

export function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="rounded-[14px] border border-sage-shadow/25 bg-cream-warm p-[14px]">
      <div className="flex items-start justify-between gap-[10px]">
        <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-mid-forest">
          {review.author} · {review.neighborhood} · {formatReviewDate(review.date)}
        </div>
        <Stars rating={review.rating} />
      </div>
      <p className="mt-[8px] text-[13.5px] leading-[1.5] text-charcoal">{review.body}</p>
    </article>
  );
}
