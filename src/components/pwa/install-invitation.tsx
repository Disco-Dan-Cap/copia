"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { LeafMark } from "@/components/ui/leaf-mark";
import { isIOS } from "@/lib/pwa/platform";
import { isStandalone, useStandalone } from "@/lib/pwa/use-standalone";
import { useInstallPrompt, type BeforeInstallPromptEvent } from "@/lib/pwa/use-install-prompt";
import {
  markInviteDismissed,
  recordVisit,
  shouldOfferInstall,
} from "@/lib/pwa/install-intent";

type Context = "seller" | "buyer";

// ─────────────────────────────────────────────────────────────────────────────
// The iOS Share glyph, drawn to match the system icon — a box open at the top
// with an arrow rising out of it. Hand-drawn (never a Material icon, directive
// §188) so the instructional copy points at exactly what the user will see.
// ─────────────────────────────────────────────────────────────────────────────
function ShareGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path
        d="M8.5 8H6.5A1.5 1.5 0 0 0 5 9.5V15.5A1.5 1.5 0 0 0 6.5 17H13.5A1.5 1.5 0 0 0 15 15.5V9.5A1.5 1.5 0 0 0 13.5 8H11.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 12.5V3.5M7 6.5L10 3.5L13 6.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true" className={className}>
      <path
        d="M4.5 3L7.5 6L4.5 9"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// The shared instructional content. Branches on platform: iOS gets the Share-
