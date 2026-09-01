import { defineConfig, fontProviders } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

import { SITE } from './src/config/site';

// https://astro.build/config
export default defineConfig({
  // T1 FIX: Dominio canónico único = SITE.url (https://luxenailstudio.com).
  // sitemap, canonical (<link rel="canonical"> en Seo.astro) y OG usan SITE.url.
  // El host Vercel luxe-nails-beta.vercel.app es SOLO preview temporal: no usar como site.
  // Si se necesita redirect 301 del beta al canónico, configurar en Vercel (vercel.json) o añadir aquí:
  // redirects: { '/': 'https://luxenailstudio.com/' } — ver docs Astro redirects.
  // Astro.site === SITE.url por diseño; absolute() en src/utils/seo.ts también usa SITE.url.
  site: SITE.url,

  // HTML comprimido y estilos críticos inline: menos bytes, render más rápido
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },

  // Shiki usa estilos inline incompatibles con CSP; no se usa en esta plantilla
  markdown: {
    syntaxHighlight: false,
  },

  // Fuentes autoalojadas vía Fontsource: cero peticiones a terceros (privacidad + velocidad)
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Cormorant Garamond',
      cssVariable: '--font-serif',
      weights: [400, 500, 600, 700],
      subsets: ['latin'],
      fallbacks: ['Georgia', 'serif'],
    },
  ],

  // Content Security Policy: Astro genera los hashes de sus scripts/styles automáticamente.
  // frame-ancestors se aplica vía cabecera HTTP (public/_headers), ya que no es soportada en <meta>.
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data: blob: https:",
        "font-src 'self' data:",
        "connect-src 'self'",
        "frame-src 'self' https://www.google.com https://maps.google.com",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        'upgrade-insecure-requests',
      ],
    },
  },

  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.endsWith('/404/'),
    }),
    icon({
      include: {
        lucide: [
          'diamond',
          'shield-check',
          'shield',
          'clock',
          'instagram',
          'facebook',
          'play',
          'arrow-right',
          'chevron-right',
          'chevron-down',
          'star',
          'mail',
          'phone',
          'map-pin',
          'menu',
          'x',
          'sparkles',
          'heart',
          'gem',
          'calendar',
          'message-circle',
          'layers',
        ],
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
