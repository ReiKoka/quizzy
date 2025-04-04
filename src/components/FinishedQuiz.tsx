import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";
import { useWindowSize } from "usehooks-ts";
import useQuiz from "../hooks/useQuiz";
import NewHighscoreImg from "../assets/images/highscore.svg?react";
import FinishQuizImg from "../assets/images/finish-quiz.svg?react";

import FinishedInfographic from "./FinishedInfographic";
import { showToast } from "./ui/ShowToast";
import { createOrEditHighscore, createResult } from "../services/services";
import Icon from "supercons";
import { HighscoreExtended, Result } from "../utils/types";

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
    difficulty,
    points,
    highScore,
  } = useQuiz();

  const [userName, setUserName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);
  const timeTaken = Math.max(0, (maxPossiblePoints ?? 0) - secondsRemaining);

  console.log(points, highScore.highScorePoints, timeTaken, highScore.time);

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

  const handleSaveScore = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const promises: Promise<Result | HighscoreExtended>[] = [];

    const trimmedUserName = userName.trim();
    if (!trimmedUserName) {
      showToast("warning", "Please enter your name.");
      return;
    }
    setIsSaving(true);

    try {
      promises.push(
        createResult(
          userName.trim(),
          category as string,
          difficulty,
          points,
          maxPossiblePoints ?? 0,
          secondsRemaining ?? 0,
        ),
      );

      if (isNewHighScore) {
        const currentResult = {
          highScorePoints: points,
          time: timeTaken,
        };

        promises.push(
          createOrEditHighscore(
            userName.trim(),
            category as string,
            difficulty,
            currentResult,
          ),
        );

        showToast("success", `High score saved for ${userName}!`);
      }

      await Promise.all(promises);

      setHasSaved(true);
      setUserName("");
      showToast("success", `Result saved for ${userName}!`);
    } catch (error) {
      console.error("Failed to save score", error);
      showToast("error", `Failed to save score`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex h-full grow flex-col gap-4 overflow-hidden md:gap-4">
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
          <h1 className="font-secondary text-center text-lg font-semibold md:text-xl">
            New High Score
          </h1>
          {isNewHighScore && (
            <p className="font-secondary text-secondary text-center text-base font-medium">
              You beat the previous record by{" "}
              {points === highScore.highScorePoints
                ? Math.abs(timeTaken - highScore.time)
                : points - highScore.highScorePoints}
              {points === highScore.highScorePoints ? " seconds" : " points"}!
            </p>
          )}
          <NewHighscoreImg className="text-primary animate-jump-in animate-once animate-duration-700 animate-ease-out animate-delay-300 mx-auto w-[250px] max-w-[600px] lg:w-[350px] 2xl:w-[500px] md:portrait:w-[400px]" />
        </>
      ) : (
        <FinishQuizImg className="text-primary animate-jump-in animate-once animate-duration-700 animate-ease-out animate-delay-300 mx-auto w-[250px] max-w-[400px] lg:w-[350px] 2xl:w-[300px] md:portrait:w-[400px]" />
      )}

      <FinishedInfographic />

      <div className="mt-auto flex flex-col gap-2 p-2 md:flex-row">
        {!hasSaved && (
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
              maxLength={50}
            />

            <button
              type="submit"
              className="btn btn-primary btn-square aspect-square w-fit min-w-fit"
              disabled={isSaving || !userName.trim()}
            >
              {isSaving ? (
                <Icon
                  glyph="view-reload"
                  className="animate-duration-1000 animate-ease-linear animate-spin"
                />
              ) : (
                <Icon glyph="badge-check-fill" />
              )}
            </button>
          </form>
        )}
        <button
          className="btn btn-primary ml-auto w-full md:w-fit"
          onClick={handleRestartQuiz}
          type="button"
        >
          Restart Quiz
        </button>
      </div>
    </div>
  );
}

export default FinishedQuiz;
