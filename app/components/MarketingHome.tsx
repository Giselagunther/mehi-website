import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  ChevronRight,
  PhoneCall,
  Route,
  ScanSearch,
  ShieldCheck,
  UserRoundCheck,
  Workflow,
} from "lucide-react";

import { CallExample } from "./CallExample";
import { ContactForm } from "./ContactForm";
import { DemoCall } from "./DemoCall";
import { BuyerQuestions, SolutionLinks } from "./PublicContent";
import { Reveal } from "./Reveal";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import {
  contentFor,
  findPage,
  homePath,
  homeVideo,
  translatedPath,
  ui,
  type Locale,
} from "../i18n";

// Recorrido de la portada, de lo general a lo particular: qué es (darle voz a la
// información) → para quién → cómo funciona → probalo → control → cómo se
// contrata → preguntas → recursos → contacto.

const stepIcons = [Workflow, PhoneCall, ScanSearch];
const controlIcons = [BookOpenCheck, Route, UserRoundCheck];

export function MarketingHome({ locale }: { locale: Locale }) {
  const demoEnabled = process.env.NEXT_PUBLIC_DEMO_CALL_ENABLED === "1";
  const demoPhone = process.env.NEXT_PUBLIC_DEMO_PHONE?.trim() || undefined;
  const t = ui[locale];
  const { site, publicPages } = contentFor(locale);
  const other: Locale = locale === "es" ? "en" : "es";
  const solution = publicPages.find((page) => page.kind === "solution");
  const solutionPath = translatedPath(findPage("es", "plataforma"), locale);

  return (
    <div
      data-testid="page-landing"
      className="min-h-screen overflow-x-hidden bg-white text-mehi-text"
    >
      <a
        href="#contenido"
        className="sr-only z-50 rounded-md bg-mehi-text px-4 py-3 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {t.skipToContent}
      </a>

      <SiteHeader locale={locale} alternatePath={homePath(other)} />

      <main id="contenido">
        <section id="inicio" className="scroll-mt-24 bg-mehi-neutral">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-14 sm:px-8 sm:pb-20 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:px-10 lg:pb-24 lg:pt-24">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mehi-slate">
                {t.hero.eyebrow}
              </p>
              <h1 className="mt-6 max-w-3xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-mehi-text sm:text-6xl lg:text-7xl">
                {t.hero.titleTop}
                <span className="mt-3 block text-3xl leading-tight tracking-[-0.04em] text-mehi-slate sm:text-4xl lg:text-5xl">
                  {t.hero.titleBottom}
                </span>
              </h1>
              <p className="mt-7 max-w-xl text-pretty text-lg leading-8 text-mehi-text-secondary sm:text-xl sm:leading-9">
                {site.hero}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={demoEnabled ? "#probalo" : "#contacto"}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-mehi-plum px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-mehi-plum-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mehi-plum focus-visible:ring-offset-4"
                >
                  {demoEnabled ? t.hero.talkNow : t.requestADemo}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={demoEnabled ? "#contacto" : "#como-funciona"}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-mehi-border bg-white px-5 py-3 text-sm font-semibold text-mehi-text transition-colors hover:border-mehi-slate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mehi-slate focus-visible:ring-offset-4"
                >
                  {demoEnabled ? t.requestADemo : t.hero.seeHow}
                  <ChevronRight
                    className="h-4 w-4 text-mehi-slate"
                    aria-hidden="true"
                  />
                </a>
              </div>
              <p className="mt-6 max-w-xl text-sm leading-6 text-mehi-text-secondary">
                {site.heroNote}
              </p>
            </div>

            <CallExample locale={locale} />
          </div>
        </section>

        <section
          id="soluciones"
          className="scroll-mt-24 bg-white py-20 sm:py-24"
          aria-labelledby="soluciones-titulo"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10" data-reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mehi-slate">
              {t.audiences.eyebrow}
            </p>
            <h2
              id="soluciones-titulo"
              className="mt-4 max-w-3xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              {t.audiences.title}
            </h2>
            <div className="mt-10">
              <SolutionLinks locale={locale} kind="audience" />
            </div>
          </div>
        </section>

        <section
          id="como-funciona"
          className="scroll-mt-24 border-t border-mehi-border bg-white py-20 sm:py-24 lg:py-28"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mehi-slate">
              {t.how.eyebrow}
            </p>
            <h2 className="mt-5 max-w-3xl text-balance text-4xl font-semibold tracking-[-0.04em] text-mehi-text sm:text-5xl">
              {t.how.title}
            </h2>

            {/* El correo a los interesados de la línea de demo enlaza a #como-funciona
                y espera el video debajo del título (ver tests/discovery.test.ts). */}
            <figure className="mt-12 max-w-5xl" data-testid="video-agente-de-voz">
              <div className="overflow-hidden rounded-md border border-mehi-border bg-mehi-text">
                <video
                  className="aspect-video h-auto w-full"
                  controls
                  playsInline
                  preload="metadata"
                  poster={homeVideo[locale].poster}
                  aria-label={t.how.videoAria}
                >
                  <source src={homeVideo[locale].src} type="video/mp4" />
                  {/* Los subtítulos ya vienen en la imagen: la pista queda disponible, apagada. */}
                  <track
                    kind="captions"
                    src={homeVideo[locale].captions}
                    srcLang={locale}
                    label={locale === "en" ? "English" : "Español"}
                  />
                  {t.how.videoUnsupported}
                </video>
              </div>
              <figcaption className="mt-4 flex flex-col gap-1 text-sm text-mehi-text-secondary sm:flex-row sm:items-center sm:justify-between">
                <span>{t.how.videoCaption}</span>
                <span className="font-medium text-mehi-slate">
                  {t.how.videoMeta}
                </span>
              </figcaption>
            </figure>

            <ol className="mt-16 grid gap-7 md:grid-cols-3" data-reveal>
              {t.how.steps.map(({ number, title, description }, index) => {
                const Icon = stepIcons[index];
                return (
                  <li key={number} className="border-t-2 border-mehi-slate pt-5">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xs font-semibold tracking-[0.14em] text-mehi-slate">
                        {t.how.stepLabel} {number}
                      </span>
                      <Icon
                        className="h-5 w-5 text-mehi-slate"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="mt-6 text-xl font-semibold text-mehi-text">
                      {title}
                    </h3>
                    <p className="mt-3 text-base leading-7 text-mehi-text-secondary">
                      {description}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {demoEnabled && (
          <section
            id="probalo"
            className="scroll-mt-24 border-y border-mehi-border bg-mehi-neutral py-20 sm:py-24 lg:py-28"
          >
            <div
              className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:px-10"
              data-reveal
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mehi-slate">
                  {t.tryIt.eyebrow}
                </p>
                <h2 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.04em] text-mehi-text sm:text-5xl">
                  {t.tryIt.title}
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-8 text-mehi-text-secondary">
                  {t.tryIt.body}
                </p>
                <ul className="mt-6 space-y-3 text-base text-mehi-text-secondary">
                  {t.tryIt.points.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2
                        className="mt-1 h-4 w-4 flex-none text-mehi-slate"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <DemoCall phone={demoPhone} locale={locale} />
            </div>
          </section>
        )}

        <section
          id="control"
          className={`scroll-mt-24 py-20 sm:py-24 ${
            demoEnabled ? "bg-white" : "border-y border-mehi-border bg-mehi-neutral"
          }`}
        >
          <div
            className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-10"
            data-reveal
          >
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-md border border-mehi-border bg-white text-mehi-slate">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-mehi-slate">
                {t.control.eyebrow}
              </p>
              <h2 className="mt-5 max-w-2xl text-balance text-4xl font-semibold tracking-[-0.04em] text-mehi-text sm:text-5xl">
                {t.control.title}
              </h2>
              <p className="mt-6 max-w-xl text-sm leading-6 text-mehi-text-secondary">
                {t.control.note}
              </p>
            </div>

            <div className="space-y-3">
              {t.control.items.map(({ title, description }, index) => {
                const Icon = controlIcons[index];
                return (
                  <div
                    key={title}
                    className="flex items-start gap-4 rounded-md border border-mehi-border bg-white px-5 py-5"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-mehi-slate text-mehi-slate">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-semibold text-mehi-text">{title}</p>
                      <p className="mt-1 text-sm leading-6 text-mehi-text-secondary">
                        {description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {solution?.process && (
          <section
            id="empezar"
            className="scroll-mt-24 border-t border-mehi-border bg-white py-20 sm:py-24"
          >
            <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10" data-reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mehi-slate">
                {t.start.eyebrow}
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                {solution.process.heading}
              </h2>
              <ol className="mt-10 grid gap-5 md:grid-cols-3">
                {solution.process.items.map((step, index) => (
                  <li
                    key={step.title}
                    className="rounded-md border border-mehi-border bg-mehi-neutral p-6"
                  >
                    <span className="text-xs font-semibold tracking-[0.14em] text-mehi-slate">
                      0{index + 1}
                    </span>
                    <h3 className="mt-5 text-lg font-semibold text-mehi-text">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-mehi-text-secondary">
                      {step.description}
                    </p>
                  </li>
                ))}
              </ol>
              <a
                href={solutionPath}
                className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-mehi-text underline decoration-mehi-lavender underline-offset-4 hover:text-mehi-plum"
              >
                {t.start.cta}
                <ArrowRight className="h-4 w-4 text-mehi-slate" aria-hidden="true" />
              </a>
            </div>
          </section>
        )}

        <BuyerQuestions locale={locale} />

        <section
          id="recursos"
          className="scroll-mt-24 border-t border-mehi-border bg-mehi-neutral py-16 sm:py-20"
          aria-labelledby="recursos-titulo"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10" data-reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mehi-slate">
              {t.resources.eyebrow}
            </p>
            <h2
              id="recursos-titulo"
              className="mb-8 mt-4 text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              {t.resources.title}
            </h2>
            <SolutionLinks locale={locale} kind="resource" />
          </div>
        </section>

        <section
          id="contacto"
          className="scroll-mt-24 bg-white py-20 sm:py-24 lg:py-28"
        >
          <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mehi-slate">
                {t.contact.eyebrow}
              </p>
              <h2 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.04em] text-mehi-text sm:text-5xl">
                {t.contact.title}
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-mehi-text-secondary">
                {t.contact.body}
              </p>
            </div>

            <ContactForm locale={locale} />
          </div>
        </section>
      </main>

      <SiteFooter locale={locale} alternatePath={homePath(other)} />
      <Reveal />
    </div>
  );
}
