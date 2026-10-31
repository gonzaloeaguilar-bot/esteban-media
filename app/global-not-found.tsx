import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

import { SiteChrome, siteBodyClassName } from "@/components/site-chrome";
import { Container } from "@/components/ui/container";
import { whatsappHref } from "@/lib/packages";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: "Page Not Found | Esteban Moreno Media",
  description: "The requested page is not available.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en-US" suppressHydrationWarning>
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
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Return home
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  See the work
                </Link>
                <a
                  href={whatsappHref(site.phone.e164, "Hi Esteban, I landed on a page that does not exist, but I want to discuss a video project.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1faa55] px-6 text-sm font-medium text-white hover:bg-[#178a44]"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  Get a quote on WhatsApp
                </a>
              </div>
              <div className="mt-4 flex flex-wrap gap-3" lang="es">
                <Link
                  href="/es"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  Volver al inicio en español
                </Link>
                <Link
                  href="/es/portafolio"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  Ver el trabajo
                </Link>
                <Link
                  href="/es/contacto"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  Contacto
                </Link>
              </div>
            </Container>
          </main>
        </SiteChrome>
      </body>
    </html>
  );
}
