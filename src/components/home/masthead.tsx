import { LeafWave } from "@/components/ui/leaf-wave";

/**
 * The Home masthead — the screen's memorable moment. Reads like the cover of a
 * farmers-market newsletter: editorial headline (body face, bold) with a single
 * load-bearing Fraunces-italic emphasis, over a sparse Leaf Wave wash.
 */
export function Masthead() {
  return (
    <section className="relative overflow-hidden bg-cream px-[28px] pt-[32px] pb-[28px]">
      <LeafWave
        density="sparse"
        opacity={0.5}
        className="absolute inset-0 h-full w-full text-sage opacity-40"
      />
      <div className="relative z-[2]">
        <p className="mb-[14px] font-mono text-[10px] uppercase tracking-[0.16em] text-mid-forest">
          26 May · Zone 9a · Week 22
        </p>
        <h2 className="mb-[14px] text-[38px] font-bold leading-[0.98] tracking-[-0.04em] text-deepest-forest">
          Peaches are{" "}
          <em className="font-emphasis font-normal italic text-forest">early</em>{" "}
          this year.
        </h2>
        <p className="text-[14px] leading-[1.55] text-charcoal">
          The Hill Country saw a warm May. Stone fruit is two weeks ahead of last
          year, and your sellers are catching up — six new listings in the past day.
        </p>
        <p className="mt-[16px] font-mono text-[9.5px] uppercase tracking-[0.14em] text-sage-shadow">
          — from your weekly thread
        </p>
      </div>
    </section>
  );
}
