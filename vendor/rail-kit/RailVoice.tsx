"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { search, terms as splitTerms, type RailFindEntry } from "./find";

export type RailVoiceProps = {
  /** The same index RailFinder uses. One list, two ways in. */
  entries: RailFindEntry[];
  /**
   * The language the site expects to be spoken, as a BCP-47 tag: "es-CO",
   * "en-US". Required, because recognition accuracy collapses on the wrong one
   * and there is no sane default for a bilingual portfolio.
   */
  lang: string;
  /** Accessible name of the microphone button. */
  label: string;
  /** Shown while listening. */
  listeningLabel: string;
  /** Shown when nothing matched, with the transcript beside it. */
  noResultsLabel: string;
  /** Shown when the browser cannot listen at all. */
  unsupportedLabel?: string;
  /** Shown when the person refuses the microphone, or it fails. */
  deniedLabel: string;
  glyph?: ReactNode;
  /**
   * Hand the raw transcript somewhere else — your own assistant, your own
   * search endpoint — instead of matching it against `entries`.
   *
   * The kit does not call a model. A component that shipped an API key or
   * chose a provider for you would be making that decision in a CSS library.
   */
  onTranscript?: (info: { source: string; transcript: string }) => void;
  onSelect?: (info: { source: string; id: string; href: string; transcript: string }) => void;
  source: string;
  className?: string;
};

type Phase = "idle" | "listening" | "done" | "denied" | "unsupported";

/* eslint-disable @typescript-eslint/no-explicit-any */
/** No hay a que suscribirse: el soporte del navegador no cambia en vida de la
    pagina. La funcion existe porque `useSyncExternalStore` la exige, y va fuera
    del componente para que su referencia sea estable. */
function suscribirMotor(): () => void {
  return () => {};
}

function recogniser(): any {
  if (typeof window === "undefined") return null;
  const w = window as any;
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

/**
 * Say what you are looking for, and get the pages that match.
 *
 * It matches against the SAME index as `RailFinder`, through the same module,
 * because two copies of "what counts as a match" drift and then speaking finds
 * things typing cannot.
 *
 * **It never navigates on its own.** Recognition mishears — names, accents,
 * a noisy room — and a wrong jump costs a visitor their place with no way to
 * tell what happened. Options are shown; the person picks. The one case where
 * a single result auto-navigates is the case where recognition was wrong and
 * nobody can prove it.
 *
 * **It says nothing when the browser cannot listen.** `SpeechRecognition` is
 * absent in Firefox and on most non-Chromium browsers; rendering a microphone
 * that does nothing is worse than rendering none.
 *
 * Privacy, which the site owner owns and must disclose: in Chrome this API
 * streams audio to Google's servers for transcription. It is not on-device.
 * That is a decision about a visitor's voice, so it belongs in the site's own
 * copy, not buried in a component.
 */
export default function RailVoice({
  entries,
  lang,
  label,
  listeningLabel,
  noResultsLabel,
  unsupportedLabel,
  deniedLabel,
  glyph,
  onTranscript,
  onSelect,
  source,
  className,
}: RailVoiceProps) {
  // EL SERVIDOR NO TIENE NAVEGADOR, y por tanto no tiene reconocimiento de voz.
  // Esto lo leia en el inicializador de `useState`: el servidor pintaba «no
  // soportado» y Chrome pintaba el boton de hablar. Dos HTML distintos, y React
  // tira el del servidor y repinta con el aviso #418. Medido renderizando las
  // 92 stories dentro de un build de produccion de Next — en desarrollo NO se
  // reproduce, asi que no lo veria nadie hasta produccion.
  //
  // El comentario de abajo tiene razon en que el soporte «se sabe en el primer
  // render del cliente». Lo que se le paso es que ANTES hay un render de
  // servidor, y ese tambien cuenta.
  //
  // `getServerSnapshot` da el valor que usan el servidor Y el primer render del
  // cliente, asi que coinciden; React lee el de verdad justo despues.
  const soportado = useSyncExternalStore(
    suscribirMotor,
    () => recogniser() !== null,
    () => false,
  );
  const [override, setOverride] = useState<Phase | null>(null);
  const phase: Phase = override ?? (soportado ? "idle" : "unsupported");
  const setPhase = (v: Phase | ((p: Phase) => Phase)) =>
    setOverride((prev) => {
      const actual = prev ?? (recogniser() ? "idle" : "unsupported");
      return typeof v === "function" ? (v as (p: Phase) => Phase)(actual) : v;
    });
  const [transcript, setTranscript] = useState("");
  const engine = useRef<any>(null);

  // Support is a fact about the browser, known on the first client render —
  // so it is the initial state, not a state change made immediately after.

  useEffect(() => () => engine.current?.abort?.(), []);

  const listen = useCallback(() => {
    const Engine = recogniser();
    if (!Engine) {
      setPhase("unsupported");
      return;
    }
    const it = new Engine();
    engine.current = it;
    it.lang = lang;
    it.interimResults = true;
    it.continuous = false;
    it.onresult = (event: any) => {
      let said = "";
      for (let i = 0; i < event.results.length; i += 1) said += event.results[i][0].transcript;
      setTranscript(said.trim());
    };
    it.onerror = (event: any) => {
      setPhase(event?.error === "not-allowed" || event?.error === "service-not-allowed" ? "denied" : "done");
    };
    it.onend = () => {
      setPhase((p) => (p === "listening" ? "done" : p));
      setTranscript((said) => {
        if (said) onTranscript?.({ source, transcript: said });
        return said;
      });
    };
    setTranscript("");
    setPhase("listening");
    try {
      it.start();
    } catch {
      setPhase("denied");
    }
  }, [lang, onTranscript, source]);

  const stop = useCallback(() => engine.current?.stop?.(), []);

  // Un microfono que no escucha no se pinta.
  if (phase === "unsupported") {
    return unsupportedLabel ? (
      <p className={["rail-voice__unsupported", className].filter(Boolean).join(" ")}>
        {unsupportedLabel}
      </p>
    ) : null;
  }

  const results = transcript ? search(entries, splitTerms(transcript)) : [];
  const listening = phase === "listening";

  return (
    <div className={["rail-voice", className].filter(Boolean).join(" ")} data-rail-voice={source}>
      <button
        type="button"
        className={["rail-voice__mic", listening && "rail-voice__mic--on"].filter(Boolean).join(" ")}
        aria-label={label}
        aria-pressed={listening}
        onClick={listening ? stop : listen}
      >
        <span className="rail-voice__glyph" aria-hidden="true">
          {glyph ?? (
            <svg viewBox="0 0 24 24" width="20" height="20" focusable="false">
              <rect x="9" y="3" width="6" height="11" rx="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <path d="M5 11a7 7 0 0 0 14 0M12 18v3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          )}
        </span>
      </button>

      <p className="rail-voice__status" role="status" aria-live="polite">
        {phase === "denied" ? deniedLabel : listening ? listeningLabel : transcript}
      </p>

      {phase === "done" && transcript && results.length === 0 && (
        <p className="rail-voice__empty">
          {noResultsLabel} <span className="rail-voice__said">{transcript}</span>
        </p>
      )}

      {results.length > 0 && (
        <ul className="rail-voice__results">
          {results.map((entry) => (
            <li key={entry.id}>
              <a
                className="rail-voice__link"
                href={entry.href}
                onClick={() => onSelect?.({ source, id: entry.id, href: entry.href, transcript })}
              >
                {entry.section && <span className="rail-voice__section">{entry.section}</span>}
                <span className="rail-voice__title">{entry.title}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
