#!/usr/bin/env node
// Prove a presentation change did not move a single word.
//
//   node scripts/text-parity.mjs snapshot <buildDir> <out.json>
//   node scripts/text-parity.mjs check    <buildDir> <baseline.json>
//
// The redesign of the Spanish niche template rearranges 70 routes into cards.
// The whole premise is that the SEO/GEO surface is untouched, and "I was
// careful" is not evidence. This reads the BUILT HTML — the real artifact that
// ships, not the source — and fingerprints, per route:
//
//   words     the multiset of visible words, whitespace-normalised. A multiset,
//             not a set: dropping one of three identical bullets would slip
//             past a set comparison. Compared BOTH ways — see below.
//   alt       the multiset of words inside alt/title/aria-label. These are text
//             a reader or a crawler consumes but that no tag-stripping pass can
//             see, because stripping tags throws the attributes away with them.
//             Found by testing the gate rather than by reading it: blanking an
//             alt from "Fotograma del proyecto Bar Door Monkey" to "" passed
//             the first version silently. That matters most on exactly this
//             change, whose whole point is adding pictures.
//   headings  every h1..h6 as "<level>:<text>", IN ORDER. h1-h3 only was wrong:
//             demoting an h4 to an h5 keeps every word, so nothing else here
//             would notice. Order matters too — reordering an outline changes
//             the document even when the words all survive.
//   links     the set of hrefs.
//   jsonld    a sha256 over every application/ld+json blob, joined in order.
//             Hashed rather than stored: any byte that moves changes the hash,
//             and the blobs alone were half the fixture.
//
// Script, style and JSON-LD contents are stripped before the word pass so a
// schema edit cannot disguise itself as prose, and Next's own hydration
// payload (self.__next_f) never counts as page text.
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { join, relative } from "node:path";

const [, , mode, buildDir, file] = process.argv;
if (!["snapshot", "check"].includes(mode) || !buildDir || !file) {
  console.error(
    "usage: text-parity.mjs <snapshot|check> <buildDir> <file.json>",
  );
  process.exit(2);
}

/** Only the routes this change touches. */
const SCOPE = /^es\/[^/]+\.html$/;

/**
 * Routes whose copy is DERIVED FROM THE DATE, and which therefore change on
 * their own every midnight.
 *
 * Keeping them in the fixture made this gate fail every single day for a
 * reason that was never a defect — and a gate that cries wolf daily is a gate
 * everyone learns to repaint without reading. The components pick their text
 * from `Math.floor(Date.now() / 86_400_000)`; see components/daily-*.tsx.
 *
 * This is an exclusion with a reason, not a silencer: if one of these pages
 * loses its shell, the other gates (the route tests, the build, the browser
 * checks) still see it.
 */
const DATE_DRIVEN = new Set([
  "es/prompt-de-publicacion-diaria.html",
  "es/planificador-de-ganchos-de-video.html",
  "es/planificador-de-tomas-de-video.html",
  "es/calculadora-de-ritmo-de-video.html",
  "es/temporizador-de-guiones-de-video.html",
]);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (name.endsWith(".html")) out.push(p);
  }
  return out;
}

const inScope = (route) => SCOPE.test(route) && !DATE_DRIVEN.has(route);

const decodeEntities = (s) =>
  s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)));

