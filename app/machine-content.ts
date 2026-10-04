import { company, publicPages, site } from "./content.ts";
import * as en from "./content-en.ts";
import { homePath, pagePath } from "./i18n.ts";
import type { PublicPage } from "./content.ts";

export function llmsIndex(): string {
  return [
    "# MEHI",
    "",
    `> ${site.introduction}`,
    "",
    `Empresa: [${company.name}](${company.url}). ${company.relationship}`,
    "",
    "## Información oficial",
    "",
    ...publicPages.map(
      (page) =>
        `- [${page.title}](${site.url}/${page.slug}): ${page.description}`,
    ),
    `- [Preguntas frecuentes](${site.url}/#preguntas-frecuentes): alcance, contratación e integraciones.`,
    `- [Solicitar una demo](${site.url}/#contacto): contacto comercial.`,
    "",
    "## English",
    "",
    `> ${en.site.introduction}`,
    "",
    ...en.publicPages.map(
      (page) =>
        `- [${page.title}](${site.url}${pagePath("en", page.slug)}): ${page.description}`,
    ),
    `- [Frequently asked questions](${site.url}${homePath("en")}#preguntas-frecuentes): scope, hiring and integrations.`,
    `- [Request a demo](${site.url}${homePath("en")}#contacto): sales contact.`,
    "",
    "## Lectura completa",
    "",
    `- [Contenido público en texto](${site.url}/llms-full.txt): las mismas páginas y respuestas del sitio, sin scripts ni estilos. Incluye la versión en inglés.`,
    "",
    "Este índice facilita la lectura; no es un requisito de indexación ni garantiza menciones en respuestas de IA.",
    "",
  ].join("\n");
}

function pagesText(
  pages: PublicPage[],
  url: (page: PublicPage) => string,
  sourceLabel: string,
): string[] {
  return pages.flatMap((page) => [
    `## ${page.title}`,
    `${sourceLabel}: ${url(page)}`,
    "",
    page.introduction,
    "",
    ...[page.useCases, page.process].flatMap((block) =>
      block
        ? [
            `### ${block.heading}`,
            "",
            ...block.items.map((item) => `- ${item.title}: ${item.description}`),
            "",
          ]
        : [],
    ),
    ...page.sections.flatMap((section) => [
      `### ${section.heading}`,
      "",
      ...section.paragraphs.flatMap((text) => [text, ""]),
      ...(section.bullets ?? []).map((item) => `- ${item}`),
      "",
    ]),
    ...(page.example
      ? [
          `### ${page.example.heading}`,
          "",
          page.example.disclosure,
          "",
          page.example.context,
          "",
          ...page.example.steps.flatMap((step, index) => [
            `#### ${index + 1}. ${step.heading}`,
            "",
            ...step.lines.map((line) => `${line.speaker}: ${line.text}`),
            "",
            step.explanation,
            "",
          ]),
        ]
      : []),
  ]);
}

export function llmsFull(): string {
  return [
    "# MEHI — información pública",
    `Fuente: ${site.url}/`,
    "",
    site.introduction,
    "",
    company.description,
    `Sitio de la empresa: ${company.url}`,
    "",
    ...pagesText(publicPages, (page) => `${site.url}/${page.slug}`, "Fuente"),
    "## Preguntas frecuentes",
    `Fuente: ${site.url}/#preguntas-frecuentes`,
    "",
    ...site.faqs.flatMap((faq) => [`### ${faq.question}`, "", faq.answer, ""]),
    `Contacto comercial: ${site.url}/#contacto`,
    "",
    "# MEHI — public information (English)",
    `Source: ${site.url}${homePath("en")}`,
    "",
    en.site.introduction,
    "",
    en.company.description,
    `Company website: ${en.company.url}`,
    "",
    ...pagesText(
      en.publicPages,
      (page) => `${site.url}${pagePath("en", page.slug)}`,
      "Source",
    ),
    "## Frequently asked questions",
    `Source: ${site.url}${homePath("en")}#preguntas-frecuentes`,
    "",
    ...en.site.faqs.flatMap((faq) => [`### ${faq.question}`, "", faq.answer, ""]),
    `Sales contact: ${site.url}${homePath("en")}#contacto`,
    "",
  ].join("\n");
}

export function textResponse(body: string): Response {
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control":
        "public, max-age=0, s-maxage=3600, stale-while-revalidate=60",
      // Los buscadores deben priorizar las páginas HTML canónicas, sin impedir
      // que un asistente solicite y lea esta representación textual.
      "X-Robots-Tag": "noindex, follow",
    },
  });
}
