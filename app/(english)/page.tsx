import type { Metadata } from "next";

import { AboutTeaser } from "@/components/about-teaser";
import { ClientReviews } from "@/components/client-reviews";
import { ContactCta } from "@/components/contact-cta";
import { HeroVideo } from "@/components/hero-video";
import { HomeAuthorityHub } from "@/components/home-authority-hub";
import { PortfolioTeaser } from "@/components/portfolio-teaser";
import { ServicesStrip } from "@/components/services-strip";

export const metadata: Metadata = {
  // Lead the homepage title with the exact business name ("Esteban Moreno Media")
  // for entity clarity and brand discovery.
  title: {
    absolute:
      "Esteban Moreno Media | Growth Systems, Websites & Creative Production",
  },
  description: "Fort Lauderdale growth systems: conversion websites, local presence, AI lead capture, automation, data audits, and creative production.",
  openGraph: {
    title: "Esteban Moreno Media | Growth Systems, Websites & Creative Production",
    description: "Fort Lauderdale growth systems: conversion websites, local presence, AI lead capture, automation, data audits, and creative production.",
  },
  twitter: {
    title: "Esteban Moreno Media | Growth Systems, Websites & Creative Production",
    description: "Fort Lauderdale growth systems: conversion websites, local presence, AI lead capture, automation, data audits, and creative production.",
  },
};

export default function Home() {
  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <HeroVideo />
      <HomeAuthorityHub />
      <ServicesStrip />
      <PortfolioTeaser locale="en" />
      <ClientReviews locale="en" />
      <AboutTeaser />
      <ContactCta />
    </main>
  );
}
