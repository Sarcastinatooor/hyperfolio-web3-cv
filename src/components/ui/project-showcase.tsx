import { useState, type PointerEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export interface ShowcaseProject {
  id: string;
  title: string;
  meta: string;
  description: string;
  image: string;
  onSelect?: () => void;
}

export const ProjectShowcase = ({ projects }: { projects: ShowcaseProject[] }) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const reduceMotion = useReducedMotion();
  const activeProject = projects.find((project) => project.id === activeId);

  const trackPointer = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPosition({ x: event.clientX - rect.left, y: event.clientY - rect.top });
  };

  return (
    <section className="hl-card relative overflow-hidden" onPointerMove={trackPointer}>
      <div className="border-b border-border p-5 md:p-7">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">Selected impact</div>
        <h2 className="mt-2 text-2xl font-bold text-foreground md:text-3xl">Proof of work, not job descriptions</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Hover for a visual preview. Open any outcome to see the role, system, and execution behind it.</p>
      </div>
      <div>
        {projects.map((project, index) => (
          <button key={project.id} type="button" onMouseEnter={() => setActiveId(project.id)} onMouseLeave={() => setActiveId(null)} onFocus={() => setActiveId(project.id)} onBlur={() => setActiveId(null)} onClick={project.onSelect} className="group grid w-full gap-3 border-b border-border p-5 text-left transition-colors last:border-b-0 hover:bg-secondary/60 focus:bg-secondary/60 focus:outline-none md:grid-cols-[70px_1fr_1.35fr_auto] md:items-center md:p-6">
            <span className="font-mono text-xs text-primary">0{index + 1}</span>
            <div>
              <div className="text-lg font-semibold text-foreground transition-transform group-hover:translate-x-1">{project.title}</div>
              <div className="mt-1 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">{project.meta}</div>
            </div>
            <p className="text-sm leading-6 text-muted-foreground">{project.description}</p>
            <ArrowUpRight className="hidden h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary md:block" />
          </button>
        ))}
      </div>
      <AnimatePresence>
        {activeProject && !reduceMotion && (
          <motion.div key={activeProject.id} initial={{ opacity: 0, scale: 0.86, rotate: -3 }} animate={{ opacity: 1, scale: 1, rotate: 0, x: position.x + 22, y: position.y - 90 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ type: "spring", stiffness: 320, damping: 26 }} className="pointer-events-none absolute left-0 top-0 z-20 hidden h-36 w-52 place-items-center overflow-hidden rounded-xl border border-primary/40 bg-card p-5 shadow-2xl shadow-black/40 lg:grid">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.18),transparent_65%)]" />
            <img src={activeProject.image} alt="" className="relative max-h-20 max-w-36 object-contain" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
