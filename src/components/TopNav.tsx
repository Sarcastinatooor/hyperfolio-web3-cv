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
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="container mx-auto flex min-h-16 items-center justify-center px-4 py-2">
        <ScrollSpy items={navItems} className="min-w-0" />
      </div>
    </header>
  );
};

export default TopNav;
