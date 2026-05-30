import Link from "next/link";
import type { Metadata } from "next";
import {
  Camera,
  Film,
  Image as ImageIcon,
  Plane,
  Video,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { services, type ServiceEntry } from "@/lib/services";

const iconMap: Record<ServiceEntry["icon"], LucideIcon> = {
  drone: Plane,
  camera: Camera,
  video: Video,
  film: Film,
  image: ImageIcon,
};

export const metadata: Metadata = {
  title: "Services",
  description:
    "Aerial, photography, videography, video editing, and photo editing — full-service visual storytelling across South Florida.",
};

{/* TRANSLATION REVIEW NEEDED — ES copy to follow once next-intl is wired. */}

export default function ServicesOverviewPage() {
  return (
    <main>
      <section className="border-b border-[var(--color-border)] bg-[var(--color-background)]">
        <Container className="py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-[var(--color-muted-foreground)] md:text-sm">
              Services
            </p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              Five disciplines, one visual language.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-[var(--color-muted-foreground)] md:text-lg">
              From the air to the edit bay — every service is shot, cut, and
              finished by the same eye. Pick a discipline to see how we work.
            </p>
          </div>

          <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((item) => {
              const Icon = iconMap[item.icon];
              return (
                <li key={item.slug}>
                  <Link
                    href={`/services/${item.slug}`}
                    className="group flex h-full flex-col gap-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-6 transition-colors hover:bg-[var(--color-muted)] focus-visible:bg-[var(--color-muted)] focus-visible:outline-none md:p-8"
                  >
                    <div className="flex items-center justify-between">
                      <Icon
                        className="h-6 w-6 text-[var(--color-foreground)] transition-transform group-hover:-translate-y-0.5"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                      <ArrowUpRight
                        className="h-4 w-4 text-[var(--color-muted-foreground)] opacity-0 transition-opacity group-hover:opacity-100"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </div>
                    <h2 className="text-xl font-medium text-[var(--color-foreground)]">
                      {item.title}
                    </h2>
                    <p className="text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                      {item.blurb}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>
    </main>
  );
}
