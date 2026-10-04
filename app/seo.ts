import type { Metadata } from "next";
import type { PublicPage } from "./content.ts";
import {
  contentFor,
  findPage,
  homePath,
  languageAlternates,
  languageTag,
  locales,
  openGraphLocale,
  homeVideo,
  pagePath,
  translatedPath,
  ui,
  type Locale,
} from "./i18n.ts";

/** Imagen que se ve al compartir el sitio (WhatsApp, LinkedIn…). La genera scripts/og/generate.py. */
export function shareImage(locale: Locale) {
  return {
    url: `/og/mehi-${locale}.png`,
    width: 1200,
    height: 630,
    alt: ui[locale].shareImageAlt,
  };
}

export function pageMetadata(page?: PublicPage, locale: Locale = "es"): Metadata {
  const { site } = contentFor(locale);
  const title = page?.title ?? site.title;
  const description = page?.description ?? site.description;
  const url = `${site.url}${page ? pagePath(locale, page.slug) : homePath(locale)}`;
  return {
    title: page ? title : { absolute: title },
    description,
    alternates: { canonical: url, languages: languageAlternates(page) },
    openGraph: {
      type: "website",
      locale: openGraphLocale[locale],
      alternateLocale: locales
        .filter((other) => other !== locale)
        .map((other) => openGraphLocale[other]),
      siteName: site.name,
      title,
      description,
      url,
      images: [shareImage(locale)],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [shareImage(locale)],
    },
  };
}

export function organizationGraph(locale: Locale = "es") {
  const { site } = contentFor(locale);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        // La marca se presenta sola: no se declara una empresa dueña (CEO, 3-oct-2026).
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        url: `${site.url}/`,
        logo: `${site.url}/logo-mehi.svg`,
        description: site.description,
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        name: site.name,
        url: `${site.url}/`,
        inLanguage: locales.map((item) => languageTag[item]),
        publisher: { "@id": `${site.url}/#organization` },
      },
      {
        // Servicio B2B: no declarar un resultado enriquecido de software que
        // exige precios o reseñas que MEHI no publica.
        "@type": "Service",
        "@id": `${site.url}/#software`,
        name: site.name,
        serviceType:
          locale === "en"
            ? "AI voice agent and human service platform for governments and businesses"
            : "Plataforma de agentes de voz IA y atención humana para gobiernos y empresas",
        url: `${site.url}${translatedPath(findPage("es", "plataforma"), locale)}`,
        description: site.introduction,
        provider: { "@id": `${site.url}/#organization` },
      },
    ],
  };
}

/** Video de presentación del agente de voz. Solo en la portada, que es donde se reproduce. */
export function homeVideoGraph(locale: Locale = "es") {
  const { site } = contentFor(locale);
  const english = locale === "en";
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "VideoObject",
        "@id": `${site.url}${english ? "/en" : "/"}#video-agente-de-voz`,
        name: english ? "MEHI's voice agent" : "El agente de voz de MEHI",
        description: english
          ? "What MEHI's voice agent does, how it handles a call and how it is built, in under two minutes."
          : "Qué hace el agente de voz de MEHI, cómo trabaja una llamada y cómo está armado, en menos de dos minutos.",
        thumbnailUrl: [`${site.url}${homeVideo[locale].poster}`],
        contentUrl: `${site.url}${homeVideo[locale].src}`,
        uploadDate: homeVideo[locale].uploadDate,
        duration: homeVideo[locale].durationIso,
        inLanguage: languageTag[locale],
        publisher: { "@id": `${site.url}/#organization` },
      },
    ],
  };
}

export function publicPageGraph(page: PublicPage, locale: Locale = "es") {
  const { site } = contentFor(locale);
  const url = `${site.url}${pagePath(locale, page.slug)}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: page.title,
        description: page.description,
        inLanguage: languageTag[locale],
        isPartOf: { "@id": `${site.url}/#website` },
        about: { "@id": `${site.url}/#software` },
        publisher: { "@id": `${site.url}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "MEHI",
            item: `${site.url}${homePath(locale)}`,
          },
          { "@type": "ListItem", position: 2, name: page.label, item: url },
        ],
      },
    ],
  };
}

// Evita que contenido editorial futuro pueda cerrar la etiqueta script.
export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
