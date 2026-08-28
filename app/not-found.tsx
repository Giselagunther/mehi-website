import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-20">
      <h1 className="text-3xl font-semibold">No encontramos esa página</h1>
      <p className="mt-5 leading-7 text-mehi-text-secondary">
        Podés conocer las soluciones de MEHI o contactarnos desde el inicio.
      </p>
      <a
        href="/"
        className="mt-8 inline-block rounded-md bg-mehi-plum px-5 py-3 font-semibold text-white"
      >
        Volver a MEHI
      </a>
    </main>
  );
}
