import { SiteChrome, siteBodyClassName } from "@/components/site-chrome";
import { englishRootMetadata } from "@/lib/site-metadata";
import "../globals.css";

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
