import { ui, type Locale } from "../i18n";

/** Enlace a la misma página en el otro idioma. El nombre va en el idioma de destino. */
export function LanguageSwitch({ locale, href }: { locale: Locale; href: string }) {
  const target: Locale = locale === "es" ? "en" : "es";
  const text = ui[locale].switchLanguage;
  return (
    <a
      href={href}
      hrefLang={target}
      lang={target}
      aria-label={text.aria}
      title={text.label}
      data-testid="language-switch"
      className="whitespace-nowrap rounded-md px-3 py-2.5 text-sm font-semibold text-mehi-text-secondary transition-colors hover:bg-mehi-neutral hover:text-mehi-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mehi-slate focus-visible:ring-offset-2"
    >
      {text.short}
    </a>
  );
}
