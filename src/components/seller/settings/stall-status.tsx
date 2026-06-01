"use client";

import { EditableText } from "@/components/seller/listings/editable-text";
import { setStallField, useStallEdits } from "./store";

/**
 * The hero, and the genre inversion: every settings screen ever made ends in a
 * red "Danger Zone." Copia ends in a note pinned to the stall. This sits in the
 * exact structural spot the destructive section would — the bottom of the
 * ledger — but reads as a sentence in the grower's own hand. Open is a quiet
 * forest line; paused is the single terracotta spike on the page, with the
 * "till…" written inline (the Day-8 editable primitive, reused).
 *
 * It extends the listing StatusWord idea up a level — the word the grower
 * already reads is the control — but at storefront scale instead of per-listing.
 * Honest scope: this sets a state shown on this surface; it does not actually
 * hide listings buyer-side (a Supabase concern), same as every other Day-12 edit.
 */
export function StallStatus({
  sellerId,
  defaultReason,
}: {
  sellerId: string;
  defaultReason: string;
}) {
  const edits = useStallEdits(sellerId);
  const paused = edits.paused ?? false;
  const reason = edits.pauseReason ?? defaultReason;

  return (
    <div className="flex items-start gap-[12px]">
      <span
        className={`mt-[11px] inline-block h-[7px] w-[7px] shrink-0 rounded-full ${
          paused ? "bg-terracotta" : "bg-forest"
        }`}
        aria-hidden
      />
      <div className="min-w-0">
        {paused ? (
          <p className="text-[22px] leading-[1.35] tracking-[-0.01em] lg:text-[24px]">
            <span className="font-medium text-terracotta">Closed </span>
            <EditableText
              value={reason}
              onChange={(v) => setStallField(sellerId, { pauseReason: v })}
              ariaLabel="Why the stall is closed"
              placeholder="till the season turns"
              inline
              className="text-[22px] text-deepest-forest lg:text-[24px]"
            />
            <span className="text-deepest-forest">.</span>
          </p>
        ) : (
          <p className="text-[22px] leading-[1.35] tracking-[-0.01em] text-deepest-forest lg:text-[24px]">
            The stall is open.
          </p>
        )}

        <button
          type="button"
          onClick={() => setStallField(sellerId, { paused: !paused })}
          className={`mt-[14px] inline-flex items-center gap-[6px] font-mono text-[10px] uppercase tracking-[0.14em] transition-opacity active:opacity-60 ${
            paused ? "text-forest" : "text-mid-forest"
          }`}
        >
          {paused ? "Reopen the stall" : "Close the stall"} <span aria-hidden>→</span>
        </button>
      </div>
    </div>
  );
}
