import { sellersById } from "@/lib/data/sellers";
import { listingsBySeller, listingStatus, formatPeakWindow, priceLabel } from "@/lib/data/listings";
import {
  ordersBySeller,
  todaysOrders,
  sellerSalesStats,
  sellerOrderGroups,
} from "@/lib/data/orders";
import { weather, planEventsFor, type PlanEvent } from "@/lib/data/dashboard";
import { buildWeeks, marketDaysFor, daySummaryFor } from "@/lib/data/calendar";
import { searchDemandFor } from "@/lib/data/searches";
import { repeatBuyers, seasonFrame, seasonOpeningFor } from "@/lib/data/analytics";
import { conversationsFor } from "@/lib/data/messages";
import { reviewStats } from "@/lib/data/reviews";

// The Coach's reading of a grower's plot — assembled from the SAME seed every
// other seller surface draws on, never a separate AI data store. The richer
// this block, the more the Coach can name (Will waiting since April, the
// sold-out lettuce, the fourteen searches) inside its prose. The intelligence
// is proportional to how much of the grower's real situation it reasons over.

const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const WEEKDAY = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// East Austin sits in USDA zone 9a (the value the dashboard and hero already
// state). A future multi-city build would derive this from `seller.location`.
const ZONE = "Zone 9a";

/** Only Mira carries a full seeded plot today; everyone else degrades to the
 *  young-season reading. Mirrors the seed coverage in searches/analytics/etc. */
export function hasRichContext(sellerId: string): boolean {
  return sellerId === "miras-half-acre";
}

/** First name for the salutation, or null for place-named sellers ("the baker"). */
export function coachSalutationName(sellerId: string): string | null {
  const name = sellersById[sellerId]?.contactName;
  if (!name || name.startsWith("the ")) return null;
  return name.split(" ")[0];
}

/** "Monday, June 1 · Zone 9a · East Austin" — the dated masthead of the letter. */
export function coachDateline(sellerId: string, now: Date): string {
  const seller = sellersById[sellerId];
  const date = `${WEEKDAY[now.getDay()]}, ${MONTH[now.getMonth()]} ${now.getDate()}`;
  return seller ? `${date} · ${ZONE} · ${seller.area}` : `${date} · ${ZONE}`;
}

/** Cache key: the ISO date of this week's Monday. The reading is weekly, so it
 *  is generated once per (seller, week) and served from cache after that. */
export function weekKey(now: Date): string {
  const mondayIndex = (now.getDay() + 6) % 7;
  const monday = new Date(now);
  monday.setDate(now.getDate() - mondayIndex);
  return `${monday.getFullYear()}-${String(monday.getMonth() + 1).padStart(2, "0")}-${String(monday.getDate()).padStart(2, "0")}`;
}

// ── The seven-day strip (deterministic facts, rendered beside the prose) ──────

export interface CoachTag {
  kind: PlanEvent["kind"] | "pickup";
  label: string;
}

export interface CoachDay {
  offset: number;
  dayLabel: string;
  dateLabel: string;
  isToday: boolean;
  tags: CoachTag[];
  /** Mira's planner-voice line for the day, where one exists. */
  summary: string | null;
}

/** Today plus the next six days — the Coach's "next seven days" strip. Built
 *  from real orders (pickups), the seeded plan, and the recurring market. */
export function buildCoachWeek(sellerId: string, now: Date): CoachDay[] {
  const orders = ordersBySeller(sellerId);
  const events = planEventsFor(sellerId);
  const markets = marketDaysFor(sellerId, buildWeeks(now, 2));
  const out: CoachDay[] = [];

  for (let offset = 0; offset < 7; offset++) {
    const d = new Date(now);
    d.setDate(now.getDate() + offset);
    const tags: CoachTag[] = [];

    const pickups = orders.filter((o) => o.dayOffset === offset && o.status !== "canceled").length;
    if (pickups > 0) tags.push({ kind: "pickup", label: `${pickups} pickup${pickups === 1 ? "" : "s"}` });
    for (const e of events.filter((e) => e.dayOffset === offset)) tags.push({ kind: e.kind, label: e.label });
    for (const m of markets.filter((m) => m.dayOffset === offset)) tags.push({ kind: m.kind, label: m.label });

    out.push({
      offset,
      dayLabel: DOW[d.getDay()],
      dateLabel: String(d.getDate()),
      isToday: offset === 0,
      tags,
      summary: daySummaryFor(sellerId, offset),
    });
  }
  return out;
}

// ── The context block (the cached evidence the prompt tells the Coach to weave) ─

const MONTH_ABBR = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function trendWord(t: "rising" | "steady" | "fading" | "new"): string {
  return { rising: "rising", steady: "steady", fading: "fading", new: "new this week" }[t];
}

/**
 * The grower's whole plot as plain text — the second cached system block. It is
 * deliberately verbose and specific: every line here is something the Coach is
 * allowed to name in its letter. Stripped of the `<em>` accents the UI uses.
 */
