import type { CSSProperties, ReactNode } from "react";

import { CountUp } from "./CountUp";
import type { Kpi, Share } from "../../mock-text";

// Piezas de los tableros ilustrativos. Las animaciones son de CSS (globals.css):
// `data-bar`, `data-hbar`, `data-draw`, `data-donut` y `data-row` crecen o aparecen
// cuando su bloque `data-reveal` entra en pantalla. Sin JS se ven completas.

type Locale = "es" | "en";

const delay = (index: number) => ({ "--i": index }) as CSSProperties;

/** Ventana de la aplicación: barra superior con título y el rótulo de ejemplo. */
export function MockWindow({
  title,
  badge,
  badgeShort,
  live,
  children,
  className = "",
}: {
  title: string;
  badge: string;
  /** Versión corta del rótulo para pantallas chicas. */
  badgeShort?: string;
  live?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-md border border-mehi-border bg-white ${className}`}>
      <div className="flex items-center justify-between gap-3 border-b border-mehi-border bg-white px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="h-2.5 w-2.5 flex-none rounded-full bg-mehi-border" />
          <span className="h-2.5 w-2.5 flex-none rounded-full bg-mehi-border" />
          <span className="h-2.5 w-2.5 flex-none rounded-full bg-mehi-border" />
          <span className="ml-2 truncate text-xs font-semibold text-mehi-text">{title}</span>
        </div>
        <div className="flex flex-none items-center gap-2">
          {live && (
            <span className="hidden items-center gap-1.5 text-[11px] font-medium text-mehi-text-secondary sm:inline-flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mehi-plum" />
              {live}
            </span>
          )}
          <span className="rounded-sm border border-mehi-border px-2 py-0.5 text-[11px] font-medium text-mehi-text-secondary">
            {badgeShort ? (
              <>
                <span className="sm:hidden">{badgeShort}</span>
                <span className="hidden sm:inline">{badge}</span>
              </>
            ) : (
              badge
            )}
          </span>
        </div>
      </div>
      {children}
    </div>
  );
}

/** Línea de tendencia chica, dibujada con un trazo que se «escribe». */
export function Sparkline({ values, className = "" }: { values: number[]; className?: string }) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * 100;
      const y = 28 - ((value - min) / (max - min || 1)) * 24;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg viewBox="0 0 100 30" preserveAspectRatio="none" className={`h-8 w-full ${className}`} aria-hidden="true">
      <polyline
        points={points}
        pathLength={1}
        data-draw=""
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function KpiTile({ kpi, locale }: { kpi: Kpi; locale: Locale }) {
  return (
    <div className="rounded-md border border-mehi-border bg-white p-4">
      <p className="text-xs font-medium text-mehi-text-secondary">{kpi.label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-mehi-text">
        <CountUp value={kpi.value} format={kpi.format} locale={locale} />
      </p>
      <p className="mt-1 text-xs text-mehi-text-secondary">{kpi.note}</p>
      <Sparkline values={kpi.trend} className="mt-3 text-mehi-slate" />
    </div>
  );
}

/** Barras apiladas por hora: lo que resolvió el agente y lo que pasó al equipo. */
export function StackedBars({
  labels,
  primary,
  secondary,
  className = "h-40",
}: {
  labels: string[];
  primary: number[];
  secondary: number[];
  className?: string;
}) {
  const max = Math.max(...primary.map((value, index) => value + secondary[index]));
  return (
    <div aria-hidden="true">
      <div className={`flex items-end gap-1.5 sm:gap-2 ${className}`}>
        {labels.map((label, index) => (
          <div key={label} className="flex h-full flex-1 flex-col justify-end">
            <div
              data-bar=""
              style={{
                ...delay(index),
                height: `${((primary[index] + secondary[index]) / max) * 100}%`,
              }}
              className="flex flex-col overflow-hidden rounded-sm"
            >
              <span
                className="block bg-mehi-lavender"
                style={{
                  height: `${(secondary[index] / (primary[index] + secondary[index])) * 100}%`,
                }}
              />
              <span className="block flex-1 bg-mehi-slate" />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-1.5 sm:gap-2">
        {labels.map((label, index) => (
          <span
            key={label}
            className={`flex-1 text-center text-[10px] tabular-nums text-mehi-text-secondary ${index % 2 ? "invisible sm:visible" : ""}`}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Lista de barras horizontales con porcentaje. */
export function ShareBars({ items, tone = "slate" }: { items: Share[]; tone?: "slate" | "lavender" }) {
  const isSlate = tone === "slate";
  return (
    <ul className="space-y-3" aria-hidden="true">
      {items.map(([label, percent], index) => (
        <li key={label}>
          <div className="flex items-baseline justify-between gap-3 text-xs">
            <span className="truncate text-mehi-text">{label}</span>
            <span className="tabular-nums text-mehi-text-secondary">{percent}%</span>
          </div>
          <div className="mt-1.5 h-2 rounded-sm bg-mehi-neutral">
            <div
              data-hbar=""
              style={{ ...delay(index), width: `${percent * (100 / items[0][1])}%` }}
              className={`h-2 rounded-sm ${isSlate ? "bg-mehi-slate" : "bg-mehi-lavender"}`}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

const donutColors = ["stroke-mehi-slate", "stroke-mehi-lavender", "stroke-mehi-text", "stroke-mehi-lila"];
const swatchColors = ["bg-mehi-slate", "bg-mehi-lavender", "bg-mehi-text", "bg-mehi-lila"];

/** Anillo de reparto (suma 100) con su leyenda. */
export function Donut({ items, centerLabel }: { items: Share[]; centerLabel?: string }) {
  let offset = 0;
  return (
    <div className="flex items-center gap-5" aria-hidden="true">
      <div className="relative h-28 w-28 flex-none">
        <svg viewBox="0 0 42 42" className="h-28 w-28 -rotate-90">
          <circle cx="21" cy="21" r="15.915" fill="none" strokeWidth="6" className="stroke-mehi-neutral" />
          {items.map(([label, percent], index) => {
            const segment = (
              <circle
                key={label}
                cx="21"
                cy="21"
                r="15.915"
                fill="none"
                strokeWidth="6"
                pathLength={100}
                data-donut=""
                className={donutColors[index % donutColors.length]}
                style={
                  {
                    "--dash": `${Math.max(percent - 1, 0)} ${100 - Math.max(percent - 1, 0)}`,
                    "--i": index,
                    strokeDashoffset: -offset,
                  } as CSSProperties
                }
              />
            );
            offset += percent;
            return segment;
          })}
        </svg>
        {centerLabel && (
          <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-mehi-text">
            {centerLabel}
          </span>
        )}
      </div>
      <ul className="min-w-0 flex-1 space-y-2 text-xs">
        {items.map(([label, percent], index) => (
          <li key={label} className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 flex-none rounded-sm ${swatchColors[index % swatchColors.length]}`} />
            <span className="flex-1 truncate text-mehi-text">{label}</span>
            <span className="tabular-nums text-mehi-text-secondary">{percent}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function StatusChip({ tone, children }: { tone: "slate" | "lavender"; children: ReactNode }) {
  const isSlate = tone === "slate";
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-sm px-2 py-0.5 text-[11px] font-medium text-mehi-text ${
        isSlate ? "bg-mehi-slate/15" : "bg-mehi-lavender/50"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${isSlate ? "bg-mehi-slate" : "bg-mehi-lila"}`} />
      {children}
    </span>
  );
}

export function Legend({ items }: { items: [label: string, swatch: string][] }) {
  return (
    <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-mehi-text-secondary" aria-hidden="true">
      {items.map(([label, swatch]) => (
        <li key={label} className="inline-flex items-center gap-1.5">
          <span className={`h-2 w-2 rounded-sm ${swatch}`} />
          {label}
        </li>
      ))}
    </ul>
  );
}

export { delay as staggerStyle };
