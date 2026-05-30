import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Container } from "@/components/ui/container";

export default function Home() {
  return (
    <main>
      <section className="border-b border-[var(--color-border)]">
        <Container className="py-24 md:py-32">
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-[var(--color-muted-foreground)]">
            Esteban Media
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
            We make things feel like a film.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-[var(--color-muted-foreground)]">
            Aerial, photography, videography, and post — full-service visual
            storytelling out of South Florida.
          </p>
          <div className="mt-10 flex gap-3">
            <Button>Start a project</Button>
            <Button variant="ghost">See the work</Button>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-20">
          <Card>
            <CardHeader>
              <CardTitle>Scaffold online</CardTitle>
              <CardDescription>
                Next.js 15 · Tailwind v4 · shadcn primitives. Ready for the
                homepage build.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[var(--color-muted-foreground)]">
                Replace this placeholder with hero video, service strip, and
                contact CTA in the next overnight pass.
              </p>
            </CardContent>
          </Card>
        </Container>
      </section>
    </main>
  );
}
