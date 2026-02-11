'use client';

import { FC } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useTheme } from "@/components/providers/ThemeProvider";
import { DarkModeToggleProps } from "./DarkModeToggle.types";

export const DarkModeToggle: FC<DarkModeToggleProps> = ({ className = '' }) => {
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  const toggleTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  }

  return (
    <button
      onClick={toggleTheme}
      className={`relative h-7 w-14 rounded-full p-1 transition-colors duration-300 border focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${className}`}
      style={{
        backgroundColor: 'var(--card-background)',
        borderColor: 'var(--border)',
      }}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div
        className={`h-5 w-5 rounded-full shadow-md transition-transform duration-300 ${
          isDarkMode ? 'translate-x-7' : 'translate-x-0'
        }`}
        style={{
          backgroundColor: 'var(--foreground)'
        }}
      />
      <SunIcon className="absolute left-1.5 top-1.5 h-4 w-4 text-yellow-500" />
      <MoonIcon className="absolute right-1.5 top-1.5 h-4 w-4 text-blue-400" />
    </button>
  );
};

export default DarkModeToggle; 