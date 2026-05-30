import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { getService, serviceSlugs } from "@/lib/services";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: ServicePageProps,
): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.blurb,
  };
}

{/* TRANSLATION REVIEW NEEDED — ES copy to follow once next-intl is wired. */}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  return (
    <main>
      <section className="border-b border-[var(--color-border)] bg-[var(--color-background)]">
        <Container className="py-20 md:py-28">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-[var(--color-muted-foreground)] md:text-sm">
            <Link href="/services" className="hover:text-[var(--color-foreground)]">
              Services
            </Link>
            <span className="mx-2">/</span>
            <span>{service.title}</span>
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            {service.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--color-muted-foreground)] md:text-lg">
            {service.blurb}
          </p>

          <div className="mt-12 rounded-lg border border-dashed border-[var(--color-border)] bg-[var(--color-muted)]/40 p-8 md:p-12">
            <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-muted-foreground)]">
              Coming soon
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--color-foreground)]">
              Full case studies, pricing, and sample work for {service.title.toLowerCase()}{" "}
              are on the way. In the meantime, get in touch and we&apos;ll walk you
              through recent projects.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex h-10 items-center rounded-md bg-[var(--color-foreground)] px-5 text-sm font-medium text-[var(--color-background)] transition-opacity hover:opacity-90"
              >
                Start a project
              </Link>
              <Link
                href="/services"
                className="inline-flex h-10 items-center rounded-md border border-[var(--color-border)] px-5 text-sm font-medium text-[var(--color-foreground)] transition-colors hover:bg-[var(--color-muted)]"
              >
                Back to services
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
