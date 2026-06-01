/**
 * One section of the stall ledger — a mono-caps pamphlet label over its field.
 * Deliberately a label-above-content layout (not the SaaS toggle-row), so the
 * page reads like the sections of a printed farm pamphlet. The editable prose
 * beneath carries the voice; the label just names the concern.
 */
export function StallSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <p className="mb-[10px] font-mono text-[10px] uppercase tracking-[0.16em] text-mid-forest">
        {label}
      </p>
      {children}
    </section>
  );
}
