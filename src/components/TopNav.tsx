import { useState, useEffect, useRef } from "react";
import { ChevronDown, Wallet } from "lucide-react";
import { useChainTheme, chainThemes, type ChainType } from "@/contexts/ChainThemeContext";
import { useToast } from "@/hooks/use-toast";

const CHAIN_ORDER: ChainType[] = ["hyperliquid", "arbitrum", "base", "berachain"];

const CHAIN_TICKER: Record<ChainType, string> = {
  hyperliquid: "HL",
  arbitrum: "ARB",
  base: "BASE",
  berachain: "BERA",
};

const CHAIN_DOT_COLOR: Record<ChainType, string> = {
  hyperliquid: "#50d2c1",
  arbitrum: "#28a0f0",
  base: "#0052ff",
  berachain: "#ffe173",
};

const TopNav = () => {
  const { currentChain, setChain } = useChainTheme();
  const { toast } = useToast();
  const [chainOpen, setChainOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setChainOpen(false);
      }
    };
    if (chainOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [chainOpen]);

  const handleConnect = () => {
    toast({
      title: "Wallet integration shipping soon",
      description:
        "Multi-chain wallet connect via Reown AppKit is rolling out in the next deploy. Hit me up on X if you want a heads-up.",
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between gap-3">
        {/* Left: brand */}
        <a
          href="/"
          className="flex items-center gap-2 font-mono text-sm font-semibold tracking-wider text-foreground hover:text-primary transition-colors"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />
          <span>SHEEL.HL</span>
          <span className="hidden sm:inline text-muted-foreground font-normal">
            / growth & bd
          </span>
        </a>

        {/* Right: chain selector + counter + connect */}
        <div className="flex items-center gap-2">
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setChainOpen((o) => !o)}
              className="hl-card flex items-center gap-2 px-3 py-1.5 text-xs font-mono uppercase tracking-wider hover:border-primary/60 transition-colors"
            >
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ backgroundColor: CHAIN_DOT_COLOR[currentChain] }}
              />
              <span className="hidden sm:inline">
                {chainThemes[currentChain].name}
              </span>
              <span className="sm:hidden">{CHAIN_TICKER[currentChain]}</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {chainOpen && (
              <div className="absolute right-0 top-full mt-2 min-w-[200px] hl-card p-1 shadow-xl z-50">
                {CHAIN_ORDER.map((chain) => {
                  const active = currentChain === chain;
                  return (
                    <button
                      key={chain}
                      type="button"
                      onClick={() => {
                        setChain(chain);
                        setChainOpen(false);
                      }}
                      className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded text-xs font-mono uppercase tracking-wider transition-colors ${
                        active
                          ? "bg-primary/15 text-foreground"
                          : "text-muted-foreground hover:bg-primary/10 hover:text-foreground"
                      }`}
                    >
                      <span
                        className="inline-block w-2 h-2 rounded-full"
                        style={{ backgroundColor: CHAIN_DOT_COLOR[chain] }}
                      />
                      <span>{chainThemes[chain].name}</span>
                      {active && (
                        <span className="ml-auto text-primary">●</span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Visit counter chip (placeholder until wallet connect is live) */}
          <div className="hidden md:flex chip chip-accent items-center gap-1.5">
            <span className="live-dot" />
            <span>0 wallets connected</span>
          </div>

          <button
            type="button"
            onClick={handleConnect}
            className="gm-button flex items-center gap-2 px-4 py-1.5 text-xs font-mono uppercase tracking-wider"
          >
            <Wallet className="w-3.5 h-3.5" />
            <span>Connect Wallet</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
