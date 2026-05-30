import Link from "next/link";
import { Container } from "@/components/ui/container";
import { homeContent } from "./content";

export function ContactCta() {
  const { heading, body, primary, secondary } = homeContent.contactCta;

  return (
    <section id="contact" className="bg-[var(--color-background)]">
      <Container className="py-20 md:py-28">
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-muted)] px-6 py-14 text-center md:px-12 md:py-20">
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
            {heading}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-[var(--color-muted-foreground)] md:text-lg">
            {body}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={primary.href}
              className="inline-flex h-12 items-center justify-center rounded-md bg-[var(--color-foreground)] px-6 text-sm font-medium text-[var(--color-background)] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]"
            >
              {primary.label}
            </Link>
            <Link
              href={secondary.href}
              className="inline-flex h-12 items-center justify-center rounded-md border border-[var(--color-border)] bg-transparent px-6 text-sm font-medium text-[var(--color-foreground)] transition-colors hover:bg-[var(--color-background)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]"
            >
              {secondary.label}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
