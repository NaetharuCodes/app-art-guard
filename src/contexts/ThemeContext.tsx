// src/contexts/ThemeContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | string; // Add your custom theme names

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  availableThemes: { name: string; label: string }[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = "light",
}) => {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);

  // Define your available themes here
  const availableThemes = [
    { name: "bubblegum", label: "Bubblegum" },
    {
      name: "retroarcade",
      label: "Retro Arcade",
    },
    { name: "doom", label: "Doom" },
    { name: "darkdoom", label: "Dark Doom" },

    {
      name: "darkcoffee",
      label: "Dark Coffee",
    },
    {
      name: "darkamber",
      label: "Dark Amber",
    },
  ];

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("art-guard-theme");
    if (savedTheme && availableThemes.some((t) => t.name === savedTheme)) {
      setThemeState(savedTheme);
    }
  }, []);

  // Apply theme to document and save to localStorage
  const setTheme = (newTheme: Theme) => {
    // Remove all theme classes
    availableThemes.forEach((t) => {
      document.documentElement.classList.remove(t.name);
    });

    // Add new theme class (except for light which is default)
    if (newTheme !== "light") {
      document.documentElement.classList.add(newTheme);
    }

    // Save to state and localStorage
    setThemeState(newTheme);
    localStorage.setItem("art-guard-theme", newTheme);
  };

  // Apply initial theme
  useEffect(() => {
    setTheme(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme,
    availableThemes,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
