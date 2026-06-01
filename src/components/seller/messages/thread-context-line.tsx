import Link from "next/link";

/**
 * The single hairline context line under the buyer's name (D4) — "About · 2 ×
 * Backyard eggs" linking to the order, or "About · Butter lettuce · Sold out"
 * linking to the listing. The cross-surface hero: tapping it lands on the exact
 * thing the conversation is about, where Mira's own seasonal voice already
 * speaks. Orderless threads render the quiet "Just talking" line, not nothing.
 */
const CLS =
  "block border-y border-forest/12 py-[10px] font-mono text-[10px] uppercase tracking-[0.12em] text-mid-forest";

export function ThreadContextLine({ label, href }: { label: string; href: string | null }) {
  if (!href) return <p className={CLS}>{label}</p>;
  return (
    <Link href={href} className={`${CLS} transition-opacity active:opacity-60`}>
      {label} <span className="text-forest">→</span>
    </Link>
  );
}
