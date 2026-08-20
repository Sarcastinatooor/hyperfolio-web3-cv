import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll } from "framer-motion";
import { ArrowUpRight, BookOpen, Braces, Clock3, FileText, Sparkles } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { writingPieces, type WritingCollection, type WritingPiece } from "@/data/writing";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { TweetEmbed } from "@/components/ui/tweet-embed";

type Filter = "All" | WritingCollection;

const filters: Filter[] = ["All", "Brahma", "Liminal", "Developer docs"];

const formatIcon = {
  Article: FileText,
  "X article": Sparkles,
  Documentation: Braces,
} as const;

const Reader = ({ piece, mobile = false }: { piece: WritingPiece; mobile?: boolean }) => {
  const reduceMotion = useReducedMotion();
  const FormatIcon = formatIcon[piece.format];

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.article
        key={piece.id}
        initial={reduceMotion ? false : { opacity: 0, y: 14, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={reduceMotion ? undefined : { opacity: 0, y: -8, filter: "blur(6px)" }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className={cn("overflow-hidden", !mobile && "hl-card")}
      >
        <div className={cn("border-b border-border", mobile ? "pb-5 pr-8" : "p-6 md:p-8")}>
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-primary">
              <FormatIcon className="h-3 w-3" />
              {piece.format}
            </span>
            <span className="rounded-full border border-border bg-secondary/70 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
              {piece.topic}
            </span>
          </div>

          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{piece.eyebrow}</div>
          <h3 className="mt-3 text-2xl font-bold leading-tight text-foreground md:text-3xl">{piece.title}</h3>
          <p className="mt-4 text-sm leading-6 text-foreground/80 md:text-[15px]">{piece.description}</p>

          <div className="mt-5 flex items-center justify-between gap-4 border-t border-border pt-4">
            <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              <Clock3 className="h-3.5 w-3.5 text-primary" />
              {piece.readTime}
            </span>
            <a
              href={piece.url}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-primary hover:text-foreground"
            >
              Open original
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        {piece.tweetUrl ? (
          <div className={cn(mobile ? "py-5" : "bg-background/35 p-4 md:p-6")}>
            <TweetEmbed tweetUrl={piece.tweetUrl} className="mx-auto max-w-[560px] border-0" />
          </div>
        ) : (
          <div className={cn("space-y-7", mobile ? "py-6" : "p-6 md:p-8")}>
            <div className="space-y-4">
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary">Reading preview</div>
              {piece.body.map((paragraph) => (
                <p key={paragraph} className="text-[15px] leading-7 text-foreground/85">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="rounded-xl border border-primary/20 bg-primary/[0.06] p-5">
              <div className="mb-4 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-primary">
                <BookOpen className="h-3.5 w-3.5" />
                Core ideas
              </div>
              <ol className="space-y-3">
                {piece.takeaways.map((takeaway, index) => (
                  <li key={takeaway} className="flex gap-3 text-sm leading-6 text-foreground/80">
                    <span className="font-mono text-[10px] text-primary">0{index + 1}</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </motion.article>
    </AnimatePresence>
  );
};

const IndexItem = ({ piece, active, index, onSelect }: { piece: WritingPiece; active: boolean; index: number; onSelect: () => void }) => (
  <motion.button
    layout
    type="button"
    onClick={onSelect}
    className={cn(
      "group relative grid w-full grid-cols-[34px_1fr_auto] gap-3 border-b border-border p-4 text-left last:border-b-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary md:p-5",
      active ? "bg-primary/[0.08]" : "hover:bg-secondary/65",
    )}
  >
    {active && <motion.span layoutId="writing-active-rail" className="absolute inset-y-3 left-0 w-0.5 rounded-full bg-primary" />}
    <span className={cn("pt-0.5 font-mono text-[10px]", active ? "text-primary" : "text-muted-foreground")}>{String(index + 1).padStart(2, "0")}</span>
    <span className="min-w-0">
      <span className="flex flex-wrap items-center gap-2">
        <span className={cn("font-mono text-[9px] uppercase tracking-[0.16em]", active ? "text-primary" : "text-muted-foreground")}>{piece.collection}</span>
        {piece.featured && <span className="rounded border border-accent/30 bg-accent/10 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider text-accent">Featured</span>}
      </span>
      <span className={cn("mt-1.5 block text-sm font-semibold leading-5 transition-colors", active ? "text-foreground" : "text-foreground/85 group-hover:text-foreground")}>{piece.title}</span>
      <span className="mt-2 block font-mono text-[9px] uppercase tracking-wider text-muted-foreground">{piece.topic}</span>
    </span>
    <ArrowUpRight className={cn("mt-1 h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5", active ? "text-primary" : "text-muted-foreground")} />
  </motion.button>
);

export const SelectedWriting = () => {
  const [filter, setFilter] = useState<Filter>("All");
  const [activeId, setActiveId] = useState(writingPieces[0].id);
  const [mobileReaderOpen, setMobileReaderOpen] = useState(false);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll();

  const filteredPieces = useMemo(
    () => (filter === "All" ? writingPieces : writingPieces.filter((piece) => piece.collection === filter)),
    [filter],
  );

  const activePiece = writingPieces.find((piece) => piece.id === activeId) ?? filteredPieces[0] ?? writingPieces[0];

  const selectFilter = (nextFilter: Filter) => {
    setFilter(nextFilter);
    const firstMatch = nextFilter === "All" ? writingPieces[0] : writingPieces.find((piece) => piece.collection === nextFilter);
    if (firstMatch) setActiveId(firstMatch.id);
  };

  const selectPiece = (piece: WritingPiece) => {
    setActiveId(piece.id);
    if (isMobile) setMobileReaderOpen(true);
  };

  return (
    <section className="hl-card relative overflow-hidden">
      <motion.div className="absolute inset-x-0 top-0 z-20 h-px origin-left bg-primary" style={{ scaleX: scrollYProgress }} />
      <div className="relative border-b border-border p-5 md:p-8">
        <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.16),transparent_68%)]" />
        <div className="relative flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">Selected writing · 18 pieces</div>
            <h2 className="mt-2 max-w-3xl text-2xl font-bold text-foreground md:text-4xl">Technical ideas, written for people who build and buy.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">Long-form product narratives, onchain research, X articles and developer documentation across agentic finance and institutional custody.</p>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="Filter writing by collection">
            {filters.map((item) => {
              const active = filter === item;
              const count = item === "All" ? writingPieces.length : writingPieces.filter((piece) => piece.collection === item).length;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => selectFilter(item)}
                  className={cn(
                    "rounded-full border px-3 py-2 font-mono text-[9px] uppercase tracking-[0.13em] transition-colors",
                    active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card/70 text-muted-foreground hover:border-primary/40 hover:text-foreground",
                  )}
                >
                  {item} <span className={active ? "text-primary-foreground/65" : "text-muted-foreground/60"}>· {count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,0.82fr)_minmax(460px,1.18fr)]">
        <div className="border-border lg:border-r">
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredPieces.map((piece, index) => (
              <IndexItem key={piece.id} piece={piece} active={piece.id === activePiece.id} index={index} onSelect={() => selectPiece(piece)} />
            ))}
          </AnimatePresence>
        </div>

        <div className="hidden bg-background/20 p-5 lg:block xl:p-7">
          <div className="sticky top-24">
            <Reader piece={activePiece} />
          </div>
        </div>
      </div>

      <Dialog open={mobileReaderOpen} onOpenChange={setMobileReaderOpen}>
        <DialogContent className="left-0 top-0 block h-[100dvh] max-w-none translate-x-0 translate-y-0 overflow-y-auto border-0 p-5 md:hidden">
          <DialogTitle className="sr-only">{activePiece.title}</DialogTitle>
          <Reader piece={activePiece} mobile />
        </DialogContent>
      </Dialog>
    </section>
  );
};

