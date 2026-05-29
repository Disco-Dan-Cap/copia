import type { Seller } from "@/lib/data/types";
import { sellers } from "@/lib/data/sellers";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "@/components/ui/icons";

/**
 * Demo identity switcher. Reads as meta-chrome — dashed hairline, mono-caps
 * "Viewing as" prefix, muted — so it's obvious in screenshots that this is a
 * portfolio control, not a seller affordance. Native <details>, no JS; each
 * option is a plain link carrying ?as=<slug>.
 */
export function IdentityChip({ current }: { current: Seller }) {
  return (
    <details className="relative inline-block text-left">
      <summary className="flex cursor-pointer list-none items-center gap-[6px] rounded-full border border-dashed border-sage-shadow/50 px-[11px] py-[6px] [&::-webkit-details-marker]:hidden">
        <span className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-sage-shadow">
          Viewing as
        </span>
        <span className="text-[11px] font-medium text-mid-forest">{current.name}</span>
        <ChevronDownIcon className="h-[9px] w-[9px] text-sage-shadow" />
      </summary>
      <div className="absolute right-0 z-[20] mt-[6px] max-h-[320px] w-[230px] overflow-y-auto rounded-[12px] border border-sage-shadow/30 bg-cream p-[6px] shadow-[var(--shadow-md)]">
        <div className="px-[10px] pb-[6px] pt-[4px] font-mono text-[8.5px] uppercase tracking-[0.16em] text-sage-shadow">
          Demo · choose a seller
        </div>
        {sellers.map((s) => (
          <a
            key={s.id}
            href={`/seller/dashboard?as=${s.id}`}
            className={cn(
              "block rounded-[8px] px-[10px] py-[7px] text-[12px] transition-colors",
              s.id === current.id
                ? "bg-forest/8 font-medium text-forest"
                : "text-charcoal active:bg-sage-shadow/10",
            )}
          >
            {s.name}
          </a>
        ))}
      </div>
    </details>
  );
}
