import { LeafMark } from "@/components/ui/leaf-mark";
import { LeafWave } from "@/components/ui/leaf-wave";

/**
 * "Start growing to sell" — the seller on-ramp. One editorial mint banner near
 * the bottom of the scroll, not an interruption. Medium Leaf Wave behind the
 * mark; Fraunces-italic emphasis carries the invitation.
 */
export function GrowCta() {
  return (
    <section className="px-[28px] pt-[8px]">
      <button
        type="button"
        className="relative flex w-full items-center gap-[16px] overflow-hidden rounded-[14px] bg-mint p-[22px] text-left text-deepest-forest transition-transform active:scale-[0.99]"
      >
        <LeafWave
          density="medium"
          opacity={0.45}
          className="absolute inset-0 h-full w-full text-deepest-forest"
        />
        <LeafMark className="relative z-[2] h-[44px] w-[32px] text-deepest-forest" />
        <div className="relative z-[2]">
          <div className="text-[14px] font-semibold leading-[1.25] tracking-[-0.01em]">
            Got a yard?{" "}
            <em className="font-emphasis font-normal italic">Start growing to sell.</em>
          </div>
          <div className="mt-[6px] font-mono text-[9.5px] uppercase tracking-[0.14em] text-forest">
            A walkthrough →
          </div>
        </div>
      </button>
    </section>
  );
}
