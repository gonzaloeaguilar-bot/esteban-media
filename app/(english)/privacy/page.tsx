import { PrivacyNotice } from "@/components/privacy-notice";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata = {
  ...buildPageMetadata({
    title: "Privacy Notice",
    description:
      "How Esteban Moreno Media uses Google Analytics and handles website visitor information.",
    path: "/privacy",
    locale: "en",
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

export default function PrivacyPage() {
  return <PrivacyNotice locale="en" />;
}
