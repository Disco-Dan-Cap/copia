import type { Metadata } from "next";
import { sellerBySlug } from "@/lib/data/seller-bySlug";
import { sellersById } from "@/lib/data/sellers";
import { searchDemandFor } from "@/lib/data/searches";
import { SearchDemandCard } from "@/components/seller/search-demand-card";

// Rendered per request so it tracks the same demo identity (?as=) as the
// dashboard rather than caching one seller's view.
export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Who's searching" };

const DEMO_SELLER = "miras-half-acre";

type SearchParams = { searchParams: Promise<{ as?: string }> };

export default async function SearchesPage({ searchParams }: SearchParams) {
  const { as } = await searchParams;
  // Same fallback as the dashboard — a bad ?as= lands on Mira, never a 404.
  const seller = (as ? sellerBySlug(as) : undefined) ?? sellersById[DEMO_SELLER];
  const demand = searchDemandFor(seller.id);

  return (
    <div className="flex flex-col gap-[24px] px-[24px] pb-[40px] pt-[16px] lg:px-[44px] lg:pt-[28px]">
      <header className="max-w-[620px]">
        <p className="eyebrow mb-[12px]">Search demand · {seller.area}</p>
        <h1 className="text-[30px] font-bold leading-[1.05] tracking-[-0.03em] text-deepest-forest [&_em]:font-emphasis [&_em]:font-normal [&_em]:italic [&_em]:text-forest lg:text-[38px]">
          What your neighbors are <em>looking for</em>.
        </h1>
        <p className="mt-[12px] text-[15px] leading-[1.5] text-charcoal lg:text-[16px]">
          {demand.length > 0
            ? "Searches near you this week. Where your plot can already answer one, I've flagged it."
            : "I'll start tracking demand near you once buyers in your area search for what you grow."}
        </p>
      </header>

      {demand.length > 0 ? (
        <section>
          {demand.map((item) => (
            <SearchDemandCard key={item.query} item={item} />
          ))}
        </section>
      ) : null}
    </div>
  );
}
