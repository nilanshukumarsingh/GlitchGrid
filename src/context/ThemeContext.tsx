import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeMode, ThemeConfig } from '../types';
import { THEMES } from '../constants';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  currentThemeConfig: ThemeConfig;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('app-theme');
    return (saved as ThemeMode) || 'cyberpunk';
  });

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem('app-theme', newTheme);
  };

  useEffect(() => {
    const root = document.documentElement;
    const config = THEMES[theme];

    // Set CSS variables for Tailwind
    root.style.setProperty('--color-bg', config.colors.bg);
    root.style.setProperty('--color-primary', config.colors.primary);
    root.style.setProperty('--color-secondary', config.colors.secondary);
    root.style.setProperty('--color-accent', config.colors.accent);
    root.style.setProperty('--color-text', config.colors.text);
    root.style.setProperty('--color-muted', config.colors.muted);
    
    if (config.colors.bgGradient) {
      root.style.setProperty('--bg-gradient', config.colors.bgGradient);
    } else {
      root.style.removeProperty('--bg-gradient');
    }

  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, currentThemeConfig: THEMES[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
