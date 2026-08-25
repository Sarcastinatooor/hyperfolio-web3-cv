import * as React from "react";

import { cn } from "@/lib/utils";

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement>;

function Badge({ className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center border-2 border-accent bg-accent/10 px-2.5 py-1 font-mono font-bold uppercase tracking-[0.08em] text-accent shadow-[2px_2px_0_hsl(var(--accent)/0.28)]",
        className,
      )}
      {...props}
    />
  );
}

export { Badge };
