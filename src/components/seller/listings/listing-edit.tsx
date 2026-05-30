"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { DietTag, Listing } from "@/lib/data/types";
import type { SearchDemand } from "@/lib/data/searches";
import { listingStatus } from "@/lib/data/listings";
import { closureLine } from "@/lib/data/listing-closures";
import { asteriskToHtml, htmlToAsterisk } from "@/lib/emphasis";
import { EditableText } from "./editable-text";
import { EditableAnchor } from "./editable-anchor";
import { GradientPicker } from "./gradient-picker";
import { MonthPicker } from "./month-picker";
import { DietChipsEditor } from "./diet-chips-editor";
import { PairsEditor } from "./pairs-editor";
import { StatusWord } from "./status-word";
import { applyEdit, createListing, deleteListing, nextListingId } from "./store";

type ListingStatusValue = NonNullable<Listing["status"]>;

// The card IS the editor: every field is editable in place, the gradient hero
// re-renders live, and changes are optimistic local state (reset on reload,
// per Day 7). Save/Discard appear only when the draft differs from the seed;
// Delete lives in the action cluster as a quiet text link, never on the row.

interface Draft {
  name: string;
  price: string;
  unit: string;
  gradient: [string, string];
  diet: DietTag[];
  anchor: string; // asterisk source
  growingMethod: string;
  harvestCadence: string;
  pairsWith: string[];
  peakMonths: number[];
  status: ListingStatusValue;
}

function draftFrom(l: Listing): Draft {
  return {
    name: l.name,
    price: l.price ? String(l.price) : "",
    unit: l.unit,
    gradient: [l.gradient[0], l.gradient[1]],
    diet: [...l.diet],
    anchor: htmlToAsterisk(l.anchor),
    growingMethod: l.growingMethod,
    harvestCadence: l.harvestCadence,
    pairsWith: [...l.pairsWith],
    peakMonths: [...l.peakMonths],
    status: listingStatus(l),
  };
}

const PRIMARY =
  "rounded-[8px] bg-forest px-[18px] py-[10px] text-[13px] font-medium text-cream transition-transform active:scale-[0.98]";
const SECONDARY =
  "rounded-[8px] border border-forest/30 px-[18px] py-[10px] text-[13px] font-medium text-forest transition active:scale-[0.98] active:opacity-70";
const DESTRUCTIVE =
  "font-mono text-[10.5px] uppercase tracking-[0.14em] text-sage-shadow transition-opacity active:opacity-60";
const FIELD_LABEL = "mb-[8px] font-mono text-[9.5px] uppercase tracking-[0.14em] text-mid-forest";

