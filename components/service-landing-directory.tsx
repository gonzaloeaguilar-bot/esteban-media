import Link from "next/link";
import React from "react";

import { sitemapRoutes } from "@/app/sitemap";

const serviceLandingRoutes = sitemapRoutes.filter(
  ({ path }) => path.startsWith("/services/") && path !== "/services",
);

function labelFromPath(path: string) {
  return path
    .split("/")
    .at(-1)!
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function ServiceLandingDirectory() {
  return (
    <section className="mt-14" aria-labelledby="service-landing-directory-heading">
      <p className="text-xs font-medium uppercase text-[#5a6066]">
        Detailed service guides
      </p>
      <h2
        id="service-landing-directory-heading"
        className="mt-4 max-w-3xl font-serif text-4xl leading-tight"
      >
        Explore a service, format, or South Florida market.
      </h2>
      <p className="mt-4 max-w-3xl leading-7 text-[#252a2d]">
        These pages explain project fit and preparation without adding prices,
        guarantees, or availability claims. Confirm the final scope directly.
      </p>
      <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {serviceLandingRoutes.map(({ path }) => (
          <li key={path}>
            <Link
              href={path}
              className="block min-h-16 rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-4 text-sm font-medium leading-6 text-[#252a2d] hover:border-[#e85d3e] hover:text-[#9f3c27]"
            >
              {labelFromPath(path)}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
