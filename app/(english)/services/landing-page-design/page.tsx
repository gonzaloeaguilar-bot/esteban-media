import { buildServicePageNodes } from "@/components/service-depth";
import { WebAiServicePageView, buildWebAiMetadata } from "@/components/web-ai-service-page";
import { getWebAiPage } from "@/lib/web-ai-services";

const page = getWebAiPage("landing", "en");

export const metadata = buildWebAiMetadata("landing", "en");

export default function Page() {
  return (
    <WebAiServicePageView
      id="landing"
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
