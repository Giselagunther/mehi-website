import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  ClipboardCheck,
  FileCheck2,
  Headphones,
  Layers3,
  LockKeyhole,
  Menu,
  MessageSquareText,
  Network,
  Route,
  ScanSearch,
  ShieldCheck,
  UserRoundCheck,
  Workflow,
} from "lucide-react";
import { CONTACT_EMAIL, CONTACT_MAILTO } from "../contact";

type IconItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const engines: Array<IconItem & { detail: string }> = [
  {
    title: "Motor Conversacional",
    description:
      "Comprende la necesidad, conversa con naturalidad y resuelve o deriva según reglas claras.",
    detail: "Intención · contexto · resolución",
    icon: MessageSquareText,
  },
  {
    title: "Motor de Conocimiento",
    description:
      "Organiza información institucional validada, sus versiones y las formas reales de nombrarla.",
    detail: "Fichas · fuentes · alias",
    icon: BookOpenCheck,
  },
  {
    title: "Motor de Aprendizaje",
    description:
      "Convierte señales de cada interacción en evidencia para mejorar contenido, reglas y operación.",
    detail: "Señales · evidencia · mejoras",
    icon: BrainCircuit,
  },
  {
    title: "Observatorio",
    description:
      "Hace visible qué sabe el sistema, qué resuelve, dónde duda y qué efecto produce cada cambio.",
    detail: "Calidad · trazabilidad · impacto",
    icon: BarChart3,
  },
];

const journey: IconItem[] = [
  {
    title: "La persona se comunica",
    description: "La interacción entra por el canal integrado a la operación.",
    icon: Headphones,
  },
  {
    title: "MEHI comprende la necesidad",
    description: "Identifica la intención y conserva el contexto de la conversación.",
    icon: ScanSearch,
  },
  {
    title: "Usa conocimiento validado",
    description: "Responde con contenido institucional curado y publicado previamente.",
    icon: BookOpenCheck,
  },
  {
    title: "Resuelve o deriva",
    description: "Continúa con IA o transfiere a una persona cuando corresponde.",
    icon: Route,
  },
  {
    title: "La gestión queda registrada",
    description: "KORENUS acompaña al operador y conserva el resultado de la atención.",
    icon: ClipboardCheck,
  },
  {
    title: "La operación genera evidencia",
    description: "MEHI muestra patrones, dudas y oportunidades de mejora continua.",
    icon: BrainCircuit,
  },
];

const governance: IconItem[] = [
  {
    title: "Trazabilidad",
    description: "Cada decisión y cada cambio pueden reconstruirse desde su evidencia.",
    icon: Route,
  },
  {
    title: "Conocimiento gobernado",
    description: "Contenido curado, versionado y separado de la conversación en vivo.",
    icon: FileCheck2,
  },
  {
    title: "Supervisión humana",
    description: "Las personas conservan el control sobre lo que se publica y cómo se mejora.",
    icon: UserRoundCheck,
  },
  {
    title: "Seguridad y privacidad",
    description: "Diseño multi-cliente, acceso controlado y tratamiento responsable de la información.",
    icon: ShieldCheck,
  },
  {
    title: "Auditoría operativa",
    description: "Historial de eventos y resultados para entender qué pasó y por qué.",
    icon: ClipboardCheck,
  },
  {
    title: "Integración gradual",
    description: "Se conecta con canales y sistemas existentes sin reemplazar toda la operación.",
    icon: Network,
  },
];

const useCases = [
  {
    eyebrow: "Gobiernos",
    title: "Atención ciudadana con conocimiento confiable",
    description:
      "Escalá consultas y gestiones sin perder trazabilidad, control editorial ni continuidad con los equipos humanos.",
  },
  {
    eyebrow: "Grandes operaciones",
    title: "Más capacidad, sin fragmentar la experiencia",
    description:
      "Unificá conversación, derivación y seguimiento para que cada canal trabaje con el mismo contexto operativo.",
  },
  {
    eyebrow: "Organizaciones complejas",
    title: "Conocimiento institucional que aprende",
    description:
      "Detectá dudas, contenido faltante y nuevas formas de preguntar antes de que se vuelvan problemas repetidos.",
  },
];

