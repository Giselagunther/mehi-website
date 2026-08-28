import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";
import { company, publicPages, publicUrls, site } from "../app/content.ts";
import { llmsFull, llmsIndex } from "../app/machine-content.ts";

function attribute(tag: string, key: string): string | undefined {
  return new RegExp(`\\b${key}="([^"]*)"`, "i").exec(tag)?.[1];
}

export function verifyHtml(html: string, canonical: string): string[] {
  const head = /<head>([\s\S]*?)<\/head>/.exec(html)?.[1] ?? "";
  assert.ok(/<html[^>]+lang="es"/.test(html), "Falta idioma español");
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

export function verifyCompanyIdentity(html: string) {
  const entities: Record<string, unknown>[] = Array.from(
    html.matchAll(
      /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
    ),
  ).flatMap((block) => JSON.parse(block[1])["@graph"] ?? []);
  const companies = entities.filter(
    (entity) => entity["@type"] === "Organization",
  );
  assert.equal(
    companies.length,
    1,
    "Debe identificarse una empresa proveedora",
  );
  const provider = companies[0];
  assert.equal(provider.name, company.name, "Empresa proveedora incorrecta");
  assert.equal(provider.url, company.url, "Sitio de la empresa incorrecto");
  const platform = entities.find((entity) => entity["@type"] === "Service");
  assert.ok(platform, "Falta identificar la plataforma");
  assert.equal(platform.name, site.name, "Nombre de plataforma incorrecto");
  assert.deepEqual(platform.provider, { "@id": provider["@id"] });
  assert.notEqual(
    platform["@id"],
    provider["@id"],
    "Empresa y plataforma son entidades distintas",
  );
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
  for (const canonical of publicUrls()) {
    const path = new URL(canonical).pathname;
    const html = await (await get(path)).text();
    for (const css of verifyHtml(html, canonical)) cssPaths.add(css);
    verifyCompanyIdentity(html);
    assert.ok(
      html.includes(company.relationship),
      "Falta la identidad visible de la empresa",
    );
    const page = publicPages.find((item) => `/${item.slug}` === path);
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
    assert.equal(await response.text(), expected);
  }
  for (const path of ["/pagina-que-no-existe", "/dashboard", "/auth/login"]) {
    const response = await fetch(new URL(path, origin), {
      signal: AbortSignal.timeout(20_000),
      redirect: "manual",
    });
    assert.equal(response.status, 404, `No debe publicarse ${path}`);
    const html = await response.text();
    assert.match(html, /name="robots" content="noindex/);
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
    verifyHtml(await response.text(), `${site.url}/`);
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
