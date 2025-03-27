import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { QuizProvider } from "./context/QuizContext..tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <QuizProvider>
        <App />
      </QuizProvider>
    </ThemeProvider>
  </StrictMode>,
);
