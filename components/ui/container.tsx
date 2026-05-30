import * as React from "react";

import { cn } from "@/lib/utils";

const Container = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mx-auto w-full max-w-6xl px-6 md:px-10", className)}
    {...props}
  />
));
Container.displayName = "Container";

export { Container };
