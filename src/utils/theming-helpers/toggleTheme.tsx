import { applyTheme } from "./applyTheme";

export const toggleTheme = () => {
  const html = document.documentElement;
  const isDark = html.classList.contains("dark");

  const theme = isDark ? "light" : "dark";

  applyTheme(theme);

  const currentTheme = !isDark ? "light" : "dark";
  return currentTheme;
};
