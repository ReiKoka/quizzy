import QuizLogo from "../assets/images/quiz.svg?react";
import Icon from "supercons";
import DifficultySelect from "./ui/DifficultySelect";
import useQuiz from "../hooks/useQuiz";
import { getHighscore, getQuestions } from "../services/services";
import { HighScore, Question } from "../utils/types";
import { showToast } from "./ui/ShowToast";

function Start() {
  const { status, dispatch, category, difficulty } = useQuiz();

  const isStartDisabled = status !== "ready";

  const handleStartQuiz = async () => {
    dispatch({ type: "setStatus", payload: "loading" });
    let questions: Question[] = [];
    let highScorePayload: HighScore;
    try {
      questions = await getQuestions(difficulty, category as string);
      highScorePayload = await getHighscore(category as string, difficulty);
    } catch (error) {
      console.error(error);
      dispatch({ type: "dataFailed" });
      showToast("error", "Failed to get questions! Please check your console");
      return;
    }

    dispatch({ type: "dataReceived", payload: questions });
    dispatch({ type: "setHighscore", payload: highScorePayload });
    dispatch({ type: "startQuiz" });
  };

  return (
    <div className="flex h-full flex-col justify-between overflow-y-auto p-2">
      <QuizLogo className="text-primary mx-auto max-w-40 justify-center lg:max-w-80 md:portrait:max-w-96" />
      <h3 className="font-secondary text-base-content mx-auto max-w-96 text-center text-sm font-medium md:text-base lg:text-lg">
        Select quiz difficulty and start the quiz. Try to answer as fast as
        possible to get the highest score 😄🏆
      </h3>

      <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
        <DifficultySelect />
        <button
          className="btn btn-primary ml-auto flex w-full gap-4 sm:w-fit"
          onClick={handleStartQuiz}
          disabled={isStartDisabled}
        >
          <Icon
            size={24}
            glyph="play-circle"
            className="text-primary-content dark:text-secondary-content"
          />
          <span className="text-primary-content dark:text-secondary-content">
            Start Quiz
          </span>
        </button>
      </div>
    </div>
  );
}

export default Start;
