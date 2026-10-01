import type { MetadataRoute } from "next";
import { publicEntries } from "./i18n.ts";

export default function sitemap(): MetadataRoute.Sitemap {
  // No inventar lastModified en cada build: un despliegue no implica nuevo contenido.
  return publicEntries().map(({ url, languages }) => ({
    url,
    alternates: { languages },
  }));
}
