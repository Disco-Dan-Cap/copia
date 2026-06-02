// Case-study screenshot capture. Drives a production build of Copia with
// Playwright and saves full-page screenshots of every surface at the iPhone-
// first mobile target (390×844 @2x) and a desktop viewport (1440×900 @1x).
//
// Notes on the two non-obvious bits:
//   • Scroll model — both the buyer (app) and seller shells are `h-dvh` with an
//     inner `overflow-y-auto` <main>. Playwright's fullPage measures the
//     DOCUMENT, which is just one viewport tall here, so we inject a small
//     stylesheet that unlocks the shells into natural document flow before each
//     shot. Horizontal scrollers (season strips) are left alone.
//   • Coach loading state — the leaf-mark self-draw only shows on a COLD
//     (seller, week) cache, where the page client-fetches the reading. We
//     capture both viewports' loading shots FIRST, holding the fetch at the
//     browser (so it never reaches the server and the cache stays cold), then
//     capture the rendered letters (the first of which warms the cache).
//
// Animations are frozen for the standard shots via reduced-motion emulation
// (the app's globals.css zeroes durations under prefers-reduced-motion); the
// coach-loading shot runs with motion enabled so the draw is mid-stroke.

import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "case-study", "screenshots");
const BASE = "http://localhost:3000";
const SELLER = "miras-half-acre";

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  { name: "desktop", width: 1440, height: 900, deviceScaleFactor: 1, isMobile: false, hasTouch: false },
];

// file = output name (surface, no route prefix); map = give Mapbox extra settle.
const ROUTES = [
  // Buyer flow (public)
  { file: "home", url: "/", map: true },
  { file: "seller-profile", url: `/sellers/${SELLER}`, map: true },
  { file: "product-detail", url: "/listings/l-miras-tomatoes" },
  { file: "search", url: "/search?q=tomatoes", map: true },
  // Seller flow (demo identity = Mira)
  { file: "dashboard", url: `/seller/dashboard?as=${SELLER}` },
  { file: "orders", url: `/seller/orders?as=${SELLER}` },
  { file: "order-detail", url: `/seller/orders/o-mira-3?as=${SELLER}` },
  { file: "listings", url: `/seller/listings?as=${SELLER}` },
  { file: "listing-detail", url: `/seller/listings/l-miras-lettuce?as=${SELLER}` },
  { file: "searches", url: `/seller/searches?as=${SELLER}` },
  { file: "calendar", url: `/seller/calendar?as=${SELLER}` },
  { file: "messages", url: `/seller/messages?as=${SELLER}` },
  { file: "message-thread", url: `/seller/messages/t-tomas?as=${SELLER}` },
  { file: "analytics", url: `/seller/analytics?as=${SELLER}` },
  { file: "settings", url: `/seller/settings?as=${SELLER}` },
  { file: "coach", url: `/seller/coach?as=${SELLER}`, coach: true },
  // Internal
  { file: "design-system", url: "/design-system" },
];

// Unlocks the fixed-height inner-scroll shells into document flow so fullPage
// captures everything. Deliberately narrow: only vertical overflow + the dvh
// height cap, never overflow-hidden (rounded cards) or overflow-x (strips).
const UNLOCK_SCROLL = `
  html, body { height: auto !important; min-height: 0 !important; overflow: visible !important; }
  [class*="h-dvh"], [class*="h-screen"] { height: auto !important; }
  [class*="min-h-0"] { min-height: 0 !important; }
  [class*="overflow-y-auto"] { overflow-y: visible !important; }
`;

const results = { ok: [], fail: [] };

function log(...a) {
  console.log("[capture]", ...a);
}

async function waitForServer(timeoutMs = 90000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(BASE, { method: "GET" });
      if (res.ok || res.status === 200) return true;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error("server did not become ready in time");
}

async function settle(page, route) {
  await page.waitForLoadState("networkidle", { timeout: route?.map ? 6000 : 8000 }).catch(() => {});
  await page.waitForTimeout(route?.map ? 1800 : 600);
}

async function shoot(page, dir, file) {
  await page.addStyleTag({ content: UNLOCK_SCROLL });
  await page.waitForTimeout(250); // reflow after unlocking scroll
  await page.screenshot({ path: join(dir, `${file}.png`), fullPage: true });
}

