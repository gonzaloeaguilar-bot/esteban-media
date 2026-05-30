import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Esteban Media — Visual Storytelling",
    template: "%s · Esteban Media",
  },
  description:
    "South Florida visual storyteller. Aerial, photography, videography, editing.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
