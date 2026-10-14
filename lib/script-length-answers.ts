// "How many words fit in a 30-second video?" on the script tools (overnight
// loop round 5, 2026-10-14).
//
// Evidence: /es/calculadora-de-ritmo-de-video had 27 Search Console
// impressions at position 7.6 and 0 clicks over 90 days, and /daily-script-timer
// 31 at 82 for "how long is my script" / "script time"; both pages were the
// tool alone, with no question-shaped heading and no citable answer. Bing shows
// script-pacing queries at 5-7 on /daily-script-pacing-calculator.
//
// Claim discipline: the only figures are arithmetic (seconds / 60 x words per
// minute) at the 130 / 150 / 170 presets of the script timer; every page here
// estimates time with words / pace x 60 (components/daily-script-*.tsx).

export const SCRIPT_PACES = [130, 150, 170] as const;
export const SCRIPT_LENGTHS = [15, 30, 60, 90] as const;

export function wordsFor(seconds: number, wpm: number): number {
  return Math.round((seconds / 60) * wpm);
}

export type ScriptLengthAnswer = {
  path: string;
  locale: "en" | "es";
  id: string;
  heading: string;
  paragraph: string;
  tableLabel: string;
};

// One full entry per page so the date ledger sees each page's copy in its own block.
export const SCRIPT_LENGTH_ANSWERS: readonly ScriptLengthAnswer[] = [
  {
    path: "/daily-script-timer",
    locale: "en",
    id: "words-per-video-length",
    heading: "How many words fit in a 30-second or 60-second video?",
    paragraph:
      "Divide the length in seconds by 60 and multiply by the speaking pace. At a natural 150 words per minute, a 30-second Reel holds about 75 spoken words and a 60-second Short about 150; at a calm 130 it is 65 and 130, and at an upbeat 170 it is 85 and 170. This page estimates time with the same formula: words divided by the pace, times 60. If the script runs long, cut words rather than speeding up, because a rushed delivery is harder to follow with the sound off and the hook needs a pause to land.",
    tableLabel: "Words per length at three paces",
  },
  {
    path: "/daily-script-pacing-calculator",
    locale: "en",
    id: "words-per-video-length",
    heading: "How many words fit in a 30-second or 60-second video?",
    paragraph:
      "Divide the length in seconds by 60 and multiply by the speaking pace. At a natural 150 words per minute, a 30-second Reel holds about 75 spoken words and a 60-second Short about 150; at a calm 130 it is 65 and 130, and at an upbeat 170 it is 85 and 170. This page estimates time with the same formula: words divided by the pace, times 60. If the script runs long, cut words rather than speeding up, because a rushed delivery is harder to follow with the sound off and the hook needs a pause to land.",
    tableLabel: "Words per length at three paces",
  },
  {
    path: "/es/temporizador-de-guiones-de-video",
    locale: "es",
    id: "palabras-por-duracion-de-video",
    heading: "¿Cuántas palabras caben en un video de 30 o 60 segundos?",
    paragraph:
      "Divide la duración en segundos entre 60 y multiplica por el ritmo al hablar. A un ritmo natural de 150 palabras por minuto, un Reel de 30 segundos tiene unas 75 palabras habladas y un Short de 60 segundos unas 150; a un ritmo calmado de 130 son 65 y 130, y a uno dinámico de 170 son 85 y 170. Esta página estima el tiempo con la misma fórmula: palabras divididas entre el ritmo, por 60. Si el guion queda largo, quita palabras en lugar de hablar más rápido, porque una lectura apurada se entiende peor sin sonido y el gancho necesita una pausa.",
    tableLabel: "Palabras por duración a tres ritmos",
  },
  {
    path: "/es/calculadora-de-ritmo-de-video",
    locale: "es",
    id: "palabras-por-duracion-de-video",
    heading: "¿Cuántas palabras caben en un video de 30 o 60 segundos?",
    paragraph:
      "Divide la duración en segundos entre 60 y multiplica por el ritmo al hablar. A un ritmo natural de 150 palabras por minuto, un Reel de 30 segundos tiene unas 75 palabras habladas y un Short de 60 segundos unas 150; a un ritmo calmado de 130 son 65 y 130, y a uno dinámico de 170 son 85 y 170. Esta página estima el tiempo con la misma fórmula: palabras divididas entre el ritmo, por 60. Si el guion queda largo, quita palabras en lugar de hablar más rápido, porque una lectura apurada se entiende peor sin sonido y el gancho necesita una pausa.",
    tableLabel: "Palabras por duración a tres ritmos",
  },
];

export function scriptLengthAnswerFor(path: string): ScriptLengthAnswer | undefined {
  return SCRIPT_LENGTH_ANSWERS.find((entry) => entry.path === path);
}
