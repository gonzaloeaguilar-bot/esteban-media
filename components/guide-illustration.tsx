/**
 * An illustration per guide THEME, not per guide.
 *
 * Why illustrations and not photographs: measured 2026-09-29, the 78 guides
 * render ZERO images and the entire photo library is 13 project frames, every
 * one already in use. A project still on "how to send large video files" is
 * decoration, and the art-direction pass already priced that mistake. These
 * drawings carry the idea of the guide instead — a waveform for audio, a
 * two-panel split for a comparison, a funnel for strategy.
 *
 * They are inline SVG on purpose: no extra request, crisp at any size, a few
 * hundred bytes each, and they inherit the page's own colours. They are marked
 * aria-hidden because each one restates a heading that is already read out — a
 * screen reader gets nothing from "two rectangles side by side".
 *
 * No frame is drawn inside the SVG. A first version repeated the hero's corner
 * brackets here, and seen at size it read as a frame floating inside the card's
 * own CSS border — two frames arguing. The rect said it was fine; the pixels did
 * not. The card's border is the frame.
 */

const INK = "#101214";
const ACCENT = "var(--em-accent, #c84a2c)";
const LINE = "#b9aa9a";

type Theme =
  | "comparison"
  | "price"
  | "files"
  | "audio"
  | "short-form"
  | "production"
  | "strategy";

/**
 * The theme is derived from the slug, in BOTH languages, because a guide and its
 * Spanish twin must not get different drawings for the same idea.
 *
 * Order matters: the first match wins, so the narrow themes are tested before
 * the broad ones. `production` is last because it is the fallback for anything
 * about making a video.
 */
const RULES: [Theme, RegExp][] = [
  // `-vs-` alone identifies every real comparison here. "agency"/"agencia" was
  // tried and removed: it matched "video-editing-workflow-for-agencies", which
  // compares nothing, and it matched asymmetrically across the two languages.
  ["comparison", /-vs-|versus|comparacion/],
  // No `rate` at all. Unbounded it matched inside "corpo(rate)"; word-bounded it
  // still caught "how-to-improve-video-retention-rate", which is a metric and not
  // a price. Every real pricing guide here says cost, precio, pricing, tarifa,
  // budget or cuanto-cuesta, so the word buys nothing and costs two wrong
  // drawings.
  ["price", /cost|cuanto-cuesta|precio|pricing|\btarifa\b|budget|presupuesto/],
  ["files", /archivo|file|send|enviar|entrega|handoff|delivery|raw|formato|format|aspect|relacion-de-aspecto|pesado|large/],
  ["audio", /audio|sonido|sound|mezcl|\bmix\b|voice|voz/],
  // Strategy is tested BEFORE short-form: "how-to-script-social-video-ads" is a
  // scripting guide that happens to say "social", and its Spanish twin says
  // "guiones". Tested the other way round they drew different pictures.
  ["strategy", /funnel|embudo|strategy|estrategia|marketing|bilingue|bilingual|b2b|testimonial|guion|script/],
  ["short-form", /reel|short|corto|caption|subtitul|miniatura|thumbnail|retencion|retention|duracion|length|instagram|tiktok|redes|social/],
  ["production", /./],
];

export function guideTheme(slug: string): Theme {
  const s = slug.toLowerCase();
  for (const [theme, re] of RULES) if (re.test(s)) return theme;
  return "production";
}

