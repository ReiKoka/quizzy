import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { QuizProvider } from "./context/QuizContext..tsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <QuizProvider>
        <App />
        <Toaster duration={5000} position="top-center" />
      </QuizProvider>
    </ThemeProvider>
  </StrictMode>,
);
