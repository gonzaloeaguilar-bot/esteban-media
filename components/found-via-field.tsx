"use client";

import {
  FOUND_QUERY_MAX,
  FOUND_VIA_ASKS_QUERY,
  FOUND_VIA_OPTIONS,
  isFoundVia,
  type FoundVia,
} from "@/lib/lead-responder";

type FoundViaFieldProps = {
  locale: "en" | "es";
  /** Prefix for the select/input ids, unique per form on the page. */
  idPrefix: string;
  foundVia: FoundVia | "";
  foundQuery: string;
  onFoundViaChange: (value: FoundVia | "") => void;
  onFoundQueryChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
  controlClassName?: string;
};

type Copy = {
  question: string;
  optional: string;
  choose: string;
  queryQuestion: string;
  queryPlaceholder: string;
  labels: Record<FoundVia, string>;
};

const COPY: Record<"en" | "es", Copy> = {
  en: {
    question: "How did you find us?",
    optional: "optional",
    choose: "Choose one",
    queryQuestion: "What did you type or ask?",
    queryPlaceholder: "e.g. video editor for restaurants in Miami",
    labels: {
      chatgpt: "ChatGPT",
      other_ai: "Another AI assistant (Gemini, Perplexity…)",
      google_search: "Google search",
      google_maps: "Google Maps",
      instagram: "Instagram",
      referral: "Someone recommended you",
      other: "Something else",
    },
  },
  es: {
    question: "¿Cómo nos encontraste?",
    optional: "opcional",
    choose: "Elige una",
    queryQuestion: "¿Qué escribiste o preguntaste?",
    queryPlaceholder: "ej. editor de video para restaurantes en Miami",
    labels: {
      chatgpt: "ChatGPT",
      other_ai: "Otra IA (Gemini, Perplexity…)",
      google_search: "Búsqueda en Google",
      google_maps: "Google Maps",
      instagram: "Instagram",
      referral: "Me lo recomendaron",
      other: "Otro",
    },
  },
};

export function foundViaAsksQuery(foundVia: FoundVia | ""): boolean {
  return foundVia !== "" && FOUND_VIA_ASKS_QUERY.has(foundVia);
}

/**
 * Lead-payload fields for the answer. The typed words only ride to /api/lead
 * (and the lead summary); GA4 gets the slug alone via trackLeadSubmit.
 */
export function foundViaPayload(foundVia: FoundVia | "", foundQuery: string) {
  return {
    ...(foundVia ? { foundVia } : {}),
    ...(foundViaAsksQuery(foundVia) && foundQuery.trim()
      ? { foundQuery: foundQuery.trim().slice(0, FOUND_QUERY_MAX) }
      : {}),
  };
}

/** The optional "How did you find us?" select plus, for AI/search answers, the words typed. */
export function FoundViaField({
  locale,
  idPrefix,
  foundVia,
  foundQuery,
  onFoundViaChange,
  onFoundQueryChange,
  disabled = false,
  className,
  labelClassName,
  controlClassName,
}: FoundViaFieldProps) {
  const copy = COPY[locale];
  const selectId = `${idPrefix}-found-via-${locale}`;
  const queryId = `${idPrefix}-found-query-${locale}`;

  return (
    <div className={className}>
      <label htmlFor={selectId} className={labelClassName}>
        {copy.question} <span className="font-normal opacity-80">({copy.optional})</span>
      </label>
      <select
        id={selectId}
        name="foundVia"
        value={foundVia}
        disabled={disabled}
        onChange={(event) => {
          onFoundViaChange(isFoundVia(event.target.value) ? event.target.value : "");
          onFoundQueryChange("");
        }}
        className={controlClassName}
      >
        <option value="">{copy.choose}</option>
        {FOUND_VIA_OPTIONS.map((value) => (
          <option key={value} value={value}>
            {copy.labels[value]}
          </option>
        ))}
      </select>
      {foundViaAsksQuery(foundVia) && (
        <>
          <label htmlFor={queryId} className={`mt-3 block ${labelClassName ?? ""}`}>
            {copy.queryQuestion} <span className="font-normal opacity-80">({copy.optional})</span>
          </label>
          <input
            id={queryId}
            name="foundQuery"
            type="text"
            maxLength={FOUND_QUERY_MAX}
            value={foundQuery}
            disabled={disabled}
            onChange={(event) => onFoundQueryChange(event.target.value)}
            placeholder={copy.queryPlaceholder}
            className={controlClassName}
          />
        </>
      )}
    </div>
  );
}
