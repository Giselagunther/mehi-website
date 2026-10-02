/**
 * Idiomas del sitio. El español vive en la raíz (las URLs de siempre no cambian);
 * el inglés, bajo /en con slugs propios. Cada página se empareja con su traducción
 * por `id`, y así se arman el selector de idioma, las hreflang y el sitemap.
 */
import * as es from "./content.ts";
import * as en from "./content-en.ts";
import type { PublicPage } from "./content.ts";

import type { Locale } from "./ui-text.ts";

export { ui, type Locale, type UiText } from "./ui-text.ts";
export const locales: readonly Locale[] = ["es", "en"];
export const defaultLocale: Locale = "es";

const content = { es, en } as const;

/**
 * Video del agente de voz de cada idioma (en public/video/). Los dos traen los
 * subtítulos dibujados en la imagen: la pista .vtt queda disponible pero apagada.
 */
export const homeVideo: Record<
  Locale,
  { src: string; poster: string; captions: string; durationIso: string; uploadDate: string }
> = {
  es: {
    src: "/video/mehi-agente-de-voz.mp4",
    poster: "/video/mehi-agente-de-voz.jpg",
    captions: "/video/mehi-agente-de-voz.es.vtt",
    durationIso: "PT1M46S",
    uploadDate: "2026-10-02",
  },
  en: {
    src: "/video/mehi-agente-de-voz.en.mp4",
    poster: "/video/mehi-agente-de-voz.en.jpg",
    captions: "/video/mehi-agente-de-voz.en.vtt",
    durationIso: "PT1M40S",
    uploadDate: "2026-10-02",
  },
};

export function contentFor(locale: Locale) {
  return content[locale];
}

export const languageTag: Record<Locale, string> = { es: "es-AR", en: "en" };
export const htmlLang: Record<Locale, string> = { es: "es", en: "en" };
export const openGraphLocale: Record<Locale, string> = { es: "es_AR", en: "en_US" };

export function homePath(locale: Locale): string {
  return locale === "en" ? "/en" : "/";
}

export function pagePath(locale: Locale, slug: string): string {
  return locale === "en" ? `/en/${slug}` : `/${slug}`;
}

export function findPage(locale: Locale, slug: string): PublicPage | undefined {
  return contentFor(locale).publicPages.find((page) => page.slug === slug);
}

/** Ruta de la misma página en otro idioma (la portada si la página no existe allí). */
export function translatedPath(page: PublicPage | undefined, target: Locale): string {
  if (!page) return homePath(target);
  const counterpart = contentFor(target).publicPages.find((item) => item.id === page.id);
  return counterpart ? pagePath(target, counterpart.slug) : homePath(target);
}

/** URL absoluta de cada idioma para una página (o la portada), para hreflang y sitemap. */
export function languageAlternates(page?: PublicPage): Record<string, string> {
  const alternates: Record<string, string> = {};
  for (const locale of locales) {
    alternates[languageTag[locale]] = `${es.site.url}${translatedPath(page, locale)}`;
  }
  alternates["x-default"] = alternates[languageTag[defaultLocale]];
  return alternates;
}

/** Cada página pública canónica, en todos los idiomas, con sus traducciones. */
export function publicEntries(): { url: string; languages: Record<string, string> }[] {
  return locales.flatMap((locale) => {
    const { site, publicPages } = contentFor(locale);
    return [
      { url: `${site.url}${homePath(locale)}`, languages: languageAlternates() },
      ...publicPages.map((page) => ({
        url: `${site.url}${pagePath(locale, page.slug)}`,
        languages: languageAlternates(page),
      })),
    ];
  });
}

/** Todas las páginas públicas canónicas, en todos los idiomas. */
export function allPublicUrls(): string[] {
  return publicEntries().map(({ url }) => url);
}
