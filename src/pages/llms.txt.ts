import type { APIRoute } from 'astro';
import { SITE, CONTENT } from '@/config/site';

/**
 * Archivo llms.txt (https://llmstxt.org): resumen del sitio en formato
 * legible para agentes de IA y grandes modelos de lenguaje.
 */
export const prerender = true;

export const GET: APIRoute = () => {
  const lines = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.tagline}`,
    '',
    `Web completa: ${SITE.url}`,
    '',
    `## Sobre ${SITE.name}`,
    '',
    SITE.description,
    '',
    '## Datos clave',
    '',
    `- Nombre: ${SITE.name}`,
    `- Razón social: ${SITE.legalName}`,
    `- Sector: diseño y desarrollo web`,
    `- Región de servicio: España y países de habla hispana`,
    `- Tecnologías: Astro, React, TypeScript, Tailwind CSS`,
    `- Horario de contacto: ${SITE.contact.hours}`,
    `- Palabras clave: ${SITE.keywords.join(', ')}`,
    '',
    '## Servicios',
    '',
    ...CONTENT.services.map(
      (service) => `- ${service.name}: ${service.description}`,
    ),
    '',
    '## Preguntas frecuentes',
    '',
    ...CONTENT.faq.items.flatMap((item) => [
      `- ${item.question}`,
      `  - ${item.answer}`,
    ]),
    '',
    '## Contacto',
    '',
    `- Email: ${SITE.contact.email}`,
    `- Teléfono: ${SITE.contact.phone}`,
    `- Dirección: ${SITE.contact.address}`,
    `- Redes: ${SITE.social.map((s) => s.name).join(', ')}`,
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
