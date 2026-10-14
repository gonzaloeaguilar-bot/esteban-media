import { RestaurantIgStudyPage } from "@/components/restaurant-ig-study-page";
import {
  restaurantIgStudyAlternates,
  restaurantIgStudyCopy,
  restaurantIgStudyPaths,
} from "@/lib/restaurant-ig-study";
import { buildPageMetadata } from "@/lib/site-metadata";

const copy = restaurantIgStudyCopy.en;

export const metadata = buildPageMetadata({
  title: copy.metadataTitle,
  description: copy.description,
  path: restaurantIgStudyPaths.en,
  locale: "en",
  languages: { ...restaurantIgStudyAlternates },
});

export default function EnglishRestaurantIgStudyPage() {
  return <RestaurantIgStudyPage locale="en" />;
}
