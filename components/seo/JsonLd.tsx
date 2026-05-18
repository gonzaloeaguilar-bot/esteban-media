import type { JsonLdNode } from "@/lib/seo/schema";

/**
 * Inline JSON-LD `<script>` tag for structured data.
 *
 * Why a server component + inline script (not next/script):
 *  - JSON-LD must be present in the initial HTML for crawlers that don't run
 *    JS (Bing, AI agents that read static HTML, etc.). `next/script` defers,
 *    which would defeat the point.
 *  - Inlining via `dangerouslySetInnerHTML` is the canonical Next.js pattern
 *    for this (see https://nextjs.org/docs/app/guides/json-ld). React strips
 *    the JSON between text nodes otherwise.
 *
 * Safety: we `JSON.stringify` and then escape `</` to neutralise the only
 * sequence that can break out of a `<script>` tag. We do not accept arbitrary
 * user input here — the only callers compose typed builders from
 * `lib/seo/schema.ts`.
 */
type JsonLdProps = {
  /** Schema graph or single node to serialise. */
  data: JsonLdNode;
  /**
   * Optional stable `id` so a page can render multiple <JsonLd> tags without
   * React-key collisions and so the rendered HTML is easy to grep in tests.
   */
  id?: string;
};

export function JsonLd({ data, id }: JsonLdProps) {
  // Escape "</" so a stray closing-script sequence inside string values can't
  // terminate the <script> early. JSON.stringify already escapes <, but a
  // belt-and-braces replace keeps the invariant obvious.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      id={id}
      // Canonical JSON-LD pattern (https://nextjs.org/docs/app/guides/json-ld);
      // payload is a typed builder result, never user input.
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
