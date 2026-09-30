import Image from "next/image";

import RailScene from "@/vendor/rail-kit/RailScene";

/**
 * The breath between two long stretches of text on the services pages.
 *
 * The brief was "menos palabras" for humans and more for engines, and those pull
 * against each other. This is the visual half of the answer: one photograph and
 * ONE sentence, dropped between the service list and the delivery section, so a
 * reader who has just read 400 words gets somewhere to rest before the next 400.
 * Nothing is removed to make room for it — the words all stay.
 *
 * `RailScene` explains in its own source why the line rides OVER the picture
 * rather than sitting beside it: the first version put them in two columns
 * separated by 84px of nothing, "two objects looking at each other, not a
 * scene".
 *
 * The photograph is Esteban on set — umbrella lights up, product table dressed,
 * shooting from the floor. It is real, it is his, and it is the only honest
 * picture of "how the work actually happens" in a library of 15. Every service
 * WITHOUT such a picture still gets none: a decorative mismatch costs more than
 * a missing image, which this project has already paid for once.
 *
 * The sentence is lifted from the approved service copy, not written for the
 * occasion. Nothing here claims anything the site does not already claim.
 */
export function ServicesScene({ locale }: { locale: "en" | "es" }) {
  const es = locale === "es";
  return (
    <div className="em-scene" data-section="services_scene">
      <RailScene
        source="services_scene"
        image={{
          src: "/about/esteban-on-set.jpg",
          alt: es
            ? "Esteban grabando desde el suelo con dos paraguas de luz montados y una mesa de producto preparada"
            : "Esteban shooting from the floor with two umbrella lights set up and a product table dressed",
        }}
        media={
          <Image
            src="/about/esteban-on-set.jpg"
            alt=""
            width={900}
            height={1200}
            sizes="(min-width: 1024px) 440px, 88vw"
            className="em-scene__img"
          />
        }
        quote={
          es
            ? "La disponibilidad y el alcance se consideran proyecto por proyecto, después de conocer la locación, la meta y las necesidades de captura."
            : "Availability and scope are considered project by project, after learning the location, goal, and capture needs."
        }
        caption={es ? "Fort Lauderdale" : "Fort Lauderdale"}
      />
    </div>
  );
}
