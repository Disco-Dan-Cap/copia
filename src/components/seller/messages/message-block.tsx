import { cn } from "@/lib/utils";

/**
 * One message in the transcript — NOT a chat bubble. Authorship lives in a
 * mono-caps eyebrow (YOU in forest, the buyer's first name in mid-forest); the
 * body is full-width Söhne. The seller's own lines sit on a cream-warm panel
 * with a forest left-hairline — the single quiet asymmetry that says "me vs
 * them" without sides, colors, or bubbles. Reads like a printed letter exchange.
 */
export function MessageBlock({
  from,
  name,
  time,
  body,
}: {
  from: "seller" | "buyer";
  name: string;
  time?: string;
  body: string;
}) {
  const isYou = from === "seller";

  return (
    <div
      className={cn(
        "py-[12px]",
        isYou && "rounded-[10px] border-l-2 border-l-forest bg-cream-warm px-[14px]",
      )}
    >
      <div className="mb-[5px] font-mono text-[9.5px] uppercase tracking-[0.14em]">
        <span className={isYou ? "text-forest" : "text-mid-forest"}>{isYou ? "You" : name}</span>
        {time ? <span className="text-sage-shadow"> · {time}</span> : null}
      </div>
      <p className="max-w-[600px] text-[15px] leading-[1.55] text-charcoal">{body}</p>
    </div>
  );
}
