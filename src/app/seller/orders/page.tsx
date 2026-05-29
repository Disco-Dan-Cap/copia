import type { Metadata } from "next";
import Link from "next/link";
import { sellerBySlug } from "@/lib/data/seller-bySlug";
import { sellersById } from "@/lib/data/sellers";
import { sellerOrderGroups } from "@/lib/data/orders";
import { OrderStream } from "@/components/seller/orders/order-stream";

// Per-request so "today" / "this week" track the visitor's real date and the
// demo identity (?as=) carries through, the same honesty pattern as the rest
// of the seller flow.
export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Orders" };

const DEMO_SELLER = "miras-half-acre";

type SearchParams = { searchParams: Promise<{ as?: string; when?: string }> };

export default async function OrdersPage({ searchParams }: SearchParams) {
  const { as, when } = await searchParams;
  // Same fallback as the dashboard — a bad ?as= lands on Mira, never a 404.
  const seller = (as ? sellerBySlug(as) : undefined) ?? sellersById[DEMO_SELLER];
  const now = new Date();

  // `?when=today` arrives from the dashboard's pickups figure — pre-filter to
  // just today's group, with a quiet way back to the full log.
  const onlyToday = when === "today";
  const allGroups = sellerOrderGroups(seller.id);
  const hasAny = allGroups.length > 0;
  const groups = onlyToday ? allGroups.filter((g) => g.key === "today") : allGroups;

  return (
    <div className="flex flex-col gap-[24px] px-[24px] pb-[40px] pt-[16px] lg:px-[44px] lg:pt-[28px]">
      <header className="max-w-[620px]">
        <p className="eyebrow mb-[12px]">Orders</p>
        <h1 className="text-[30px] font-bold leading-[1.05] tracking-[-0.03em] text-deepest-forest [&_em]:font-emphasis [&_em]:font-normal [&_em]:italic [&_em]:text-forest lg:text-[38px]">
          Who&rsquo;s coming, and <em>when</em>.
        </h1>
        <p className="mt-[12px] text-[15px] leading-[1.5] text-charcoal lg:text-[16px]">
          Every order as it landed. Confirm what&rsquo;s ready — I&rsquo;ll keep the week&rsquo;s plan in step.
        </p>
      </header>

      {onlyToday ? (
        <div className="flex items-center gap-[14px]">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-mid-forest">
            Showing · Today
          </span>
          <Link
            href={`/seller/orders?as=${seller.id}`}
            className="border-b border-forest pb-[1px] font-mono text-[10px] uppercase tracking-[0.14em] text-forest transition-opacity active:opacity-60"
          >
            All orders
          </Link>
        </div>
      ) : null}

      {!hasAny ? (
        <p className="max-w-[520px] text-[16px] leading-[1.55] text-mid-forest">
          Quiet here. New ground — your first orders will land on this page.
        </p>
      ) : groups.length === 0 ? (
        <p className="max-w-[520px] text-[16px] leading-[1.55] text-mid-forest">
          Nothing scheduled for today. The rest of your week is under{" "}
          <span className="font-medium text-forest">All orders</span>.
        </p>
      ) : (
        <OrderStream groups={groups} now={now} sellerId={seller.id} />
      )}
    </div>
  );
}
