import type { Dispatch, SetStateAction } from "react";
import type { CategoryKey, FulfillmentMode } from "@/lib/data/types";
import { categoryLabels, categoryOrder } from "@/lib/data/labels";
import type { SearchFilters } from "@/lib/search/query";
import { Pill } from "./pill";

const DELIVERY_MODES: FulfillmentMode[] = ["bicycle", "motorcycle", "drone", "zipline"];

/**
 * Horizontal quick-filter row. One-tap toggles that stay in sync with the full
 * filter sheet (both edit the same `filters` object).
 */
export function FilterChips({
  filters,
  setFilters,
}: {
  filters: SearchFilters;
  setFilters: Dispatch<SetStateAction<SearchFilters>>;
}) {
  const toggleCategory = (c: CategoryKey) =>
    setFilters((f) => ({
      ...f,
      categories: f.categories.includes(c)
        ? f.categories.filter((x) => x !== c)
        : [...f.categories, c],
    }));

  const deliveryActive = DELIVERY_MODES.some((m) => filters.fulfillment.includes(m));
  const toggleDelivery = () =>
    setFilters((f) => ({
      ...f,
      fulfillment: deliveryActive
        ? f.fulfillment.filter((m) => !DELIVERY_MODES.includes(m))
        : [...new Set([...f.fulfillment, ...DELIVERY_MODES])],
    }));

  return (
    <div className="scroll-x-momentum flex shrink-0 gap-[8px] overflow-x-auto border-b border-forest/12 bg-cream px-[24px] py-[12px]">
      <Pill active={filters.categories.length === 0} onClick={() => setFilters((f) => ({ ...f, categories: [] }))}>
        All
      </Pill>
      {categoryOrder.map((c) => (
        <Pill key={c} active={filters.categories.includes(c)} onClick={() => toggleCategory(c)}>
          {categoryLabels[c]}
        </Pill>
      ))}
      <Pill
        active={filters.maxDistanceMi === 5}
        onClick={() => setFilters((f) => ({ ...f, maxDistanceMi: f.maxDistanceMi === 5 ? null : 5 }))}
      >
        Within 5 mi
      </Pill>
      <Pill active={deliveryActive} onClick={toggleDelivery}>
        Delivery
      </Pill>
    </div>
  );
}
