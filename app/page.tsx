import { About } from "@/components/home/About";
import { ContactCta } from "@/components/home/ContactCta";
import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <About />
      <ContactCta />
    </main>
  );
}
