import type { Metadata } from "next";
import { NotFoundContent } from "./components/NotFoundContent";
import { RootDocument } from "./root-document";
import { ui } from "./i18n";
import "./globals.css";

// Direcciones que no corresponden a ninguna ruta: página de error en español,
// como siempre, con la salida en inglés (ver NotFoundContent).
export const metadata: Metadata = {
  // Sin layout raíz con plantilla de título: se arma completo, como antes.
  title: `${ui.es.notFound.title} | MEHI`,
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <RootDocument locale="es">
      <NotFoundContent />
    </RootDocument>
  );
}
