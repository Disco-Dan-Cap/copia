import type { SeasonalItem } from "@/lib/data/types";
import { seasonalItems } from "@/lib/data/seasonal";
import { SectionHead } from "./section-head";

function SeasonCard({ item }: { item: SeasonalItem }) {
  return (
    <article className="flex w-[130px] shrink-0 flex-col rounded-[14px] border border-sage-shadow/25 bg-cream-warm p-[14px]">
      <div
        className="mb-[12px] h-[78px] w-full rounded-[8px]"
        style={{
          backgroundImage: `linear-gradient(135deg, ${item.gradient[0]} 0%, ${item.gradient[1]} 100%)`,
        }}
      />
      <div className="text-[14px] font-semibold leading-[1.2] tracking-[-0.01em] text-deepest-forest">
        {item.name}
      </div>
      <div className="mt-[4px] font-mono text-[9px] uppercase tracking-[0.1em] text-mid-forest">
        {item.where}
      </div>
      <div className="mt-[8px] text-[13px] font-semibold text-forest">
        {item.price}
      </div>
    </article>
  );
}

export function SeasonScroller() {
  return (
    <section className="pt-[28px] pb-[8px]">
      <SectionHead label="What's ripening this week" action="See all" />
      <div className="scroll-x-momentum flex gap-[12px] overflow-x-auto px-[28px] pb-[8px]">
        {seasonalItems.map((item) => (
          <SeasonCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
