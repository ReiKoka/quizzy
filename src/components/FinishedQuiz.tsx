import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";
import { useWindowSize } from "usehooks-ts";
import useQuiz from "../hooks/useQuiz";
import NewHighscoreImg from "../assets/images/highscore.svg?react";
import FinishQuizImg from "../assets/images/finish-quiz.svg?react";

import FinishedInfographic from "./FinishedInfographic";
import { showToast } from "./ui/ShowToast";
import { createOrEditHighscore } from "../services/services";

const CONFETTI_DURATION = 5000;

function FinishedQuiz() {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(true);
  const {
    isNewHighScore,
    dispatch,
    maxPossiblePoints,
    secondsRemaining,
    category,
    status,
    difficulty,
    points,
  } = useQuiz();

  const [userName, setUserName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);
  const timeTaken = Math.max(0, (maxPossiblePoints ?? 0) - secondsRemaining);

  useEffect(() => {
    if (!isNewHighScore) {
      setShowConfetti(false);
      return;
    }

    setShowConfetti(true);
    const timerId = setTimeout(() => {
      setShowConfetti(false);
    }, CONFETTI_DURATION);

    return () => {
      clearTimeout(timerId);
    };
  }, [isNewHighScore]);

  useEffect(() => {
    setHasSaved(false);
    setUserName("");
  }, [category, difficulty]);

  const handleRestartQuiz = () => {
    dispatch({ type: "restartQuiz" });
  };

  const handleSaveScore = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!userName.trim()) {
      showToast("warning", "Please enter your name.");
      return;
    }
    // Safeguard checks
    if (status !== "finished" || !isNewHighScore || !category || hasSaved) {
      console.error("Conditions not met for saving score or already saved.");
      return;
    }

    setIsSaving(true);

    try {
      const currentResult = {
        highScorePoints: points,
        time: timeTaken,
      };

      await createOrEditHighscore(
        userName.trim(),
        category,
        difficulty,
        currentResult,
      );

      setHasSaved(true);
      showToast("success", `High score saved for ${userName}!`);
      setUserName("");
    } catch (error) {
      console.error("Failed to save high score:", error);
      showToast("error", `Failed to save high score`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex h-full grow flex-col gap-4">
      {showConfetti && isNewHighScore && (
        <ReactConfetti
          recycle={false}
          numberOfPieces={400}
          gravity={0.15}
          width={width}
          height={height}
        />
      )}
      {isNewHighScore ? (
        <>
          <h1 className="font-secondary text-center text-2xl font-semibold">
            New High Score
          </h1>
          <NewHighscoreImg className="text-primary animate-jump-in animate-once animate-duration-700 animate-ease-out animate-delay-300 mx-auto w-[300px] max-w-[400px]" />
        </>
      ) : (
        <FinishQuizImg className="text-primary animate-jump-in animate-once animate-duration-700 animate-ease-out animate-delay-300 mx-auto w-[400px] max-w-[400px]" />
      )}

      <FinishedInfographic />

      <div className="flex mt-auto ">
        {isNewHighScore && !hasSaved && (
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
              className="input input-bordered "
              disabled={isSaving}
              required
              maxLength={50}
            />

            <button
              type="submit"
              className="btn btn-primary min-w-fit w-fit btn-md "
              disabled={isSaving || !userName.trim()}
            >
              {isSaving ? "Saving..." : "Save High Score"}
            </button>
          </form>
        )}
        <button
          className="btn btn-primary mx-auto w-fit"
          onClick={handleRestartQuiz}
        >
          Restart Quiz
        </button>
      </div>
    </div>
  );
}

export default FinishedQuiz;
