import { RootDocument, rootMetadata } from "../root-document";
import "../globals.css";

export { viewport } from "../root-document";
export const metadata = rootMetadata("es");

export default function SpanishLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <RootDocument locale="es">{children}</RootDocument>;
}