export function buildContextBlock(sellerId: string, now: Date): string {
  const seller = sellersById[sellerId];
  if (!seller) return "No plot on record.";

  const strip = (s: string) => s.replace(/<\/?em>/g, "");
  const lines: string[] = [];
  const today = `${WEEKDAY[now.getDay()]}, ${MONTH[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;

  lines.push(`THE GROWER`);
  lines.push(`${seller.contactName} runs ${seller.name} in ${seller.area}, Austin (${ZONE}), growing since ${seller.since}. Approach: ${seller.philosophy.toLowerCase()}.`);
  lines.push(`Her story, in her own words: ${strip(seller.story)}`);
  lines.push("");
  lines.push(`TODAY: ${today}.`);
  lines.push(`Weather: ${weather.summary} (high ${weather.hi}°, low ${weather.lo}°).`);
  lines.push("");

  // Listings, with the seller-side state that drives the demand-gap loop.
  lines.push(`HER LISTINGS`);
  for (const l of listingsBySeller(sellerId)) {
    const status = listingStatus(l);
    const state = status === "active" ? "active" : status === "sold-out" ? "SOLD OUT" : "PAUSED";
    lines.push(`- ${l.name} (${priceLabel(l)}) — ${state}; peaks ${formatPeakWindow(l.peakMonths)}. ${strip(l.anchor)}`);
  }
  lines.push("");

  // Orders — today's pickups + the week's momentum.
  const today0 = todaysOrders(sellerId);
  const sales = sellerSalesStats(sellerId);
  lines.push(`ORDERS`);
  if (today0.length) {
    lines.push(`Today: ${today0.length} pickup${today0.length === 1 ? "" : "s"} — ${today0.map((o) => `${o.buyer} (${o.status}${o.pickupTime ? `, ${o.pickupTime}` : ""})`).join(", ")}.`);
  } else {
    lines.push(`Today: nothing scheduled.`);
  }
  lines.push(`Sales this week: $${sales.thisWeek}${sales.trendPct !== null ? ` (${sales.trendPct >= 0 ? "+" : ""}${sales.trendPct}% vs last week)` : ""}${sales.topListing ? `, led by ${sales.topListing.toLowerCase()}` : ""}.`);
  const groups = sellerOrderGroups(sellerId);
  const upcoming = groups.find((g) => g.key === "upcoming");
  if (upcoming) lines.push(`Upcoming: ${upcoming.orders.map((o) => `${o.buyer} in ${o.dayOffset} day${o.dayOffset === 1 ? "" : "s"}`).join(", ")}.`);
  lines.push("");

  // The plan — next two weeks of plot tasks + market days.
  const events = planEventsFor(sellerId);
  const markets = marketDaysFor(sellerId, buildWeeks(now, 2));
  const all = [...events, ...markets].filter((e) => e.dayOffset >= 0 && e.dayOffset <= 13).sort((a, b) => a.dayOffset - b.dayOffset);
  if (all.length) {
    lines.push(`THE PLAN (next two weeks)`);
    for (const e of all) {
      const d = new Date(now);
      d.setDate(now.getDate() + e.dayOffset);
      const when = e.dayOffset === 0 ? "today" : e.dayOffset === 1 ? "tomorrow" : `${DOW[d.getDay()]} ${MONTH_ABBR[d.getMonth()]} ${d.getDate()}`;
      lines.push(`- ${when}: ${e.label} (${e.kind})`);
    }
    lines.push("");
  }

  // Demand — what neighbors are searching, with the gaps tied to her listings.
  const demand = searchDemandFor(sellerId);
  if (demand.length) {
    lines.push(`WHAT HER NEIGHBORS ARE SEARCHING (near ${seller.area})`);
    for (const d of demand) {
      lines.push(`- "${d.query}": ${d.weekCount} searches this week, ${d.nearbyCount} nearby, ${trendWord(d.trend)}. ${strip(d.note)}`);
    }
    lines.push("");
  }

  // The people who keep coming back, each by their remembered detail.
  const repeats = repeatBuyers(sellerId);
  if (repeats.length) {
    lines.push(`BUYERS WHO KEEP COMING BACK`);
    for (const r of repeats) lines.push(`- ${r.buyer}: ${r.line}`);
    lines.push("");
  }

  // Open correspondence — the loops a neighbor would remember are open.
  const threads = conversationsFor(sellerId);
  if (threads.length) {
    lines.push(`OPEN MESSAGES`);
    for (const t of threads) {
      const last = t.messages[t.messages.length - 1];
      lines.push(`- ${t.buyer} — "${t.subject}". Last word (${last.from}): ${last.body}`);
    }
    lines.push("");
  }

  // The season so far, in one line.
  const frame = seasonFrame(sellerId, now);
  const stats = reviewStats(sellerId);
  lines.push(`THE SEASON SO FAR`);
  lines.push(strip(seasonOpeningFor(sellerId)));
  lines.push(`${frame.baskets} baskets out (${frame.spanLabel})${stats.count ? `, ${stats.average.toFixed(1)} stars across ${stats.count} reviews` : ""}.`);

  return lines.join("\n");
}
