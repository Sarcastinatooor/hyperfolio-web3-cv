import { useState } from "react";
import { ChevronDown, Wallet } from "lucide-react";
import { useChainTheme, chainThemes, type ChainType } from "@/contexts/ChainThemeContext";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
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
  const [walletOpen, setWalletOpen] = useState(false);

  const handleConnect = () => {
    setWalletOpen(true);
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

        {/* Right: chain selector + connect */}
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="hl-card flex items-center gap-2 px-3 py-1.5 text-xs font-mono uppercase tracking-wider hover:border-primary/60 transition-colors">
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
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-card border-border min-w-[180px]"
            >
              {CHAIN_ORDER.map((chain) => (
                <DropdownMenuItem
                  key={chain}
                  onClick={() => setChain(chain)}
                  className="font-mono text-xs uppercase tracking-wider cursor-pointer focus:bg-primary/10"
                >
                  <span
                    className="inline-block w-2 h-2 rounded-full mr-2"
                    style={{ backgroundColor: CHAIN_DOT_COLOR[chain] }}
                  />
                  {chainThemes[chain].name}
                  {currentChain === chain && (
                    <span className="ml-auto text-primary">●</span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Visit counter chip (placeholder until wallet connect is live) */}
          <div className="hidden md:flex chip chip-accent items-center gap-1.5">
            <span className="live-dot" />
            <span>0 wallets connected</span>
          </div>

          <button
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
