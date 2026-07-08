import { useState, useMemo } from "react";
import { Trophy, ChevronDown, ArrowUpRight, Zap } from "lucide-react";

interface CampaignMetrics {
  views: number;
  likes: number;
  retweets: number;
  replies: number;
  engagement: number;
  tvlImpact: string;
}

export interface CampaignEntry {
  id: string;
  name: string;
  date: string;
  category: "product" | "partnership" | "giveaway" | "educational";
  tweetUrl?: string;
  highlights?: string[];
  metrics: CampaignMetrics;
}

interface CampaignLeaderboardProps {
  campaigns: CampaignEntry[];
  peakImpact?: string;
}

const CATEGORY: Record<
  CampaignEntry["category"],
  { label: string; textClass: string; borderClass: string; bgClass: string; dot: string }
> = {
  product: {
    label: "Product",
    textClass: "text-primary",
    borderClass: "border-primary/40",
    bgClass: "bg-primary/10",
    dot: "hsl(var(--primary))",
  },
  partnership: {
    label: "Partnership",
    textClass: "text-accent",
    borderClass: "border-accent/40",
    bgClass: "bg-accent/10",
    dot: "hsl(var(--accent))",
  },
  giveaway: {
    label: "Giveaway",
    textClass: "text-[hsl(var(--neon-green))]",
    borderClass: "border-[hsl(var(--neon-green)/0.4)]",
    bgClass: "bg-[hsl(var(--neon-green)/0.1)]",
    dot: "hsl(var(--neon-green))",
  },
  educational: {
    label: "Educational",
    textClass: "text-[hsl(var(--neon-cyan))]",
    borderClass: "border-[hsl(var(--neon-cyan)/0.4)]",
    bgClass: "bg-[hsl(var(--neon-cyan)/0.1)]",
    dot: "hsl(var(--neon-cyan))",
  },
};

const formatNum = (n: number) => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return `${n}`;
};

