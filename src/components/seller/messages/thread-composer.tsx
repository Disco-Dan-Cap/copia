"use client";

import { useState } from "react";

/**
 * Reply at the foot of the letter — NOT a sticky WhatsApp dock. A borderless
 * textarea (≥16px, no iOS zoom) with a quiet forest "Send" that appears only
 * when there's something to send. On send the reply appends optimistically
 * (resets on reload). You read the exchange, then write back at the bottom.
 */
export function ThreadComposer({ onSend }: { onSend: (body: string) => void }) {
  const [text, setText] = useState("");

  function send() {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText("");
  }

  return (
    <div className="mt-[20px] border-t border-forest/12 pt-[16px]">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={2}
        placeholder="Write back…"
        aria-label="Write a reply"
        className="w-full resize-none bg-transparent text-[16px] leading-[1.55] text-charcoal outline-none placeholder:text-sage-shadow/45"
      />
      {text.trim() ? (
        <div className="mt-[8px] flex justify-end">
          <button
            type="button"
            onClick={send}
            className="rounded-[8px] bg-forest px-[16px] py-[8px] text-[13px] font-medium text-cream transition-transform active:scale-[0.98]"
          >
            Send
          </button>
        </div>
      ) : null}
    </div>
  );
}
