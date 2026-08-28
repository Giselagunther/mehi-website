import { company, publicPages, site } from "./content.ts";

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
    "## Lectura completa",
    "",
    `- [Contenido público en texto](${site.url}/llms-full.txt): las mismas páginas y respuestas del sitio, sin scripts ni estilos.`,
    "",
    "Este índice facilita la lectura; no es un requisito de indexación ni garantiza menciones en respuestas de IA.",
    "",
  ].join("\n");
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
    ...publicPages.flatMap((page) => [
      `## ${page.title}`,
      `Fuente: ${site.url}/${page.slug}`,
      "",
      page.introduction,
      "",
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
    ]),
    "## Preguntas frecuentes",
    `Fuente: ${site.url}/#preguntas-frecuentes`,
    "",
    ...site.faqs.flatMap((faq) => [`### ${faq.question}`, "", faq.answer, ""]),
    `Contacto comercial: ${site.url}/#contacto`,
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
