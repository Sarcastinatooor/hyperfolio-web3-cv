import { useEffect, useRef, useState, type PointerEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

export interface DeckItem {
  id: string;
  eyebrow?: string;
  title: string;
  text: string;
  href?: string;
  stats?: Array<{ label: string; value: string }>;
}

interface BlurRevealDeckProps {
  items: DeckItem[];
  onActiveChange?: (item: DeckItem, index: number) => void;
}

export const BlurRevealDeck = ({ items, onActiveChange }: BlurRevealDeckProps) => {
  const [active, setActive] = useState(0);
  const pointerStart = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();
  const total = items.length;

  useEffect(() => {
    if (items[active]) onActiveChange?.(items[active], active);
  }, [active, items, onActiveChange]);

  if (!total) return null;

  const go = (nextIndex: number) => setActive((nextIndex + total) % total);
  const activeItem = items[active];

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pointerStart.current = event.clientX;
  };
  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStart.current === null) return;
    const distance = event.clientX - pointerStart.current;
    pointerStart.current = null;
    if (distance < -45) go(active + 1);
    if (distance > 45) go(active - 1);
  };

  return (
    <div className="w-full">
      <div
        className="relative h-[360px] touch-pan-y select-none md:h-[330px]"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        {[2, 1].map((offset) => (
          <div
            key={offset}
            className="absolute inset-x-4 rounded-xl border border-border bg-card/45"
            style={{ top: offset * 12, bottom: -offset * 12, transform: `scale(${1 - offset * 0.04})`, opacity: 0.42 / offset }}
            aria-hidden="true"
          />
        ))}

        <AnimatePresence mode="popLayout" initial={false}>
          <motion.article
            key={activeItem.id}
            initial={reduceMotion ? false : { opacity: 0, y: -14, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 260, rotate: 4, scale: 0.96 }}
            transition={{ duration: reduceMotion ? 0.12 : 0.42, ease: [0.22, 0.61, 0.36, 1] }}
            className="absolute inset-0 z-10 flex cursor-grab flex-col overflow-hidden rounded-xl border border-primary/30 bg-card p-5 shadow-[0_22px_60px_-36px_hsl(var(--primary)/0.65)] active:cursor-grabbing md:p-6"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-md bg-primary font-mono text-xs font-bold text-primary-foreground">
                  {String(active + 1).padStart(2, "0")}
                </span>
                <span className="h-1.5 w-9 rounded-full bg-accent" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {active + 1} / {total}
              </span>
            </div>

            <div className="mt-6 flex-1">
              {activeItem.eyebrow && (
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">{activeItem.eyebrow}</div>
              )}
              <h3 className="mt-2 text-xl font-semibold leading-tight text-foreground md:text-2xl">{activeItem.title}</h3>
              <p className="mt-3 line-clamp-4 text-sm leading-6 text-muted-foreground">{activeItem.text}</p>
            </div>

            {activeItem.stats && (
              <div className="grid grid-cols-3 gap-2">
                {activeItem.stats.map((stat) => (
                  <div key={stat.label} className="rounded-md border border-border bg-background/55 px-3 py-2">
                    <div className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">{stat.label}</div>
                    <div className="mt-1 font-mono text-sm font-bold text-foreground">{stat.value}</div>
                  </div>
                ))}
              </div>
            )}

            {activeItem.href && (
              <a
                href={activeItem.href}
                target="_blank"
                rel="noreferrer"
                onPointerDown={(event) => event.stopPropagation()}
                className="mt-4 inline-flex items-center gap-2 self-start text-xs font-medium text-primary hover:text-primary/80"
              >
                Open on X <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </motion.article>
        </AnimatePresence>
      </div>

      <div className="mt-7 flex items-center justify-between gap-4">
        <div className="flex gap-2">
          <button type="button" onClick={() => go(active - 1)} className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-primary transition-colors hover:border-primary/50 hover:bg-primary hover:text-primary-foreground" aria-label="Previous post">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button type="button" onClick={() => go(active + 1)} className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-primary transition-colors hover:border-primary/50 hover:bg-primary hover:text-primary-foreground" aria-label="Next post">
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => go(index)}
              aria-label={`Show post ${index + 1}`}
              aria-current={index === active ? "true" : undefined}
              className={index === active ? "h-2.5 w-6 rounded-full bg-primary transition-all" : "h-2.5 w-2.5 rounded-full bg-border transition-all hover:bg-muted-foreground"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
