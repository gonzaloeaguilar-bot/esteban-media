import type { Metadata } from "next";
import { ContentOpportunityHub } from "@/components/content-opportunity-hub";
export const metadata: Metadata = { title: "30 Video Content Ideas", description: "Thirty practical video-planning ideas for businesses preparing footage and short-form edits.", alternates: { canonical: "/content-opportunities", languages: { "en-US": "/content-opportunities", "es-US": "/es/ideas-de-contenido" } } };
export default function Page(){ 
  return (
    <>
      <ContentOpportunityHub locale="en" />
      <section>
        <h2>How to create video content for restaurants?</h2>
        <p>Visit our <a href="/restaurant-video-production">restaurant video production service page</a> for detailed guidance on creating compelling video content for restaurants, including planning, filming, and editing tips.</p>
      </section>
    </>
  );
}
