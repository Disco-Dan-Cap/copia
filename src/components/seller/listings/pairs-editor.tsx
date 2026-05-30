"use client";

import { useState } from "react";

// Pairs-with as open free-text (clarification C) — pairings are creative, not
// enum values. Type, tap "+ add" (or Enter), the chip lands. Existing chips
// drop on tap. No autocomplete dropdown chrome. Chips match the buyer product
// page's hairline-outlined Söhne style.

export function PairsEditor({
  value,
  onChange,
}: {
  value: string[];
  onChange: (value: string[]) => void;
}) {
  const [text, setText] = useState("");

  const add = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onChange([...value, trimmed]);
    setText("");
  };

  return (
    <div className="flex flex-wrap items-center gap-[6px]">
      {value.map((p, i) => (
        <button
          key={`${p}-${i}`}
          type="button"
          onClick={() => onChange(value.filter((_, x) => x !== i))}
          className="group inline-flex items-center gap-[5px] rounded-full border border-sage-shadow/40 px-[10px] py-[3px] text-[12.5px] leading-none text-charcoal transition-opacity active:opacity-60"
        >
          {p}
          <span aria-hidden className="text-sage-shadow">
            ×
          </span>
        </button>
      ))}

      <span className="inline-flex items-center gap-[6px]">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          placeholder="Add a pairing"
          aria-label="Add a pairing"
          className="w-[120px] border-b-2 border-transparent bg-transparent text-[16px] text-charcoal outline-none transition-colors placeholder:text-sage-shadow/45 focus:border-forest/50"
        />
        {text.trim() ? (
          <button
            type="button"
            onClick={add}
            className="font-mono text-[9.5px] uppercase tracking-[0.1em] text-forest transition-opacity active:opacity-60"
          >
            + add
          </button>
        ) : null}
      </span>
    </div>
  );
}
