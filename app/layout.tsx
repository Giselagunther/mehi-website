import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { site } from "./content";
import { organizationGraph, serializeJsonLd } from "./seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: "%s | MEHI",
  },
  description: site.description,
  applicationName: "MEHI",
  keywords: [
    "atención ciudadana",
    "inteligencia artificial conversacional",
    "gestión del conocimiento",
    "contact center",
    "atención de gran escala",
    "gobierno digital",
  ],
  authors: [{ name: "MEHI" }],
  creator: "MEHI",
  publisher: "MEHI",
  icons: {
    icon: "/favicon.svg",
  },
  robots: {
    index: process.env.VERCEL_ENV !== "preview",
    follow: process.env.VERCEL_ENV !== "preview",
    googleBot: {
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F5F6FA",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={inter.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(organizationGraph()),
          }}
        />
        {children}
      </body>
    </html>
  );
}
