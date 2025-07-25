// src/components/ThemeSwitcher.tsx
import React from "react";
import { useTheme } from "../../contexts/ThemeContext";

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  className = "",
}) => {
  const { theme, setTheme, availableThemes } = useTheme();

  return (
    <div className={`relative ${className}`}>
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] px-3 py-2 rounded-[var(--radius)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent"
      >
        {availableThemes.map((themeOption) => (
          <option key={themeOption.name} value={themeOption.name}>
            {themeOption.label}
          </option>
        ))}
      </select>
    </div>
  );
};

// Alternative: Button-based theme switcher
export const ThemeSwitcherButtons: React.FC<ThemeSwitcherProps> = ({
  className = "",
}) => {
  const { theme, setTheme, availableThemes } = useTheme();

  return (
    <div className={`flex gap-2 ${className}`}>
      {availableThemes.map((themeOption) => (
        <button
          key={themeOption.name}
          onClick={() => setTheme(themeOption.name)}
          className={`
            px-3 py-1 text-sm rounded-[var(--radius)] border transition-colors
            ${
              theme === themeOption.name
                ? "bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)]"
                : "bg-[var(--background)] text-[var(--foreground)] border-[var(--border)] hover:bg-[var(--muted)]"
            }
          `}
        >
          {themeOption.label}
        </button>
      ))}
    </div>
  );
};
