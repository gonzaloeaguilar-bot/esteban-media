import { SiteChrome, siteBodyClassName } from "@/components/site-chrome";
import { spanishRootMetadata } from "@/lib/site-metadata";
import "../globals.css";
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
      </body>
    </html>
  );
}
