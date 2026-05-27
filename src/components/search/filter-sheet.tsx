"use client";

import type { Dispatch, SetStateAction } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CloseIcon } from "@/components/ui/icons";
import {
  archetypeLabels,
  archetypeOrder,
  categoryLabels,
  categoryOrder,
  dietLabels,
  dietOrder,
  distancePresets,
  fulfillmentLabels,
  fulfillmentOrder,
  priceTierLabels,
  priceTierOrder,
} from "@/lib/data/labels";
import { activeFilterCount, defaultFilters, type SearchFilters } from "@/lib/search/query";
import { Pill } from "./pill";
import { SegmentedControl } from "./segmented-control";

function toggleIn<T>(arr: T[], value: T): T[] {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-forest/10 px-[24px] py-[18px] first:border-t-0">
      <p className="eyebrow mb-[12px]">{title}</p>
      <div className="flex flex-wrap gap-[8px]">{children}</div>
    </div>
  );
}

interface FilterSheetProps {
  open: boolean;
  onClose: () => void;
  filters: SearchFilters;
  setFilters: Dispatch<SetStateAction<SearchFilters>>;
  resultCount: number;
}

/**
 * Full filter sheet — all six facets from brief §7. Filtering is live (toggles
 * update results behind the sheet); "Show results" just dismisses. Hand-built
 * bottom sheet with Motion, brand-styled — never a default shadcn drawer.
 */
export function FilterSheet({ open, onClose, filters, setFilters, resultCount }: FilterSheetProps) {
  const reduce = useReducedMotion();
  const count = activeFilterCount(filters);

  const set = (patch: Partial<SearchFilters>) => setFilters((f) => ({ ...f, ...patch }));

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            className="absolute inset-0 z-[40] bg-deepest-forest/45"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-label="Filters"
            className="absolute inset-x-0 bottom-0 z-[41] flex max-h-[86%] flex-col rounded-t-[24px] bg-cream shadow-[var(--shadow-lg)]"
            initial={{ y: reduce ? 0 : "100%" }}
            animate={{ y: 0 }}
            exit={{ y: reduce ? 0 : "100%" }}
            transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 38 }}
          >
            <div className="shrink-0 px-[24px] pt-[12px]">
              <div className="mx-auto h-[4px] w-[40px] rounded-full bg-sage-shadow/35" />
              <div className="mt-[14px] flex items-center justify-between">
                <h2 className="font-display text-[22px] font-bold tracking-[-0.02em] text-deepest-forest">
                  Filters
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close filters"
                  className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-cream-warm text-mid-forest active:scale-[0.95]"
                >
                  <CloseIcon className="h-[16px] w-[16px]" />
                </button>
              </div>
            </div>

            <div className="mt-[8px] min-h-0 flex-1 overflow-y-auto overscroll-contain">
              <Section title="Category">
                {categoryOrder.map((c) => (
                  <Pill
                    key={c}
                    active={filters.categories.includes(c)}
                    onClick={() => set({ categories: toggleIn(filters.categories, c) })}
                  >
                    {categoryLabels[c]}
                  </Pill>
                ))}
              </Section>

              <Section title="Price">
                <SegmentedControl
                  ariaLabel="Price range"
                  segments={priceTierOrder.map((t) => ({
                    key: t,
                    label: priceTierLabels[t],
                    selected: filters.priceTier === t,
                    onActivate: () => set({ priceTier: filters.priceTier === t ? null : t }),
                  }))}
                />
              </Section>

              <Section title="Distance">
                <SegmentedControl
                  ariaLabel="Maximum distance"
                  segments={[
                    {
                      key: "any",
                      label: "Any",
                      selected: filters.maxDistanceMi === null,
                      onActivate: () => set({ maxDistanceMi: null }),
                    },
                    ...distancePresets.map((d) => ({
                      key: String(d.value),
                      label: d.label,
                      selected: filters.maxDistanceMi === d.value,
                      onActivate: () =>
                        set({ maxDistanceMi: filters.maxDistanceMi === d.value ? null : d.value }),
                    })),
                  ]}
                />
              </Section>

              <Section title="Fulfillment">
                {fulfillmentOrder.map((m) => (
                  <Pill
                    key={m}
                    active={filters.fulfillment.includes(m)}
                    onClick={() => set({ fulfillment: toggleIn(filters.fulfillment, m) })}
                  >
                    {fulfillmentLabels[m]}
                  </Pill>
                ))}
              </Section>

              <Section title="Diet & lifestyle">
                {dietOrder.map((d) => (
                  <Pill
                    key={d}
                    active={filters.diet.includes(d)}
                    onClick={() => set({ diet: toggleIn(filters.diet, d) })}
                  >
                    {dietLabels[d]}
                  </Pill>
                ))}
              </Section>

              <Section title="Seller type">
                {archetypeOrder.map((a) => (
                  <Pill
                    key={a}
                    active={filters.archetypes.includes(a)}
                    onClick={() => set({ archetypes: toggleIn(filters.archetypes, a) })}
                  >
                    {archetypeLabels[a]}
                  </Pill>
                ))}
              </Section>
            </div>

            <div className="safe-bottom flex shrink-0 items-center gap-[12px] border-t border-forest/12 bg-cream px-[24px] pt-[14px] pb-[14px]">
              <button
                type="button"
                onClick={() => setFilters((f) => ({ ...defaultFilters, query: f.query }))}
                disabled={count === 0}
                className="font-mono text-[10px] uppercase tracking-[0.12em] text-mid-forest active:opacity-60 disabled:opacity-30"
              >
                Clear all
              </button>
              <button
                type="button"
                onClick={onClose}
                className="ml-auto flex h-[46px] flex-1 items-center justify-center rounded-[14px] bg-forest font-mono text-[11px] uppercase tracking-[0.12em] text-cream active:scale-[0.98]"
              >
                Show {resultCount} result{resultCount === 1 ? "" : "s"}
              </button>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
