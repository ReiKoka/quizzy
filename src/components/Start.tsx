import QuizLogo from "../assets/images/quiz.svg?react";
import Icon from "supercons";
import DifficultySelect from "./ui/DifficultySelect";
import useQuiz from "../hooks/useQuiz";
import { getQuestions } from "../services/questions";

function Start() {
  const { status, dispatch, category, difficulty } = useQuiz();

  const isStartDisabled = status !== "ready";

  const handleStartQuiz = async () => {
    dispatch({ type: "setStatus", payload: "loading" });
    const questions = await getQuestions(difficulty, category as string);
    dispatch({ type: "dataReceived", payload: questions });
    dispatch({ type: "startQuiz" });
  };

  return (
    <>
      <QuizLogo className="text-primary mx-auto w-[400px]" />
      <h3 className="mx-auto max-w-96 text-center text-lg font-medium">
        Select quiz difficulty and start the quiz. Try to answer as fast as
        possible to get the highest score 😄🏆
      </h3>

      <div className="mt-auto flex items-center justify-between">
        <DifficultySelect />
        <button
          className="btn btn-primary ml-auto flex w-fit gap-4"
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
    </>
  );
}

export default Start;
