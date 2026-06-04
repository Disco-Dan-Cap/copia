import type { Metadata } from "next";
import { OrdersView } from "@/components/orders/orders-view";

export const metadata: Metadata = { title: "Your orders" };

// The buyer's record lives partly in client state (this session's settled orders)
// layered over a seed, so the page is a thin shell over the client view — the
// same shape as the basket and checkout pages.
export default function OrdersPage() {
  return <OrdersView />;
}
