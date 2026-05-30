"use client";

import { useState } from "react";
import { renderEmphasis } from "@/lib/emphasis";

/**
 * The anchor sentence — the listing's one editorial line. Rendered as live prose
 * (Fraunces italics showing) when blurred; on tap it becomes a borderless
 * textarea showing the raw *asterisk* source so the seller can place emphasis
 * without any rich-text chrome. Same "the card is the editor" language as the
 * rest of the surface.
 */
export function EditableAnchor({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div>
      {focused ? (
        <textarea
          autoFocus
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setFocused(false)}
          rows={3}
          className="w-full resize-none border-b-2 border-forest/40 bg-transparent text-[18px] leading-[1.55] text-charcoal outline-none placeholder:text-sage-shadow/45"
        />
      ) : (
        <p
          onClick={() => setFocused(true)}
          className="min-h-[1.55em] cursor-text text-[18px] leading-[1.55] text-charcoal"
        >
          {value ? (
            renderEmphasis(value)
          ) : (
            <span className="text-sage-shadow/50">{placeholder}</span>
          )}
        </p>
      )}
      <p className="mt-[6px] font-mono text-[9px] uppercase tracking-[0.12em] text-sage-shadow">
        Wrap a few words in *asterisks* for emphasis
      </p>
    </div>
  );
}
