import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";
import { site } from "../app/content.ts";
import {
  allPublicUrls as publicUrls,
  contentFor,
  htmlLang,
  languageAlternates,
  publicEntries,
  ui,
  type Locale,
} from "../app/i18n.ts";
import { llmsFull, llmsIndex } from "../app/machine-content.ts";

export function localeOf(url: string): Locale {
  const path = new URL(url).pathname;
  return path === "/en" || path.startsWith("/en/") ? "en" : "es";
}

function attribute(tag: string, key: string): string | undefined {
  return new RegExp(`\\b${key}="([^"]*)"`, "i").exec(tag)?.[1];
}

export function verifyHtml(
  html: string,
  canonical: string,
  languages?: Record<string, string>,
): string[] {
  const locale = localeOf(canonical);
  const head = /<head>([\s\S]*?)<\/head>/.exec(html)?.[1] ?? "";
  assert.ok(
    new RegExp(`<html[^>]+lang="${htmlLang[locale]}"`).test(html),
    `Falta idioma ${htmlLang[locale]}`,
  );
  assert.ok(/<title>[^<]+<\/title>/.test(head), "Falta título");
  const metas = head.match(/<meta\b[^>]*>/gi) ?? [];
  assert.ok(
    metas.some(
      (tag) =>
        attribute(tag, "name") === "description" && attribute(tag, "content"),
    ),
    "Falta descripción",
  );
  assert.ok(
    !metas.some(
      (tag) =>
        ["robots", "googlebot"].includes(attribute(tag, "name") ?? "") &&
        /noindex|none/.test(attribute(tag, "content") ?? ""),
    ),
    "noindex accidental",
  );
  const links = head.match(/<link\b[^>]*>/gi) ?? [];
  const canonicalTag = links.find(
    (tag) => attribute(tag, "rel") === "canonical",
  );
  const canonicalHref = canonicalTag && attribute(canonicalTag, "href");
  assert.ok(canonicalHref, "Falta URL canónica");
  // Next normaliza la raíz sin slash; ambas formas representan la misma URL.
  assert.equal(
    new URL(canonicalHref).href,
    new URL(canonical).href,
    "URL canónica incorrecta",
  );
  if (languages) {
    // Cada página declara todas sus versiones de idioma (y la de por defecto).
    const declared = Object.fromEntries(
      links
        .filter((tag) => attribute(tag, "rel") === "alternate" && attribute(tag, "hreflang"))
        .map((tag) => [attribute(tag, "hreflang")!, new URL(attribute(tag, "href")!).href]),
    );
    assert.deepEqual(
      declared,
      Object.fromEntries(
        Object.entries(languages).map(([lang, href]) => [lang, new URL(href).href]),
      ),
      "Versiones de idioma (hreflang) incorrectas",
    );
  }
  assert.equal(
    (html.match(/<h1(?:\s|>)/g) ?? []).length,
    1,
    "Debe haber un h1",
  );
  const blocks = Array.from(
    html.matchAll(
      /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
    ),
  );
  assert.ok(blocks.length, "Faltan datos estructurados");
  for (const block of blocks)
    assert.equal(JSON.parse(block[1])["@context"], "https://schema.org");
  const css = links
    .filter((tag) => attribute(tag, "rel") === "stylesheet")
    .map((tag) => attribute(tag, "href")!);
  assert.ok(css.length, "Falta CSS");
  return css;
}

/**
 * El sitio no dice quién es el dueño ni quién desarrolló MEHI (decisión de la CEO,
 * 3-oct-2026): ni en el texto, ni en los metadatos, ni en los datos estructurados.
 */
export const OWNER_PATTERN = /\bGIV\b|givsrl/i;

export function verifyBrandIdentity(html: string) {
  assert.ok(!OWNER_PATTERN.test(html), "El sitio no debe nombrar al dueño de MEHI");
  const entities: Record<string, unknown>[] = Array.from(
    html.matchAll(
      /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
    ),
  ).flatMap((block) => JSON.parse(block[1])["@graph"] ?? []);
  const organizations = entities.filter(
    (entity) => entity["@type"] === "Organization",
  );
  assert.equal(organizations.length, 1, "Debe identificarse una sola organización: MEHI");
  const [organization] = organizations;
  assert.equal(organization.name, site.name, "La organización debe ser MEHI");
  const service = entities.find((entity) => entity["@type"] === "Service");
  assert.ok(service, "Falta identificar el servicio");
  assert.equal(service.name, site.name, "Nombre del servicio incorrecto");
  assert.deepEqual(service.provider, { "@id": organization["@id"] });
}