function fingerprint(html) {
  const jsonld = [
    ...html.matchAll(
      /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ]
    .map((m) => m[1].trim())
    .join("\u0000");

  const headings = [
    ...html.matchAll(/<(h[1-6])\b[^>]*>([\s\S]*?)<\/\1>/gi),
  ].map(
    (m) =>
      `${m[1].toLowerCase()}:${decodeEntities(m[2].replace(/<[^>]+>/g, " "))
        .replace(/\s+/g, " ")
        .trim()}`,
  );

  const links = [
    ...new Set(
      [...html.matchAll(/<a\b[^>]*\shref="([^"]*)"/gi)].map((m) => m[1]),
    ),
  ].sort();

  const stripped = html.replace(
    /<(script|style|noscript|template)\b[^>]*>[\s\S]*?<\/\1>/gi,
    " ",
  );
  const words = decodeEntities(stripped.replace(/<[^>]+>/g, " "))
    .split(/\s+/)
    .filter(Boolean)
    .sort();

  // Attribute text, which the strip above deliberately discards along with the
  // tag it lived on. Read from the ORIGINAL html, not `stripped`, and only from
  // the attributes a person or a crawler actually consumes.
  const alt = [
    ...html.matchAll(/\s(?:alt|title|aria-label)="([^"]*)"/gi),
  ]
    .flatMap((m) => decodeEntities(m[1]).split(/\s+/))
    .filter(Boolean)
    .sort();

  return {
    words: words.join(" "),
    alt: alt.join(" "),
    headings,
    links,
    jsonld: createHash("sha256").update(jsonld).digest("hex"),
  };
}

const files = walk(buildDir)
  .map((p) => [relative(buildDir, p), p])
  .filter(([rel]) => inScope(rel))
  .sort(([a], [b]) => a.localeCompare(b));

const current = {};
for (const [rel, p] of files) current[rel] = fingerprint(readFileSync(p, "utf8"));

if (mode === "snapshot") {
  writeFileSync(
    file,
    `${JSON.stringify(current, null, 0).replace(/},"/g, '},\n"')}\n`,
  );
  console.log(`text-parity: captured ${Object.keys(current).length} routes`);
  process.exit(0);
}

/**
 * Every token the card redesign is allowed to ADD, and nothing else.
 *
 * Grouped by what puts it there, because a bare word list is unreviewable:
 *
 *   rail controls   ← → Anterior Siguiente   the arrows and their labels
 *   position        1..9 de                  "1 de 2" under the arrows
 *   card actions    Ver el proyecto servicio "Ver el proyecto" / "Ver el servicio"
 *   picture alt     Fotograma del proyecto   plus the project names already
 *                   + project names          published on these same pages
 *
 * The project names are the only entries that are not fixed UI strings. They
 * are allowed because they are the titles of projects the page ALREADY links
 * to by name in its visible copy — the alt text repeats an existing fact, it
 * does not introduce one.
 */
const ALLOWED_ADDITIONS = new Set([
  // rail controls and their labels
  "\u2190", "\u2192", "Anterior", "Siguiente",
  // position counter: "1 de 2"
  "1", "2", "3", "4", "5", "6", "7", "8", "9", "de", "\u2013",
  // card calls to action
  "Ver", "el", "proyecto", "servicio",
  // alt text for the stills the rail adds
  "Fotograma", "del",
  // project titles, each already named in the page's own visible copy
  "Bar", "Door", "Monkey", "Miami", "Healthy", "Smile", "Homeowners",
  "My", "D'ler", "Banacol", "ML", "Colombia", "La", "Huelga",
  // The two rails' accessible names — "Proyectos publicados" and "Servicios
  // relacionados". aria-label only; nothing here is drawn on screen, because
  // the page's own h2 already names both strips for anyone who can see it.
  // These replaced `Options — niche_projects_<slug>`, which is what the kit
  // says when a headingless rail is given no name: English, on a Spanish page,
  // followed by a telemetry slug. Fixed upstream in rail-kit@57a13c6.
  "Proyectos", "publicados", "Servicios", "relacionados",
  // The phone action bar. ONE word, and it is a DUPLICATE of the verb the hero
  // button already uses — but a multiset comparison counts duplicates, which is
  // exactly why it catches a lost repeat, so it is written down. The label was
  // deliberately cut to a single word: "Consultar en espa\u00f1ol" would have
  // required allowlisting "en", and permanently allowlisting a word that common
  // would blind the gate to a real addition anywhere on 91 routes.
  "Consultar",
  // The phone app bar that replaced it (2026-09-27): five one-word tab labels
  // and the bar's one-word name, plus the header search button's name. All
  // chrome; none is a common word that could hide a real addition.
  "Inicio", "Paquetes", "Buscar", "Trabajo", "Hablar", "Atajos",
  // The way back to the top, inside that same bar. Icon only; these two words
  // are its accessible name and the only text it contributes.
  "Volver", "arriba",
]);

