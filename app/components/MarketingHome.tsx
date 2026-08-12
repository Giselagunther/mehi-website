import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  BrainCircuit,
  Check,
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

const outcomes = [
  {
    title: "Resuelve más",
    description: "Con respuestas confiables y consistentes.",
  },
  {
    title: "Deriva con contexto",
    description: "La persona no empieza de cero.",
  },
  {
    title: "Mejora con evidencia",
    description: "Cada interacción deja aprendizaje.",
  },
];

const steps = [
  {
    number: "01",
    title: "La persona se comunica",
    description: "MEHI comprende la necesidad y conserva el contexto.",
    icon: ScanSearch,
  },
  {
    number: "02",
    title: "Resuelve o acompaña",
    description: "La IA responde o deriva a un equipo humano cuando corresponde.",
    icon: Route,
  },
  {
    number: "03",
    title: "La operación aprende",
    description: "El resultado se convierte en evidencia para mejorar.",
    icon: BrainCircuit,
  },
];

const platformDetails = [
  {
    title: "Conversación",
    description: "Comprende intención, necesidad y contexto.",
    icon: MessageSquareText,
  },
  {
    title: "Conocimiento",
    description: "Responde desde información institucional gobernada.",
    icon: BookOpenCheck,
  },
  {
    title: "Continuidad",
    description: "MEHI y KORENUS sostienen la misma gestión entre IA y personas.",
    icon: Workflow,
  },
  {
    title: "Observatorio",
    description: "Hace visibles dudas, resultados y oportunidades de mejora.",
    icon: BarChart3,
  },
];

const trustItems = [
  { label: "Conocimiento validado", icon: BookOpenCheck },
  { label: "Trazabilidad de cada gestión", icon: Route },
  { label: "Supervisión humana cuando importa", icon: UserRoundCheck },
];

