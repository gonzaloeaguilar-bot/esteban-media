import { buildLlmsTxt } from "@/lib/llms-txt";

// Prerendered at build time: hand-written facts plus a page index generated
// from the sitemap sources, so new sitemap URLs are listed automatically.
export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
