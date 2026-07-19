import { ImageResponse } from "next/og";

import { socialImageSize } from "@/lib/social-image";

export const dynamic = "force-static";

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
