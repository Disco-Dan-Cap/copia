import Link from "next/link";

/** Shared section header: mono label on the left, optional mono action right. */
export function SectionHead({
  label,
  action,
  actionHref,
}: {
  label: string;
  action?: string;
  /** If set, the action renders as a link to this route instead of a button. */
  actionHref?: string;
}) {
  const actionClass =
    "font-mono text-[10px] uppercase tracking-[0.14em] text-mid-forest active:opacity-60";

  return (
    <div className="flex items-baseline justify-between px-[28px] pb-[14px]">
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-forest">
        {label}
      </span>
      {action ? (
        actionHref ? (
          <Link href={actionHref} className={actionClass}>
            {action}
          </Link>
        ) : (
          <button type="button" className={actionClass}>
            {action}
          </button>
        )
      ) : null}
    </div>
  );
}
