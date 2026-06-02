/**
 * Generate iOS apple-touch-startup-image PNGs for Copia.
 *
 * iOS does NOT auto-generate launch images, and the native launch image MUST be
 * a flat static PNG — iOS cannot animate it. The motion (wordmark assembling
 * from its concentric layers) lives in an in-app splash overlay, built later.
 *
 * Source art: brand/copia-splash-mint.svg — the gummy "COPIA" wordmark on the
 * retro-mint field (--mint-wash, #b3e0d2). Per directive §145, the splash is a
 * brand moment: the gummy wordmark on mint, never a generic white launch screen.
 *
 * The wordmark stays centered and proportional; the mint field fills the rest.
 * We nest the source artwork (viewBox 0 0 1125 2436) inside a per-device canvas
 * with preserveAspectRatio="xMidYMid meet" so it is contained and centered, and
 * paint the canvas --mint-wash so any letterbox margin is the same field color.
 *
 * Outputs: public/splash/splash-<W>x<H>.png  (one per modern-iPhone size, portrait)
 */

import sharp from "sharp";
import { readFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const splashDir = join(root, "public", "splash");
mkdirSync(splashDir, { recursive: true });

// --mint-wash (splash field). Mirrors the token in globals.css; the wordmark
// layers carry their own (existing) palette colors inside the source SVG.
const MINT_WASH = "#b3e0d2";

// Source artwork: strip the XML declaration and the outer <svg> wrapper so the
// defs + paths can nest inside each device-sized canvas.
const SRC_VIEWBOX = "0 0 1125 2436";
const rawSplash = readFileSync(join(root, "brand", "copia-splash-mint.svg"), "utf8");
const artwork = rawSplash
  .replace(/<\?xml[^>]*\?>\s*/i, "")
  .replace(/<svg[^>]*>/i, "")
  .replace(/<\/svg>\s*$/i, "")
  .trim();

// Physical pixel sizes = logical size × dpr, portrait. Covers modern iPhones
// (Pro / Pro Max / standard, X-era through 15-era) plus the 8/SE and a 1080p tier.
const sizes = [
  [1170, 2532], // 390×844 @3 — iPhone 12/13/14/15, 16
  [1284, 2778], // 428×926 @3 — 12/13/14 Pro Max, Plus
  [1179, 2556], // 393×852 @3 — 14/15/16 Pro
  [1290, 2796], // 430×932 @3 — 14/15/16 Pro Max
  [1242, 2688], // 414×896 @3 — XS Max, 11 Pro Max
  [1125, 2436], // 375×812 @3 — X, XS, 11 Pro
  [828, 1792],  // 414×896 @2 — XR, 11
  [750, 1334],  // 375×667 @2 — 8, SE (2nd/3rd gen)
  [1080, 2340], // 360×780 @3 — 1080p tier
];

async function generateSplash(w, h) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${MINT_WASH}"/>
  <svg x="0" y="0" width="${w}" height="${h}" viewBox="${SRC_VIEWBOX}" preserveAspectRatio="xMidYMid meet">
    ${artwork}
  </svg>
</svg>`;
  const out = join(splashDir, `splash-${w}x${h}.png`);
  await sharp(Buffer.from(svg)).png().toFile(out);
  console.log(`Generated: ${out} (${w}x${h})`);
}

for (const [w, h] of sizes) {
  await generateSplash(w, h);
}

console.log("All splash images generated.");
