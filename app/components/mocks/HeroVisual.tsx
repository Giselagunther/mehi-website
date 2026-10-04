import { CallExample } from "../CallExample";
import { CountUp } from "./CountUp";
import { MockWindow } from "./MockKit";
import { derivedByHour, hourLabels, mockText, resolvedByHour } from "../../mock-text";
import type { Locale } from "../../ui-text";

/**
 * Portada: la llamada de ejemplo adelante y, detrás, un panel chico con datos
 * inventados. Las barras del panel crecen al cargar (animación de CSS con
 * `data-hero-bar`); en el celular sólo se ve la llamada.
 */
export function HeroVisual({ locale }: { locale: Locale }) {
  const t = mockText[locale];
  const h = t.hero;
  const max = Math.max(...resolvedByHour.map((value, index) => value + derivedByHour[index]));
  return (
    <div className="md:grid md:grid-cols-12 md:grid-rows-[auto_auto]">
      <div className="hidden md:col-span-9 md:col-start-4 md:row-start-1 md:block" aria-hidden="true">
        <MockWindow title={h.window} badge={t.badge} badgeShort={t.badgeShort} live={t.live}>
          <div className="grid grid-cols-3 gap-px bg-mehi-border">
            {h.kpis.map((kpi) => (
              <div key={kpi.label} className="bg-white px-4 py-3">
                <p className="text-[11px] font-medium text-mehi-text-secondary">{kpi.label}</p>
                <p className="mt-1 text-xl font-semibold tracking-tight text-mehi-text">
                  <CountUp value={kpi.value} format={kpi.format} locale={locale} />
                </p>
              </div>
            ))}
          </div>
          <div className="border-t border-mehi-border px-4 pb-4 pt-3">
            <p className="text-[11px] font-medium text-mehi-text-secondary">{h.chart}</p>
            <div className="mt-3 flex h-28 items-end gap-1.5">
              {hourLabels.map((label, index) => (
                <div key={label} className="flex h-full flex-1 flex-col justify-end">
                  <div
                    data-hero-bar=""
                    style={
                      {
                        "--i": index,
                        height: `${((resolvedByHour[index] + derivedByHour[index]) / max) * 100}%`,
                      } as React.CSSProperties
                    }
                    className="flex flex-col overflow-hidden rounded-sm"
                  >
                    <span
                      className="block bg-mehi-lavender"
                      style={{
                        height: `${(derivedByHour[index] / (resolvedByHour[index] + derivedByHour[index])) * 100}%`,
                      }}
                    />
                    <span className="block flex-1 bg-mehi-slate" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </MockWindow>
      </div>

      <div className="relative z-10 md:col-span-8 md:col-start-1 md:row-span-2 md:row-start-1 md:mt-44 md:rounded-md md:outline md:outline-8 md:outline-mehi-neutral">
        <CallExample locale={locale} />
      </div>
    </div>
  );
}
