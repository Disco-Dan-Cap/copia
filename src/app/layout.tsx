import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Fraunces } from "next/font/google";
import "./globals.css";

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
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
