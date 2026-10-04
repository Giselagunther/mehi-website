import {
  ArrowRight,
  BookOpen,
  Building2,
  ChevronDown,
  Headset,
  Landmark,
  Layers,
  type LucideIcon,
} from "lucide-react";
import type { CardBlock, IllustrativeExample, PublicPage } from "../content";
import {
  contentFor,
  homePath,
  pagePath,
  translatedPath,
  ui,
  type Locale,
} from "../i18n";
import { publicPageGraph, serializeJsonLd } from "../seo";
import { Reveal } from "./Reveal";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

/** Ícono de cada página en las tarjetas (por id: es igual en los dos idiomas). */
const pageIcons: Record<string, LucideIcon> = {
  plataforma: Layers,
  "ia-para-gobiernos": Landmark,
  "ia-para-contact-centers": Headset,
  "agentes-de-voz-ia": Building2,
};

export function SolutionLinks({
  locale,
  kind,
  except,
}: {
  locale: Locale;
  kind?: PublicPage["kind"];
  except?: string;
}) {
  const pages = contentFor(locale).publicPages.filter(
    (page) => page.slug !== except && (!kind || page.kind === kind),
  );
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {pages.map((page) => {
        const Icon = pageIcons[page.id] ?? BookOpen;
        return (
        <a
          key={page.slug}
          href={pagePath(locale, page.slug)}
          className="group flex flex-col rounded-md border border-mehi-border bg-white p-6 transition-colors hover:border-mehi-slate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mehi-plum"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-mehi-neutral text-mehi-slate">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <h3 className="mt-5 text-lg font-semibold text-mehi-text">{page.label}</h3>
          <p className="mt-3 flex-1 text-sm leading-7 text-mehi-text-secondary">
            {page.summary ?? page.description}
          </p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-mehi-text group-hover:text-mehi-plum">
            {page.cta ?? ui[locale].solutions.learnMore}
            <ArrowRight
              className="h-4 w-4 text-mehi-slate transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </span>
        </a>
        );
      })}
    </div>
  );
}

