import type { Metadata } from "next";
import { sellerBySlug } from "@/lib/data/seller-bySlug";
import { sellersById } from "@/lib/data/sellers";
import { conversationsFor } from "@/lib/data/messages";
import { InboxList } from "@/components/seller/messages/inbox-list";

// Per-request so ?as= carries the demo identity through, like the rest of the
// seller flow.
export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Messages" };

const DEMO_SELLER = "miras-half-acre";

type SearchParams = { searchParams: Promise<{ as?: string }> };

export default async function MessagesPage({ searchParams }: SearchParams) {
  const { as } = await searchParams;
  const seller = (as ? sellerBySlug(as) : undefined) ?? sellersById[DEMO_SELLER];
  const convs = conversationsFor(seller.id);

  return (
    <div className="flex flex-col gap-[24px] px-[24px] pb-[40px] pt-[16px] lg:px-[44px] lg:pt-[28px]">
      <header className="max-w-[620px]">
        <p className="eyebrow mb-[12px]">Messages</p>
        <h1 className="text-[30px] font-bold leading-[1.05] tracking-[-0.03em] text-deepest-forest [&_em]:font-emphasis [&_em]:font-normal [&_em]:italic [&_em]:text-forest lg:text-[38px]">
          Letters from your <em>buyers</em>.
        </h1>
        <p className="mt-[12px] text-[15px] leading-[1.5] text-charcoal lg:text-[16px]">
          Short notes from the people who buy from you.
        </p>
      </header>

      {convs.length > 0 ? (
        <InboxList conversations={convs} sellerId={seller.id} />
      ) : (
        <p className="max-w-[520px] text-[15px] leading-[1.55] text-mid-forest">
          No letters yet. They&rsquo;ll arrive here as buyers reach out.
        </p>
      )}
    </div>
  );
}
