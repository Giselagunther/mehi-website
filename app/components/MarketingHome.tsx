import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  BrainCircuit,
  Check,
  CheckCircle2,
  ChevronRight,
  Menu,
  MessageSquareText,
  Route,
  ScanSearch,
  ShieldCheck,
  UserRoundCheck,
  Workflow,
} from "lucide-react";

import { ContactForm } from "./ContactForm";
import { DemoCall } from "./DemoCall";
import { LanguageSwitch } from "./LanguageSwitch";
import { BuyerQuestions, SolutionLinks } from "./PublicContent";
import {
  contentFor,
  findPage,
  homePath,
  homeVideo,
  translatedPath,
  ui,
  type Locale,
} from "../i18n";

const stepIcons = [ScanSearch, Route, BrainCircuit];
const capabilityIcons = [MessageSquareText, BookOpenCheck, Workflow, BarChart3];
const trustIcons = [BookOpenCheck, Route, UserRoundCheck];

function CompactJourney({ locale }: { locale: Locale }) {
  const text = ui[locale].journey;
  return (
    <div
      className="w-full rounded-md border border-mehi-border bg-white p-5 sm:p-7"
      aria-label={text.aria}
    >
      <div className="flex items-center justify-between gap-4 border-b border-mehi-border pb-5">
        <p className="text-sm font-semibold text-mehi-text">
          {text.title}
        </p>
        <span className="inline-flex items-center gap-2 text-xs font-medium text-mehi-text-secondary">
          <span
            className="h-2 w-2 rounded-full bg-mehi-slate"
            aria-hidden="true"
          />
          {text.status}
        </span>
      </div>

      <ol className="mt-5 grid gap-3 sm:grid-cols-3">
        {text.steps.map(([number, title, description], index) => (
          <li
            key={number}
            className={`min-h-40 rounded-md border p-4 sm:p-5 ${
              index === 1
                ? "border-mehi-slate bg-mehi-neutral"
                : "border-mehi-border bg-white"
            }`}
          >
            <span className="text-xs font-semibold tracking-[0.14em] text-mehi-slate">
              {number}
            </span>
            <p className="mt-8 text-lg font-semibold text-mehi-text">{title}</p>
            <p className="mt-2 text-sm leading-6 text-mehi-text-secondary">
              {description}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function MarketingHome({ locale }: { locale: Locale }) {
  const isDemoEnabled = process.env.NEXT_PUBLIC_DEMO_CALL_ENABLED === "1";
  const t = ui[locale];
  const { company, site } = contentFor(locale);
  const governmentPath = translatedPath(findPage("es", "ia-para-gobiernos"), locale);
  const navItems = [
    [t.nav.solutions, "#soluciones"],
    [t.nav.government, governmentPath],
    ...(isDemoEnabled ? [[t.nav.tryIt, "#probalo"]] : []),
    [t.nav.howItWorks, "#como-funciona"],
    [t.nav.security, "#seguridad"],
    [t.nav.contact, "#contacto"],
  ];
  const demoEnabled = isDemoEnabled;
  const demoPhone = process.env.NEXT_PUBLIC_DEMO_PHONE?.trim() || undefined;

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

      <header className="sticky top-0 z-40 border-b border-mehi-border/90 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:h-24 sm:px-8 lg:px-10">
          <a
            href="#inicio"
            aria-label={t.homeAria}
            className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mehi-slate focus-visible:ring-offset-4"
          >
            <Image
              src="/logo-mehi.svg"
              alt="MEHI"
              width={280}
              height={120}
              className="h-16 w-auto sm:h-20"
              priority
            />
          </a>

          <nav
            aria-label={t.mainNav}
            className="hidden items-center gap-4 lg:flex xl:gap-5"
          >
            {navItems.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="whitespace-nowrap rounded-sm text-sm font-medium text-mehi-text-secondary transition-colors hover:text-mehi-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mehi-slate focus-visible:ring-offset-4"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex xl:gap-3">
            <LanguageSwitch locale={locale} href={homePath(locale === "es" ? "en" : "es")} />
            <a
              href="https://app.mehi.ar/auth/login"
              data-testid="login-cta"
              className="whitespace-nowrap rounded-md px-4 py-2.5 text-sm font-semibold text-mehi-text transition-colors hover:bg-mehi-neutral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mehi-slate focus-visible:ring-offset-2"
            >
              {t.signIn}
            </a>
            <a
              href="#contacto"
              className="whitespace-nowrap rounded-md border border-mehi-slate px-4 py-2.5 text-sm font-semibold text-mehi-text transition-colors hover:bg-mehi-neutral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mehi-slate focus-visible:ring-offset-2"
            >
              {t.requestDemo}
            </a>
          </div>

          <details className="group relative lg:hidden">
            <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-md border border-mehi-border text-mehi-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mehi-slate [&::-webkit-details-marker]:hidden">
              <span className="sr-only">{t.openNav}</span>
              <Menu className="h-5 w-5" aria-hidden="true" />
            </summary>
            <nav
              aria-label={t.mobileNav}
              className="absolute right-0 top-14 w-72 rounded-md border border-mehi-border bg-white p-3"
            >
              {navItems.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  className="block rounded-md px-3 py-3 text-sm font-medium text-mehi-text hover:bg-mehi-neutral"
                >
                  {label}
                </a>
              ))}
              <div className="mt-2 border-t border-mehi-border pt-2">
                <a
                  href="https://app.mehi.ar/auth/login"
                  data-testid="login-cta-mobile"
                  className="block rounded-md px-3 py-3 text-sm font-semibold text-mehi-text"
                >
                  {t.signInLong}
                </a>
                <a
                  href="#contacto"
                  className="mt-1 block rounded-md bg-mehi-plum px-3 py-3 text-center text-sm font-semibold text-white hover:bg-mehi-plum-hover"
                >
                  {t.requestDemo}
                </a>
                <a
                  href={homePath(locale === "es" ? "en" : "es")}
                  hrefLang={locale === "es" ? "en" : "es"}
                  lang={locale === "es" ? "en" : "es"}
                  className="mt-1 block rounded-md px-3 py-3 text-center text-sm font-semibold text-mehi-text hover:bg-mehi-neutral"
                >
                  {t.switchLanguage.label}
                </a>
              </div>
            </nav>
          </details>
        </div>
      </header>

      <main id="contenido">
        <section id="inicio" className="scroll-mt-24 bg-mehi-neutral">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-14 sm:px-8 sm:pb-20 sm:pt-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 lg:px-10 lg:pb-24 lg:pt-24">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mehi-slate">
                {t.hero.eyebrow}
              </p>
              <h1 className="mt-6 max-w-3xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-mehi-text sm:text-6xl lg:text-7xl">
                {t.hero.titleTop}
                <span className="mt-2 block text-mehi-slate">
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
            </div>

            <CompactJourney locale={locale} />
          </div>
        </section>

        {demoEnabled && (
          <section
            id="probalo"
            className="scroll-mt-24 border-b border-mehi-border bg-white py-20 sm:py-24 lg:py-28"
          >
            <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:px-10">
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
          aria-label={t.outcomesAria}
          className="bg-mehi-neutral pb-8 sm:pb-12"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="grid overflow-hidden rounded-md border border-mehi-border bg-mehi-border sm:grid-cols-3 sm:gap-px">
              {t.outcomes.map((outcome) => (
                <article
                  key={outcome.title}
                  className="border-b border-mehi-border bg-white p-6 last:border-b-0 sm:border-b-0 sm:p-7"
                >
                  <h2 className="text-lg font-semibold text-mehi-text">
                    {outcome.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-mehi-text-secondary">
                    {outcome.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="soluciones"
          className="scroll-mt-24 bg-white py-16 sm:py-20"
          aria-labelledby="soluciones-titulo"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mehi-slate">
              {t.solutions.eyebrow}
            </p>
            <h2
              id="soluciones-titulo"
              className="mt-4 max-w-3xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              {t.solutions.title}
            </h2>
            <p className="mb-10 mt-5 max-w-3xl text-lg leading-8 text-mehi-text-secondary">
              {site.introduction}
            </p>
            <SolutionLinks locale={locale} />
          </div>
        </section>

        <section
          id="como-funciona"
          className="scroll-mt-24 bg-white py-20 sm:py-24 lg:py-28"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mehi-slate">
              {t.how.eyebrow}
            </p>
            <h2 className="mt-5 max-w-3xl text-balance text-4xl font-semibold tracking-[-0.04em] text-mehi-text sm:text-5xl">
              {t.how.title}
            </h2>

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

            <ol className="mt-16 grid gap-7 md:grid-cols-3">
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

            <details className="group mt-16 rounded-md border border-mehi-border bg-white">
              <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-5 px-5 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-mehi-slate sm:px-7 [&::-webkit-details-marker]:hidden">
                <span>
                  <span className="block text-lg font-semibold text-mehi-text">
                    {t.how.detailsTitle}
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-mehi-text-secondary">
                    {t.how.detailsSubtitle}
                  </span>
                </span>
                <span className="inline-flex shrink-0 items-center gap-2 rounded-md border border-mehi-border px-4 py-2.5 text-sm font-semibold text-mehi-text transition-colors group-open:border-mehi-slate group-open:text-mehi-slate">
                  <span className="group-open:hidden">{t.how.showDetails}</span>
                  <span className="hidden group-open:inline">{t.how.hideDetails}</span>
                  <ChevronRight
                    className="h-4 w-4 transition-transform group-open:rotate-90"
                    aria-hidden="true"
                  />
                </span>
              </summary>

              <div className="grid gap-3 border-t border-mehi-border p-5 sm:grid-cols-2 sm:p-7 lg:grid-cols-4">
                {t.how.capabilities.map(({ title, description }, index) => {
                  const Icon = capabilityIcons[index];
                  return (
                  <article
                    key={title}
                    className="rounded-md border border-mehi-border p-5"
                  >
                    <Icon
                      className="h-5 w-5 text-mehi-slate"
                      aria-hidden="true"
                    />
                    <h3 className="mt-5 font-semibold text-mehi-text">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-mehi-text-secondary">
                      {description}
                    </p>
                  </article>
                  );
                })}
              </div>
            </details>
          </div>
        </section>

        <section
          id="seguridad"
          className="scroll-mt-24 border-y border-mehi-border bg-mehi-neutral py-20 sm:py-24"
        >
          <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-10">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-white text-mehi-slate">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-mehi-slate">
                {t.trust.eyebrow}
              </p>
              <h2 className="mt-5 max-w-2xl text-balance text-4xl font-semibold tracking-[-0.04em] text-mehi-text sm:text-5xl">
                {t.trust.title}
              </h2>
            </div>

            <div className="space-y-3">
              {t.trust.items.map((label, index) => {
                const Icon = trustIcons[index];
                return (
                <div
                  key={label}
                  className="flex min-h-16 items-center gap-4 rounded-md border border-mehi-border bg-white px-5 py-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-mehi-slate text-mehi-slate">
                    <Check className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="font-semibold text-mehi-text">{label}</span>
                  <Icon
                    className="ml-auto h-5 w-5 text-mehi-slate"
                    aria-hidden="true"
                  />
                </div>
                );
              })}
            </div>
          </div>
        </section>

        <BuyerQuestions locale={locale} />

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

      <footer className="border-t border-mehi-border bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 px-5 py-9 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <div className="flex items-center gap-5">
            <Image
              src="/logo-mehi.svg"
              alt="MEHI"
              width={280}
              height={120}
              className="h-12 w-auto"
            />
            <div className="h-8 w-px bg-mehi-border" aria-hidden="true" />
            <p className="text-sm text-mehi-text-secondary">
              {company.relationship}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <a
              href={company.url}
              className="font-medium text-mehi-text hover:text-mehi-plum"
            >
              {t.footer.know} {company.name}
            </a>
            <a
              href="/llms.txt"
              className="font-medium text-mehi-text hover:text-mehi-plum"
            >
              {t.footer.textSummary}
            </a>
            <a
              href="#contacto"
              data-testid="footer-contact-link"
              className="font-medium text-mehi-text hover:text-mehi-plum"
            >
              {t.footer.contact}
            </a>
            <a
              href="https://app.mehi.ar/auth/login"
              className="font-medium text-mehi-text hover:text-mehi-plum"
            >
              {t.signIn}
            </a>
            <a
              href={homePath(locale === "es" ? "en" : "es")}
              hrefLang={locale === "es" ? "en" : "es"}
              lang={locale === "es" ? "en" : "es"}
              className="font-medium text-mehi-text hover:text-mehi-plum"
            >
              {t.switchLanguage.label}
            </a>
            <span className="text-mehi-text-secondary">MEHI</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
