import * as React from "react";

import { cn } from "@/lib/utils";

function Container({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & {
  size?: "sm" | "default" | "lg" | "xl" | "full";
}) {
  const sizeClasses = {
    sm: "max-w-3xl",
    default: "max-w-5xl",
    lg: "max-w-6xl",
    xl: "max-w-7xl",
    full: "max-w-none",
  } as const;

  return (
    <div
      data-slot="container"
      data-size={size}
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}

export { Container };
