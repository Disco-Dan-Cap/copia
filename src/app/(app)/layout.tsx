import { BottomTabBar } from "@/components/app/bottom-tab-bar";
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
      {children}
      <BottomTabBar />
    </div>
  );
}
