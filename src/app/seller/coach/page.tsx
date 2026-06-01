import type { Metadata } from "next";
import { sellerBySlug } from "@/lib/data/seller-bySlug";
import { sellersById } from "@/lib/data/sellers";
import { searchDemandFor } from "@/lib/data/searches";
import { buildCoachWeek, coachDateline } from "@/lib/coach/context";
import { getReading } from "@/lib/coach/generate";
import { IdentityChip } from "@/components/seller/identity-chip";
import { CoachLetter } from "@/components/seller/coach/coach-letter";

// Rendered per request so "this week," the seven-day strip, and the reading all
// track the visitor's real date — the same honesty pattern as the dashboard.
// The reading is composed server-side and arrives whole: there is no loading
// state on first paint (D4). The weekly cache means the first visit of the week
// pays the latency; the rest are instant. No key / a failed call falls back to
// the seeded letter inside getReading, so the page always renders a real letter.
export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Growing Coach" };

const DEMO_SELLER = "miras-half-acre";

type SearchParams = { searchParams: Promise<{ as?: string }> };

export default async function GrowingCoachPage({ searchParams }: SearchParams) {
  const { as } = await searchParams;
  const seller = (as ? sellerBySlug(as) : undefined) ?? sellersById[DEMO_SELLER];

  const now = new Date();
  const dateline = coachDateline(seller.id, now);
  const days = buildCoachWeek(seller.id, now);
  const demand = searchDemandFor(seller.id);
  const { reading } = await getReading(seller.id, now);

  return (
    <div className="flex flex-col gap-[28px] px-[24px] pb-[40px] pt-[16px] lg:gap-[32px] lg:px-[44px] lg:pt-[28px]">
      <div className="flex items-center justify-between gap-[16px]">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-forest">
          Growing Coach
        </span>
        <IdentityChip current={seller} />
      </div>

      <CoachLetter
        sellerId={seller.id}
        dateline={dateline}
        reading={reading}
        days={days}
        demand={demand}
        area={seller.area}
      />
    </div>
  );
}
