import type { Seller } from "@/lib/data/types";
import { archetypeLabels } from "@/lib/data/labels";

/**
 * The editorial moment. A warm, specific vignette (Voice C) with a single
 * Fraunces-italic accent rendered from the `<em>` in the seed copy, followed by
 * the structured facts row in mono caps. This is where Copia stops reading like
 * a marketplace and starts reading like a publication.
 */
export function SellerStory({ seller }: { seller: Seller }) {
  const facts = [
    seller.area,
    `Since ${seller.since}`,
    archetypeLabels[seller.archetype],
    seller.philosophy,
  ].join(" · ");

  return (
    <section className="px-[24px] pt-[20px]">
      <p
        className="text-[16px] leading-[1.6] text-charcoal [&_em]:font-emphasis [&_em]:italic"
        // Seed copy only (not user input); the single <em> renders as Fraunces italic.
        dangerouslySetInnerHTML={{ __html: seller.story }}
      />
      <div className="mt-[16px] border-t border-forest/20 pt-[12px] font-mono text-[10px] uppercase tracking-[0.13em] text-mid-forest">
        {facts}
      </div>
    </section>
  );
}
