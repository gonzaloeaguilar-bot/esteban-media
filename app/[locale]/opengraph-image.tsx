/**
 * Site-wide default Open Graph image, rendered at build time via `next/og`.
 *
 * Convention: this file lives in `app/[locale]/` so Next.js attaches the
 * generated image to every page under the locale segment automatically
 * (https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image).
 * Pages that want a custom OG image can add their own `opengraph-image.tsx`
 * in their own segment — that will override this one.
 *
 * The image is intentionally typographic, not photographic. Esteban hasn't
 * delivered real reference assets yet (CLAUDE.md rule: never AI-generate
 * photos), so we ship a cinematic black card with the brand wordmark + tagline
 * and swap in a hero still once one exists.
 *
 * Twitter cards reuse this image automatically (Next attaches it to
 * `twitter.images` too) unless a `twitter-image.*` file overrides it.
 */
import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

import { routing, type Locale } from "@/i18n/routing";

// 1200×630 is the canonical OG/Twitter summary-large-image aspect ratio and
// the size Slack/iMessage/LinkedIn unfurl previews expect.
export const size = { width: 1200, height: 630 } as const;
export const contentType = "image/png";

// `alt` falls back to a stable English string — Next requires a literal here
// because the value lands in the static metadata at build time and cannot be
// awaited.
export const alt = "Esteban Moreno Media — Fort Lauderdale Video Editor";

/**
 * Pre-render one image per locale at build time. Without this, Next would
 * only generate the image lazily per request — fine, but pre-rendering keeps
 * preview deploys instant when a crawler hits a fresh URL.
 */
export function generateImageMetadata() {
  return routing.locales.map((locale) => ({
    id: locale,
    alt,
    size,
    contentType,
  }));
}

type Params = { locale: Locale };

export default async function Opengraph({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale } = await params;

  // Read brand strings from the i18n bundle so the image is locale-aware
  // without hard-coding copy in TSX.
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const headline = t("defaultTitle");
  const subline = t("defaultDescription");

  // No custom fonts loaded — next/og falls back to a clean system sans-serif,
  // which keeps the build lean and avoids shipping font binaries until brand
  // typography is locked.
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "linear-gradient(135deg, #050505 0%, #0a0a0a 55%, #141414 100%)",
          color: "#ffffff",
        }}
      >
        {/* Top row: brand wordmark + locale tag */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.65)",
          }}
        >
          <span>Esteban Moreno Media</span>
          <span>{locale.toUpperCase()}</span>
        </div>

        {/* Hero block: headline + subline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
            maxWidth: 980,
          }}
        >
          <div
            style={{
              fontSize: 64,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              fontWeight: 600,
            }}
          >
            {headline}
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.35,
              color: "rgba(255,255,255,0.75)",
            }}
          >
            {subline}
          </div>
        </div>

        {/* Bottom rule: thin accent line keeps the card feeling cinematic */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 20,
            color: "rgba(255,255,255,0.55)",
          }}
        >
          <span
            style={{
              width: 80,
              height: 2,
              background: "rgba(255,255,255,0.55)",
            }}
          />
          <span>Video Editing · Videography · Aerial · Photo</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
