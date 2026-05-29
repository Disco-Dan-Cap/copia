import { LeafMark } from "@/components/ui/leaf-mark";
import { LeafWaveDefs } from "@/components/ui/leaf-wave-defs";
import { DemoViewChip } from "@/components/app/demo-view-chip";
import { SellerSidebar } from "@/components/seller/seller-sidebar";
import { SellerTabBar } from "@/components/seller/seller-tabbar";

/**
 * Seller shell — deliberately NOT the buyer (app) phone column. On desktop it's
 * the validated hero spread: deepest-forest sidebar + a wide main. On mobile
 * it's a phone column with a cream top bar and a deepest-forest bottom tab bar.
 * The seller does their planning at a table; the buyer browses on a phone.
 */
export default function SellerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-dvh w-full overflow-hidden bg-cream">
      <LeafWaveDefs />
      <SellerSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile top bar (desktop carries the brand in the sidebar) */}
        <header className="safe-top border-b border-forest/12 bg-cream lg:hidden">
          <div className="flex items-center justify-between px-[20px] pt-[6px] pb-[12px]">
            <div className="flex items-center gap-[9px]">
              <LeafMark className="h-[24px] w-[18px] text-forest" />
              <span className="font-display text-[17px] font-bold tracking-[-0.04em] text-forest">
                Copia
              </span>
            </div>
            <DemoViewChip href="/" label="Buyer view" dir="back" tone="light" />
          </div>
        </header>
        <main className="min-h-0 flex-1 overflow-y-auto overscroll-contain">{children}</main>
        <SellerTabBar />
      </div>
    </div>
  );
}
