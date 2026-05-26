import { featuredSellers } from "@/lib/data/sellers";
import { SectionHead } from "./section-head";

export function SellerList() {
  return (
    <section className="pt-[28px] pb-[8px]">
      <SectionHead label="Sellers near you" action="All" />
      <div className="flex flex-col gap-[14px] px-[28px] pb-[8px]">
        {featuredSellers.map((seller) => (
          <article
            key={seller.id}
            className="flex gap-[14px] rounded-[14px] border border-sage-shadow/25 bg-cream-warm p-[14px]"
          >
            <div
              className="h-[56px] w-[56px] shrink-0 rounded-[12px]"
              style={{
                backgroundImage: `linear-gradient(135deg, ${seller.avatarGradient[0]} 0%, ${seller.avatarGradient[1]} 100%)`,
              }}
            />
            <div className="min-w-0 flex-1">
              <div className="text-[14.5px] font-semibold tracking-[-0.01em] text-deepest-forest">
                {seller.name}
              </div>
              <div className="mt-[2px] font-mono text-[9.5px] uppercase tracking-[0.1em] text-mid-forest">
                {seller.distance} · {seller.area}
              </div>
              <p className="mt-[6px] text-[12.5px] leading-[1.4] text-charcoal">
                {seller.blurb}
              </p>
              {seller.newListings ? (
                <div className="mt-[8px] flex items-center gap-[5px] font-mono text-[9px] uppercase tracking-[0.12em] text-terracotta">
                  <span className="h-[5px] w-[5px] rounded-full bg-terracotta" />
                  {seller.newListings} new listing{seller.newListings > 1 ? "s" : ""}
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
