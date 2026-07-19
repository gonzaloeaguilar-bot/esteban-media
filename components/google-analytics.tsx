import Script from "next/script";

import sitemap from "@/app/sitemap";
import { buildGoogleAnalyticsScript } from "@/lib/google-analytics-script";
import { site } from "@/lib/site";

export function GoogleAnalytics() {
  const measurementId = site.googleAnalyticsMeasurementId;
  const canonicalHostname = site.domain;
  const instagramHostname = new URL(site.instagram).hostname;
  const allowedPaths = [
    ...sitemap().map((entry) => new URL(entry.url).pathname),
    "/privacy",
    "/es/privacidad",
  ];

  return (
    <>
      <Script
        id="google-tag-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {buildGoogleAnalyticsScript({
          measurementId,
          canonicalHostname,
          instagramHostname,
          allowedPaths,
        })}
      </Script>
    </>
  );
}
