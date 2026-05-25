import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SERVICES, getServiceBySlug } from "@/lib/services";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata(props: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service not found" };
  return {
    title: service.title,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage(props: {
  params: Promise<Params>;
}) {
  const { slug } = await props.params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const Icon = service.icon;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Container className="py-20 sm:py-28">
        <Link
          href="/services"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          All services
        </Link>

        <div className="mt-8 flex max-w-3xl flex-col gap-4">
          <Icon
            className="size-8 text-muted-foreground"
            aria-hidden="true"
          />
          <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
            Service
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {service.title}
          </h1>
          <p className="text-base text-muted-foreground sm:text-lg">
            {service.shortDescription}
          </p>
        </div>

        <section className="mt-12 max-w-3xl">
          <p className="text-base leading-relaxed text-foreground/80 sm:text-lg">
            {service.longBlurb}
          </p>

          {/* TODO: real "what's included" list + sample work gallery shipped in P1 service-detail-pages task */}
          <div className="mt-10 rounded-xl border border-dashed border-foreground/15 bg-muted/30 p-6 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">
              Detailed scope page coming soon.
            </p>
            <p className="mt-2">
              Full breakdown — what&apos;s included, sample work, and inquiry
              flow — ships with the P1 service-detail pass. Want a quote in the
              meantime?
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/contact" className={buttonVariants()}>
                Start a project
              </Link>
              <Link
                href="/services"
                className={buttonVariants({ variant: "outline" })}
              >
                See all services
              </Link>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
