import { LeafMark } from "@/components/ui/leaf-mark";
import { InstallAffordance } from "@/components/pwa/install-invitation";

/**
 * The foot of the buyer's record — the buyer-side colophon, mirroring the seller
 * Settings one. The brand signs its work (leaf mark + simplified wordmark, never
 * the gummy logo in-app), the thesis sits in Fraunces italic, and the install
 * affordance lives here permanently: this is the home the install invitation's
 * dismiss copy promises, the buyer-side equivalent of the seller's Settings door.
 */
export function OrdersColophon() {
  return (
    <footer className="mt-[8px] border-t border-forest/12 px-[24px] pt-[22px]">
      <div className="flex items-center gap-[9px]">
        <LeafMark className="h-[22px] w-[16px] text-forest" />
        <span className="font-display text-[17px] font-bold tracking-[-0.04em] text-forest">
          Copia
        </span>
      </div>
      <p className="mt-[10px] font-emphasis text-[14px] italic text-mid-forest">
        A market that remembers who grew it.
      </p>
      {/* The door the dismiss copy promises — always here, in the same place. */}
      <InstallAffordance />
      <p className="mt-[18px] font-mono text-[9.5px] uppercase tracking-[0.16em] text-sage-shadow">
        Edition 12 · Austin, TX
      </p>
    </footer>
  );
}
