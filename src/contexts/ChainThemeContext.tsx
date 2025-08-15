import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ChainType = 'hyperliquid' | 'arbitrum' | 'base' | 'berachain';

interface ChainTheme {
  name: string;
  primary: string;
  accent: string;
  neonCyan: string;
  neonGreen: string;
  neonRed: string;
  neonPurple: string;
  ctaOrange: string;
  logoPath: string; // To be updated with actual logos
}

export const chainThemes: Record<ChainType, ChainTheme> = {
  hyperliquid: {
    name: 'HyperLiquid',
    primary: '260 100% 60%',
    accent: '210 100% 70%',
    neonCyan: '210 100% 70%',
    neonGreen: '260 100% 60%',
    neonRed: '0 84% 60%',
    neonPurple: '260 100% 60%',
    ctaOrange: '25 100% 65%',
    logoPath: '/placeholder-hyperliquid-logo.png' // TODO: Update with actual logo
  },
  arbitrum: {
    name: 'Arbitrum',
    primary: '221 83% 53%', // Arbitrum blue
    accent: '221 100% 70%',
    neonCyan: '221 100% 70%',
    neonGreen: '221 83% 53%',
    neonRed: '0 84% 60%',
    neonPurple: '221 83% 53%',
    ctaOrange: '25 100% 65%',
    logoPath: '/placeholder-arbitrum-logo.png' // TODO: Update with actual logo
  },
  base: {
    name: 'Base',
    primary: '221 83% 53%', // Base blue
    accent: '221 100% 80%',
    neonCyan: '221 100% 80%',
    neonGreen: '221 83% 53%',
    neonRed: '0 84% 60%',
    neonPurple: '221 83% 53%',
    ctaOrange: '25 100% 65%',
    logoPath: '/placeholder-base-logo.png' // TODO: Update with actual logo
  },
  berachain: {
    name: 'Berachain',
    primary: '25 100% 65%', // Orange/brown theme
    accent: '35 100% 70%',
    neonCyan: '35 100% 70%',
    neonGreen: '25 100% 65%',
    neonRed: '0 84% 60%',
    neonPurple: '25 100% 65%',
    ctaOrange: '25 100% 65%',
    logoPath: '/placeholder-berachain-logo.png' // TODO: Update with actual logo
  }
};

interface ChainThemeContextType {
  currentChain: ChainType;
  setChain: (chain: ChainType) => void;
  currentTheme: ChainTheme;
}

const ChainThemeContext = createContext<ChainThemeContextType | undefined>(undefined);

export const useChainTheme = () => {
  const context = useContext(ChainThemeContext);
  if (!context) {
    throw new Error('useChainTheme must be used within a ChainThemeProvider');
  }
  return context;
};

interface ChainThemeProviderProps {
  children: ReactNode;
}

export const ChainThemeProvider = ({ children }: ChainThemeProviderProps) => {
  const [currentChain, setCurrentChain] = useState<ChainType>(() => {
    const stored = localStorage.getItem('selectedChain');
    return (stored as ChainType) || 'hyperliquid';
  });

  const setChain = (chain: ChainType) => {
    setCurrentChain(chain);
    localStorage.setItem('selectedChain', chain);
    applyTheme(chainThemes[chain]);
  };

  const applyTheme = (theme: ChainTheme) => {
    const root = document.documentElement;
    
    // Apply theme colors with smooth transitions
    root.style.setProperty('--primary', theme.primary);
    root.style.setProperty('--accent', theme.accent);
    root.style.setProperty('--neon-cyan', theme.neonCyan);
    root.style.setProperty('--neon-green', theme.neonGreen);
    root.style.setProperty('--neon-red', theme.neonRed);
    root.style.setProperty('--neon-purple', theme.neonPurple);
    root.style.setProperty('--cta-orange', theme.ctaOrange);
    root.style.setProperty('--ring', theme.primary);
    
    // Update gradients
    root.style.setProperty('--gradient-primary', `linear-gradient(135deg, hsl(${theme.primary} / 0.1), hsl(${theme.primary} / 0.05))`);
    root.style.setProperty('--gradient-glow', `linear-gradient(135deg, hsl(${theme.primary} / 0.05), hsl(220 12% 8%))`);
    
    // Update shadows
    root.style.setProperty('--shadow-neon', `0 0 20px hsl(${theme.primary} / 0.2)`);
    root.style.setProperty('--shadow-glow', `0 0 15px hsl(${theme.primary} / 0.15)`);
  };

  useEffect(() => {
    applyTheme(chainThemes[currentChain]);
  }, [currentChain]);

  const currentTheme = chainThemes[currentChain];

  return (
    <ChainThemeContext.Provider value={{ currentChain, setChain, currentTheme }}>
      {children}
    </ChainThemeContext.Provider>
  );
};