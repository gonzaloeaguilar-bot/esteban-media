import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SiteChrome, siteBodyClassName } from "@/components/site-chrome";
import { Container } from "@/components/ui/container";
import "./globals.css";

export const metadata: Metadata = {
  title: "Page Not Found | Esteban Moreno Media",
  description: "The requested page is not available.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en-US">
      <body className={siteBodyClassName}>
        <SiteChrome>
          <main className="bg-[#f6f1ea] py-20 text-[#101214] sm:py-28">
            <Container size="xl">
              <p className="text-xs font-medium uppercase tracking-wide text-[#9f3c27]">
                404 · Page not found / Página no encontrada
              </p>
              <h1 className="mt-5 max-w-3xl font-serif em-display">
                This address does not lead to an available page.
              </h1>
              <p lang="es" className="mt-5 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Esta dirección no lleva a una página disponible.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#c84a2c] px-6 text-sm font-medium text-white hover:bg-[#a93e29]"
                >
                  Return home
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/es"
                  lang="es"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  Volver al inicio en español
                </Link>
              </div>
            </Container>
          </main>
        </SiteChrome>
      </body>
    </html>
  );
}
