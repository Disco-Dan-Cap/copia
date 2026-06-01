/**
 * The almanac header — a printed-record dateline (farm + span) over the title
 * and a single hand-authored opening sentence. Numbers live inside the
 * sentence, never in a KPI card.
 */
export function SeasonDateline({
  sellerName,
  spanLabel,
  opening,
}: {
  sellerName: string;
  spanLabel: string;
  opening: string;
}) {
  return (
    <header className="max-w-[620px]">
      <p className="eyebrow mb-[12px]">
        {sellerName} · {spanLabel}
      </p>
      <h1 className="text-[30px] font-bold leading-[1.05] tracking-[-0.03em] text-deepest-forest [&_em]:font-emphasis [&_em]:font-normal [&_em]:italic [&_em]:text-forest lg:text-[38px]">
        The season, <em>so far</em>.
      </h1>
      <p className="mt-[14px] text-[16px] leading-[1.55] text-charcoal lg:text-[17px]">{opening}</p>
    </header>
  );
}