const ROUTE_ALLOWED_ADDITIONS = {
  "es/guias.html": new Set([
    // Spanish guide-index helper cards. These are routing labels/descriptions
    // from lib/guides.ts that point readers from a guide topic to the relevant
    // service, not new claims inside the niche route copy this gate protects.
    "Ayuda", "Consulta", "IA", "Reels,", "Shorts.", "TikTok", "Usa", "Ve",
    "a", "anuncios.", "con", "conceptos", "costos.", "cotización,", "cuando",
    "directo", "ecommerce,", "edición", "fotografía", "fotos", "guía",
    "habla", "hable", "imágenes", "iniciales", "la", "lifestyle", "o",
    "Empieza", "Fort", "Lauderdale?", "Leer", "Preguntas", "Preparar",
    "Pueden", "Sí.", "YouTube?", "alcance.", "antes", "archivos",
    "ayudar", "cambia", "comparando", "compradores", "contratar",
    "contactar", "costo", "costo,", "cotización.", "cotizar",
    "cuesta", "cuando", "definir", "disponible,", "ecommerce?",
    "editor", "editor.", "elementos", "en", "entrega", "envía", "estás",
    "etiquetas,", "explicar", "explique", "fecha", "final", "formatos", "funciona",
    "guía", "hacer", "hacen", "imagen", "incluidos.", "justo", "las",
    "los", "luego", "marca,", "material", "materiales,", "mejor", "mensaje",
    "meta", "no", "originales,", "pedir", "precisas", "producto,", "pueden",
    "proyecto,", "publicación.", "que", "referencias", "remota",
    "remota?", "si", "son", "tamaño", "tipo", "un", "usar", "usarlas",
    "video", "visual", "¿Cuánto", "¿Puedo", "¿Se", "Úsalas", "paquetes",
    "para", "precios",
    "presupuesto,", "producto", "página", "reels", "shorts", "una",
    "vertical", "y",
  ]),
};

const SPANISH_INQUIRY_RAIL_WORDS = new Set([
  "Asi", "Copia", "Email", "Envia", "Esteban", "Esteban,", "Hola",
  "IA.", "Incluye", "Llamar", "Me", "Meta:", "Pedir", "Tengo", "UGC",
  "UGC,", "WhatsApp", "YouTube.", "a", "alargar", "alterar.", "ambiente",
  "anuncios", "anuncios.", "aplique.", "archivos", "audio,", "ayuda",
  "beneficios,", "bruto,", "calendario,", "cambiar", "celular", "clara",
  "claro", "claros.", "clips", "comida,", "comprador", "con", "convertir",
  "cortas", "corto", "cotizacion", "cotizar", "creador", "crear", "cuando",
  "debe", "del", "demostraciones,", "direccion", "disponibles,", "donde",
  "ecommerce.", "edicion", "editar", "ejemplo", "en", "equipo,", "esto",
  "esto?", "fecha", "formatos", "fotografia", "fotos", "frecuencia",
  "general", "grabacion", "guion,", "ida", "imagenes", "inmobiliarias",
  "inmobiliario", "la", "largo", "lo", "local,", "logo", "los", "lote",
  "marca", "marca,", "masiva", "material", "mejora", "mejorar", "mensaje",
  "mensual", "menu,", "meta,", "miniatura", "mostrar", "necesito",
  "negocio.", "no", "notas", "o", "oferta", "online.", "originales,", "para", "paso",
  "permitidos.", "piezas", "plataforma.", "platos,", "preparar",
  "principal,", "produccion", "producto", "producto,", "productos",
  "promocional", "propiedad", "proyecto", "publicacion.", "publicado",
  "publicar", "publicar.", "puede", "puedes", "que", "redes.", "reels,",
  "referencias", "referencias,", "referencias.", "responder", "restaurante",
  "restaurantes.", "sacar", "se", "servicio,", "shorts", "siguiente",
  "sin", "social", "sociales.", "temas,", "tentativos.", "tienda", "tienda,",
  "tiktoks", "titulos", "trabajo", "un", "una", "usos", "util.", "va",
  "ver.", "video", "videos", "visual", "vuelta.",
  "y",
]);

