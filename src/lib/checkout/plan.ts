import type { BasketGroup } from "@/lib/basket/store";
import type { FulfillmentMode, Seller } from "@/lib/data/types";
import { haversineMi } from "@/lib/geo";

// The checkout brain — pure, deterministic, no React, no Claude. Everything the
// page narrates is computed here from the basket + the buyer's choices, so the
// view stays dumb and the logistics stay honest (no invented prices, no fake
// ETAs beyond a coarse, stated window).
//
// The whole premise of Copia checkout is that it reads like settling up with a
// few growers at once — not a wizard. So this module's job is to turn "which
// groups are pickup, which are delivery, which courier, how you're paying" into
// one or two sentences of correspondence, plus the few real numbers underneath.

// ── Choice vocabulary ───────────────────────────────────────────────────────
/** A grower group is either collected by the buyer or carried by one courier. */
export type FulfillmentChoice = "pickup" | "delivery";
/** The two delivery lanes a buyer can actually pick today. */
export type DeliveryTier = "bicycle" | "motorcycle";
/** The three payment rails. All stubbed — no money moves. */
export type PaymentMethod = "card" | "usdc" | "bitcoin";

export type FulfillmentByGroup = Record<string, FulfillmentChoice>;

// ── Constants (stated once, here) ────────────────────────────────────────────
/**
 * One flat courier fee per RUN, not per grower — the consolidation rule made
 * numeric. Bicycle is the close-in lane; motorcycle reaches the Hill Country
 * growers. Stubbed values, but real arithmetic flows from them.
 */
export const DELIVERY_FEE: Record<DeliveryTier, number> = {
  bicycle: 4,
  motorcycle: 6,
};

/**
 * The arrangement window — coarse by design. We never invent a clock time
 * (same honesty rule the order screens hold to); "tomorrow afternoon" is a
 * stated arrangement, not a fabricated 4:17 PM.
 */
export const DELIVERY_WINDOW = "tomorrow afternoon";

/** The two pilot lanes — rendered, never selectable. A calm glimpse, not a joke. */
export const PILOT_TIERS: { key: FulfillmentMode; label: string }[] = [
  { key: "drone", label: "Drone" },
  { key: "zipline", label: "Zipline drone" },
];

// Card processing — the real Stripe-ish rate, so the grower-economics line is
// computed, not estimated.
const CARD_PCT = 0.029;
const CARD_FLAT = 0.3;

const DELIVERY_LANES: FulfillmentMode[] = ["bicycle", "motorcycle", "drone", "zipline"];

// ── Small voice helpers ───────────────────────────────────────────────────────

/** Whether a seller offers any delivery lane at all (else: pickup only). */
export function deliveryCapable(seller: Seller): boolean {
  return seller.fulfillment.some((f) => DELIVERY_LANES.includes(f));
}

/**
 * How you'd name this grower in a sentence. A first name where the brand is a
 * person ("Mira"), the operation's name where the contact is a warm role noun
 * ("Cherrywood Backyard", not "the grower" — which reads wrong mid-sentence
 * next to a place).
 */
function shortWho(seller: Seller): string {
  const c = seller.contactName;
  const personLike = /^[A-Z]/.test(c) && !/^the\b/i.test(c);
  return personLike ? c : seller.name;
}

/** "from Mira" / "from the baker" — the in-clause attribution. */
function fromWho(seller: Seller): string {
  return `from ${seller.contactName}`;
}

/**
 * The goods, named the way you'd mention them in a note: "the heirloom tomatoes
 * and sweet basil". Lowercased, joined naturally, capped at two before it
 * trails off — a sentence shouldn't list a whole basket.
 */
function goodsPhrase(group: BasketGroup): string {
  const names = group.lines.map((l) => l.listing.name.toLowerCase());
  if (names.length === 1) return `the ${names[0]}`;
  if (names.length === 2) return `the ${names[0]} and ${names[1]}`;
  return `the ${names[0]}, ${names[1]}, and the rest`;
}

/** "A" · "A and B" · "A, B, and C" — Oxford join, for clauses. */
function listJoin(parts: string[]): string {
  if (parts.length <= 1) return parts[0] ?? "";
  if (parts.length === 2) return `${parts[0]} and ${parts[1]}`;
  return `${parts.slice(0, -1).join(", ")}, and ${parts[parts.length - 1]}`;
}

// ── The plan ──────────────────────────────────────────────────────────────────

export interface CheckoutPlan {
  pickup: BasketGroup[];
  delivery: BasketGroup[];
  hasDelivery: boolean;
  /** Single consolidated courier fee (one run), or 0 when nothing's delivered. */
  deliveryFee: number;
  deliveryWindow: string;
  itemsTotal: number;
  /** Items + the one courier fee. The number the buyer actually settles. */
  total: number;
}

/**
 * Fold the basket and the buyer's choices into a plan. The consolidation rule
 * lives right here: every group marked delivery rolls into ONE run, so there is
 * exactly one fee no matter how many growers are being delivered.
 */
