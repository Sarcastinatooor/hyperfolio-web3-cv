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
    <div className="fixed top-4 right-4 z-[100]">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="bg-background/95 backdrop-blur-md border-border shadow-lg hover:border-primary hover:bg-background gap-2 min-w-[140px] justify-between transition-all"
          >
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full flex-shrink-0"
                style={{ 
                  backgroundColor: (() => {
                    switch (currentChain) {
                      case 'hyperliquid': return '#072623';
                      case 'base': return '#0000ff';
                      case 'berachain': return '#ffe173';
                      case 'arbitrum': return '#152c4f';
                      default: return `hsl(${currentTheme.primary})`;
                    }
                  })()
                }}
              />
              <span className="text-sm font-medium">{currentTheme.name}</span>
            </div>
            <ChevronDown className="w-3 h-3 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent 
          className="w-48 bg-background/98 backdrop-blur-lg border-border shadow-2xl rounded-lg z-[110]" 
          align="end"
          sideOffset={12}
        >
          {(['hyperliquid', 'base', 'berachain', 'arbitrum'] as ChainType[]).map((key) => {
            const theme = chainThemes[key];
            const getChainColor = () => {
              switch (key) {
                case 'hyperliquid': return '#072623';
                case 'base': return '#0000ff';
                case 'berachain': return '#ffe173';
                case 'arbitrum': return '#152c4f';
                default: return theme.primary;
              }
            };
            
            return (
            <DropdownMenuItem
              key={key}
              onClick={() => handleChainSelect(key as ChainType)}
              className={`cursor-pointer transition-all duration-200 px-4 py-3 mx-1 my-0.5 rounded-md ${
                currentChain === key 
                  ? 'bg-primary/15 text-primary font-semibold' 
                  : 'hover:bg-muted/60 hover:text-foreground'
              }`}
            >
              <div className="flex items-center gap-3 w-full">
                <div 
                  className="w-4 h-4 rounded-full flex-shrink-0"
                  style={{ backgroundColor: getChainColor() }}
                />
                <span className="font-medium text-sm">{theme.name}</span>
                {currentChain === key && (
                  <div className="ml-auto">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  </div>
                )}
              </div>
            </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ChainSelector;