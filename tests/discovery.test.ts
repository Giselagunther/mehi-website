import assert from "node:assert/strict";
import test from "node:test";
import {
  publicPages,
  findPublicPage,
  site,
  company,
} from "../app/content.ts";
import * as en from "../app/content-en.ts";
import { existsSync, readFileSync } from "node:fs";
import { visibleRelationship } from "../scripts/check-public-site.ts";
import {
  allPublicUrls as publicUrls,
  homeVideo,
  languageAlternates,
  translatedPath,
} from "../app/i18n.ts";
import sitemap from "../app/sitemap.ts";
import robots from "../app/robots.ts";
import {
  shareImage,
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
  for (const page of [...publicPages, ...en.publicPages]) {
    assert.match(page.slug, /^[a-z]+(?:-[a-z]+)*$/);
  }
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
    for (const block of [page.useCases, page.process]) {
      if (!block) continue;
      assert.ok(full.includes(block.heading));
      for (const item of block.items)
        assert.ok(full.includes(`- ${item.title}: ${item.description}`));
    }
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

test("cada página tiene su versión en inglés y las dos se declaran mutuamente", () => {
  assert.deepEqual(
    en.publicPages.map((page) => page.id),
    publicPages.map((page) => page.id),
    "Inglés y español deben tener las mismas páginas, en el mismo orden",
  );
  const englishSlugs = new Set(en.publicPages.map((page) => page.slug));
  assert.equal(englishSlugs.size, en.publicPages.length);
  for (const page of publicPages) {
    const english = en.publicPages.find((item) => item.id === page.id)!;
    assert.equal(english.audience, page.audience);
    assert.equal(english.sections.length, page.sections.length, page.id);
    english.sections.forEach((section, index) => {
      const spanish = page.sections[index];
      assert.equal(section.paragraphs.length, spanish.paragraphs.length, section.heading);
      assert.equal(section.bullets?.length, spanish.bullets?.length, section.heading);
    });
    assert.equal(Boolean(english.example), Boolean(page.example), page.id);
    assert.equal(english.kind, page.kind, page.id);
    assert.equal(Boolean(english.summary), Boolean(page.summary), page.id);
    assert.equal(english.useCases?.items.length, page.useCases?.items.length, page.id);
    assert.equal(english.process?.items.length, page.process?.items.length, page.id);
    assert.equal(translatedPath(page, "en"), `/en/${english.slug}`);
    assert.equal(translatedPath(english, "es"), `/${page.slug}`);
    assert.equal(
      pageMetadata(english, "en").alternates?.canonical,
      `${site.url}/en/${english.slug}`,
    );
    const alternates = languageAlternates(page);
    assert.deepEqual(languageAlternates(english), alternates);
    assert.deepEqual(alternates, {
      "es-AR": `${site.url}/${page.slug}`,
      en: `${site.url}/en/${english.slug}`,
      "x-default": `${site.url}/${page.slug}`,
    });
  }
  assert.equal(pageMetadata(undefined, "en").alternates?.canonical, `${site.url}/en`);
  assert.equal(en.site.faqs.length, site.faqs.length);
  assert.equal(en.company.name, company.name);
  assert.equal(en.company.url, company.url);
});

test("el ejemplo ficticio conserva su aviso también en inglés", () => {
  const government = en.publicPages.find((page) => page.id === "ia-para-gobiernos");
  assert.equal(government?.example?.kind, "fictional");
  assert.match(government!.example!.disclosure, /Fictional/);
  assert.match(government!.example!.disclosure, /not a real call or a live agent/);
});

test("la versión en inglés no quedó con texto en español", () => {
  const strings: string[] = [en.company.relationship, en.company.description];
  const collect = (value: unknown) => {
    if (typeof value === "string") strings.push(value);
    else if (Array.isArray(value)) value.forEach(collect);
    else if (value && typeof value === "object") Object.values(value).forEach(collect);
  };
  collect(en.site);
  for (const page of en.publicPages) {
    const { id: _id, slug: _slug, ...visible } = page;
    collect(visible);
  }
  const spanish = strings.filter((text) =>
    /[áéíóúñ¿¡]|\b(?:de|la|el|los|las|para|con|que|una|por|del)\b/i.test(text),
  );
  assert.deepEqual(spanish, []);
});

test("el video de cada idioma existe en public/ y su ficha apunta a esos archivos", () => {
  for (const [locale, video] of Object.entries(homeVideo)) {
    for (const path of [video.src, video.poster, video.captions]) {
      assert.ok(existsSync(new URL(`../public${path}`, import.meta.url)), `${locale}: falta ${path}`);
    }
    assert.match(video.durationIso, /^PT\d+M\d+S$/);
  }
  assert.notEqual(homeVideo.es.src, homeVideo.en.src);
  // El correo que MEHI le manda a cada interesado de la línea de demo
  // (backend/app/modules/public_demo/emails.py, repo MEHI) muestra esta portada y
  // enlaza a /#como-funciona. Si cambian, hay que cambiar ese correo también.
  assert.equal(homeVideo.es.poster, "/video/mehi-agente-de-voz.jpg");
  const home = readFileSync(new URL("../app/components/MarketingHome.tsx", import.meta.url), "utf8");
  assert.ok(home.includes('id="como-funciona"'), "Se perdió el ancla #como-funciona");
});

// Recomendación comercial (oct-2026): el visitante conoce MEHI. GIV va sólo en el
// pie y en los datos estructurados; KORENUS se nombra sólo donde se lo explica.
test("GIV no aparece fuera del pie y KORENUS sólo en la página que lo explica", () => {
  for (const content of [{ site, publicPages }, { site: en.site, publicPages: en.publicPages }]) {
    const visible = (value: unknown): string[] =>
      typeof value === "string"
        ? [value]
        : Array.isArray(value)
          ? value.flatMap(visible)
          : value && typeof value === "object"
            ? Object.values(value).flatMap(visible)
            : [];
    const siteText = visible(content.site);
    assert.deepEqual(siteText.filter((text) => /\bGIV\b|KORENUS/.test(text)), []);
    for (const page of content.publicPages) {
      const { id: _id, slug: _slug, ...rest } = page;
      const texts = visible(rest);
      assert.deepEqual(texts.filter((text) => /\bGIV\b/.test(text)), [], page.id);
      if (page.id !== "gestion-del-conocimiento")
        assert.deepEqual(texts.filter((text) => /KORENUS/.test(text)), [], page.id);
    }
  }
});

test("el menú es la solución y una página por tipo de cliente, cada una con su entrada", () => {
  for (const pages of [publicPages, en.publicPages]) {
    assert.deepEqual(
      pages.filter((page) => page.kind !== "resource").map((page) => page.id),
      ["plataforma", "ia-para-gobiernos", "ia-para-contact-centers", "agentes-de-voz-ia"],
    );
    for (const page of pages.filter((item) => item.kind === "audience")) {
      assert.ok(page.summary, `${page.id}: falta la frase de la portada`);
      assert.ok(page.useCases && page.useCases.items.length >= 3, page.id);
      assert.ok(page.process && page.process.items.length >= 3, page.id);
    }
  }
});

test("el pie muestra «MEHI es la plataforma de GIV» con GIV enlazado", () => {
  const html = `<p class="x" data-testid="company-relationship">MEHI is <!-- -->GIV<a href="${company.url}">GIV</a>&#x27;s</p>`;
  assert.equal(visibleRelationship(html), "MEHI is GIVGIV's");
  assert.equal(visibleRelationship("<p>nada</p>"), undefined);
});

test("cada página trae la imagen para compartir de su idioma, y el archivo existe", () => {
  for (const [locale, pages] of [["es", publicPages], ["en", en.publicPages]] as const) {
    const image = shareImage(locale);
    assert.ok(existsSync(new URL(`../public${image.url}`, import.meta.url)), image.url);
    for (const page of [undefined, ...pages]) {
      const metadata = pageMetadata(page, locale);
      assert.deepEqual(metadata.openGraph?.images, [image]);
      assert.equal((metadata.twitter as { card?: string })?.card, "summary_large_image");
    }
  }
});
