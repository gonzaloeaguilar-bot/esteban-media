import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Esteban Media — Visual storytelling in South Florida",
    template: "%s · Esteban Media",
  },
  description:
    "Esteban — aerial cinematography, photography, videography, and post-production. Based in South Florida. Bilingual EN/ES.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
