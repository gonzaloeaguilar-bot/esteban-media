import type { Metadata } from "next";

import { Container } from "@/components/ui/container";

// Placeholder route — full About page lives in a separate P1 task.
// This stub exists so the top nav doesn't 404 in the meantime.

export const metadata: Metadata = {
  title: "About",
  description: "About Esteban Media.",
};

export default function AboutPage() {
  return (
    <Container className="py-24 sm:py-32">
      <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-accent)]">
        About
      </p>
      <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
        About Esteban.
      </h1>
      <p className="mt-4 max-w-xl text-lg text-[var(--color-fg-muted)]">
        {/* TODO: real bio from Esteban */}
        Bio coming soon. The full About page is queued as a separate task.
      </p>
    </Container>
  );
}
