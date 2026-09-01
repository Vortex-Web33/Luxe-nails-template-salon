import type { APIRoute } from 'astro';
import { SITE } from '@/config/site';

/**
 * Agentes de IA permitidos por defecto. Borra una línea o cambia
 * "Allow" por "Disallow" para excluir a un bot concreto.
 *
 * T1+T2: Sitemap y canonical DEBEN usar el mismo dominio canónico SITE.url
 * (https://luxenailstudio.com). El deploy beta luxe-nails-beta.vercel.app es temporal
 * y NO debe usarse como canónico. Astro.site (astro.config.ts) === SITE.url.
 * T2: La línea Sitemap es exacta y apunta a /sitemap-index.xml generado por @astrojs/sitemap.
 */
const AI_AGENTS = [
  'GPTBot',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'PerplexityBot',
  'Google-Extended',
  'OAI-SearchBot',
  'ChatGPT-User',
  'Applebot-Extended',
  'CCBot',
  'Bytespider',
  'Amazonbot',
  'Meta-ExternalAgent',
];

export const prerender = true;

export const GET: APIRoute = () => {
  const lines = [
    'User-agent: *',
    'Allow: /',
    '',
    '# Agentes de IA: permitidos por defecto (elimina una entrada para bloquearlo)',
    ...AI_AGENTS.flatMap((agent) => [`User-agent: ${agent}`, 'Allow: /', '']),
    `Sitemap: ${new URL('/sitemap-index.xml', SITE.url).toString()}`,
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
