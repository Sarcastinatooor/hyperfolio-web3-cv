import { Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollSpy } from "@/components/ui/scroll-spy";

const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Career" },
  { id: "work", label: "Work" },
  { id: "writing", label: "Writing" },
  { id: "network", label: "Network" },
  { id: "analytics", label: "X data" },
  { id: "reputation", label: "Signals" },
  { id: "tools", label: "Tools" },
];

const TopNav = () => {
  const { toast } = useToast();

  const handleConnect = () => {
    toast({
      title: "Wallet integration shipping soon",
      description:
        "Multi-chain wallet connect via Reown AppKit is rolling out in the next deploy. Hit me up on X if you want a heads-up.",
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="container mx-auto flex min-h-16 items-center gap-3 px-4 py-2">
        <ScrollSpy items={navItems} className="min-w-0 flex-1 md:flex-none" />
        {/* Right: counter + connect */}
        <div className="ml-auto flex shrink-0 items-center gap-2">
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
