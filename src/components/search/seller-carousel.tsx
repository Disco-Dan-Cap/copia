"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { formatDistance } from "@/lib/geo";
import { reviewStats } from "@/lib/data/reviews";
import { StarIcon } from "@/components/ui/icons";
import { PhotoFill } from "@/components/media/photo-fill";
import type { SellerResult } from "@/lib/search/query";

interface SellerCarouselProps {
  sellers: SellerResult[];
  selectedSellerId: string | null;
}

/**
 * Bottom card rail for the map view. A map pin selects its seller (driven by
 * `selectedSellerId`): the matching card highlights and scrolls into view.
 * Tapping a card navigates to that seller's profile — pins select, cards open.
 */
export function SellerCarousel({ sellers, selectedSellerId }: SellerCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selectedSellerId || !scrollRef.current) return;
    const card = scrollRef.current.querySelector(`[data-id="${selectedSellerId}"]`);
    card?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [selectedSellerId]);

  if (sellers.length === 0) return null;

  return (
    <div className="absolute inset-x-0 bottom-[80px] z-[5]">
      <div
        ref={scrollRef}
        className="scroll-x-momentum flex snap-x snap-mandatory gap-[12px] overflow-x-auto px-[20px]"
      >
        {sellers.map(({ seller, distanceMi, matchCount }) => {
          const selected = seller.id === selectedSellerId;
          const { average, count } = reviewStats(seller.id);
          return (
            <Link
              key={seller.id}
              data-id={seller.id}
              href={`/sellers/${seller.id}`}
              className={cn(
                "flex w-[262px] shrink-0 snap-center items-center gap-[12px] rounded-[16px] border bg-cream p-[13px] text-left shadow-[var(--shadow-md)] transition-colors active:scale-[0.99]",
                selected ? "border-forest" : "border-sage-shadow/25",
              )}
            >
              <div
                className="relative h-[50px] w-[50px] shrink-0 overflow-hidden rounded-full"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${seller.avatarGradient[0]} 0%, ${seller.avatarGradient[1]} 100%)`,
                }}
              >
                <PhotoFill src={seller.avatar} alt={seller.name} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13.5px] font-semibold tracking-[-0.01em] text-deepest-forest">
                  {seller.name}
                </div>
                <div className="mt-[2px] font-mono text-[9px] uppercase tracking-[0.1em] text-mid-forest">
                  {formatDistance(distanceMi)} · {seller.area}
                </div>
                <div className="mt-[6px] flex items-center gap-[6px] font-mono text-[9px] uppercase tracking-[0.1em] text-sage-shadow">
                  {count > 0 ? (
                    <span className="flex items-center gap-[3px] text-forest">
                      <StarIcon className="h-[10px] w-[10px]" />
                      {average.toFixed(1)}
                    </span>
                  ) : null}
                  <span aria-hidden>·</span>
                  <span>
                    {matchCount} item{matchCount === 1 ? "" : "s"}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
