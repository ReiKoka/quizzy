import { createContext, ReactNode, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { applyTheme } from "../utils/applyTheme";
import { Theme } from "../utils/types";

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  removeTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderPropTypes = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderPropTypes) => {
  const [theme, setTheme, removeTheme] = useLocalStorage<Theme>(
    "theme",
    "caramellatte",
  );

  useEffect(() => {
    applyTheme(theme as Theme);
  }, [theme]);

  const setThemeAndPersist = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  const contextValue: ThemeContextType = {
    theme,
    setTheme: setThemeAndPersist,
    removeTheme,
  };

  return <ThemeContext value={contextValue}>{children}</ThemeContext>;
};

export { ThemeContext };
