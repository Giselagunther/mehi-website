import { ArrowRight, Database, MessageSquareText, PhoneCall } from "lucide-react";

import { AnswerSource } from "./AnswerSource";
import {
  Donut,
  KpiTile,
  Legend,
  MockWindow,
  ShareBars,
  StackedBars,
  StatusChip,
  staggerStyle,
} from "./MockKit";
import { OperationDashboard } from "./OperationDashboard";
import { derivedByHour, hourLabels, mockText, resolvedByHour } from "../../mock-text";
import type { Locale } from "../../ui-text";

function GovernmentPanel({ locale }: { locale: Locale }) {
  const t = mockText[locale];
  const g = t.government;
  return (
    <figure role="img" aria-label={g.aria} data-reveal="">
      <MockWindow title={g.window} badge={t.badge} live={t.live}>
        <div className="grid gap-3 bg-mehi-neutral p-4 sm:p-6" aria-hidden="true">
          <div className="grid gap-3 sm:grid-cols-3">
            {g.kpis.map((kpi) => (
              <KpiTile key={kpi.label} kpi={kpi} locale={locale} />
            ))}
          </div>
          <div className="grid gap-3 lg:grid-cols-2">
            <div className="rounded-md border border-mehi-border bg-white p-4">
              <p className="mb-4 text-sm font-semibold text-mehi-text">{g.topicsTitle}</p>
              <ShareBars items={g.topics} />
            </div>
            <div className="rounded-md border border-mehi-border bg-white p-4">
              <p className="mb-4 text-sm font-semibold text-mehi-text">{g.areasTitle}</p>
              <Donut items={g.areas} />
            </div>
          </div>
        </div>
      </MockWindow>
    </figure>
  );
}

