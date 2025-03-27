import { use } from "react";
import { QuizContext } from "../context/QuizContext.";

function useQuiz() {
  const context = use(QuizContext);
  if (!context) throw new Error("useQuiz must be used within QuizProvider");

  return context;
}

export default useQuiz;
