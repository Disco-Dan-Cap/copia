"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// Editorially identical to the Day-8 EditableText, with the single delta the
// brief allows: a single-line <input> becomes an auto-growing <textarea> for
// prose that wraps (the bio, pickup hours). Same borderless field, same
// hairline-underline-only-on-focus, same ≥16px size (callers pass it) so iOS
// Safari never zoom-on-focuses. No box, no different background, no expand
// affordance, no character counter — it looks exactly like the prose it edits.

// Layout effect on the client (no flash as the field grows), plain effect on the
// server (React would warn otherwise).
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface EditableProseProps {
  value: string;
  onChange: (value: string) => void;
  ariaLabel: string;
  placeholder?: string;
  className?: string;
}

export function EditableProse({
  value,
  onChange,
  ariaLabel,
  placeholder,
  className,
}: EditableProseProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  return (
    <textarea
      ref={ref}
      rows={1}
      aria-label={ariaLabel}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "block w-full resize-none overflow-hidden border-0 border-b-2 border-transparent bg-transparent p-0 outline-none transition-colors placeholder:text-sage-shadow/45 focus:border-forest/60",
        className,
      )}
    />
  );
}
