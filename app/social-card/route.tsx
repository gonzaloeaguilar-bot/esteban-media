import { readFileSync } from "node:fs";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { socialImageSize } from "@/lib/social-image";

export const dynamic = "force-static";

/**
 * The share preview now SHOWS THE HERO.
 *
 * It was a typographic card — brand, headline, three service words, no
 * picture. Shared to Google Business Profile that reads as a slide, not as
 * work, which is a strange first impression for a video editor.
 *
 * Esteban on location, inlined at build time. It has to be inlined: this
 * route is force-static, and ImageResponse cannot resolve a site-relative URL
 * while the page is being generated.
 *
 * It sits in a PANEL on the right rather than full bleed. Every photograph of
 * him is portrait or square (768x1366, 1170x1442, 1170x1146) and this card is
 * 1200x630 — a full-bleed cover of any of them keeps a thin horizontal band
 * through the middle, which is his torso, not his face or the camera. A panel
 * crops far less and leaves the left clear for the words.
 */
const HERO_FRAME = `data:image/jpeg;base64,${readFileSync(
  join(process.cwd(), "public/about/esteban-on-set-frame.jpg"),
).toString("base64")}`;

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background:
            "linear-gradient(135deg, #101214 0%, #1c1714 58%, #442116 100%)",
          color: "#f6f1ea",
          display: "flex",
          height: "100%",
          overflow: "hidden",
          padding: "58px 64px",
          position: "relative",
          width: "100%",
        }}
      >
        {/* The photograph, in a panel on the right. */}
        <img
          src={HERO_FRAME}
          width={520}
          height={socialImageSize.height}
          style={{
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 18%",
            position: "absolute",
            right: 0,
            top: 0,
            width: "520px",
          }}
        />
        {/* The panel's edge is a fade, not a cut, so the picture joins the
            card instead of being pasted onto it — and the words stay on solid
            ink however bright the photograph is behind them. */}
        <div
          style={{
            background:
              "linear-gradient(90deg, #101214 0%, #101214 48%, rgba(16,18,20,0.92) 60%, rgba(16,18,20,0.12) 78%, rgba(16,18,20,0.0) 100%)",
            height: "100%",
            left: 0,
            position: "absolute",
            top: 0,
            width: "100%",
          }}
        />
        <div
          style={{
            background: "#e85d3e",
            borderRadius: "999px",
            height: "340px",
            opacity: 0.18,
            position: "absolute",
            right: "-90px",
            top: "-105px",
            width: "340px",
          }}
        />
        <div
          style={{
            border: "1px solid rgba(246, 241, 234, 0.18)",
            display: "flex",
            height: "100%",
            padding: "42px 46px",
            position: "relative",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div
              style={{
                alignItems: "center",
                display: "flex",
                gap: "18px",
              }}
            >
              <div
                style={{
                  alignItems: "center",
                  background: "#e85d3e",
                  borderRadius: "999px",
                  color: "#ffffff",
                  display: "flex",
                  fontSize: 25,
                  fontWeight: 700,
                  height: 62,
                  justifyContent: "center",
                  letterSpacing: "-0.04em",
                  width: 62,
                }}
              >
                EM
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                <span
                  style={{
                    fontSize: 25,
                    fontWeight: 700,
                    letterSpacing: "0.02em",
                  }}
                >
                  ESTEBAN MORENO MEDIA
                </span>
                <span
                  style={{
                    color: "#cfc6bb",
                    fontSize: 17,
                    letterSpacing: "0.08em",
                  }}
                >
                  FORT LAUDERDALE · SOUTH FLORIDA
                </span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "18px",
                maxWidth: "930px",
              }}
            >
              <div
                style={{
                  color: "#f6f1ea",
                  display: "flex",
                  fontFamily: "serif",
                  fontSize: 72,
                  letterSpacing: "-0.045em",
                  lineHeight: 0.98,
                }}
              >
                Video editing and content built to publish.
              </div>
              <div
                style={{
                  color: "#f0b384",
                  display: "flex",
                  fontSize: 22,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                AI-assisted creative · Social planning · Scoped production
              </div>
            </div>

            <div
              style={{
                alignItems: "center",
                color: "#cfc6bb",
                display: "flex",
                fontSize: 18,
                justifyContent: "space-between",
              }}
            >
              <span>Spanish-first · Remote + local</span>
              <span>estebanmorenomedia.com</span>
            </div>
          </div>
        </div>
      </div>
    ),
    socialImageSize,
  );
}
