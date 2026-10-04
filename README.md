# mehi-website

Web comercial de [MEHI](https://www.mehi.ar), plataforma de agentes de voz con IA para gobiernos, organismos públicos, empresas y contact centers. Este repositorio no contiene la plataforma privada de clientes.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Inter, servida localmente mediante `next/font`
- Iconos de `lucide-react`
- Node.js 22 o superior para los tests con TypeScript nativo

## Correr local

```bash
npm ci
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Build de producción

```bash
npm run build
npm run start
```

## Publicación

Vercel publica desde `main` en el proyecto existente `mehi-website`. El build ejecuta los tests antes de compilar. Las PR también verifican el HTML servido por el build. Después del merge, comprobar el hash en Vercel y `/version.json`; no dar por publicado sólo porque pasó CI.

El formulario conserva el servicio de contacto existente. `NEXT_PUBLIC_CONTACT_API_URL` permite configurar su destino; no envíes formularios a producción durante tests. Vercel aporta `VERCEL_GIT_COMMIT_SHA` y `VERCEL_ENV`; para verificar un build local se puede indicar `MEHI_BUILD_SHA`.

No recrear proyectos, modificar registros MX ni tocar los subdominios de la aplicación para publicar esta web. La redirección del dominio sin `www` se configura en Vercel.

## Estructura

```
app/content.ts                Contenido público en español, compartido por HTML y texto
app/content-en.ts             El mismo contenido en inglés (mismas páginas, emparejadas por id)
app/i18n.ts, app/ui-text.ts   Idiomas, rutas por idioma, hreflang y textos de interfaz
app/layout.tsx                Layout raíz de paso (el <html> lo arma cada idioma)
app/(es)/, app/(en)/en/       Español en la raíz; inglés bajo /en, con su propio <html lang>
app/not-found.tsx             Página de error única, en español con salida al inglés
app/components/MarketingHome.tsx  Portada
app/components/PublicContent.tsx  Páginas, preguntas y recorrido ilustrativo
app/components/mocks/, app/mock-text.ts  Tableros ilustrativos: datos inventados, siempre con el rótulo «Ejemplo · datos ilustrativos»
app/seo.ts                    Metadatos y datos estructurados
app/robots.ts, app/sitemap.ts  Descubrimiento
app/llms.txt/, app/llms-full.txt/  Lectura rápida para asistentes
public/                       Logos y desafío público IndexNow
scripts/                      Smoke HTTP y aviso a buscadores
tests/                        Regresiones
docs/                         Documentación operativa
```

## Idiomas

El sitio está en español (raíz, URLs de siempre) y en inglés (`/en`, con slugs en inglés). Cada página declara su par en el otro idioma (`hreflang`) y el sitemap lista las dos. Un texto nuevo se agrega en los dos archivos de contenido: el test `cada página tiene su versión en inglés…` falla si una página, sección o viñeta queda sin traducir, y el smoke verifica el `<html lang>` y las `hreflang` servidas. La línea de demo habla sólo en español y la página en inglés lo aclara. El video tiene una versión por idioma (`public/video/mehi-agente-de-voz.mp4` y `.en.mp4`, con su portada y subtítulos); qué archivo usa cada idioma está en `homeVideo` de `app/i18n.ts`.

## Notas

- Inter en componentes; el wordmark del logo conserva su diseño. Ciruela sólo para acciones.
- Sin píxeles publicitarios ni mediciones comerciales inventadas.
- La lectura en texto no tiene contenido comercial oculto o diferente del HTML.
- La marca se presenta sola: el sitio no dice quién es el dueño ni quién desarrolló MEHI (ni en el texto, ni en metadatos, datos estructurados o lectura para asistentes). Lo vigilan los tests y el smoke. El ejemplo para gobiernos es ficticio, de lectura, y no se conecta con agentes ni sistemas operativos.
- No incorporar nombres, resultados, logos ni material de clientes sin autorización específica. La política también alcanza archivos, comentarios, fixtures y documentación de este repositorio público.
- [Operación, verificaciones, medición y límites de visibilidad](docs/VISIBILIDAD_BUSCADORES_IA.md).
