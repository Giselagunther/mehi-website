import { RootDocument, rootMetadata } from "../root-document";
import "../globals.css";

export { viewport } from "../root-document";
export const metadata = rootMetadata("en");

export default function EnglishLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
