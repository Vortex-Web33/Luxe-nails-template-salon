# Template — Astro 7 + React + Tailwind 4

Template base **sin contenido predefinido** para webs onepage. Todo el contenido y la identidad se controlan desde **un único archivo**: `src/config/site.ts`. Clona, cambia configuración y diseño, publica.

Stack: **Astro 7 · React 19 · TypeScript · Tailwind CSS 4** · SEO técnico · Schema.org · sitemap · `robots.txt` + `llms.txt` · CSP.

---

## 0. Inicio en 2 minutos

```sh
# 1. Clona como template (sin arrastrar historial si vas a crear repo nuevo)
git clone https://github.com/Vortex-Web33/Template.git mi-web
cd mi-web
rm -rf .git && git init

# 2. Instala y arranca
pnpm install
pnpm dev
# opcional: asistente interactivo para lo mínimo
pnpm setup
```

Abre `http://localhost:4321`.

| Comando | Qué hace |
|---|---|
| `pnpm dev` | Servidor de desarrollo |
| `pnpm check` | Verifica tipos (`astro check`) |
| `pnpm build` | Build de producción → `dist/` |
| `pnpm preview` | Previsualiza el build |
| `pnpm setup` | Asistente interactivo (nombre, dominio, email) |

> Requisitos: **Node >=22.12.0** (ver `.nvmrc`). Si usas `nvm`: `nvm use`.

---

## 1. Checklist — qué cambiar al crear una web nueva

Copia este checklist a tu issue/tarea. Marca cada fila antes de publicar.

### Fase A — Obligatorio (sin esto el SEO apunta a example.com)

| # | Archivo | Qué cambiar | Notas |
|---|---|---|---|
| A1 | `src/config/site.ts` → `SITE.url` | Pon tu dominio de producción **con https y sin barra final** (`https://midominio.com`) | Alimenta sitemap, canonical, robots.txt y JSON-LD. Si lo dejas en `example.com`, Google indexará mal. |
| A2 | `SITE.name` / `legalName` / `tagline` / `description` | Nombre corto, razón social, claim y descripción SEO (~155 caracteres) | Aparece en `<title>`, header, footer, OG y Schema.org |
| A3 | `SITE.themeColor` + `src/styles/global.css` | Cambia el hex del tema y los 10 valores `--color-brand-*` | Deben coincidir. Genera la escala en https://uicolors.app/create |
| A4 | `SITE.contact` (email, teléfono, dirección, horario) | Datos reales de contacto | Secciones Contact + JSON-LD Organization |
| A5 | `public/favicon.svg` (+ `favicon.ico` si lo generas) | Sustituye por el favicon de la marca (SVG 32×32 mínimo) | Referenciado en `src/layouts/Layout.astro` |
| A6 | `public/og.svg` (o `og.png`/`og.jpg`) | Imagen para compartir en redes **1200×630** | Actualiza `SITE.ogImage` si cambias el nombre/extensión |
| A7 | `package.json` → `name` / `description` | Renombra el paquete | Evita dejar `template` en el repo clonado |

### Fase B — Contenido (todo en `src/config/site.ts` → `CONTENT`)

> Busca `TODO` en el archivo. Cada campo vacío o comentado está marcado. **Si dejas un array vacío (`[]`), la sección no se renderiza** — útil para ocultar Testimonios/FAQ si aún no tienes datos.

