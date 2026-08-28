# Visibilidad de MEHI en buscadores y asistentes

## Alcance

El sitio comercial es `https://www.mehi.ar`. GIV es la empresa que ofrece MEHI; MEHI es la plataforma. La aplicación y los datos de clientes siguen separados en `app.mehi.ar`. La web pública describe la oferta para gobiernos, organismos públicos, empresas y contact centers: agentes de voz IA, atención humana, conocimiento institucional y supervisión. No publica datos operativos, clientes, resultados, precios ni certificaciones no acreditados.

## Fuente única y estructura

- `app/content.ts`: identidad de GIV y MEHI, información pública, páginas, preguntas frecuentes y ejemplo ficticio.
- `app/seo.ts`: metadatos y entidades estructuradas, con canónica propia por página.
- `app/[slug]/page.tsx`: sólo genera los slugs explícitos del catálogo. El resto devuelve 404.
- `app/components/PublicContent.tsx`: presentación de soluciones, guía y preguntas.
- `app/robots.ts`, `app/sitemap.ts`: rastreo y catálogo de URLs canónicas.
- `app/machine-content.ts`: versiones en texto desde el mismo contenido del HTML.
- `/llms.txt`: índice breve; `/llms-full.txt`: lectura pública completa sin scripts.
- `/version.json`: hash del build, para verificar la publicación antes de notificar.
- `scripts/`: comprobaciones HTTP y notificación IndexNow.
- `tests/`: regresiones de contacto, descubrimiento y clases Tailwind.
- `.github/workflows/`: controles de PR y notificación después de un despliegue exitoso.

No se crean páginas para cada combinación de palabras clave. Cada página debe responder una necesidad de compra diferente con información útil. Los datos estructurados no incluyen reseñas, ahorros ni precios inventados.

## Identidad, gobiernos y límites editoriales

`Organization` identifica a GIV; `Service` identifica a MEHI y referencia a GIV como proveedor. El sitio y las páginas conservan su identidad MEHI y señalan a GIV como editor. El logo MEHI corresponde a la plataforma, no se atribuye a la empresa. No se inventan razón social completa, domicilio, identificadores fiscales ni certificaciones.

`/ia-para-gobiernos` explica la propuesta de atención ciudadana. `/como-evaluar-ia-para-atencion-ciudadana` contiene una guía de evaluación técnica y operativa, no asesoramiento de contratación. Las URLs empresariales existentes se conservan.

El recorrido de la página para gobiernos es **ficticio y de sólo lectura**: abrir los pasos muestra texto estático, no llama a un modelo ni deriva a un operador. Su aviso, contexto y contenido se incluyen también en `llms-full.txt`; los tests y el smoke comprueban que el aviso no desaparezca. No se presenta como una llamada, una prueba de integración ni un caso de cliente.

Antes de incorporar antecedentes, testimonios, métricas, capturas, audios o logos de clientes, verificar evidencia y autorización específica. Un caso sin nombre también puede identificar a un cliente por sus detalles. No copiar material operativo ni información confidencial en este repositorio público, incluidos comentarios, tests, documentación y descripciones de PR. Una referencia desde GIV explica la identidad empresarial y no se presenta como una recomendación independiente.

## Política de rastreo

La política general permite rastrear el contenido público, incluyendo Googlebot, Bingbot, OAI-SearchBot, PerplexityBot y Claude-SearchBot. No se bloquean CSS ni JavaScript. Los previews de Vercel tienen `noindex` y robots restrictivo.

No se alteró la política previa de entrenamiento: antes no había `robots.txt`. Búsqueda, acceso solicitado por usuarios y entrenamiento son controles distintos; no se necesita habilitar entrenamiento para aparecer en búsquedas. El archivo de robots nunca sustituye autenticación ni permisos.

Las representaciones en texto llevan `X-Robots-Tag: noindex, follow` para priorizar las páginas HTML en resultados; siguen disponibles para lectura directa. `llms.txt` es una ayuda opcional, no un requisito ni una garantía de menciones.

