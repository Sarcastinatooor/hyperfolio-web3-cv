import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/8bit-badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/8bit-card";
import { Separator } from "@/components/ui/8bit-separator";

export interface ChangelogEntry {
  badge?: string;
  date: string;
  description: string;
  title: string;
}

interface Team2Props {
  className?: string;
  description?: string;
  entries?: ChangelogEntry[];
  onSelect?: (index: number) => void;
  title?: string;
}

const defaultEntries: ChangelogEntry[] = [
  {
    date: "Mar 2026",
    title: "v2.0 — Block System",
    description:
      "21 production-ready blocks across 8 categories. Hero, pricing, FAQ, social proof, and more.",
    badge: "LATEST",
  },
  {
    date: "Feb 2026",
    title: "v1.5 — Gaming Components",
    description:
      "Health bars, mana bars, leaderboards, game over screens, and victory animations.",
  },
  {
    date: "Jan 2026",
    title: "v1.0 — Public Launch",
    description:
      "50+ base components. Registry goes live. Open source from day one.",
  },
];

export default function Team2({
  title = "Changelog",
  description = "What we shipped and when",
  entries = defaultEntries,
  onSelect,
  className,
}: Team2Props) {
  return (
    <section className={cn("retro w-full px-1 py-2 sm:px-4", className)}>
      <div className="mx-auto max-w-3xl">
        {(title || description) && (
          <div className="mb-10 text-center">
            {title && (
              <h2 className="mb-3 text-2xl font-bold tracking-tight md:text-3xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col gap-4">
          {entries.map((entry, idx) => (
            <div key={`${entry.title}-${entry.date}`}>
              <button
                type="button"
                className="group block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                onClick={() => onSelect?.(idx)}
                aria-label={`Open ${entry.title} experience`}
              >
                <Card className="transition-transform duration-200 group-hover:-translate-y-1 group-hover:border-primary/70 group-hover:shadow-[6px_6px_0_hsl(var(--primary)/0.45)]">
                  <div className="absolute left-0 top-0 h-2 w-2 bg-primary" />
                  <div className="absolute bottom-0 right-0 h-2 w-2 bg-primary" />

                  {entry.badge && (
                    <div className="relative z-10 px-5 pt-5 sm:absolute sm:right-5 sm:top-5 sm:p-0">
                      <Badge className="text-[9px]">{entry.badge}</Badge>
                    </div>
                  )}

                  <CardHeader className={cn("pb-3", entry.badge && "sm:pr-36")}>
                    <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:text-[11px]">
                      {entry.date}
                    </div>
                    <CardTitle className="font-mono text-sm uppercase sm:text-base">
                      {entry.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="font-mono text-[11px] leading-6 sm:text-xs sm:leading-6">
                      {entry.description}
                    </CardDescription>
                    <div className="mt-5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-primary opacity-80 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                      <span aria-hidden="true">▶</span>
                      View mission log
                    </div>
                  </CardContent>
                </Card>
              </button>
              {idx < entries.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
