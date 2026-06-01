import Link from "next/link";

/**
 * The hero of the surface: a returning buyer as a named person with a remembered
 * detail, linking straight to their correspondence — not a retention rate, not a
 * cohort. Analytics that refuses to abstract people into a statistic. The thread
 * link appears when one exists.
 */
export function RepeatBuyerRow({
  buyer,
  line,
  threadHref,
}: {
  buyer: string;
  line: string;
  threadHref: string | null;
}) {
  return (
    <div className="border-t border-forest/12 py-[14px] first:border-t-0 first:pt-0">
      <p className="max-w-[600px] text-[15px] leading-[1.5] text-charcoal">
        <span className="font-medium text-deepest-forest">{buyer}</span> — {line}
      </p>
      {threadHref ? (
        <Link
          href={threadHref}
          className="mt-[5px] inline-flex items-center gap-[5px] font-mono text-[10px] uppercase tracking-[0.12em] text-forest transition-opacity active:opacity-60"
        >
          Open the thread <span aria-hidden>→</span>
        </Link>
      ) : null}
    </div>
  );
}
