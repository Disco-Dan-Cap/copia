"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon } from "@/components/ui/icons";

/**
 * Floating back affordance for the seller profile. A pushed detail view needs a
 * way back besides the tab bar; this sits in the safe area over the banner and
 * does NOT intercept the iOS left-edge swipe-back. Falls back to Home on a deep
 * load with no history.
 */
export function BackButton({ className }: { className?: string }) {
  const router = useRouter();

  const goBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) router.back();
    else router.push("/");
  };

  return (
    <button
      type="button"
      onClick={goBack}
      aria-label="Back"
      className={cn(
        "flex h-[40px] w-[40px] items-center justify-center rounded-full bg-cream text-forest shadow-[var(--shadow-md)] transition-transform active:scale-[0.92]",
        className,
      )}
    >
      <ChevronLeftIcon className="h-[20px] w-[20px]" />
    </button>
  );
}
