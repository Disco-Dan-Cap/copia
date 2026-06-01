import type { Reading } from "@/lib/coach/types";
import type { CoachDay } from "@/lib/coach/context";
import type { SearchDemand } from "@/lib/data/searches";
import { LeafMark } from "@/components/ui/leaf-mark";
import { LeafWave } from "@/components/ui/leaf-wave";
import { CoachWeekStrip } from "./coach-week-strip";
import { CoachDemand } from "./coach-demand";
import { CoachConsider } from "./coach-consider";
import { CoachAsk } from "./coach-ask";

// The whole composition. A dated, addressed letter — not a chat, not a card
// stack. The reading prose is the Coach's (Claude's) judgment; the strip and
// demand list beside it are fact from seed. The attribution lives at the foot:
// the Coach signs in its role (never a fabricated human name), the leaf mark
// sits as a wax-seal colophon, and a single honest line discloses what the
// Coach is — that disclosure IS the attribution, in place of any "Powered by"
// chrome. The reading arrives composed; there is no thinking indicator here.
export function CoachLetter({
  sellerId,
  dateline,
  reading,
  days,
  demand,
  area,
}: {
  sellerId: string;
  dateline: string;
  reading: Reading;
  days: CoachDay[];
  demand: SearchDemand[];
  area: string;
}) {
  return (
    <article className="mx-auto flex w-full max-w-[720px] flex-col gap-[24px]">
      {/* Letter opening — the only place the Leaf Wave runs behind the prose */}
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
          <p className="mb-[16px] font-emphasis text-[20px] italic leading-[1.3] text-forest">
            {reading.salutation}
          </p>
          <div className="flex flex-col gap-[14px]">
            {reading.paragraphs.map((p, i) => (
              <p key={i} className="text-[15px] leading-[1.65] text-charcoal">
                {p}
              </p>
            ))}
          </div>
        </div>
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
    </article>
  );
}
