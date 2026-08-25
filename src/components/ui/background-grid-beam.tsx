import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BackgroundGridBeamProps {
  className?: string;
}

const horizontalBeams = [
  { top: "18%", duration: 15, delay: 0 },
  { top: "58%", duration: 19, delay: 5 },
  { top: "84%", duration: 17, delay: 10 },
];

const verticalBeams = [
  { left: "22%", duration: 18, delay: 2 },
  { left: "72%", duration: 21, delay: 8 },
];

/**
 * Ambient grid and travelling light beams inspired by 21st.dev's
 * Background Grid Beam. This layer is decorative and never intercepts input.
 */
export function BackgroundGridBeam({ className }: BackgroundGridBeamProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-0 z-0 overflow-hidden",
        className,
      )}
    >
      <div
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--grid-color) / 0.72) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--grid-color) / 0.72) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 90% 75% at 50% 38%, black 20%, transparent 88%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 75% at 50% 38%, black 20%, transparent 88%)",
        }}
      />

      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(circle at 50% 16%, hsl(var(--primary) / 0.11), transparent 34%), radial-gradient(circle at 82% 68%, hsl(var(--accent) / 0.045), transparent 28%)",
        }}
      />

      {horizontalBeams.map((beam) => (
        <motion.div
          key={beam.top}
          className="absolute left-0 h-px w-56 bg-gradient-to-r from-transparent via-primary/70 to-transparent blur-[0.2px]"
          style={{ top: beam.top }}
          initial={reduceMotion ? false : { x: "-30vw", opacity: 0 }}
          animate={
            reduceMotion
              ? { opacity: 0.16 }
              : { x: ["-30vw", "130vw"], opacity: [0, 0.8, 0.8, 0] }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: beam.duration,
                  delay: beam.delay,
                  ease: "linear",
                  repeat: Infinity,
                  repeatDelay: 2,
                }
          }
        />
      ))}

      {verticalBeams.map((beam) => (
        <motion.div
          key={beam.left}
          className="absolute top-0 h-52 w-px bg-gradient-to-b from-transparent via-primary/55 to-transparent blur-[0.2px]"
          style={{ left: beam.left }}
          initial={reduceMotion ? false : { y: "-35vh", opacity: 0 }}
          animate={
            reduceMotion
              ? { opacity: 0.12 }
              : { y: ["-35vh", "135vh"], opacity: [0, 0.65, 0.65, 0] }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: beam.duration,
                  delay: beam.delay,
                  ease: "linear",
                  repeat: Infinity,
                  repeatDelay: 3,
                }
          }
        />
      ))}

      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
