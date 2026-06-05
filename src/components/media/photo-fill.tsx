/**
 * The photographic layer. Renders a cover image that fills its parent — a
 * container that is already sized (fixed dimensions or an aspect ratio),
 * `relative`, and `overflow-hidden`, and that still carries the listing/seller
 * gradient as its background. So when `src` is absent (a session-created
 * listing) or the file fails to load, the designed gradient shows through. The
 * photo replaces the fill; it is never new chrome.
 *
 * No layout shift: the parent reserves the space, the image is absolutely
 * positioned within it. Below-the-fold images lazy-load; pass `eager` for the
 * one above-the-fold hero on a page.
 */
export function PhotoFill({
  src,
  alt = "",
  eager = false,
}: {
  src?: string;
  alt?: string;
  eager?: boolean;
}) {
  if (!src) return null;
  return (
    // Deliberately a plain <img>, not next/image: these are already-optimized,
    // fixed-size webps served from /public, so the optimization pipeline would
    // add cost and a wrapper for no gain. Lazy-loading + the sized parent give
    // us the perf wins next/image would.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}
