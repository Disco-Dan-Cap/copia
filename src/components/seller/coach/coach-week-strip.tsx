import type { CoachDay, CoachTag } from "@/lib/coach/context";
import { cn } from "@/lib/utils";

// The seven-day strip — the letter's second register. Inverts to deepest-forest
// with mint chrome, exactly as the validated hero screen does, which gives the
// cream letter a strong counterpoint and lets the action tags read as color-
// coded chips. This is FACT, not prose: every day, tag, and pickup is rendered
// from the same seed the calendar and dashboard use, so the Coach's letter can
// reference it and a grower can verify it against the same plan.

// Tag colors tuned for legibility on deepest-forest. Actions get a solid chip;
// weather is an outline, since it's a condition the grower reacts to, not a task.
const TAG_STYLE: Record<CoachTag["kind"], string> = {
  pickup: "bg-mint text-deepest-forest",
  harvest: "bg-terracotta text-cream",
  plant: "bg-sage text-deepest-forest",
  water: "bg-light-sage text-deepest-forest",
  market: "bg-cream text-deepest-forest",
  weather: "border border-cream/35 text-cream",
  note: "bg-cream/20 text-cream",
};

export function CoachWeekStrip({ days }: { days: CoachDay[] }) {
  return (
    <section className="relative overflow-hidden rounded-[14px] bg-deepest-forest px-[24px] py-[24px] text-cream">
      <div className="mb-[16px] font-mono text-[9.5px] uppercase tracking-[0.16em] text-mint">
        Your next seven days
      </div>
      <div className="flex flex-col">
        {days.map((day) => (
          <div
            key={day.offset}
            className="flex gap-[18px] border-b border-cream/12 py-[12px] last:border-b-0"
          >
            <div className="w-[58px] shrink-0 pt-[2px] font-mono text-[11px] uppercase tracking-[0.1em] text-mint">
              <strong className={cn("block text-[13px] font-medium", day.isToday ? "text-mint" : "text-cream")}>
                {day.dayLabel} {day.dateLabel}
              </strong>
              {day.isToday ? "Today" : ""}
            </div>
            <div className="flex-1">
              {day.tags.length ? (
                <div className="mb-[6px] flex flex-wrap gap-[6px]">
                  {day.tags.map((tag, i) => (
                    <span
                      key={i}
                      className={cn(
                        "rounded-[3px] px-[6px] py-[2px] font-mono text-[8.5px] uppercase tracking-[0.1em]",
                        TAG_STYLE[tag.kind],
                      )}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
              ) : null}
              <div className="text-[13.5px] leading-[1.4] text-cream/90">
                {day.summary ?? (day.tags.length ? "" : "Nothing on the plan — let the plot rest.")}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
