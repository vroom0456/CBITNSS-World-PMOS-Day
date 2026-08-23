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
  title: "World PMOS Day 2026 | CBIT NSS Health Awareness Campaign",
  description:
    "A student-led health awareness campaign by CBIT NSS on Polycystic Ovary Syndrome (PCOS/PMOS). Explore evidence-based information on symptoms, self-awareness tools, and anonymous questions for our live medical panel.",
  keywords: [
    "PCOD",
    "PCOS",
    "PMOS",
    "World PCOS Day",
    "CBIT NSS",
    "Women Health",
    "Gynaecology",
    "Hyderabad Health Awareness",
    "hormonal health",
    "student health awareness",
  ],
  openGraph: {
    title: "World PMOS Day 2026 | CBIT NSS",
    description:
      "Student-led awareness campaign on women's hormonal and metabolic health. Understand PCOS/PMOS, explore common symptoms, and ask questions anonymously.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#F5EFEB",
  width: "device-width",
  initialScale: 1,
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
