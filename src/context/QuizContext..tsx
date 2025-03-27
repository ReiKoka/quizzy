import { createContext } from "react";
import { QuizActionType, QuizType } from "../utils/types";

interface QuizContextType extends QuizType {
  dispatch: React.Dispatch<QuizActionType>;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

const initialState: QuizType = {
  status: "loading",
  index: 0,
  answer: "",
  points: 0,
  highScore: 0,
  secondsRemaining: 0,
  filterQuestions: [],
  difficulty: "all",
  numQuestions: 0,
  maxPossiblePoints: 0,
};


