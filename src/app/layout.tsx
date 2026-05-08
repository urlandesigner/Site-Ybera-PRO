import type { Metadata, Viewport } from "next";
import { Geist, Nunito_Sans, Syne } from "next/font/google";

import "@/lib/fontawesome-config";
import { SmoothAnchorScroll } from "@/components/layout/SmoothAnchorScroll";
import { ProductCrystalGlassDefs } from "@/components/sections/saved/exclusive-products-section/ProductCrystalGlassDefs";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  /** Hero H1 (Figma): ExtraLight nos trechos em Nunito; inclui 200/300. */
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Ybera PRO",
  description: "Base inicial do site Ybera PRO",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${geist.variable} ${nunitoSans.variable} ${syne.variable}`}>
      <body>
        <ProductCrystalGlassDefs />
        <SmoothAnchorScroll />
        {children}
      </body>
    </html>
  );
}
