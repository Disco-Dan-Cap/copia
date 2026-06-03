import Link from "next/link";
import { LeafMark } from "@/components/ui/leaf-mark";
import { InstallAffordance } from "@/components/pwa/install-invitation";

/**
 * The foot of the last seller surface — Copia's colophon, like the printer's
 * mark on the back of a seed packet. The one place in the seller app where the
 * brand signs its own work: the leaf mark + the simplified wordmark (never the
 * gummy one in-app, never the mark on its own motif), the brand's thesis in
 * Fraunces italic, an edition line in mono, and Sign out as a small forest text
 * link — never a button, never system blue.
 */
export function Colophon() {
  return (
    <footer className="border-t border-forest/12 pt-[22px]">
      <div className="flex items-center gap-[9px]">
        <LeafMark className="h-[22px] w-[16px] text-forest" />
        <span className="font-display text-[17px] font-bold tracking-[-0.04em] text-forest">
          Copia
        </span>
      </div>
      <p className="mt-[10px] font-emphasis text-[14px] italic text-mid-forest">
        Heritage outside, future inside.
      </p>
      {/* The door the dismiss copy promises — always here, in the same place. */}
      <InstallAffordance />
      <div className="mt-[18px] flex items-center justify-between">
        <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-sage-shadow">
          Edition 12 · Austin, TX
        </span>
        <Link
          href="/"
          className="text-[13px] text-forest underline decoration-forest/30 underline-offset-2 transition-opacity active:opacity-60"
        >
          Sign out
        </Link>
      </div>
    </footer>
  );
}
