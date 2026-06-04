"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  HomeIcon,
  SearchIcon,
  BasketIcon,
  ProfileIcon,
} from "@/components/ui/icons";

type Tab = {
  label: string;
  href: string;
  Icon: (props: { className?: string }) => React.ReactElement;
  /** Whether the destination route exists yet. */
  ready: boolean;
};

const tabs: Tab[] = [
  { label: "Home", href: "/", Icon: HomeIcon, ready: true },
  { label: "Search", href: "/search", Icon: SearchIcon, ready: true },
  { label: "Basket", href: "/basket", Icon: BasketIcon, ready: true },
  { label: "Profile", href: "/profile", Icon: ProfileIcon, ready: false },
];

/**
 * Persistent buyer tab bar, pinned to the bottom of the app shell.
 * `safe-bottom` lifts the row above the iOS home-indicator gutter; each item
 * keeps a 44pt hit target. Routes that don't exist yet render as inert
 * buttons (present, pressable, but they don't navigate to a 404).
 */
export function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav className="safe-bottom flex items-center justify-around border-t border-forest/12 bg-cream px-[24px] pt-[14px] pb-[14px]">
      {tabs.map(({ label, href, Icon, ready }) => {
        const active = pathname === href;
        const inner = (
          <span
            className={cn(
              "flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-[4px] transition-opacity active:opacity-60",
              active ? "text-forest" : "text-sage-shadow",
            )}
          >
            <Icon className="h-[22px] w-[22px]" />
            <span className="font-mono text-[8.5px] uppercase tracking-[0.12em]">
              {label}
            </span>
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
