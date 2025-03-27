import { Difficulty, Question, QuizType } from "../utils/types";

export type QuizActionType =
  | {
      type: "dataReceived";
      payload: Question[];
    }
  | {
      type: "dataFailed";
    }
  | { type: "setDifficulty"; payload: Difficulty }
  | { type: "startQuiz" }
  | { type: "restartQuiz" };

export const initialState: QuizType = {
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: 0,
  questions: [],
  difficulty: "all",
  numQuestions: 0,
  maxPossiblePoints: 0,
};

export const reducer = (state: QuizType, action: QuizActionType): QuizType => {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return { ...state, status: "error" };
    case "setDifficulty": {
      return {
        ...state,
        difficulty: action.payload,
      };
    }
    case "startQuiz": {
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions
          .map((question) => question.points)
          .reduce((acc, curr) => acc + curr, 0),
      };
    }
    case "restartQuiz":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highScore: state.highScore,
        difficulty: "all",
      };
    default: {
      console.error(`Unknown action type: ${(action as QuizActionType).type}`);
      return state;
    }
  }
};
