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
    <div className="fixed top-4 right-4 z-50">
      <DropdownMenu options={options}>
        <span className="text-sm font-medium">{currentTheme.name}</span>
      </DropdownMenu>
    </div>
  );
};

export default ChainSelector;