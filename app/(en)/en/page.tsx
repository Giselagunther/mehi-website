import { MarketingHome } from "../../components/MarketingHome";
import { homeVideoGraph, pageMetadata, serializeJsonLd } from "../../seo";

export const metadata = pageMetadata(undefined, "en");

export default function EnglishHomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(homeVideoGraph("en")),
        }}
      />
      <MarketingHome locale="en" />
    </>
  );
}
