import Image from "next/image";
import { Menu } from "lucide-react";

import { LanguageSwitch } from "./LanguageSwitch";
import { findPage, homePath, translatedPath, ui, type Locale } from "../i18n";

/** Las cuatro entradas del menú: la solución y una página por tipo de cliente. */
export function mainNavItems(locale: Locale): [string, string][] {
  const t = ui[locale].nav;
  const path = (id: string) => translatedPath(findPage("es", id), locale);
  return [
    [t.solution, path("plataforma")],
    [t.government, path("ia-para-gobiernos")],
    [t.contactCenters, path("ia-para-contact-centers")],
    [t.business, path("agentes-de-voz-ia")],
  ];
}

export function SiteHeader({
  locale,
  alternatePath,
  currentPath,
}: {
  locale: Locale;
  /** La misma página en el otro idioma. */
  alternatePath: string;
  currentPath?: string;
}) {
  const t = ui[locale];
  const home = homePath(locale);
  const contactHref = `${home}#contacto`;
  const items = mainNavItems(locale);
  const target: Locale = locale === "es" ? "en" : "es";

  return (
    <header className="sticky top-0 z-40 border-b border-mehi-border/90 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:h-24 sm:px-8 lg:px-10">
        <a
          href={home}
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

        <nav aria-label={t.mainNav} className="hidden items-center gap-6 lg:flex">
          {items.map(([label, href]) => (
            <a
              key={href}
              href={href}
              aria-current={href === currentPath ? "page" : undefined}
              className={`whitespace-nowrap rounded-sm text-sm font-medium transition-colors hover:text-mehi-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mehi-slate focus-visible:ring-offset-4 ${
                href === currentPath ? "text-mehi-plum" : "text-mehi-text-secondary"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex xl:gap-3">
          <LanguageSwitch locale={locale} href={alternatePath} />
          <a
            href="https://app.mehi.ar/auth/login"
            data-testid="login-cta"
            className="whitespace-nowrap rounded-md px-4 py-2.5 text-sm font-semibold text-mehi-text transition-colors hover:bg-mehi-neutral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mehi-slate focus-visible:ring-offset-2"
          >
            {t.signIn}
          </a>
          <a
            href={contactHref}
            className="whitespace-nowrap rounded-md bg-mehi-plum px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-mehi-plum-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mehi-plum focus-visible:ring-offset-2"
          >
            {t.requestDemo}
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
        <a
          href={contactHref}
          className="whitespace-nowrap rounded-md bg-mehi-plum px-3 py-2.5 text-xs font-semibold text-white hover:bg-mehi-plum-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mehi-plum focus-visible:ring-offset-2"
        >
          {t.requestDemo}
        </a>
        <details className="group relative">
          <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-md border border-mehi-border text-mehi-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mehi-slate [&::-webkit-details-marker]:hidden">
            <span className="sr-only">{t.openNav}</span>
            <Menu className="h-5 w-5" aria-hidden="true" />
          </summary>
          <nav
            aria-label={t.mobileNav}
            className="absolute right-0 top-14 w-72 rounded-md border border-mehi-border bg-white p-3"
          >
            {items.map(([label, href]) => (
              <a
                key={href}
                href={href}
                aria-current={href === currentPath ? "page" : undefined}
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
                href={contactHref}
                className="mt-1 block rounded-md bg-mehi-plum px-3 py-3 text-center text-sm font-semibold text-white hover:bg-mehi-plum-hover"
              >
                {t.requestDemo}
              </a>
              <a
                href={alternatePath}
                hrefLang={target}
                lang={target}
                className="mt-1 block rounded-md px-3 py-3 text-center text-sm font-semibold text-mehi-text hover:bg-mehi-neutral"
              >
                {t.switchLanguage.label}
              </a>
            </div>
          </nav>
        </details>
        </div>
      </div>
    </header>
  );
}
