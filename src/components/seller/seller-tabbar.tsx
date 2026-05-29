"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { sellerTabItems } from "./seller-nav";

/**
 * Mobile seller nav — a deepest-forest bottom tab bar that echoes the desktop
 * sidebar, so the seller area reads as its own place (distinct from the buyer's
 * cream tab bar). Inert items render as buttons, like the buyer tab bar.
 */
export function SellerTabBar() {
  const pathname = usePathname();

  return (
    <nav className="safe-bottom flex items-center justify-around bg-deepest-forest px-[14px] pt-[12px] pb-[12px] lg:hidden">
      {sellerTabItems.map(({ label, href, Icon, ready }) => {
        const active = pathname === href;
        const inner = (
          <span
            className={cn(
              "flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-[4px] transition-opacity active:opacity-60",
              active ? "text-mint" : "text-cream/60",
            )}
          >
            <Icon className="h-[22px] w-[22px]" />
            <span className="font-mono text-[8.5px] uppercase tracking-[0.1em]">{label}</span>
          </span>
        );
        return ready ? (
          <Link key={label} href={href} aria-current={active ? "page" : undefined}>
            {inner}
          </Link>
        ) : (
          <button key={label} type="button" aria-label={`${label} — coming soon`}>
            {inner}
          </button>
        );
      })}
    </nav>
  );
}
