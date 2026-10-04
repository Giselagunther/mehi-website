"use client";

import { useEffect, useRef, useState } from "react";

import type { KpiFormat } from "../../mock-text";

export function formatMockValue(value: number, format: KpiFormat, locale: "es" | "en"): string {
  if (format === "percent") return `${Math.round(value)}%`;
  if (format === "duration") {
    const total = Math.round(value);
    return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
  }
  return new Intl.NumberFormat(locale === "es" ? "es-AR" : "en-US", {
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

/**
 * Número de los tableros ilustrativos que cuenta hasta su valor cuando aparece en
 * pantalla. El HTML trae el valor final (se lee igual sin JavaScript); con «reducir
 * movimiento» no anima.
 */
export function CountUp({
  value,
  format,
  locale,
  duration = 1400,
}: {
  value: number;
  format: KpiFormat;
  locale: "es" | "en";
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;
    let frame = 0;
    // Los formatos de duración arrancan de un valor alto (bajan), el resto sube desde 0.
    const from = format === "duration" ? value * 1.6 : 0;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        setShown(from + (value - from) * eased);
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };
    setShown(from);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        run();
      },
      { threshold: 0.4 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, format, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {formatMockValue(shown, format, locale)}
    </span>
  );
}
