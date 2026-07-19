import { PrivacyNotice } from "@/components/privacy-notice";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata = {
  ...buildPageMetadata({
    title: "Aviso de Privacidad",
    description:
      "Cómo Esteban Moreno Media usa Google Analytics y maneja la información de visitantes del sitio.",
    path: "/es/privacidad",
    locale: "es",
    languages: {
      "en-US": "/privacy",
      "es-US": "/es/privacidad",
      "x-default": "/privacy",
    },
  }),
  robots: {
    index: false,
    follow: true,
  },
};

export default function SpanishPrivacyPage() {
  return <PrivacyNotice locale="es" />;
}
