"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

/**
 * The core "the card IS the editor" primitive: a borderless, transparent input
 * that looks exactly like the prose it edits and grows a hairline underline
 * only on focus — no boxed form field. Always renders ≥16px (callers pass the
 * size) so iOS Safari never zoom-on-focuses. `inline` auto-sizes to content via
 * ch units for fields that sit mid-sentence (the price number, the unit).
 */
interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  ariaLabel: string;
  placeholder?: string;
  inline?: boolean;
  inputMode?: "text" | "numeric";
  maxLength?: number;
  className?: string;
}

export const EditableText = forwardRef<HTMLInputElement, EditableTextProps>(
  function EditableText(
    { value, onChange, ariaLabel, placeholder, inline, inputMode = "text", maxLength, className },
    ref,
  ) {
    const width = inline
      ? `${Math.max((value || placeholder || "").length, 1)}ch`
      : undefined;

    return (
      <input
        ref={ref}
        type="text"
        inputMode={inputMode}
        aria-label={ariaLabel}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        style={inline ? { width } : undefined}
        className={cn(
          "border-0 border-b-2 border-transparent bg-transparent p-0 outline-none transition-colors placeholder:text-sage-shadow/45 focus:border-forest/60",
          inline ? "inline-block" : "block w-full",
          className,
        )}
      />
    );
  },
);