export function buildPlan(
  groups: BasketGroup[],
  fulfillment: FulfillmentByGroup,
  tier: DeliveryTier,
): CheckoutPlan {
  const pickup: BasketGroup[] = [];
  const delivery: BasketGroup[] = [];
  for (const g of groups) {
    // Default to pickup; a group can only be delivery if its grower offers it.
    const choice = fulfillment[g.seller.id] === "delivery" && deliveryCapable(g.seller)
      ? "delivery"
      : "pickup";
    (choice === "delivery" ? delivery : pickup).push(g);
  }

  const hasDelivery = delivery.length > 0;
  const deliveryFee = hasDelivery ? DELIVERY_FEE[tier] : 0;
  const itemsTotal = groups.reduce((s, g) => s + g.subtotal, 0);

  return {
    pickup,
    delivery,
    hasDelivery,
    deliveryFee,
    deliveryWindow: DELIVERY_WINDOW,
    itemsTotal,
    total: itemsTotal + deliveryFee,
  };
}

// ── The narration line — the page speaking ────────────────────────────────────

/**
 * One or two sentences describing exactly the current plan, in correspondence
 * register. This is the memorable moment: logistics written as a note, updating
 * live as the buyer changes their mind. Built entirely from the plan — never a
 * model call.
 */
export function narrate(plan: CheckoutPlan): string {
  const pickupClause = (g: BasketGroup) =>
    `${goodsPhrase(g)} ${fromWho(g.seller)} in ${g.seller.area}`;

  const pickupSentence = () => {
    const clauses = plan.pickup.map(pickupClause);
    const body = `You'll collect ${listJoin(clauses)}`;
    // The "whenever the week suits you" tail only reads well for a single stand;
    // with several it clutters, so we let the list stand on its own.
    return plan.pickup.length === 1 ? `${body}, whenever the week suits you.` : `${body}.`;
  };

  const deliverySentence = () => {
    const clauses = plan.delivery.map(pickupClause);
    const carry = plan.delivery.length > 1 ? "bring it all to you" : "bring it to you";
    return `Your courier will gather ${listJoin(clauses)}, and ${carry} ${plan.deliveryWindow}.`;
  };

  if (plan.hasDelivery && plan.pickup.length === 0) return deliverySentence();
  if (!plan.hasDelivery) return pickupSentence();
  // Mixed: lead with the courier (the thing being arranged), then the pickups.
  return `${deliverySentence()} You'll collect ${listJoin(plan.pickup.map(pickupClause))} yourself.`;
}

// ── The proximity suggestion — deterministic, NOT AI ──────────────────────────

const PROXIMITY_MI = 2.5;

/**
 * If two pickup growers are close enough to fold into one trip, say so — once,
 * quietly. This is deliberately NOT a Claude call: it's haversine between two
 * coordinates against a fixed threshold. Two points and a distance don't need a
 * language model, and pretending they do would be the exact kind of AI theater
 * the brand refuses. The restraint is the case-study beat — the suggestion is
 * right because the geometry is right, not because a model guessed.
 */
export function proximitySuggestion(pickup: BasketGroup[]): string | null {
  if (pickup.length < 2) return null;

  let best: { a: Seller; b: Seller; mi: number } | null = null;
  for (let i = 0; i < pickup.length; i++) {
    for (let j = i + 1; j < pickup.length; j++) {
      const a = pickup[i].seller;
      const b = pickup[j].seller;
      const mi = haversineMi(a.location, b.location);
      if (mi <= PROXIMITY_MI && (!best || mi < best.mi)) best = { a, b, mi };
    }
  }
  if (!best) return null;

  const { a, b } = best;
  const names = `${shortWho(a)} and ${shortWho(b)}`;
  return a.area === b.area
    ? `${names} are both in ${a.area}, a few minutes apart — one trip gets you both.`
    : `${names} are close enough to catch in one trip — ${a.area} and ${b.area} are barely apart.`;
}

// ── The grower-economics line (USDC / Bitcoin only) ───────────────────────────

/** Card fee on an amount — the real 2.9% + 30¢, rounded to the cent. */
export function cardFeeOn(amount: number): number {
  return Math.round((amount * CARD_PCT + CARD_FLAT) * 100) / 100;
}

/**
 * One calm, computed line of grower economics — shown only for USDC/Bitcoin.
 * Card processing skims a cut of what would reach the growers; the crypto rails
 * are ~zero, so the difference is real money that settles directly. Computed
 * from the ITEMS total (the grower-bound money, not the courier fee). It's
 * information, not a nudge — no guilt, no "do the right thing".
 */
export function growerEconomics(itemsTotal: number, payment: PaymentMethod): string | null {
  if (payment === "card") return null;
  const saved = cardFeeOn(itemsTotal);
  const rail = payment === "usdc" ? "USDC" : "Bitcoin";
  return `Paid in ${rail}, about $${saved.toFixed(2)} more of this settles directly with your growers — card processing takes roughly 2.9% plus 30¢.`;
}
