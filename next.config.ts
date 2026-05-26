import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Service worker will be added via next-pwa or hand-rolled once we're
  // further along. For now, the manifest.json and Apple meta tags handle
  // the PWA install path.
};

export default nextConfig;
