import type { Metadata } from "next";
import { LeafMark } from "@/components/ui/leaf-mark";

export const metadata: Metadata = {
  title: "Design System",
};

/* ─── Data ────────────────────────────────────────────────────────────────── */

const COLORS = [
  { name: "Deepest Forest", var: "--deepest-forest", hex: "#1E3D30", role: "Type on light, pressed states, outline strokes", light: true },
  { name: "Forest", var: "--forest", hex: "#1C664D", role: "Primary brand color. Headlines, primary buttons, the wordmark", light: true },
  { name: "Mid Forest", var: "--mid-forest", hex: "#30594A", role: "Secondary type, eyebrow labels, mono captions", light: true },
  { name: "Sage Shadow", var: "--sage-shadow", hex: "#4E8472", role: "Dividers, borders, low-emphasis chrome. Not for type", light: true },
  { name: "Sage", var: "--sage", hex: "#509982", role: "The leaf mark. Sub-lines, illustrative accents", light: true },
  { name: "Light Sage", var: "--light-sage", hex: "#74B5A1", role: "Surfaces, soft fills, tags, info cards", light: false },
  { name: "Mint", var: "--mint", hex: "#9CE5D0", role: "Splash, marketing canvas, brand washes", light: false },
  { name: "Cream", var: "--cream", hex: "#FAF6EE", role: "In-app canvas. The product runs on cream, not mint", light: false },
  { name: "Charcoal", var: "--charcoal", hex: "#1A1A1A", role: "Body type. Never pure black", light: true },
  { name: "Terracotta", var: "--terracotta", hex: "#C46A4F", role: "The only spike. Notifications, badges, urgent CTAs", light: true },
] as const;

const TYPE_SAMPLES = [
  {
    family: "Display",
    label: "Aptly Medium (falls to SF Pro until .woff2 is installed)",
    cssVar: "var(--font-display)",
    samples: [
      { size: "text-5xl", text: "Local, ripe, today.", tracking: "tracking-tight" },
      { size: "text-3xl", text: "Grown by your neighbors.", tracking: "tracking-tight" },
    ],
  },
  {
    family: "Body",
    label: "Söhne (falls to SF Pro / system sans until license)",
    cssVar: "var(--font-body)",
    samples: [
      { size: "text-lg", text: "A basket of heirloom tomatoes from a half-acre in East Austin. Picked this morning, listed this afternoon. This is what happens when the marketplace is your neighborhood.", tracking: "" },
      { size: "text-sm", text: "Copia connects buyers with local growers in Austin, TX. From backyard herb gardens to Hill Country farms, every listing is within pickup or delivery range.", tracking: "" },
    ],
  },
  {
    family: "Mono",
    label: "JetBrains Mono — eyebrows, section numbers, metadata",
    cssVar: "var(--font-mono)",
    samples: [
      { size: "text-xs", text: "01 — MARKETPLACE · AUSTIN, TX · MAY 2026", tracking: "tracking-[0.14em]" },
      { size: "text-[11px]", text: "#509982 · SAGE · WCAG AA 4.5:1 ON CREAM", tracking: "tracking-[0.14em]" },
    ],
  },
];