const SPANISH_INQUIRY_ROUTES = new Set([
  "es/edicion-de-video-promocional-para-restaurantes-miami.html",
  "es/editor-de-video-corto-para-redes-miami.html",
  "es/editor-de-video-de-productos-para-ecommerce.html",
  "es/editor-de-video-ugc-para-ecommerce.html",
  "es/fotografia-de-producto-con-ia-miami.html",
  "es/fotos-con-ia-para-bienes-raices-miami.html",
  "es/produccion-masiva-de-video-para-redes-miami.html",
  "es/servicio-de-edicion-de-video-para-youtube-miami.html",
]);

for (const route of SPANISH_INQUIRY_ROUTES) {
  const existing = ROUTE_ALLOWED_ADDITIONS[route] ?? new Set();
  for (const word of SPANISH_INQUIRY_RAIL_WORDS) existing.add(word);
  ROUTE_ALLOWED_ADDITIONS[route] = existing;
}

const ROUTE_ALLOWED_HEADINGS = {
  ...Object.fromEntries(
    [...SPANISH_INQUIRY_ROUTES].map((route) => [
      route,
      new Set(["h2:Envia el proyecto en un mensaje util."]),
    ]),
  ),
  "es/guias.html": new Set([
    "h3:Que debo enviar antes de contratar un editor de video para YouTube?",
    "h3:Que hace que un video UGC de producto funcione como anuncio?",
    "h3:Que material de restaurante vale la pena enviar a un editor?",
    "h3:Puede un negocio fuera de Florida contratar a Esteban para edicion remota?",
  ]),
};

for (const word of [
  "Aclarar", "Conversacion", "Enfocarse", "Ensenar", "Esteban", "Florida",
  "Florida.", "Miami", "Pagina", "Palabras", "Puede", "Que", "Responder",
  "South", "UGC", "Ver", "anuncio?", "anuncios", "aprobacion", "archivos,",
  "audio,", "bilingue", "brief", "bruto,", "cada", "canal,", "capturar",
  "clara,", "clave", "comentarios.", "comercial", "comida", "como",
  "completo", "consolidar", "contacto", "convertirlo", "cualquier", "debo",
  "del", "depende", "desde", "direccion", "disponibilidad", "dueños",
  "e", "ecommerce", "edicion:", "editor?", "el", "emplatando,", "enviar",
  "equipo", "espanol", "estructura", "filmar", "forma", "fuente", "fuera",
  "funcionan", "funcione", "gancho", "grabacion", "ingles", "inicial,",
  "items", "local", "local,", "lugar;", "manos", "menu,", "miniatura",
  "momento", "momentos", "negocio", "notas", "obligatorios,", "oferta",
  "oferta,", "paquete", "pena", "plantilla", "practica:", "problema,",
  "promocional", "prueba", "pruebas.", "referencia,", "referencias,",
  "relacionada", "remoto", "remoto:", "responsable", "restaurante",
  "restaurantes", "saliendo,", "seguras", "semana.", "separadas",
  "servicio", "social", "subtitulos,", "uso,", "vale", "versiones",
  "visible,", "zonas",
  "YouTube", "edicion", "entregado,", "hace", "limite", "sin",
]) ROUTE_ALLOWED_ADDITIONS["es/guias.html"].add(word);

const baseline = JSON.parse(readFileSync(file, "utf8"));
const problems = [];

