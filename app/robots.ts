import type { MetadataRoute } from "next";
import { site } from "./content.ts";

export default function robots(): MetadataRoute.Robots {
  if (process.env.VERCEL_ENV === "preview") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  // Incluye buscadores y agentes de IA. No modifica la política previa de
  // entrenamiento (robots.txt antes no existía). No bloquear CSS ni JavaScript.
  // robots.txt no es una barrera de seguridad: la app conserva su autenticación.
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/auth/", "/dashboard/"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
