import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Database,
  FileAudio,
  ListChecks,
  Mic,
  MonitorSmartphone,
  PhoneCall,
  Route,
  Sparkles,
  UserRoundCheck,
  UsersRound,
} from "lucide-react";

import { ContactForm } from "./ContactForm";
import { DemoCall } from "./DemoCall";
import { AnswerSource } from "./mocks/AnswerSource";
import { HeroVisual } from "./mocks/HeroVisual";
import { OperationDashboard } from "./mocks/OperationDashboard";
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
// información) → para quién → cómo funciona → respuestas con respaldo → panel de
// la operación → cómo se contrata → preguntas → recursos → conversemos (hablar
// con la asesora virtual o escribir).
// Los tableros son ilustrativos: datos inventados, rotulados como tales.

const stepIcons = [Database, PhoneCall, BarChart3];
const benefitIcons = [Clock3, UsersRound, ListChecks, Route];
const controlIcons = [BarChart3, FileAudio, UserRoundCheck];
const talkMetaIcons = [Clock3, MonitorSmartphone, CheckCircle2];

const eyebrowClass = "text-xs font-semibold uppercase tracking-[0.2em] text-mehi-slate";
const titleClass =
  "mt-5 max-w-3xl text-balance text-4xl font-semibold tracking-[-0.04em] text-mehi-text sm:text-5xl";

