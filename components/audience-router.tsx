import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { AUDIENCE_LANES, type AudienceLocale } from "@/lib/audience-lanes";
import RailPlaybill from "@/vendor/rail-kit/RailPlaybill";
import { AudienceVideo, EditingPreview } from "@/components/audience-media";

const visual = {
  en: {
    eyebrow: "Your footage. Your next move.", heading: "What are you creating?",
    intro: "Choose your kind of project. See what your footage could become.",
    titles: ["Give your listing a story.", "Make people stop scrolling.", "Keep your next edit moving."],
    lines: ["Walkthroughs and Reels, edited from your footage.", "Turn the moments you already film into content.", "Extra editing help, with clear feedback rounds."],
    alts: ["Concept illustration of a home, camera and property photographs", "Concept illustration of a cafe being filmed on a phone", "Concept illustration of an editing desk with a monitor, filmstrip and headphones"],
    more: "What can we make?", credit: "AI-generated concept illustrations. The linked projects show published work.",
    project: "See a real project: Homeowners", process: "See the editing process",
  },
  es: {
    eyebrow: "Tu material. Tu próximo paso.", heading: "¿Qué quieres crear?",
    intro: "Elige tu tipo de proyecto. Mira en qué podemos convertir tu material.",
    titles: ["Dale una historia a tu propiedad.", "Haz que dejen de deslizar.", "Dale ritmo a tu próxima edición."],
    lines: ["Recorridos y Reels a partir de lo que ya grabaste.", "Convierte lo que ya grabas en contenido.", "Apoyo de edición, con comentarios organizados."],
    alts: ["Ilustración conceptual de una casa, una cámara y fotografías de la propiedad", "Ilustración conceptual de un café grabado con un celular", "Ilustración conceptual de una mesa de edición con monitor, película y audífonos"],
    more: "¿Qué podemos crear?", credit: "Ilustraciones conceptuales generadas con IA. Los proyectos enlazados muestran trabajos publicados.",
    project: "Ver un proyecto real: Homeowners", process: "Ver el proceso de edición",
  },
};
const artwork = ["property", "business", "editing"];

export function AudienceRouter({ locale }: { locale: AudienceLocale }) {
  const copy = AUDIENCE_LANES[locale];
  const v = visual[locale];
  return (
    <section id="audience" aria-labelledby="audience-heading" className="em-visual-audience" data-section="audience-router">
      <Container size="xl">
        <p className="em-visual-eyebrow">{v.eyebrow}</p>
        <h2 id="audience-heading" className="em-visual-heading">{v.heading}</h2>
        <p className="em-visual-intro">{v.intro}</p>
        <div className="em-audience-cards">
          {copy.lanes.map((lane, index) => (
            <article key={lane.id} className="em-audience-card">
              <p className="em-audience-category"><span>{String(index + 1).padStart(2, "0")}</span>{lane.who}</p>
              {index === 1 ? <AudienceVideo locale={locale} alt={v.alts[index]} /> : (
                <RailPlaybill image={{ src: `/illustrations/${artwork[index]}.webp`, alt: v.alts[index] }} fit="artwork" source={`audience-${lane.id}`} />
              )}
              <div className="em-audience-body">
                <h3>{v.titles[index]}</h3>
                <p>{v.lines[index]}</p>
                <Link href={lane.href} data-cta={`audience-${lane.id}`} className="em-visual-action">
                  {lane.action}<ArrowRight aria-hidden="true" size={18} />
                </Link>
                <details><summary>{v.more}</summary><p>{lane.title} {lane.detail}</p></details>
                {index === 0 && <Link className="em-visual-credit" href={locale === "es" ? "/es/portafolio/homeowners" : "/portfolio/homeowners"} data-cta="audience_homeowners">{v.project}</Link>}
                {index === 1 && <a className="em-visual-credit" href="https://www.youtube.com/watch?v=m1PZOcutQHg" data-cta="audience_business_project">Bar Door Monkey · YouTube</a>}
                {index === 2 && <details className="em-process-details"><summary>{v.process}</summary><EditingPreview locale={locale} /></details>}
              </div>
            </article>
          ))}
        </div>
        <p className="em-illustration-credit">{v.credit}</p>
      </Container>
    </section>
  );
}