export function ListingEdit({
  mode,
  listing,
  demand,
  backAs,
}: {
  mode: "edit" | "new";
  listing: Listing;
  demand?: SearchDemand | null;
  backAs: string;
}) {
  const router = useRouter();
  const [original] = useState(() => draftFrom(listing));
  const [draft, setDraft] = useState<Draft>(original);
  const [saved, setSaved] = useState(false);
  const [leaving, setLeaving] = useState<string | null>(null);

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => {
    setDraft((d) => ({ ...d, [key]: value }));
    setSaved(false);
  };

  const backHref = `/seller/listings${backAs ? `?as=${backAs}` : ""}`;
  const dirty = JSON.stringify(draft) !== JSON.stringify(original);
  const priceNum = parseInt(draft.price, 10);

  function patch(): Partial<Listing> {
    return {
      name: draft.name.trim() || listing.name || "Untitled",
      price: Number.isFinite(priceNum) ? priceNum : 0,
      unit: draft.unit.trim() || "unit",
      gradient: draft.gradient,
      diet: draft.diet,
      anchor: asteriskToHtml(draft.anchor),
      growingMethod: draft.growingMethod,
      harvestCadence: draft.harvestCadence,
      pairsWith: draft.pairsWith,
      peakMonths: draft.peakMonths,
      status: draft.status,
    };
  }

  function leaveWith(message: string) {
    setLeaving(message);
    window.setTimeout(() => router.push(backHref), 1100);
  }

  function onSave() {
    if (mode === "new") {
      const id = nextListingId();
      createListing({ ...listing, ...patch(), id, sellerId: listing.sellerId });
      leaveWith(closureLine(id, draft.status));
      return;
    }
    applyEdit(listing.id, patch());
    setSaved(true);
  }

  function onDelete() {
    deleteListing(listing.id);
    leaveWith("Taken down — it's off the market.");
  }

  if (leaving) {
    return (
      <div className="flex min-h-[44vh] flex-col items-start justify-center gap-[10px] px-[24px] lg:px-[44px]">
        <p className="font-emphasis text-[22px] italic leading-[1.3] text-forest">{leaving}</p>
        <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-sage-shadow">
          Returning to your listings…
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[26px] px-[24px] pb-[52px] pt-[16px] lg:px-[44px] lg:pt-[28px]">
      <Link
        href={backHref}
        className="inline-flex items-center gap-[6px] font-mono text-[10px] uppercase tracking-[0.14em] text-mid-forest transition-opacity active:opacity-60"
      >
        <span aria-hidden>←</span> All listings
      </Link>

      <GradientPicker
        from={draft.gradient[0]}
        to={draft.gradient[1]}
        onChange={(g) => set("gradient", g)}
      />

      {/* Title block — name, live price, and the tappable status word */}
      <div>
        <div className={FIELD_LABEL}>Name</div>
        <EditableText
          value={draft.name}
          onChange={(v) => set("name", v)}
          ariaLabel="Listing name"
          placeholder="What are you growing?"
          className="text-[28px] font-bold tracking-[-0.02em] text-deepest-forest lg:text-[32px]"
        />
        <div className="mt-[12px] flex flex-wrap items-center gap-x-[18px] gap-y-[10px]">
          <PriceField
            number={draft.price}
            unit={draft.unit}
            onNumber={(v) => set("price", v.replace(/[^0-9]/g, ""))}
            onUnit={(v) => set("unit", v)}
          />
          <StatusWord status={draft.status} onChange={(s) => set("status", s)} />
        </div>
      </div>

      <div>
        <div className={FIELD_LABEL}>Diet</div>
        <DietChipsEditor value={draft.diet} onChange={(d) => set("diet", d)} />
      </div>

      <div>
        <div className={FIELD_LABEL}>The one line</div>
        <EditableAnchor
          value={draft.anchor}
          onChange={(v) => set("anchor", v)}
          placeholder="The one true thing about this — what makes it worth the trip?"
        />
      </div>

      {/* Structured facts — the buyer page's shape, made editable */}
      <dl className="divide-y divide-sage-shadow/20 overflow-hidden rounded-[14px] border border-sage-shadow/25 bg-cream-warm">
        <FactRow label="Peak">
          <MonthPicker months={draft.peakMonths} onChange={(m) => set("peakMonths", m)} />
        </FactRow>
        <FactRow label="Method">
          <EditableText
            value={draft.growingMethod}
            onChange={(v) => set("growingMethod", v)}
            ariaLabel="Growing method"
            placeholder="How it's grown"
            className="text-[16px] leading-[1.45] text-charcoal"
          />
        </FactRow>
        <FactRow label="Harvest">
          <EditableText
            value={draft.harvestCadence}
            onChange={(v) => set("harvestCadence", v)}
            ariaLabel="Harvest cadence"
            placeholder="When it's picked"
            className="text-[16px] leading-[1.45] text-charcoal"
          />
        </FactRow>
        <FactRow label="Pairs with">
          <PairsEditor value={draft.pairsWith} onChange={(p) => set("pairsWith", p)} />
        </FactRow>
      </dl>

      {demand ? <DemandLine demand={demand} /> : null}

      {(mode === "new" || dirty) && (
        <div className="flex flex-wrap items-center gap-x-[18px] gap-y-[14px]">
          <button type="button" className={PRIMARY} onClick={onSave}>
            {mode === "new" ? "Create listing" : "Save changes"}
          </button>
          {mode === "edit" ? (
            <button type="button" className={SECONDARY} onClick={() => setDraft(original)}>
              Discard
            </button>
          ) : null}
          {mode === "edit" ? (
            <button type="button" className={DESTRUCTIVE} onClick={onDelete}>
              Delete listing
            </button>
          ) : null}
        </div>
      )}

      {saved ? (
        <p className="text-[13.5px] text-mid-forest">{closureLine(listing.id, draft.status)}</p>
      ) : null}
    </div>
  );
}

/** "$5 / lb" — tapping anywhere on the string focuses the number (clarification A). */
function PriceField({
  number,
  unit,
  onNumber,
  onUnit,
}: {
  number: string;
  unit: string;
  onNumber: (v: string) => void;
  onUnit: (v: string) => void;
}) {
  const numberRef = useRef<HTMLInputElement>(null);

  return (
    <span className="inline-flex items-baseline gap-[4px] text-[20px] font-semibold text-forest">
      <span
        className="inline-flex cursor-text items-baseline gap-[2px]"
        onClick={() => numberRef.current?.focus()}
      >
        <span>$</span>
        <EditableText
          ref={numberRef}
          inline
          inputMode="numeric"
          maxLength={3}
          value={number}
          onChange={onNumber}
          ariaLabel="Price"
          placeholder="0"
          className="text-[20px] font-semibold text-forest"
        />
      </span>
      <span className="text-[16px] font-normal text-mid-forest">/</span>
      <span onClick={(e) => e.stopPropagation()}>
        <EditableText
          inline
          value={unit}
          onChange={onUnit}
          ariaLabel="Unit"
          placeholder="unit"
          className="text-[16px] font-normal text-mid-forest"
        />
      </span>
    </span>
  );
}

function FactRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-[14px] px-[16px] py-[14px]">
      <div className="w-[84px] shrink-0 pt-[6px] font-mono text-[9.5px] uppercase tracking-[0.12em] text-mid-forest">
        {label}
      </div>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

/** The light-touch cross-surface signal (D4) — one line, detail-only. */
function DemandLine({ demand }: { demand: SearchDemand }) {
  return (
    <div className="rounded-[12px] border-l-[3px] border-l-forest bg-light-sage/15 px-[16px] py-[13px]">
      <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-forest">
        Demand · nearby
      </div>
      <p
        className="mt-[6px] text-[13.5px] leading-[1.5] text-mid-forest [&_em]:font-emphasis [&_em]:italic [&_em]:text-forest"
        // Seed copy only (not seller input).
        dangerouslySetInnerHTML={{ __html: demand.note }}
      />
      <div className="mt-[6px] font-mono text-[10px] uppercase tracking-[0.1em] text-sage-shadow">
        {demand.weekCount} searches this week · {demand.nearbyCount} within 2 mi
      </div>
    </div>
  );
}
