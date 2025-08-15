import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useChainTheme, chainThemes, ChainType } from '@/contexts/ChainThemeContext';

const ChainSelector = () => {
  const { currentChain, setChain, currentTheme } = useChainTheme();

  const handleChainSelect = (chain: ChainType) => {
    setChain(chain);
  };

  return (
    <div className="fixed top-4 left-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="bg-card/90 backdrop-blur-sm border-border/50 hover:border-primary/50 hover:bg-card gap-2 min-w-[140px] justify-between"
          >
            <div className="flex items-center gap-2">
              <img 
                src={currentTheme.logoPath} 
                alt={`${currentTheme.name} logo`}
                className="w-4 h-4 object-contain"
                onError={(e) => {
                  // Fallback to a simple colored circle if logo fails to load
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'block';
                }}
              />
              <div 
                className="w-4 h-4 rounded-full hidden"
                style={{ backgroundColor: `hsl(${currentTheme.primary})` }}
              />
              <span className="text-sm font-medium">{currentTheme.name}</span>
            </div>
            <ChevronDown className="w-3 h-3 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent 
          className="w-48 bg-popover/95 backdrop-blur-md border-border/50" 
          align="start"
        >
          {Object.entries(chainThemes).map(([key, theme]) => (
            <DropdownMenuItem
              key={key}
              onClick={() => handleChainSelect(key as ChainType)}
              className={`cursor-pointer transition-all duration-200 ${
                currentChain === key 
                  ? 'bg-primary/10 text-primary' 
                  : 'hover:bg-accent/10'
              }`}
            >
              <div className="flex items-center gap-3 w-full">
                <img 
                  src={theme.logoPath} 
                  alt={`${theme.name} logo`}
                  className="w-5 h-5 object-contain"
                  onError={(e) => {
                    // Fallback to a simple colored circle if logo fails to load
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'block';
                  }}
                />
                <div 
                  className="w-5 h-5 rounded-full hidden"
                  style={{ backgroundColor: `hsl(${theme.primary})` }}
                />
                <div className="flex flex-col">
                  <span className="font-medium">{theme.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {key === 'hyperliquid' && 'Perps & DEX'}
                    {key === 'arbitrum' && 'L2 Scaling'}
                    {key === 'base' && 'Coinbase L2'}
                    {key === 'berachain' && 'DeFi & Gaming'}
                  </span>
                </div>
                {currentChain === key && (
                  <div className="ml-auto">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  </div>
                )}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ChainSelector;