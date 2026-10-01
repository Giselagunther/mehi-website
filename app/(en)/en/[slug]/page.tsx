import { notFound } from "next/navigation";
import { contentFor, findPage } from "../../../i18n";
import { pageMetadata } from "../../../seo";
import { PublicContent } from "../../../components/PublicContent";

export const dynamicParams = false;

export function generateStaticParams() {
  return contentFor("en").publicPages.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const page = findPage("en", params.slug);
  if (!page) notFound();
  return pageMetadata(page, "en");
}

export default function EnglishContentPage({ params }: { params: { slug: string } }) {
  const page = findPage("en", params.slug);
  if (!page) notFound();
  return <PublicContent page={page} locale="en" />;
}
