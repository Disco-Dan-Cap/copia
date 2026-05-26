import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project. Without it, Next infers the root
  // from the nearest lockfile and can wrongly pick a stray one in a parent
  // directory (e.g. ~/package-lock.json), which skews output file tracing.
  turbopack: {
    root: __dirname,
  },

  // Service worker will be added via next-pwa or hand-rolled once we're
  // further along. For now, the manifest.json and Apple meta tags handle
  // the PWA install path.
};

export default nextConfig;
