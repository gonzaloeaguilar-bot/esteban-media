import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SERVICES } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Aerial, photography, videography, video editing, and photo editing — full-service visual storytelling for brands and people in South Florida.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Container className="py-20 sm:py-28">
        <div className="flex max-w-3xl flex-col gap-4">
          <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
            Services
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Full-service visual storytelling.
          </h1>
          <p className="text-base text-muted-foreground sm:text-lg">
            Five disciplines, one set of hands. Pick the capability you need —
            or scope a full production end-to-end.
          </p>
        </div>

        <section
          aria-label="Service offerings"
          className="mt-12 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xl"
                aria-label={`Learn more about ${service.title}`}
              >
                <Card className="h-full transition-all group-hover:ring-foreground/30">
                  <CardHeader>
                    <Icon
                      className="size-6 text-muted-foreground transition-colors group-hover:text-foreground"
                      aria-hidden="true"
                    />
                    <CardTitle className="mt-3 text-lg">
                      {service.title}
                    </CardTitle>
                    <CardDescription>
                      {service.shortDescription}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto flex items-center gap-1 text-sm font-medium text-foreground/70 transition-colors group-hover:text-foreground">
                    Learn more
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </section>
      </Container>
    </main>
  );
}
