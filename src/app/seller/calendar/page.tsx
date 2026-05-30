import type { Metadata } from "next";
import { sellerBySlug } from "@/lib/data/seller-bySlug";
import { sellersById } from "@/lib/data/sellers";
import { ordersBySeller } from "@/lib/data/orders";
import { planEventsFor, weather } from "@/lib/data/dashboard";
import { buildWeeks, daySummaries, marketDaysFor, weekSectionLabels } from "@/lib/data/calendar";
import { CalendarPlanner } from "@/components/seller/calendar/calendar-planner";

// Per-request so the two-week range and the forward weather window track the
// visitor's real date, and ?as= carries the demo identity through.
export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Calendar" };

const DEMO_SELLER = "miras-half-acre";

type SearchParams = { searchParams: Promise<{ as?: string }> };

export default async function CalendarPage({ searchParams }: SearchParams) {
  const { as } = await searchParams;
  const seller = (as ? sellerBySlug(as) : undefined) ?? sellersById[DEMO_SELLER];

  const now = new Date();
  // Four weeks is the upper bound — fresh produce has a short forward-buy
  // horizon, and more agenda (not a month grid) is the right way to see further.
  const weeks = buildWeeks(now, 4);
  const weekLabels = weekSectionLabels(now, weeks.length);
  const seedEvents = [...planEventsFor(seller.id), ...marketDaysFor(seller.id, weeks)];

  return (
    <div className="flex flex-col gap-[24px] px-[24px] pb-[44px] pt-[16px] lg:px-[44px] lg:pt-[28px]">
      <header className="max-w-[620px]">
        <p className="eyebrow mb-[12px]">Calendar</p>
        <h1 className="text-[30px] font-bold leading-[1.05] tracking-[-0.03em] text-deepest-forest [&_em]:font-emphasis [&_em]:font-normal [&_em]:italic [&_em]:text-forest lg:text-[38px]">
          The week, as it&rsquo;s <em>shaping up</em>.
        </h1>
        <p className="mt-[12px] text-[15px] leading-[1.5] text-charcoal lg:text-[16px]">
          Your pickups and plot work, two weeks out.
        </p>
      </header>

      <CalendarPlanner
        sellerId={seller.id}
        weeks={weeks}
        weekLabels={weekLabels}
        seedEvents={seedEvents}
        orders={ordersBySeller(seller.id)}
        weatherWeek={weather.week}
        summaries={daySummaries(seller.id, weeks)}
      />
    </div>
  );
}
