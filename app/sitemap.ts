import type { MetadataRoute } from "next";

import { spanishRoutes } from "@/lib/spanish-site";
import { absoluteUrl } from "@/lib/site";

const routes = [
  { path: "/", priority: 1 },
  { path: "/services", priority: 0.9 },
  { path: "/areas", priority: 0.85 },
  { path: "/about", priority: 0.7 },
  { path: "/contact", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-05-23");

  return [
    ...routes.map((route) => ({
      url: absoluteUrl(route.path),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: route.priority,
    })),
    ...spanishRoutes.map((path) => ({
      url: absoluteUrl(path),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: path === "/es" ? 0.95 : 0.75,
    })),
  ];
}
