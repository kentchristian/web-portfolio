
export const getInitialTheme = (): "light" | "dark" => {
  if (typeof window === "undefined") return "light";

  const stored = localStorage.getItem("theme") as "light" | "dark";
  if (stored) return stored;

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};
