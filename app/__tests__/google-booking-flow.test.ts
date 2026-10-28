import React from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { ContactCta } from "@/components/contact-cta";
import { buildGoogleAnalyticsScript } from "@/lib/google-analytics-script";
import { site } from "@/lib/site";

describe("Google Calendar booking flow", () => {
  it("keeps one canonical public booking URL for the site", () => {
    expect(site.booking).toBe(
      "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3mpFYiKvhJEh9RI6e-hFk2OYc3aYbrYrt2ycrLmFRRsvccRVXXnVKvIjIYWSCIr1z5djyik60q",
    );
  });

  it.each([
    ["en", "See available times", "Choose a time that works for you."],
    ["es", "Ver horarios disponibles", "Elige el horario que te funcione."],
  ] as const)("offers a quiet %s booking action before the optional form", (locale, label, hint) => {
    const html = renderToStaticMarkup(React.createElement(ContactCta, { locale }));
    const detailsAt = html.indexOf("<details");
    const bookingAt = html.indexOf('data-cta="home_contact_booking"');

    expect(bookingAt).toBeGreaterThan(-1);
    expect(bookingAt).toBeLessThan(detailsAt);
    expect(html).toContain(`href="${site.booking}"`);
    expect(html).toContain(`>${label}</span>`);
    expect(html).toContain(hint);
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
  });

  it("classifies the Google Calendar click as booking interest without form data", () => {
    const script = buildGoogleAnalyticsScript({
      measurementId: "G-TEST",
      canonicalHostname: "estebanmorenomedia.com",
      instagramHostname: "instagram.com",
      allowedPaths: ["/"],
    });

    expect(script).toContain("destination.hostname === 'calendar.google.com'");
    expect(script).toContain("method = 'booking'");
  });

  it.each([
    ["app/(english)/contact/page.tsx", "contact_booking", "See available times"],
    ["app/(spanish)/es/contacto/page.tsx", "contact_booking_es", "Ver horarios disponibles"],
  ])("keeps the booking action on %s", (routeFile, trackingId, label) => {
    const source = readFileSync(join(process.cwd(), routeFile), "utf8");

    expect(source).toContain("href={site.booking}");
    expect(source).toContain(`data-cta=\"${trackingId}\"`);
    expect(source).toContain(label);
    expect(source).toContain('target="_blank"');
    expect(source).toContain('rel="noopener noreferrer"');
  });
});
