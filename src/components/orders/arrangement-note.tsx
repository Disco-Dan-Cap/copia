import { LeafMark } from "@/components/ui/leaf-mark";
import { cn } from "@/lib/utils";
import type { PlacedOrder } from "@/lib/orders/store";

// The arrangement note — written once, read twice. Day-16 checkout renders it as
// the confirmation the moment you settle; Day-17 /orders re-renders it from the
// same stored data when you reopen an order. It reads like a note, not a receipt
// printer: the headline is the arrangement, the reference is mono chrome at the
// foot, and nothing celebrates.

// The narration, set as type. A single sentence reads as a pull-quote — the
// arrangement, quoted — so Fraunces italic is load-bearing there. A multi-
// sentence plan (mixed pickup + delivery) is a short logistics paragraph, and
// italic body that long drifts decorative against the directive's "italics are
// rare and load-bearing" rule — so it falls back to roman charcoal, set off by
// hairline rules instead of by slant.
export function NarrationProse({ text, className }: { text: string; className?: string }) {
  const multiSentence = /\.\s+\S/.test(text);
  if (multiSentence) {
    return (
      <div className={cn("border-y border-forest/15 py-[14px]", className)}>
        <p className="text-[16px] leading-[1.6] text-charcoal">{text}</p>
      </div>
    );
  }
  return (
    <p className={cn("font-emphasis text-[19px] italic leading-[1.5] text-forest", className)}>
      {text}
    </p>
  );
}

function settledBy(payment: PlacedOrder["payment"]): string {
  if (payment === "card") return "Settled by card.";
  return payment === "usdc" ? "Settled in USDC." : "Settled in Bitcoin.";
}

/**
 * The note body — the caller supplies the surrounding chrome (checkout wraps it
 * in a motion fade; the detail page sits it under a back button) and the eyebrow,
 * headline, and footer, which differ between "just settled" and "revisiting."
 */
export function ArrangementNote({
  order,
  eyebrow,
  headline,
  footer,
}: {
  order: PlacedOrder;
  eyebrow: string;
  headline: string;
  footer?: React.ReactNode;
}) {
  return (
    <article className="px-[24px] pb-[40px] pt-[24px]">
      <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-mid-forest">
        {eyebrow}
      </p>

      <h1 className="mt-[14px] font-display text-[30px] font-bold leading-[1.05] tracking-[-0.03em] text-forest">
        {headline}
      </h1>

      {/* The plan, in the buyer's own register — the same sentence the page spoke. */}
      <NarrationProse text={order.narration} className="mt-[14px]" />

      {/* The quiet recap — who's owed what, the run, the total. */}
      <div className="mt-[26px] flex flex-col gap-[12px] border-t border-forest/12 pt-[20px]">
        {order.groups.map((g) => (
          <div key={g.sellerId} className="flex items-baseline justify-between gap-[12px]">
            <span className="text-[15px] leading-[1.4] text-charcoal">
              {g.sellerName}
              <span className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-sage-shadow">
                {" "}· {g.fulfillment === "delivery" ? "Delivery" : "Pickup"}
              </span>
            </span>
            <span className="shrink-0 text-[14px] font-semibold tabular-nums text-deepest-forest">
              ${g.subtotal}
            </span>
          </div>
        ))}

        {order.delivery ? (
          <div className="flex items-baseline justify-between gap-[12px]">
            <span className="text-[15px] leading-[1.4] text-charcoal">
              Courier run
              <span className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-sage-shadow">
                {" "}· {order.delivery.window}
              </span>
            </span>
            <span className="shrink-0 text-[14px] font-semibold tabular-nums text-deepest-forest">
              ${order.delivery.fee}
            </span>
          </div>
        ) : null}
      </div>

      <div className="mt-[16px] flex items-baseline justify-between border-t border-forest/12 pt-[16px]">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-sage-shadow">
          {settledBy(order.payment)}
        </span>
        <span className="font-display text-[22px] font-bold tabular-nums tracking-[-0.02em] text-forest">
          ${order.total}
        </span>
      </div>

      {/* Wax-seal colophon — the leaf mark, with the reference as mono chrome. */}
      <div className="mt-[28px] flex items-center gap-[12px] border-t border-forest/12 pt-[20px]">
        <LeafMark className="h-[26px] w-[19px] text-forest" />
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-sage-shadow">
          {order.ref}
        </span>
      </div>

      {footer}
    </article>
  );
}
