import type { Listing } from "@/lib/data/types";

/**
 * The one editorial sentence — the page's only prose. Set larger than body with
 * the single Fraunces-italic `<em>` accent from the seed copy. (The seller page
 * tells the stories; the product page tells facts with this one anchor line.)
 */
export function ProductAnchor({ listing }: { listing: Listing }) {
  return (
    <section className="px-[24px] pt-[18px]">
      <p
        className="text-[18px] leading-[1.55] text-charcoal [&_em]:font-emphasis [&_em]:italic"
        // Seed copy only (not user input); the single <em> renders as Fraunces italic.
        dangerouslySetInnerHTML={{ __html: listing.anchor }}
      />
    </section>
  );
}
