import Link from "next/link";

/**
 * The dashboard's closing matter — "further reading" for the publication. The
 * bottom tab bar holds five by iOS convention and shouldn't grow, so the two
 * insights surfaces that live only in the desktop sidebar (Analytics, Settings)
 * reach mobile here, as quiet cue lines rather than global chrome. Same register
 * as the inline figure cues ("View the season →"): mono-caps forest, underline
 * on hover, no button, arrow only. Each row is a 44pt-tall touch target.
 */
export function DashboardOutro({
  cues,
}: {
  cues: { label: string; href: string }[];
}) {
  return (
    <section className="border-t border-forest/20 pt-[16px]">
      <p className="mb-[6px] font-mono text-[9.5px] uppercase tracking-[0.16em] text-mid-forest">
        More from your stall
      </p>
      <div className="flex flex-col">
        {cues.map((cue) => (
          <Link
            key={cue.href}
            href={cue.href}
            className="group flex min-h-[44px] items-center font-mono text-[9.5px] uppercase tracking-[0.14em] text-forest underline decoration-forest/30 underline-offset-[3px] transition-[color,opacity] active:opacity-60 hover:decoration-forest"
          >
            {cue.label} →
          </Link>
        ))}
      </div>
    </section>
  );
}
