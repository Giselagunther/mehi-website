import assert from "node:assert/strict";
import test from "node:test";
import {
  publicPages,
  publicUrls,
  findPublicPage,
  site,
  company,
} from "../app/content.ts";
import sitemap from "../app/sitemap.ts";
import robots from "../app/robots.ts";
import {
  pageMetadata,
  organizationGraph,
  publicPageGraph,
  serializeJsonLd,
} from "../app/seo.ts";
import { llmsFull, llmsIndex, textResponse } from "../app/machine-content.ts";
import {
  verifyHtml,
  verifyCompanyIdentity,
} from "../scripts/check-public-site.ts";
import { createNotification } from "../scripts/notify-search.ts";

test("el sitemap contiene exactamente las páginas públicas canónicas, sin rutas privadas", () => {
  assert.equal(new Set(publicUrls()).size, publicUrls().length);
  assert.deepEqual(
    sitemap().map((page) => page.url),
    publicUrls(),
  );
  for (const page of publicPages) {
    assert.match(page.slug, /^[a-z]+(?:-[a-z]+)*$/);
    assert.equal(findPublicPage(page.slug), page);
    assert.equal(
      pageMetadata(page).alternates?.canonical,
      `${site.url}/${page.slug}`,
    );
  }
  assert.equal(findPublicPage("dashboard"), undefined);
  assert.equal(findPublicPage("llms.txt"), undefined);
  assert.equal(pageMetadata().alternates?.canonical, `${site.url}/`);
});

test("producción permite rastreo sin bloquear recursos; los previews no se indexan", () => {
  const previous = process.env.VERCEL_ENV;
  try {
    process.env.VERCEL_ENV = "production";
    assert.deepEqual(robots(), {
      rules: {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/auth/", "/dashboard/"],
      },
      sitemap: `${site.url}/sitemap.xml`,
    });
    process.env.VERCEL_ENV = "preview";
    assert.deepEqual(robots(), { rules: { userAgent: "*", disallow: "/" } });
  } finally {
    if (previous === undefined) delete process.env.VERCEL_ENV;
    else process.env.VERCEL_ENV = previous;
  }
});

test("la lectura de IA incluye el contenido real de cada página, sin otra versión editorial", () => {
  const full = llmsFull();
  const index = llmsIndex();
  for (const page of publicPages) {
    assert.ok(index.includes(`${site.url}/${page.slug}`));
    assert.ok(full.includes(page.introduction));
    for (const section of page.sections) {
      assert.ok(full.includes(section.heading));
      for (const text of [...section.paragraphs, ...(section.bullets ?? [])])
        assert.ok(full.includes(text));
    }
    if (page.example) {
      assert.equal(page.example.kind, "fictional");
      assert.ok(full.includes(page.example.disclosure));
      assert.ok(full.includes(page.example.context));
      for (const step of page.example.steps) {
        assert.ok(
          full.includes(step.heading) && full.includes(step.explanation),
        );
        for (const line of step.lines)
          assert.ok(full.includes(`${line.speaker}: ${line.text}`));
      }
    }
  }
  for (const faq of site.faqs) assert.ok(full.includes(faq.answer));
  assert.ok(
    Buffer.byteLength(full) < 100_000,
    "La lectura rápida debe seguir siendo liviana",
  );
  assert.equal(
    textResponse(full).headers.get("content-type"),
    "text/plain; charset=utf-8",
  );
});

