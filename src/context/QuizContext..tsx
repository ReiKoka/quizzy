import { createContext, ReactNode, useEffect, useReducer } from "react";
import { QuizType } from "../utils/types";
import { initialState, QuizActionType, reducer } from "../reducer/reducer";
import { getQuestions } from "../services/questions";

interface QuizContextType extends QuizType {
  dispatch: React.Dispatch<QuizActionType>;
}

const QuizContext = createContext<QuizContextType>({
  ...initialState,
  dispatch: () => {},
});

type QuizProviderTypes = {
  children: ReactNode;
};

export const QuizProvider = ({ children }: QuizProviderTypes) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getQuestions(state.difficulty);
        dispatch({ type: "dataReceived", payload: data });
      } catch (error) {
        console.error("Error caught in useEffect:", error);
        dispatch({ type: "dataFailed" });
      }
    };

    fetchData(); // Call the async function
  }, [state.difficulty]);

  const numQuestions = state.questions.length;
  const maxPossiblePoints = state.questions.reduce(
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
