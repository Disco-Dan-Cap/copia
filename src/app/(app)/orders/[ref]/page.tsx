import type { Metadata } from "next";
import { buyerOrders } from "@/lib/data/buyer-orders";
import { OrderDetail } from "@/components/orders/order-detail";

export const metadata: Metadata = { title: "Your arrangement" };

type Params = { params: Promise<{ ref: string }> };

// The seed order (if any) resolves server-side for SSR and the no-JS path; a
// session-created order with the same ref resolves client-side in OrderDetail.
export default async function OrderDetailPage({ params }: Params) {
  const { ref } = await params;
  const seedOrder = buyerOrders.find((o) => o.ref === ref) ?? null;
  return <OrderDetail orderRef={ref} seedOrder={seedOrder} />;
}
