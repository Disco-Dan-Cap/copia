"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { LeafMark } from "@/components/ui/leaf-mark";
import { COPIA_MARK_PATHS, COPIA_MARK_VIEWBOX } from "@/components/ui/copia-mark";
import { ArrangementNote, NarrationProse } from "@/components/orders/arrangement-note";
import { clear, useGroupedBasket, type BasketGroup } from "@/lib/basket/store";
import {
  buildPlan,
  deliveryCapable,
  growerEconomics,
  narrate,
  pickupChipLabel,
  proximitySuggestion,
  COURIER_LANES,
  PILOT_LANE,
  type CourierLane,
  type DeliveryTier,
  type FulfillmentByGroup,
  type FulfillmentChoice,
  type PaymentMethod,
} from "@/lib/checkout/plan";
import { buildPlacedOrder } from "@/lib/orders/build";
import { nextOrderRef, placeOrder, type PlacedOrder } from "@/lib/orders/store";
import { markFirstOrderComplete } from "@/lib/pwa/install-intent";

type Status = "form" | "settling" | "confirmed";

const PAYMENTS: { key: PaymentMethod; label: string }[] = [
  { key: "card", label: "Card" },
  { key: "usdc", label: "USDC" },
  { key: "bitcoin", label: "Bitcoin" },
];

const WEEKDAY = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/**
 * Settling up — THE editorial set-piece of the buyer side. The genre default is
 * a multi-step wizard; Copia refuses it. This is ONE calm page: the whole
 * exchange visible at once, the way you'd settle with a few growers at a market
 * stall. The page narrates its own plan in correspondence register, updating
 * live, and ends in a single quiet confirm.
 */
export function CheckoutView() {
  const { groups } = useGroupedBasket();
  const reduce = useReducedMotion();

  const [fulfillment, setFulfillment] = useState<FulfillmentByGroup>({});
  const [tier, setTier] = useState<DeliveryTier>("bicycle");
  const [payment, setPayment] = useState<PaymentMethod>("card");
  const [status, setStatus] = useState<Status>("form");
  const [placed, setPlaced] = useState<PlacedOrder | null>(null);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (settleTimer.current) clearTimeout(settleTimer.current);
  }, []);

  // Settled: render the confirmation note from the snapshot we held, so clearing
  // the basket below us never bounces this to the empty state.
  if (status === "confirmed" && placed) return <ConfirmationNote order={placed} />;
  if (status === "settling") return <Settling reduce={Boolean(reduce)} />;
  if (groups.length === 0) return <NothingToSettle />;

  const choiceFor = (g: BasketGroup): FulfillmentChoice =>
    fulfillment[g.seller.id] === "delivery" && deliveryCapable(g.seller) ? "delivery" : "pickup";

  const plan = buildPlan(groups, fulfillment, tier);
  const narration = narrate(plan);
  const proximity = proximitySuggestion(plan.pickup);
  const economics = growerEconomics(plan.itemsTotal, payment);

  const setChoice = (sellerId: string, choice: FulfillmentChoice) =>
    setFulfillment((prev) => ({ ...prev, [sellerId]: choice }));

  const settle = () => {
    if (status !== "form") return;

    // Same builder the seeded history uses — a settled order and a seeded one are
    // identical in shape, consolidation, and narration.
    const order = buildPlacedOrder({
      groups,
      fulfillment,
      tier,
      payment,
      ref: nextOrderRef(),
      placedAtOffset: 0,
    });

    setStatus("settling");
    settleTimer.current = setTimeout(
      () => {
        placeOrder(order); // persists for Day 17's order history
        markFirstOrderComplete(); // the dormant Day-14D trigger goes live here
        clear(); // the goods are spoken for — empty the basket
        setPlaced(order);
        setStatus("confirmed");
      },
      reduce ? 450 : 1600,
    );
  };

  return (
    <>
      <main className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <header className="safe-top px-[24px] pt-[18px] pb-[8px]">
          <div className="flex items-baseline justify-between gap-[12px]">
            <h1 className="font-display text-[30px] font-bold leading-[1.05] tracking-[-0.03em] text-forest">
              Settling up
            </h1>
            <Link
              href="/basket"
              className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-mid-forest underline decoration-mid-forest/30 underline-offset-4 transition-opacity active:opacity-60"
            >
              Edit basket
            </Link>
          </div>
        </header>

        {/* The narration — the page speaking. Not a tooltip, not a callout box:
            it sits as prose, the way a letter opens, and rewrites itself as the
            choices below change. */}
        <NarrationProse text={narration} className="mx-[24px] mt-[12px] mb-[6px]" />

        <div className="flex flex-col gap-[28px] px-[24px] pb-[20px] pt-[18px]">
          {groups.map((group) => (
            <GroupBlock
              key={group.seller.id}
              group={group}
              choice={choiceFor(group)}
              onChoose={(c) => setChoice(group.seller.id, c)}
            />
          ))}

          {/* The proximity suggestion — deterministic geometry, no AI label. */}
          {proximity ? (
            <p className="border-t border-forest/10 pt-[16px] text-[14px] leading-[1.5] text-mid-forest">
              {proximity}
            </p>
          ) : null}

          {plan.hasDelivery ? (
            <DeliveryLane
              tier={tier}
              onTier={setTier}
              fee={plan.deliveryFee}
              window={plan.deliveryWindow}
              runners={plan.delivery.length}
            />
          ) : null}

          <PaymentChoice value={payment} onChange={setPayment} economics={economics} />
        </div>
      </main>

      <SettleBar total={plan.total} onSettle={settle} />
    </>
  );
}

