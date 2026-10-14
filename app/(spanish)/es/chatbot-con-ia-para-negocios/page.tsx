import { WebAiServicePageView, buildWebAiMetadata } from "@/components/web-ai-service-page";

export const metadata = buildWebAiMetadata("chatbot", "es");

export default function Page() {
  return <WebAiServicePageView id="chatbot" locale="es" />;
}
