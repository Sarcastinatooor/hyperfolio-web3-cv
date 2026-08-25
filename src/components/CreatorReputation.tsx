import { ArrowUpRight, Radar, ShieldCheck, Sparkles, Users } from "lucide-react";

const signalCards = [
  {
    platform: "Kaito",
    eyebrow: "Crypto voice intelligence",
    primaryLabel: "12M standing",
    primaryValue: "Top 0.15%",
    description:
      "An emerging crypto voice measured on mindshare, smart followers, and reputation-weighted engagement.",
    href: "https://kaito.ai/mindshare-arena/kol/468373926?vertical=crypto",
    icon: Radar,
    metrics: [
      { label: "3M mindshare", value: "#1,928" },
      { label: "Smart followers", value: "36" },
      { label: "Tracked impressions", value: "83.8K" },
    ],
  },
  {
    platform: "Xeet",
    eyebrow: "Creator reputation profile",
    primaryLabel: "Ethos score",
    primaryValue: "1,201",
    description:
      "A source-linked creator profile classifying the account as Signal across DeFi, education, and curation.",
    href: "https://www.xeet.ai/user/Not_A_De_Gen",
    icon: ShieldCheck,
    metrics: [
      { label: "Profile type", value: "Signal" },
      { label: "Strength", value: "Educator" },
      { label: "Network", value: "DeFi" },
    ],
  },
];

const CreatorReputation = () => (
  <section className="hl-card overflow-hidden" aria-labelledby="creator-reputation-title">
    <div className="flex flex-col gap-4 border-b border-border p-5 md:flex-row md:items-end md:justify-between">
      <div>
        <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          Reputation layer
        </div>
        <h3 id="creator-reputation-title" className="text-xl font-semibold text-foreground md:text-2xl">
          How the crypto social graph reads me
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Independent creator signals from Kaito and Xeet, embedded as accessible data cards instead of a static screenshot.
        </p>
      </div>
      <div className="inline-flex items-center gap-2 self-start rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-primary md:self-auto">
        <span className="live-dot" />
        Snapshot · Aug 06, 2026
      </div>
    </div>

    <div className="grid gap-px bg-border md:grid-cols-2">
      {signalCards.map((signal) => {
        const Icon = signal.icon;

        return (
          <a
            key={signal.platform}
            href={signal.href}
            target="_blank"
            rel="noreferrer"
            className="group relative bg-card p-5 transition-colors hover:bg-secondary/80 md:p-6"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg border border-primary/35 bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-foreground">{signal.platform}</div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                    {signal.eyebrow}
                  </div>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
            </div>

            <div className="mb-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {signal.primaryLabel}
              </div>
              <div className="mt-1 font-mono text-4xl font-bold tracking-tight text-foreground">
                {signal.primaryValue}
              </div>
              <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                {signal.description}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {signal.metrics.map((metric) => (
                <div key={metric.label} className="rounded-md border border-border bg-background/50 p-3">
                  <div className="truncate font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                    {metric.label}
                  </div>
                  <div className="mt-1 truncate text-sm font-semibold text-foreground">{metric.value}</div>
                </div>
              ))}
            </div>
          </a>
        );
      })}
    </div>

    <div className="flex items-center gap-2 border-t border-border bg-secondary/35 px-5 py-3 text-xs text-muted-foreground">
      <Users className="h-3.5 w-3.5 text-primary" />
      Values are source-attributed snapshots; open either card for its current platform profile.
    </div>
  </section>
);

export default CreatorReputation;
