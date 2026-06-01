import type { SearchDemand } from "@/lib/data/searches";
import { cn } from "@/lib/utils";

// "What your neighbors are searching" — the demand signal, rendered as a quiet
// editorial table, not a chart. Fact, like the strip: pulled from the same
// search seed the dashboard's Coach Card and the analytics demand-gaps read.
// Rising and new signals carry the single terracotta accent; everything else
// stays in the greens. The letter's prose names the ones that matter; this is
// the scannable record behind it.

const TREND_LABEL: Record<SearchDemand["trend"], string> = {
  rising: "Rising",
  steady: "Steady",
  fading: "Fading",
  new: "New this week",
};

export function CoachDemand({ demand, area }: { demand: SearchDemand[]; area: string }) {
  if (!demand.length) return null;

  return (
    <section>
      <div className="mb-[16px] font-mono text-[10px] uppercase tracking-[0.14em] text-forest">
        What your neighbors are searching
      </div>
      <div className="flex flex-col">
        {demand.map((d) => {
          const spike = d.trend === "rising" || d.trend === "new";
          return (
            <div
              key={d.query}
              className="flex items-baseline justify-between gap-[16px] border-b border-forest/12 pb-[12px] pt-[12px] first:pt-0 last:border-b-0"
            >
              <div className="min-w-0">
                <div className="text-[15px] font-semibold tracking-[-0.01em] text-deepest-forest">
                  {d.query}
                </div>
                <div className="mt-[3px] font-mono text-[9.5px] uppercase tracking-[0.12em] text-mid-forest">
                  {area} · this week
                </div>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-[16px] font-semibold text-forest">{d.weekCount}</div>
                <div
                  className={cn(
                    "mt-[2px] font-mono text-[9px] uppercase tracking-[0.1em]",
                    spike ? "text-terracotta" : "text-mid-forest",
                  )}
                >
                  {TREND_LABEL[d.trend]}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
