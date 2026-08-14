import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/site";

// AI answer engines that we explicitly welcome. A bare `User-agent: *  Allow: /`
// already permits them, so this is not unblocking anything today — it is a
// durable declaration: if a future rule ever narrows `*`, these named agents
// keep their access, and several engines document that they honour their own
// named directive ahead of the wildcard.
//
// Live audit 2026-08-14 across the six portfolio domains: estebanmorenomedia.com
// had a 4-line robots.txt with zero AI-crawler directives — the weakest crawl
// posture of the six (flas, geebs and titanforge each name all four).
const AI_CRAWLERS = [
  "GPTBot", // OpenAI training/crawl
  "OAI-SearchBot", // ChatGPT Search index
  "ChatGPT-User", // ChatGPT live user-initiated fetch
  "ClaudeBot", // Anthropic crawl
  "Claude-User", // Claude live user-initiated fetch
  "PerplexityBot", // Perplexity index
  "Google-Extended", // Gemini / AI Overviews grounding
] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
      })),
    ],
    sitemap: [absoluteUrl("/sitemap.xml"), absoluteUrl("/video-sitemap.xml")],
  };
}
