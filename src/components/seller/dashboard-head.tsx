import { formatEditorialCount } from "@/lib/format";

/**
 * The greeting block. The lede stays in the editorial register: a quiet day
 * reads "Today is quiet — nothing scheduled yet," never "0 pickups today."
 */
export function DashboardHead({
  greeting,
  name,
  meta,
  todayPickups,
}: {
  greeting: string;
  name: string;
  meta: string;
  todayPickups: number;
}) {
  const lede =
    todayPickups > 0
      ? `${formatEditorialCount(todayPickups)} pickup${todayPickups === 1 ? "" : "s"} today — here's what to know.`
      : "Today is quiet — nothing scheduled yet.";

  return (
    <header>
      <div className="mb-[12px] font-mono text-[10.5px] uppercase tracking-[0.16em] text-forest">
        {meta}
      </div>
      <h1 className="text-[32px] font-bold leading-[1.0] tracking-[-0.035em] text-deepest-forest lg:text-[42px]">
        {greeting}, <em className="font-emphasis font-normal italic text-forest">{name}.</em>
      </h1>
      <p className="mt-[12px] max-w-[520px] text-[15px] leading-[1.45] text-charcoal lg:text-[16px]">
        {lede}
      </p>
    </header>
  );
}
