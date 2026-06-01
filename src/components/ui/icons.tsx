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

/* ── Seller profile chrome ───────────────────────────────────────────────── */

export function ChevronLeftIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path d="M15 5 L8 12 L15 19" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HeartIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
      <path
        d="M12 20 C12 20 3.5 14.5 3.5 8.8 C3.5 6.1 5.6 4 8.2 4 C9.9 4 11.3 4.9 12 6.3 C12.7 4.9 14.1 4 15.8 4 C18.4 4 20.5 6.1 20.5 8.8 C20.5 14.5 12 20 12 20 Z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GridIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
      <rect x={4} y={4} width={7} height={7} rx={1.6} />
      <rect x={13} y={4} width={7} height={7} rx={1.6} />
      <rect x={4} y={13} width={7} height={7} rx={1.6} />
      <rect x={13} y={13} width={7} height={7} rx={1.6} />
    </svg>
  );
}

/** Stacked rows — the "list density" glyph for the seller listings toggle. */
export function RowsIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
      <rect x={4} y={5} width={16} height={5} rx={1.6} />
      <rect x={4} y={14} width={16} height={5} rx={1.6} />
    </svg>
  );
}

/* ── Seller nav glyphs (ported from the validated dashboard hero) ─────────── */

export function OrdersIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
      <path d="M4 7 L20 7 L18 20 L6 20 Z" strokeLinejoin="round" />
      <path d="M9 7 L9 4 L15 4 L15 7" strokeLinejoin="round" />
    </svg>
  );
}

export function ListingsIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
      <rect x={3} y={3} width={18} height={18} rx={2} />
      <path d="M3 9 L21 9 M9 3 L9 21" />
    </svg>
  );
}

export function CalendarIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
      <rect x={3} y={5} width={18} height={16} rx={2} />
      <path d="M3 9 L21 9 M8 3 L8 7 M16 3 L16 7" strokeLinecap="round" />
    </svg>
  );
}

export function MessagesIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
      <path d="M4 5 L20 5 L20 17 L13 17 L8 21 L8 17 L4 17 Z" strokeLinejoin="round" />
    </svg>
  );
}

export function AnalyticsIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
      <path d="M4 19 L4 5 M4 19 L20 19" strokeLinecap="round" />
      <path d="M7 15 L11 11 L14 13 L20 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SettingsIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
      <circle cx={12} cy={12} r={3} />
      <path d="M19 12 L21 12 M3 12 L5 12 M12 19 L12 21 M12 3 L12 5 M16.95 16.95 L18.36 18.36 M5.64 5.64 L7.05 7.05 M16.95 7.05 L18.36 5.64 M5.64 18.36 L7.05 16.95" strokeLinecap="round" />
    </svg>
  );
}

export function CoachIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
      <path d="M12 3 C7 8 7 15 12 21 C17 15 17 8 12 3 Z" strokeLinejoin="round" />
      <path d="M12 5.5 L12 20" strokeLinecap="round" />
    </svg>
  );
}

/* ── Weather glyphs (dashboard 7-day strip) ───────────────────────────────── */

export function SunIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
      <circle cx={12} cy={12} r={4} />
      <path d="M12 3 L12 5 M12 19 L12 21 M3 12 L5 12 M19 12 L21 12 M5.6 5.6 L7 7 M17 17 L18.4 18.4 M18.4 5.6 L17 7 M7 17 L5.6 18.4" strokeLinecap="round" />
    </svg>
  );
}

export function PartlyCloudyIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
      <circle cx={9} cy={8} r={3} />
      <path d="M9 2.5 L9 4 M3.5 8 L5 8 M5.1 4.1 L6.1 5.1" strokeLinecap="round" />
      <path d="M8 19 Q5 19 5 16.5 Q5 14 7.5 14 Q8 11.5 11 11.5 Q14 11.5 14.5 14 Q18 14 18 16.5 Q18 19 15 19 Z" strokeLinejoin="round" />
    </svg>
  );
}

export function CloudIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
      <path d="M7 18 Q3.5 18 3.5 14.8 Q3.5 11.8 6.8 11.8 Q7.4 8 11.5 8 Q15.6 8 16.2 11.8 Q20.5 11.8 20.5 15 Q20.5 18 17 18 Z" strokeLinejoin="round" />
    </svg>
  );
}

export function RainIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
      <path d="M7 14 Q3.5 14 3.5 10.8 Q3.5 7.8 6.8 7.8 Q7.4 4 11.5 4 Q15.6 4 16.2 7.8 Q20.5 7.8 20.5 11 Q20.5 14 17 14 Z" strokeLinejoin="round" />
      <path d="M8 17 L7 20 M12 17 L11 20 M16 17 L15 20" strokeLinecap="round" />
    </svg>
  );
}
