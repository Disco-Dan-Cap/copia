// Demo content for the seller dashboard — the parts a real build would draw
// from a weather API and the (not-yet-built) Growing Coach. Clearly seeded
// stubs: weather is shared (it's a location, not a seller), the Coach note is
// hand-written per seller with a warm fallback, and Mira's week carries a few
// plan events for texture. Pickups on the calendar come from real orders.

export interface CoachNote {
  meta: string;
  /** HTML — one Fraunces-italic <em> accent. */
  quote: string;
  reason: string;
  /** Inert action label — specific and in voice, tied to the note. */
  action: string;
  secondary: string | null;
}

export interface PlanEvent {
  dayOffset: number;
  label: string;
  kind: "harvest" | "plant" | "water" | "market" | "weather" | "note";
}

export interface WeatherDay {
  icon: "sun" | "partly" | "cloud" | "rain";
  hi: number;
  lo: number;
}

export interface Weather {
  hi: number;
  lo: number;
  summary: string;
  week: WeatherDay[];
}

export interface WeekDay {
  offset: number;
  dayLabel: string;
  dateLabel: string;
  isToday: boolean;
  /** offset < 0 — drives the calendar's muted past-day styling. */
  isPast: boolean;
}

const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Realistic late-May Austin: hot and clear, a heat wave on the way. (Stub —
// a real build wires a weather API here.)
export const weather: Weather = {
  hi: 91,
  lo: 71,
  summary: "Hot and clear into the weekend. A real heat wave lands Sunday — water deep Saturday night.",
  week: [
    { icon: "sun", hi: 91, lo: 71 },
    { icon: "sun", hi: 93, lo: 72 },
    { icon: "sun", hi: 97, lo: 75 },
    { icon: "partly", hi: 94, lo: 74 },
    { icon: "partly", hi: 90, lo: 72 },
    { icon: "cloud", hi: 88, lo: 71 },
    { icon: "rain", hi: 84, lo: 70 },
  ],
};

const MIRA_COACH: CoachNote = {
  meta: "A note from your Growing Coach",
  quote:
    "Your first heirlooms are <em>about two weeks out</em> — and three buyers near you searched for them this week.",
  reason:
    "Based on your harvest log and this warm May, the front bed should ripen around June 10. Heirloom demand in East Austin is up this month. A short “coming soon” note now tends to lock in those buyers before the market stands fill.",
  action: "Ask about your tomatoes",
  secondary: "See who's searching",
};

const COACH_FALLBACK: CoachNote = {
  meta: "A note from your Growing Coach",
  quote:
    "I'm still learning your plot — <em>give me a week</em> of harvests and I'll start spotting patterns.",
  reason:
    "Once a few orders and harvest logs come through, your Coach can suggest what to plant, when to list, and what's likely to sell near you.",
  action: "Tell me about your plot",
  secondary: null,
};

export function coachNoteFor(sellerId: string): CoachNote {
  return sellerId === "miras-half-acre" ? MIRA_COACH : COACH_FALLBACK;
}

const MIRA_PLAN: PlanEvent[] = [
  { dayOffset: -2, label: "Plant okra", kind: "plant" },
  { dayOffset: -1, label: "Lettuce pull", kind: "harvest" },
  { dayOffset: 0, label: "Cut zinnias", kind: "harvest" },
  { dayOffset: 1, label: "Deep water", kind: "water" },
  { dayOffset: 2, label: "Heat wave", kind: "weather" },
  { dayOffset: 6, label: "Sow fall tomatoes", kind: "plant" },
];

export function planEventsFor(sellerId: string): PlanEvent[] {
  return sellerId === "miras-half-acre" ? MIRA_PLAN : [];
}

/** The Mon–Sun calendar week containing today, with offsets relative to today. */
export function buildWeek(now: Date): WeekDay[] {
  const mondayIndex = (now.getDay() + 6) % 7; // days from Monday to today
  const out: WeekDay[] = [];
  for (let i = 0; i < 7; i++) {
    const offset = i - mondayIndex;
    const d = new Date(now);
    d.setDate(now.getDate() + offset);
    out.push({
      offset,
      dayLabel: DOW[d.getDay()],
      dateLabel: String(d.getDate()),
      isToday: offset === 0,
      isPast: offset < 0,
    });
  }
  return out;
}

/** Weekday labels for the next 7 days (today first) — labels the weather strip. */
export function upcomingDayLabels(now: Date): string[] {
  const out: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    out.push(DOW[d.getDay()]);
  }
  return out;
}