function SectionIntro({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-mehi-slate">
        {eyebrow}
      </p>
      <h2 className="text-balance text-3xl font-semibold tracking-[-0.035em] text-mehi-text sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-pretty text-base leading-8 text-mehi-text-secondary sm:text-lg">
        {description}
      </p>
    </div>
  );
}

function ProductStage() {
  return (
    <div className="relative mx-auto w-full max-w-xl lg:mx-0" aria-label="Vista simplificada de una interacción en MEHI">
      <div className="absolute -left-5 top-16 hidden h-24 w-1 rounded-full bg-mehi-slate lg:block" />
      <div className="overflow-hidden rounded-md border border-mehi-border bg-white">
        <div className="flex items-center justify-between border-b border-mehi-border px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-mehi-neutral text-mehi-slate">
              <CircleDot className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-mehi-text-secondary">
                Operación en curso
              </p>
              <p className="mt-1 text-sm font-semibold text-mehi-text">Atención asistida</p>
            </div>
          </div>
          <span className="rounded-sm bg-mehi-neutral px-2.5 py-1 text-xs font-medium text-mehi-text-secondary">
            En seguimiento
          </span>
        </div>

        <div className="grid gap-4 p-5 sm:grid-cols-[0.95fr_1.05fr] sm:p-6">
          <div className="rounded-md bg-mehi-text p-5 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
              Conversación
            </p>
            <div className="mt-5 space-y-4">
              <div className="max-w-[85%] rounded-md bg-white/10 px-3 py-3 text-sm leading-6 text-white/85">
                Necesidad expresada por la persona
              </div>
              <div className="ml-auto max-w-[88%] rounded-md bg-mehi-slate px-3 py-3 text-sm leading-6 text-white">
                Respuesta basada en conocimiento validado
              </div>
              <div className="flex items-center gap-2 pt-2 text-xs font-medium text-white/65">
                <CheckCircle2 className="h-4 w-4 text-mehi-lavender" aria-hidden="true" />
                Contexto preservado
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {[
              ["Necesidad detectada", "Trámite identificado"],
              ["Conocimiento consultado", "Ficha institucional validada"],
              ["Próxima acción", "Resolver o derivar con contexto"],
              ["Evidencia", "Disponible para revisión"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-md border border-mehi-border px-4 py-3.5">
                <p className="text-xs font-medium text-mehi-text-secondary">{label}</p>
                <p className="mt-1.5 text-sm font-semibold leading-5 text-mehi-text">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="ml-auto mt-4 flex w-[92%] items-center gap-3 rounded-md border border-mehi-lavender bg-white px-4 py-3 sm:w-[72%]">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-mehi-neutral text-mehi-slate">
          <BrainCircuit className="h-4 w-4" aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-mehi-slate">Aprendizaje</p>
          <p className="mt-1 text-sm font-medium text-mehi-text">La operación deja una señal trazable</p>
        </div>
      </div>
    </div>
  );
}

function ProductProof() {
  return (
    <div className="mt-12 grid gap-5 lg:grid-cols-3">
      <article className="overflow-hidden rounded-md border border-mehi-border bg-white">
        <div className="flex items-center justify-between border-b border-mehi-border px-5 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-mehi-slate">Conocimiento</p>
            <h3 className="mt-1.5 font-semibold text-mehi-text">Estado de las fichas</h3>
          </div>
          <BookOpenCheck className="h-5 w-5 text-mehi-slate" aria-hidden="true" />
        </div>
        <div className="space-y-3 p-5">
          {["Vigencia frente a la fuente", "Formas reales de pedirla", "Consultas sin respuesta"].map((item) => (
            <div key={item} className="flex items-center justify-between rounded-md bg-mehi-neutral px-4 py-3">
              <span className="text-sm text-mehi-text-secondary">{item}</span>
              <span className="font-semibold text-mehi-text" aria-label="Dato no publicado">—</span>
            </div>
          ))}
        </div>
      </article>

      <article className="overflow-hidden rounded-md border border-mehi-border bg-white">
        <div className="flex items-center justify-between border-b border-mehi-border px-5 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-mehi-slate">IA + operador</p>
            <h3 className="mt-1.5 font-semibold text-mehi-text">Continuidad de la gestión</h3>
          </div>
          <Workflow className="h-5 w-5 text-mehi-slate" aria-hidden="true" />
        </div>
        <div className="p-5">
          <div className="space-y-0">
            {["Intención comprendida", "Contexto disponible", "Resultado registrado"].map((item, index) => (
              <div key={item} className="relative flex gap-3 pb-5 last:pb-0">
                {index < 2 ? <span className="absolute left-3 top-7 h-full w-px bg-mehi-lavender" /> : null}
                <span className="relative z-10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-mehi-lavender bg-white">
                  <CheckCircle2 className="h-4 w-4 text-mehi-slate" aria-hidden="true" />
                </span>
                <p className="text-sm font-medium leading-6 text-mehi-text">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </article>

      <article className="overflow-hidden rounded-md border border-mehi-border bg-white">
        <div className="flex items-center justify-between border-b border-mehi-border px-5 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-mehi-slate">Observatorio</p>
            <h3 className="mt-1.5 font-semibold text-mehi-text">Señales de aprendizaje</h3>
          </div>
          <BarChart3 className="h-5 w-5 text-mehi-slate" aria-hidden="true" />
        </div>
        <div className="p-5">
          <div className="flex h-36 items-end gap-2 border-b border-l border-mehi-border px-3 pb-3">
            {["h-12", "h-20", "h-16", "h-28", "h-24", "h-32"].map((height, index) => (
              <span
                key={`${height}-${index}`}
                className={`w-full rounded-t-sm bg-mehi-slate/45 ${height}`}
                aria-hidden="true"
              />
            ))}
          </div>
          <p className="mt-4 text-sm leading-6 text-mehi-text-secondary">
            Evolución visible por versión, con procedencia y evidencia.
          </p>
        </div>
      </article>
    </div>
  );
}

export function MarketingHome() {
  return (
    <div data-testid="page-landing" className="min-h-screen overflow-x-hidden bg-white text-mehi-text">
      <a
        href="#contenido"
        className="sr-only z-50 rounded-md bg-mehi-text px-4 py-3 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Ir al contenido
      </a>

      <header className="sticky top-0 z-40 border-b border-mehi-border/90 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <a href="#inicio" aria-label="MEHI, ir al inicio" className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mehi-slate focus-visible:ring-offset-4">
            <Image src="/logo-mehi.svg" alt="MEHI" width={280} height={120} className="h-12 w-auto" priority />
          </a>

          <nav aria-label="Navegación principal" className="hidden items-center gap-7 lg:flex">
            {[
              ["Producto", "#producto"],
              ["Cómo funciona", "#como-funciona"],
              ["Casos de uso", "#casos-de-uso"],
              ["Seguridad", "#seguridad"],
              ["Contacto", "#contacto"],
            ].map(([label, href]) => (
              <a key={href} href={href} className="rounded-sm text-sm font-medium text-mehi-text-secondary transition-colors hover:text-mehi-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mehi-slate focus-visible:ring-offset-4">
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
            <nav aria-label="Navegación mobile" className="absolute right-0 top-14 w-72 rounded-md border border-mehi-border bg-white p-3">
              {[
                ["Producto", "#producto"],
                ["Cómo funciona", "#como-funciona"],
                ["Casos de uso", "#casos-de-uso"],
                ["Seguridad", "#seguridad"],
                ["Contacto", "#contacto"],
              ].map(([label, href]) => (
                <a key={href} href={href} className="block rounded-md px-3 py-3 text-sm font-medium text-mehi-text hover:bg-mehi-neutral">
                  {label}
                </a>
              ))}
              <div className="mt-2 border-t border-mehi-border pt-2">
                <a href="https://app.mehi.ar/auth/login" data-testid="login-cta-mobile" className="block rounded-md px-3 py-3 text-sm font-semibold text-mehi-text">
                  Ingresar a MEHI
                </a>
                <a href="#contacto" className="mt-1 block rounded-md bg-mehi-plum px-3 py-3 text-center text-sm font-semibold text-white hover:bg-mehi-plum-hover">
                  Solicitar demo
                </a>
              </div>
            </nav>
          </details>
        </div>
      </header>

      <main id="contenido">
        <section id="inicio" className="relative scroll-mt-24 overflow-hidden bg-mehi-neutral">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-20 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:px-10 lg:pb-28 lg:pt-24">
            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-mehi-lavender bg-white px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-mehi-slate">
                <Layers3 className="h-4 w-4" aria-hidden="true" />
                Atención · conocimiento · aprendizaje
              </div>
              <h1 className="max-w-3xl text-balance text-5xl font-semibold tracking-[-0.055em] text-mehi-text sm:text-6xl lg:text-7xl lg:leading-[1.02]">
                Cada llamada se convierte en una gestión.
                <span className="mt-2 block text-mehi-slate">Cada gestión, en aprendizaje.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-mehi-text-secondary sm:text-xl sm:leading-9">
                MEHI conecta inteligencia artificial conversacional, conocimiento institucional y atención humana para resolver operaciones complejas con trazabilidad de extremo a extremo.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a href="#contacto" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-mehi-plum px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-mehi-plum-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mehi-plum focus-visible:ring-offset-4">
                  Solicitar una demo
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a href="#como-funciona" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold text-mehi-text transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mehi-slate focus-visible:ring-offset-4">
                  Ver cómo funciona
                  <ChevronRight className="h-4 w-4 text-mehi-slate" aria-hidden="true" />
                </a>
              </div>
              <p className="mt-7 flex items-center gap-2 text-sm text-mehi-text-secondary">
                <ShieldCheck className="h-4 w-4 text-mehi-slate" aria-hidden="true" />
                Diseñado para operaciones donde equivocarse importa.
              </p>
            </div>

            <ProductStage />
          </div>
        </section>

        <section aria-label="Principios de la plataforma" className="border-y border-mehi-border bg-white">
          <div className="mx-auto grid max-w-7xl divide-y divide-mehi-border px-5 sm:grid-cols-2 sm:divide-x sm:divide-y-0 sm:px-8 lg:grid-cols-4 lg:px-10">
            {[
              ["Trazabilidad", "De extremo a extremo"],
              ["Conocimiento", "Gobernado y versionado"],
              ["Continuidad", "IA y personas"],
              ["Mejora", "Basada en evidencia"],
            ].map(([title, detail]) => (
              <div key={title} className="px-4 py-7 first:pl-0 last:pr-0 sm:px-6">
                <p className="text-sm font-semibold text-mehi-text">{title}</p>
                <p className="mt-1 text-sm text-mehi-text-secondary">{detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="producto" className="scroll-mt-24 bg-white py-20 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <SectionIntro
              eyebrow="Plataforma integral"
              title="La operación genera Memoria Institucional."
              description="MEHI transforma conversaciones aisladas en un sistema que sabe, aprende y permite explicar cada decisión. Cuatro motores trabajan sobre una misma evidencia operativa."
            />

            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {engines.map(({ title, description, detail, icon: Icon }) => (
                <article key={title} className="group rounded-md border border-mehi-border bg-white p-6 transition-colors hover:border-mehi-lavender sm:p-8">
                  <div className="flex items-start justify-between gap-6">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-mehi-neutral text-mehi-slate">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="text-right text-xs font-semibold uppercase tracking-[0.14em] text-mehi-text-secondary">{detail}</span>
                  </div>
                  <h3 className="mt-8 text-2xl font-semibold tracking-[-0.025em] text-mehi-text">{title}</h3>
                  <p className="mt-3 max-w-xl text-base leading-7 text-mehi-text-secondary">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-mehi-text py-20 text-white sm:py-24 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mehi-lavender">Un circuito, dos productos</p>
              <h2 className="mt-5 text-balance text-3xl font-semibold tracking-[-0.035em] sm:text-4xl lg:text-5xl">
                MEHI atiende. KORENUS gestiona. Juntos cierran el circuito.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-8 text-white/65 sm:text-lg">
                La conversación, el conocimiento curado y el trabajo humano dejan de vivir en sistemas aislados.
              </p>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
              <article className="rounded-md bg-white p-7 text-mehi-text sm:p-9">
                <Image src="/logo-mehi.svg" alt="MEHI" width={280} height={120} className="h-16 w-auto" />
                <h3 className="mt-7 text-xl font-semibold">Atención y observabilidad</h3>
                <p className="mt-3 leading-7 text-mehi-text-secondary">
                  Comprende la interacción, conserva el contexto y muestra qué pasó: llamadas, calidad, reportes y señales de aprendizaje.
                </p>
              </article>

              <div className="flex items-center justify-center" aria-hidden="true">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 text-mehi-lavender">
                  <Workflow className="h-5 w-5" />
                </span>
              </div>

              <article className="rounded-md bg-white p-7 text-mehi-text sm:p-9">
                <Image src="/korenus-logo-primary.svg" alt="Korenus — Sistema de gestión" width={380} height={120} className="h-16 w-auto" />
                <h3 className="mt-7 text-xl font-semibold">Conocimiento y gestión humana</h3>
                <p className="mt-3 leading-7 text-mehi-text-secondary">
                  Gobierna las fichas institucionales y acompaña al operador en el registro del resultado de la atención.
                </p>
              </article>
            </div>

            <p className="mx-auto mt-9 max-w-3xl text-center text-base leading-8 text-white/75">
              Cuando la IA necesita ayuda humana, la persona puede continuar con contexto y el resultado vuelve a alimentar la mejora.
            </p>
          </div>
        </section>

        <section id="como-funciona" className="scroll-mt-24 bg-mehi-neutral py-20 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <SectionIntro
              eyebrow="Cómo funciona"
              title="Una interacción. Un recorrido completo."
              description="La tecnología acompaña la operación existente: comprende, consulta conocimiento publicado, resuelve o deriva, y deja evidencia para aprender."
              align="center"
            />

            <ol className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {journey.map(({ title, description, icon: Icon }) => (
                <li key={title} className="relative rounded-md border border-mehi-border bg-white p-6">
                  <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-md bg-mehi-neutral text-mehi-slate">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-lg font-semibold text-mehi-text">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-mehi-text-secondary">{description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <SectionIntro
              eyebrow="Vistas de producto"
              title="La operación se vuelve visible."
              description="Representaciones fieles de las vistas operativas de MEHI, sin datos personales ni cifras públicas no autorizadas. Conocimiento, continuidad y aprendizaje en un mismo lugar."
            />
            <ProductProof />
          </div>
        </section>

        <section id="casos-de-uso" className="scroll-mt-24 border-y border-mehi-border bg-mehi-neutral py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <SectionIntro
              eyebrow="Casos de uso"
              title="Para operaciones que necesitan escala y criterio."
              description="MEHI está pensado para organizaciones con alta demanda, conocimiento distribuido y consecuencias reales cuando la información llega tarde o mal."
            />
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {useCases.map((item) => (
                <article key={item.title} className="rounded-md border border-mehi-border bg-white p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-mehi-slate">{item.eyebrow}</p>
                  <h3 className="mt-5 text-xl font-semibold leading-7 text-mehi-text">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-mehi-text-secondary">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="seguridad" className="scroll-mt-24 bg-white py-20 sm:py-24 lg:py-32">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.75fr_1.25fr] lg:px-10">
            <div>
              <span className="flex h-12 w-12 items-center justify-center rounded-md bg-mehi-neutral text-mehi-slate">
                <LockKeyhole className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="mt-7">
                <SectionIntro
                  eyebrow="Seguridad y gobernanza"
                  title="Diseñado para organizaciones donde equivocarse importa."
                  description="El control no se agrega al final. Forma parte de cómo se organiza el conocimiento, cómo se deriva una atención y cómo se audita cada mejora."
                />
              </div>
            </div>

            <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
              {governance.map(({ title, description, icon: Icon }) => (
                <article key={title} className="border-t border-mehi-border pt-5">
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-mehi-slate" aria-hidden="true" />
                    <h3 className="font-semibold text-mehi-text">{title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-mehi-text-secondary">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contacto" className="scroll-mt-24 bg-mehi-neutral py-20 sm:py-24 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mehi-slate">Conversemos</p>
              <h2 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.04em] text-mehi-text sm:text-5xl">
                Transformá la atención sin perder el control.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-mehi-text-secondary">
                Conocé cómo MEHI puede integrarse con tu operación, tus canales y tus sistemas actuales.
              </p>
              <div className="mt-8 border-t border-mehi-border pt-6">
                <p className="text-sm text-mehi-text-secondary">También podés escribirnos a</p>
                <a href={CONTACT_MAILTO} className="mt-2 inline-block rounded-sm font-semibold text-mehi-plum focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mehi-plum focus-visible:ring-offset-4">
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>

            <form data-testid="contact-form" action={CONTACT_MAILTO} method="post" encType="text/plain" className="rounded-md border border-mehi-border bg-white p-6 sm:p-8">
              <input type="hidden" name="Asunto" value="Solicitud de demo MEHI" />
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-medium text-mehi-text">
                  Nombre y apellido
                  <input required autoComplete="name" name="Nombre y apellido" className="mt-2 min-h-11 w-full rounded-md border border-mehi-input-border bg-white px-3.5 py-2.5 text-base text-mehi-text outline-none transition-colors placeholder:text-gray-400 focus:border-mehi-slate focus:ring-2 focus:ring-mehi-slate/20" />
                </label>
                <label className="text-sm font-medium text-mehi-text">
                  Organización
                  <input required autoComplete="organization" name="Organización" className="mt-2 min-h-11 w-full rounded-md border border-mehi-input-border bg-white px-3.5 py-2.5 text-base text-mehi-text outline-none transition-colors placeholder:text-gray-400 focus:border-mehi-slate focus:ring-2 focus:ring-mehi-slate/20" />
                </label>
                <label className="text-sm font-medium text-mehi-text">
                  Cargo
                  <input required autoComplete="organization-title" name="Cargo" className="mt-2 min-h-11 w-full rounded-md border border-mehi-input-border bg-white px-3.5 py-2.5 text-base text-mehi-text outline-none transition-colors placeholder:text-gray-400 focus:border-mehi-slate focus:ring-2 focus:ring-mehi-slate/20" />
                </label>
                <label className="text-sm font-medium text-mehi-text">
                  Correo
                  <input required type="email" autoComplete="email" name="Correo" className="mt-2 min-h-11 w-full rounded-md border border-mehi-input-border bg-white px-3.5 py-2.5 text-base text-mehi-text outline-none transition-colors placeholder:text-gray-400 focus:border-mehi-slate focus:ring-2 focus:ring-mehi-slate/20" />
                </label>
              </div>
              <label className="mt-5 block text-sm font-medium text-mehi-text">
                Operación que querés mejorar
                <textarea required name="Operación a mejorar" rows={4} className="mt-2 w-full resize-y rounded-md border border-mehi-input-border bg-white px-3.5 py-3 text-base text-mehi-text outline-none transition-colors placeholder:text-gray-400 focus:border-mehi-slate focus:ring-2 focus:ring-mehi-slate/20" />
              </label>
              <button type="submit" className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-mehi-plum px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-mehi-plum-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mehi-plum focus-visible:ring-offset-4 sm:w-auto">
                Solicitar una demo
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <p className="mt-4 text-xs leading-5 text-mehi-text-secondary">
                Al enviar, se abrirá tu aplicación de correo con los datos completados. MEHI no incorpora servicios externos en este formulario.
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-mehi-border bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 px-5 py-9 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <div className="flex items-center gap-5">
            <Image src="/logo-mehi.svg" alt="MEHI" width={280} height={120} className="h-12 w-auto" />
            <div className="h-8 w-px bg-mehi-border" aria-hidden="true" />
            <p className="text-sm text-mehi-text-secondary">Atención, conocimiento y aprendizaje operacional.</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <a href={CONTACT_MAILTO} className="font-medium text-mehi-text hover:text-mehi-plum">Contacto</a>
            <a href="https://app.mehi.ar/auth/login" className="font-medium text-mehi-text hover:text-mehi-plum">Ingresar</a>
            <span className="text-mehi-text-secondary">MEHI</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
