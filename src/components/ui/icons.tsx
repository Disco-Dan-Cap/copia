// Bespoke Copia icon set — hand-drawn to match brand/copia-hero-screens.html.
// Deliberately NOT lucide / Material: the brand directive forbids generic icon
// sets. Each glyph inherits color via currentColor.

interface IconProps {
  className?: string;
}

export function ChevronDownIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path d="M2.5 4.5 L6 8 L9.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Category glyphs ─────────────────────────────────────────────────────── */

export function VegetablesIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
      <path d="M12 2 Q16 6 16 12 Q16 18 12 22 Q8 18 8 12 Q8 6 12 2 Z" strokeLinejoin="round" />
    </svg>
  );
}

export function EggsIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
      <ellipse cx={12} cy={13} rx={6} ry={8} />
    </svg>
  );
}

export function BakedIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
      <path d="M4 14 Q12 6 20 14 L20 18 L4 18 Z" strokeLinejoin="round" />
    </svg>
  );
}

export function HoneyIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
      <polygon points="12,3 21,9 21,15 12,21 3,15 3,9" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Tab-bar glyphs ──────────────────────────────────────────────────────── */

export function HomeIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 3 L21 12 L18 12 L18 21 L6 21 L6 12 L3 12 Z" />
    </svg>
  );
}

export function SearchIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <circle cx={11} cy={11} r={7} />
      <path d="M16 16 L21 21" strokeLinecap="round" />
    </svg>
  );
}

export function CartIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path d="M3 6 L7 6 L10 18 L19 18 L21 10 L8 10" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={10} cy={21} r={1.5} />
      <circle cx={18} cy={21} r={1.5} />
    </svg>
  );
}

export function ProfileIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <circle cx={12} cy={8} r={4} />
      <path d="M4 21 Q4 14 12 14 Q20 14 20 21" strokeLinecap="round" />
    </svg>
  );
}

/* ── Search / map chrome ─────────────────────────────────────────────────── */

export function SlidersIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
      <path d="M4 7 L20 7 M4 12 L20 12 M4 17 L20 17" strokeLinecap="round" />
      <circle cx={9} cy={7} r={2.4} fill="currentColor" stroke="none" />
      <circle cx={15} cy={12} r={2.4} fill="currentColor" stroke="none" />
      <circle cx={8} cy={17} r={2.4} fill="currentColor" stroke="none" />
    </svg>
  );
}

export function MapIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
      <path d="M9 4 L3 6 L3 20 L9 18 L15 20 L21 18 L21 4 L15 6 Z" strokeLinejoin="round" />
      <path d="M9 4 L9 18 M15 6 L15 20" strokeLinejoin="round" />
    </svg>
  );
}

export function ListIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
      <path d="M8 6 L20 6 M8 12 L20 12 M8 18 L20 18" strokeLinecap="round" />
      <circle cx={4} cy={6} r={1.2} fill="currentColor" stroke="none" />
      <circle cx={4} cy={12} r={1.2} fill="currentColor" stroke="none" />
      <circle cx={4} cy={18} r={1.2} fill="currentColor" stroke="none" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path d="M6 6 L18 18 M18 6 L6 18" strokeLinecap="round" />
    </svg>
  );
}

export function StarIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 3 L14.6 8.6 L20.5 9.3 L16.2 13.4 L17.3 19.3 L12 16.4 L6.7 19.3 L7.8 13.4 L3.5 9.3 L9.4 8.6 Z" />
    </svg>
  );
}
