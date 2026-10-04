import { BellRing, Check, Minus } from "lucide-react";

import {
  KpiTile,
  Legend,
  MockWindow,
  ShareBars,
  StackedBars,
  StatusChip,
  staggerStyle,
} from "./MockKit";
import { derivedByHour, hourLabels, mockText, resolvedByHour } from "../../mock-text";
import type { Locale } from "../../ui-text";

/** Panel de la operación con datos inventados: lo que ve el equipo de cada organización. */
export function OperationDashboard({ locale }: { locale: Locale }) {
  const t = mockText[locale];
  const d = t.dashboard;
  return (
    <figure role="img" aria-label={d.aria} data-reveal="">
      <MockWindow title={d.window} badge={t.badge} live={t.live}>
        <div className="bg-mehi-neutral p-4 sm:p-6" aria-hidden="true">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-lg font-semibold text-mehi-text">{d.heading}</p>
              <p className="mt-1 text-xs text-mehi-text-secondary">{d.subheading}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden items-center gap-1.5 rounded-sm border border-mehi-lavender bg-white px-2.5 py-1 text-[11px] font-medium text-mehi-text md:inline-flex">
                <BellRing className="h-3.5 w-3.5 text-mehi-plum" />
                {d.alerts}
              </span>
              <div className="inline-flex rounded-md border border-mehi-border bg-white p-0.5 text-[11px] font-medium">
                {d.ranges.map((range, index) => (
                  <span
                    key={range}
                    className={`rounded-sm px-2.5 py-1 ${index === 0 ? "bg-mehi-neutral text-mehi-plum" : "text-mehi-text-secondary"}`}
                  >
                    {range}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {d.kpis.map((kpi) => (
              <KpiTile key={kpi.label} kpi={kpi} locale={locale} />
            ))}
          </div>

          <div className="mt-3 grid gap-3 lg:grid-cols-[1.6fr_1fr]">
            <div className="rounded-md border border-mehi-border bg-white p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-mehi-text">{d.byHourTitle}</p>
                <Legend
                  items={[
                    [d.resolved, "bg-mehi-slate"],
                    [d.derived, "bg-mehi-lavender"],
                  ]}
                />
              </div>
              <StackedBars
                labels={hourLabels}
                primary={resolvedByHour}
                secondary={derivedByHour}
                className="mt-4 h-40 sm:h-48"
              />
            </div>
            <div className="rounded-md border border-mehi-border bg-white p-4">
              <p className="mb-4 text-sm font-semibold text-mehi-text">{d.reasonsTitle}</p>
              <ShareBars items={d.reasons} />
            </div>
          </div>

          <div className="mt-3 overflow-hidden rounded-md border border-mehi-border bg-white">
            <p className="border-b border-mehi-border px-4 py-3 text-sm font-semibold text-mehi-text">
              {d.recentTitle}
            </p>
            <table className="w-full text-left text-xs">
              <thead className="text-mehi-text-secondary">
                <tr className="border-b border-mehi-border">
                  {d.columns.map((column, index) => (
                    <th
                      key={column}
                      className={`px-4 py-2 font-medium ${index === 3 ? "hidden text-right sm:table-cell" : ""}`}
                    >
                      {column}
                    </th>
                  ))}
                  <th className="hidden w-10 px-4 py-2 sm:table-cell" />
                </tr>
              </thead>
              <tbody>
                {d.rows.map(([time, reason, outcome, duration], index) => (
                  <tr
                    key={time}
                    data-row=""
                    style={staggerStyle(index)}
                    className="border-b border-mehi-border last:border-b-0"
                  >
                    <td className="px-4 py-2.5 tabular-nums text-mehi-text-secondary">{time}</td>
                    <td className="px-4 py-2.5 text-mehi-text">{reason}</td>
                    <td className="px-4 py-2.5">
                      <StatusChip tone={outcome === "resolved" ? "slate" : "lavender"}>
                        {outcome === "resolved" ? d.resolvedChip : d.derivedChip}
                      </StatusChip>
                    </td>
                    <td className="hidden px-4 py-2.5 text-right tabular-nums text-mehi-text-secondary sm:table-cell">
                      {duration}
                    </td>
                    <td className="hidden px-4 py-2.5 text-mehi-slate sm:table-cell">
                      {index < 2 ? <Check className="h-4 w-4" /> : <Minus className="h-4 w-4 text-mehi-border" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </MockWindow>
    </figure>
  );
}
