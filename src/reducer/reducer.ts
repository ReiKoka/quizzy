import { Difficulty, Question, QuizType } from "../utils/types";

export type QuizActionType =
  | { type: "setAllCategories"; payload: string[] }
  | { type: "setStatus"; payload: QuizType["status"] }
  | { type: "setCategory"; payload: string }
  | { type: "setDifficulty"; payload: Difficulty }
  | { type: "dataReceived"; payload: Question[] }
  | { type: "dataFailed" }
  | { type: "startQuiz" }
  | { type: "restartQuiz" }
  | { type: "newAnswer"; payload: string }
  | { type: "nextQuestion" }
  | { type: "finishedQuiz" };

export const initialState: QuizType = {
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: {
    highScorePoints: 0,
    time: 0,
  },
  secondsRemaining: 0,
  questions: [],
  difficulty: "all",
  numQuestions: 0,
  maxPossiblePoints: 0,
  category: null,
  allCategories: [],
};

export const reducer = (state: QuizType, action: QuizActionType): QuizType => {
  switch (action.type) {
    case "setAllCategories": {
      return {
        ...state,
        allCategories: action.payload,
        status: "initial",
      };
    }

    case "setStatus": {
      return {
        ...state,
        status: action.payload,
      };
    }

    case "setCategory": {
      return {
        ...state,
        category: action.payload,
        status: "ready",
      };
    }

    case "setDifficulty": {
      return {
        ...state,
        difficulty: action.payload,
      };
    }

    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };

    case "dataFailed":
      return { ...state, status: "error" };

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

    case "newAnswer": {
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctAnswerId
            ? state.points + question.points
            : state.points,
      };
    }

    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finishedQuiz": {
      let updatedHighScore = state.highScore;

      if (state.points > state.highScore.highScorePoints) {
        updatedHighScore = {
          highScorePoints: state.points,
          time: state.secondsRemaining,
        };
      } else if (state.points === state.highScore.highScorePoints) {
        if (state.secondsRemaining > state.highScore.time) {
          updatedHighScore = {
            highScorePoints: state.points,
            time: state.secondsRemaining,
          };
        }
      }
      return {
        ...state,
        status: "finished",
        highScore: updatedHighScore,
      };
    }

    default: {
      console.error(`Unknown action type: ${(action as QuizActionType).type}`);
      return state;
    }
  }
};
