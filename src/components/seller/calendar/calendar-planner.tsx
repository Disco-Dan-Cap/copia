"use client";

import type { PlanEvent, WeatherDay, WeekDay } from "@/lib/data/dashboard";
import type { Order } from "@/lib/data/types";
import { CalendarDay } from "./calendar-day";
import { addPlanEvent, removePlanEvent, resolvePlanEvents, usePlanOverrides } from "./plan-store";

/**
 * The two-week planner — "This week" + "Next week" as mono-caps editorial
 * sections (not filter chrome), each a vertical agenda of days. Owns the
 * optimistic plan-event store so notes add and seeded events delete live; a
 * hard reload resets to the seed.
 */
export function CalendarPlanner({
  sellerId,
  weeks,
  seedEvents,
  orders,
  weatherWeek,
  summaries,
}: {
  sellerId: string;
  weeks: WeekDay[][];
  seedEvents: PlanEvent[];
  orders: Order[];
  weatherWeek: WeatherDay[];
  summaries: Record<number, string>;
}) {
  const overrides = usePlanOverrides();
  const events = resolvePlanEvents(seedEvents, overrides);
  const sections = [
    { key: "this", label: "This week", week: weeks[0] },
    { key: "next", label: "Next week", week: weeks[1] },
  ].filter((s) => s.week);

  return (
    <div className="flex flex-col gap-[30px]">
      {sections.map((section) => (
        <section key={section.key}>
          <div className="mb-[6px] font-mono text-[10px] uppercase tracking-[0.16em] text-mid-forest">
            {section.label}
          </div>
          <div>
            {section.week.map((day) => (
              <CalendarDay
                key={day.offset}
                day={day}
                orders={orders}
                events={events.filter((e) => e.dayOffset === day.offset)}
                summary={summaries[day.offset] ?? null}
                weatherDay={
                  day.offset >= 0 && day.offset < weatherWeek.length ? weatherWeek[day.offset] : null
                }
                sellerId={sellerId}
                onAdd={(dayOffset, label) => addPlanEvent({ dayOffset, label, kind: "note" })}
                onDelete={removePlanEvent}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