// ── A grower group — read-only goods, plus the one choice that matters ────────
function GroupBlock({
  group,
  choice,
  onChoose,
}: {
  group: BasketGroup;
  choice: FulfillmentChoice;
  onChoose: (c: FulfillmentChoice) => void;
}) {
  const { seller, lines, subtotal } = group;
  const canDeliver = deliveryCapable(seller);

  return (
    <section className="border-t border-forest/12 pt-[20px] first:border-t-0 first:pt-0">
      <header>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-sage-shadow">
          {seller.area}
        </p>
        <h2 className="mt-[3px] font-display text-[20px] font-bold leading-[1.1] tracking-[-0.02em] text-forest">
          {seller.name}
        </h2>
      </header>

      {/* Condensed line list — read-only here; quantities are changed in /basket. */}
      <ul className="mt-[12px] flex flex-col gap-[7px]">
        {lines.map((line) => (
          <li key={line.listing.id} className="flex items-baseline justify-between gap-[12px]">
            <span className="text-[15px] leading-[1.35] text-charcoal">
              {line.listing.name}
              <span className="text-sage-shadow"> · {line.qty} {line.listing.unit}</span>
            </span>
            <span className="shrink-0 text-[14px] font-semibold tabular-nums text-deepest-forest">
              ${line.lineTotal}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-[10px] flex items-baseline justify-end gap-[8px]">
        <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-sage-shadow">
          Their share
        </span>
        <span className="text-[14px] font-semibold tabular-nums text-deepest-forest">
          ${subtotal}
        </span>
      </div>

      {/* The fulfillment choice — calm chips, never a dropdown. Pickup is the
          stall default; delivery only when this grower offers a lane. */}
      <div className="mt-[14px] flex flex-wrap gap-[8px]">
        <ChoiceChip
          selected={choice === "pickup"}
          onClick={() => onChoose("pickup")}
        >
          Pickup — {pickupChipLabel(seller)}
        </ChoiceChip>
        {canDeliver ? (
          <ChoiceChip
            selected={choice === "delivery"}
            onClick={() => onChoose("delivery")}
          >
            Delivery
          </ChoiceChip>
        ) : (
          <span className="inline-flex min-h-[44px] items-center font-mono text-[10px] uppercase tracking-[0.12em] text-sage-shadow">
            Pickup only
          </span>
        )}
      </div>
    </section>
  );
}

function ChoiceChip({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={
        "inline-flex min-h-[44px] items-center rounded-full px-[16px] text-[13px] font-medium transition-colors active:scale-[0.99] " +
        (selected
          ? "bg-forest text-cream"
          : "border border-sage-shadow/40 text-forest active:bg-sage-shadow/10")
      }
    >
      {children}
    </button>
  );
}

// ── The delivery lane — one consolidated run, the lane choice, a glimpse ──────
function DeliveryLane({
  tier,
  onTier,
  fee,
  window: deliveryWindow,
  runners,
}: {
  tier: DeliveryTier;
  onTier: (t: DeliveryTier) => void;
  fee: number;
  window: string;
  runners: number;
}) {
  return (
    <section className="border-t border-forest/12 pt-[20px]">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-sage-shadow">
        The courier run
      </p>

      {/* The live lanes — calm rows, single-select. Mode on the left, ETA and
          price on the right. Picking one drives the run fee and the total. These
          are Copia's own couriers — the final mile the brand owns. */}
      <div role="radiogroup" aria-label="Courier lane" className="mt-[12px] flex flex-col gap-[8px]">
        {COURIER_LANES.map((lane) => (
          <CourierLaneRow
            key={lane.key}
            lane={lane}
            selected={tier === lane.key}
            onSelect={() => onTier(lane.key)}
          />
        ))}

        {/* The pilot lane — visible, never selectable. Its status sits where the
            ETA and price would be: a calm glimpse, styled like the live lanes. */}
        <div className="flex items-center justify-between gap-[12px] rounded-[14px] border border-dashed border-sage-shadow/35 px-[16px] py-[12px]">
          <span className="text-[15px] leading-[1.2] text-sage-shadow">{PILOT_LANE.label}</span>
          <span className="shrink-0 font-mono text-[9.5px] uppercase tracking-[0.12em] text-sage-shadow">
            {PILOT_LANE.status}
          </span>
        </div>
      </div>

      {/* The consolidation made plain: one run, one fee, one window — never one
          fee per grower. The fee tracks the selected lane. */}
      <div className="mt-[16px] flex items-baseline justify-between gap-[12px] rounded-[12px] bg-cream-warm px-[16px] py-[13px]">
        <span className="text-[14px] leading-[1.4] text-charcoal">
          {runners > 1 ? `One run, all ${runners} growers` : "One run"} · {deliveryWindow}
        </span>
        <span className="shrink-0 text-[15px] font-semibold tabular-nums text-deepest-forest">
          ${fee}
        </span>
      </div>
    </section>
  );
}

// One courier-lane row — the calm rebuild of the bare vehicle chip. Mode + the
// quiet trade-off note on the left; the coarse ETA and the flat run fee on the
// right. Radio semantics: exactly one lane carries the run.
function CourierLaneRow({
  lane,
  selected,
  onSelect,
}: {
  lane: CourierLane;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={
        "flex min-h-[56px] items-center justify-between gap-[12px] rounded-[14px] border px-[16px] py-[10px] text-left transition-colors active:scale-[0.99] " +
        (selected
          ? "border-forest bg-forest/[0.06]"
          : "border-sage-shadow/30 active:bg-sage-shadow/10")
      }
    >
      <span className="flex flex-col">
        <span
          className={
            "text-[15px] font-medium leading-[1.2] " +
            (selected ? "text-forest" : "text-charcoal")
          }
        >
          {lane.label}
        </span>
        <span className="mt-[2px] text-[12px] leading-[1.2] text-sage-shadow">{lane.note}</span>
      </span>
      <span className="flex shrink-0 items-baseline gap-[10px]">
        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-sage-shadow">
          {lane.eta}
        </span>
        <span
          className={
            "text-[15px] font-semibold tabular-nums " +
            (selected ? "text-forest" : "text-deepest-forest")
          }
        >
          ${lane.fee}
        </span>
      </span>
    </button>
  );
}

// ── Payment — three plain rails, Stripe-boring on purpose ─────────────────────
function PaymentChoice({
  value,
  onChange,
  economics,
}: {
  value: PaymentMethod;
  onChange: (p: PaymentMethod) => void;
  economics: string | null;
}) {
  return (
    <section className="border-t border-forest/12 pt-[20px]">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-sage-shadow">
        How you&rsquo;ll settle
      </p>

      <div className="mt-[12px] grid grid-cols-3 gap-[8px]">
        {PAYMENTS.map((p) => {
          const selected = value === p.key;
          return (
            <button
              key={p.key}
              type="button"
              onClick={() => onChange(p.key)}
              aria-pressed={selected}
              className={
                "flex min-h-[48px] items-center justify-center rounded-[12px] text-[14px] font-medium transition-colors active:scale-[0.99] " +
                (selected
                  ? "bg-forest text-cream"
                  : "border border-sage-shadow/40 text-forest active:bg-sage-shadow/10")
              }
            >
              {p.label}
            </button>
          );
        })}
      </div>

      {/* One computed line of grower economics — information, not a nudge. */}
      {economics ? (
        <p className="mt-[12px] text-[13px] leading-[1.5] text-mid-forest">{economics}</p>
      ) : null}
    </section>
  );
}

// ── The settle bar — one total, one action ────────────────────────────────────
function SettleBar({ total, onSettle }: { total: number; onSettle: () => void }) {
  return (
    <div className="shrink-0 border-t border-forest/12 bg-cream px-[20px] pt-[12px] pb-[10px]">
      <div className="mb-[10px] flex items-baseline justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-sage-shadow">
          Total
        </span>
        <span className="font-display text-[22px] font-bold tabular-nums tracking-[-0.02em] text-forest">
          ${total}
        </span>
      </div>
      <button
        type="button"
        onClick={onSettle}
        className="flex h-[48px] w-full items-center justify-center rounded-full bg-forest text-[14px] font-semibold text-cream transition-transform active:scale-[0.98]"
      >
        Settle up
      </button>
    </div>
  );
}

// ── The settling state — the leaf mark, not a spinner (directive §75 / §209) ──
function Settling({ reduce }: { reduce: boolean }) {
  return (
    <main className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
      <div className="flex min-h-full flex-col items-center justify-center px-[32px] pb-[60px]" role="status" aria-live="polite">
        {reduce ? (
          <LeafMark className="h-[48px] w-[35px] text-forest opacity-80" />
        ) : (
          <svg
            viewBox={COPIA_MARK_VIEWBOX}
            className="h-[52px] w-[38px] text-forest"
            fill="none"
            stroke="currentColor"
            strokeWidth={14}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {COPIA_MARK_PATHS.map((d, i) => (
              <motion.path
                key={i}
                d={d}
                initial={{ pathLength: 0, opacity: 0.25 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.3, ease: "easeInOut", delay: i * 0.12 }}
              />
            ))}
          </svg>
        )}
        <span className="mt-[16px] font-mono text-[10px] uppercase tracking-[0.14em] text-mid-forest">
          Settling up
        </span>
      </div>
    </main>
  );
}

// ── The confirmation — a note, not a receipt printer ──────────────────────────
// The note itself is the shared ArrangementNote (reused on /orders); here it
// fades in once, with a footer that points to where it now permanently lives.
function ConfirmationNote({ order }: { order: PlacedOrder }) {
  const reduce = useReducedMotion();

  const footer = (
    <div className="mt-[24px] flex flex-col gap-[14px]">
      <Link
        href="/orders"
        className="inline-flex min-h-[44px] items-center gap-[6px] font-mono text-[11px] uppercase tracking-[0.14em] text-forest underline decoration-forest/30 underline-offset-4 transition-opacity active:opacity-60"
      >
        See your orders
        <span aria-hidden>→</span>
      </Link>
      <Link
        href="/"
        className="inline-flex min-h-[44px] items-center font-mono text-[11px] uppercase tracking-[0.14em] text-mid-forest underline decoration-mid-forest/30 underline-offset-4 transition-opacity active:opacity-60"
      >
        Back to the market
      </Link>
    </div>
  );

  const body = (
    <ArrangementNote
      order={order}
      eyebrow={`Settled — ${formatToday()}`}
      headline="It’s arranged."
      footer={footer}
    />
  );

  return (
    <main className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
      <div className="safe-top" />
      {reduce ? (
        body
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {body}
        </motion.div>
      )}
    </main>
  );
}

function NothingToSettle() {
  return (
    <main className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
      <div className="flex min-h-full flex-col items-center justify-center px-[32px] pb-[60px] text-center">
        <LeafMark className="h-[40px] w-[29px] text-sage opacity-80" />
        <p className="mt-[20px] font-display text-[24px] font-bold leading-[1.15] tracking-[-0.02em] text-forest">
          Nothing to settle yet.
        </p>
        <p className="mt-[8px] text-[15px] leading-[1.5] text-mid-forest">
          Your basket&rsquo;s empty.
        </p>
        <Link
          href="/"
          className="mt-[22px] inline-flex min-h-[44px] items-center gap-[6px] font-mono text-[11px] uppercase tracking-[0.14em] text-forest underline decoration-forest/30 underline-offset-4 transition-opacity active:opacity-60"
        >
          See what&rsquo;s near you
          <span aria-hidden>→</span>
        </Link>
      </div>
    </main>
  );
}

/** Today, spelled out for the confirmation dateline (client-only; no SSR). */
function formatToday(): string {
  const d = new Date();
  return `${WEEKDAY[d.getDay()]}, ${MONTH[d.getMonth()]} ${d.getDate()}`;
}
