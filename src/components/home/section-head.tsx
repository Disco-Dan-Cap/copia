/** Shared section header: mono label on the left, optional mono action right. */
export function SectionHead({
  label,
  action,
}: {
  label: string;
  action?: string;
}) {
  return (
    <div className="flex items-baseline justify-between px-[28px] pb-[14px]">
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-forest">
        {label}
      </span>
      {action ? (
        <button
          type="button"
          className="font-mono text-[10px] uppercase tracking-[0.14em] text-mid-forest active:opacity-60"
        >
          {action}
        </button>
      ) : null}
    </div>
  );
}
