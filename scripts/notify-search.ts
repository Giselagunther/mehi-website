import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { site, publicUrls } from "../app/content.ts";

export function createNotification(urls: string[], key: string) {
  assert.match(key, /^[a-f0-9]{32}$/);
  const allowed = new Set(publicUrls());
  const urlList = Array.from(new Set(urls));
  assert.ok(
    urlList.length && urlList.every((url) => allowed.has(url)),
    "Sólo se notifican páginas públicas canónicas",
  );
  return {
    host: new URL(site.url).host,
    key,
    keyLocation: `${site.url}/${key}.txt`,
    urlList,
  };
}

async function notifySearch() {
  const publicDir = new URL("../public/", import.meta.url);
  const files = (await readdir(publicDir)).filter((file) =>
    /^[a-f0-9]{32}\.txt$/.test(file),
  );
  assert.equal(
    files.length,
    1,
    "Debe existir un único desafío público IndexNow",
  );
  const key = (await readFile(new URL(files[0], publicDir), "utf8")).trim();
  assert.equal(files[0], `${key}.txt`);
  const payload = createNotification(publicUrls(), key);
  if (!process.argv.includes("--submit")) {
    console.log(
      JSON.stringify({
        mode: "dry-run",
        host: payload.host,
        urls: payload.urlList,
      }),
    );
    return;
  }
  const expectedSha = process.env.MEHI_EXPECTED_SHA;
  assert.match(
    expectedSha ?? "",
    /^[a-f0-9]{40}$/,
    "Se requiere hash esperado antes de notificar",
  );
  const get = async (url: string) => {
    const response = await fetch(url, {
      redirect: "manual",
      signal: AbortSignal.timeout(20_000),
    });
    assert.equal(
      response.status,
      200,
      `La página no está publicada: ${new URL(url).pathname}`,
    );
    return response;
  };
  const version = await (await get(`${site.url}/version.json`)).json();
  assert.equal(
    version.commit,
    expectedSha,
    "No notificar una versión todavía no desplegada",
  );
  assert.equal(
    (await (await get(payload.keyLocation)).text()).trim(),
    key,
    "Desafío no publicado",
  );
  for (const url of payload.urlList) await get(url);
  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(30_000),
  });
  assert.ok(
    [200, 202].includes(response.status),
    `IndexNow respondió HTTP ${response.status}`,
  );
  console.log(
    JSON.stringify({
      httpStatus: response.status,
      submittedUrls: payload.urlList,
      message:
        response.status === 202
          ? "URLs recibidas; validación de propiedad pendiente. No implica indexación."
          : "URLs recibidas. No implica indexación ni recomendaciones.",
    }),
  );
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  notifySearch().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
