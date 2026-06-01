"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { Reading } from "@/lib/coach/types";
import type { CoachDay } from "@/lib/coach/context";
import type { SearchDemand } from "@/lib/data/searches";
import { LeafMark } from "@/components/ui/leaf-mark";
import { LeafWave } from "@/components/ui/leaf-wave";
import { CoachWeekStrip } from "./coach-week-strip";
import { CoachDemand } from "./coach-demand";
import { CoachConsider } from "./coach-consider";
import { CoachAsk } from "./coach-ask";
import { CoachLeafDraw } from "./coach-leaf-draw";

// The whole composition. A dated, addressed letter — not a chat, not a card
// stack. The reading prose is the Coach's (Claude's) judgment; the strip and
// demand list beside it are fact from seed. Attribution lives at the foot: the
// Coach signs in its role (never a fabricated human name), the leaf mark sits as
// a wax-seal colophon, and one honest line discloses what the Coach is — that
// disclosure IS the attribution, in place of any "Powered by" chrome.
//
// First paint:
//   • WARM week — the server passes initialReading from cache; the full letter
//     renders immediately, no fetch, no draw ("the letter is already there",
//     51 weeks of 52).
//   • COLD week — initialReading is null; the masthead (dateline + salutation)
//     paints at once, the leaf-mark self-draw runs where the reading will land,
//     and the reading is fetched client-side. On arrival the leaf settles to its
//     filled state, then the composition below the masthead fades in together.
//     This keeps the ~16s compose off the critical first-paint path (D4's
//     loading state, extended to one more path).

type Status = "loading" | "settling" | "ready";

export function CoachLetter({
  sellerId,
  dateline,
  salutation,
  initialReading,
  days,
  demand,
  area,
}: {
  sellerId: string;
  dateline: string;
  salutation: string;
  initialReading: Reading | null;
  days: CoachDay[];
  demand: SearchDemand[];
  area: string;
}) {
  const reduce = useReducedMotion();
  const [reading, setReading] = useState<Reading | null>(initialReading);
  const [status, setStatus] = useState<Status>(initialReading ? "ready" : "loading");
  // Only the client-fetched reveal animates; the server-rendered warm letter is
  // already on screen and must not flash in on hydration. Stable for the
  // component's life (initialReading is a prop that never changes mid-mount).
  const animateIn = initialReading === null;

  useEffect(() => {
    if (initialReading) return;
    let alive = true;
    let settleTimer: ReturnType<typeof setTimeout>;

    (async () => {
      let next: Reading | null = null;
      try {
        const res = await fetch("/api/coach/reading", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sellerId }),
        });
        const data = (await res.json()) as { reading?: Reading };
        next = data.reading ?? null;
      } catch {
        next = null;
      }
      if (!alive || !next) return;
      setReading(next);
      // The leaf settles to filled for a beat, then the letter fades in beneath
      // it. Reduced motion skips the settle and shows the letter at once.
      if (reduce) {
        setStatus("ready");
      } else {
        setStatus("settling");
        settleTimer = setTimeout(() => alive && setStatus("ready"), 480);
      }
    })();

    return () => {
      alive = false;
      clearTimeout(settleTimer);
    };
  }, [initialReading, sellerId, reduce]);

  return (
    <article className="mx-auto flex w-full max-w-[720px] flex-col gap-[24px]">
      {/* Masthead — the letterhead, painted immediately on every path */}
      <div className="relative overflow-hidden">
        <LeafWave
          density="sparse"
          opacity={0.35}
          className="absolute inset-0 h-full w-full text-sage opacity-[0.3]"
        />
        <div className="relative z-[2]">
          <div className="mb-[14px] font-mono text-[9.5px] uppercase tracking-[0.16em] text-mid-forest">
            {dateline}
          </div>
          <p className="font-emphasis text-[20px] italic leading-[1.3] text-forest">{salutation}</p>
        </div>
      </div>

      {/* Body region — leaf-draw while composing, then the settled letter */}
      {status === "loading" ? (
        <CoachLeafDraw />
      ) : status === "settling" ? (
        <motion.div
          className="flex justify-center py-[28px]"
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <LeafMark className="h-[48px] w-[35px] text-forest" />
        </motion.div>
      ) : reading ? (
        <Body
          reading={reading}
          sellerId={sellerId}
          days={days}
          demand={demand}
          area={area}
          animate={animateIn}
          reduce={Boolean(reduce)}
        />
      ) : null}
    </article>
  );
}

function Body({
  reading,
  sellerId,
  days,
  demand,
  area,
  animate,
  reduce,
}: {
  reading: Reading;
  sellerId: string;
  days: CoachDay[];
  demand: SearchDemand[];
  area: string;
  animate: boolean;
  reduce: boolean;
}) {
  const content = (
    <div className="flex flex-col gap-[24px]">
      <div className="flex flex-col gap-[14px]">
        {reading.paragraphs.map((p, i) => (
          <p key={i} className="text-[15px] leading-[1.65] text-charcoal">
            {p}
          </p>
        ))}
      </div>

      <CoachWeekStrip days={days} />

      <CoachDemand demand={demand} area={area} />

      {reading.consider ? <CoachConsider consider={reading.consider} /> : null}

      {/* Signature + wax-seal colophon — the role-named attribution */}
      <div className="flex items-center gap-[12px] border-t border-forest/15 pt-[20px]">
        <LeafMark className="h-[28px] w-[20px] text-forest" />
        <span className="font-emphasis text-[17px] italic text-forest">{reading.signoff}</span>
      </div>

      <CoachAsk sellerId={sellerId} />

      {/* The disclosure — attribution as craft, not a vendor stamp */}
      <p className="border-t border-forest/10 pt-[16px] font-mono text-[9.5px] uppercase leading-[1.7] tracking-[0.1em] text-sage-shadow">
        The Coach reads your plot — your orders, your listings, the forecast, and what your
        neighbors are searching — and writes you a note each week.
      </p>
    </div>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduce ? { duration: 0 } : { duration: 0.5, ease: "easeOut" }}
    >
      {content}
    </motion.div>
  );
}
