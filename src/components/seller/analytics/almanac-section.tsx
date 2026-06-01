/**
 * One almanac section — a mono-caps eyebrow + a Mira-voice header over the
 * record. The headers carry the editorial register; the content beneath is a
 * ledger or a list, never a chart widget.
 */
export function AlmanacSection({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <p className="mb-[3px] font-mono text-[10px] uppercase tracking-[0.16em] text-mid-forest">
        {eyebrow}
      </p>
      <h2 className="mb-[14px] text-[20px] font-semibold tracking-[-0.02em] text-deepest-forest lg:text-[22px]">
        {title}
      </h2>
      {children}
    </section>
  );
}
