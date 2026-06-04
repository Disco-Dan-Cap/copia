import Link from "next/link";
import { LeafMark } from "@/components/ui/leaf-mark";
import { ChevronDownIcon } from "@/components/ui/icons";
import { BasketLink } from "@/components/app/basket-link";

/**
 * Buyer app header — flat wordmark + current location. Sits at the top of the
 * scroll. `safe-top` keeps it clear of the notch / Dynamic Island in
 * standalone PWA mode (no effect on desktop).
 */
export function AppHeader() {
  return (
    <header className="safe-top bg-cream">
      <div className="flex items-center justify-between border-b border-forest/12 px-[24px] pt-[4px] pb-[14px]">
        <Link href="/" className="flex items-center" aria-label="Copia — home">
          <LeafMark className="h-[30px] w-[22px] text-forest" />
          {/* Simplified wordmark per leaf-mark spec — never the gummy logo in nav. */}
          <span className="ml-[9px] font-display text-[19px] font-bold tracking-[-0.04em] text-forest">
            Copia
          </span>
        </Link>
        <div className="flex items-center gap-[16px]">
          <button
            type="button"
            className="flex min-h-[44px] items-center gap-[5px] font-mono text-[10.5px] uppercase tracking-[0.12em] text-mid-forest active:opacity-60"
            aria-label="Change location — currently Austin, TX"
          >
            Austin, TX
            <ChevronDownIcon className="h-[10px] w-[10px]" />
          </button>
          <BasketLink />
        </div>
      </div>
    </header>
  );
}
