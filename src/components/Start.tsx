import QuizLogo from "../assets/images/quiz.svg?react";
import Icon from "supercons";
import DifficultySelect from "./ui/DifficultySelect";
import useQuiz from "../hooks/useQuiz";

function Start() {
  const { status, dispatch } = useQuiz();

  const isStartDisabled = status !== "ready";
  const handleStartQuiz = () => {
    dispatch({ type: "startQuiz" });
  };

  return (
    <>
      <QuizLogo className="text-primary dark:text-secondary mx-auto w-[400px]" />
      <h3 className="mx-auto max-w-96 text-center text-lg font-medium">
        Welcome! Get ready to challenge your brain and have some fun. Let's see
        how much trivia you've got packed in there!
      </h3>

      <div className="flex items-center justify-between mt-auto">
        <DifficultySelect />
        <button
          className="btn btn-primary dark:btn-secondary ml-auto flex w-fit gap-4"
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
