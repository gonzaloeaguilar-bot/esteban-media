import { buildPageMetadata } from "@/lib/site-metadata";
import { site } from "@/lib/site";

export const metadata = {
  ...buildPageMetadata({
    title: "Unsubscribe",
    description:
      "Opt out of outreach emails from Esteban Moreno Media. Your request is honored on every future send.",
    path: "/unsubscribe",
    locale: "en",
    languages: {
      "en-US": "/unsubscribe",
      "x-default": "/unsubscribe",
    },
  }),
  robots: {
    index: false,
    follow: false,
  },
};

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;
  const cleaned = (email ?? "").trim().toLowerCase();
  const mailto = `mailto:unsubscribe@estebanmorenomedia.com?subject=unsubscribe${
    cleaned ? `&body=${encodeURIComponent(`Please remove ${cleaned} from all outreach.`)}` : ""
  }`;

  return (
    <main style={{ maxWidth: 640, margin: "0 auto", padding: "48px 20px" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
        Unsubscribe
      </h1>
      <p style={{ fontSize: 16, lineHeight: 1.6, marginBottom: 16 }}>
        {cleaned ? (
          <>
            To stop receiving outreach emails from Esteban Moreno Media at{" "}
            <strong>{cleaned}</strong>, confirm your opt-out below. Your request
            is honored on every future send.
          </>
        ) : (
          <>
            To stop receiving outreach emails from Esteban Moreno Media, confirm
            your opt-out below. Your request is honored on every future send.
          </>
        )}
      </p>
      <p style={{ fontSize: 16, lineHeight: 1.6, marginBottom: 24 }}>
        <a
          href={mailto}
          style={{
            display: "inline-block",
            background: "#18181b",
            color: "#ffffff",
            padding: "12px 22px",
            borderRadius: 8,
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Confirm unsubscribe
        </a>
      </p>
      <p style={{ fontSize: 13, color: "#71717a", lineHeight: 1.6 }}>
        You can also reply to any of our emails asking to be removed. Questions?
        Email {site.email}.
      </p>
    </main>
  );
}
