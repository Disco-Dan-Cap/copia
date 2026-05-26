import { AppHeader } from "@/components/app/app-header";
import { BottomTabBar } from "@/components/app/bottom-tab-bar";
import { LeafWaveDefs } from "@/components/ui/leaf-wave-defs";

/**
 * Buyer app shell: a centered iPhone-width column (the product is iPhone-first;
 * desktop is the secondary, recruiter view). Header scrolls with content at the
 * top; the tab bar is pinned to the bottom; only the middle scrolls.
 */
export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex h-dvh w-full max-w-[480px] flex-col overflow-hidden bg-cream sm:border-x sm:border-forest/10">
      <LeafWaveDefs />
      <main className="flex-1 overflow-y-auto overscroll-contain">
        <AppHeader />
        {children}
      </main>
      <BottomTabBar />
    </div>
  );
}
