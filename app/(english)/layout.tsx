import { SiteChrome, siteBodyClassName } from "@/components/site-chrome";
import { englishRootMetadata } from "@/lib/site-metadata";
import "../globals.css";
import "../../vendor/web-kit/brand-moment/moment.css";
import "../../vendor/web-kit/reading-path/reading-path.css";
import "../cinema.css";

export const metadata = englishRootMetadata;

export default function EnglishRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US">
      <body className={siteBodyClassName}>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
