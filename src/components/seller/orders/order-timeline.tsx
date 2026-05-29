import type { OrderStatus } from "@/lib/data/types";
import { cn } from "@/lib/utils";

// Coarse lifecycle beats — no invented timestamps. The only real datum shown is
// the scheduled pickup (day, plus hour where we have one), annotated on the
// pickup beat. A beat is `done` (reached), `current` (the next thing owed), or
// `pending` (not yet). Canceled is a terminal two-beat path.

type BeatState = "done" | "current" | "pending" | "canceled";
interface Beat {
  label: string;
  state: BeatState;
  note?: string;
}

function beatsFor(status: OrderStatus, scheduledWhen: string): Beat[] {
  if (status === "canceled") {
    return [
      { label: "Ordered", state: "done" },
      { label: "Canceled", state: "canceled" },
    ];
  }
  return [
    { label: "Ordered", state: "done" },
    { label: "Confirmed", state: status === "awaiting" ? "current" : "done" },
    {
      label: "Pickup",
      state: status === "confirmed" ? "current" : status === "completed" ? "done" : "pending",
      note: scheduledWhen,
    },
    { label: "Completed", state: status === "completed" ? "done" : "pending" },
  ];
}

const NODE: Record<BeatState, string> = {
  done: "border-forest bg-forest",
  current: "border-terracotta bg-terracotta",
  pending: "border-sage-shadow/50 bg-transparent",
  canceled: "border-mid-forest bg-mid-forest",
};
const LABEL: Record<BeatState, string> = {
  done: "text-deepest-forest",
  current: "text-terracotta",
  pending: "text-sage-shadow",
  canceled: "text-mid-forest line-through",
};

export function OrderTimeline({
  status,
  scheduledWhen,
}: {
  status: OrderStatus;
  scheduledWhen: string;
}) {
  const beats = beatsFor(status, scheduledWhen);

  return (
    <ol className="relative">
      {beats.map((beat, i) => {
        const last = i === beats.length - 1;
        return (
          <li key={beat.label} className="relative flex gap-[14px] pb-[18px] last:pb-0">
            {/* node + connector */}
            <div className="relative flex flex-col items-center">
              <span className={cn("mt-[2px] h-[11px] w-[11px] shrink-0 rounded-full border-2", NODE[beat.state])} />
              {!last ? <span className="mt-[2px] w-px flex-1 bg-forest/15" /> : null}
            </div>
            <div className="-mt-[1px] pb-[2px]">
              <span className={cn("font-mono text-[10px] uppercase tracking-[0.14em]", LABEL[beat.state])}>
                {beat.label}
              </span>
              {beat.note ? (
                <span className="mt-[2px] block text-[13px] text-mid-forest">{beat.note}</span>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
