# mehi-website

Landing institucional minimalista para [mehi.ar](https://mehi.ar). Provisoria, una sola página, sin backend.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Fuentes Google: Playfair Display + Inter
- Sin librerías UI externas

## Correr local

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Build de producción

```bash
npm run build
npm run start
```

## Deploy a Vercel (manual desde la UI)

1. Ir a [vercel.com/new](https://vercel.com/new) e importar el repo `Giselagunther/mehi-website`.
2. Framework Preset: **Next.js** (autodetectado).
3. Build Command: `next build` (default). Output: `.next` (default).
4. No requiere variables de entorno.
5. Deploy. Vercel asigna una URL `https://mehi-website-xxxx.vercel.app`.

## Configurar DNS en Cloudflare (después del deploy)

1. En Vercel → Project → Settings → Domains → **Add Domain** → ingresar `mehi.ar` y `www.mehi.ar`.
2. Vercel mostrará los registros DNS necesarios. Típicamente:
   - `mehi.ar` → registro **A** apuntando a `76.76.21.21`
   - `www.mehi.ar` → registro **CNAME** apuntando a `cname.vercel-dns.com`
3. En Cloudflare → DNS → Records:
   - Agregar los registros indicados por Vercel.
   - **Proxy status: DNS only (nube gris)**. No proxiar a través de Cloudflare para evitar conflictos de SSL con Vercel.
   - **No tocar** los registros MX de Google Workspace (correo institucional).
   - **No tocar** ningún otro subdominio existente.
4. Esperar propagación (suele tomar 1–5 minutos). Vercel valida automáticamente y emite el certificado SSL.

## Estructura

```
app/
  components/
    Header.tsx
    Hero.tsx
    Portfolio.tsx
    Clients.tsx
    Contact.tsx
    Footer.tsx
  globals.css
  layout.tsx
  page.tsx
public/
  favicon.svg
```

## Notas

- Identidad visual: tipografía Playfair Display (display) + Inter (body). Ciruela `#8B2480` usado con moderación como acento.
- No incluye analytics ni scripts de terceros.
- No incluye blog, login, pricing ni otras secciones.
