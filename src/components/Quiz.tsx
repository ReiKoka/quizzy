import useQuiz from "../hooks/useQuiz";
import Loader from "./ui/Loader";
import QuizLogo from "../assets/images/quiz.svg?react";
import Icon from "supercons";
import { Difficulty } from "../utils/types";

const difficulties: Difficulty[] = ["easy", "medium", "hard", "all"];

function Quiz() {
  const { status, difficulty, dispatch } = useQuiz();

  const handleSelectDifficulty = (selectedDifficulty: Difficulty) => {
    dispatch({ type: "setDifficulty", payload: selectedDifficulty });
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <h1 className="font-secondary mt-8 text-center text-4xl font-semibold">
        Welcome to QUIZZY
      </h1>
      {status === "loading" && <Loader />}
      <QuizLogo className="text-primary dark:text-secondary mx-auto w-[400px]" />
      <h3 className="mx-auto max-w-96 text-center text-lg font-medium">
        Welcome! Get ready to challenge your brain and have some fun. Let's see
        how much trivia you've got packed in there!
      </h3>

      <div className="flex items-center justify-between">
        <div className="dropdown dropdown-top">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-primary group dark:btn-secondary btn-soft border-primary dark:border-secondary m-1 flex items-center gap-2"
          >
            <Icon
              glyph="up-caret"
              className="text-primary dark:text-secondary group-hover:text-primary-content group-hover:dark:text-secondary-content"
            />
            <span className="capitalize">
              {difficulty === "all" ? "Select Difficulty" : difficulty}
            </span>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-200 rounded-box z-1 mb-2 w-52 p-2 capitalize shadow-sm"
          >
            {difficulties.map((diff) => (
              <li key={diff}>
                <a onClick={() => handleSelectDifficulty(diff)}>{diff}</a>
              </li>
            ))}
          </ul>
        </div>
        <button className="btn btn-primary dark:btn-secondary ml-auto flex w-fit gap-4">
          <Icon
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

export default Quiz;
