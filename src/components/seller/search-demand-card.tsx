import type { SearchDemand } from "@/lib/data/searches";

/**
 * One search-demand row — query, counts, a quiet trend tag, and one editorial
 * line. Hairline-divided, NOT a metric card with an up-arrow (the directive
 * forbids that). The single terracotta accent on the page is the "New" tag.
 */
const TREND: Record<SearchDemand["trend"], { glyph: string; label: string; cls: string }> = {
  rising: { glyph: "↑", label: "Rising", cls: "text-forest" },
  steady: { glyph: "→", label: "Steady", cls: "text-mid-forest" },
  fading: { glyph: "↓", label: "Easing", cls: "text-sage-shadow" },
  new: { glyph: "", label: "New", cls: "text-terracotta" },
};

export function SearchDemandCard({ item }: { item: SearchDemand }) {
  const t = TREND[item.trend];
  return (
    <article className="border-t border-forest/15 py-[18px] first:border-t-0 first:pt-0">
      <div className="flex items-baseline justify-between gap-[12px]">
        <h2 className="text-[19px] font-medium tracking-[-0.02em] text-deepest-forest">
          {item.query}
        </h2>
        <span className={`shrink-0 font-mono text-[9.5px] uppercase tracking-[0.14em] ${t.cls}`}>
          {t.glyph ? `${t.glyph} ` : ""}
          {t.label}
        </span>
      </div>
      <div className="mt-[5px] font-mono text-[10px] uppercase tracking-[0.1em] text-mid-forest">
        {item.weekCount} searches this week · {item.nearbyCount} within 2 mi
      </div>
      <p
        className="mt-[9px] max-w-[560px] text-[14px] leading-[1.5] text-mid-forest [&_em]:font-emphasis [&_em]:font-normal [&_em]:italic [&_em]:text-forest"
        dangerouslySetInnerHTML={{ __html: item.note }}
      />
    </article>
  );
}
