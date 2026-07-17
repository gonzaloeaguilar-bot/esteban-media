import type { Metadata } from "next";
import { Mail, MessageSquareText, Phone, Send } from "lucide-react";

import { Container } from "@/components/ui/container";
import {
  languageAlternates,
  spanishServices,
  spanishSite,
} from "@/lib/spanish-site";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto en Español",
  description:
    "Contacta a Esteban Moreno Media en español para edición, contenido con IA, planificación para redes y producción por proyecto.",
  alternates: {
    canonical: "/es/contacto",
    languages: languageAlternates["/es/contacto"],
  },
};

export default function SpanishContactPage() {
  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <section className="py-12 sm:py-16">
        <Container size="xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_.9fr]">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Contacto
              </p>
              <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-none sm:text-6xl">
                Manda el brief en español.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                {spanishSite.contactLead}
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-[#5a6066]">
                Esteban Moreno Media es un negocio de área de servicio con
                atención remota. No hay un estudio abierto al público; las
                consultas se manejan por teléfono o videollamada y el trabajo
                local se cotiza según la ubicación.
              </p>

              <div className="mt-8 grid gap-3">
                <a
                  href={`mailto:${site.email}`}
                  className="flex min-h-16 items-center gap-4 rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-4 hover:border-[#e85d3e]"
                >
                  <Mail className="size-5 text-[#e85d3e]" aria-hidden="true" />
                  <span>
                    <span className="block text-xs uppercase text-[#5a6066]">
                      Email
                    </span>
                    <span>{site.email}</span>
                  </span>
                </a>
                <a
                  href={site.phone.href}
                  className="flex min-h-16 items-center gap-4 rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-4 hover:border-[#e85d3e]"
                >
                  <Phone className="size-5 text-[#e85d3e]" aria-hidden="true" />
                  <span>
                    <span className="block text-xs uppercase text-[#5a6066]">
                      Teléfono
                    </span>
                    <span>{site.phone.display}</span>
                  </span>
                </a>
                <a
                  href={site.instagram}
                  className="flex min-h-16 items-center gap-4 rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-4 hover:border-[#e85d3e]"
                >
                  <Send
                    className="size-5 text-[#e85d3e]"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="block text-xs uppercase text-[#5a6066]">
                      Instagram
                    </span>
                    <span>@steeban1</span>
                  </span>
                </a>
              </div>
            </div>

            <aside className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <MessageSquareText
                className="size-6 text-[#e85d3e]"
                aria-hidden="true"
              />
              <h2 className="mt-5 font-serif text-3xl">Qué incluir</h2>
              <ul className="mt-6 space-y-4 text-sm leading-6 text-[#252a2d]">
                <li>
                  <strong className="text-[#101214]">Tipo de proyecto:</strong>{" "}
                  {spanishServices.map((service) => service.shortName).join(", ")}.
                </li>
                <li>
                  <strong className="text-[#101214]">Ciudad:</strong> Miami,
                  Fort Lauderdale, Palm Beach County, venue, propiedad o
                  dirección si ya existe. Puede aplicarse un cargo de traslado
                  después de 20 millas desde Fort Lauderdale; el estacionamiento
                  requerido se agrega a la cotización.
                </li>
                <li>
                  <strong className="text-[#101214]">Fecha:</strong> día de
                  grabación o entrega de material, lanzamiento y si la solicitud es urgente.
                </li>
                <li>
                  <strong className="text-[#101214]">Meta:</strong> redes,
                  website, Google Business, listing, menu, evento o anuncios.
                </li>
              </ul>
            </aside>
          </div>
        </Container>
      </section>
    </main>
  );
}
