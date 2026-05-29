import type { ReactElement } from "react";
import {
  GridIcon,
  OrdersIcon,
  ListingsIcon,
  CalendarIcon,
  MessagesIcon,
  AnalyticsIcon,
  SettingsIcon,
} from "@/components/ui/icons";

export interface SellerNavItem {
  label: string;
  href: string;
  Icon: (props: { className?: string }) => ReactElement;
  /** Whether the destination exists yet. Inert (present, pressable, no nav) if not. */
  ready: boolean;
  section: "main" | "insights";
}

// One source of truth for the seller nav — rendered as the desktop sidebar and
// the mobile bottom tab bar. Only Dashboard is built; the rest are inert
// placeholders (same pattern as the buyer tab bar's Cart/Profile).
export const sellerNavItems: SellerNavItem[] = [
  { label: "Dashboard", href: "/seller/dashboard", Icon: GridIcon, ready: true, section: "main" },
  { label: "Orders", href: "/seller/orders", Icon: OrdersIcon, ready: true, section: "main" },
  { label: "Listings", href: "/seller/listings", Icon: ListingsIcon, ready: false, section: "main" },
  { label: "Calendar", href: "/seller/calendar", Icon: CalendarIcon, ready: false, section: "main" },
  { label: "Messages", href: "/seller/messages", Icon: MessagesIcon, ready: false, section: "main" },
  { label: "Analytics", href: "/seller/analytics", Icon: AnalyticsIcon, ready: false, section: "insights" },
  { label: "Settings", href: "/seller/settings", Icon: SettingsIcon, ready: false, section: "insights" },
];

/** The five primary destinations carried by the mobile tab bar. */
export const sellerTabItems = sellerNavItems.filter((i) => i.section === "main");
