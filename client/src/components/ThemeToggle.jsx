import React from "react";
import { useTheme } from "./theme-provider";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const themes = ["dark", "light"];

  const next = () => {
    const idx = themes.indexOf(theme);
    const nextTheme = themes[(idx + 1 + themes.length) % themes.length];
    setTheme(nextTheme);
  };

  return (
    <button
      onClick={next}
      aria-label="Toggle theme"
      className="px-3 py-1 rounded-md border border-white/10 bg-white/5 text-sm hover:bg-white/10 transition"
    >
      {themes.includes(theme) ? theme.charAt(0).toUpperCase() + theme.slice(1) : "Dark"}
    </button>
  );
};

export default ThemeToggle;
