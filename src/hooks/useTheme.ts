import { use } from "react";

import { ThemeContext } from "../context/ThemeContext";

function useTheme() {
  const context = use(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");

  return context;
}

export default useTheme;
