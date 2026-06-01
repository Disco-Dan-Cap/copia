"use client";

import type { StallPrefs } from "@/lib/data/stall-prefs";
import { EditableProse } from "./editable-prose";
import { StallSection } from "./stall-section";
import { StallStatus } from "./stall-status";
import { setStallField, useStallEdits } from "./store";

/**
 * The stall ledger — the editable body of Settings. Same structure as the
 * analytics almanac (mono-caps label over content, one editorial column), but
 * the content is the grower's own prose instead of figures. Every field is the
 * Day-8 borderless input: always-editable, optimistic, no Save button. Server
 * passes the seed defaults; this merges this session's edits on top.
 */
export function SettingsLedger({
  sellerId,
  defaults,
}: {
  sellerId: string;
  defaults: StallPrefs;
}) {
  const edits = useStallEdits(sellerId);
  const bio = edits.bio ?? defaults.bio;
  const growing = edits.growing ?? defaults.growing;
  const pickup = edits.pickup ?? defaults.pickup;
  const reach = edits.reach ?? defaults.reach;

  return (
    <div className="flex flex-col gap-[34px]">
      <StallSection label="Who you are">
        <EditableProse
          value={bio}
          onChange={(v) => setStallField(sellerId, { bio: v })}
          ariaLabel="Your bio"
          placeholder="A few lines about your stall."
          className="text-[16px] leading-[1.6] text-charcoal"
        />
      </StallSection>

      {/* The load-bearing line — given a touch more weight so it stays quotable. */}
      <StallSection label="What's growing">
        <EditableProse
          value={growing}
          onChange={(v) => setStallField(sellerId, { growing: v })}
          ariaLabel="What's growing"
          placeholder="What you grow, and when."
          className="text-[19px] leading-[1.5] tracking-[-0.01em] text-deepest-forest"
        />
      </StallSection>

      <StallSection label="When you're open">
        <EditableProse
          value={pickup}
          onChange={(v) => setStallField(sellerId, { pickup: v })}
          ariaLabel="Pickup hours"
          placeholder="When and where buyers can find you."
          className="text-[16px] leading-[1.55] text-charcoal"
        />
      </StallSection>

      <StallSection label="How to reach you">
        <EditableProse
          value={reach}
          onChange={(v) => setStallField(sellerId, { reach: v })}
          ariaLabel="How to reach you"
          placeholder="Letter, text, or at the market."
          className="text-[16px] leading-[1.55] text-charcoal"
        />
      </StallSection>

      <StallSection label="Is the stall open">
        <StallStatus sellerId={sellerId} defaultReason={defaults.pauseReason} />
      </StallSection>
    </div>
  );
}
