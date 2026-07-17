import { absoluteUrl } from "@/lib/site";

export interface PortfolioSchemaItem {
  id: string;
  title: string;
  summary: string;
  credits: string;
  url: string;
  poster: string;
  videoId: string;
  uploadDate: string;
  duration: string;
  location?: string;
}

interface PortfolioCollectionSchemaOptions {
  path: "/portfolio" | "/es/portafolio";
  locale: "en-US" | "es-US";
  title: string;
  description: string;
  items: readonly PortfolioSchemaItem[];
}

export function buildPortfolioCollectionSchema({
  path,
  locale,
  title,
  description,
  items,
}: PortfolioCollectionSchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": absoluteUrl(`${path}#collection`),
    url: absoluteUrl(path),
    name: title,
    description,
    inLanguage: locale,
    isPartOf: { "@id": absoluteUrl("/#website") },
    publisher: { "@id": absoluteUrl("/#business") },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => {
        const canonicalWorkUrl = absoluteUrl(`/portfolio#${item.id}`);

        return {
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "VideoObject",
            "@id": canonicalWorkUrl,
            name: item.title,
            description: item.summary,
            creditText: item.credits,
            url: canonicalWorkUrl,
            sameAs: item.url,
            thumbnailUrl: absoluteUrl(item.poster),
            uploadDate: item.uploadDate,
            duration: item.duration,
            embedUrl: `https://www.youtube-nocookie.com/embed/${item.videoId}`,
            ...(item.location
              ? {
                  locationCreated: {
                    "@type": "Place",
                    name: item.location,
                  },
                }
              : {}),
          },
        };
      }),
    },
  };
}
