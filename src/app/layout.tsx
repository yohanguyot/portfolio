import type { Metadata } from "next";
import { Geist, Inter, Poppins, Josefin_Sans, Archivo } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import NoDrag from "@/components/NoDrag/NoDrag";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ViewTransitions } from "next-view-transitions";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["500"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yohanguyot.com"),
  title: "Yohan Guyot · Product Builder",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${jetbrainsMono.variable} ${inter.variable} ${poppins.variable} ${josefinSans.variable} ${archivo.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/fonts/cabinet-grotesk-700-v1.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/cabinet-grotesk-800-v1.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>
        <ViewTransitions>
          {children}
        </ViewTransitions>
        <NoDrag />
        <Analytics />
        <SpeedInsights />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WBDEXJZQKV"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-WBDEXJZQKV');
        `}</Script>
      </body>
    </html>
  );
}