export function MarketingHome({ locale }: { locale: Locale }) {
  const demoEnabled = process.env.NEXT_PUBLIC_DEMO_CALL_ENABLED === "1";
  const demoPhone = process.env.NEXT_PUBLIC_DEMO_PHONE?.trim() || undefined;
  const t = ui[locale];
  const { site, publicPages } = contentFor(locale);
  const other: Locale = locale === "es" ? "en" : "es";
  const solution = publicPages.find((page) => page.kind === "solution");
  const solutionPath = translatedPath(findPage("es", "plataforma"), locale);

  // Fondos alternados (blanco / gris claro) según las secciones que se muestran.
  const order = [
    "soluciones",
    "como-funciona",
    "respaldo",
    "control",
    "empezar",
    "preguntas-frecuentes",
    "recursos",
    "contacto",
  ];
  const bg = (id: string) => (order.indexOf(id) % 2 === 0 ? "bg-white" : "bg-mehi-neutral");
  const sectionBg = {
    solutions: bg("soluciones"),
    how: bg("como-funciona"),
    answers: bg("respaldo"),
    control: bg("control"),
    start: bg("empezar"),
    faq: bg("preguntas-frecuentes"),
    resources: bg("recursos"),
    contact: bg("contacto"),
  };

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
          <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-12 pt-14 sm:px-8 sm:pb-16 sm:pt-20 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-14 lg:px-10 lg:pb-16 lg:pt-20">
            <div>
              <p className={`text-balance ${eyebrowClass}`}>{t.hero.eyebrow}</p>
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
                  {demoEnabled && <Mic className="h-4 w-4" aria-hidden="true" />}
                  {demoEnabled ? t.hero.talkNow : t.requestADemo}
                  {!demoEnabled && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
                </a>
                <a
                  href={demoEnabled ? "#contacto" : "#como-funciona"}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-mehi-border bg-white px-5 py-3 text-sm font-semibold text-mehi-text transition-colors hover:border-mehi-slate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mehi-slate focus-visible:ring-offset-4"
                >
                  {demoEnabled ? t.requestADemo : t.hero.seeHow}
                  <ChevronRight className="h-4 w-4 text-mehi-slate" aria-hidden="true" />
                </a>
              </div>
              <p className="mt-6 max-w-xl text-sm leading-6 text-mehi-text-secondary">
                {site.heroNote}
              </p>
            </div>

            <HeroVisual locale={locale} />
          </div>

          <div className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 sm:pb-20 lg:px-10">
            <ul
              aria-label={t.benefits.aria}
              className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-mehi-border bg-mehi-border lg:grid-cols-4"
            >
              {t.benefits.items.map(({ title, description }, index) => {
                const Icon = benefitIcons[index];
                return (
                  <li key={title} className="bg-white p-5 sm:p-6">
                    <Icon className="h-5 w-5 text-mehi-slate" aria-hidden="true" />
                    <p className="mt-3 font-semibold leading-snug text-mehi-text sm:mt-4">
                      {title}
                    </p>
                    {/* En el celular alcanza el título: la explicación, desde pantallas medianas. */}
                    <p className="mt-2 hidden text-sm leading-6 text-mehi-text-secondary sm:block">
                      {description}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section
          id="soluciones"
          className={`scroll-mt-24 py-20 sm:py-24 ${sectionBg.solutions}`}
          aria-labelledby="soluciones-titulo"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10" data-reveal>
            <p className={eyebrowClass}>{t.audiences.eyebrow}</p>
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
          className={`scroll-mt-24 py-20 sm:py-24 lg:py-28 ${sectionBg.how}`}
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <p className={eyebrowClass}>{t.how.eyebrow}</p>
            <h2 className={titleClass}>{t.how.title}</h2>

            {/* El correo a los interesados de la línea de demo enlaza a #como-funciona
                y espera el video debajo del título (ver tests/discovery.test.ts). */}
            <div className="mt-12 grid gap-12 lg:grid-cols-[1.45fr_1fr] lg:items-start">
              <figure data-testid="video-agente-de-voz">
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
                <figcaption className="mt-4 flex flex-col gap-1 text-sm text-mehi-text-secondary sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <span>{t.how.videoCaption}</span>
                  <span className="shrink-0 font-medium text-mehi-slate">{t.how.videoMeta}</span>
                </figcaption>
              </figure>

              <ol className="space-y-8" data-reveal>
                {t.how.steps.map(({ number, title, description }, index) => {
                  const Icon = stepIcons[index];
                  return (
                    <li key={number} className="flex gap-5">
                      <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-mehi-slate bg-white text-mehi-slate">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-xs font-semibold tracking-[0.14em] text-mehi-slate">
                          {t.how.stepLabel} {number}
                        </p>
                        <h3 className="mt-2 text-xl font-semibold text-mehi-text">{title}</h3>
                        <p className="mt-2 text-base leading-7 text-mehi-text-secondary">
                          {description}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </section>

        <section id="respaldo" className={`scroll-mt-24 py-20 sm:py-24 ${sectionBg.answers}`}>
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="max-w-3xl" data-reveal>
              <p className={eyebrowClass}>{t.answers.eyebrow}</p>
              <h2 className={titleClass}>{t.answers.title}</h2>
              <p className="mt-5 text-lg leading-8 text-mehi-text-secondary">{t.answers.body}</p>
            </div>
            <div className="mt-12">
              <AnswerSource locale={locale} />
            </div>
          </div>
        </section>

        <section id="control" className={`scroll-mt-24 py-20 sm:py-24 ${sectionBg.control}`}>
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="max-w-3xl" data-reveal>
              <p className={eyebrowClass}>{t.control.eyebrow}</p>
              <h2 className={titleClass}>{t.control.title}</h2>
              <p className="mt-5 text-lg leading-8 text-mehi-text-secondary">{t.control.body}</p>
            </div>

            <div className="mt-12">
              <OperationDashboard locale={locale} />
            </div>

            <ul className="mt-10 grid gap-6 md:grid-cols-3" data-reveal>
              {t.control.items.map(({ title, description }, index) => {
                const Icon = controlIcons[index];
                return (
                  <li key={title} className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-mehi-slate text-mehi-slate">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-semibold text-mehi-text">{title}</p>
                      <p className="mt-1 text-sm leading-6 text-mehi-text-secondary">
                        {description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <p className="mt-8 max-w-3xl text-sm leading-6 text-mehi-text-secondary">
              {t.control.note}
            </p>
          </div>
        </section>

        {solution?.process && (
          <section id="empezar" className={`scroll-mt-24 py-20 sm:py-24 ${sectionBg.start}`}>
            <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10" data-reveal>
              <p className={eyebrowClass}>{t.start.eyebrow}</p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                {solution.process.heading}
              </h2>
              <ol className="mt-10 grid gap-5 md:grid-cols-3">
                {solution.process.items.map((step, index) => (
                  <li
                    key={step.title}
                    className="rounded-md border border-mehi-border bg-white p-6"
                  >
                    <span className="text-xs font-semibold tracking-[0.14em] text-mehi-slate">
                      0{index + 1}
                    </span>
                    <h3 className="mt-5 text-lg font-semibold text-mehi-text">{step.title}</h3>
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

        <BuyerQuestions
          locale={locale}
          demoEnabled={demoEnabled}
          className={sectionBg.faq}
        />

        <section
          id="recursos"
          className={`scroll-mt-24 py-16 sm:py-20 ${sectionBg.resources}`}
          aria-labelledby="recursos-titulo"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10" data-reveal>
            <p className={eyebrowClass}>{t.resources.eyebrow}</p>
            <h2
              id="recursos-titulo"
              className="mb-8 mt-4 text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              {t.resources.title}
            </h2>
            <SolutionLinks locale={locale} kind="resource" />
          </div>
        </section>

        {/* Dos caminos para seguir: hablar ahora con la asesora virtual (el que se
            fomenta) o escribir. El botón «Hablá con nuestra asesora virtual» de la
            portada trae hasta acá (#probalo). */}
        <section id="contacto" className={`scroll-mt-24 py-20 sm:py-24 lg:py-28 ${sectionBg.contact}`}>
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="max-w-3xl">
              <p className={eyebrowClass}>{t.contact.eyebrow}</p>
              <h2 className={titleClass}>{t.contact.title}</h2>
              <p className="mt-5 text-lg leading-8 text-mehi-text-secondary">
                {demoEnabled ? t.contact.bodyDemo : t.contact.body}
              </p>
            </div>

            {demoEnabled ? (
              <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_auto_1fr] lg:items-stretch">
                <div
                  id="probalo"
                  className="flex scroll-mt-28 flex-col rounded-md border border-mehi-lavender bg-white p-6 sm:p-8"
                >
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-sm bg-mehi-plum-light px-2.5 py-1 text-xs font-semibold text-mehi-plum">
                    <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                    {t.contact.talkBadge}
                  </span>
                  <h3 className="mt-5 text-2xl font-semibold tracking-tight text-mehi-text">
                    {t.contact.talkTitle}
                  </h3>
                  <p className="mt-3 leading-7 text-mehi-text-secondary">{t.contact.talkBody}</p>
                  <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-mehi-text-secondary">
                    {t.contact.talkMeta.map((item, index) => {
                      const Icon = talkMetaIcons[index];
                      return (
                        <li key={item} className="inline-flex items-center gap-1.5">
                          <Icon className="h-4 w-4 text-mehi-slate" aria-hidden="true" />
                          {item}
                        </li>
                      );
                    })}
                  </ul>
                  <div className="mt-6 flex-1 border-t border-mehi-border pt-6">
                    <DemoCall bare phone={demoPhone} locale={locale} />
                  </div>
                </div>

                <div className="flex items-center gap-4 lg:flex-col" aria-hidden="true">
                  <span className="h-px flex-1 bg-mehi-border lg:h-auto lg:w-px" />
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-mehi-border bg-white text-sm font-semibold text-mehi-text-secondary">
                    {t.contact.or}
                  </span>
                  <span className="h-px flex-1 bg-mehi-border lg:h-auto lg:w-px" />
                </div>

                <ContactForm
                  locale={locale}
                  heading={t.contact.formTitle}
                  intro={t.contact.formIntro}
                  secondary
                />
              </div>
            ) : (
              <div className="mt-12 max-w-3xl">
                <ContactForm locale={locale} />
              </div>
            )}
          </div>
        </section>
      </main>

      <SiteFooter locale={locale} alternatePath={homePath(other)} />
      <Reveal />
    </div>
  );
}
