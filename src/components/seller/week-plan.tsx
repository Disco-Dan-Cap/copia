import type { WeekDay, PlanEvent } from "@/lib/data/dashboard";
import type { Order } from "@/lib/data/types";
import { cn } from "@/lib/utils";

function Ev({ kind, children }: { kind: PlanEvent["kind"] | "pickup"; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-[3px] px-[5px] py-[3px] text-[9.5px] font-medium leading-[1.2] text-cream",
        kind === "harvest" ? "bg-terracotta" : kind === "plant" ? "bg-sage" : "bg-forest",
      )}
    >
      {children}
    </div>
  );
}

/**
 * The week's plan — seven days, today in mint. Pickups are derived from real
 * orders; the harvest/plant/weather events are seeded demo content. Mobile is a
 * scroll-snap strip (pure CSS, no swiper library); desktop is a 7-column grid.
 */
export function WeekPlan({
  week,
  events,
  orders,
  rangeLabel,
}: {
  week: WeekDay[];
  events: PlanEvent[];
  orders: Order[];
  rangeLabel: string;
}) {
  return (
    <section>
      <div className="mb-[12px] flex items-baseline justify-between">
        <h2 className="text-[16px] font-semibold tracking-[-0.015em] text-deepest-forest">
          This week&rsquo;s plan
        </h2>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-mid-forest">
          {rangeLabel}
        </span>
      </div>

      <div className="scroll-x-momentum flex snap-x snap-mandatory gap-[8px] overflow-x-auto lg:grid lg:grid-cols-7 lg:overflow-visible">
        {week.map((day) => {
          const pickupCount = orders.filter((o) => o.dayOffset === day.offset).length;
          const dayEvents = events.filter((e) => e.dayOffset === day.offset);
          return (
            <div
              key={day.offset}
              className={cn(
                "min-h-[88px] w-[124px] shrink-0 snap-start rounded-[8px] border p-[10px] lg:w-auto",
                day.isToday ? "border-sage bg-mint" : "border-sage-shadow/25 bg-cream-warm",
              )}
            >
              <div
                className={cn(
                  "mb-[8px] font-mono text-[10px] uppercase tracking-[0.12em]",
                  day.isToday ? "font-medium text-deepest-forest" : "text-mid-forest",
                )}
              >
                {day.dayLabel} {day.dateLabel}
                {day.isToday ? " · Today" : ""}
              </div>
              <div className="flex flex-col gap-[4px]">
                {pickupCount > 0 ? (
                  <Ev kind="pickup">
                    {pickupCount} pickup{pickupCount === 1 ? "" : "s"}
                  </Ev>
                ) : null}
                {dayEvents.map((e, i) => (
                  <Ev key={i} kind={e.kind}>
                    {e.label}
                  </Ev>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
