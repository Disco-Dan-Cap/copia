// Builds the image assets for the Copia portfolio case-study page.
// Copies the phone screenshots into the self-contained portfolio-page/assets/
// folder (relative paths, no base64) and produces the two derived crops:
//   - the 2021 EDEN screen (cropped out of the supplied marketing render)
//   - the checkout proximity-suggestion band (the "where AI isn't" detail)
//
// Run from repo root:  node scripts/build-case-study-assets.mjs
import sharp from "sharp";
import { copyFile, mkdir } from "node:fs/promises";

const SRC = "case-study/screenshots/mobile";
const OUT = "case-study/portfolio-page/assets";

// Full-page phone scrolls copied verbatim (displayed in phone-aspect frames,
// top-aligned, never distorted — the frame is the crop, the file is untouched).
const copies = [
  "home.png",
  "settling-up-multi.png",
  "calendar.png",
  "analytics.png",
  "coach.png",
];

async function main() {
  await mkdir(OUT, { recursive: true });

  for (const f of copies) {
    await copyFile(`${SRC}/${f}`, `${OUT}/${f}`);
    console.log("copied", f);
  }

  // 2021 EDEN screen — the right-hand phone in the 2021 marketing render,
  // the one that still says "Cart" and "150 sellers in your area!".
  // Crop the screen content only (no device bezel), tab bar included.
  await sharp("EDEN UI-UX-01.jpg")
    .extract({ left: 3402, top: 470, width: 760, height: 1647 })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(`${OUT}/eden-2021-home.jpg`);
  console.log("cropped eden-2021-home.jpg");

  // The checkout proximity suggestion — the deterministic, non-AI
  // market-day line. A focused detail band, hairline to hairline.
  await sharp(`${SRC}/settling-up-multi.png`)
    .extract({ left: 30, top: 1786, width: 720, height: 232 })
    .toFile(`${OUT}/proximity-line.png`);
  console.log("cropped proximity-line.png");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
