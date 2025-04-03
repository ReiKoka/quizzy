import { Difficulty, HighScore, QuizQuestion, QuizType } from "../utils/types";

export type QuizActionType =
  | { type: "setAllCategories"; payload: string[] }
  | { type: "setCategory"; payload: string }
  | { type: "setDifficulty"; payload: Difficulty }
  | { type: "setDifficulty"; payload: Difficulty }
  | { type: "setHighscore"; payload: HighScore }
  | { type: "setStatus"; payload: QuizType["status"] }
  | { type: "dataReceived"; payload: QuizQuestion[] }
  | { type: "dataFailed" }
  | { type: "startQuiz" }
  | { type: "tick" }
  | { type: "newAnswer"; payload: string }
  | { type: "nextQuestion" }
  | { type: "puzzleSolved"; payload: number }
  | { type: "restartQuiz" }
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
  isNewHighScore: false,
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

    case "setHighscore": {
      return {
        ...state,
        highScore: action.payload,
      };
    }

    case "setStatus": {
      return {
        ...state,
        status: action.payload,
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
        maxPossiblePoints: state.questions.reduce(
          (prev, cur) => prev + cur.points,
          0,
        ),
      };
    }

    case "tick": {
      const newSecondsRemaining = state.secondsRemaining - 1;
      const newStatus = newSecondsRemaining === 0 ? "finished" : state.status;

      return {
        ...state,
        secondsRemaining: newSecondsRemaining,
        status: newStatus,
      };
    }

    case "restartQuiz":
      console.log(state.allCategories);
      return {
        ...initialState,
        allCategories: state.allCategories,
        status: "initial",
      };

    case "newAnswer": {
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          "correctAnswerId" in question &&
          action.payload === question.correctAnswerId
            ? state.points + question.points
            : state.points,
      };
    }

    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    case "puzzleSolved": {
      const newPoints = state.points + action.payload;
      return { ...state, points: newPoints };
    }

    case "finishedQuiz": {
      let updatedHighScore = state.highScore;
      const currentTimeTaken = state.maxPossiblePoints - state.secondsRemaining;
      let isNewHighScore = false;

      if (state.points > state.highScore.highScorePoints) {
        updatedHighScore = {
          highScorePoints: state.points,
          time: state.secondsRemaining,
        };
        isNewHighScore = true;
      } else if (state.points === state.highScore.highScorePoints) {
        if (currentTimeTaken < state.highScore.time) {
          updatedHighScore = {
            highScorePoints: state.points,
            time: state.secondsRemaining,
          };
          isNewHighScore = true;
        }
      }

      return {
        ...state,
        status: "finished",
        highScore: updatedHighScore,
        isNewHighScore,
      };
    }

    default: {
      console.error(`Unknown action type: ${(action as QuizActionType).type}`);
      return state;
    }
  }
};