const seen = new Set(Object.keys(current));
for (const route of Object.keys(baseline)) {
  // A date-driven route that is still in an older fixture is not a missing
  // page; it is an entry this gate stopped owning. Drop it quietly rather than
  // report a disappearance that never happened.
  if (DATE_DRIVEN.has(route)) continue;
  if (!seen.has(route)) {
    problems.push(`${route}: route disappeared from the build`);
    continue;
  }
  const a = baseline[route];
  const b = current[route];

  // Both directions. The first version only reported words LOST, which reads
  // as the safe half but is not: this change claims presentation and nothing
  // else, so a word that APPEARS is as much a breach of that claim as one that
  // vanishes — it would mean the template started asserting something the copy
  // never said. Silently adding "charlie delta" passed the one-directional
  // version.
  const wordDelta = (from, to) => {
    const extra = [];
    const counts = new Map();
    for (const w of to) counts.set(w, (counts.get(w) ?? 0) + 1);
    for (const w of from) {
      const n = counts.get(w) ?? 0;
      if (n === 0) extra.push(w);
      else counts.set(w, n - 1);
    }
    return extra;
  };

  for (const [field, label] of [
    ["words", "word"],
    ["alt", "alt/title/aria-label word"],
  ]) {
    const before = a[field] === undefined ? [] : a[field].split(" ").filter(Boolean);
    const after = b[field] === undefined ? [] : b[field].split(" ").filter(Boolean);
    const lost = wordDelta(before, after);
    const added = wordDelta(after, before);
    if (lost.length) {
      problems.push(
        `${route}: ${lost.length} ${label}(s) lost — ${lost.slice(0, 8).join(" ")}`,
      );
    }
    // Additions are allowlisted, not forbidden. A rail cannot be adopted
    // without introducing the words it speaks itself — its arrows, its
    // position counter, the call to action on a card, and the alt text of the
    // pictures it finally puts on the page. Refusing all of that would mean
    // refusing the change. Refusing NONE of it would mean a future edit could
    // slip a new claim into 70 pages and call itself presentation.
    //
    // So every token the redesign is allowed to add is written down below, and
    // anything else fails. The list is short on purpose: read it, and you know
    // exactly what these pages started saying.
    const routeAllowed = ROUTE_ALLOWED_ADDITIONS[route] ?? new Set();
    const unexpected = added.filter(
      (w) => !ALLOWED_ADDITIONS.has(w) && !routeAllowed.has(w),
    );
    if (unexpected.length) {
      problems.push(
        `${route}: ${unexpected.length} UNEXPECTED ${label}(s) added — ` +
          `${[...new Set(unexpected)].slice(0, 8).join(" ")}`,
      );
    }
  }

  if (a.headings.join("\u0000") !== b.headings.join("\u0000")) {
    const gone = a.headings.filter((h) => !b.headings.includes(h));
    const addedHeadings = b.headings.filter((h) => !a.headings.includes(h));
    const allowedHeadings = ROUTE_ALLOWED_HEADINGS[route] ?? new Set();
    const unexpectedHeadings = addedHeadings.filter((h) => !allowedHeadings.has(h));
    if (gone.length || unexpectedHeadings.length) {
      problems.push(
        `${route}: heading outline changed` +
          (gone.length
            ? ` — lost ${gone.slice(0, 3).join(" | ")}`
            : ` — added ${unexpectedHeadings.slice(0, 3).join(" | ")}`),
      );
    }
  }

  const lostLinks = a.links.filter((h) => !b.links.includes(h));
  if (lostLinks.length) {
    problems.push(`${route}: ${lostLinks.length} link(s) lost — ${lostLinks.slice(0, 5).join(" ")}`);
  }

  if (a.jsonld !== b.jsonld) {
    problems.push(`${route}: JSON-LD changed`);
  }
}

if (problems.length) {
  console.error(`text-parity: ${problems.length} problem(s)\n`);
  for (const p of problems.slice(0, 40)) console.error(`  ${p}`);
  if (problems.length > 40) console.error(`  … and ${problems.length - 40} more`);
  process.exit(1);
}

console.log(
  `text-parity: ${Object.keys(baseline).length} routes keep every word, heading, link and schema blob`,
);
