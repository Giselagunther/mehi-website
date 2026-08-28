import assert from "node:assert/strict";
import test from "node:test";
import {
  publicPages,
  publicUrls,
  findPublicPage,
  site,
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
import { verifyHtml } from "../scripts/check-public-site.ts";
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
