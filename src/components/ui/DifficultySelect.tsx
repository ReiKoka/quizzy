import Icon from "supercons";
import useQuiz from "../../hooks/useQuiz";
import { useRef } from "react";
import { Difficulty } from "../../utils/types";

const difficulties: Difficulty[] = ["easy", "medium", "hard", "all"];

function DifficultySelect() {
  const { difficulty, dispatch } = useQuiz();

  const dropdownButtonRef = useRef<HTMLUListElement>(null);

  const handleSelectDifficulty = (selectedDifficulty: Difficulty) => {
    dispatch({ type: "setDifficulty", payload: selectedDifficulty });
    dropdownButtonRef.current?.blur();
  };
  return (
    <div className="dropdown dropdown-top">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-primary group btn-soft border-primary m-1 flex items-center gap-2"
      >
        <Icon
          glyph="up-caret"
          size={24}
          className="text-primary group-hover:text-primary-content group-hover:dark:text-secondary-content"
        />
        <span className="capitalize">
          {difficulty === "all" ? "Select Difficulty" : difficulty}
        </span>
      </div>
      <ul
        ref={dropdownButtonRef}
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
  );
}

export default DifficultySelect;
