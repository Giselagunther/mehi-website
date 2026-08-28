import type { MetadataRoute } from "next";
import { publicUrls } from "./content.ts";

export default function sitemap(): MetadataRoute.Sitemap {
  // No inventar lastModified en cada build: un despliegue no implica nuevo contenido.
  return publicUrls().map((url) => ({ url }));
}
