import Link from "next/link";
import type { Seller } from "@/lib/data/types";
import { buyerLocation } from "@/lib/data/location";
import { formatDistance, haversineMi } from "@/lib/geo";
import { archetypeLabels } from "@/lib/data/labels";
import { ChevronLeftIcon } from "@/components/ui/icons";
import { PhotoFill } from "@/components/media/photo-fill";

/**
 * Connects the product back to the person who made it — a pressable row that
 * opens the seller profile (where the story and reviews live). "From" rather
 * than "Grown by" so it reads right for the makers as well as the growers.
 */
export function GrowerBlock({ seller }: { seller: Seller }) {
  const distanceMi = haversineMi(buyerLocation, seller.location);
  const [from, to] = seller.avatarGradient;

  return (
    <section className="px-[24px] pt-[24px]">
      <Link
        href={`/sellers/${seller.id}`}
        className="flex items-center gap-[13px] rounded-[14px] border border-sage-shadow/25 bg-cream-warm p-[14px] transition-transform active:scale-[0.99]"
      >
        <div
          className="relative h-[48px] w-[48px] shrink-0 overflow-hidden rounded-[12px]"
          style={{ backgroundImage: `linear-gradient(315deg, ${from} 0%, ${to} 100%)` }}
        >
          <PhotoFill src={seller.photo} alt={seller.name} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-mid-forest">From</div>
          <div className="truncate text-[15px] font-semibold tracking-[-0.01em] text-deepest-forest">
            {seller.name}
          </div>
          <div className="mt-[2px] font-mono text-[9px] uppercase tracking-[0.1em] text-sage-shadow">
            {seller.area} · {formatDistance(distanceMi)} · {archetypeLabels[seller.archetype]}
          </div>
        </div>
        <ChevronLeftIcon className="h-[16px] w-[16px] shrink-0 rotate-180 text-sage-shadow" />
      </Link>
    </section>
  );
}