export async function checkPublicSite(base = "http://localhost:3000") {
  const origin = new URL(base);
  assert.ok(
    ["localhost", "127.0.0.1", "www.mehi.ar"].includes(origin.hostname),
    "Host de verificación no autorizado",
  );
  const get = async (path: string) => {
    const response = await fetch(new URL(path, origin), {
      signal: AbortSignal.timeout(20_000),
      redirect: "manual",
    });
    assert.equal(response.status, 200, `HTTP ${response.status}: ${path}`);
    assert.ok(
      !/noindex|none/.test(response.headers.get("x-robots-tag") ?? "") ||
        path.endsWith(".txt") ||
        path === "/version.json",
      `Cabecera noindex: ${path}`,
    );
    return response;
  };
  const cssPaths = new Set<string>();
  const sharedImages = new Set<string>();
  for (const { url: canonical, languages } of publicEntries()) {
    const path = new URL(canonical).pathname;
    const locale = localeOf(canonical);
    const { site: localSite, publicPages } = contentFor(locale);
    const html = await (await get(path)).text();
    for (const css of verifyHtml(html, canonical, languages)) cssPaths.add(css);
    verifyBrandIdentity(html);
    // La imagen para compartir tiene que existir de verdad (no sólo estar declarada).
    const shareImageUrl = /<meta property="og:image" content="([^"]+)"/.exec(html)?.[1];
    assert.ok(shareImageUrl, `Falta la imagen para compartir: ${path}`);
    sharedImages.add(new URL(shareImageUrl).pathname);
    assert.ok(
      html.includes(localSite.tagline),
      "Falta la identidad visible de la marca en el pie",
    );
    const page = publicPages.find((item) => path.endsWith(`/${item.slug}`));
    if (page)
      assert.ok(
        html.includes(page.introduction),
        `Contenido no renderizado: ${path}`,
      );
    if (page?.example) {
      assert.ok(
        html.includes(page.example.disclosure),
        "Falta el aviso de ejemplo ficticio",
      );
      for (const step of page.example.steps) {
        assert.ok(
          html.includes(step.heading) && html.includes(step.explanation),
        );
        for (const line of step.lines)
          assert.ok(
            html.includes(line.text),
            "El ejemplo debe ser legible sin ejecutar scripts",
          );
      }
    }
    for (const tag of html.match(/<a\b[^>]*>/gi) ?? []) {
      const href = attribute(tag, "href");
      if (href?.startsWith("/") && !href.startsWith("//")) {
        const target = new URL(href, site.url);
        assert.ok(
          publicUrls().includes(`${target.origin}${target.pathname}`) ||
            ["/llms.txt", "/llms-full.txt"].includes(target.pathname),
          `Enlace interno sin destino público: ${href}`,
        );
      }
    }
    console.log(`OK ${path}: HTML, metadatos, JSON-LD, enlaces y contenido`);
  }
  for (const image of Array.from(sharedImages)) {
    const response = await get(image);
    assert.match(response.headers.get("content-type") ?? "", /image\/png/, image);
  }
  let cssBytes = 0;
  for (const path of Array.from(cssPaths))
    cssBytes += (await (await get(path)).arrayBuffer()).byteLength;
  assert.ok(cssBytes > 10_000, `CSS insuficiente: ${cssBytes}`);
  const robots = await (await get("/robots.txt")).text();
  assert.match(robots, /User-Agent: \*/i);
  assert.match(robots, /^Allow: \/$/m);
  assert.ok(!/^Disallow: \/$/m.test(robots), "Robots bloquea todo");
  assert.ok(robots.includes(`${site.url}/sitemap.xml`));
  const sitemapResponse = await get("/sitemap.xml");
  assert.match(sitemapResponse.headers.get("content-type") ?? "", /xml/);
  const sitemap = await sitemapResponse.text();
  assert.deepEqual(
    Array.from(sitemap.matchAll(/<loc>(.*?)<\/loc>/g)).map((match) => match[1]),
    publicUrls(),
  );
  for (const [path, expected] of [
    ["/llms.txt", llmsIndex()],
    ["/llms-full.txt", llmsFull()],
  ]) {
    const response = await get(path);
    assert.match(response.headers.get("content-type") ?? "", /text\/plain/);
    const text = await response.text();
    assert.equal(text, expected);
    assert.ok(!OWNER_PATTERN.test(text), `${path} no debe nombrar al dueño de MEHI`);
  }
  for (const path of [
    "/pagina-que-no-existe",
    "/dashboard",
    "/auth/login",
    "/en/page-that-does-not-exist",
    "/en/plataforma",
  ]) {
    const response = await fetch(new URL(path, origin), {
      signal: AbortSignal.timeout(20_000),
      redirect: "manual",
    });
    assert.equal(response.status, 404, `No debe publicarse ${path}`);
    const html = await response.text();
    assert.match(html, /name="robots" content="noindex/);
    // La página de error de MEHI tiene que venir armada en el HTML: el 404
    // genérico del framework o la «página en blanco hasta cargar JavaScript»
    // (html id="__next_error__") son regresiones.
    // (El texto también viaja en el payload de scripts: por eso se mira el <h1>.)
    assert.ok(!html.includes('id="__next_error__"'), `Página de error en blanco: ${path}`);
    assert.ok(
      new RegExp(`<h1[^>]*>${ui.es.notFound.heading}</h1>`).test(html),
      `Página de error sin contenido propio: ${path}`,
    );
  }
  for (const userAgent of [
    "OAI-SearchBot/1.4",
    "PerplexityBot/1.0",
    "Claude-SearchBot/1.0",
    "Googlebot/2.1",
    "bingbot/2.0",
  ]) {
    const response = await fetch(origin, {
      headers: { "User-Agent": userAgent },
      signal: AbortSignal.timeout(20_000),
      redirect: "manual",
    });
    assert.equal(response.status, 200, `HTTP para ${userAgent}`);
    verifyHtml(await response.text(), `${site.url}/`, languageAlternates());
  }
  const version = await (await get("/version.json")).json();
  if (process.env.MEHI_EXPECTED_SHA)
    assert.equal(
      version.commit,
      process.env.MEHI_EXPECTED_SHA,
      "Hash desplegado incorrecto",
    );
  console.log(
    JSON.stringify({
      pages: publicUrls().length,
      cssBytes,
      commit: version.commit,
      discovery: "OK",
      note: "User-Agent simulado; no prueba acceso desde IPs del proveedor ni indexación.",
    }),
  );
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  checkPublicSite(process.env.MEHI_CHECK_BASE_URL).catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