// sheet steps (no programmatic install exists there); Chromium gets a single
// "Add Copia" affordance wired to the deferred prompt, falling back to the same
// instructional register if the event never arrived (so there's never a dead
// button). Copy is checked against the directive NEVER list — no "best
// experience", no urgency, no "this website"; Copia, or the app, or implicit.
// ─────────────────────────────────────────────────────────────────────────────
function InstallInstructions({
  headingId,
  deferred,
  onAdd,
}: {
  headingId: string;
  deferred: BeforeInstallPromptEvent | null;
  onAdd: () => void;
}) {
  const ios = isIOS();

  return (
    <div>
      <div className="flex items-center gap-[9px]">
        <LeafMark className="h-[20px] w-[15px] text-forest" />
        <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-sage-shadow">
          A spot on your home screen
        </span>
      </div>

      <h2
        id={headingId}
        className="mt-[12px] font-display text-[24px] font-bold leading-[1.12] tracking-[-0.02em] text-forest"
      >
        Keep Copia on your home screen
      </h2>

      {ios ? (
        <>
          <p className="mt-[10px] text-[15px] leading-[1.6] text-charcoal">
            Open the share menu and choose Add to Home Screen. Copia opens
            full-screen after that, and picks up where you left off.
          </p>
          {/* The concrete path, drawn the way the user will see it */}
          <div className="mt-[16px] flex items-center gap-[10px] rounded-[12px] bg-cream-warm px-[14px] py-[12px]">
            <ShareGlyph className="h-[20px] w-[20px] shrink-0 text-forest" />
            <span className="text-[14px] text-charcoal">Share</span>
            <ChevronRight className="h-[12px] w-[12px] shrink-0 text-sage-shadow" />
            <span className="text-[14px] text-charcoal">Add to Home Screen</span>
          </div>
        </>
      ) : deferred ? (
        <>
          <p className="mt-[10px] text-[15px] leading-[1.6] text-charcoal">
            Add Copia and it opens full-screen, straight from your home screen —
            no tab to find, no address to type.
          </p>
          <button
            type="button"
            onClick={onAdd}
            className="mt-[16px] flex h-[48px] w-full items-center justify-center rounded-[12px] bg-forest px-[20px] text-[15px] font-medium text-cream transition-transform active:scale-[0.98]"
          >
            Add Copia
          </button>
        </>
      ) : (
        <p className="mt-[10px] text-[15px] leading-[1.6] text-charcoal">
          Add Copia from your browser&rsquo;s menu and it opens full-screen,
          straight from the home screen — no tab to find, no address to type.
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// The bottom-sheet chrome — a calm note slipped in at the foot of the screen.
// NOT a center-screen modal, NOT a blocking interstitial: there is no scrim, the
// app stays fully interactive behind it, and the sheet matches the iPhone-width
// column. Slides up with the same Motion spring the filter sheet uses; reduced
// motion gets a plain fade. Sits in the bottom safe area.
// ─────────────────────────────────────────────────────────────────────────────
function InstallSheet({
  open,
  headingId,
  children,
  onExitComplete,
}: {
  open: boolean;
  headingId: string;
  children: React.ReactNode;
  onExitComplete?: () => void;
}) {
  const reduce = useReducedMotion();

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {open ? (
        <motion.div
          role="dialog"
          aria-labelledby={headingId}
          className="safe-bottom pointer-events-none fixed inset-x-0 bottom-0 z-[90] flex justify-center px-[16px] pb-[16px]"
          initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 28 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: reduce ? 0 : 0, y: reduce ? 0 : 28 }}
          transition={reduce ? { duration: 0.18 } : { type: "spring", stiffness: 360, damping: 34 }}
        >
          <div className="pointer-events-auto w-full max-w-[440px] rounded-[20px] border border-forest/10 bg-cream p-[22px] shadow-[var(--shadow-lg)]">
            {children}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// The auto invitation — earned-intent, one-time, app-wide. Mounted once in the
// root layout; self-gates on shouldOfferInstall() AND live standalone state, so
// it never appears for installed users or in a context that hasn't earned it.
// ─────────────────────────────────────────────────────────────────────────────
export function InstallInvitation() {
  const reduce = useReducedMotion();
  const standalone = useStandalone();
  const pathname = usePathname();
  const context: Context = pathname?.startsWith("/seller") ? "seller" : "buyer";
  const { deferred, promptInstall, installed } = useInstallPrompt();

  const [offered, setOffered] = useState(false);
  const [parting, setParting] = useState(false);

  useEffect(() => {
    // A visit is a session. Count it, then decide — but only after a beat, so the
    // invitation reads like a key handed over on the way out, not a popup on the
    // way in. setState lives inside the timeout, never the effect body.
    recordVisit();
    if (isStandalone() || !shouldOfferInstall()) return;
    const id = window.setTimeout(() => setOffered(true), 1400);
    return () => window.clearTimeout(id);
  }, []);

  // Derived, so an appinstalled event or a late standalone flip retires it with
  // no extra effect-driven setState.
  const open = offered && !installed && !standalone;

  const dismiss = () => {
    markInviteDismissed();
    // Name the resting place before the card goes — declining costs nothing
    // because the door stays open somewhere known.
    setParting(true);
    window.setTimeout(() => setOffered(false), reduce ? 1100 : 1800);
  };

  const add = async () => {
    const outcome = await promptInstall();
    // Offered once: whichever way the OS prompt resolves, we retire the invite.
    // On accept, appinstalled also fires and latches installed.
    if (outcome) {
      markInviteDismissed();
      setOffered(false);
    }
  };

  const restingLine =
    context === "seller"
      ? "You'll find this any time in Settings."
      : "You can add Copia any time from your browser's Share menu.";

  return (
    <InstallSheet open={open} headingId="copia-install-heading" onExitComplete={() => setParting(false)}>
      {parting ? (
        <div className="py-[4px]">
          {/* The single load-bearing italic — the reassurance that the door stays open */}
          <p className="font-emphasis text-[17px] italic leading-[1.4] text-mid-forest">
            {restingLine}
          </p>
        </div>
      ) : (
        <>
          <InstallInstructions headingId="copia-install-heading" deferred={deferred} onAdd={add} />
          <div className="mt-[18px] flex justify-end">
            <button
              type="button"
              onClick={dismiss}
              className="inline-flex min-h-[44px] items-center px-[4px] text-[14px] text-forest underline decoration-forest/30 underline-offset-2 transition-opacity active:opacity-60"
            >
              Not now
            </button>
          </div>
        </>
      )}
    </InstallSheet>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// The permanent home — a single quiet line for a Settings colophon (seller now,
// buyer later). This is the promise the dismiss copy makes good on: the door,
// always in the same place. Opens the SAME instructional sheet on demand, with
// no earned-intent gate (the user came looking for it).
// ─────────────────────────────────────────────────────────────────────────────
export function InstallAffordance() {
  const standalone = useStandalone();
  const { deferred, promptInstall, installed } = useInstallPrompt();
  const [open, setOpen] = useState(false);

  // Already on the home screen → there is nothing to add. Stay quiet.
  if (standalone || installed) return null;

  const add = async () => {
    const outcome = await promptInstall();
    if (outcome === "accepted") setOpen(false);
  };

  return (
    <div className="mt-[16px] border-t border-forest/10 pt-[16px]">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-[13px] text-forest underline decoration-forest/30 underline-offset-2 transition-opacity active:opacity-60"
      >
        Add Copia to your home screen
      </button>

      <InstallSheet open={open} headingId="copia-install-affordance-heading">
        <InstallInstructions
          headingId="copia-install-affordance-heading"
          deferred={deferred}
          onAdd={add}
        />
        <div className="mt-[18px] flex justify-end">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex min-h-[44px] items-center px-[4px] text-[14px] text-forest underline decoration-forest/30 underline-offset-2 transition-opacity active:opacity-60"
          >
            Done
          </button>
        </div>
      </InstallSheet>
    </div>
  );
}
