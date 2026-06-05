// Fetches and processes the app's photographic layer.
//
// Source of truth: case-study/imagery-contact-sheet.html — every <figure> holds
// the full-resolution image URL in its <a href> and the manifest id in its
// <figcaption> (e.g. "l-miras-tomatoes", "v-cherrywood-backyard"; any
// "(flag: …)" / "(calibration…)" suffix is ignored). Art direction for these
// images lives in brand/copia-imagery-direction.md.
//
// Pipeline: download all 50 full-res masters, convert with sharp —
//   listings  (l-…) → 800×800  webp (1:1 master, cover)
//   vignettes (v-…) → 1200×800 webp (3:2 master, cover)
// — and write them to public/photos/{manifest-id}.webp. The seed data points
// Listing.photo / Seller.photo at these files; the gradient stays as the
// designed fallback.
//
// Re-runnable. Run from repo root:  node scripts/fetch-photos.mjs

import sharp from "sharp";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CONTACT_SHEET = join(ROOT, "case-study", "imagery-contact-sheet.html");
const OUT = join(ROOT, "public", "photos");

const SIZES = {
  l: { width: 800, height: 800 }, // listing master — 1:1
  v: { width: 1200, height: 800 }, // seller vignette — 3:2
};
const CONCURRENCY = 6;

/** Pull { id, url } out of every <figure> in the contact sheet. */
async function parseContactSheet() {
  const html = await readFile(CONTACT_SHEET, "utf8");
  const re =
    /<a href='([^']+)'[^>]*>\s*<img[^>]*>\s*<\/a>\s*<figcaption>([^<]+)<\/figcaption>/g;
  const items = [];
  for (const m of html.matchAll(re)) {
    const url = m[1];
    const id = m[2].trim().split(/\s+/)[0]; // first token; drops "(flag: …)" etc.
    items.push({ id, url });
  }
  return items;
}

async function processOne({ id, url }) {
  const kind = id.startsWith("v-") ? "v" : "l";
  const { width, height } = SIZES[kind];

  const res = await fetch(url);
  if (!res.ok) throw new Error(`download ${id}: HTTP ${res.status}`);
  const input = Buffer.from(await res.arrayBuffer());

  await sharp(input)
    .resize(width, height, { fit: "cover", position: "centre" })
    .webp({ quality: 80 })
    .toFile(join(OUT, `${id}.webp`));

  return id;
}

/** Run tasks with a small concurrency pool, preserving the polite-download cap. */
async function pool(items, n, worker) {
  const results = [];
  let i = 0;
  async function run() {
    while (i < items.length) {
      const idx = i++;
      try {
        results.push({ ok: true, id: await worker(items[idx]) });
        process.stdout.write(`  ✓ ${items[idx].id}\n`);
      } catch (e) {
        results.push({ ok: false, id: items[idx].id, error: e.message });
        process.stdout.write(`  ✗ ${items[idx].id} — ${e.message}\n`);
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(n, items.length) }, run));
  return results;
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const items = await parseContactSheet();
  const listings = items.filter((x) => x.id.startsWith("l-")).length;
  const vignettes = items.filter((x) => x.id.startsWith("v-")).length;
  console.log(`Parsed ${items.length} images (${listings} listings, ${vignettes} vignettes). Downloading + converting…`);

  const results = await pool(items, CONCURRENCY, processOne);
  const ok = results.filter((r) => r.ok).length;
  const failed = results.filter((r) => !r.ok);

  // A small manifest of what was written, for traceability.
  await writeFile(
    join(OUT, "manifest.json"),
    JSON.stringify(
      { generatedAt: "build-time", count: ok, listings, vignettes, ids: results.filter((r) => r.ok).map((r) => r.id).sort() },
      null,
      2,
    ),
  );

  console.log(`\nDone — ${ok}/${items.length} written to public/photos/.`);
  if (failed.length) {
    console.error("Failed:", JSON.stringify(failed, null, 2));
    process.exit(1);
  }
}

main().catch((e) => {
  console.error("fatal:", e);
  process.exit(1);
});
