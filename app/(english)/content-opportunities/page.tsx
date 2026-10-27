import type { Metadata } from "next";
import { ContentOpportunityHub } from "@/components/content-opportunity-hub";
export const metadata: Metadata = { title: "30 Video Content Ideas", description: "Thirty practical video-planning ideas for businesses preparing footage and short-form edits.", alternates: { canonical: "/content-opportunities", languages: { "en-US": "/content-opportunities", "es-US": "/es/ideas-de-contenido" } } };
export default function Page(){ return <ContentOpportunityHub locale="en" />; }
