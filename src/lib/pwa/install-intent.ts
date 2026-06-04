// Earned-intent gate for the install invitation.
//
// The invitation is offered ONCE, only after a visitor has shown they mean to
// stay — a second visit, or a completed first order. Never on first paint, never
// as a "download our app" banner (directive §172). Declining costs nothing: the
// door stays open in a known place (seller Settings), so we never ask twice.
//
// All reads are SSR-safe and defensively wrapped — Safari private mode throws on
// storage access, and we'd rather not offer than crash.

const KEYS = {
  visits: "copia.pwa.visits",
  countedThisSession: "copia.pwa.counted", // sessionStorage guard
  dismissed: "copia.pwa.inviteDismissed",
  firstOrder: "copia.pwa.firstOrderCompleted",
  installed: "copia.pwa.installed",
} as const;

function local(): Storage | null {
  try {
    return typeof window !== "undefined" ? window.localStorage : null;
  } catch {
    return null;
  }
}

function session(): Storage | null {
  try {
    return typeof window !== "undefined" ? window.sessionStorage : null;
  } catch {
    return null;
  }
}

export function getVisits(): number {
  const raw = local()?.getItem(KEYS.visits);
  return raw ? parseInt(raw, 10) || 0 : 0;
}

/**
 * Increment the visit count at most once per browser session, and return the new
 * count. The sessionStorage guard means a reload or client-side navigation within
 * the same session won't inflate it — a "visit" is a session, not a page view.
 */
export function recordVisit(): number {
  const store = local();
  if (!store) return 0;
  if (session()?.getItem(KEYS.countedThisSession)) return getVisits();
  const next = getVisits() + 1;
  store.setItem(KEYS.visits, String(next));
  session()?.setItem(KEYS.countedThisSession, "1");
  return next;
}

export function markInviteDismissed(): void {
  local()?.setItem(KEYS.dismissed, "1");
}
export function wasInviteDismissed(): boolean {
  return local()?.getItem(KEYS.dismissed) === "1";
}

export function markInstalled(): void {
  local()?.setItem(KEYS.installed, "1");
}
export function wasInstalled(): boolean {
  return local()?.getItem(KEYS.installed) === "1";
}

// Called by checkout (Day 16) on the buyer's first settled order, promoting them
// to "means to stay" without waiting for a second session — so the install
// invitation can fire after one genuine order, not only on a return visit.
export function markFirstOrderComplete(): void {
  local()?.setItem(KEYS.firstOrder, "1");
}
export function firstOrderCompleted(): boolean {
  return local()?.getItem(KEYS.firstOrder) === "1";
}

/**
 * Whether to offer the invitation right now. True only when the visitor has
 * earned-intent (>= 2 visits, or a completed first order) AND has not dismissed
 * it before, AND has not installed. Standalone is the caller's concern (the
 * component holds the live useStandalone() signal); kept out of here so this
 * stays a pure storage read.
 */
export function shouldOfferInstall(): boolean {
  if (!local()) return false;
  if (wasInstalled() || wasInviteDismissed()) return false;
  return getVisits() >= 2 || firstOrderCompleted();
}