| # | Bloque | Qué rellenar | Se oculta si... |
|---|---|---|---|
| B1 | `hero` | `eyebrow`, `title`+`highlight`, `subtitle`, 2 CTAs, `stats` (opcional) | `stats: []` oculta las cifras |
| B2 | `features` | 3–6 cards con `icon` (`zap`/`shield`/`gauge`/`sparkles`/`globe`/`heart`) | `items: []` muestra aviso en dev, oculta grid en prod |
| B3 | `about` | `paragraphs` (1–2), `highlights` (bullets), `stats` | Cada sub-array vacío oculta su bloque |
| B4 | `services` | Lista de servicios — también genera JSON-LD `ItemList` | `[]` omite el bloque JSON-LD |
| B5 | `testimonials` | Citas de clientes | `items: []` **oculta la sección entera** |
| B6 | `faq` | Preguntas frecuentes — genera JSON-LD `FAQPage` | `items: []` **oculta la sección + JSON-LD** |
| B7 | `cta` | Título, subtítulo y botón de cierre | Siempre visible |
| B8 | `SITE.nav` | Anclas del menú (`#servicios`, `#nosotros`...) | `[]` oculta el nav (desktop y móvil) |
| B9 | `SITE.social` | Redes (`{name, url}`) | `[]` muestra texto guía en footer |
| B10 | `SITE.keywords` | 3–8 palabras clave SEO | Afecta `keywords` en JSON-LD WebSite |
| B11 | `SITE.locale` / `localeRegion` / `twitterHandle` | Idioma y handle X | `twitterHandle: ''` omite `twitter:site` |

### Fase C — Diseño y marca

| # | Archivo | Qué hacer |
|---|---|---|
| C1 | `src/styles/global.css` | Reemplaza `--color-brand-50`…`--color-brand-950`. Todo el sitio usa esas variables. |
| C2 | `public/_headers` | Revisa cabeceras de seguridad (HSTS, CSP, caché). Para **Vercel**, traduce este archivo a `vercel.json` (ver §6). |
| C3 | `astro.config.ts` → `fonts` | Cambia `Inter` si tu marca usa otra fuente (autoalojada vía Fontsource). |
| C4 | `src/components/sections/*.astro` | Ajusta copy hardcodeado mínimo (ej. lista "Stack" en `About.astro`). |
| C5 | `src/utils/seo.ts` / `src/pages/robots.txt.ts` | Solo si necesitas geo (`addressCountry`, `areaServed`) o bloquear un bot de IA. |

### Fase D — Antes de publicar

```sh
pnpm check     # 0 errores esperado
pnpm build     # genera dist/
pnpm preview   # revisa visualmente
```

En `dist/index.html` comprueba:

- `<link rel="canonical" href="https://tu-dominio.com/">` correcto
- `<meta name="robots" content="index, follow...">` presente
- `<script type="application/ld+json">` con WebSite, Organization y (si hay datos) Service/FAQPage
- `<meta http-equiv="content-security-policy">` con hashes

Verifica el resultado en https://search.google.com/test/rich-results y envía `https://tu-dominio.com/sitemap-index.xml` en Google Search Console.

---

## 2. Estructura del proyecto

```text
src/
├── config/site.ts        # ⭐ ÚNICO archivo de configuración y contenido (TODO)
├── components/
│   ├── sections/         # Hero, Features, About, Testimonials, Faq, Cta, Contact, Header, Footer
│   ├── react/            # Islas React (MobileMenu, FaqAccordion)
│   └── seo/Seo.astro     # Metadatos + OG + JSON-LD
├── layouts/Layout.astro
├── pages/
│   ├── index.astro       # Monta las secciones en orden
│   ├── robots.txt.ts     # Generado desde SITE.url (bots de IA permitidos por defecto)
│   └── llms.txt.ts       # Generado desde SITE + CONTENT (https://llmstxt.org)
├── styles/global.css     # Paleta --color-brand-* + base (TODO: recolorear)
└── utils/seo.ts          # Generadores JSON-LD
public/
├── favicon.svg           # TODO: reemplazar
├── og.svg                # TODO: reemplazar (1200×630)
└── _headers              # Cabeceras de seguridad y caché (Netlify/Cloudflare)
scripts/setup.mjs         # Asistente interactivo (pnpm setup)
```

---

## 3. Añadir o quitar secciones

