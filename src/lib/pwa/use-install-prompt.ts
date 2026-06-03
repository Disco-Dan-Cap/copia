"use client";

import { useEffect, useState } from "react";
import { markInstalled } from "./install-intent";

// The Chromium-only install handshake. On Android / desktop Chromium the browser
// fires `beforeinstallprompt`; we preventDefault to suppress its generic mini-
// infobar and stash the event so we can trigger the real prompt from Copia's own
// invitation, in Copia's own voice. iOS never fires it (its path is the Share
// sheet), so consumers fall back to instructional copy when `deferred` is null.

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export function useInstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const onBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => {
      markInstalled();
      setInstalled(true);
      setDeferred(null);
    };
    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  /** Trigger the native prompt. Returns the outcome, or null if none is stashed. */
  const promptInstall = async (): Promise<"accepted" | "dismissed" | null> => {
    if (!deferred) return null;
    await deferred.prompt();
    const choice = await deferred.userChoice;
    setDeferred(null); // a deferred prompt can only be used once
    return choice.outcome;
  };

  return { deferred, promptInstall, installed };
}
