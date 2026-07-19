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

interface PortfolioWatchSchemaOptions
  extends Omit<PortfolioSchemaItem, "id"> {
  path: string;
  locale: "en-US" | "es-US";
  breadcrumbs: readonly {
    name: string;
    path: string;
  }[];
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
        const canonicalWorkUrl = absoluteUrl(`${path}/${item.id}`);

        return {
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "WebPage",
            "@id": `${canonicalWorkUrl}#webpage`,
            name: item.title,
            description: item.summary,
            url: canonicalWorkUrl,
            inLanguage: locale,
            primaryImageOfPage: {
              "@type": "ImageObject",
              url: absoluteUrl(item.poster),
            },
          },
        };
      }),
    },
  };
}

export function buildPortfolioWatchSchema({
  path,
  locale,
  title,
  summary,
  credits,
  url,
  poster,
  videoId,
  uploadDate,
  duration,
  location,
  breadcrumbs,
}: PortfolioWatchSchemaOptions) {
  const pageUrl = absoluteUrl(path);
  const videoIdUrl = `${pageUrl}#video`;
  const breadcrumbId = `${pageUrl}#breadcrumbs`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description: summary,
        inLanguage: locale,
        isPartOf: { "@id": absoluteUrl("/#website") },
        publisher: { "@id": absoluteUrl("/#business") },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: absoluteUrl(poster),
        },
        breadcrumb: { "@id": breadcrumbId },
        mainEntity: { "@id": videoIdUrl },
      },
      {
        "@type": "VideoObject",
        "@id": videoIdUrl,
        name: title,
        description: summary,
        creditText: credits,
        url: pageUrl,
        sameAs: url,
        thumbnailUrl: absoluteUrl(poster),
        uploadDate,
        duration,
        embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}`,
        inLanguage: locale,
        ...(location
          ? {
              locationCreated: {
                "@type": "Place",
                name: location,
              },
            }
          : {}),
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: breadcrumbs.map((breadcrumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: breadcrumb.name,
          item: absoluteUrl(breadcrumb.path),
        })),
      },
    ],
  };
}
