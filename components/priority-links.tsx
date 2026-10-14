import Link from "next/link";

import { Container } from "@/components/ui/container";
import { priorityLinksFor } from "@/lib/priority-links";

/** Server-rendered "Where to go next" list; renders nothing for an unmapped path. */
export function PriorityLinks({ path, locale }: { path: string; locale: "en" | "es" }) {
  const links = priorityLinksFor(path);
  if (links.length === 0) return null;
  const es = locale === "es";
  return (
    <section className="border-t border-[#ddd4c8] py-10 sm:py-12" data-section="priority_links" aria-labelledby="priority-links-heading">
      <Container size="xl">
        <h2 id="priority-links-heading" className="font-serif text-2xl sm:text-3xl">
          {es ? "¿Qué más puedes ver?" : "Where to go next"}
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                data-cta={`priority_link_${link.href.split("/").pop()}`}
                className="block rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-4 hover:border-[#9f3c27]"
              >
                <span className="font-medium text-[#9f3c27]">{link.label}</span>
                <span className="mt-1 block text-sm leading-6 text-[#3f4548]">{link.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
