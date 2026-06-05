import type { Seller } from "@/lib/data/types";
import { buyerLocation } from "@/lib/data/location";
import { formatDistance, haversineMi } from "@/lib/geo";
import { archetypeLabels } from "@/lib/data/labels";
import { LeafWave } from "@/components/ui/leaf-wave";
import { HeartIcon } from "@/components/ui/icons";
import { BackButton } from "@/components/app/back-button";
import { PhotoFill } from "@/components/media/photo-fill";

/**
 * Substack/Etsy-pattern hero: a full-bleed banner in the seller's identity
 * gradient (the same gradient their listing cards use) carrying a faint Leaf
 * Wave texture, with a rounded-square avatar overlapping the bottom-left.
 *
 * The avatar runs its gradient at the OPPOSITE angle to the banner (315° vs
 * 135°) and wears a cream ring, so it never dissolves into the banner even
 * though they share the same two colors.
 */
export function SellerHero({ seller }: { seller: Seller }) {
  const distanceMi = haversineMi(buyerLocation, seller.location);
  const [from, to] = seller.avatarGradient;

  return (
    <header>
      {/* Banner — full-bleed under the status bar; content respects the inset. */}
      <div
        className="relative h-[220px] w-full"
        style={{ backgroundImage: `linear-gradient(135deg, ${from} 0%, ${to} 100%)` }}
      >
        {/* The vignette fills the banner; the avatar below stays a gradient mark,
            so the seller reads as cover-photo + identity avatar. No overflow-hidden
            here — the avatar deliberately overhangs the banner's lower edge. */}
        <PhotoFill src={seller.photo} alt={seller.name} eager />
        {!seller.photo ? (
          <LeafWave
            density="sparse"
            opacity={0.6}
            className="absolute inset-0 h-full w-full text-cream opacity-25"
          />
        ) : null}

        <div className="safe-top absolute inset-x-0 top-0 z-[3]">
          <BackButton className="ml-[16px] mt-[12px]" />
        </div>

        {/* Avatar — half on the banner, half below. Opposed gradient + cream ring. */}
        <div
          className="absolute -bottom-[40px] left-[24px] z-[2] h-[80px] w-[80px] rounded-[16px] border-[3px] border-cream shadow-[var(--shadow-md)]"
          style={{ backgroundImage: `linear-gradient(315deg, ${from} 0%, ${to} 100%)` }}
        />
      </div>

      {/* Identity block — pt clears the avatar overhang. */}
      <div className="px-[24px] pt-[52px]">
        <h1 className="font-display text-[26px] font-medium leading-[1.05] tracking-[-0.02em] text-forest">
          {seller.name}
        </h1>
        <div className="mt-[7px] font-mono text-[10px] uppercase tracking-[0.12em] text-mid-forest">
          {seller.area} · {formatDistance(distanceMi)} · {archetypeLabels[seller.archetype]}
        </div>

        {/* Action row — both inert for now (Favorites + messaging land later). */}
        <div className="mt-[16px] flex items-center gap-[10px]">
          <button
            type="button"
            aria-label="Save seller"
            className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full border border-sage-shadow/40 text-forest transition-transform active:scale-[0.94]"
          >
            <HeartIcon className="h-[20px] w-[20px]" />
          </button>
          <button
            type="button"
            className="flex h-[44px] flex-1 items-center justify-center rounded-full border border-forest px-[18px] text-[14px] font-semibold text-forest transition-colors active:bg-forest/8"
          >
            Ask {seller.contactName}
          </button>
        </div>
      </div>
    </header>
  );
}
