import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export interface ScrollSpyItem {
  id: string;
  label: string;
}

interface ScrollSpyProps {
  items: ScrollSpyItem[];
  className?: string;
}

export const ScrollSpy = ({ items, className }: ScrollSpyProps) => {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveId(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0.05, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Portfolio sections"
      className={cn(
        "flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-border bg-card/80 p-1 shadow-lg shadow-black/10 backdrop-blur-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      {items.map((item) => {
        const active = item.id === activeId;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
              setActiveId(item.id);
            }}
            className={cn(
              "relative shrink-0 rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors",
              active ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
            )}
            aria-current={active ? "location" : undefined}
          >
            {active && (
              <motion.span
                layoutId="scroll-spy-pill"
                className="absolute inset-0 -z-10 rounded-full bg-primary"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            {item.label}
          </button>
        );
      })}
    </nav>
  );
};
