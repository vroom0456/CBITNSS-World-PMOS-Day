import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "World PMOS Day 2026 | CBIT NSS",
  description:
    "An educational PMOS awareness campaign by CBIT NSS empowering young women with evidence-informed health information on Polyendocrine Metabolic Ovarian Syndrome (PMOS).",
  icons: {
    icon: "/nss-logo.png",
    shortcut: "/nss-logo.png",
    apple: "/nss-logo.png",
  },
  keywords: [
    "World PMOS Day",
    "PMOS",
    "PCOS",
    "PCOD",
    "Knowledge Beyond Symptoms",
    "CBIT NSS",
    "Women Health",
    "Hormonal Health Awareness",
    "Hyderabad Student Health",
  ],
  openGraph: {
    title: "World PMOS Day 2026 | CBIT NSS",
    description:
      "Educational PMOS awareness campaign empowering young women with evidence-informed health information. Organised by CBIT NSS.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#F5EFEB",
  width: "device-width",
  initialScale: 1,
};

import IntroSplash from "@/components/layout/IntroSplash";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <head>
        <meta name="theme-color" content="#F5EFEB" />
      </head>
      <body>
        <IntroSplash />
        {children}
      </body>
    </html>
  );
}
