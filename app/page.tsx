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
    <main className="min-h-screen bg-background text-foreground">
      <Container className="py-24 sm:py-32">
        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
            Esteban Media · South Florida
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            Visual storyteller.
            <br />
            <span className="text-muted-foreground">
              Aerial. Photo. Video. Post.
            </span>
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
            We make things feel like a film. Full-service capture and
            post-production for brands, weddings, real estate, and creators.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button size="lg">Start a project</Button>
            <Button size="lg" variant="outline">
              See the work
            </Button>
          </div>
        </div>

        <section className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Aerial cinematography</CardTitle>
              <CardDescription>
                Licensed drone work for venues, properties, and brand films.
              </CardDescription>
            </CardHeader>
            <CardContent>
              4K HDR. Cinema-grade movement. Insurance on request.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Photography</CardTitle>
              <CardDescription>
                Portraits, events, commercial, lifestyle.
              </CardDescription>
            </CardHeader>
            <CardContent>
              Studio or on-location. Same-day previews available.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Videography</CardTitle>
              <CardDescription>
                Brand films, promos, social cutdowns.
              </CardDescription>
            </CardHeader>
            <CardContent>
              Solo operator to full crew, scoped to your shoot.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Video editing & color</CardTitle>
              <CardDescription>
                Story-first editing with professional color grading.
              </CardDescription>
            </CardHeader>
            <CardContent>
              DaVinci Resolve. Edit-only engagements welcome.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Photo editing</CardTitle>
              <CardDescription>
                Retouching, color, and culling for shoots you didn&apos;t shoot
                with us.
              </CardDescription>
            </CardHeader>
            <CardContent>
              Per-image or volume pricing. Bring your RAWs.
            </CardContent>
          </Card>
        </section>
      </Container>
    </main>
  );
}
