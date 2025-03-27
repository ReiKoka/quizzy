import { QuizActionType, QuizType } from "../utils/types";

export const reducer = (state: QuizType, action: QuizActionType): QuizType => {
  console.log(state, action);

  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        filterQuestions: action.payload,
        status: "ready",
      };

    default:
      console.error(`Unknown action type: ${action.type}`);
      return state;
  }
};
