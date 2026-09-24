import Script from "next/script";
import { useEffect } from "react";

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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isBot = navigator.webdriver || 
                    /bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent);
      if (!isBot) {
        const scriptContent = buildGoogleAnalyticsScript({
          measurementId,
          canonicalHostname,
          instagramHostname,
          allowedPaths,
        });
        const script = document.createElement('script');
        script.textContent = scriptContent;
        document.head.appendChild(script);
      }
    }
  }, [measurementId, canonicalHostname, instagramHostname, allowedPaths]);

  return (
    <>
      <Script
        id="google-tag-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`}
        strategy="afterInteractive"
      />
      {/* The shared cross-brand layer: section views, every button, the form
          lifecycle, media and on-page errors — none of which this site
          measured. Its sink is the GA script's own writer, so everything
          leaves through one place and carries the contract's parameter block.
          page_view, scroll_depth and the contact/outbound clicks the script
          already owns are disabled: one writer per event name. */}
      <Script id="shared-analytics-lib" src="/track.js" strategy="afterInteractive" />
      <Script id="shared-analytics-init" strategy="afterInteractive">{`
        (function(){
          var tries = 0;
          (function boot(){
            if (!window.Analytics || !window.__estebanTrack) { if (++tries > 20) return; return setTimeout(boot, 300); }
            window.Analytics.init({
              brand: 'esteban',
              disable: ['page_view', 'scroll_depth', 'contact_click', 'outbound_click'],
              sink: function (e, p) { window.__estebanTrack(e, p); }
            });
          })();
        })();
      `}</Script>
    </>
  );
}
