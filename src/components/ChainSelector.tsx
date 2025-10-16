import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { useChainTheme, chainThemes, ChainType } from '@/contexts/ChainThemeContext';

const ChainSelector = () => {
  const { currentChain, setChain, currentTheme } = useChainTheme();

  const getChainColor = (chain: ChainType) => {
    switch (chain) {
      case 'hyperliquid': return '#072623';
      case 'base': return '#0000ff';
      case 'berachain': return '#ffe173';
      case 'arbitrum': return '#152c4f';
      default: return `hsl(${currentTheme.primary})`;
    }
  };

  const options = (['hyperliquid', 'base', 'berachain', 'arbitrum'] as ChainType[]).map((key) => {
    const theme = chainThemes[key];
    return {
      label: theme.name,
      onClick: () => setChain(key),
      Icon: (
        <div 
          className="w-4 h-4 rounded-full flex-shrink-0"
          style={{ backgroundColor: getChainColor(key) }}
        />
      ),
    };
  });

  return (
    <div className="fixed top-4 right-4 z-50">
      <DropdownMenu options={options}>
        <div className="flex items-center gap-2">
          <div 
            className="w-4 h-4 rounded-full flex-shrink-0"
            style={{ backgroundColor: getChainColor(currentChain) }}
          />
          <span className="text-sm font-medium">{currentTheme.name}</span>
        </div>
      </DropdownMenu>
    </div>
  );
};

export default ChainSelector;