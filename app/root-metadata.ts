import type { Metadata } from "next";
import { contentFor, type Locale } from "./i18n.ts";

// Metadatos comunes de cada idioma. Aparte del documento raíz para que los tests
// (node --test, sin JSX) puedan revisarlos: autor y editor son la marca MEHI.

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
  const { site } = contentFor(locale);
  return {
    metadataBase: new URL(site.url),
    title: {
      default: site.title,
      template: "%s | MEHI",
    },
    description: site.description,
    applicationName: "MEHI",
    keywords: keywords[locale],
    authors: [{ name: site.name, url: `${site.url}/` }],
    creator: site.name,
    publisher: site.name,
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

