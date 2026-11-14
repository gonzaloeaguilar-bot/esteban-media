import { ArrowRight, MessageCircle } from "lucide-react";

import { Container } from "@/components/ui/container";

export type ServiceDecision = {
  id: string;
  title: string;
  detail: string;
  href: string;
  action: string;
};

export type ServiceDecisionRailContent = {
  eyebrow: string;
  heading: string;
  intro: string;
  decisions: readonly ServiceDecision[];
};

/**
 * The service-page counterpart to the homepage project chooser.
 * It stays server-rendered: every card is an ordinary prefilled-contact link,
 * so a visitor can choose a useful starting point with or without JavaScript.
 */
export function ServiceDecisionRail({ content }: { content: ServiceDecisionRailContent }) {
  return (
    <section className="border-b border-[#ddd4c8] bg-[#fbf6ef] py-14 sm:py-20" data-section="service-decision-rail">
      <Container size="xl">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">{content.eyebrow}</p>
          <h2 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">{content.heading}</h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[#252a2d] sm:text-xl">{content.intro}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {content.decisions.map((decision) => (
              <article key={decision.id} className="flex min-h-72 flex-col rounded-2xl border border-[#ddd4c8] bg-[#f6f1ea] p-6 sm:p-7">
                <h3 className="font-serif text-3xl leading-tight text-[#101214]">{decision.title}</h3>
                <p className="mt-4 text-lg leading-8 text-[#252a2d]">{decision.detail}</p>
                <a
                  href={decision.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta={`service_decision_${decision.id}_whatsapp`}
                  className="mt-auto inline-flex min-h-11 items-center gap-2 pt-5 text-sm font-semibold text-[#9f3c27] underline decoration-[#9f3c27]/40 underline-offset-4 hover:decoration-[#9f3c27]"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  {decision.action}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
