import { WebAiServicePageView, buildWebAiMetadata } from "@/components/web-ai-service-page";

export const metadata = buildWebAiMetadata("landing", "es");

export default function Page() {
  return <WebAiServicePageView id="landing" locale="es" />;
}
