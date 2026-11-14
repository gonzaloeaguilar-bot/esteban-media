import { PublishedProjectProof, type PublishedProjectProofInput } from "@/components/published-project-proof";
import { Container } from "@/components/ui/container";

export type ServiceProofRailContent = {
  eyebrow: string;
  heading: string;
  intro: string;
  projects: readonly PublishedProjectProofInput[];
};

/** A small, factual work shelf for a service page — never generic portfolio filler. */
export function ServiceProofRail({ content }: { content: ServiceProofRailContent }) {
  return (
    <section className="border-b border-[#ddd4c8] py-14 sm:py-20" data-section="service-proof-rail">
      <Container size="xl">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">{content.eyebrow}</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">{content.heading}</h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[#252a2d] sm:text-xl">{content.intro}</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {content.projects.map((project) => <PublishedProjectProof key={project.href} proof={project} />)}
          </div>
        </div>
      </Container>
    </section>
  );
}
