"use client";

import { useId, useState } from "react";
import { PhotoFill } from "@/components/media/photo-fill";

// The PHOTO affordance for the listing editor. One tap opens the native iOS
// sheet (Camera / Photo Library) via <input type="file" accept="image/*"> — no
// custom chrome, no cropper, no progress bar. The chosen image is resized in the
// browser to an 800×800 cover and handed back as a data URL; the gradient stays
// as the designed fallback whenever there's no photo.
//
// Stubbed-demo storage: in production these uploads go to Supabase Storage (per
// the brief), the same way real money is stubbed in checkout. Here the resized
// data URL is persisted client-side (see lib/listings/photo-overrides) so the
// demo needs no backend.

const QUOTA_MSG = "That photo didn't save — storage is full on this device.";
const READ_MSG = "That photo didn't load — try another one.";

const TARGET_BYTES = 200 * 1024; // keep the master well under 250KB

/** Center-cover a picked image into an 800×800 JPEG data URL, EXIF-corrected. */
async function fileToCoverDataUrl(file: File, size = 800): Promise<string> {
  const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  const side = Math.min(bitmap.width, bitmap.height);
  const sx = (bitmap.width - side) / 2;
  const sy = (bitmap.height - side) / 2;

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("no 2d context");
  ctx.drawImage(bitmap, sx, sy, side, side, 0, 0, size, size);
  bitmap.close?.();

  // Step quality down until the master is comfortably small. JPEG, not WebP:
  // canvas WebP encoding is unreliable on older Safari, and JPEG is universal.
  let quality = 0.82;
  let url = canvas.toDataURL("image/jpeg", quality);
  while (dataUrlBytes(url) > TARGET_BYTES && quality > 0.5) {
    quality -= 0.1;
    url = canvas.toDataURL("image/jpeg", quality);
  }
  return url;
}

function dataUrlBytes(url: string): number {
  const comma = url.indexOf(",");
  return Math.floor(((url.length - comma - 1) * 3) / 4); // base64 → bytes
}

function CameraGlyph() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-[14px] w-[14px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8.5a2 2 0 0 1 2-2h1.5l1-1.5h5l1 1.5H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <circle cx="12" cy="12.5" r="3.2" />
    </svg>
  );
}

const TEXT_LINK =
  "inline-flex min-h-[44px] items-center text-[13px] text-mid-forest underline decoration-mid-forest/30 underline-offset-2 transition-opacity active:opacity-60 cursor-pointer";

export function PhotoPicker({
  photo,
  gradient,
  alt,
  onPick,
  onRemove,
}: {
  /** The current effective photo to preview (data URL or seed path), if any. */
  photo?: string;
  /** The listing gradient — the preview's fallback, exactly as on a real card. */
  gradient: [string, string];
  alt: string;
  /** Persist the resized photo. Returns false if it couldn't be saved (quota). */
  onPick: (dataUrl: string) => boolean;
  onRemove: () => void;
}) {
  const inputId = useId();
  const [error, setError] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-picking the same file
    if (!file) return;
    setError(null);
    try {
      const dataUrl = await fileToCoverDataUrl(file);
      if (!onPick(dataUrl)) setError(QUOTA_MSG);
    } catch {
      setError(READ_MSG);
    }
  }

  const bg = `linear-gradient(135deg, ${gradient[0]} 0%, ${gradient[1]} 100%)`;

  return (
    <div>
      {/* One hidden input, shared by every affordance below via htmlFor. */}
      <input
        id={inputId}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handleFile}
      />

      {photo ? (
        <>
          {/* Preview in the exact card geometry a listing uses — photo over the
              gradient, so the fallback is visible the moment a photo is removed.
              Tapping it replaces the photo (one tap, native sheet). */}
          <label
            htmlFor={inputId}
            aria-label="Replace photo"
            className="relative block aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-[14px]"
            style={{ backgroundImage: bg }}
          >
            <PhotoFill src={photo} alt={alt} eager />
          </label>
          <div className="mt-[10px] flex items-center gap-[20px]">
            <label htmlFor={inputId} className={TEXT_LINK}>
              Replace photo
            </label>
            <button type="button" onClick={onRemove} className={TEXT_LINK}>
              Remove photo
            </button>
          </div>
        </>
      ) : (
        <label
          htmlFor={inputId}
          className="inline-flex min-h-[44px] cursor-pointer items-center gap-[8px] rounded-full border border-dashed border-sage-shadow/50 px-[16px] font-mono text-[10px] uppercase tracking-[0.12em] text-sage-shadow transition-opacity active:opacity-60"
        >
          <CameraGlyph />
          Add a photo
        </label>
      )}

      {error ? <p className="mt-[10px] text-[13px] leading-[1.5] text-mid-forest">{error}</p> : null}
    </div>
  );
}