/** Deterministic sparkline from a numeric seed (view count). No randomness so no rerender jitter. */
const buildSparkline = (seed: number) => {
  const points = 16;
  const values: number[] = [];
  let v = seed;
  for (let i = 0; i < points; i++) {
    // pseudo-oscillation
    const wave = Math.sin(i * 0.55 + seed / 12345) * 0.35;
    const trend = i / points;
    v = seed * (0.55 + trend * 0.55 + wave * 0.18);
    values.push(v);
  }
  const min = Math.min(...values);
  const max = Math.max(...values);
  const w = 100;
  const h = 28;
  const step = w / (points - 1);
  const path = values
    .map((val, i) => {
      const x = i * step;
      const y = h - ((val - min) / Math.max(1, max - min)) * h;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const areaPath = `${path} L${w},${h} L0,${h} Z`;
  return { path, areaPath, w, h };
};

const CampaignCard = ({
  campaign,
  rank,
  featured = false,
}: {
  campaign: CampaignEntry;
  rank: number;
  featured?: boolean;
}) => {
  const [expanded, setExpanded] = useState(featured);
  const cat = CATEGORY[campaign.category] || CATEGORY.product;
  const spark = useMemo(() => buildSparkline(campaign.metrics.views), [campaign.metrics.views]);

  return (
    <article
      className={`hl-card group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 ${
        featured ? "md:col-span-2" : ""
      }`}
      style={{
        boxShadow: `inset 0 1px 0 hsl(0 0% 100% / 0.03)`,
      }}
    >
      {/* Ghost rank backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-2 -right-4 font-mono font-black leading-none select-none"
        style={{
          fontSize: featured ? "260px" : "180px",
          color: "hsl(var(--foreground) / 0.03)",
          letterSpacing: "-0.05em",
        }}
      >
        {rank}
      </div>

      {/* Colored corner accent */}
      <div
        aria-hidden
        className="absolute top-0 left-0 w-24 h-24 opacity-40 blur-2xl pointer-events-none"
        style={{ background: cat.dot }}
      />

      <div className="relative z-10 p-5 md:p-6 flex flex-col h-full min-h-[440px]">
        {/* Header row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              #{String(rank).padStart(2, "0")}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border font-mono text-[10px] uppercase tracking-widest ${cat.textClass} ${cat.borderClass} ${cat.bgClass}`}
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: cat.dot, boxShadow: `0 0 6px ${cat.dot}` }}
              />
              {cat.label}
            </span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <Zap className="w-3 h-3 text-accent" />
            Live
          </div>
        </div>

        {/* Campaign name */}
        <h3 className={`font-bold text-foreground leading-tight mb-4 ${featured ? "text-2xl md:text-3xl" : "text-lg"}`}>
          {campaign.name}
        </h3>

        {/* Hero metric */}
        <div className="mb-4">
          <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">
            TVL Impact
          </div>
          <div className="flex items-end gap-3">
            <div
              className={`font-mono font-black text-accent leading-none ${featured ? "text-6xl md:text-7xl" : "text-4xl md:text-5xl"}`}
              style={{ letterSpacing: "-0.03em" }}
            >
              {campaign.metrics.tvlImpact}
            </div>
            {/* Sparkline */}
            <svg
              viewBox={`0 0 ${spark.w} ${spark.h}`}
              width={featured ? 140 : 100}
              height={featured ? 40 : 28}
              className="mb-1 flex-shrink-0"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id={`spark-${campaign.id}-${rank}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={spark.areaPath} fill={`url(#spark-${campaign.id}-${rank})`} />
              <path
                d={spark.path}
                fill="none"
                stroke="hsl(var(--accent))"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Secondary metrics grid */}
        <div className={`grid gap-2 mb-4 ${featured ? "grid-cols-4" : "grid-cols-3"}`}>
          <MetricPill label="Views" value={formatNum(campaign.metrics.views)} />
          <MetricPill label="ER" value={`${campaign.metrics.engagement}%`} accent />
          <MetricPill label="Reposts" value={formatNum(campaign.metrics.retweets)} />
          {featured && <MetricPill label="Likes" value={formatNum(campaign.metrics.likes)} />}
        </div>

        {/* Engagement rate bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-1">
            <span>Engagement</span>
            <span className="text-accent">{campaign.metrics.engagement.toFixed(1)}% / 5.0%</span>
          </div>
          <div className="h-1 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent"
              style={{ width: `${Math.min(100, (campaign.metrics.engagement / 5) * 100)}%` }}
            />
          </div>
        </div>

        {/* Contributions - accordion */}
        {campaign.highlights && campaign.highlights.length > 0 && (
          <div className="mb-4">
            <button
              type="button"
              onClick={() => setExpanded((x) => !x)}
              className="w-full flex items-center justify-between text-left rounded-md border border-border bg-muted/20 hover:bg-muted/40 hover:border-primary/40 px-3 py-2 transition-colors"
              aria-expanded={expanded}
            >
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                {campaign.highlights.length} Core Contributions
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-300 ${
                  expanded ? "rotate-180 text-primary" : ""
                }`}
              />
            </button>
            <div
              className={`grid transition-all duration-500 ease-out ${
                expanded ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <ul className="space-y-2 pt-2 text-xs text-foreground/85 leading-relaxed">
                  {campaign.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-accent mt-0.5 shrink-0 font-mono text-[10px]">
                        ▸
                      </span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        {campaign.tweetUrl && (
          <a
            href={campaign.tweetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto flex items-center justify-between rounded-md border border-border bg-background/40 px-3 py-2.5 text-[11px] font-mono uppercase tracking-widest text-muted-foreground hover:border-primary/60 hover:text-primary hover:bg-primary/5 transition-all group/cta"
          >
            <span>View campaign on X</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/cta:rotate-45" />
          </a>
        )}
      </div>
    </article>
  );
};

const MetricPill = ({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) => (
  <div
    className={`rounded-md border ${
      accent ? "border-accent/30 bg-accent/5" : "border-border bg-muted/20"
    } px-2 py-2 text-center transition-colors`}
  >
    <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
      {label}
    </div>
    <div className={`text-sm font-mono font-bold mt-0.5 ${accent ? "text-accent" : "text-foreground"}`}>
      {value}
    </div>
  </div>
);

const CampaignLeaderboard = ({ campaigns, peakImpact = "$100M+" }: CampaignLeaderboardProps) => {
  const [filter, setFilter] = useState<"all" | CampaignEntry["category"]>("all");

  const filtered = useMemo(
    () => (filter === "all" ? campaigns : campaigns.filter((c) => c.category === filter)),
    [filter, campaigns]
  );

  const filterOptions: Array<{ key: typeof filter; label: string }> = [
    { key: "all", label: "All" },
    { key: "product", label: "Product" },
    { key: "partnership", label: "Partnership" },
    { key: "giveaway", label: "Giveaway" },
    { key: "educational", label: "Educational" },
  ];

  return (
    <div className="hl-card p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              Top Performing Campaigns
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            Campaign Leaderboard
          </h2>
          <p className="text-xs text-muted-foreground mt-1 font-mono">
            Ranked by impressions · Click contributions to expand
          </p>
        </div>
        <div className="flex gap-3">
          <div className="hl-card px-4 py-2.5 min-w-[110px]">
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              Campaigns
            </div>
            <div className="text-xl font-mono font-bold text-foreground mt-0.5">
              {campaigns.length}
            </div>
          </div>
          <div className="hl-card px-4 py-2.5 min-w-[110px]">
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              Peak Impact
            </div>
            <div className="text-xl font-mono font-bold text-accent mt-0.5">{peakImpact}</div>
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-5 pb-4 border-b border-border">
        {filterOptions.map((opt) => (
          <button
            key={opt.key}
            type="button"
            onClick={() => setFilter(opt.key)}
            className={`px-3 py-1.5 rounded-md border font-mono text-[10px] uppercase tracking-widest transition-all ${
              filter === opt.key
                ? "border-primary bg-primary/15 text-foreground"
                : "border-border bg-muted/20 text-muted-foreground hover:border-primary/40 hover:text-foreground"
            }`}
          >
            {opt.label}
            {filter === opt.key && (
              <span className="ml-1.5 text-primary">
                · {opt.key === "all" ? campaigns.length : campaigns.filter((c) => c.category === opt.key).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
        {filtered.map((campaign, index) => (
          <CampaignCard
            key={`${campaign.id}-${index}`}
            campaign={campaign}
            rank={index + 1}
            featured={index === 0 && filter === "all"}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground font-mono text-sm">
          No campaigns in this category yet.
        </div>
      )}
    </div>
  );
};

export default CampaignLeaderboard;
