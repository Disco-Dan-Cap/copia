"use client";

import { Fragment, useEffect } from "react";
import type { Conversation } from "@/lib/data/messages";
import { relativeDayLabel } from "@/lib/order-format";
import { appendMessage, markRead, useMessageStore } from "./messages-store";
import { MessageBlock } from "./message-block";
import { ThreadComposer } from "./thread-composer";

/**
 * The correspondence transcript: a single column of message blocks with light
 * date rules between days, then the foot composer. Opening the thread marks it
 * read. Sent replies append optimistically (in-memory, reset on reload).
 */
export function MessageThread({ conversation }: { conversation: Conversation }) {
  const snap = useMessageStore();

  useEffect(() => {
    markRead(conversation.id);
  }, [conversation.id]);

  const sent = snap.sent[conversation.id] ?? [];
  const messages = [...conversation.messages, ...sent];
  const buyerFirst = conversation.buyer.split(" ")[0];
  const now = new Date();

  let lastLabel = "";

  return (
    <div className="flex flex-col">
      {messages.length === 0 ? (
        <p className="py-[8px] text-[14px] text-sage-shadow">No letters yet — say hello.</p>
      ) : (
        messages.map((m, i) => {
          const label = relativeDayLabel(now, m.dayOffset);
          const showRule = label !== lastLabel;
          lastLabel = label;
          return (
            <Fragment key={i}>
              {showRule ? (
                <div className="flex items-center gap-[10px] pt-[16px] first:pt-0">
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-sage-shadow">
                    {label}
                  </span>
                  <span className="h-px flex-1 bg-forest/12" />
                </div>
              ) : null}
              <MessageBlock from={m.from} name={buyerFirst} time={m.time} body={m.body} />
            </Fragment>
          );
        })
      )}

      <ThreadComposer
        onSend={(body) => appendMessage(conversation.id, { from: "seller", body, dayOffset: 0 })}
      />
    </div>
  );
}
