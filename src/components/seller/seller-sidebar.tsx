"use client";

import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LeafMark } from "@/components/ui/leaf-mark";
import { LeafWave } from "@/components/ui/leaf-wave";
import { sellerNavItems } from "./seller-nav";

/**
 * Desktop seller nav — the validated hero's deepest-forest sidebar with the
 * Leaf Wave motif at 8% and a mint active state (tint + 3px left border, never
 * a solid mint fill). Hidden below lg, where the bottom tab bar takes over.
 */
export function SellerSidebar() {
  const pathname = usePathname();

  return (
    <aside className="relative hidden w-[220px] shrink-0 overflow-hidden bg-deepest-forest lg:block">
      <LeafWave
        density="sparse"
        opacity={0.5}
        className="absolute inset-0 h-full w-full text-mint opacity-[0.08]"
      />
      <div className="relative z-[2] flex flex-col py-[24px]">
        <div className="flex items-center gap-[10px] px-[22px] pb-[28px]">
          <LeafMark className="h-[28px] w-[20px] text-mint" />
          <span className="text-[18px] font-bold tracking-[-0.04em] text-cream">Copia</span>
        </div>

        <nav className="flex flex-col">
          {sellerNavItems.map((item, i) => {
            const active = pathname === item.href;
            const startsInsights =
              item.section === "insights" && sellerNavItems[i - 1]?.section !== "insights";
            const row = (
              <span
                className={cn(
                  "flex items-center gap-[10px] border-l-[3px] px-[22px] py-[11px] text-[13.5px] font-medium transition-colors",
                  active
                    ? "border-mint bg-mint/10 text-mint"
                    : "border-transparent text-cream/70",
                )}
              >
                <item.Icon className="h-[16px] w-[16px] opacity-85" />
                {item.label}
              </span>
            );
            return (
              <Fragment key={item.label}>
                {startsInsights ? (
                  <div className="px-[22px] pb-[8px] pt-[24px] font-mono text-[9.5px] uppercase tracking-[0.14em] text-cream/45">
                    Insights
                  </div>
                ) : null}
                {item.ready ? (
                  <Link href={item.href} aria-current={active ? "page" : undefined}>
                    {row}
                  </Link>
                ) : (
                  <button type="button" aria-label={`${item.label} — coming soon`} className="text-left">
                    {row}
                  </button>
                )}
              </Fragment>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
