import Link from "next/link";
import {
  Camera,
  Film,
  Image as ImageIcon,
  Plane,
  Video,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { homeContent, type ServiceEntry } from "./content";

const iconMap: Record<ServiceEntry["icon"], LucideIcon> = {
  drone: Plane,
  camera: Camera,
  video: Video,
  film: Film,
  image: ImageIcon,
};

export function Services() {
  const { eyebrow, heading, items } = homeContent.services;

  return (
    <section
      id="services"
      className="border-b border-[var(--color-border)] bg-[var(--color-background)]"
    >
      <Container className="py-20 md:py-28">
        <div className="max-w-2xl">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-[var(--color-muted-foreground)] md:text-sm">
            {eyebrow}
          </p>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
            {heading}
          </h2>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-5">
          {items.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <li key={item.slug} className="bg-[var(--color-background)]">
                <Link
                  href={`/services/${item.slug}`}
                  className="group flex h-full flex-col gap-4 p-6 transition-colors hover:bg-[var(--color-muted)] focus-visible:bg-[var(--color-muted)] focus-visible:outline-none md:p-8"
                >
                  <Icon
                    className="h-6 w-6 text-[var(--color-foreground)] transition-transform group-hover:-translate-y-0.5"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <h3 className="text-lg font-medium text-[var(--color-foreground)]">
                    {item.title}
                  </h3>
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
  );
}