## Verificación

```bash
npm ci
npm run build
npm run lint
npm run start
```

Desde otra terminal:

```bash
npm run test:public
npm run notify:search
```

`test:public` comprueba HTTP, HTML prerenderizado, idioma, títulos, descripciones, canónicas, JSON-LD, identidad empresa/plataforma, enlaces, sitemap, archivos de texto y respuestas 404. Verifica también el aviso del ejemplo ficticio, su lectura sin scripts, CSS servido de más de 10.000 bytes y respuestas con diferentes User-Agent. Esta última prueba **no** demuestra acceso desde las IP de los proveedores ni indexación.

La suite ejecutada en cada build incluye un guard que consulta al compilador Tailwind instalado para detectar clases inválidas, y mantiene los tests previos del formulario de contacto. No se envían formularios reales para probar la web.

## Publicación y descubrimiento

Vercel publica desde `main`. Obtener el hash de merge en GitHub y comprobarlo en Vercel y en `/version.json` antes del smoke de producción. Railway no interviene en el despliegue de este repositorio.

```bash
MEHI_CHECK_BASE_URL=https://www.mehi.ar MEHI_EXPECTED_SHA=<hash_del_merge> npm run test:public
MEHI_EXPECTED_SHA=<hash_del_merge> npm run notify:search -- --submit
```

Sin `--submit`, el comando es de solo lectura. Con envío, exige el hash exacto servido, verifica la propiedad y la disponibilidad de las URLs. Únicamente permite el catálogo público; rechaza parámetros, hosts de la aplicación y rutas no aprobadas. El archivo hexadecimal de `public/` es un desafío de propiedad público del protocolo, no una credencial de la plataforma. Se reutiliza, no se genera en cada ejecución.

El workflow de descubrimiento hace esas comprobaciones tras un evento de despliegue `Production` exitoso. IndexNow comparte las URLs con buscadores participantes; HTTP 200 significa recibido y 202 significa validación pendiente. **Ninguno significa indexado ni recomendado.** No se hacen envíos periódicos innecesarios.

Google no usa IndexNow: el sitemap se anuncia en robots y se registra en Search Console con la propiedad existente. No usar el antiguo endpoint de ping de Google ni su Indexing API para estas páginas comerciales.

La redirección del dominio `mehi.ar` a `www.mehi.ar` se gestiona en Vercel. Debe mantener la ruta y usar un código permanente 308 si se cambia desde el temporal anterior; no modificar DNS, correo ni subdominios de la aplicación.

## Medición y límites

En Search Console revisar indexación, páginas y consultas; comparar series diarias con las fechas de publicación marcadas. Consultas iniciales para evaluar presencia: nombre MEHI, plataforma de GIV, IA para atención ciudadana, agentes de voz para gobiernos, agentes de voz IA para empresas, IA para contact centers y conocimiento institucional para atención al cliente. Las preguntas de evaluación de recomendaciones no deben incluir la marca para inducir su mención.

Una comprobación de respuestas de IA debe registrar fecha, producto, consulta exacta, modo con búsqueda y URLs realmente citadas. Una respuesta aislada o personalizada no demuestra posicionamiento general. No se confunden visitas de bots con compradores ni se inventan métricas de recomendaciones.

No se agregó un rastreador de usuarios, cookies de publicidad ni un servicio de pago. La medición disponible en buscadores depende de sus accesos y de la acumulación de datos. Los resultados reales, los casos de clientes autorizados y las menciones externas legítimas son trabajo comercial continuo: no se fabrican para SEO.

## Referencias

- [Google: funciones de IA y tu sitio](https://developers.google.com/search/docs/appearance/ai-features).
- [Google: crear y enviar sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).
- [OpenAI: rastreadores](https://developers.openai.com/api/docs/bots).
- [Perplexity: rastreadores](https://docs.perplexity.ai/docs/resources/perplexity-crawlers).
- [Anthropic: controles de rastreo](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler).
- [IndexNow: protocolo y respuestas](https://www.indexnow.org/documentation).
