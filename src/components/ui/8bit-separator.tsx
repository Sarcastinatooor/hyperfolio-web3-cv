import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      "shrink-0 bg-transparent",
      orientation === "horizontal"
        ? "h-0 w-full border-t-2 border-dashed border-border/70"
        : "h-full w-0 border-l-2 border-dashed border-border/70",
      className,
    )}
    {...props}
  />
));
Separator.displayName = "8BitSeparator";

export { Separator };
