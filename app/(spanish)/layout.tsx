import Script from "next/script";
import { SiteChrome, siteBodyClassName } from "@/components/site-chrome";
import { spanishRootMetadata } from "@/lib/site-metadata";
import "../globals.css";
import "../../vendor/web-kit/brand-moment/moment.css";
import "../../vendor/web-kit/reading-path/reading-path.css";
import "../cinema.css";

export const metadata = spanishRootMetadata;

export default function SpanishRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={siteBodyClassName}>
        <SiteChrome>{children}</SiteChrome>
        {/* In-page links must still land when their target is collapsed: a
            schema anchor pointing INTO a <details> is a silent break that looks
            perfect in a screenshot. */}
        <Script src="/wk-reading-path-anchors.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
