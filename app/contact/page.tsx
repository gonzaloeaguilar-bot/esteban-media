import type { Metadata } from "next";
import Link from "next/link";

import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with Esteban Media — photography, videography, drone, and post-production across South Florida. Tell us about your shoot.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section
        aria-labelledby="contact-heading"
        className="border-b border-border bg-background py-20 sm:py-28"
      >
        <div className="mx-auto grid w-full max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:gap-20 lg:px-8">
          <div className="max-w-xl">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground sm:text-sm">
              Contact
            </p>
            <h1
              id="contact-heading"
              className="mt-3 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
            >
              Tell us about the project.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Share the date, the format, and what you&rsquo;re trying to make
              people feel. We&rsquo;ll come back with a scope, a timeline, and
              a quote — usually within two business days.
            </p>

            <dl className="mt-10 space-y-6 text-sm">
              <div>
                <dt className="font-medium text-foreground">Email</dt>
                <dd className="mt-1 text-muted-foreground">
                  <a
                    href="mailto:gagui010@icloud.com"
                    className="underline underline-offset-4 transition hover:opacity-80"
                  >
                    gagui010@icloud.com
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">Based in</dt>
                <dd className="mt-1 text-muted-foreground">
                  South Florida — available for travel anywhere in the U.S.
                </dd>
              </div>
              <div>
                <dt className="font-medium text-foreground">
                  Not sure what you need?
                </dt>
                <dd className="mt-1 text-muted-foreground">
                  Take a look at the{" "}
                  <Link
                    href="/services"
                    className="font-medium text-foreground underline underline-offset-4 transition hover:opacity-80"
                  >
                    full service list
                  </Link>{" "}
                  or just describe the project — we&rsquo;ll recommend the
                  right setup.
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8 lg:p-10">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
