import { useState } from "react";
import useQuiz from "../../hooks/useQuiz";
import { showToast } from "../ui/ShowToast";
import { HighscoreExtended, Result } from "../../utils/types";
import { createOrEditHighscore, createResult } from "../../services/services";
import Icon from "supercons";

type SaveScoreFormProps = {
  onSaveComplete: () => void;
  timeTaken: number;
};

const MAX_USERNAME_LENGTH = 50;

function SaveScoreForm({ onSaveComplete, timeTaken }: SaveScoreFormProps) {
  const {
    category,
    difficulty,
    points,
    maxPossiblePoints,
    highScoreUpdateInfo,
  } = useQuiz();
  const [userName, setUserName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveScore = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedUserName = userName.trim();

    if (!trimmedUserName) {
      showToast("warning", "Please enter your name.");
      return;
    }

    setIsSaving(true);

    try {
      const promises: Promise<Result | HighscoreExtended>[] = [];
      promises.push(
        createResult(
          trimmedUserName,
          category as string,
          difficulty,
          points,
          maxPossiblePoints ?? 0,
          timeTaken,
        ),
      );

      if (highScoreUpdateInfo.new) {
        const currentResult = {
          highScorePoints: points,
          time: timeTaken,
        };
        promises.push(
          createOrEditHighscore(
            trimmedUserName,
            category as string,
            difficulty,
            currentResult,
          ),
        );
      }

      await Promise.all(promises);

      if (highScoreUpdateInfo.new) {
        showToast("success", `New high score saved for ${trimmedUserName}!`);
      } else {
        showToast("success", `Result saved for ${trimmedUserName}!`);
      }

      setUserName("");
      onSaveComplete();
    } catch (error) {
      console.error("Failed to save score:", error);
      showToast("error", "Failed to save score. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSaveScore}
      className="mx-auto flex w-full items-center gap-4"
    >
      <input
        type="text"
        id="username"
        placeholder="Enter your name to save score"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="input input-bordered"
        disabled={isSaving}
        required
        maxLength={MAX_USERNAME_LENGTH}
        aria-label="Enter your name to save score"
      />

      <button
        type="submit"
        className="btn btn-primary btn-square aspect-square w-fit min-w-fit"
        disabled={isSaving || !userName.trim()}
        aria-label="Save score"
      >
        {isSaving ? (
          <Icon
            glyph="view-reload"
            className="animate-duration-1000 animate-ease-linear animate-spin"
            aria-hidden="true"
          />
        ) : (
          <Icon glyph="badge-check-fill" aria-hidden="true" />
        )}
        {isSaving && <span className="sr-only">Saving...</span>}
      </button>
    </form>
  );
}

export default SaveScoreForm;
