import { buildServicePageNodes } from "@/components/service-depth";
import { WebAiServicePageView, buildWebAiMetadata } from "@/components/web-ai-service-page";
import { getWebAiPage } from "@/lib/web-ai-services";

const page = getWebAiPage("chatbot", "en");

export const metadata = buildWebAiMetadata("chatbot", "en");

export default function Page() {
  return (
    <WebAiServicePageView
      id="chatbot"
      locale="en"
      pageNodes={buildServicePageNodes({
        path: page.path,
        name: page.metaTitle,
        description: page.metaDescription,
        crumb: page.crumb,
      })}
    />
  );
}
