import Link from "next/link";

import { Container } from "@/components/ui/container";
import { cheapestRealEstatePlan, packagesFor, priceSentence, type Locale } from "@/lib/packages";
import { packageRoutes } from "@/lib/package-routes";
import { latamAnswer, onSiteProductionAnswer, perHourAnswer } from "@/lib/owner-fact-answers";
import { goingRateAnswer } from "@/lib/demand-map-answers";
import { REAL_ESTATE_PLAN_TERMS, shortFormWeeklyText, turnaroundFor, usd, type PackageId } from "@/lib/pricing";

/**
 * Owner facts & verified rate card: editing is priced per video, not per hour;
 * on-site recording, multi-camera, and yacht rates; Latin American remote clients.
 * Exported so the hub's FAQPage JSON-LD carries the same strings that render.
 */
export function pricingHubExtraFaq(locale: Locale): { question: string; answer: string }[] {
  return locale === "es"
    ? [goingRateAnswer("es"), perHourAnswer("es"), onSiteProductionAnswer("es"), latamAnswer()]
    : [goingRateAnswer("en"), perHourAnswer("en"), onSiteProductionAnswer("en")];
}

export function PricingAnswer({ locale }: { locale: Locale }) {
  const es = locale === "es";
  const pk = packagesFor(locale);
  const name = (id: PackageId) => pk.find((p) => p.id === id)!.name;
  const price = (id: PackageId) => priceSentence(locale, id).toLowerCase();
  const link = (id: PackageId) => (
    <Link href={packageRoutes[id][locale]} className="underline underline-offset-4 hover:text-[#9f3c27]">
      {name(id)}
    </Link>
  );
  const realEstate = usd(cheapestRealEstatePlan().price);
  const weekly = shortFormWeeklyText(locale);
  const days = turnaroundFor("arranque").minimumDays;

  return (
    <section className="py-8 sm:py-10" data-section="pricing_answer">
      <Container size="xl">
        <div className="max-w-3xl space-y-8 text-base leading-7 text-[#252a2d]">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl">
              {es ? "¿Cuánto cuesta trabajar con Esteban Moreno Media?" : "How much does it cost to work with Esteban Moreno Media?"}
            </h2>
            {es ? (
              <p className="mt-3">
                Editar un video cuesta {price("arranque")} con el paquete {link("arranque")}: tú envías el material
                que ya grabaste y lo recibes editado para Reels, TikTok, YouTube o web, con una ronda de revisión. El
                plan mensual de redes, {link("crecimiento")}, es {price("crecimiento")} e incluye plan de contenido,
                calendario, edición y reporte. Un día de producción en tu negocio, {link("presencia-local")}, es{" "}
                {price("presencia-local")}. {link("todo-incluido")} reúne web, captura de clientes, perfil local y
                contenido, y se cotiza a medida. Para agentes inmobiliarios hay planes mensuales desde {realEstate}{" "}
                al mes, con un mínimo de {REAL_ESTATE_PLAN_TERMS.minimumMonths} meses. Todos son precios de partida:
                cada proyecto recibe una cotización por escrito.
              </p>
            ) : (
              <p className="mt-3">
                Editing one video costs {price("arranque")} on the {link("arranque")} package: you send the footage
                you already shot and get it back edited for Reels, TikTok, YouTube or the web, with one revision
                round. The monthly social plan, {link("crecimiento")}, is {price("crecimiento")} and includes the
                content plan, the calendar, the editing and a report. A production day at your business,{" "}
                {link("presencia-local")}, is {price("presencia-local")}. {link("todo-incluido")} brings the
                website, lead capture, local profile and content together and is quoted per project. Real estate
                agents have monthly plans from {realEstate} a month, with a {REAL_ESTATE_PLAN_TERMS.minimumMonths}
                -month minimum. All of these are starting prices: every project gets a written quote.
              </p>
            )}
          </div>
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl">
              {es ? "¿Qué cambia el precio final de un proyecto?" : "What changes the final price of a project?"}
            </h2>
            {es ? (
              <p className="mt-3">
                Tres cosas: cuánto video necesitas, si hay que grabar en locación y qué tan rápido lo necesitas. Si ya
                tienes el material, pagas solo la edición. Si publicas cada semana, {name("arranque")} también se vende
                por semana: {weekly}. Si falta grabar, se suma un día de producción. La edición de un video toma como
                mínimo {days} días desde que llega el material completo, así que conviene pedirla con tiempo. Antes de
                escribir, puedes estimar tu número con la{" "}
                <Link href="/es/calculadora" className="underline underline-offset-4 hover:text-[#9f3c27]">
                  calculadora de presupuesto
                </Link>
                . Después, la cotización por escrito fija el alcance, los entregables, las revisiones y la fecha de
                entrega antes de empezar.
              </p>
            ) : (
              <p className="mt-3">
                Three things: how much video you need, whether anything has to be filmed on location, and how fast you
                need it. If you already have the footage, you pay for editing only. If you post every week, {name("arranque")}{" "}
                is also sold weekly: {weekly}. If footage still has to be shot, a production day is added. Editing one
                video takes at least {days} days from the moment the full footage arrives, so it pays to ask early.
                Before you write, you can estimate your number with the{" "}
                <Link href="/calculator" className="underline underline-offset-4 hover:text-[#9f3c27]">
                  budget calculator
                </Link>
                . After that, the written quote fixes the scope, deliverables, revisions and delivery date before work
                starts.
              </p>
            )}
          </div>
          {pricingHubExtraFaq(locale).map((q) => (
            <div key={q.question}>
              <h2 className="font-serif text-2xl sm:text-3xl">{q.question}</h2>
              <p className="mt-3">{q.answer}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
