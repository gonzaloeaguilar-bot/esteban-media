// Cómo se busca en este kit, en un solo sitio.
//
// Vive aparte porque hay DOS entradas al mismo índice —se escribe (RailFinder)
// y se habla (RailVoice)— y dos copias de la comparación divergen: la de voz
// acaba encontrando cosas que la de texto no, y nadie sabe cuál manda.

export type RailFindEntry = {
  id: string;
  title: string;
  href: string;
  section?: string;
  summary?: string;
  keywords?: string[];
};

/** Accent-insensitive, case-insensitive. "diseno" has to find "diseño". */
function fold(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

/**
 * Folds a string AND keeps a map back to the original characters.
 *
 * Highlighting the match needs both: the match is found in the folded text
 * ("diseno") but has to be painted on the original ("diseño"), and folding can
 * change a string's length — so an index from one is not an index into the
 * other. Slicing the original with a folded index is how a highlight lands one
 * character off, or splits a letter in half.
 */
function foldWithMap(value: string) {
  let folded = "";
  const map: number[] = [];
  for (let i = 0; i < value.length; i += 1) {
    const piece = fold(value[i]);
    for (let j = 0; j < piece.length; j += 1) map.push(i);
    folded += piece;
  }
  map.push(value.length);
  return { folded, map };
}

/** Splits the original text into the pieces that matched and the pieces that did not. */
function highlight(text: string, terms: string[]) {
  if (terms.length === 0) return [{ text, hit: false }];
  const { folded, map } = foldWithMap(text);
  const ranges: Array<[number, number]> = [];
  for (const term of terms) {
    if (!term) continue;
    let from = 0;
    for (;;) {
      const at = folded.indexOf(term, from);
      if (at === -1) break;
      ranges.push([map[at], map[at + term.length]]);
      from = at + term.length;
    }
  }
  if (ranges.length === 0) return [{ text, hit: false }];
  ranges.sort((a, b) => a[0] - b[0]);
  // Los solapes se funden: dos terminos que pisan la misma letra no pueden
  // pintarla dos veces.
  const merged: Array<[number, number]> = [];
  for (const range of ranges) {
    const last = merged[merged.length - 1];
    if (last && range[0] <= last[1]) last[1] = Math.max(last[1], range[1]);
    else merged.push([range[0], range[1]]);
  }
  const pieces: Array<{ text: string; hit: boolean }> = [];
  let cursor = 0;
  for (const [start, end] of merged) {
    if (start > cursor) pieces.push({ text: text.slice(cursor, start), hit: false });
    pieces.push({ text: text.slice(start, end), hit: true });
    cursor = end;
  }
  if (cursor < text.length) pieces.push({ text: text.slice(cursor), hit: false });
  return pieces;
}

/** Los términos de una consulta, ya plegados. Vacío si no hay consulta. */
export function terms(query: string) {
  const q = fold(query.trim());
  return q ? q.split(/\s+/) : [];
}

/** Todo lo que casa con TODOS los términos. Sin términos, todo. */
export function search<T extends RailFindEntry>(entries: T[], list: string[]) {
  if (list.length === 0) return entries;
  return entries.filter((entry) => {
    const hay = fold(
      [entry.title, entry.section, entry.summary, ...(entry.keywords ?? [])]
        .filter(Boolean)
        .join(" "),
    );
    return list.every((term) => hay.includes(term));
  });
}

export { fold, foldWithMap, highlight };
