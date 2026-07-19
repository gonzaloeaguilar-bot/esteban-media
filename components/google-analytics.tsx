import Script from "next/script";

import { site } from "@/lib/site";

export function GoogleAnalytics() {
  const measurementId = site.googleAnalyticsMeasurementId;
  const canonicalHostname = site.domain;

  return (
    <>
      <Script
        id="google-tag-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          if (window.location.hostname === ${JSON.stringify(canonicalHostname)}) {
            gtag('config', ${JSON.stringify(measurementId)}, {
              send_page_view: true,
              allow_google_signals: false,
              allow_ad_personalization_signals: false
            });
          }
        `}
      </Script>
    </>
  );
}
