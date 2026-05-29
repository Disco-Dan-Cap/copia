import type { OrderStatus } from "@/lib/data/types";
import { orderStatusLabels } from "@/lib/data/labels";
import { cn } from "@/lib/utils";

/**
 * The quiet mono-caps status word — NOT a filled badge (the directive forbids
 * the status-column pill). `awaiting` borrows the page's single terracotta
 * accent ("needs you"); `completed` recedes to sage-shadow; `canceled` is
 * struck. Shared by the list row and the detail lifecycle so they never drift.
 */
const TONE: Record<OrderStatus, string> = {
  awaiting: "text-terracotta",
  confirmed: "text-forest",
  completed: "text-sage-shadow",
  canceled: "text-mid-forest line-through",
};

export function OrderStatusTag({
  status,
  className,
}: {
  status: OrderStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-mono text-[9.5px] uppercase tracking-[0.14em]",
        TONE[status],
        className,
      )}
    >
      {orderStatusLabels[status]}
    </span>
  );
}