function Art({ theme }: { theme: Theme }) {
  switch (theme) {
    case "comparison":
      // Two panels over one dividing line: the shape of a "this or that".
      return (
        <g>
          <rect x="24" y="30" width="70" height="60" rx="4" fill={INK} opacity="0.08" />
          <rect x="106" y="30" width="70" height="60" rx="4" fill={ACCENT} opacity="0.16" />
          <line x1="100" y1="22" x2="100" y2="98" stroke={LINE} strokeWidth="1.5" strokeDasharray="4 4" />
          <rect x="34" y="42" width="44" height="4" rx="2" fill={INK} opacity="0.4" />
          <rect x="34" y="54" width="34" height="4" rx="2" fill={INK} opacity="0.25" />
          <rect x="116" y="42" width="44" height="4" rx="2" fill={ACCENT} />
          <rect x="116" y="54" width="50" height="4" rx="2" fill={ACCENT} opacity="0.5" />
          <rect x="116" y="66" width="30" height="4" rx="2" fill={ACCENT} opacity="0.3" />
        </g>
      );
    case "price":
      // A floor and a range above it: what "from $X" actually means.
      return (
        <g>
          <line x1="28" y1="84" x2="172" y2="84" stroke={LINE} strokeWidth="1.5" />
          <rect x="28" y="60" width="26" height="24" rx="2" fill={ACCENT} />
          <rect x="62" y="48" width="26" height="36" rx="2" fill={ACCENT} opacity="0.65" />
          <rect x="96" y="38" width="26" height="46" rx="2" fill={ACCENT} opacity="0.45" />
          <rect x="130" y="30" width="26" height="54" rx="2" fill={ACCENT} opacity="0.25" />
          <line x1="24" y1="60" x2="176" y2="60" stroke={INK} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />
          <circle cx="41" cy="60" r="4" fill={INK} />
        </g>
      );
    case "files":
      // A heavy block becoming a light one, which is the whole transfer problem.
      return (
        <g>
          <rect x="26" y="34" width="46" height="52" rx="4" fill={INK} opacity="0.12" />
          <rect x="34" y="44" width="30" height="4" rx="2" fill={INK} opacity="0.45" />
          <rect x="34" y="54" width="30" height="4" rx="2" fill={INK} opacity="0.45" />
          <rect x="34" y="64" width="20" height="4" rx="2" fill={INK} opacity="0.45" />
          <path d="M84 60h28m0 0-7-6m7 6-7 6" stroke={ACCENT} strokeWidth="2" fill="none" strokeLinecap="round" />
          <rect x="128" y="46" width="34" height="28" rx="4" fill={ACCENT} opacity="0.18" />
          <rect x="136" y="56" width="18" height="4" rx="2" fill={ACCENT} />
        </g>
      );
    case "audio":
      // A waveform. Nothing else says audio this fast.
      return (
        <g stroke={ACCENT} strokeWidth="3" strokeLinecap="round">
          {[10, 26, 44, 18, 54, 34, 62, 28, 46, 20, 38, 14, 30, 50, 22, 12].map((h, i) => (
            <line key={i} x1={28 + i * 9.6} y1={60 - h / 2} x2={28 + i * 9.6} y2={60 + h / 2} opacity={0.25 + (h / 62) * 0.75} />
          ))}
        </g>
      );
    case "short-form":
      // A 9:16 frame with caption bars: the format the guide is about.
      return (
        <g>
          <rect x="78" y="18" width="44" height="84" rx="5" fill={INK} opacity="0.1" stroke={LINE} strokeWidth="1.5" />
          <circle cx="100" cy="46" r="11" fill={ACCENT} opacity="0.5" />
          <rect x="84" y="74" width="32" height="5" rx="2.5" fill={ACCENT} />
          <rect x="88" y="84" width="24" height="5" rx="2.5" fill={ACCENT} opacity="0.55" />
          <rect x="40" y="52" width="22" height="16" rx="3" fill={INK} opacity="0.12" />
          <rect x="138" y="52" width="22" height="16" rx="3" fill={INK} opacity="0.12" />
        </g>
      );
    case "strategy":
      // A funnel: many in, few out.
      return (
        <g>
          <path d="M34 30h132l-42 40v30l-48 14V70Z" fill={ACCENT} opacity="0.16" stroke={ACCENT} strokeWidth="1.5" />
          <line x1="46" y1="42" x2="154" y2="42" stroke={ACCENT} strokeWidth="2" opacity="0.7" />
          <line x1="66" y1="54" x2="134" y2="54" stroke={ACCENT} strokeWidth="2" opacity="0.5" />
          <line x1="86" y1="66" x2="114" y2="66" stroke={ACCENT} strokeWidth="2" opacity="0.35" />
        </g>
      );
    default:
      // A viewfinder mid-take: the default for anything about making the video.
      return (
        <g>
          <rect x="46" y="34" width="86" height="52" rx="4" fill={INK} opacity="0.1" stroke={LINE} strokeWidth="1.5" />
          <path d="M132 50l26-12v44l-26-12Z" fill={ACCENT} opacity="0.35" stroke={ACCENT} strokeWidth="1.5" />
          <circle cx="60" cy="46" r="4" fill={ACCENT} />
          <rect x="70" y="43" width="18" height="5" rx="2.5" fill={INK} opacity="0.35" />
          <line x1="58" y1="74" x2="118" y2="74" stroke={INK} strokeWidth="2" opacity="0.2" />
        </g>
      );
  }
}

export function GuideIllustration({ slug, className }: { slug: string; className?: string }) {
  const theme = guideTheme(slug);
  return (
    <svg
      viewBox="0 0 200 120"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <Art theme={theme} />
    </svg>
  );
}
