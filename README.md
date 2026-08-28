# mehi-website

Web comercial de [MEHI](https://www.mehi.ar), la plataforma de GIV para gobiernos, organismos públicos, empresas y contact centers. Este repositorio no contiene la plataforma privada de clientes.

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
app/content.ts                Contenido público compartido por HTML y texto
app/components/MarketingHome.tsx  Portada
app/components/PublicContent.tsx  Páginas, preguntas y recorrido ilustrativo
app/[slug]/page.tsx            Catálogo explícito de páginas estáticas
app/seo.ts                    Metadatos y datos estructurados
app/robots.ts, app/sitemap.ts  Descubrimiento
app/llms.txt/, app/llms-full.txt/  Lectura rápida para asistentes
public/                       Logos y desafío público IndexNow
scripts/                      Smoke HTTP y aviso a buscadores
tests/                        Regresiones
docs/                         Documentación operativa
```

## Notas

- Inter en componentes; el wordmark del logo conserva su diseño. Ciruela sólo para acciones.
- Sin píxeles publicitarios ni mediciones comerciales inventadas.
- La lectura en texto no tiene contenido comercial oculto o diferente del HTML.
- GIV es la empresa proveedora; MEHI es la plataforma. El ejemplo para gobiernos es ficticio, de lectura, y no se conecta con agentes ni sistemas operativos.
- No incorporar nombres, resultados, logos ni material de clientes sin autorización específica. La política también alcanza archivos, comentarios, fixtures y documentación de este repositorio público.
- [Operación, verificaciones, medición y límites de visibilidad](docs/VISIBILIDAD_BUSCADORES_IA.md).
