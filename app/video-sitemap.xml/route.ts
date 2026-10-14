import { buildVideoSitemapXml } from "@/lib/video-sitemap";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildVideoSitemapXml(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400",
    },
  });
}
