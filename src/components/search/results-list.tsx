import Link from "next/link";
import type { SearchResult } from "@/lib/search/query";
import { LeafWave } from "@/components/ui/leaf-wave";
import { ListingCard } from "@/components/cards/listing-card";

interface ResultsListProps {
  result: SearchResult | null;
  onClearFilters: () => void;
}

export function ResultsList({ result, onClearFilters }: ResultsListProps) {
  const items = result?.listings ?? [];

  return (
    <div className="h-full overflow-y-auto overscroll-contain">
      <div className="px-[24px] pt-[14px] pb-[10px]">
        <span className="eyebrow">
          {result ? `${items.length} result${items.length === 1 ? "" : "s"}` : "Searching"}
        </span>
      </div>

      {result && items.length === 0 ? (
        <div className="relative mx-[24px] mt-[8px] overflow-hidden rounded-[18px] border border-sage-shadow/25 bg-cream-warm px-[28px] py-[44px] text-center">
          <LeafWave
            density="sparse"
            opacity={0.5}
            className="absolute inset-0 h-full w-full text-sage opacity-30"
          />
          <div className="relative z-[2]">
            <p className="text-[15px] font-semibold text-deepest-forest">Nothing matches yet</p>
            <p className="mt-[6px] text-[12.5px] leading-[1.5] text-charcoal">
              Loosen a filter or widen the distance — the Hill Country farms are a little
              further out.
            </p>
            <button
              type="button"
              onClick={onClearFilters}
              className="mt-[16px] inline-flex min-h-[40px] items-center rounded-full bg-forest px-[18px] font-mono text-[10px] uppercase tracking-[0.12em] text-cream active:scale-[0.97]"
            >
              Clear filters
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-[12px] px-[24px] pb-[130px]">
          {items.map((r) => (
            <Link
              key={r.listing.id}
              href={`/listings/${r.listing.id}`}
              className="block rounded-[14px] transition-transform active:scale-[0.99]"
            >
              <ListingCard {...r} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
