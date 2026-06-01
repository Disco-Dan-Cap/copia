import Link from "next/link";
import type { CoachNote } from "@/lib/data/dashboard";
import { LeafMark } from "@/components/ui/leaf-mark";

const SECONDARY_CLS =
  "border-b border-forest pb-[1px] font-mono text-[10.5px] uppercase tracking-[0.14em] text-forest transition-opacity active:opacity-60";

/**
 * The memorable moment — an AI insight written like a knowledgeable friend's
 * note, not a notification. The note itself is a seeded preview; its primary
 * action is the dashboard's door into the full Growing Coach (Day 13), where
 * the live letter is composed. The label stays specific and in voice, tied to
 * the note's content — never "Open coach."
 */
export function CoachCard({
  note,
  primaryHref,
  secondaryHref,
}: {
  note: CoachNote;
  primaryHref?: string;
  secondaryHref?: string;
}) {
  return (
    <div className="relative flex gap-[16px] overflow-hidden rounded-[14px] border border-sage/35 border-l-[3px] border-l-forest bg-[color-mix(in_oklab,var(--light-sage)_20%,var(--cream))] p-[22px] lg:gap-[24px] lg:p-[28px]">
      <LeafMark className="mt-[4px] h-[44px] w-[32px] shrink-0 text-forest" />
      <div className="flex-1">
        <div className="mb-[10px] font-mono text-[10px] uppercase tracking-[0.16em] text-forest">
          {note.meta}
        </div>
        <p
          className="mb-[14px] max-w-[600px] text-[18px] font-medium leading-[1.35] tracking-[-0.02em] text-deepest-forest [&_em]:font-emphasis [&_em]:font-normal [&_em]:italic [&_em]:text-forest lg:text-[20px]"
          dangerouslySetInnerHTML={{ __html: note.quote }}
        />
        <p className="mb-[18px] max-w-[580px] text-[14px] leading-[1.55] text-mid-forest">
          {note.reason}
        </p>
        <div className="flex flex-wrap items-center gap-[14px]">
          {primaryHref ? (
            <Link
              href={primaryHref}
              className="rounded-[8px] bg-forest px-[18px] py-[10px] text-[13px] font-medium text-cream transition-transform active:scale-[0.98]"
            >
              {note.action}
            </Link>
          ) : (
            <button
              type="button"
              className="rounded-[8px] bg-forest px-[18px] py-[10px] text-[13px] font-medium text-cream transition-transform active:scale-[0.98]"
            >
              {note.action}
            </button>
          )}
          {note.secondary ? (
            secondaryHref ? (
              <Link href={secondaryHref} className={SECONDARY_CLS}>
                {note.secondary}
              </Link>
            ) : (
              <button type="button" className={SECONDARY_CLS}>
                {note.secondary}
              </button>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
}
