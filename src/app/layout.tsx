import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { SwRegister } from "@/components/pwa/sw-register";
import { SplashOverlay } from "@/components/pwa/splash-overlay";
import { InstallInvitation } from "@/components/pwa/install-invitation";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-loaded",
  subsets: ["latin"],
  display: "swap",
});

// Fraunces italic — sanctioned editorial-emphasis face only (see brand directive override).
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400"],
  display: "swap",
});

// iOS apple-touch-startup-image set. iOS does not auto-generate launch images,
// and there is no stable Next metadata API for them, so we emit <link> tags
// keyed to each device's logical size + dpr. Files: scripts/generate-splash.mjs.
// [logical width, logical height, device-pixel-ratio, physical file dimensions]
const startupImages: [number, number, number, string][] = [
  [390, 844, 3, "1170x2532"], // iPhone 12/13/14/15/16
  [428, 926, 3, "1284x2778"], // 12/13/14 Pro Max, Plus
  [393, 852, 3, "1179x2556"], // 14/15/16 Pro
  [430, 932, 3, "1290x2796"], // 14/15/16 Pro Max
  [414, 896, 3, "1242x2688"], // XS Max, 11 Pro Max
  [375, 812, 3, "1125x2436"], // X, XS, 11 Pro
  [414, 896, 2, "828x1792"],  // XR, 11
  [375, 667, 2, "750x1334"],  // 8, SE (2nd/3rd gen)
  [360, 780, 3, "1080x2340"], // 1080p tier
];

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#1C664D",
};

export const metadata: Metadata = {
  title: {
    default: "Copia",
    template: "%s — Copia",
  },
  description:
    "The peer-to-peer marketplace for local fresh produce. Austin, TX.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Copia",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${fraunces.variable} h-full antialiased`}>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/itz7grm.css" />
        {startupImages.map(([w, h, dpr, file]) => (
          <link
            key={file}
            rel="apple-touch-startup-image"
            media={`(device-width: ${w}px) and (device-height: ${h}px) and (-webkit-device-pixel-ratio: ${dpr}) and (orientation: portrait)`}
            href={`/splash/splash-${file}.png`}
          />
        ))}
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <SwRegister />
        <SplashOverlay />
        <InstallInvitation />
      </body>
    </html>
  );
}
