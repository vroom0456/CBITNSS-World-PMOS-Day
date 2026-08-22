import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "World PCOD & PMOS Day 2026 | CBIT NSS Awareness Campaign",
  description: "Comprehensive, evidence-based guide on Polycystic Ovary Disease (PCOD) and PMOS by CBIT NSS. Features 100% anonymous Q&A with certified Gynaecologists, Rotterdam Phenotype self-assessment, and clinical dietary protocols.",
  keywords: ["PCOD", "PCOS", "PMOS", "World PCOD Day", "CBIT NSS", "Women Health", "Gynaecology", "Hyderbad Health Awareness"],
};

export const viewport: Viewport = {
  themeColor: "#F5EFEB",
};

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
      <body>{children}</body>
    </html>
  );
}
