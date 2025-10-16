import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { useChainTheme, chainThemes, ChainType } from '@/contexts/ChainThemeContext';

const ChainSelector = () => {
  const { currentChain, setChain, currentTheme } = useChainTheme();

  const options = (['hyperliquid', 'base', 'berachain', 'arbitrum'] as ChainType[]).map((key) => {
    const theme = chainThemes[key];
    return {
      label: theme.name,
      onClick: () => setChain(key),
    };
  });

  return (
    <div className="fixed top-8 right-12 z-50">
      <DropdownMenu options={options} className="px-6 py-3 border border-primary/30 hover:border-primary/50">
        <span className="text-base font-medium">{currentTheme.name}</span>
      </DropdownMenu>
    </div>
  );
};

export default ChainSelector;