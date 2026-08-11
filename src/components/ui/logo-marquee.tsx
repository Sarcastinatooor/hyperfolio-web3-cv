import { cn } from "@/lib/utils";

export interface MarqueeLogo {
  id: string;
  name: string;
  image: string;
}

interface LogoMarqueeProps {
  title: string;
  description?: string;
  logos: MarqueeLogo[];
  className?: string;
}

export const LogoMarquee = ({ title, description, logos, className }: LogoMarqueeProps) => {
  const repeated = [...logos, ...logos];

  return (
    <section className={cn("hl-card overflow-hidden py-8", className)}>
      <div className="px-5 text-center md:px-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">Operating stack</div>
        <h2 className="mt-2 text-2xl font-bold text-foreground md:text-3xl">{title}</h2>
        {description && <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground">{description}</p>}
      </div>
      <div className="group relative mt-8 overflow-hidden border-y border-border bg-secondary/25 py-5 focus-within:[&_.logo-marquee-track]:[animation-play-state:paused] hover:[&_.logo-marquee-track]:[animation-play-state:paused]">
        <div className="logo-marquee-track flex w-max items-center gap-3 pr-3 motion-reduce:animate-none">
          {repeated.map((logo, index) => (
            <div key={`${logo.id}-${index}`} tabIndex={index < logos.length ? 0 : -1} aria-hidden={index >= logos.length} className="flex min-w-44 items-center gap-3 rounded-lg border border-border bg-card/80 px-4 py-3 transition-colors hover:border-primary/40 hover:bg-card focus:outline-none focus:ring-2 focus:ring-primary/50">
              <div className="grid h-10 w-10 place-items-center overflow-hidden rounded-md border border-border bg-background p-1.5">
                <img src={logo.image} alt="" className="max-h-full max-w-full object-contain" loading="lazy" />
              </div>
              <span className="text-sm font-medium text-foreground">{logo.name}</span>
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-card to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-card to-transparent" />
      </div>
      <p className="mt-4 text-center font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Pause on hover or keyboard focus</p>
    </section>
  );
};
