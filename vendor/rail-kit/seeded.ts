/**
 * Un numero estable entre 0 y 1 a partir de un texto.
 *
 * Vive aparte porque lo usan el confeti y los destellos, y una copia por efecto
 * habria divergido en la primera prisa. Es determinista a proposito: con
 * Math.random el servidor y el cliente pintan distinto y la primera pintura
 * salta al hidratar.
 */
export function seeded(text: string, index: number) {
  let h = 2166136261;
  const s = `${text}:${index}`;
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 1000) / 1000;
}