function ContactCenterPanel({ locale }: { locale: Locale }) {
  const t = mockText[locale];
  const c = t.contactCenter;
  const number = new Intl.NumberFormat(locale === "es" ? "es-AR" : "en-US");
  return (
    <figure role="img" aria-label={c.aria} data-reveal="">
      <MockWindow title={c.window} badge={t.badge} live={t.live}>
        <div className="grid gap-3 bg-mehi-neutral p-4 sm:p-6" aria-hidden="true">
          <div className="overflow-hidden rounded-md border border-mehi-border bg-white">
            <table className="w-full text-left text-xs">
              <thead className="text-mehi-text-secondary">
                <tr className="border-b border-mehi-border">
                  {c.columns.map((column, index) => (
                    <th
                      key={column}
                      className={`px-4 py-2.5 font-medium ${index === 1 || index === 3 ? "hidden text-right sm:table-cell" : ""} ${index === 2 ? "text-right" : ""}`}
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.rows.map(([client, calls, byAgent, toOperators, queue], index) => (
                  <tr
                    key={client}
                    data-row=""
                    style={staggerStyle(index)}
                    className="border-b border-mehi-border last:border-b-0"
                  >
                    <td className="px-4 py-3 font-medium text-mehi-text">{client}</td>
                    <td className="hidden px-4 py-3 text-right tabular-nums text-mehi-text sm:table-cell">
                      {number.format(calls)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="ml-auto flex max-w-[9rem] items-center justify-end gap-2">
                        <div className="h-1.5 flex-1 rounded-sm bg-mehi-neutral">
                          <div
                            data-hbar=""
                            style={{ ...staggerStyle(index), width: `${byAgent}%` }}
                            className="h-1.5 rounded-sm bg-mehi-slate"
                          />
                        </div>
                        <span className="w-8 text-right tabular-nums text-mehi-text">{byAgent}%</span>
                      </div>
                    </td>
                    <td className="hidden px-4 py-3 text-right tabular-nums text-mehi-text-secondary sm:table-cell">
                      {number.format(toOperators)}
                    </td>
                    <td className="px-4 py-3">
                      <StatusChip tone={queue === "ok" ? "slate" : "lavender"}>
                        {queue === "ok" ? c.queueOk : c.queueWait}
                      </StatusChip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="rounded-md border border-mehi-border bg-white p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-semibold text-mehi-text">{c.chartTitle}</p>
              <Legend
                items={[
                  [c.agent, "bg-mehi-slate"],
                  [c.operators, "bg-mehi-lavender"],
                ]}
              />
            </div>
            <StackedBars
              labels={hourLabels}
              primary={resolvedByHour}
              secondary={derivedByHour}
              className="mt-4 h-32 sm:h-40"
            />
          </div>
        </div>
      </MockWindow>
    </figure>
  );
}

const flowIcons = [PhoneCall, Database, MessageSquareText];

function CrmFlow({ locale }: { locale: Locale }) {
  const t = mockText[locale];
  const b = t.business;
  return (
    <figure role="img" aria-label={b.aria} data-reveal="" className="grid gap-4">
      <ol className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-stretch" aria-hidden="true">
        {b.steps.map((step, index) => {
          const Icon = flowIcons[index];
          return (
            <li key={step.title} className="contents">
              <div
                data-row=""
                style={staggerStyle(index * 2)}
                className="rounded-md border border-mehi-border bg-white p-4"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-mehi-slate text-mehi-slate">
                  <Icon className="h-4 w-4" />
                </span>
                <p className="mt-3 text-sm font-semibold text-mehi-text">{step.title}</p>
                <p className="mt-1 text-xs leading-5 text-mehi-text-secondary">{step.detail}</p>
              </div>
              {index < b.steps.length - 1 && (
                <div className="hidden items-center md:flex">
                  <svg viewBox="0 0 48 12" className="h-3 w-12 text-mehi-slate">
                    <line x1="0" y1="6" x2="40" y2="6" data-flow="" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
                    <path d="M40 2 L46 6 L40 10" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
              )}
            </li>
          );
        })}
      </ol>
      <div aria-hidden="true">
        <MockWindow title={b.crmWindow} badge={t.badge}>
          <div className="grid gap-px bg-mehi-border md:grid-cols-[1fr_1.4fr]">
            <dl className="grid grid-cols-2 gap-4 bg-white p-5">
              {b.fields.map(([label, value]) => (
                <div key={label}>
                  <dt className="text-[11px] font-medium text-mehi-text-secondary">{label}</dt>
                  <dd className="mt-1 text-sm font-semibold text-mehi-text">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="bg-white p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-mehi-text-secondary">
                {b.historyTitle}
              </p>
              <ol className="mt-3 space-y-3">
                {b.history.map(([when, what], index) => (
                  <li
                    key={when}
                    data-row=""
                    style={staggerStyle(index + 4)}
                    className={`flex gap-3 rounded-md px-3 py-2 text-xs leading-5 ${index === 0 ? "border border-mehi-slate bg-mehi-slate/10" : ""}`}
                  >
                    <span className="w-20 flex-none tabular-nums text-mehi-text-secondary">{when}</span>
                    <span className="text-mehi-text">{what}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </MockWindow>
      </div>
      <ArrowRight className="hidden" aria-hidden="true" />
    </figure>
  );
}

/** Tablero ilustrativo de cada página: la solución, cada tipo de cliente y el conocimiento. */
export function PageVisual({ pageId, locale }: { pageId: string; locale: Locale }) {
  switch (pageId) {
    case "plataforma":
      return <OperationDashboard locale={locale} />;
    case "ia-para-gobiernos":
      return <GovernmentPanel locale={locale} />;
    case "ia-para-contact-centers":
      return <ContactCenterPanel locale={locale} />;
    case "agentes-de-voz-ia":
      return <CrmFlow locale={locale} />;
    case "gestion-del-conocimiento":
      return <AnswerSource locale={locale} />;
    default:
      return null;
  }
}

export function hasPageVisual(pageId: string): boolean {
  return [
    "plataforma",
    "ia-para-gobiernos",
    "ia-para-contact-centers",
    "agentes-de-voz-ia",
    "gestion-del-conocimiento",
  ].includes(pageId);
}