**Añadir:**
1. Crea `src/components/sections/MiSeccion.astro` copiando una existente.
2. Importa y monta en `src/pages/index.astro` dentro de `<main>`.
3. Añade el contenido a `CONTENT` en `src/config/site.ts` y la ancla a `SITE.nav` si debe aparecer en el menú.
4. Si necesita interactividad, crea `src/components/react/MiIsla.tsx` y úsala con `client:visible` o `client:load`:

```astro
<MiIsla client:visible />
```

**Quitar/ocultar:**
- Vacía el array correspondiente en `CONTENT` (`features.items = []`, `testimonials.items = []`, etc.) — la sección se oculta sola.
- O comenta/elimina su import y tag en `src/pages/index.astro` y su `SITE.nav` entry.

---

## 4. Personalización rápida

### Colores
Edita `src/styles/global.css` → bloque `@theme inline`. Genera la escala con tu color principal en https://uicolors.app/create y pega los 10 valores. Haz que `SITE.themeColor` sea igual a `--color-brand-600`.

### Fuentes
En `astro.config.ts` → `fonts[]`. Cambia `name: 'Inter'` y `cssVariable`. Está autoalojada vía Fontsource (sin peticiones a Google).

### Iconos de Features
Campo `icon` admite: `zap`, `shield`, `gauge`, `sparkles`, `globe`, `heart` (definidos en `Features.astro`).

---

## 5. SEO, IA y redes

- `robots.txt` y `llms.txt` se generan al vuelo desde `SITE` y `CONTENT`. Bots de IA (`GPTBot`, `ClaudeBot`, `PerplexityBot`...) están **permitidos por defecto** en `src/pages/robots.txt.ts` — cambia `Allow` por `Disallow` para bloquear uno.
- El `sitemap-index.xml` lo genera `@astrojs/sitemap` desde `SITE.url`.
- JSON-LD condicional: `services` y `faq` solo se inyectan si su array no está vacío (evita Rich Results vacíos).
- OG/Twitter: `SITE.ogImage` y `SITE.twitterHandle`. Si `twitterHandle` está vacío, la etiqueta `twitter:site` sale vacía (no afecta al build).

---

## 6. Despliegue

El proyecto genera un sitio **100% estático** en `dist/`.

- **Netlify / Cloudflare Pages**: `public/_headers` se aplica automáticamente (HSTS, `frame-ancestors`, caché de assets...).
- **Vercel**: `_headers` no se aplica. Crea `vercel.json`:
  ```json
  {
    "headers": [
      { "source": "/(.*)", "headers": [{ "key": "Content-Security-Policy", "value": "frame-ancestors 'none'" }] }
    ]
  }
  ```
- **Otro hosting**: configura `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY` y `Permissions-Policy` (ver `public/_headers`).

Variables de entorno: copia `.env.example` a `.env` si integras formulario/analytics. El template no requiere env vars por defecto.

---

## 7. Flujo recomendado para cada proyecto nuevo

1. Usa este repo como **Template** en GitHub (o `git clone` + `rm -rf .git && git init`).
2. `pnpm install` → `pnpm setup` (o edita `src/config/site.ts` a mano).
3. Recolorea `src/styles/global.css` y reemplaza `public/favicon.svg` + `public/og.svg`.
4. Rellena `CONTENT` sección por sección; deja `[]` donde aún no tengas datos.
5. `pnpm check && pnpm build && pnpm preview` → revisa canonical, OG y JSON-LD.
6. Despliega `dist/` y verifica en Rich Results + Search Console.
7. Mantén este README como lista de chequeo; borra las filas que no te sirvan.

---

## 8. Notas

- Todos los textos "TODO" son los únicos sitios que debes tocar para un rebranding completo.
- `src/utils/seo.ts` tiene `areaServed` y `addressCountry` en `ES` por defecto — cámbialos si es otro país.
- Licencia: MIT (ver `LICENSE`).

## Documentación

- Astro: https://docs.astro.build
- Tailwind CSS 4: https://tailwindcss.com/docs
- Astro + React: https://docs.astro.build/en/guides/framework-components/
