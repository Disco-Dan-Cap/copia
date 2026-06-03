// Day-14 PWA surface capture. Drives a production build of Copia with Playwright
// and saves the NEW Day-14 surfaces alongside the standard case-study set:
//   • splash-overlay      — the in-app splash, settled frame (14C)
//   • install-invite-ios  — the install invitation, iOS Share-sheet branch (14D)
//   • install-invite-android — the invitation, Chromium "Add Copia" branch (14D)
//   • install-affordance  — the seller Settings colophon's resting line (14D)
//
// These surfaces are gated in production (standalone-only splash; earned-intent
// invitation), so they're unreachable by a normal screenshotter. Two screenshot-
// only, namespaced query params force the settled states:
//   /?__pwaPreview=splash   → holds the settled splash overlay
//   /?__pwaPreview=invite   → force-opens the invitation sheet
// The platform branch follows the real signals: an iPhone userAgent makes the
// invitation take the iOS path; a synthetic `beforeinstallprompt` makes it take
// the Chromium path. Nothing here changes runtime behaviour for real users.

import { chromium, devices } from "playwright";
import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
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

const IPHONE_UA = devices["iPhone 13"].userAgent;
// Dispatches a fake beforeinstallprompt so the invitation shows its "Add Copia"
// affordance (the real event only fires on Chromium with engagement heuristics).
const FIRE_BIP = `
  window.addEventListener("load", () => setTimeout(() => {
    const e = new Event("beforeinstallprompt");
    e.prompt = async () => {};
    e.userChoice = Promise.resolve({ outcome: "dismissed", platform: "web" });
    window.dispatchEvent(e);
  }, 150));
`;

const log = (...a) => console.log("[pwa-capture]", ...a);

async function waitForServer(timeoutMs = 90000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(BASE);
      if (res.ok) return true;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error("server did not become ready in time");
}

async function shootSplash(browser, vp, dir) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.deviceScaleFactor,
    isMobile: vp.isMobile,
    hasTouch: vp.hasTouch,
  });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/?__pwaPreview=splash`, { waitUntil: "load" });
  await page.waitForSelector('svg[viewBox="0 0 1125 2436"]', { timeout: 5000 });
  await page.waitForTimeout(1100); // let the bloom settle to the final composition
  await page.screenshot({ path: join(dir, "splash-overlay.png") });
  await ctx.close();
  log(`✓ ${vp.name}/splash-overlay`);
}

async function shootInvite(browser, vp, dir, { ios }) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.deviceScaleFactor,
    isMobile: vp.isMobile,
    hasTouch: vp.hasTouch,
    userAgent: ios ? IPHONE_UA : undefined,
  });
  if (!ios) await ctx.addInitScript(FIRE_BIP);
  const page = await ctx.newPage();
  await page.goto(`${BASE}/?__pwaPreview=invite`, { waitUntil: "load" });
  await page.waitForSelector("#copia-install-heading", { timeout: 5000 });
  await page.waitForTimeout(500); // settle the slide-in
  const file = ios ? "install-invite-ios" : "install-invite-android";
  await page.screenshot({ path: join(dir, `${file}.png`) });
  await ctx.close();
  log(`✓ ${vp.name}/${file}`);
}

async function shootAffordance(browser, vp, dir) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.deviceScaleFactor,
    isMobile: vp.isMobile,
    hasTouch: vp.hasTouch,
  });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/seller/settings?as=${SELLER}`, { waitUntil: "load" });
  const colophon = page.locator("footer").last();
  await colophon.scrollIntoViewIfNeeded();
  await page.getByText("Add Copia to your home screen").waitFor({ timeout: 5000 });
  await page.waitForTimeout(300);
  await colophon.screenshot({ path: join(dir, "install-affordance.png") });
  await ctx.close();
  log(`✓ ${vp.name}/install-affordance`);
}

async function main() {
  for (const vp of VIEWPORTS) mkdirSync(join(OUT, vp.name), { recursive: true });

  log("starting production server (npm run start)…");
  const server = spawn("npm", ["run", "start"], { cwd: ROOT, env: process.env, detached: true });
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
    for (const vp of VIEWPORTS) {
      const dir = join(OUT, vp.name);
      await shootSplash(browser, vp, dir);
      await shootInvite(browser, vp, dir, { ios: true });
      await shootInvite(browser, vp, dir, { ios: false });
      await shootAffordance(browser, vp, dir);
    }
  } finally {
    if (browser) await browser.close().catch(() => {});
    cleanup();
  }
  log("done");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
