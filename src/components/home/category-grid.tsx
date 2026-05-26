import type { CategoryKey } from "@/lib/data/types";
import { categories } from "@/lib/data/categories";
import {
  VegetablesIcon,
  EggsIcon,
  BakedIcon,
  HoneyIcon,
} from "@/components/ui/icons";
import { SectionHead } from "./section-head";

const iconFor: Record<CategoryKey, (props: { className?: string }) => React.ReactElement> = {
  vegetables: VegetablesIcon,
  eggs: EggsIcon,
  baked: BakedIcon,
  honey: HoneyIcon,
};

export function CategoryGrid() {
  return (
    <section className="pt-[28px] pb-[8px]">
      <SectionHead label="Browse by" />
      <div className="grid grid-cols-2 gap-[10px] px-[28px] pb-[8px]">
        {categories.map((category) => {
          const Icon = iconFor[category.icon];
          return (
            <button
              key={category.id}
              type="button"
              className="flex flex-col gap-[8px] rounded-[12px] border border-sage-shadow/20 bg-cream-warm px-[16px] py-[18px] text-left transition-transform active:scale-[0.98]"
            >
              <Icon className="h-[22px] w-[22px] text-forest" />
              <div className="text-[13px] font-semibold tracking-[-0.01em] text-deepest-forest">
                {category.label}
              </div>
              <div className="font-mono text-[9.5px] uppercase tracking-[0.1em] text-mid-forest">
                {category.count} listings
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
