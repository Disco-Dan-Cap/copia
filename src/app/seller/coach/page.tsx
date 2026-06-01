import type { Metadata } from "next";
import { sellerBySlug } from "@/lib/data/seller-bySlug";
import { sellersById } from "@/lib/data/sellers";
import { searchDemandFor } from "@/lib/data/searches";
import { buildCoachWeek, coachDateline, coachSalutationName } from "@/lib/coach/context";
import { peekReading } from "@/lib/coach/generate";
import { IdentityChip } from "@/components/seller/identity-chip";
import { CoachLetter } from "@/components/seller/coach/coach-letter";

// Rendered per request so "this week," the seven-day strip, and the reading all
// track the visitor's real date — the same honesty pattern as the dashboard.
// The page never blocks on Claude: it PEEKS the weekly cache. A warm week passes
// the cached reading to CoachLetter and the whole letter server-renders at once;
// a cold week passes null, and CoachLetter fetches the reading client-side behind
// the leaf-draw so first paint is immediate. The masthead (dateline + salutation)
// is deterministic and shows on first paint either way.
export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Growing Coach" };

const DEMO_SELLER = "miras-half-acre";

type SearchParams = { searchParams: Promise<{ as?: string }> };

export default async function GrowingCoachPage({ searchParams }: SearchParams) {
  const { as } = await searchParams;
  const seller = (as ? sellerBySlug(as) : undefined) ?? sellersById[DEMO_SELLER];

  const now = new Date();
  const dateline = coachDateline(seller.id, now);
  const name = coachSalutationName(seller.id);
  const salutation = name ? `${name} —` : "Friend —";
  const days = buildCoachWeek(seller.id, now);
  const demand = searchDemandFor(seller.id);
  const initialReading = peekReading(seller.id, now);

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
        salutation={salutation}
        initialReading={initialReading}
        days={days}
        demand={demand}
        area={seller.area}
      />
    </div>
  );
}
