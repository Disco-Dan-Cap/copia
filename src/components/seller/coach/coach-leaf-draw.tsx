"use client";

import { motion, useReducedMotion } from "motion/react";
import { LeafMark } from "@/components/ui/leaf-mark";
import { COPIA_MARK_PATHS, COPIA_MARK_VIEWBOX } from "@/components/ui/copia-mark";

// The Coach's one motion moment, and the screen's load-bearing editorial detail:
// the leaf mark drawing itself, slowly, while the Coach composes. NOT a spinner,
// NOT an ellipsis, NOT a shimmer skeleton — the brand's own mark, traced once and
// breathing. Each of the five leaf strokes draws in over a beat, staggered, then
// eases back, so the wait reads as a hand setting type rather than a system
// stalling. Reduced motion gets the mark, still and filled, with no animation.
export function CoachLeafDraw({
  label = "Reading your plot — your orders, the forecast, what East Austin's searching.",
}: {
  label?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <div className="flex flex-col items-center gap-[16px] py-[28px]" role="status" aria-live="polite">
      {reduce ? (
        <LeafMark className="h-[44px] w-[32px] text-forest opacity-80" />
      ) : (
        <svg
          viewBox={COPIA_MARK_VIEWBOX}
          className="h-[48px] w-[35px] text-forest"
          fill="none"
          stroke="currentColor"
          strokeWidth={14}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {COPIA_MARK_PATHS.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              initial={{ pathLength: 0, opacity: 0.25 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 1.6,
                ease: "easeInOut",
                delay: i * 0.14,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 0.5,
              }}
            />
          ))}
        </svg>
      )}
      <span className="max-w-[280px] text-center font-mono text-[10px] uppercase leading-[1.5] tracking-[0.12em] text-mid-forest">
        {label}
      </span>
    </div>
  );
}
