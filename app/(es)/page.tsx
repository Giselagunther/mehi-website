import { MarketingHome } from "../components/MarketingHome";
import { homeVideoGraph, pageMetadata, serializeJsonLd } from "../seo";

export const metadata = pageMetadata(undefined, "es");

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(homeVideoGraph("es")),
        }}
      />
      <MarketingHome locale="es" />
    </>
  );
}
