import { SearchIcon, SlidersIcon } from "@/components/ui/icons";
import { buyerNeighborhood } from "@/lib/data/location";

interface SearchHeaderProps {
  query: string;
  onQuery: (q: string) => void;
  filterCount: number;
  onOpenFilters: () => void;
}

/**
 * Search screen header — the search field is the hero (not the wordmark, which
 * lives on Home). `safe-top` clears the notch in standalone PWA mode. The input
 * is 16px so iOS Safari never zooms on focus.
 */
export function SearchHeader({ query, onQuery, filterCount, onOpenFilters }: SearchHeaderProps) {
  return (
    <header className="safe-top shrink-0 bg-cream">
      <div className="border-b border-forest/12 px-[24px] pt-[6px] pb-[12px]">
        <p className="eyebrow mb-[10px]">Search · Near {buyerNeighborhood}</p>
        <div className="flex items-center gap-[10px]">
          <div className="relative flex-1">
            <SearchIcon className="pointer-events-none absolute left-[13px] top-1/2 h-[16px] w-[16px] -translate-y-1/2 text-sage-shadow" />
            <input
              type="search"
              inputMode="search"
              enterKeyHint="search"
              value={query}
              onChange={(e) => onQuery(e.target.value)}
              placeholder="Tomatoes, honey, a seller…"
              aria-label="Search listings and sellers"
              className="h-[44px] w-full rounded-[12px] border border-sage-shadow/30 bg-cream-warm pl-[38px] pr-[12px] text-[16px] text-charcoal placeholder:text-sage-shadow focus:border-forest focus:outline-none"
            />
          </div>
          <button
            type="button"
            onClick={onOpenFilters}
            aria-label={filterCount > 0 ? `Filters, ${filterCount} active` : "Filters"}
            className="relative flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[12px] border border-sage-shadow/30 bg-cream-warm text-forest active:scale-[0.97]"
          >
            <SlidersIcon className="h-[20px] w-[20px]" />
            {filterCount > 0 ? (
              <span className="absolute -right-[5px] -top-[5px] flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-terracotta px-[4px] font-mono text-[9px] font-semibold text-cream">
                {filterCount}
              </span>
            ) : null}
          </button>
        </div>
      </div>
    </header>
  );
}
