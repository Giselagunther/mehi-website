import type { Metadata } from "next";
import { site, type PublicPage } from "./content.ts";

export function pageMetadata(page?: PublicPage): Metadata {
  const title = page?.title ?? site.title;
  const description = page?.description ?? site.description;
  const url = page ? `${site.url}/${page.slug}` : `${site.url}/`;
  return {
    title: page ? title : { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "es_AR",
      siteName: site.name,
      title,
      description,
      url,
    },
    twitter: { card: "summary", title, description },
  };
}

export function organizationGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        url: `${site.url}/`,
        logo: `${site.url}/logo-mehi.svg`,
        description: site.introduction,
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        name: site.name,
        url: `${site.url}/`,
        inLanguage: "es-AR",
        publisher: { "@id": `${site.url}/#organization` },
      },
      {
        // Servicio B2B: no declarar un resultado enriquecido de software que
        // exige precios o reseñas que MEHI no publica.
        "@type": "Service",
        "@id": `${site.url}/#software`,
        name: site.name,
        serviceType: "Plataforma de agentes de voz IA y atención humana para empresas",
        url: `${site.url}/plataforma`,
        description: site.introduction,
        provider: { "@id": `${site.url}/#organization` },
      },
    ],
  };
}

export function publicPageGraph(page: PublicPage) {
  const url = `${site.url}/${page.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: page.title,
        description: page.description,
        inLanguage: "es-AR",
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
            item: `${site.url}/`,
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
