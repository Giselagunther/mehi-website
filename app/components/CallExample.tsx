import { Database, PhoneCall, UserRoundCheck } from "lucide-react";

import { ui, type Locale } from "../i18n";

/**
 * Llamada de ejemplo (rotulada como tal) que muestra la idea: el agente le pone voz al CRM.
 * Al cargar, los pasos aparecen en orden —pregunta, consulta al CRM, respuesta, pase— con
 * una animación sólo de CSS (globals.css, `data-call-step`); con «reducir movimiento»
 * o sin animaciones se ve completa desde el principio.
 */
export function CallExample({ locale }: { locale: Locale }) {
  const t = ui[locale].call;
  return (
    <figure
      aria-label={t.aria}
      className="w-full rounded-md border border-mehi-border bg-white p-5 sm:p-7"
    >
      <div className="flex items-center justify-between gap-4 border-b border-mehi-border pb-5">
        <p className="inline-flex items-center gap-2 text-sm font-semibold text-mehi-text">
          <PhoneCall className="h-4 w-4 text-mehi-slate" aria-hidden="true" />
          {t.title}
        </p>
        <span className="rounded-sm border border-mehi-border px-2 py-1 text-xs font-medium text-mehi-text-secondary">
          {t.badge}
        </span>
      </div>

      <div className="mt-5 space-y-4">
        <div className="max-w-[85%]" data-call-step="1">
          <p className="text-xs font-semibold text-mehi-text-secondary">{t.callerLabel}</p>
          <p className="mt-1 rounded-md bg-mehi-neutral px-4 py-3 text-sm leading-6 text-mehi-text">
            {t.callerLine}
          </p>
        </div>

        <p
          data-call-step="2"
          className="flex items-center gap-2 rounded-md border border-dashed border-mehi-slate px-4 py-3 text-xs font-semibold text-mehi-slate"
        >
          <Database className="h-4 w-4 flex-none" aria-hidden="true" />
          {t.lookup}
        </p>

        <div className="ml-auto max-w-[85%] text-right" data-call-step="3">
          <p className="text-xs font-semibold text-mehi-plum">{t.agentLabel}</p>
          <p className="mt-1 rounded-md border border-mehi-slate bg-white px-4 py-3 text-left text-sm leading-6 text-mehi-text">
            {t.agentLine}
          </p>
        </div>
      </div>

      <figcaption data-call-step="4" className="mt-6 flex items-start gap-2 border-t border-mehi-border pt-5 text-sm leading-6 text-mehi-text-secondary">
        <UserRoundCheck className="mt-1 h-4 w-4 flex-none text-mehi-slate" aria-hidden="true" />
        {t.footer}
      </figcaption>
    </figure>
  );
}
