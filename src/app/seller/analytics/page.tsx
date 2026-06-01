import type { Metadata } from "next";
import { sellerBySlug } from "@/lib/data/seller-bySlug";
import { sellersById } from "@/lib/data/sellers";
import {
  demandGaps,
  repeatBuyers,
  revenueByListing,
  seasonFrame,
  seasonOpeningFor,
} from "@/lib/data/analytics";
import { conversationForBuyer } from "@/lib/data/messages";
import { formatEditorialCount } from "@/lib/format";
import { SeasonDateline } from "@/components/seller/analytics/season-dateline";
import { AlmanacSection } from "@/components/seller/analytics/almanac-section";
import { CropLedgerRow } from "@/components/seller/analytics/crop-ledger-row";
import { RepeatBuyerRow } from "@/components/seller/analytics/repeat-buyer-row";
import { DemandGapRow } from "@/components/seller/analytics/demand-gap-row";

// Per-request so the season span tracks the visitor's real date and ?as= carries
// the demo identity through. A record, so it's server-rendered — no client state.
export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Analytics" };

const DEMO_SELLER = "miras-half-acre";

type SearchParams = { searchParams: Promise<{ as?: string }> };

export default async function AnalyticsPage({ searchParams }: SearchParams) {
  const { as } = await searchParams;
  const seller = (as ? sellerBySlug(as) : undefined) ?? sellersById[DEMO_SELLER];
  const now = new Date();

  const crops = revenueByListing(seller.id);
  const buyers = repeatBuyers(seller.id);
  const gaps = demandGaps(seller.id);
  const frame = seasonFrame(seller.id, now);
  const topRevenue = crops[0]?.revenue ?? 1;

  return (
    <div className="flex flex-col gap-[36px] px-[24px] pb-[48px] pt-[16px] lg:gap-[44px] lg:px-[44px] lg:pt-[28px]">
      <SeasonDateline
        sellerName={seller.name}
        spanLabel={frame.spanLabel}
        opening={seasonOpeningFor(seller.id)}
      />

      {crops.length > 0 ? (
        <AlmanacSection eyebrow="What sold" title="Crops that earned their bed.">
          <div>
            {crops.map((c, i) => (
              <CropLedgerRow
                key={c.listingId}
                rank={i + 1}
                name={c.name}
                revenue={c.revenue}
                proportion={c.revenue / topRevenue}
                href={`/seller/listings/${c.listingId}?as=${seller.id}`}
              />
            ))}
          </div>
        </AlmanacSection>
      ) : null}

      {buyers.length > 0 ? (
        <AlmanacSection eyebrow="Who came back" title="The ones who keep coming back.">
          <div>
            {buyers.map((b) => {
              const thread = conversationForBuyer(seller.id, b.buyer);
              return (
                <RepeatBuyerRow
                  key={b.buyer}
                  buyer={b.buyer}
                  line={b.line}
                  threadHref={thread ? `/seller/messages/${thread.id}?as=${seller.id}` : null}
                />
              );
            })}
          </div>
        </AlmanacSection>
      ) : null}

      {gaps.length > 0 ? (
        <AlmanacSection eyebrow="Searched, didn't find" title="Asked for, and not on the table.">
          <div>
            {gaps.map((g) => (
              <DemandGapRow
                key={g.listingId}
                query={g.query}
                weekCount={g.weekCount}
                name={g.name}
                reason={g.reason}
                href={`/seller/listings/${g.listingId}?as=${seller.id}`}
              />
            ))}
          </div>
        </AlmanacSection>
      ) : null}

      {frame.reviewCount > 0 ? (
        <p className="border-t border-forest/12 pt-[20px] text-[14px] leading-[1.5] text-mid-forest">
          {formatEditorialCount(frame.reviewCount)} notes this season, averaging{" "}
          {frame.reviewAvg.toFixed(1)}.
        </p>
      ) : null}
    </div>
  );
}
