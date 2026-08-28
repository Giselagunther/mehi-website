import { MarketingHome } from "./components/MarketingHome";
import { pageMetadata } from "./seo";

export const metadata = pageMetadata();

export default function HomePage() {
  return <MarketingHome />;
}
