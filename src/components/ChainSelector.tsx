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
    <div className="absolute top-4 right-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="bg-card/90 backdrop-blur-sm border-border/50 hover:border-primary/50 hover:bg-card gap-2 min-w-[120px] justify-between"
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
          className="w-44 bg-background/95 backdrop-blur-md border-border/20 shadow-xl rounded-lg z-50" 
          align="end"
          sideOffset={8}
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
              className={`cursor-pointer transition-all duration-200 px-3 py-2.5 mx-1 rounded-md ${
                currentChain === key 
                  ? 'bg-primary/10 text-primary' 
                  : 'hover:bg-muted/50'
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