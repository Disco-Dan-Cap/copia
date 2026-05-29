import type { OrderGroup } from "@/lib/data/orders";
import { OrderRow } from "./order-row";

/**
 * The grouped order log — Today / Upcoming / This week / Earlier. Group headers
 * are mono-caps editorial register, the way a seller actually thinks about the
 * week, NOT "filter by date" chrome. Each group is a hairline-divided stream of
 * log entries.
 */
export function OrderStream({
  groups,
  now,
  sellerId,
}: {
  groups: OrderGroup[];
  now: Date;
  sellerId: string;
}) {
  return (
    <div className="flex flex-col gap-[28px]">
      {groups.map((group) => (
        <section key={group.key}>
          <div className="mb-[6px] font-mono text-[10px] uppercase tracking-[0.16em] text-mid-forest">
            {group.label}
          </div>
          {group.orders.map((order) => (
            <OrderRow key={order.id} order={order} now={now} sellerId={sellerId} />
          ))}
        </section>
      ))}
    </div>
  );
}
