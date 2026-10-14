import ledger from "@/config/page-lastmod.json";

/**
 * The date a page's own content last changed, from config/page-lastmod.json.
 *
 * The ledger is written by `pnpm lastmod:update` (scripts/page-lastmod.mjs):
 * one date per sitemap path, moved only when that page's own sources change,
 * and checked by app/__tests__/page-lastmod.test.ts so it cannot go stale.
 * Returns undefined for a path the ledger does not know, so no date is ever
 * invented.
 */
export type PageLastmodEntry = { date: string; hash: string };

const entries = ledger as Record<string, PageLastmodEntry>;

export function normalizePagePath(path: string): string {
  const clean = path.split(/[?#]/)[0].replace(/\/$/, "");
  return clean === "" ? "/" : clean;
}

export function pageLastModified(path: string): string | undefined {
  return entries[normalizePagePath(path)]?.date;
}

type JsonNode = Record<string, unknown>;

const PAGE_TYPES = new Set(["WebPage", "CollectionPage", "AboutPage", "ContactPage", "FAQPage", "ItemPage"]);

function isPageNode(node: JsonNode): boolean {
  const t = node["@type"];
  const types = Array.isArray(t) ? t : [t];
  return types.some((x) => typeof x === "string" && PAGE_TYPES.has(x) && x !== "FAQPage");
}

/**
 * Adds the ledger's dateModified to the page's WebPage node, so the JSON-LD
 * date and the visible "Updated" line (PageUpdated) are the same date as the
 * sitemap <lastmod>. If the graph has no WebPage node, one is added. A path
 * the ledger does not know is returned untouched.
 */
export function withPageDate<T extends JsonNode>(path: string, jsonLd: T, pageUrl: string): T {
  const date = pageLastModified(path);
  if (!date) return jsonLd;
  const graph = jsonLd["@graph"];
  if (Array.isArray(graph)) {
    let stamped = false;
    const next = (graph as JsonNode[]).map((node) => {
      if (!stamped && isPageNode(node)) {
        stamped = true;
        return { ...node, dateModified: date };
      }
      return node;
    });
    if (!stamped) {
      next.push({ "@type": "WebPage", "@id": `${pageUrl}#webpage`, url: pageUrl, dateModified: date });
    }
    return { ...jsonLd, "@graph": next };
  }
  if (isPageNode(jsonLd)) return { ...jsonLd, dateModified: date };
  return {
    "@context": "https://schema.org",
    "@graph": [
      Object.fromEntries(Object.entries(jsonLd).filter(([k]) => k !== "@context")),
      { "@type": "WebPage", "@id": `${pageUrl}#webpage`, url: pageUrl, dateModified: date },
    ],
  } as unknown as T;
}
