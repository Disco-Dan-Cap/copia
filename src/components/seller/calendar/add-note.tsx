"use client";

import { useState } from "react";

/**
 * The lightest add affordance — "+ note" opens a borderless inline field; a few
 * words become a neutral note chip on the day (optimistic). No kind picker, no
 * boxed form — keeps the planner calm. 16px input dodges iOS zoom-on-focus.
 */
export function AddNote({ onAdd }: { onAdd: (label: string) => void }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  function commit() {
    const trimmed = text.trim();
    if (trimmed) onAdd(trimmed);
    setText("");
    setOpen(false);
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-[8px] font-mono text-[10px] uppercase tracking-[0.12em] text-sage-shadow transition-opacity active:opacity-60"
      >
        + note
      </button>
    );
  }

  return (
    <input
      autoFocus
      value={text}
      onChange={(e) => setText(e.target.value)}
      onBlur={commit}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          commit();
        } else if (e.key === "Escape") {
          setText("");
          setOpen(false);
        }
      }}
      placeholder="A note for the day"
      aria-label="Add a note"
      className="mt-[8px] w-[180px] border-b-2 border-forest/40 bg-transparent text-[16px] text-charcoal outline-none placeholder:text-sage-shadow/45"
    />
  );
}
