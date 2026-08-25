import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export interface TimelineEntry {
  title: string;
  content: ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!contentRef.current) return;
    const updateHeight = () => setHeight(contentRef.current?.getBoundingClientRect().height ?? 0);
    updateHeight();
    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(contentRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 55%"],
  });
  const beamHeight = useTransform(scrollYProgress, [0, 1], [0, height]);
  const beamOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);

  return (
    <div ref={containerRef} className="relative w-full">
      <div ref={contentRef} className="relative pb-6">
        {data.map((item, index) => (
          <div key={`${item.title}-${index}`} className="flex items-start gap-4 pb-12 last:pb-0 md:gap-8 md:pb-20">
            <div className="sticky top-28 z-20 flex w-16 shrink-0 items-center self-start md:w-52">
              <div className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border bg-background shadow-[0_0_0_5px_hsl(var(--background))]">
                <span className="h-2.5 w-2.5 rounded-full border border-primary/60 bg-secondary" />
              </div>
              <div className="hidden pl-5 font-mono text-sm font-bold uppercase tracking-wider text-muted-foreground md:block">
                {item.title}
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground md:hidden">
                {item.title}
              </div>
              {item.content}
            </div>
          </div>
        ))}

        <div
          style={{ height }}
          className="absolute left-4 top-0 w-px overflow-hidden bg-gradient-to-b from-transparent via-border to-transparent md:left-4"
          aria-hidden="true"
        >
          <motion.div
            style={{ height: reduceMotion ? height : beamHeight, opacity: reduceMotion ? 1 : beamOpacity }}
            className="absolute inset-x-0 top-0 w-px rounded-full bg-gradient-to-t from-accent via-primary to-transparent shadow-[0_0_12px_hsl(var(--primary)/0.65)]"
          />
        </div>
      </div>
    </div>
  );
};
