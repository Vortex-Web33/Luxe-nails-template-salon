import { defineConfig, fontProviders } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

import { SITE } from './src/config/site';

// https://astro.build/config
export default defineConfig({
  // TODO: cambia SITE.url en src/config/site.ts — este valor alimenta sitemap, canonical y OG.
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
        ],
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