test("el marcado enlaza identidades estables y no inventa precios ni reseñas", () => {
  const organization = organizationGraph();
  const ids = organization["@graph"].map((entity) => entity["@id"]);
  assert.equal(new Set(ids).size, ids.length);
  const provider = organization["@graph"].find(
    (entity) => entity["@type"] === "Organization",
  );
  const platform = organization["@graph"].find(
    (entity) => entity["@type"] === "Service",
  );
  assert.equal(provider?.name, "GIV");
  assert.equal(provider?.url, company.url);
  assert.equal(platform?.name, "MEHI");
  assert.deepEqual(platform?.provider, { "@id": provider?.["@id"] });
  assert.equal(
    provider?.logo,
    undefined,
    "No atribuir a la empresa el logo de la plataforma",
  );
  assert.equal(platform?.logo, `${site.url}/logo-mehi.svg`);
  assert.ok(
    !JSON.stringify(organization).match(
      /aggregateRating|reviewCount|priceCurrency/,
    ),
  );
  for (const page of publicPages) {
    const graph = publicPageGraph(page)["@graph"];
    assert.equal(graph[0].url, `${site.url}/${page.slug}`);
    assert.equal(
      graph[1].itemListElement?.[1].item,
      `${site.url}/${page.slug}`,
    );
  }
});

test("gobiernos agrega una evaluación propia sin retirar las páginas empresariales", () => {
  for (const slug of [
    "plataforma",
    "agentes-de-voz-ia",
    "ia-para-contact-centers",
    "gestion-del-conocimiento",
    "como-elegir-ia-para-atencion-al-cliente",
  ])
    assert.ok(findPublicPage(slug), `Se perdió una URL existente: ${slug}`);
  const government = findPublicPage("ia-para-gobiernos");
  assert.equal(government?.audience, "government");
  assert.ok(
    government?.example,
    "La página debe explicar el recorrido ilustrativo",
  );
  assert.match(government.example.disclosure, /ficticio/);
  assert.match(
    government.example.disclosure,
    /No es una llamada real ni un agente activo/,
  );
  assert.equal(
    findPublicPage("como-evaluar-ia-para-atencion-ciudadana")?.audience,
    "government",
  );
});

test("el smoke detecta confundir la plataforma con la empresa proveedora", () => {
  const json = JSON.stringify(organizationGraph());
  const html = `<script type="application/ld+json">${json}</script>`;
  assert.doesNotThrow(() => verifyCompanyIdentity(html));
  assert.throws(
    () => verifyCompanyIdentity(html.replace('"name":"GIV"', '"name":"MEHI"')),
    /Empresa proveedora/,
  );
  assert.throws(
    () =>
      verifyCompanyIdentity('<script type="application/ld+json">{}</script>'),
    /empresa proveedora/,
  );
});

test("el JSON-LD no permite cerrar script con contenido editorial", () => {
  const value = { text: "</script><script>alert(1)</script>" };
  const encoded = serializeJsonLd(value);
  assert.ok(!encoded.includes("<"));
  assert.deepEqual(JSON.parse(encoded), value);
});

test("el smoke detecta noindex accidental y canónicas de otra página", () => {
  const html = `<html lang="es"><head><title>MEHI</title><meta name="description" content="Descripción"><meta name="robots" content="index, follow"><link rel="canonical" href="${site.url}/"><link rel="stylesheet" href="/styles.css"></head><body><h1>MEHI</h1><script type="application/ld+json">{"@context":"https://schema.org"}</script></body></html>`;
  assert.doesNotThrow(() => verifyHtml(html, `${site.url}/`));
  assert.throws(
    () => verifyHtml(html.replace("index, follow", "noindex"), `${site.url}/`),
    /noindex/,
  );
  assert.throws(() => verifyHtml(html, `${site.url}/plataforma`), /canónica/);
});

test("IndexNow sólo acepta nuestras páginas públicas y deduplica URLs", () => {
  const key = "a".repeat(32);
  const payload = createNotification([...publicUrls(), publicUrls()[0]], key);
  assert.deepEqual(payload.urlList, publicUrls());
  assert.throws(() =>
    createNotification(["https://app.mehi.ar/dashboard"], key),
  );
  assert.throws(() =>
    createNotification([`${site.url}/?email=persona@example.com`], key),
  );
  assert.throws(() => createNotification([`${site.url}/dashboard`], key));
  assert.throws(() => createNotification(publicUrls(), "invalid"));
});
