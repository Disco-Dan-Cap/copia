import type { Metadata } from "next";
import { sellerBySlug } from "@/lib/data/seller-bySlug";
import { sellersById } from "@/lib/data/sellers";
import { listingsBySeller } from "@/lib/data/listings";
import { ordersBySeller, todaysOrders, sellerSalesStats } from "@/lib/data/orders";
import {
  weather,
  coachNoteFor,
  planEventsFor,
  buildWeek,
  upcomingDayLabels,
} from "@/lib/data/dashboard";
import { IdentityChip } from "@/components/seller/identity-chip";
import { DashboardHead } from "@/components/seller/dashboard-head";
import { CoachCard } from "@/components/seller/coach-card";
import { TodayFigures } from "@/components/seller/today-figures";
import { ListingsPreview } from "@/components/seller/listings-preview";
import { WeekPlan } from "@/components/seller/week-plan";
import { DashboardOutro } from "@/components/seller/dashboard-outro";

// Rendered per request so "today", "this week", and the calendar track the
// visitor's real date (the same honesty pattern as the rest of the app).
export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Dashboard" };

const DEMO_SELLER = "miras-half-acre";
const WEEKDAY = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTH = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatTime(d: Date): string {
  const h = d.getHours();
  const m = String(d.getMinutes()).padStart(2, "0");
  return `${((h % 12) || 12)}:${m} ${h < 12 ? "AM" : "PM"}`;
}

type SearchParams = { searchParams: Promise<{ as?: string }> };

export default async function SellerDashboardPage({ searchParams }: SearchParams) {
  const { as } = await searchParams;
  // Default demo identity is Mira; a bad ?as= falls back to her rather than
  // 404ing — the dashboard should always render for the demo.
  const seller = (as ? sellerBySlug(as) : undefined) ?? sellersById[DEMO_SELLER];

  const now = new Date();
  const greeting = now.getHours() < 12 ? "Good morning" : now.getHours() < 17 ? "Good afternoon" : "Good evening";
  const meta = `${WEEKDAY[now.getDay()]} · ${MONTH[now.getMonth()]} ${now.getDate()} · ${formatTime(now)}`;
  const month = now.getMonth() + 1;

  const listings = listingsBySeller(seller.id);

  // Today's pickups → editorial subtext.
  const today = todaysOrders(seller.id);
  const confirmed = today.filter((o) => o.status === "confirmed").length;
  const awaiting = today.filter((o) => o.status === "awaiting").length;
  const firstPickup = today.find((o) => o.pickupTime)?.pickupTime;
  const pickupParts: string[] = [];
  if (confirmed) pickupParts.push(`${confirmed} confirmed`);
  if (awaiting) pickupParts.push(`${awaiting} awaiting buyer confirmation`);
  if (firstPickup) pickupParts.push(`first pickup at ${firstPickup}`);
  const pickupSub = today.length === 0 ? "Nothing scheduled — enjoy the quiet." : pickupParts.join(" · ");

  // Sales (computed from orders).
  const sales = sellerSalesStats(seller.id);
  const driver = sales.topListing ? `Led by ${sales.topListing.toLowerCase()}.` : null;

  // Week strip.
  const week = buildWeek(now);
  const monday = new Date(now);
  monday.setDate(now.getDate() + week[0].offset);
  const sunday = new Date(now);
  sunday.setDate(now.getDate() + week[6].offset);
  const rangeLabel =
    monday.getMonth() === sunday.getMonth()
      ? `${MONTH[monday.getMonth()]} ${monday.getDate()} — ${sunday.getDate()}`
      : `${MONTH[monday.getMonth()]} ${monday.getDate()} — ${MONTH[sunday.getMonth()]} ${sunday.getDate()}`;

  return (
    <div className="flex flex-col gap-[28px] px-[24px] pb-[40px] pt-[16px] lg:gap-[36px] lg:px-[44px] lg:pt-[28px]">
      <div className="flex justify-end">
        <IdentityChip current={seller} />
      </div>

      <DashboardHead greeting={greeting} name={seller.contactName} meta={meta} todayPickups={today.length} />

      <CoachCard note={coachNoteFor(seller.id)} secondaryHref={`/seller/searches?as=${seller.id}`} />

      <TodayFigures
        pickups={{ count: today.length, sub: pickupSub, href: `/seller/orders?as=${seller.id}&when=today` }}
        sales={{ amount: sales.thisWeek, trendPct: sales.trendPct, lastWeek: sales.lastWeek, driver, href: `/seller/analytics?as=${seller.id}` }}
        weather={{
          hi: weather.hi,
          lo: weather.lo,
          summary: weather.summary,
          days: weather.week,
          dayLabels: upcomingDayLabels(now),
        }}
      />

      <ListingsPreview listings={listings} month={month} manageHref={`/seller/listings?as=${seller.id}`} />

      <WeekPlan week={week} events={planEventsFor(seller.id)} orders={ordersBySeller(seller.id)} rangeLabel={rangeLabel} calendarHref={`/seller/calendar?as=${seller.id}`} />

      <DashboardOutro
        cues={[
          { label: "View the season", href: `/seller/analytics?as=${seller.id}` },
          { label: "Manage your stall", href: `/seller/settings?as=${seller.id}` },
        ]}
      />
    </div>
  );
}
