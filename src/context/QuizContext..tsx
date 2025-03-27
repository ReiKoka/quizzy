import { createContext, ReactNode, useReducer } from "react";
import { QuizActionType, QuizType } from "../utils/types";
import { reducer } from "../reducer/reducer";

interface QuizContextType extends QuizType {
  dispatch: React.Dispatch<QuizActionType>;
}

const initialState: QuizType = {
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: 0,
  filterQuestions: [],
  difficulty: "all",
  numQuestions: 0,
  maxPossiblePoints: 0,
};

const QuizContext = createContext<QuizContextType>({
  ...initialState,
  dispatch: () => {},
});

type QuizProviderTypes = {
  children: ReactNode;
};

export const QuizProvider = ({ children }: QuizProviderTypes) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const numQuestions = state.filterQuestions.length;
  const maxPossiblePoints = state.filterQuestions.reduce(
    (prev, cur) => prev + cur.points,
    0,
  );

  const contextValue: QuizContextType = {
    ...state,
    numQuestions,
    maxPossiblePoints,
    dispatch,
  };

  return (
    <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>
  );
};

export { QuizContext };
