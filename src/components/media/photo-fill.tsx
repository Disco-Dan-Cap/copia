"use client";

import { useListingPhotoOverride } from "@/lib/listings/photo-overrides";

/**
 * The photographic layer. Renders a cover image that fills its parent — a
 * container that is already sized (fixed dimensions or an aspect ratio),
 * `relative`, and `overflow-hidden`, and that still carries the listing/seller
 * gradient as its background. So when there's no photo (a session-created
 * listing, a removed photo) or the file fails to load, the designed gradient
 * shows through. The photo replaces the fill; it is never new chrome.
 *
 * `overrideKey` (a listing id) opts into seller-uploaded overrides: a stored
 * data URL wins over `src`, and an explicit removal falls back to the gradient.
 * Seller vignettes pass no key and render `src` as-is.
 *
 * No layout shift: the parent reserves the space, the image is absolutely
 * positioned within it. Below-the-fold images lazy-load; pass `eager` for the
 * one above-the-fold hero on a page.
 */
export function PhotoFill({
  src,
  alt = "",
  eager = false,
  overrideKey,
}: {
  src?: string;
  alt?: string;
  eager?: boolean;
  overrideKey?: string;
}) {
  const override = useListingPhotoOverride(overrideKey);
  // An override wins over the seed src: a data URL replaces it; an explicit
  // null (the seller removed the photo) falls through to the gradient.
  const effective = override !== undefined ? override ?? undefined : src;
  if (!effective) return null;
  return (
    // Deliberately a plain <img>, not next/image: these are already-optimized,
    // fixed-size webps served from /public (and seller uploads are data URLs),
    // so the optimization pipeline would add cost and a wrapper for no gain.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={effective}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}
