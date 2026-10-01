import { homePath, ui } from "../i18n";

// Una sola página de error para todo el sitio (estática, se ve sin JavaScript):
// en español, como siempre, con la salida en inglés para quien venía de /en.
export function NotFoundContent() {
  const es = ui.es.notFound;
  const en = ui.en.notFound;
  return (
    <main className="mx-auto max-w-3xl px-5 py-20">
      <h1 className="text-3xl font-semibold">{es.heading}</h1>
      <p className="mt-5 leading-7 text-mehi-text-secondary">{es.body}</p>
      <a
        href={homePath("es")}
        className="mt-8 inline-block rounded-md bg-mehi-plum px-5 py-3 font-semibold text-white"
      >
        {es.back}
      </a>
      <div lang="en" className="mt-12 border-t border-mehi-border pt-8">
        <p className="font-semibold text-mehi-text">{en.heading}</p>
        <p className="mt-2 leading-7 text-mehi-text-secondary">{en.body}</p>
        <a
          href={homePath("en")}
          hrefLang="en"
          className="mt-4 inline-block font-semibold text-mehi-text underline underline-offset-4"
        >
          {en.back}
        </a>
      </div>
    </main>
  );
}
