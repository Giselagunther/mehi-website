import { notFound } from "next/navigation";
import { publicPages, findPublicPage } from "../content";
import { pageMetadata } from "../seo";
import { PublicContent } from "../components/PublicContent";

export const dynamicParams = false;

export function generateStaticParams() {
  return publicPages.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const page = findPublicPage(params.slug);
  if (!page) notFound();
  return pageMetadata(page);
}

export default function ContentPage({ params }: { params: { slug: string } }) {
  const page = findPublicPage(params.slug);
  if (!page) notFound();
  return <PublicContent page={page} />;
}
