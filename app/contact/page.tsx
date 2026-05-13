import type { Metadata } from "next";

import { Container } from "@/components/ui/container";

// Placeholder route — the full contact form lives in a separate P1 task.
// This stub exists so service-page CTAs (e.g. `/contact?service=aerial`) and
// the top nav don't 404 in the meantime.

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with Esteban Media.",
};

type Props = {
  searchParams: Promise<{ service?: string }>;
};

export default async function ContactPage({ searchParams }: Props) {
  const { service } = await searchParams;
  return (
    <Container className="py-24 sm:py-32">
      <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-accent)]">
        Contact
      </p>
      <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
        Start a project.
      </h1>
      <p className="mt-4 max-w-xl text-lg text-[var(--color-fg-muted)]">
        {service
          ? `Got it — you're interested in ${service.replace(/-/g, " ")}. The contact form is on the way. For now, email `
          : "The contact form is on the way. For now, email "}
        <a
          className="text-[var(--color-accent)] hover:underline"
          href="mailto:gagui010@icloud.com"
        >
          gagui010@icloud.com
        </a>
        .
      </p>
    </Container>
  );
}
