import { BottomTabBar } from "@/components/app/bottom-tab-bar";
import { DemoViewChip } from "@/components/app/demo-view-chip";
import { LeafWaveDefs } from "@/components/ui/leaf-wave-defs";

/**
 * Buyer app shell: a centered iPhone-width column (the product is iPhone-first;
 * desktop is the secondary, recruiter view). The shell owns only the persistent
 * chrome — the bottom tab bar — and pins it inside the safe area. Each screen
 * supplies its own header and scroll model: Home scrolls as one column, Search
 * keeps fixed chrome with internal scroll regions and a full-bleed map view.
 */
export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex h-dvh w-full max-w-[480px] flex-col overflow-hidden bg-cream sm:border-x sm:border-forest/10">
      <LeafWaveDefs />
      {/* Demo meta-chrome: lets a recruiter cross to the seller side from any
          buyer surface. Reads as a portfolio control, not in-product nav. */}
      <div className="safe-top shrink-0 border-b border-dashed border-sage-shadow/40 bg-cream">
        <div className="flex items-center justify-between px-[24px] py-[6px]">
          <span className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-sage-shadow">
            Demo
          </span>
          <DemoViewChip href="/seller/dashboard" label="Seller view" dir="forward" tone="light" />
        </div>
      </div>
      {children}
      <BottomTabBar />
    </div>
  );
}
