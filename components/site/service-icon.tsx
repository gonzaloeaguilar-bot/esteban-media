import { Camera, Film, Image as ImageIcon, Plane, Video } from "lucide-react";

import type { Service } from "@/content/services";
import { cn } from "@/lib/utils";

const iconMap: Record<Service["icon"], React.ComponentType<{ className?: string }>> = {
  drone: Plane,
  camera: Camera,
  video: Video,
  film: Film,
  image: ImageIcon,
};

type ServiceIconProps = {
  icon: Service["icon"];
  className?: string;
};

export function ServiceIcon({ icon, className }: ServiceIconProps) {
  const Icon = iconMap[icon];
  return <Icon className={cn("h-5 w-5", className)} aria-hidden="true" />;
}
