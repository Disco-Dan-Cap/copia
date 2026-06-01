import type { ReadingConsider } from "@/lib/coach/types";

// "Coach's consider" — the single recommendation, when there's a real one. This
// is the one part of the letter, beside the prose, that the model composes: a
// crop in demand the grower isn't growing, a sold-out listing worth relisting, a
// waitlist worth opening. Rendered as editorial advice on warm cream, never as a
// card with a fake "Show me the plan" button — the advice is the thing.
export function CoachConsider({ consider }: { consider: ReadingConsider }) {
  return (
    <section className="rounded-[14px] border border-sage-shadow/30 bg-cream-warm p-[22px]">
      <div className="mb-[12px] font-mono text-[9.5px] uppercase tracking-[0.16em] text-forest">
        Coach&rsquo;s consider
      </div>
      <h3 className="mb-[12px] text-[18px] font-semibold leading-[1.25] tracking-[-0.02em] text-deepest-forest">
        {consider.heading}
      </h3>
      <p className="text-[13.5px] leading-[1.6] text-charcoal">{consider.body}</p>
    </section>
  );
}
