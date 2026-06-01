import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Conversation } from "@/lib/data/messages";
import { conversationById, conversationForOrder } from "@/lib/data/messages";
import { orderById } from "@/lib/data/orders";
import { listingById, listingStatus } from "@/lib/data/listings";
import { MessageThread } from "@/components/seller/messages/message-thread";
import { ThreadContextLine } from "@/components/seller/messages/thread-context-line";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Messages" };

type Params = { params: Promise<{ id: string }>; searchParams: Promise<{ as?: string }> };

// An order's Message button links to its seeded thread, or to "order-{id}" for a
// buyer without one — resolved here into an empty correspondence so every button
// lands somewhere coherent.
function emptyThreadForOrder(orderId: string, id: string): Conversation | null {
  const order = orderById(orderId);
  if (!order) return null;
  const listing = listingById(order.listingId);
  const first = order.buyer.split(" ")[0];
  return {
    id,
    sellerId: listing?.sellerId ?? "",
    buyer: order.buyer,
    subject: `${first}’s ${(listing?.name ?? "order").toLowerCase()}`,
    context: { kind: "order", orderId },
    messages: [],
  };
}

function resolveContext(c: Conversation, as: string): { label: string; href: string | null } {
  if (c.context?.kind === "order") {
    const order = orderById(c.context.orderId);
    const listing = order ? listingById(order.listingId) : undefined;
    if (order && listing) {
      return {
        label: `About · ${order.quantity} × ${listing.name}`,
        href: `/seller/orders/${order.id}?as=${as}`,
      };
    }
  }
  if (c.context?.kind === "listing") {
    const listing = listingById(c.context.listingId);
    if (listing) {
      const status = listingStatus(listing);
      const suffix = status === "sold-out" ? " · Sold out" : status === "paused" ? " · Paused" : "";
      return {
        label: `About · ${listing.name}${suffix}`,
        href: `/seller/listings/${listing.id}?as=${as}`,
      };
    }
  }
  return { label: "Just talking — no order yet.", href: null };
}

export default async function ThreadPage({ params, searchParams }: Params) {
  const { id } = await params;
  const { as } = await searchParams;

  let conversation = conversationById(id) ?? null;
  if (!conversation && id.startsWith("order-")) {
    const orderId = id.slice("order-".length);
    conversation = conversationForOrder(orderId) ?? emptyThreadForOrder(orderId, id);
  }
  if (!conversation) notFound();

  const backAs = as ?? conversation.sellerId;
  const context = resolveContext(conversation, backAs);

  return (
    <div className="flex flex-col gap-[18px] px-[24px] pb-[44px] pt-[16px] lg:px-[44px] lg:pt-[28px]">
      <Link
        href={`/seller/messages${backAs ? `?as=${backAs}` : ""}`}
        className="inline-flex items-center gap-[6px] font-mono text-[10px] uppercase tracking-[0.14em] text-mid-forest transition-opacity active:opacity-60"
      >
        <span aria-hidden>←</span> Messages
      </Link>

      <header className="max-w-[600px]">
        <p className="eyebrow mb-[8px]">{conversation.subject}</p>
        <h1 className="text-[28px] font-bold tracking-[-0.02em] text-deepest-forest lg:text-[32px]">
          {conversation.buyer}
        </h1>
      </header>

      <ThreadContextLine label={context.label} href={context.href} />

      <MessageThread conversation={conversation} />
    </div>
  );
}
