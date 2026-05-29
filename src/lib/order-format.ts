// Relative day labels for the orders screens. dayOffset is relative to today
// (the same convention the seed uses), so labels are computed per-request from
// the visitor's real date. We never invent clock times — only `pickupTime`,
// which is real seed data, carries an hour.

const WEEKDAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** The absolute date a dayOffset resolves to, relative to `now`. */
export function dateForOffset(now: Date, dayOffset: number): Date {
  const d = new Date(now);
  d.setDate(now.getDate() + dayOffset);
  return d;
}

/**
 * A human day label: "Today" / "Tomorrow" / "Yesterday", a weekday within the
 * week either side ("Mon"), or a month-and-date further out ("May 19").
 */
export function relativeDayLabel(now: Date, dayOffset: number): string {
  if (dayOffset === 0) return "Today";
  if (dayOffset === 1) return "Tomorrow";
  if (dayOffset === -1) return "Yesterday";
  const d = dateForOffset(now, dayOffset);
  if (dayOffset > -7 && dayOffset < 7) return WEEKDAY_SHORT[d.getDay()];
  return `${MONTH[d.getMonth()]} ${d.getDate()}`;
}

/**
 * The scheduled-fulfillment string used on rows and the detail timeline —
 * the day label, plus the pickup hour when we actually have one. Coarse by
 * design: no invented per-status timestamps.
 */
export function scheduledWhen(now: Date, dayOffset: number, pickupTime?: string): string {
  const day = relativeDayLabel(now, dayOffset);
  return pickupTime ? `${day} · ${pickupTime}` : day;
}
