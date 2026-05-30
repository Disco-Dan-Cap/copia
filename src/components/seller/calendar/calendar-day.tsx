import type { PlanEvent, WeatherDay, WeekDay } from "@/lib/data/dashboard";
import type { Order } from "@/lib/data/types";
import { WeatherGlyph } from "@/components/seller/weather-strip";
import { cn } from "@/lib/utils";
import { PickupRow } from "./pickup-row";
import { PlanEventChip } from "./plan-event-chip";
import { AddNote } from "./add-note";

/**
 * One day in the agenda — a left date gutter (weekday + date, today in forest,
 * past days muted) and a content column: the editorial summary, pickup rows,
 * plan-event chips, and the "+ note" affordance. An empty day reads a quiet
 * "Open." Muting is the only past-day signal — no "(done)" annotation.
 */
export function CalendarDay({
  day,
  orders,
  events,
  summary,
  weatherDay,
  sellerId,
  onAdd,
  onDelete,
}: {
  day: WeekDay;
  orders: Order[];
  events: PlanEvent[];
  summary: string | null;
  weatherDay: WeatherDay | null;
  sellerId: string;
  onAdd: (dayOffset: number, label: string) => void;
  onDelete: (event: PlanEvent) => void;
}) {
  const pickups = orders.filter((o) => o.dayOffset === day.offset && o.status !== "canceled");
  const hasContent = pickups.length > 0 || events.length > 0 || Boolean(summary);

  return (
    <div
      className={cn(
        "flex flex-col gap-[10px] border-t border-forest/12 py-[16px] first:border-t-0 lg:flex-row lg:gap-[24px]",
        day.isPast && "opacity-55",
      )}
    >
      {/* Date gutter */}
      <div className="flex items-baseline gap-[8px] lg:w-[116px] lg:shrink-0 lg:flex-col lg:items-start lg:gap-[3px]">
        <span
          className={cn(
            "font-mono text-[10px] uppercase tracking-[0.14em]",
            day.isToday ? "text-forest" : "text-mid-forest",
          )}
        >
          {day.dayLabel}
        </span>
        <span
          className={cn(
            "text-[20px] font-semibold tabular-nums leading-none",
            day.isToday ? "text-forest" : "text-deepest-forest",
          )}
        >
          {day.dateLabel}
        </span>
        {day.isToday ? (
          <span className="rounded-full bg-mint px-[7px] py-[2px] font-mono text-[8.5px] uppercase tracking-[0.14em] text-deepest-forest">
            Today
          </span>
        ) : null}
        {weatherDay ? (
          <span className="inline-flex items-center gap-[4px] font-mono text-[10px] tabular-nums text-mid-forest">
            <WeatherGlyph icon={weatherDay.icon} className="h-[13px] w-[13px] text-forest" />
            {weatherDay.hi}°
          </span>
        ) : null}
      </div>

      {/* Content column */}
      <div className="min-w-0 flex-1">
        {hasContent ? (
          <div className="flex flex-col gap-[10px]">
            {summary ? (
              <p className="max-w-[560px] text-[14px] leading-[1.5] text-charcoal">{summary}</p>
            ) : null}
            {pickups.length > 0 ? (
              <div className="flex flex-col">
                {pickups.map((o) => (
                  <PickupRow key={o.id} order={o} sellerId={sellerId} />
                ))}
              </div>
            ) : null}
            {events.length > 0 ? (
              <div className="flex flex-wrap gap-[8px]">
                {events.map((e) => (
                  <PlanEventChip key={`${e.dayOffset}:${e.label}`} event={e} onDelete={onDelete} />
                ))}
              </div>
            ) : null}
          </div>
        ) : (
          <p className="text-[14px] text-sage-shadow">Open.</p>
        )}
        <AddNote onAdd={(label) => onAdd(day.offset, label)} />
      </div>
    </div>
  );
}
