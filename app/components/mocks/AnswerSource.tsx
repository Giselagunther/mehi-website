import { BadgeCheck, FileText, Link2 } from "lucide-react";

import { MockWindow } from "./MockKit";
import { mockText } from "../../mock-text";
import type { Locale } from "../../ui-text";

/**
 * Ejemplo de «respuesta con respaldo»: lo que dijo el agente y la ficha aprobada
 * de la que salió. Datos inventados.
 */
export function AnswerSource({ locale }: { locale: Locale }) {
  const t = mockText[locale];
  const a = t.answer;
  return (
    <figure role="img" aria-label={a.aria} data-reveal="" className="grid gap-4 lg:grid-cols-2 lg:items-stretch">
      <div aria-hidden="true" className="contents">
        <MockWindow title={a.conversation} badge={t.badge}>
          <div className="space-y-4 p-5">
            <div className="max-w-[85%]">
              <p className="text-xs font-semibold text-mehi-text-secondary">{a.callerLabel}</p>
              <p className="mt-1 rounded-md bg-mehi-neutral px-4 py-3 text-sm leading-6 text-mehi-text">
                {a.callerLine}
              </p>
            </div>
            <div className="ml-auto max-w-[90%] text-right">
              <p className="text-xs font-semibold text-mehi-plum">{a.agentLabel}</p>
              <p className="mt-1 rounded-md border border-mehi-slate bg-white px-4 py-3 text-left text-sm leading-6 text-mehi-text">
                {a.agentLine}
              </p>
            </div>
            <p
              data-row=""
              style={{ "--i": 2 } as React.CSSProperties}
              className="flex items-start gap-2 rounded-md border border-dashed border-mehi-slate px-3 py-2.5 text-xs font-semibold leading-5 text-mehi-slate"
            >
              <Link2 className="mt-0.5 h-3.5 w-3.5 flex-none" />
              {a.source}
            </p>
          </div>
        </MockWindow>

        <MockWindow title={a.recordWindow} badge={t.badge}>
          <div className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-md bg-mehi-neutral text-mehi-slate">
                  <FileText className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-semibold leading-snug text-mehi-text">{a.recordTitle}</p>
                  <p className="mt-1 text-[11px] text-mehi-text-secondary">{a.meta}</p>
                </div>
              </div>
              <span className="inline-flex flex-none items-center gap-1 rounded-sm bg-mehi-slate/15 px-2 py-0.5 text-[11px] font-semibold text-mehi-text">
                <BadgeCheck className="h-3.5 w-3.5 text-mehi-slate" />
                {a.status}
              </span>
            </div>
            <div className="mt-5 space-y-4">
              {a.sections.map((section, index) => (
                <div
                  key={section.title}
                  data-row=""
                  style={{ "--i": index + 3 } as React.CSSProperties}
                  className="border-t border-mehi-border pt-3"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-mehi-text-secondary">
                    {section.title}
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-mehi-text">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 flex-none rounded-full bg-mehi-slate" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </MockWindow>
      </div>
    </figure>
  );
}
