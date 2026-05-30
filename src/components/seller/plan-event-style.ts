import type { PlanEvent } from "@/lib/data/dashboard";

// One source of truth for plan-event color by kind — consumed as a solid pill
// on the dashboard's compact week strip and as a small dot on the roomier
// calendar (where solid color blocks would be the forbidden Google-Calendar
// reflex). `note` is the neutral, user-added kind: sage-shadow, no glyph.
export const PLAN_EVENT_STYLE: Record<PlanEvent["kind"], { bg: string }> = {
  harvest: { bg: "bg-terracotta" },
  plant: { bg: "bg-sage" },
  water: { bg: "bg-forest" },
  weather: { bg: "bg-mid-forest" },
  market: { bg: "bg-light-sage" },
  note: { bg: "bg-sage-shadow" },
};
