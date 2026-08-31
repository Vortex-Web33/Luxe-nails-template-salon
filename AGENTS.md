# AGENTS.md — Instrucciones para agentes que clonan este template

> Lee este archivo completo antes de tocar nada. Este template está vacío a propósito: todo el contenido predefinido es `TODO`.

## 0. Desarrollo

```sh
pnpm install
pnpm dev              # http://localhost:4321
# o con background:
astro dev --background
astro dev logs / status / stop
```

Antes de cerrar cualquier tarea:
```sh
pnpm check   # astro check — 0 errores esperado
pnpm build   # genera dist/ limpio
```

## 1. Fuente única de verdad

| Qué | Dónde |
|---|---|
| **Todo el contenido y metadatos** | `src/config/site.ts` → objetos `SITE` y `CONTENT` |
| **Paleta de marca** | `src/styles/global.css` → `--color-brand-50` … `--color-brand-950` + `SITE.themeColor` |
| **Assets de marca** | `public/favicon.svg` y `public/og.svg` (1200×630) |
| **SEO / JSON-LD** | `src/utils/seo.ts` (no tocar salvo `addressCountry`/`areaServed`) |
| **Secciones** | `src/components/sections/*.astro` montadas en `src/pages/index.astro` |
| **Robots / LLMs** | `src/pages/robots.txt.ts` y `llms.txt.ts` (generados desde `SITE`/`CONTENT`) |

**Regla:** si puedes resolverlo editando solo `src/config/site.ts` + `global.css` + `public/*`, no toques nada más.

## 2. Regla de oro para agentes

**NUNCA inventes datos de la marca.** Si el repo está recién clonado, pregunta al usuario antes de escribir cualquier texto, color, email, teléfono, dirección o claim.

Si el usuario no responde o dice "rellena tú", deja `TODO` y/o arrays vacíos (`[]`). Las secciones con `items: []` se ocultan solas (ver `src/pages/index.astro:13` condicional JSON-LD y `Features/Testimonials/Faq` con guard `hasItems`).

## 3. Qué preguntar al clonar (obligatorio antes de editar)

Haz estas preguntas con la herramienta de preguntas del entorno (o en texto si no existe). No agrupes todo en una sola pregunta genérica — hazlas por bloques. Si el usuario ya dio la info en el mensaje inicial, no repitas.

### Bloque A — Identidad (bloqueante, sin esto el SEO queda en example.com)
1. **Dominio de producción** (`SITE.url`): ej. `https://midominio.com` (https, sin barra final)
2. **Nombre corto** (`SITE.name`) y **razón social** (`SITE.legalName`)
3. **Tagline** (frase junto al logo) y **descripción SEO** (~155 caracteres)
4. **Idioma** (`locale`/`localeRegion`): ej. `es` / `es-ES`

### Bloque B — Contacto y redes
5. **Email, teléfono, dirección, horario** (`SITE.contact`)
6. **Redes sociales** (`SITE.social`): lista de `{name, url}` o "ninguna"
7. **Twitter handle** (`SITE.twitterHandle`) o vacío

### Bloque C — Diseño
8. **Paleta de marca**: hex principal (ej. `#0ea5e9`) — genera escala 50–950 en https://uicolors.app/create. Si no tiene, pregunta si dejo la índigo actual o gris neutro.
9. **Favicon y OG image**: ¿tiene `favicon.svg` y `og` 1200×630? Si no, dejo placeholders con `A`.

### Bloque D — Contenido (uno por sección, deja vacío para ocultar)
10. **Hero**: `eyebrow`, `title`+`highlight`, `subtitle`, 2 CTAs (`label`+`href`), `stats` opcionales
11. **Features**: 3–6 cards con `icon` = `zap|shield|gauge|sparkles|globe|heart` + `title`+`description`
12. **About**: `paragraphs` (1–2), `highlights` (bullets), `stats`
13. **Services**: lista `{name, description}` (alimenta JSON-LD `ItemList/Service`)
14. **Testimonials**: `{quote, name, role}` — si vacío, la sección se oculta
15. **FAQ**: `{question, answer}` — si vacío, sección + JSON-LD `FAQPage` se ocultan
16. **CTA final**: `title`, `subtitle`, `action`
17. **Navegación**: `SITE.nav` — anclas deben coincidir con `id` de secciones en `index.astro` (`#servicios`, `#nosotros`, `#testimonios`, `#faq`, `#contacto`…). Vacío = menú oculto.
18. **Keywords SEO**: 3–8 términos

### Bloque E — Técnico (solo si aplica)
19. **País** para `addressCountry`/`areaServed` en `src/utils/seo.ts:38` (por defecto `ES`)
20. **Bots de IA a bloquear** en `src/pages/robots.txt.ts:8` (por defecto todos permitidos) — cambia `Allow` por `Disallow`
21. **Tecnologías del stack** en `About.astro:59` (`Astro, React...`) — actualizar si cambia

**Si falta info:** no inventes. Escribe `TODO: pendiente de cliente` o deja `[]` y avisa en la respuesta: "Dejé X vacío — se oculta hasta que me pases el dato".

## 4. Flujo recomendado tras las respuestas

```sh
# 1. (opcional) asistente interactivo para lo mínimo
pnpm setup

# 2. Manual: edita solo estos 3 sitios
#    - src/config/site.ts   (busca TODO, 54 marcas)
#    - src/styles/global.css (10 valores --color-brand + SITE.themeColor)
#    - public/favicon.svg + public/og.svg

# 3. Si añades/quitas secciones:
#    - crea src/components/sections/MiSeccion.astro (copia Features.astro)
#    - monta en src/pages/index.astro dentro de <main>
#    - añade entrada a SITE.nav y a CONTENT

# 4. Verifica
pnpm check && pnpm build && pnpm preview
# comprueba en dist/index.html: canonical, robots, JSON-LD, CSP
```

Busca `TODO` en el proyecto — todas las marcas están en `site.ts`, `global.css`, `public/*` y `astro.config.ts:10`.

## 5. Qué NO hacer

- No hardcodees textos fuera de `site.ts` (las secciones leen de `CONTENT`).
- No inventes testimonios, cifras de stats o FAQs.
- No cambies `src/utils/seo.ts` salvo geo/bots.
- No dejes `SITE.url` en `https://example.com` — rompe sitemap/canonical/robots.
- No edites `public/_headers` sin revisar el target de deploy: Netlify/Cloudflare lo usan directo, Vercel necesita `vercel.json`.

## 6. Documentación

- README completo con checklist Fase A/B/C/D: `README.md:38`
- Astro: https://docs.astro.build
- Astro components: https://docs.astro.build/en/basics/astro-components/
- Framework islands: https://docs.astro.build/en/guides/framework-components/
- Tailwind: https://docs.astro.build/en/guides/styling/
- i18n: https://docs.astro.build/en/guides/internationalization/
