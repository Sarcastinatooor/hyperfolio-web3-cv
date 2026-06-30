import { ArrowUpRight } from "lucide-react";

export interface ExperienceCardData {
  company: string;
  title: string;
  period: string;
  metric: string;
  metricLabel: string;
  skills: string[];
  logo?: React.ReactNode;
  accent?: "primary" | "yellow" | "cyan" | "green";
  onClick?: () => void;
}

interface ExperienceGridProps {
  items: ExperienceCardData[];
}

const accentClass: Record<NonNullable<ExperienceCardData["accent"]>, string> = {
  primary: "text-primary border-primary/40 bg-primary/8",
  yellow: "text-accent border-accent/40 bg-accent/8",
  cyan: "text-[hsl(var(--neon-cyan))] border-[hsl(var(--neon-cyan)/0.4)] bg-[hsl(var(--neon-cyan)/0.08)]",
  green: "text-[hsl(var(--neon-green))] border-[hsl(var(--neon-green)/0.4)] bg-[hsl(var(--neon-green)/0.08)]",
};

const ExperienceGrid = ({ items }: ExperienceGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {items.map((item, i) => {
        const accent = item.accent ?? "primary";
        return (
          <button
            key={`${item.company}-${i}`}
            onClick={item.onClick}
            className="group relative text-left hl-card p-5 overflow-hidden transition-all duration-300 hover:-translate-y-1"
          >
            {/* gradient overlay on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 100% 0%, hsl(var(--primary) / 0.18), transparent 55%)",
                }}
              />
            </div>

            {/* corner arrow indicator */}
            <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-muted/40 border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
              <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
            </div>

            <div className="relative z-10 flex flex-col h-full">
              {/* Logo + Company */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-md bg-background/80 border border-border flex items-center justify-center overflow-hidden">
                  {item.logo}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-mono uppercase tracking-wider text-muted-foreground truncate">
                    {item.company}
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/60 mt-0.5">
                    {item.period}
                  </div>
                </div>
              </div>

              {/* Role title */}
              <div className="text-base font-semibold text-foreground leading-tight mb-5 line-clamp-2 pr-8">
                {item.title}
              </div>

              {/* Hero metric */}
              <div className={`relative rounded-md border px-4 py-3 mb-4 ${accentClass[accent]}`}>
                <div className="text-[10px] font-mono uppercase tracking-widest opacity-70 mb-1">
                  {item.metricLabel}
                </div>
                <div className="text-2xl font-mono font-bold leading-none">
                  {item.metric}
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                {item.skills.slice(0, 3).map((skill, idx) => (
                  <span key={idx} className="chip">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default ExperienceGrid;
