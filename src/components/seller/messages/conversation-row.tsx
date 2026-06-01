import Link from "next/link";
import type { Conversation } from "@/lib/data/messages";
import { cn } from "@/lib/utils";

/**
 * An inbox row — a letter on the desk, not a chat preview. Buyer name (lead) +
 * the subject (what it's about, not a message snippet) + a quiet relative time.
 * A small terracotta dot marks unread; no count, no badge.
 */
export function ConversationRow({
  conversation,
  sellerId,
  unread,
  time,
}: {
  conversation: Conversation;
  sellerId: string;
  unread: boolean;
  time: string;
}) {
  return (
    <Link
      href={`/seller/messages/${conversation.id}?as=${sellerId}`}
      className="flex items-baseline justify-between gap-[12px] border-t border-forest/15 py-[16px] transition-opacity first:border-t-0 first:pt-0 active:opacity-60"
    >
      <span className="min-w-0">
        <span className="flex items-center gap-[8px]">
          {unread ? <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-terracotta" /> : null}
          <span
            className={cn(
              "truncate text-[16px] tracking-[-0.01em] text-deepest-forest",
              unread ? "font-semibold" : "font-medium",
            )}
          >
            {conversation.buyer}
          </span>
        </span>
        <span className="mt-[3px] block text-[14px] leading-[1.4] text-mid-forest">
          {conversation.subject}
        </span>
      </span>
      <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.1em] text-sage-shadow">
        {time}
      </span>
    </Link>
  );
}
