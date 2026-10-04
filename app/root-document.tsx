import type { Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Inter } from "next/font/google";
import { htmlLang, type Locale } from "./i18n";
import { organizationGraph, serializeJsonLd } from "./seo";

export { rootMetadata } from "./root-metadata";

// Documento raíz compartido por los dos idiomas. Cada idioma tiene su propio
// layout raíz (app/(es)/layout.tsx y app/(en)/layout.tsx) para que el <html>
// declare el idioma real de la página.

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

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
