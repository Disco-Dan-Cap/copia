"use client";

import { useState } from "react";
import { CoachLeafDraw } from "./coach-leaf-draw";

// The tertiary affordance — the knock on the door. The weekly reading arrives
// without being asked for; this is here when a grower has a specific question.
// It is deliberately NOT a chat: a borderless field at the foot of the letter,
// and each answer renders as an appended passage in the same letter typography
// (a quiet "You asked" eyebrow, then prose in the Coach's voice), never a bubble
// in a thread. The leaf-draw is the only loading state. Exchanges append in
// session memory and reset on reload, like every other optimistic seller surface.

interface Exchange {
  question: string;
  answer: string;
}

export function CoachAsk({ sellerId }: { sellerId: string }) {
  const [text, setText] = useState("");
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [pending, setPending] = useState<string | null>(null);

  async function ask() {
    const question = text.trim();
    if (!question || pending) return;
    setText("");
    setPending(question);
    let answer: string;
    try {
      const res = await fetch("/api/coach/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sellerId, question }),
      });
      const data = (await res.json()) as { answer?: string };
      answer =
        data.answer ??
        "I couldn't get to that one just now — try me again in a moment.";
    } catch {
      answer = "I couldn't get to that one just now — try me again in a moment.";
    }
    setExchanges((prev) => [...prev, { question, answer }]);
    setPending(null);
  }

  return (
    <section className="border-t border-forest/15 pt-[24px]">
      {exchanges.map((ex, i) => (
        <div key={i} className="mb-[24px]">
          <div className="mb-[8px] font-mono text-[9.5px] uppercase tracking-[0.14em] text-sage-shadow">
            You asked
          </div>
          <p className="mb-[14px] text-[14px] italic leading-[1.5] text-mid-forest">
            &ldquo;{ex.question}&rdquo;
          </p>
          <p className="whitespace-pre-line text-[15px] leading-[1.65] text-charcoal">{ex.answer}</p>
        </div>
      ))}

      {pending ? <CoachLeafDraw label="Reading your plot for an answer…" /> : null}

      <div className="mt-[8px]">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={2}
          placeholder="Ask the Coach about your plot…"
          aria-label="Ask the Coach a question"
          disabled={pending !== null}
          className="w-full resize-none bg-transparent text-[16px] leading-[1.55] text-charcoal outline-none placeholder:text-sage-shadow/50 disabled:opacity-50"
        />
        {text.trim() && !pending ? (
          <div className="mt-[8px] flex justify-end">
            <button
              type="button"
              onClick={ask}
              className="rounded-[8px] bg-forest px-[16px] py-[8px] text-[13px] font-medium text-cream transition-transform active:scale-[0.98]"
            >
              Ask
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
