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
    <section className="border-b border-[#ddd4c8] py-10 sm:py-14" data-section="service-proof-rail">
      <Container size="xl">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">{content.eyebrow}</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">{content.heading}</h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-[#252a2d]">{content.intro}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {content.projects.map((project) => <PublishedProjectProof key={project.href} proof={project} />)}
          </div>
        </div>
      </Container>
    </section>
  );
}
