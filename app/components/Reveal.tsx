"use client";

import { useEffect } from "react";

/**
 * Aparición suave de los bloques marcados con `data-reveal` al bajar la página.
 * Sin JavaScript (o con «reducir movimiento») todo se ve igual, quieto: el
 * contenido nunca depende de la animación para estar visible, ni para los
 * buscadores. Lo que ya está en pantalla al cargar se muestra sin animar.
 */
export function Reveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-revealed", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    for (const element of elements) {
      if (element.getBoundingClientRect().top < window.innerHeight) {
        element.setAttribute("data-revealed", "");
      } else {
        observer.observe(element);
      }
    }
    document.documentElement.setAttribute("data-reveal-ready", "");
    return () => observer.disconnect();
  }, []);
  return null;
}
