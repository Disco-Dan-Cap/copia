"use client";

import type { Conversation } from "@/lib/data/messages";
import { relativeDayLabel } from "@/lib/order-format";
import { ConversationRow } from "./conversation-row";
import { isUnread, useMessageStore } from "./messages-store";

/**
 * The inbox — a stack of correspondence rows. Client-side so the unread dots
 * clear the moment a thread is opened (read-state lives in the store).
 */
export function InboxList({
  conversations,
  sellerId,
}: {
  conversations: Conversation[];
  sellerId: string;
}) {
  const snap = useMessageStore();
  const now = new Date();

  return (
    <div>
      {conversations.map((c) => (
        <ConversationRow
          key={c.id}
          conversation={c}
          sellerId={sellerId}
          unread={isUnread(c, snap)}
          time={relativeDayLabel(now, c.messages[c.messages.length - 1]?.dayOffset ?? 0)}
        />
      ))}
    </div>
  );
}