export function BuyerQuestions({
  locale,
  demoEnabled = false,
}: {
  locale: Locale;
  demoEnabled?: boolean;
}) {
  const { site } = contentFor(locale);
  const t = ui[locale].faq;
  return (
    <section
      id="preguntas-frecuentes"
      className="scroll-mt-24 border-t border-mehi-border bg-white py-16 sm:py-20"
      aria-labelledby="preguntas-titulo"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10" data-reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mehi-slate">
          {t.eyebrow}
        </p>
        <h2
          id="preguntas-titulo"
          className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {t.title}
        </h2>
        {/* Acordeón: la respuesta está en el HTML (buscadores y lectura en texto la ven
            igual); sólo se pliega para que la lista se recorra de un vistazo. */}
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_20rem] lg:items-start">
        <div className="divide-y divide-mehi-border border-y border-mehi-border">
          {site.faqs.map((faq, index) => (
            <details key={faq.question} open={index === 0} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-lg font-semibold text-mehi-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-mehi-slate [&::-webkit-details-marker]:hidden">
                <h3>{faq.question}</h3>
                <ChevronDown
                  className="h-5 w-5 flex-none text-mehi-slate transition-transform group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="max-w-3xl pb-6 leading-7 text-mehi-text-secondary">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
        <aside className="rounded-md border border-mehi-border bg-mehi-neutral p-6">
          <p className="text-lg font-semibold text-mehi-text">{t.asideTitle}</p>
          <p className="mt-2 text-sm leading-6 text-mehi-text-secondary">
            {demoEnabled ? t.asideBodyDemo : t.asideBody}
          </p>
          <a
            href={demoEnabled ? "#probalo" : "#contacto"}
            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-md border border-mehi-slate bg-white px-4 py-2.5 text-sm font-semibold text-mehi-text transition-colors hover:border-mehi-plum hover:text-mehi-plum"
          >
            {demoEnabled ? ui[locale].hero.talkNow : t.asideCta}
            <ArrowRight className="h-4 w-4 text-mehi-slate" aria-hidden="true" />
          </a>
        </aside>
        </div>
      </div>
    </section>
  );
}

function UseCaseGrid({ block }: { block: CardBlock }) {
  return (
    <section data-reveal>
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {block.heading}
      </h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {block.items.map((item) => (
          <article
            key={item.title}
            className="rounded-md border border-mehi-border bg-white p-5"
          >
            <h3 className="font-semibold text-mehi-text">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-mehi-text-secondary">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProcessSteps({ block, stepLabel }: { block: CardBlock; stepLabel: string }) {
  return (
    <section data-reveal>
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {block.heading}
      </h2>
      <ol className="mt-6 space-y-4">
        {block.items.map((item, index) => (
          <li
            key={item.title}
            className="flex gap-5 rounded-md border border-mehi-border bg-mehi-neutral p-5"
          >
            <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-mehi-slate text-sm font-semibold text-mehi-slate">
              <span className="sr-only">{stepLabel} </span>
              {index + 1}
            </span>
            <div>
              <h3 className="font-semibold text-mehi-text">{item.title}</h3>
              <p className="mt-1 text-sm leading-6 text-mehi-text-secondary">
                {item.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function IllustrativeWalkthrough({
  example,
  eyebrow,
}: {
  example: IllustrativeExample;
  eyebrow: string;
}) {
  return (
    <section
      id="ejemplo-ilustrativo"
      aria-labelledby="ejemplo-titulo"
      className="scroll-mt-24 rounded-md border border-mehi-border bg-mehi-neutral p-6 sm:p-8"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mehi-slate">
        {eyebrow}
      </p>
      <h2
        id="ejemplo-titulo"
        className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl"
      >
        {example.heading}
      </h2>
      <p
        data-testid="example-disclosure"
        className="mt-5 font-medium leading-7 text-mehi-text"
      >
        {example.disclosure}
      </p>
      <p className="mt-4 leading-7 text-mehi-text-secondary">
        {example.context}
      </p>
      <ol className="mt-8 space-y-4">
        {example.steps.map((step, index) => (
          <li key={step.heading}>
            <details
              open={index === 0}
              className="rounded-md border border-mehi-border bg-white"
            >
              <summary className="cursor-pointer rounded-md p-5 font-semibold leading-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mehi-plum">
                <span className="mr-2 text-mehi-slate">{index + 1}.</span>
                {step.heading}
              </summary>
              <div className="space-y-5 border-t border-mehi-border p-5">
                {step.lines.map((line, lineIndex) => (
                  <p
                    key={lineIndex}
                    className="leading-7 text-mehi-text-secondary"
                  >
                    <strong className="block text-sm font-semibold text-mehi-text">
                      {line.speaker}
                    </strong>
                    {line.text}
                  </p>
                ))}
                <p className="border-t border-mehi-border pt-5 text-sm leading-7 text-mehi-text-secondary">
                  {step.explanation}
                </p>
              </div>
            </details>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function PublicContent({
  page,
  locale,
}: {
  page: PublicPage;
  locale: Locale;
}) {
  const t = ui[locale];
  const home = homePath(locale);
  const contactHref = `${home}#contacto`;
  const isGovernment = page.audience === "government";
  const other: Locale = locale === "es" ? "en" : "es";
  const alternatePath = translatedPath(page, other);
  const currentPath = pagePath(locale, page.slug);
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(publicPageGraph(page, locale)),
        }}
      />
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:p-3"
      >
        {t.skipToContent}
      </a>
      <SiteHeader
        locale={locale}
        alternatePath={alternatePath}
        currentPath={currentPath}
      />
      <main id="contenido">
        <article>
          <div className="border-b border-mehi-border bg-mehi-neutral">
            <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20">
              <nav
                aria-label={t.page.breadcrumbAria}
                className="text-sm text-mehi-text-secondary"
              >
                <a href={home} className="underline underline-offset-4">
                  MEHI
                </a>
                <span aria-hidden="true"> / </span>
                <span aria-current="page">{page.label}</span>
              </nav>
              {page.eyebrow && (
                <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-mehi-slate">
                  {page.eyebrow}
                </p>
              )}
              <h1
                className={`${page.eyebrow ? "mt-4" : "mt-7"} text-balance text-4xl font-semibold leading-tight tracking-tight text-mehi-text sm:text-5xl`}
              >
                {page.title}
              </h1>
              <p className="mt-6 text-pretty text-lg leading-8 text-mehi-text-secondary">
                {page.introduction}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={contactHref}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-mehi-plum px-5 py-3 text-sm font-semibold text-white hover:bg-mehi-plum-hover"
                >
                  {isGovernment ? t.page.ctaButtonGovernment : t.requestADemo}
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </a>
                {page.example && (
                  <a
                    href="#ejemplo-ilustrativo"
                    className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-mehi-plum underline underline-offset-4"
                  >
                    {t.page.seeExample}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="mx-auto max-w-4xl space-y-14 px-5 py-14 sm:px-8 sm:py-16">
            {page.useCases && <UseCaseGrid block={page.useCases} />}
            {page.process && (
              <ProcessSteps block={page.process} stepLabel={t.page.stepLabel} />
            )}
            {page.sections.map((section) => (
              <section key={section.heading} data-reveal>
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
            {page.example && (
              <IllustrativeWalkthrough
                example={page.example}
                eyebrow={t.page.exampleEyebrow}
              />
            )}
            <div className="rounded-md border border-mehi-border bg-mehi-neutral p-6 sm:p-8">
              <h2 className="text-2xl font-semibold">
                {isGovernment ? t.page.ctaTitleGovernment : t.page.ctaTitle}
              </h2>
              <p className="mt-4 leading-7 text-mehi-text-secondary">
                {t.page.ctaBody}
              </p>
              <a
                href={contactHref}
                className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-md bg-mehi-plum px-5 py-3 text-sm font-semibold text-white hover:bg-mehi-plum-hover"
              >
                {isGovernment ? t.page.ctaButtonGovernment : t.requestADemo}{" "}
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
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
              {t.page.related}
            </h2>
            <SolutionLinks
              locale={locale}
              kind={page.kind === "resource" ? "resource" : "audience"}
              except={page.slug}
            />
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} alternatePath={alternatePath} />
      <Reveal />
    </div>
  );
}
