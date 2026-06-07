// Fetches and processes the 12 seller avatars (5 grower faces + 7 farm logos).
//
// Mapping source of truth: the "Seller avatars" section of
// brand/copia-imagery-direction.md (sellerId → Higgsfield job stem). Full-res
// URLs live in case-study/seller-avatars-final.html, where each <img src> is a
// `_min.webp` preview — swap `_min.webp` → `.png` for the full-res master.
//
// Pipeline mirrors scripts/fetch-photos.mjs: download each master, convert with
// sharp to a 400×400 webp, write to public/photos/avatar-{sellerId}.webp. The
// seed points Seller.avatar at these files; avatarGradient stays as the fallback.
//
// Re-runnable. Run from repo root:  node scripts/fetch-avatars.mjs

import sharp from "sharp";
import { readFile, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const MANIFEST = join(ROOT, "brand", "copia-imagery-direction.md");
const CONTACT_SHEET = join(ROOT, "case-study", "seller-avatars-final.html");
const OUT = join(ROOT, "public", "photos");

const SIZE = 400; // 1:1 avatar master
const CONCURRENCY = 6;

/** stem → sellerId, parsed from the "Seller avatars" manifest section only. */
async function stemMap() {
  const md = await readFile(MANIFEST, "utf8");
  const section = md.slice(md.indexOf("## Seller avatars"));
  const map = new Map();
  for (const m of section.matchAll(/^- ([a-z0-9-]+) ✅ (hf_\d+_\d+_[0-9a-f]+)/gm)) {
    map.set(m[2], m[1]); // stem → sellerId
  }
  return map;
}

/** The `_min.webp` preview URLs from the contact sheet (the full-res stem). */
async function avatarUrls() {
  const html = await readFile(CONTACT_SHEET, "utf8");
  return [...html.matchAll(/<img[^>]+src="([^"]+_min\.webp)"/g)].map((m) => m[1]);
}

function stemFromUrl(url) {
  const file = url.split("/").pop() ?? "";
  return file.split("-")[0]; // "hf_DATE_TIME_HEX8-…" → "hf_DATE_TIME_HEX8"
}

/** Masters are mixed .png / .jpeg; CloudFront 403s a missing key, so try each. */
async function fetchMaster(minWebpUrl) {
  for (const ext of [".png", ".jpeg", ".jpg"]) {
    const res = await fetch(minWebpUrl.replace("_min.webp", ext));
    if (res.ok) return Buffer.from(await res.arrayBuffer());
  }
  throw new Error(`no full-res master (.png/.jpeg) found`);
}

async function processOne(url, stems) {
  const stem = stemFromUrl(url);
  const sellerId = stems.get(stem);
  if (!sellerId) throw new Error(`no sellerId for stem ${stem}`);

  const input = await fetchMaster(url);

  await sharp(input)
    .resize(SIZE, SIZE, { fit: "cover", position: "centre" })
    .webp({ quality: 82 })
    .toFile(join(OUT, `avatar-${sellerId}.webp`));

  return sellerId;
}

async function pool(items, n, worker) {
  const results = [];
  let i = 0;
  async function run() {
    while (i < items.length) {
      const item = items[i++];
      try {
        const id = await worker(item);
        results.push({ ok: true, id });
        process.stdout.write(`  ✓ avatar-${id}\n`);
      } catch (e) {
        results.push({ ok: false, error: e.message });
        process.stdout.write(`  ✗ ${e.message}\n`);
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(n, items.length) }, run));
  return results;
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const stems = await stemMap();
  const urls = await avatarUrls();
  console.log(`Parsed ${stems.size} avatar mappings, ${urls.length} URLs. Downloading + converting…`);

  const results = await pool(urls, CONCURRENCY, (url) => processOne(url, stems));
  const ok = results.filter((r) => r.ok).length;
  const failed = results.filter((r) => !r.ok);

  console.log(`\nDone — ${ok}/${urls.length} avatars written to public/photos/.`);
  if (failed.length || ok !== 12) {
    console.error("Incomplete:", JSON.stringify(failed, null, 2));
    process.exit(1);
  }
}

main().catch((e) => {
  console.error("fatal:", e);
  process.exit(1);
});
