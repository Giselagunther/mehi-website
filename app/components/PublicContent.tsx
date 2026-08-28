import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { publicPages, site, type PublicPage } from "../content";
import { publicPageGraph, serializeJsonLd } from "../seo";

export function SolutionLinks({ except }: { except?: string }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {publicPages
        .filter((page) => page.slug !== except)
        .map((page) => (
          <a
            key={page.slug}
            href={`/${page.slug}`}
            className="group rounded-md border border-mehi-border bg-white p-6 transition-colors hover:border-mehi-slate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mehi-plum"
          >
            <h3 className="text-lg font-semibold text-mehi-text">
              {page.label}
            </h3>
            <p className="mt-3 text-sm leading-7 text-mehi-text-secondary">
              {page.description}
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-mehi-text">
              Conocer más{" "}
              <ArrowRight
                className="h-4 w-4 text-mehi-slate"
                aria-hidden="true"
              />
            </span>
          </a>
        ))}
    </div>
  );
}

export function BuyerQuestions() {
  return (
    <section
      id="preguntas-frecuentes"
      className="scroll-mt-24 border-t border-mehi-border bg-white py-16 sm:py-20"
      aria-labelledby="preguntas-titulo"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mehi-slate">
          Antes de una demo
        </p>
        <h2
          id="preguntas-titulo"
          className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          Preguntas de empresas que evalúan MEHI
        </h2>
        <div className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2">
          {site.faqs.map((faq) => (
            <article
              key={faq.question}
              className="border-t border-mehi-border pt-5"
            >
              <h3 className="text-lg font-semibold">{faq.question}</h3>
              <p className="mt-3 leading-7 text-mehi-text-secondary">
                {faq.answer}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PublicContent({ page }: { page: PublicPage }) {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(publicPageGraph(page)),
        }}
      />
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:p-3"
      >
        Ir al contenido
      </a>
      <header className="border-b border-mehi-border">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10">
          <a href="/" aria-label="MEHI, inicio">
            <Image
              src="/logo-mehi.svg"
              alt="MEHI"
              width={280}
              height={120}
              className="h-16 w-auto"
              priority
            />
          </a>
          <nav
            aria-label="Navegación principal"
            className="flex flex-wrap items-center gap-5 text-sm font-semibold"
          >
            <a href="/#soluciones" className="py-3 hover:text-mehi-plum">
              Soluciones
            </a>
            <a
              href="/como-elegir-ia-para-atencion-al-cliente"
              className="py-3 hover:text-mehi-plum"
            >
              Guía de evaluación
            </a>
            <a
              href="/#contacto"
              className="rounded-md bg-mehi-plum px-4 py-3 text-white hover:bg-mehi-plum-hover"
            >
              Solicitar demo
            </a>
          </nav>
        </div>
      </header>
      <main id="contenido">
        <article>
          <div className="border-b border-mehi-border bg-mehi-neutral">
            <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20">
              <nav
                aria-label="Ruta de navegación"
                className="text-sm text-mehi-text-secondary"
              >
                <a href="/" className="underline underline-offset-4">
                  MEHI
                </a>
                <span aria-hidden="true"> / </span>
                <span aria-current="page">{page.label}</span>
              </nav>
              <h1 className="mt-7 text-balance text-4xl font-semibold leading-tight tracking-tight text-mehi-text sm:text-5xl">
                {page.title}
              </h1>
              <p className="mt-6 text-pretty text-lg leading-8 text-mehi-text-secondary">
                {page.introduction}
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-4xl space-y-12 px-5 py-14 sm:px-8 sm:py-16">
            {page.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-5 text-base leading-8 text-mehi-text-secondary"
                  >
                    {paragraph}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="mt-5 list-disc space-y-3 pl-6 leading-7 text-mehi-text-secondary">
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            <div className="rounded-md border border-mehi-border bg-mehi-neutral p-6 sm:p-8">
              <h2 className="text-2xl font-semibold">
                Conversemos sobre tu operación
              </h2>
              <p className="mt-4 leading-7 text-mehi-text-secondary">
                Contanos qué atención querés mejorar. Revisamos el proceso, el
                conocimiento y las integraciones necesarias para definir un
                alcance concreto.
              </p>
              <a
                href="/#contacto"
                className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-md bg-mehi-plum px-5 py-3 text-sm font-semibold text-white hover:bg-mehi-plum-hover"
              >
                Solicitar una demo{" "}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </article>
        <section
          className="border-t border-mehi-border bg-mehi-neutral py-14"
          aria-labelledby="relacionados-titulo"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <h2
              id="relacionados-titulo"
              className="mb-8 text-2xl font-semibold"
            >
              Seguí explorando MEHI
            </h2>
            <SolutionLinks except={page.slug} />
          </div>
        </section>
      </main>
      <footer className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-5 py-8 text-sm text-mehi-text-secondary sm:px-8 lg:px-10">
        <p>MEHI · IA y atención humana para empresas.</p>
        <div className="flex flex-wrap gap-6">
          <a href="/" className="hover:text-mehi-plum">
            Inicio
          </a>
          <a href="/#contacto" className="hover:text-mehi-plum">
            Contacto
          </a>
          <a href="/llms.txt" className="hover:text-mehi-plum">
            Resumen en texto
          </a>
        </div>
      </footer>
    </div>
  );
}
