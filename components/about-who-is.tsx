import { PageUpdated } from "@/components/page-updated";
import { Container } from "@/components/ui/container";
import { SHORT_FORM, usd } from "@/lib/pricing";
import { site } from "@/lib/site";

/**
 * "Who is Esteban Moreno?" answered in one server-rendered section.
 *
 * Round 2 (2026-10-14): GSC 90d "esteban moreno" -> /about 11 impressions at
 * position 14.3, Bing position 10, and Google autocomplete for "esteban moreno"
 * offers other people with the name (a singer, a carnival band, a baseball
 * player). The page had 301 words and never said, in one place, who he is.
 * Facts only from AGENTS.md "Canonical business facts" and lib/pricing.ts; the
 * Person node in lib/entity-schema.ts says the same.
 */
export function AboutWhoIs({ locale, path }: { locale: "en" | "es"; path: string }) {
  const es = locale === "es";
  const from = usd(SHORT_FORM.perVideoFrom);
  return (
    <section className="border-t border-[#ddd4c8] py-10 sm:py-12" data-section="about_who_is" aria-labelledby="about-who-is-heading">
      <Container size="xl">
        <h2 id="about-who-is-heading" className="font-serif text-3xl sm:text-4xl">
          {es ? "¿Quién es Esteban Moreno?" : "Who is Esteban Moreno?"}
        </h2>
        <div className="mt-5 max-w-3xl space-y-4 text-base leading-7 text-[#252a2d]">
          {es ? (
            <>
              <p>
                Esteban Moreno ({site.founder.fullName}) es editor de video y creador de contenido en Fort
                Lauderdale, Florida, y fundador de {site.name}. Edita Reels, TikToks, Shorts y videos más
                largos para negocios y creadores de Broward y Miami-Dade, planifica contenido para redes,
                usa herramientas de IA cuando ayudan y graba en locación en proyectos seleccionados.
              </p>
              <p>
                Atiende primero en español, con inglés intermedio. La mayoría de los proyectos son remotos:
                envías el material que ya tienes y lo recibes editado. Editar un video cuesta desde {from}.
                Para hablar con él, llama o escribe por WhatsApp al {site.phone.display}, o por correo a{" "}
                {site.email}.
              </p>
              <p>
                Hay otras personas conocidas con el nombre Esteban Moreno. Esta página trata del editor de
                video de Fort Lauderdale.
              </p>
            </>
          ) : (
            <>
              <p>
                Esteban Moreno ({site.founder.fullName}) is a video editor and content creator based in Fort
                Lauderdale, Florida, and the founder of {site.name}. He edits Reels, TikToks, Shorts and
                longer videos for businesses and creators in Broward and Miami-Dade, plans social content,
                uses AI tools where they help, and films on location for selected projects.
              </p>
              <p>
                He works in Spanish first, with intermediate English. Most projects are remote: you send the
                footage you already have and get it back edited. Editing one video starts at {from}. To reach
                him, call or WhatsApp {site.phone.display}, or email {site.email}.
              </p>
              <p>
                Other public figures share the name Esteban Moreno. This page is about the video editor in
                Fort Lauderdale.
              </p>
            </>
          )}
        </div>
        <PageUpdated path={path} locale={locale} />
      </Container>
    </section>
  );
}
