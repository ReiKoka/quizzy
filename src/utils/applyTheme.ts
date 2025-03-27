import { Theme } from "./types";

export function applyTheme(theme: Theme) {
  const root = window.document.documentElement;

  const effectiveThemeValue = theme === "garden" ? "garden" : "sunset";

  root.setAttribute("data-theme", effectiveThemeValue);
}
