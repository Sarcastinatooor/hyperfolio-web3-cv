import { Users, Sparkles } from "lucide-react";

interface KolEntry {
  name: string;
  handle: string;
  avatar: string;
  tag?: string;
}

const KOLS: KolEntry[] = [
  { name: "Stacy Muur", handle: "stacy_muur", avatar: "/lovable-uploads/1f575802-c0d0-4114-8bec-f98bfb56761b.png", tag: "DeFi" },
  { name: "The Smart Ape", handle: "the_smart_ape", avatar: "/lovable-uploads/a11ad34f-11d8-43e5-b3b6-9890f7430089.png", tag: "Macro" },
  { name: "0xMughal", handle: "0xMughal", avatar: "/lovable-uploads/feb6c46f-b756-4ce9-96d5-33f7bacd89b9.png", tag: "Onchain" },
  { name: "Jiraiya", handle: "JiraiyaReal", avatar: "/lovable-uploads/40b20f90-97ad-44d4-90f2-5e9b20fc5975.png", tag: "Trader" },
  { name: "Diego DeFi", handle: "diego_defai", avatar: "/lovable-uploads/d3dbd676-f2e4-4ee1-bdc7-1fa7302a5233.png", tag: "DeFi" },
  { name: "DeFi Dad", handle: "DeFi_Dad", avatar: "/lovable-uploads/1029abfc-9383-4127-8cee-ffc0e04bb3d3.png", tag: "OG" },
  { name: "Stephen | DeFi Dojo", handle: "phtevenstrong", avatar: "https://unavatar.io/x/phtevenstrong", tag: "DeFi" },
  { name: "LST Maximalist", handle: "lstmaximalist", avatar: "/lovable-uploads/c8e25253-4839-4e4a-8907-94d6f00c6476.png", tag: "LST" },
  { name: "Aibra", handle: "aibra", avatar: "/lovable-uploads/20d8a89f-cf6b-46dd-aa6a-9d75aadd582f.png", tag: "Trader" },
  { name: "Barthazian", handle: "Barthazian", avatar: "/lovable-uploads/9ce3ba73-4a14-4b18-b043-2cfe9a9f2556.png", tag: "DeFi" },
  { name: "HyperLcrgs", handle: "HyperLcrgs", avatar: "/lovable-uploads/7e251f06-d9b8-4c16-b083-361e9cc2046a.png", tag: "Hyperliquid" },
  { name: "Blum OG", handle: "Blum_OG", avatar: "/lovable-uploads/1c6fe125-f07e-4646-b1ed-97f5e5672998.png", tag: "OG" },
  { name: "Eli5 DeFi", handle: "eli5_defi", avatar: "/lovable-uploads/dc46ffac-6316-4c5a-8173-5ff00447e61f.png", tag: "DeFi" },
  { name: "Today in DeFi", handle: "todayindefi", avatar: "/lovable-uploads/3cbcc621-28e5-4718-9f12-64cfe62dc41a.png", tag: "News" },
  { name: "Jack Niewold", handle: "JackNiewold", avatar: "/lovable-uploads/a00d7c61-898b-4216-ba34-3bea28450878.png", tag: "Yapper" },
  { name: "IAmYourChaos", handle: "iamyourchaos", avatar: "/lovable-uploads/fc576325-6e4b-48aa-9d95-c8170d607e78.png", tag: "Onchain" },
  { name: "Wenxue", handle: "wenxue600", avatar: "/lovable-uploads/c57c5046-5c3c-435c-8b5e-3ee40eb32243.png", tag: "Asia" },
  { name: "0xAllen888", handle: "0xAllen888", avatar: "/lovable-uploads/4d7c3e4e-bc9e-4711-a48f-15f595459d59.png", tag: "Trader" },
  { name: "ZKSgu", handle: "ZKSgu", avatar: "/lovable-uploads/3b44ede4-6687-45f8-a879-dce8376eaab2.png", tag: "ZK" },
  { name: "0xNairolf", handle: "0xNairolf", avatar: "/lovable-uploads/63ec0222-e694-4720-ab4f-00543635c557.png", tag: "DeFi" },
];

const KolCard = ({ kol }: { kol: KolEntry }) => (
  <button
    type="button"
    onClick={() => window.open(`https://x.com/${kol.handle}`, "_blank")}
    className="group flex-shrink-0 flex items-center gap-3 px-3 py-2 rounded-md border border-border bg-card/60 hover:border-primary/60 hover:bg-card transition-all duration-300 min-w-[200px] hover:-translate-y-0.5"
  >
    <div className="relative">
      <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-border group-hover:border-primary/70 transition-all">
        <img src={kol.avatar} alt={kol.name} className="w-full h-full object-cover" />
      </div>
      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[hsl(var(--neon-green))] border border-background" />
    </div>
    <div className="flex flex-col text-left min-w-0">
      <span className="text-sm font-semibold text-foreground truncate">{kol.name}</span>
      <div className="flex items-center gap-1.5 mt-0.5">
        <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
          @{kol.handle}
        </span>
        {kol.tag && (
          <span className="text-[9px] font-mono uppercase tracking-wider text-accent">
            · {kol.tag}
          </span>
        )}
      </div>
    </div>
  </button>
);

const KolMarquee = () => {
  const half = Math.ceil(KOLS.length / 2);
  const row1 = KOLS.slice(0, half);
  const row2 = KOLS.slice(half);

  return (
    <div className="hl-card overflow-hidden p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              Curated KOL Network
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            KOLs I&apos;ve collaborated with
          </h2>
        </div>
        <div className="flex gap-3">
          <div className="hl-card px-4 py-2.5 min-w-[100px]">
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              Total Voices
            </div>
            <div className="text-xl font-mono font-bold text-foreground mt-0.5">20+</div>
          </div>
          <div className="hl-card px-4 py-2.5 min-w-[100px]">
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              Combined Reach
            </div>
            <div className="text-xl font-mono font-bold text-accent mt-0.5">25M+</div>
          </div>
        </div>
      </div>

      {/* Two-row marquee */}
      <div className="relative space-y-3">
        <div
          className="absolute inset-y-0 left-0 w-16 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, hsl(var(--card)) 0%, transparent 100%)" }}
        />
        <div
          className="absolute inset-y-0 right-0 w-16 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, hsl(var(--card)) 0%, transparent 100%)" }}
        />

        <div className="overflow-hidden">
          <div className="flex animate-[scroll-left_40s_linear_infinite] gap-3">
            {[...row1, ...row1].map((kol, i) => (
              <KolCard key={`r1-${kol.handle}-${i}`} kol={kol} />
            ))}
          </div>
        </div>

        <div className="overflow-hidden">
          <div className="flex animate-[scroll-right_45s_linear_infinite] gap-3">
            {[...row2, ...row2].map((kol, i) => (
              <KolCard key={`r2-${kol.handle}-${i}`} kol={kol} />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
        <Sparkles className="w-3 h-3 text-accent" />
        <span>DeFi · Hyperliquid · Berachain · Cross-chain · Macro</span>
      </div>
    </div>
  );
};

export default KolMarquee;
