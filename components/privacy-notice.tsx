import { ExternalLink } from "lucide-react";

import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";

const googleProcessingUrl =
  "https://policies.google.com/technologies/partner-sites";
const googleOptOutUrl = "https://tools.google.com/dlpage/gaoptout";

export function PrivacyNotice({ locale }: { locale: "en" | "es" }) {
  const isSpanish = locale === "es";

  return (
    <main className="bg-[#f6f1ea] py-12 text-[#101214] sm:py-16">
      <Container size="lg">
        <p className="text-xs font-medium uppercase text-[#c84a2c]">
          {isSpanish ? "Privacidad" : "Privacy"}
        </p>
        <h1 className="mt-4 font-serif text-5xl leading-none sm:text-6xl">
          {isSpanish ? "Aviso de privacidad" : "Privacy notice"}
        </h1>
        <p className="mt-5 text-sm text-[#5a6066]">
          {isSpanish ? "Vigente desde" : "Effective"}: July 19, 2026
        </p>

        <div className="mt-10 grid gap-8 text-base leading-7 text-[#252a2d]">
          <PolicySection
            title={isSpanish ? "Quién opera este sitio" : "Who operates this site"}
          >
            <p>
              {isSpanish
                ? `${site.name}, un negocio de servicios creativos con base en ${site.location}, opera este sitio.`
                : `${site.name}, a creative-services business based in ${site.location}, operates this site.`}
            </p>
          </PolicySection>

          <PolicySection
            title={isSpanish ? "Datos de analítica" : "Analytics data"}
          >
            <p>
              {isSpanish
                ? "Este sitio usa Google Analytics 4 para entender el uso del sitio. Google Analytics puede usar cookies propias, identificadores y tecnologías similares para recopilar datos como las páginas visitadas, la fuente de referencia, interacciones, ubicación aproximada y datos del navegador o dispositivo."
                : "This site uses Google Analytics 4 to understand site usage. Google Analytics may use first-party cookies, identifiers, and similar technologies to collect data such as pages visited, referral source, interactions, approximate location, and browser or device information."}
            </p>
            <p className="mt-4">
              {isSpanish
                ? "El tag de este sitio desactiva las señales de Google y las señales de personalización publicitaria. No enviamos intencionalmente a Google Analytics nombres, correos electrónicos, números de teléfono ni el contenido de mensajes."
                : "This site's tag disables Google Signals and ad-personalization signals. We do not intentionally send names, email addresses, phone numbers, or message contents to Google Analytics."}
            </p>
          </PolicySection>

          <PolicySection
            title={isSpanish ? "Cómo usamos la información" : "How we use the information"}
          >
            <p>
              {isSpanish
                ? "Usamos reportes agregados para revisar el funcionamiento del sitio, entender qué contenido resulta útil y mejorar las páginas y la navegación."
                : "We use aggregated reports to review site performance, understand which content is useful, and improve pages and navigation."}
            </p>
          </PolicySection>

          <PolicySection
            title={isSpanish ? "Procesamiento por Google" : "Processing by Google"}
          >
            <p>
              {isSpanish
                ? "Google procesa los datos de Analytics de acuerdo con sus propios términos y políticas. Consulta cómo Google usa la información de sitios que utilizan sus servicios."
                : "Google processes Analytics data under its own terms and policies. Review how Google uses information from sites that use its services."}
            </p>
            <ExternalPolicyLink href={googleProcessingUrl}>
              {isSpanish
                ? "Cómo usa Google la información de sitios y aplicaciones"
                : "How Google uses information from sites and apps"}
            </ExternalPolicyLink>
          </PolicySection>

          <PolicySection title={isSpanish ? "Tus opciones" : "Your choices"}>
            <p>
              {isSpanish
                ? "Puedes bloquear o borrar cookies desde tu navegador. Google también ofrece un complemento para inhabilitar Google Analytics. Si una ley aplicable te concede derechos sobre tus datos, puedes escribirnos para hacer una solicitud."
                : "You can block or delete cookies through your browser. Google also provides a browser add-on to opt out of Google Analytics. If applicable law gives you rights over your data, you may contact us to make a request."}
            </p>
            <ExternalPolicyLink href={googleOptOutUrl}>
              {isSpanish
                ? "Complemento de inhabilitación de Google Analytics"
                : "Google Analytics opt-out browser add-on"}
            </ExternalPolicyLink>
          </PolicySection>

          <PolicySection title={isSpanish ? "Contacto" : "Contact"}>
            <p>
              {isSpanish
                ? "Para preguntas o solicitudes de privacidad, escribe a"
                : "For privacy questions or requests, email"}{" "}
              <a
                className="font-medium text-[#c84a2c] underline underline-offset-4"
                href={`mailto:${site.email}`}
              >
                {site.email}
              </a>
              .
            </p>
          </PolicySection>
        </div>
      </Container>
    </main>
  );
}

function PolicySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-[#ddd4c8] pt-7">
      <h2 className="font-serif text-3xl">{title}</h2>
      <div className="mt-4 max-w-3xl">{children}</div>
    </section>
  );
}

function ExternalPolicyLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="mt-4 inline-flex items-center gap-2 font-medium text-[#c84a2c] underline underline-offset-4"
    >
      {children}
      <ExternalLink className="size-4" aria-hidden="true" />
    </a>
  );
}
