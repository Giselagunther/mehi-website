import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Inter } from "next/font/google";
import { contentFor, htmlLang, type Locale } from "./i18n";
import { organizationGraph, serializeJsonLd } from "./seo";

// Documento raíz compartido por los dos idiomas. Cada idioma tiene su propio
// layout raíz (app/(es)/layout.tsx y app/(en)/layout.tsx) para que el <html>
// declare el idioma real de la página.

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const keywords: Record<Locale, string[]> = {
  es: [
    "atención ciudadana",
    "inteligencia artificial conversacional",
    "gestión del conocimiento",
    "contact center",
    "atención de gran escala",
    "gobierno digital",
  ],
  en: [
    "citizen services",
    "conversational artificial intelligence",
    "AI voice agents",
    "knowledge management",
    "contact center",
    "digital government",
  ],
};

export function rootMetadata(locale: Locale): Metadata {
  const { company, site } = contentFor(locale);
  return {
    metadataBase: new URL(site.url),
    title: {
      default: site.title,
      template: "%s | MEHI",
    },
    description: site.description,
    applicationName: "MEHI",
    keywords: keywords[locale],
    authors: [{ name: company.name, url: company.url }],
    creator: company.name,
    publisher: company.name,
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
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F5F6FA",
};

export function RootDocument({
  locale,
  children,
}: Readonly<{ locale: Locale; children: React.ReactNode }>) {
  return (
    <html lang={htmlLang[locale]} className={inter.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(organizationGraph(locale)),
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