// The leaf-draw loading state — held fetch keeps the cache cold and the draw on.
async function captureCoachLoading(context, dir, name) {
  const page = await context.newPage();
  try {
    await page.emulateMedia({ reducedMotion: "no-preference", colorScheme: "light" });
    await page.route("**/api/coach/reading", () => {
      /* hold the request open at the browser — never reaches the server */
    });
    await page.goto(`${BASE}/seller/coach?as=${SELLER}`, { waitUntil: "load", timeout: 30000 });
    await page.getByText("Reading your plot").first().waitFor({ timeout: 10000 });
    await page.waitForTimeout(800); // let the strokes get mid-draw
    await shoot(page, dir, "coach-loading");
    results.ok.push(`${name}/coach-loading`);
    log(`✓ ${name}/coach-loading`);
  } catch (e) {
    results.fail.push({ shot: `${name}/coach-loading`, error: e.message });
    log(`✗ ${name}/coach-loading — ${e.message}`);
  } finally {
    await page.unroute("**/api/coach/reading").catch(() => {});
    await page.close();
  }
}

async function captureRoute(context, dir, name, route) {
  const page = await context.newPage();
  try {
    await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "light" });
    await page.goto(BASE + route.url, { waitUntil: "load", timeout: 45000 });
    await settle(page, route);
    if (route.coach) {
      // Rendered letter — wait for the client-fetched reading to land (the
      // seven-day strip heading appears with the body, live or fallback).
      await page.getByText("Your next seven days").first().waitFor({ timeout: 40000 });
      await page.waitForTimeout(400);
    }
    await shoot(page, dir, route.file);
    results.ok.push(`${name}/${route.file}`);
    log(`✓ ${name}/${route.file}`);
  } catch (e) {
    // Best-effort: try to still save whatever rendered.
    try {
      await shoot(page, dir, route.file);
      results.ok.push(`${name}/${route.file} (partial)`);
      log(`~ ${name}/${route.file} captured after error: ${e.message}`);
    } catch {
      results.fail.push({ shot: `${name}/${route.file}`, error: e.message });
      log(`✗ ${name}/${route.file} — ${e.message}`);
    }
  } finally {
    await page.close();
  }
}

async function main() {
  for (const vp of VIEWPORTS) mkdirSync(join(OUT, vp.name), { recursive: true });

  log("starting production server (npm run start)…");
  const server = spawn("npm", ["run", "start"], { cwd: ROOT, env: process.env, detached: true });
  server.stdout.on("data", (d) => process.stdout.write(`[next] ${d}`));
  server.stderr.on("data", (d) => process.stderr.write(`[next] ${d}`));

  const cleanup = () => {
    try {
      process.kill(-server.pid, "SIGTERM");
    } catch {
      /* already gone */
    }
  };
  process.on("exit", cleanup);
  process.on("SIGINT", () => {
    cleanup();
    process.exit(1);
  });

  let browser;
  try {
    await waitForServer();
    log("server ready");
    browser = await chromium.launch();

    const contexts = {};
    for (const vp of VIEWPORTS) {
      contexts[vp.name] = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: vp.deviceScaleFactor,
        isMobile: vp.isMobile,
        hasTouch: vp.hasTouch,
      });
    }

    // Phase A — coach loading state, both viewports, while the cache is cold.
    for (const vp of VIEWPORTS) await captureCoachLoading(contexts[vp.name], join(OUT, vp.name), vp.name);

    // Phase B — every standard surface (the first coach shot warms the cache).
    for (const vp of VIEWPORTS) {
      const dir = join(OUT, vp.name);
      for (const route of ROUTES) await captureRoute(contexts[vp.name], dir, vp.name, route);
    }

    for (const vp of VIEWPORTS) await contexts[vp.name].close();
  } finally {
    if (browser) await browser.close().catch(() => {});
    cleanup();
  }

  writeFileSync(
    join(OUT, "manifest.json"),
    JSON.stringify(
      {
        capturedAt: new Date().toISOString(),
        viewports: VIEWPORTS.map(({ name, width, height, deviceScaleFactor }) => ({ name, width, height, deviceScaleFactor })),
        routes: ROUTES.map((r) => ({ file: r.file, url: r.url })),
        loadingState: { file: "coach-loading", url: `/seller/coach?as=${SELLER}` },
        ok: results.ok,
        failed: results.fail,
      },
      null,
      2,
    ),
  );

  log(`done — ${results.ok.length} captured, ${results.fail.length} failed`);
  if (results.fail.length) log("failures:", JSON.stringify(results.fail, null, 2));
}

main().catch((e) => {
  console.error("[capture] fatal:", e);
  process.exit(1);
});
