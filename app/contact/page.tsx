import type { Metadata } from "next";

import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with Esteban — photography, videography, aerial, and post-production in South Florida. Reply within one business day.",
};

/**
 * /contact — server-rendered page chrome wrapping the client-side form.
 *
 * Form lives in a Client Component (`components/sections/ContactForm.tsx`)
 * because it needs state for submission/validation/confirmation. The shell,
 * heading, and bilingual copy can render on the server for fast first paint.
 *
 * Bilingual copy is inline + flagged with `<!-- TRANSLATION REVIEW NEEDED -->`
 * markers because next-intl wiring is a separate backlog item (P1 i18n).
 */
export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section
        aria-labelledby="contact-heading"
        className="border-b border-border py-20 sm:py-28"
      >
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground sm:text-sm">
            Contact
          </p>
          <h1
            id="contact-heading"
            className="mt-3 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl"
          >
            Tell us about your project.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Share a few details and Esteban will reply within one business day
            with next steps and a rough quote. Bilingual EN/ES on every shoot.
          </p>
          {/* TRANSLATION REVIEW NEEDED */}
          <p
            className="mt-2 text-sm leading-relaxed text-muted-foreground"
            lang="es"
          >
            Cuéntanos sobre tu proyecto y Esteban te responderá en menos de un
            día hábil.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-2xl px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
