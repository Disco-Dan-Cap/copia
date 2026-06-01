"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useHasUnread } from "./messages/messages-store";
import { sellerTabItems } from "./seller-nav";

/**
 * Mobile seller nav — a deepest-forest bottom tab bar that echoes the desktop
 * sidebar, so the seller area reads as its own place (distinct from the buyer's
 * cream tab bar). Inert items render as buttons, like the buyer tab bar.
 */
export function SellerTabBar() {
  const pathname = usePathname();
  const hasUnread = useHasUnread();

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
            <span className="relative">
              <Icon className="h-[22px] w-[22px]" />
              {href === "/seller/messages" && hasUnread ? (
                <span className="absolute -right-[4px] -top-[2px] h-[6px] w-[6px] rounded-full bg-terracotta" />
              ) : null}
            </span>
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