function CompactJourney() {
  return (
    <div
      className="w-full rounded-md border border-mehi-border bg-white p-5 sm:p-7"
      aria-label="Recorrido resumido de una gestión en MEHI"
    >
      <div className="flex items-center justify-between gap-4 border-b border-mehi-border pb-5">
        <p className="text-sm font-semibold text-mehi-text">Una gestión en MEHI</p>
        <span className="inline-flex items-center gap-2 text-xs font-medium text-mehi-text-secondary">
          <span className="h-2 w-2 rounded-full bg-mehi-slate" aria-hidden="true" />
          En curso
        </span>
      </div>

      <ol className="mt-5 grid gap-3 sm:grid-cols-3">
        {[
          ["01", "Comprende", "Detecta qué necesita la persona."],
          ["02", "Resuelve", "Usa conocimiento institucional validado."],
          ["03", "Aprende", "Deja evidencia para mejorar."],
        ].map(([number, title, description], index) => (
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

export function MarketingHome() {
  return (
    <div
      data-testid="page-landing"
      className="min-h-screen overflow-x-hidden bg-white text-mehi-text"
    >
      <a
        href="#contenido"
        className="sr-only z-50 rounded-md bg-mehi-text px-4 py-3 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Ir al contenido
      </a>

      <header className="sticky top-0 z-40 border-b border-mehi-border/90 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:h-24 sm:px-8 lg:px-10">
          <a
            href="#inicio"
            aria-label="MEHI, ir al inicio"
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

          <nav aria-label="Navegación principal" className="hidden items-center gap-8 lg:flex">
            {[
              ["Cómo funciona", "#como-funciona"],
              ["Seguridad", "#seguridad"],
              ["Contacto", "#contacto"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="rounded-sm text-sm font-medium text-mehi-text-secondary transition-colors hover:text-mehi-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mehi-slate focus-visible:ring-offset-4"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 sm:flex">
            <a
              href="https://app.mehi.ar/auth/login"
              data-testid="login-cta"
              className="rounded-md px-4 py-2.5 text-sm font-semibold text-mehi-text transition-colors hover:bg-mehi-neutral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mehi-slate focus-visible:ring-offset-2"
            >
              Ingresar
            </a>
            <a
              href="#contacto"
              className="rounded-md border border-mehi-slate px-4 py-2.5 text-sm font-semibold text-mehi-text transition-colors hover:bg-mehi-neutral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mehi-slate focus-visible:ring-offset-2"
            >
              Solicitar demo
            </a>
          </div>

          <details className="group relative sm:hidden">
            <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-md border border-mehi-border text-mehi-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mehi-slate [&::-webkit-details-marker]:hidden">
              <span className="sr-only">Abrir navegación</span>
              <Menu className="h-5 w-5" aria-hidden="true" />
            </summary>
            <nav
              aria-label="Navegación mobile"
              className="absolute right-0 top-14 w-72 rounded-md border border-mehi-border bg-white p-3"
            >
              {[
                ["Cómo funciona", "#como-funciona"],
                ["Seguridad", "#seguridad"],
                ["Contacto", "#contacto"],
              ].map(([label, href]) => (
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
                  Ingresar a MEHI
                </a>
                <a
                  href="#contacto"
                  className="mt-1 block rounded-md bg-mehi-plum px-3 py-3 text-center text-sm font-semibold text-white hover:bg-mehi-plum-hover"
                >
                  Solicitar demo
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
                Atención · conocimiento · aprendizaje
              </p>
              <h1 className="mt-6 max-w-3xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-mehi-text sm:text-6xl lg:text-7xl">
                Atención que resuelve.
                <span className="mt-2 block text-mehi-slate">
                  Conocimiento que queda.
                </span>
              </h1>
              <p className="mt-7 max-w-xl text-pretty text-lg leading-8 text-mehi-text-secondary sm:text-xl sm:leading-9">
                MEHI une inteligencia artificial y equipos humanos para atender mejor,
                conservar el contexto y aprender de cada gestión.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#contacto"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-mehi-plum px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-mehi-plum-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mehi-plum focus-visible:ring-offset-4"
                >
                  Solicitar una demo
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="#como-funciona"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-mehi-border bg-white px-5 py-3 text-sm font-semibold text-mehi-text transition-colors hover:border-mehi-slate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mehi-slate focus-visible:ring-offset-4"
                >
                  Ver cómo funciona
                  <ChevronRight className="h-4 w-4 text-mehi-slate" aria-hidden="true" />
                </a>
              </div>
            </div>

            <CompactJourney />
          </div>
        </section>

        <section aria-label="Resultados principales" className="bg-mehi-neutral pb-8 sm:pb-12">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="grid overflow-hidden rounded-md border border-mehi-border bg-mehi-border sm:grid-cols-3 sm:gap-px">
              {outcomes.map((outcome) => (
                <article
                  key={outcome.title}
                  className="border-b border-mehi-border bg-white p-6 last:border-b-0 sm:border-b-0 sm:p-7"
                >
                  <h2 className="text-lg font-semibold text-mehi-text">{outcome.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-mehi-text-secondary">
                    {outcome.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="como-funciona" className="scroll-mt-24 bg-white py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mehi-slate">
              Cómo funciona
            </p>
            <h2 className="mt-5 max-w-3xl text-balance text-4xl font-semibold tracking-[-0.04em] text-mehi-text sm:text-5xl">
              De una consulta a una mejor decisión.
            </h2>

            <ol className="mt-12 grid gap-7 md:grid-cols-3">
              {steps.map(({ number, title, description, icon: Icon }) => (
                <li key={number} className="border-t-2 border-mehi-slate pt-5">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-semibold tracking-[0.14em] text-mehi-slate">
                      PASO {number}
                    </span>
                    <Icon className="h-5 w-5 text-mehi-slate" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-mehi-text">{title}</h3>
                  <p className="mt-3 text-base leading-7 text-mehi-text-secondary">
                    {description}
                  </p>
                </li>
              ))}
            </ol>

            <details className="group mt-16 rounded-md border border-mehi-border bg-white">
              <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-5 px-5 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-mehi-slate sm:px-7 [&::-webkit-details-marker]:hidden">
                <span>
                  <span className="block text-lg font-semibold text-mehi-text">
                    ¿Querés entender el circuito completo?
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-mehi-text-secondary">
                    Conocé las cuatro capacidades que trabajan juntas.
                  </span>
                </span>
                <span className="inline-flex shrink-0 items-center gap-2 rounded-md border border-mehi-border px-4 py-2.5 text-sm font-semibold text-mehi-text transition-colors group-open:border-mehi-slate group-open:text-mehi-slate">
                  <span className="group-open:hidden">Ver detalles</span>
                  <span className="hidden group-open:inline">Ocultar</span>
                  <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" aria-hidden="true" />
                </span>
              </summary>

              <div className="grid gap-3 border-t border-mehi-border p-5 sm:grid-cols-2 sm:p-7 lg:grid-cols-4">
                {platformDetails.map(({ title, description, icon: Icon }) => (
                  <article key={title} className="rounded-md border border-mehi-border p-5">
                    <Icon className="h-5 w-5 text-mehi-slate" aria-hidden="true" />
                    <h3 className="mt-5 font-semibold text-mehi-text">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-mehi-text-secondary">
                      {description}
                    </p>
                  </article>
                ))}
              </div>
            </details>
          </div>
        </section>

        <section id="seguridad" className="scroll-mt-24 border-y border-mehi-border bg-mehi-neutral py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-10">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-white text-mehi-slate">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-mehi-slate">
                Control y confianza
              </p>
              <h2 className="mt-5 max-w-2xl text-balance text-4xl font-semibold tracking-[-0.04em] text-mehi-text sm:text-5xl">
                Más capacidad, sin perder el control.
              </h2>
            </div>

            <div className="space-y-3">
              {trustItems.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex min-h-16 items-center gap-4 rounded-md border border-mehi-border bg-white px-5 py-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-mehi-slate text-mehi-slate">
                    <Check className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="font-semibold text-mehi-text">{label}</span>
                  <Icon className="ml-auto h-5 w-5 text-mehi-slate" aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contacto" className="scroll-mt-24 bg-white py-20 sm:py-24 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mehi-slate">
                Conversemos
              </p>
              <h2 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.04em] text-mehi-text sm:text-5xl">
                Transformá la atención sin perder el control.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-mehi-text-secondary">
                Conocé cómo MEHI puede integrarse con tu operación.
              </p>
            </div>

            <ContactForm />
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
              Atención, conocimiento y aprendizaje operacional.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <a
              href="#contacto"
              data-testid="footer-contact-link"
              className="font-medium text-mehi-text hover:text-mehi-plum"
            >
              Contacto
            </a>
            <a
              href="https://app.mehi.ar/auth/login"
              className="font-medium text-mehi-text hover:text-mehi-plum"
            >
              Ingresar
            </a>
            <span className="text-mehi-text-secondary">MEHI</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
