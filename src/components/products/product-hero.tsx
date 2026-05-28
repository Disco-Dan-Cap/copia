import type { Listing } from "@/lib/data/types";
import { LeafWave } from "@/components/ui/leaf-wave";
import { HeartIcon } from "@/components/ui/icons";
import { BackButton } from "@/components/app/back-button";

/**
 * Product hero — a scaled-up version of the listing's own gradient (the
 * deferred-AI placeholder) with a faint Leaf Wave texture. No "new" badge: the
 * eyebrow + IN SEASON NOW carry the freshness; a badge here would just be noise.
 * Back button (left) + inert favorite (right) sit in the safe area over it.
 */
export function ProductHero({ listing }: { listing: Listing }) {
  const [from, to] = listing.gradient;

  return (
    <div
      className="relative h-[280px] w-full"
      style={{ backgroundImage: `linear-gradient(135deg, ${from} 0%, ${to} 100%)` }}
    >
      <LeafWave
        density="sparse"
        opacity={0.6}
        className="absolute inset-0 h-full w-full text-cream opacity-20"
      />
      <div className="safe-top absolute inset-x-0 top-0 z-[3] flex items-start justify-between px-[16px] pt-[12px]">
        <BackButton />
        <button
          type="button"
          aria-label="Save listing"
          className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-cream text-forest shadow-[var(--shadow-md)] transition-transform active:scale-[0.92]"
        >
          <HeartIcon className="h-[20px] w-[20px]" />
        </button>
      </div>
    </div>
  );
}
