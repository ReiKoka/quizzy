import { createContext, ReactNode, useEffect, useReducer } from "react";
import { QuizType } from "../utils/types";
import { initialState, QuizActionType, reducer } from "../reducer/reducer";
import { getCategories } from "../services/services";
import { showToast } from "../components/ui/ShowToast";

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

  const numQuestions = state.questions.length;
  const maxPossiblePoints = state.questions.reduce(
    (prev, cur) => prev + cur.points,
    0,
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategories();
        dispatch({ type: "setAllCategories", payload: categories });
      } catch (error) {
        console.error(error);
        showToast(
          "error",
          "Failed to get categories! Please check your console",
        );
      }
    };
    fetchCategories();
  }, [dispatch]);

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
