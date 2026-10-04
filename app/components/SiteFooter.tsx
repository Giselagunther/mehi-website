import Image from "next/image";

import { mainNavItems } from "./SiteHeader";
import { contentFor, homePath, pagePath, ui, type Locale } from "../i18n";

export function SiteFooter({
  locale,
  alternatePath,
}: {
  locale: Locale;
  alternatePath: string;
}) {
  const t = ui[locale];
  const { site, publicPages } = contentFor(locale);
  const resources = publicPages.filter((page) => page.kind === "resource");
  const target: Locale = locale === "es" ? "en" : "es";
  const linkClass = "text-mehi-text-secondary hover:text-mehi-plum";

  return (
    <footer className="border-t border-mehi-border bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.2fr_1fr_1fr_1fr] lg:px-10">
        <div>
          <Image
            src="/logo-mehi.svg"
            alt="MEHI"
            width={280}
            height={120}
            className="h-12 w-auto"
          />
          <p className="mt-4 max-w-xs text-sm leading-6 text-mehi-text-secondary" data-testid="footer-tagline">
            {site.tagline}
          </p>
        </div>
        <nav aria-label={t.footer.solutions} className="text-sm">
          <p className="font-semibold text-mehi-text">{t.footer.solutions}</p>
          <ul className="mt-4 space-y-3">
            {mainNavItems(locale).map(([label, href]) => (
              <li key={href}>
                <a href={href} className={linkClass}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label={t.footer.resources} className="text-sm">
          <p className="font-semibold text-mehi-text">{t.footer.resources}</p>
          <ul className="mt-4 space-y-3">
            {resources.map((page) => (
              <li key={page.slug}>
                <a href={pagePath(locale, page.slug)} className={linkClass}>
                  {page.label}
                </a>
              </li>
            ))}
            <li>
              <a href="/llms.txt" className={linkClass}>
                {t.footer.textSummary}
              </a>
            </li>
          </ul>
        </nav>
        <div className="text-sm">
          <p className="font-semibold text-mehi-text">MEHI</p>
          <ul className="mt-4 space-y-3">
            <li>
              <a
                href={`${homePath(locale)}#contacto`}
                data-testid="footer-contact-link"
                className={linkClass}
              >
                {t.footer.contact}
              </a>
            </li>
            <li>
              <a href="https://app.mehi.ar/auth/login" className={linkClass}>
                {t.signIn}
              </a>
            </li>
            <li>
              <a href={alternatePath} hrefLang={target} lang={target} className={linkClass}>
                {t.switchLanguage.label}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
