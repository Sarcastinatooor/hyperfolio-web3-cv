import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ChainType = 'hyperliquid' | 'base' | 'berachain' | 'arbitrum';

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
    name: 'Hyperliquid',
    primary: '173 96% 8%', // #072623 converted to HSL
    accent: '173 96% 15%',
    neonCyan: '173 96% 25%',
    neonGreen: '173 96% 8%',
    neonRed: '0 84% 60%',
    neonPurple: '173 96% 8%',
    ctaOrange: '25 100% 65%',
    logoPath: '/placeholder-hyperliquid-logo.png'
  },
  base: {
    name: 'Base',
    primary: '240 100% 50%', // #0000ff converted to HSL
    accent: '240 100% 70%',
    neonCyan: '240 100% 80%',
    neonGreen: '240 100% 50%',
    neonRed: '0 84% 60%',
    neonPurple: '240 100% 50%',
    ctaOrange: '25 100% 65%',
    logoPath: '/placeholder-base-logo.png'
  },
  berachain: {
    name: 'Berachain',
    primary: '50 100% 73%', // #ffe173 converted to HSL
    accent: '50 100% 80%',
    neonCyan: '50 100% 85%',
    neonGreen: '50 100% 73%',
    neonRed: '0 84% 60%',
    neonPurple: '50 100% 73%',
    ctaOrange: '25 100% 65%',
    logoPath: '/placeholder-berachain-logo.png'
  },
  arbitrum: {
    name: 'Arbitrum',
    primary: '213 59% 19%', // #152c4f converted to HSL
    accent: '213 59% 30%',
    neonCyan: '213 59% 40%',
    neonGreen: '213 59% 19%',
    neonRed: '0 84% 60%',
    neonPurple: '213 59% 19%',
    ctaOrange: '25 100% 65%',
    logoPath: '/placeholder-arbitrum-logo.png'
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