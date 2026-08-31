#!/usr/bin/env node
/**
 * Script de inicialización interactivo del template.
 * Uso: pnpm setup  (o node scripts/setup.mjs)
 *
 * Pregunta lo mínimo (nombre, dominio, email) y parchea src/config/site.ts.
 * Es opcional — puedes editar ese archivo a mano.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

const SITE_PATH = 'src/config/site.ts';

const rl = createInterface({ input: stdin, output: stdout });

function ask(question, defaultValue = '') {
  const hint = defaultValue ? ` (${defaultValue})` : '';
  return rl.question(`${question}${hint}: `).then((ans) => ans.trim() || defaultValue);
}

function patchSite(content, replacements) {
  let out = content;
  for (const [key, value] of Object.entries(replacements)) {
    // Reemplaza líneas tipo: name: '...' o url: '...' manteniendo comillas
    const re = new RegExp(`(${key}:\\s*')[^']*(')`, 'm');
    if (re.test(out)) out = out.replace(re, `$1${value}$2`);
  }
  return out;
}

async function main() {
  console.log('\n🧩  Template setup — deja en blanco para mantener el valor actual\n');

  if (!existsSync(SITE_PATH)) {
    console.error(`No se encontró ${SITE_PATH}. Ejecuta desde la raíz del repo.`);
    process.exit(1);
  }

  const original = readFileSync(SITE_PATH, 'utf8');

  const name = await ask('Nombre corto de la marca', 'Mi Marca');
  const legalName = await ask('Razón social', `${name} S.L.`);
  const tagline = await ask('Tagline / propuesta de valor', 'Tu propuesta de valor en una frase');
  const url = await ask('Dominio de producción (https://...)', 'https://example.com');
  const description = await ask('Descripción SEO (155 caracteres)', 'Descripción breve de tu negocio.');
  const email = await ask('Email de contacto', 'hola@example.com');
  const phone = await ask('Teléfono', '+34 600 000 000');
  const themeColor = await ask('Color principal hex (ej. #6366f1)', '#6366f1');

  // Validación mínima
  if (url !== 'https://example.com' && !/^https:\/\//.test(url)) {
    console.warn('⚠️  El dominio debe empezar por https:// — lo dejamos como lo escribiste.');
  }

  const replacements = {
    "\\bname": name, // handled via specific keys below
  };

  // Patch granular — buscamos patrones exactos para no romper comentarios
  let patched = original;
  const map = {
    "name: '": name,
    "legalName: '": legalName,
    "tagline: '": tagline,
    "url: '": url,
    "themeColor: '": themeColor,
  };

  // Reemplazo simple pero seguro: solo primera ocurrencia de cada campo en SITE
  // Para description (multilínea) hacemos reemplazo del primer string largo
  patched = patched.replace(/name: '[^']*'/, `name: '${name}'`);
  patched = patched.replace(/legalName: '[^']*'/, `legalName: '${legalName}'`);
  patched = patched.replace(/tagline: '[^']*'/, `tagline: '${tagline}'`);
  patched = patched.replace(/url: '[^']*'/, `url: '${url}'`);
  patched = patched.replace(/themeColor: '[^']*'/, `themeColor: '${themeColor}'`);
  // description es multilínea con comillas simples alrededor
  patched = patched.replace(
    /description:\s*\n?\s*'[^']*'/,
    `description:\n    '${description.replace(/'/g, "\\'")}'`
  );
  patched = patched.replace(/email: '[^']*'/, `email: '${email}'`);
  patched = patched.replace(/phone: '[^']*'/, `phone: '${phone}'`);

  // Solo escribir si hubo cambios
  if (patched !== original) {
    const confirm = await ask('\n¿Escribir cambios en src/config/site.ts? (s/N)', 'N');
    if (/^(s|si|sí|y|yes)$/i.test(confirm)) {
      writeFileSync(SITE_PATH, patched, 'utf8');
      console.log(`\n✅  Actualizado ${SITE_PATH}`);
    } else {
      console.log('\n↩️  Sin cambios — puedes editar el archivo a mano.');
    }
  } else {
    console.log('\nSin cambios detectados.');
  }

  console.log(`
Próximos pasos:
  1. Edita src/config/site.ts (busca TODO) para completar el contenido.
  2. Personaliza la paleta en src/styles/global.css (SITE.themeColor debe coincidir con --color-brand-600).
  3. Reemplaza public/favicon.svg y public/og.svg.
  4. Ejecuta: pnpm check && pnpm build && pnpm preview
  5. Revisa el README.md para el checklist completo.
`);

  rl.close();
}

main().catch((err) => {
  console.error(err);
  rl.close();
  process.exit(1);
});
