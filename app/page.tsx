import { Hero } from "@/components/sections/Hero";
import { ServicesStrip } from "@/components/sections/ServicesStrip";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { ContactCTA } from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero />
      <ServicesStrip />
      <AboutTeaser />
      <ContactCTA />
    </main>
  );
}
