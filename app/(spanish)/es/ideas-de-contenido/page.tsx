import type { Metadata } from "next";
import { ContentOpportunityHub } from "@/components/content-opportunity-hub";
export const metadata: Metadata = { title: "30 Ideas de Contenido en Video", description: "Treinta ideas prácticas para planear material y ediciones de video corto.", alternates: { canonical: "/es/ideas-de-contenido", languages: { "en-US": "/content-opportunities", "es-US": "/es/ideas-de-contenido" } } };
export default function Page(){ return <ContentOpportunityHub locale="es" />; }
