import type { Metadata } from "next";
import { sellerBySlug } from "@/lib/data/seller-bySlug";
import { sellersById } from "@/lib/data/sellers";
import { archetypeLabels } from "@/lib/data/labels";
import { stallPrefs } from "@/lib/data/stall-prefs";
import { SettingsLedger } from "@/components/seller/settings/settings-ledger";
import { Colophon } from "@/components/seller/settings/colophon";

// Per-request so ?as= carries the demo identity through, matching the other
// seller surfaces. The masthead + colophon are static seed; the ledger between
// them is the client island that holds this session's optimistic edits.
export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Settings" };

const DEMO_SELLER = "miras-half-acre";

type SearchParams = { searchParams: Promise<{ as?: string }> };

export default async function SettingsPage({ searchParams }: SearchParams) {
  const { as } = await searchParams;
  const seller = (as ? sellerBySlug(as) : undefined) ?? sellersById[DEMO_SELLER];
  const prefs = stallPrefs(seller);

  return (
    <div className="flex flex-col gap-[36px] px-[24px] pb-[48px] pt-[16px] lg:gap-[44px] lg:px-[44px] lg:pt-[28px]">
      {/* Masthead — the stall's letterhead, not an "Account" header. The dateline
          mirrors the analytics dateline (area · since · archetype). */}
      <header className="max-w-[620px]">
        <div className="flex items-center gap-[14px]">
          <div
            className="h-[46px] w-[46px] shrink-0 rounded-full"
            style={{
              background: `linear-gradient(135deg, ${seller.avatarGradient[0]}, ${seller.avatarGradient[1]})`,
            }}
            aria-hidden
          />
          <div className="min-w-0">
            <h1 className="text-[28px] font-bold leading-[1.05] tracking-[-0.03em] text-deepest-forest lg:text-[34px]">
              {seller.name}
            </h1>
            <p className="eyebrow mt-[7px]">
              {seller.area} · Since {seller.since} · {archetypeLabels[seller.archetype]}
            </p>
          </div>
        </div>
        <p className="mt-[16px] text-[15px] leading-[1.5] text-mid-forest">
          The stall, as you keep it.
        </p>
      </header>

      <SettingsLedger sellerId={seller.id} defaults={prefs} />

      <Colophon />
    </div>
  );
}
