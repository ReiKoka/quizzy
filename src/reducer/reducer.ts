import { Difficulty, Question, QuizType } from "../utils/types";

export type QuizActionType =
  | {
      type: "dataReceived";
      payload: Question[];
    }
  | {
      type: "dataFailed";
    }
  | { type: "setDifficulty"; payload: Difficulty };

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
  console.log(state);

  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "setDifficulty": {
      return {
        ...state,
        difficulty: action.payload,
      };
    }

    default:
      console.error(`Unknown action type: ${action.type}`);
      return state;
  }
};