/* ─── Section wrapper ─────────────────────────────────────────────────────── */

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-16 border-t border-forest/20">
      <div className="flex items-baseline justify-between mb-10 gap-6 flex-wrap">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-forest mb-2">
            {number}
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-deepest-forest">
            {title}
          </h2>
        </div>
      </div>
      {children}
    </section>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-[1100px] mx-auto px-6 sm:px-12 pb-24">
        {/* ── Header ── */}
        <header className="flex items-end justify-between gap-8 flex-wrap py-8 border-b border-forest">
          <div className="flex items-center gap-4">
            <LeafMark className="h-12 w-auto text-forest" />
            <div>
              <p className="font-semibold text-lg tracking-tight text-forest leading-none">
                Copia
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-mid-forest mt-1">
                Design System
              </p>
            </div>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-mid-forest text-right">
            v1 · May 2026 · Austin, TX
          </p>
        </header>

        {/* ── Hero ── */}
        <div className="py-20">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-forest mb-6">
            01 — Foundation
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-deepest-forest max-w-3xl leading-[1.02] mb-6">
            The system behind{" "}
            <em className="font-normal italic text-forest">every screen.</em>
          </h1>
          <p className="text-lg text-charcoal max-w-xl leading-relaxed">
            Ten colors, three type families, one set of rules. Everything Copia
            renders traces back to these tokens. This page is the live
            reference — built from the same CSS variables the product uses.
          </p>
        </div>

        {/* ── 02: Color Palette ── */}
        <Section number="02 — Palette" title="Seven greens, one cream, one black, one warm.">
          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-0 rounded-2xl overflow-hidden shadow-sm">
            {COLORS.map((c) => (
              <div
                key={c.var}
                className="aspect-square p-3 flex flex-col justify-end relative group"
                style={{
                  backgroundColor: `var(${c.var})`,
                  color: c.light ? "var(--cream)" : "var(--deepest-forest)",
                }}
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.12em] opacity-80 mb-1 leading-tight">
                  {c.name}
                </p>
                <p className="font-mono text-[11px]">{c.hex}</p>
              </div>
            ))}
          </div>

          {/* Role descriptions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 mt-10">
            {COLORS.map((c) => (
              <div key={c.var} className="flex items-start gap-3">
                <div
                  className="w-4 h-4 rounded-sm shrink-0 mt-0.5"
                  style={{ backgroundColor: `var(${c.var})` }}
                />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-mid-forest">
                    {c.name} · <code className="text-deepest-forest">{c.var}</code>
                  </p>
                  <p className="text-sm text-charcoal mt-0.5">{c.role}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 03: Accessibility Pairings ── */}
        <Section number="03 — Pairings" title="The combinations that earn their keep.">
          <p className="text-sm text-charcoal mb-8 max-w-lg">
            WCAG AA requires 4.5:1 for body text and 3:1 for large text (18pt+).
            These are the approved production pairings.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { bg: "--cream", fg: "--charcoal", ratio: "16.15:1", level: "AAA", label: "Cream + Charcoal" },
              { bg: "--cream", fg: "--deepest-forest", ratio: "11.04:1", level: "AAA", label: "Cream + Deepest Forest" },
              { bg: "--cream", fg: "--forest", ratio: "6.37:1", level: "AA", label: "Cream + Forest" },
              { bg: "--mint", fg: "--deepest-forest", ratio: "8.23:1", level: "AAA", label: "Mint + Deepest Forest" },
              { bg: "--forest", fg: "--cream", ratio: "6.37:1", level: "AA", label: "Forest + Cream" },
              { bg: "--terracotta", fg: "--charcoal", ratio: "4.58:1", level: "AA", label: "Terracotta + Charcoal" },
            ].map((pair) => (
              <div
                key={pair.label}
                className="rounded-2xl p-5 flex flex-col justify-between"
                style={{
                  backgroundColor: `var(${pair.bg})`,
                  color: `var(${pair.fg})`,
                  minHeight: 160,
                }}
              >
                <p className="text-xl font-semibold tracking-tight">
                  Add to cart
                </p>
                <div className="flex justify-between items-center font-mono text-[10px] uppercase tracking-[0.12em] opacity-70 mt-4">
                  <span>{pair.label}</span>
                  <span>{pair.ratio} · {pair.level}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 04: Typography ── */}
        <Section number="04 — Typography" title="Three families, each in its lane.">
          <div className="space-y-14">
            {TYPE_SAMPLES.map((family) => (
              <div key={family.family}>
                <div className="flex items-baseline gap-3 mb-6">
                  <h3 className="text-lg font-semibold text-deepest-forest">
                    {family.family}
                  </h3>
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-mid-forest">
                    {family.label}
                  </p>
                </div>
                <div className="space-y-4">
                  {family.samples.map((s, i) => (
                    <p
                      key={i}
                      className={`${s.size} ${s.tracking} text-charcoal`}
                      style={{
                        fontFamily: family.cssVar,
                        ...(family.family === "Mono"
                          ? { textTransform: "uppercase" as const }
                          : {}),
                      }}
                    >
                      {s.text}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 05: Buttons ── */}
        <Section number="05 — Buttons" title="Four variants. 44pt minimum touch target.">
          <div className="flex flex-wrap gap-4 items-center">
            <button
              className="inline-flex items-center justify-center rounded-[var(--radius-md)] bg-forest px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-deepest-forest active:scale-[0.98]"
              style={{ minHeight: 44 }}
            >
              Primary action
            </button>
            <button
              className="inline-flex items-center justify-center rounded-[var(--radius-md)] border border-forest px-6 py-3 text-sm font-medium text-forest transition-colors hover:bg-forest/5 active:scale-[0.98]"
              style={{ minHeight: 44 }}
            >
              Secondary
            </button>
            <button
              className="inline-flex items-center justify-center rounded-[var(--radius-md)] px-6 py-3 text-sm font-medium text-forest transition-colors hover:bg-forest/5 active:scale-[0.98]"
              style={{ minHeight: 44 }}
            >
              Ghost
            </button>
            <button
              className="inline-flex items-center justify-center rounded-[var(--radius-md)] bg-terracotta px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-terracotta/90 active:scale-[0.98]"
              style={{ minHeight: 44 }}
            >
              Urgent
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-4 items-center">
            <button
              className="inline-flex items-center justify-center rounded-[var(--radius-md)] bg-forest px-6 py-3 text-sm font-medium text-cream opacity-50 cursor-not-allowed"
              style={{ minHeight: 44 }}
              disabled
            >
              Disabled
            </button>
            <button
              className="inline-flex items-center justify-center rounded-[var(--radius-sm)] bg-forest px-4 py-2 text-xs font-medium text-cream transition-colors hover:bg-deepest-forest active:scale-[0.98]"
              style={{ minHeight: 36 }}
            >
              Small
            </button>
            <button
              className="inline-flex items-center justify-center rounded-[var(--radius-lg)] bg-forest px-8 py-4 text-base font-medium text-cream transition-colors hover:bg-deepest-forest active:scale-[0.98]"
              style={{ minHeight: 52 }}
            >
              Large
            </button>
          </div>
        </Section>

        {/* ── 06: Tags & Badges ── */}
        <Section number="06 — Tags & Badges" title="Category tags, status indicators, notification badges.">
          <div className="flex flex-wrap gap-3 items-center">
            <span className="inline-flex items-center rounded-full bg-light-sage/40 px-3 py-1 text-xs font-medium text-deepest-forest">
              Tomatoes
            </span>
            <span className="inline-flex items-center rounded-full bg-light-sage/40 px-3 py-1 text-xs font-medium text-deepest-forest">
              Herbs
            </span>
            <span className="inline-flex items-center rounded-full bg-light-sage/40 px-3 py-1 text-xs font-medium text-deepest-forest">
              Eggs
            </span>
            <span className="inline-flex items-center rounded-full bg-mint/50 px-3 py-1 text-xs font-medium text-deepest-forest">
              In Season
            </span>
            <span className="inline-flex items-center rounded-full bg-terracotta px-3 py-1 text-xs font-medium text-cream">
              3 new
            </span>
            <span className="inline-flex items-center rounded-full border border-sage-shadow px-3 py-1 text-xs font-medium text-mid-forest">
              Sold out
            </span>
            <span className="inline-flex items-center rounded-full bg-forest px-3 py-1 text-xs font-medium text-cream">
              Verified grower
            </span>
          </div>
        </Section>

        {/* ── 07: Cards ── */}
        <Section number="07 — Cards" title="Product card, seller card, info card.">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Product card */}
            <div className="rounded-[var(--radius-lg)] bg-white overflow-hidden" style={{ boxShadow: "var(--shadow-md)" }}>
              <div className="aspect-[4/3] bg-light-sage/30 flex items-center justify-center">
                <LeafMark className="h-12 w-auto text-sage/40" />
              </div>
              <div className="p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-mid-forest mb-1">
                  East Austin · 0.8 mi
                </p>
                <h3 className="text-base font-semibold text-deepest-forest tracking-tight">
                  Heirloom Tomato Mix
                </h3>
                <p className="text-sm text-charcoal/70 mt-1">
                  Basket of Cherokee Purples, Brandywines, and Green Zebras. Picked this morning.
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-lg font-semibold text-forest">$8</span>
                  <span className="text-xs text-mid-forest">per lb</span>
                </div>
              </div>
            </div>

            {/* Seller card */}
            <div className="rounded-[var(--radius-lg)] bg-white overflow-hidden" style={{ boxShadow: "var(--shadow-md)" }}>
              <div className="aspect-[4/3] bg-forest flex items-center justify-center">
                <LeafMark className="h-16 w-auto text-mint/60" />
              </div>
              <div className="p-5">
                <h3 className="text-base font-semibold text-deepest-forest tracking-tight">
                  Maria&apos;s Garden
                </h3>
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-mid-forest mt-1">
                  Suburban Gardener · Round Rock
                </p>
                <p className="text-sm text-charcoal/70 mt-2">
                  Quarter-acre raised beds. Peppers, herbs, and squash year-round.
                </p>
                <div className="flex gap-2 mt-4">
                  <span className="inline-flex items-center rounded-full bg-light-sage/40 px-2.5 py-0.5 text-[10px] font-medium text-deepest-forest">
                    Peppers
                  </span>
                  <span className="inline-flex items-center rounded-full bg-light-sage/40 px-2.5 py-0.5 text-[10px] font-medium text-deepest-forest">
                    Herbs
                  </span>
                  <span className="inline-flex items-center rounded-full bg-light-sage/40 px-2.5 py-0.5 text-[10px] font-medium text-deepest-forest">
                    Squash
                  </span>
                </div>
              </div>
            </div>

            {/* Info card */}
            <div
              className="rounded-[var(--radius-lg)] bg-mint/20 p-6 flex flex-col justify-between"
              style={{ minHeight: 280 }}
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-forest mb-3">
                  Growing Coach
                </p>
                <h3 className="text-base font-semibold text-deepest-forest tracking-tight">
                  Plant basil now
                </h3>
                <p className="text-sm text-charcoal/70 mt-2">
                  Zone 9a, Austin — May is prime basil season. Genovese and Thai
                  varieties do best in afternoon shade. Three buyers near you
                  searched for basil this week.
                </p>
              </div>
              <button
                className="mt-4 self-start inline-flex items-center justify-center rounded-[var(--radius-sm)] bg-forest px-4 py-2 text-xs font-medium text-cream transition-colors hover:bg-deepest-forest active:scale-[0.98]"
                style={{ minHeight: 36 }}
              >
                See full plan
              </button>
            </div>
          </div>
        </Section>

        {/* ── 08: Form Inputs ── */}
        <Section number="08 — Inputs" title="16px minimum. No zoom on focus.">
          <div className="max-w-md space-y-5">
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-[0.12em] text-mid-forest mb-2">
                Email address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-[var(--radius-md)] border border-sage-shadow/40 bg-white px-4 py-3 text-base text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-colors"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-[0.12em] text-mid-forest mb-2">
                What do you grow?
              </label>
              <select className="w-full rounded-[var(--radius-md)] border border-sage-shadow/40 bg-white px-4 py-3 text-base text-charcoal focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-colors appearance-none">
                <option>Vegetables</option>
                <option>Herbs</option>
                <option>Fruit</option>
                <option>Eggs</option>
                <option>Specialty (honey, jam, baked goods)</option>
              </select>
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-[0.12em] text-mid-forest mb-2">
                Tell us about your garden
              </label>
              <textarea
                rows={3}
                placeholder="Quarter-acre backyard in East Austin..."
                className="w-full rounded-[var(--radius-md)] border border-sage-shadow/40 bg-white px-4 py-3 text-base text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-colors resize-y"
              />
            </div>
          </div>
        </Section>

        {/* ── 09: Shadows & Radii ── */}
        <Section number="09 — Elevation & Radii" title="Warm shadows from deepest-forest, never black.">
          <div className="flex flex-wrap gap-8 items-end">
            {[
              { label: "sm", shadow: "var(--shadow-sm)", radius: "var(--radius-sm)" },
              { label: "md", shadow: "var(--shadow-md)", radius: "var(--radius-md)" },
              { label: "lg", shadow: "var(--shadow-lg)", radius: "var(--radius-lg)" },
              { label: "xl", shadow: "var(--shadow-lg)", radius: "var(--radius-xl)" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-3">
                <div
                  className="w-24 h-24 bg-white"
                  style={{ boxShadow: s.shadow, borderRadius: s.radius }}
                />
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-mid-forest">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 10: Leaf Mark ── */}
        <Section number="10 — Leaf Mark" title="Four approved colorways. No others.">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 rounded-2xl overflow-hidden">
            {[
              { bg: "--cream", fg: "--forest", label: "Forest on Cream" },
              { bg: "--mint", fg: "--deepest-forest", label: "Deepest Forest on Mint" },
              { bg: "--forest", fg: "--cream", label: "Cream on Forest" },
              { bg: "--charcoal", fg: "--mint", label: "Mint on Charcoal" },
            ].map((v) => (
              <div
                key={v.label}
                className="aspect-square flex flex-col items-center justify-center gap-4 p-4"
                style={{ backgroundColor: `var(${v.bg})`, color: `var(${v.fg})` }}
              >
                <LeafMark className="h-14 w-auto" />
                <p
                  className="font-mono text-[9px] uppercase tracking-[0.12em] text-center leading-tight"
                  style={{ color: `var(${v.fg})` }}
                >
                  {v.label}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Footer ── */}
        <footer className="mt-16 pt-6 border-t border-forest/20 flex justify-between items-center flex-wrap gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-mid-forest">
            Copia · Design System · v1 · May 2026
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-mid-forest">
            Built with Next.js + Tailwind v4
          </p>
        </footer>
      </div>
    </main>
  );
}
