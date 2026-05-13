import type { Metadata } from "next";

import "./globals.css";
import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";

export const metadata: Metadata = {
  title: {
    default: "Esteban Media — Visual storyteller, South Florida",
    template: "%s · Esteban Media",
  },
  description:
    "Aerial, photography, videography, and post for brands, weddings, and small teams in South Florida.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-dvh flex-col antialiased">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
