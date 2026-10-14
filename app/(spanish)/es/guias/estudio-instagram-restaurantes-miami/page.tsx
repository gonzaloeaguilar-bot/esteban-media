import { RestaurantIgStudyPage } from "@/components/restaurant-ig-study-page";
import {
  restaurantIgStudyAlternates,
  restaurantIgStudyCopy,
  restaurantIgStudyPaths,
} from "@/lib/restaurant-ig-study";
import { buildPageMetadata } from "@/lib/site-metadata";

const copy = restaurantIgStudyCopy.es;

export const metadata = buildPageMetadata({
  title: copy.metadataTitle,
  description: copy.description,
  path: restaurantIgStudyPaths.es,
  locale: "es",
  languages: { ...restaurantIgStudyAlternates },
});

export default function SpanishRestaurantIgStudyPage() {
  return <RestaurantIgStudyPage locale="es" />;
}
