import { useEffect, useState, useCallback } from "react";

import ReactConfetti from "react-confetti";
import { useWindowSize } from "usehooks-ts";
import useQuiz from "../hooks/useQuiz";
import QuizCompletedHeader from "./finished-quiz/QuizCompletedHeader";
import FinishedInfographic from "./ui/FinishedInfographic";
import SaveScoreForm from "./finished-quiz/SaveScoreForm";

const CONFETTI_DURATION = 5000;

function FinishedQuiz() {
  const { width, height } = useWindowSize();
  const {
    highScoreUpdateInfo,
    dispatch,
    category,
    difficulty,
    maxPossiblePoints,
    secondsRemaining,
  } = useQuiz();

  const [showConfetti, setShowConfetti] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);

  const timeTaken = Math.max(0, (maxPossiblePoints ?? 0) - secondsRemaining);

  useEffect(() => {
    if (!highScoreUpdateInfo.new) {
      setShowConfetti(false);
      return;
    }
    setShowConfetti(true);
    const timerId = setTimeout(() => setShowConfetti(false), CONFETTI_DURATION);
    return () => clearTimeout(timerId);
  }, [highScoreUpdateInfo.new]);

  useEffect(() => {
    setHasSaved(false);
  }, [category, difficulty]);

  const handleRestartQuiz = () => {
    dispatch({ type: "restartQuiz" });
  };

  const handleSaveComplete = useCallback(() => {
    setHasSaved(true);
  }, []);

  return (
    <div className="flex h-full grow flex-col gap-4 overflow-hidden md:gap-4">
      {showConfetti && highScoreUpdateInfo.new && (
        <ReactConfetti
          recycle={false}
          numberOfPieces={400}
          gravity={0.15}
          width={width}
          height={height}
        />
      )}
      <QuizCompletedHeader timeTaken={timeTaken} />
      <FinishedInfographic />
      <div className="mt-auto flex flex-col gap-2 p-2 md:flex-row">
        {!hasSaved ? (
          <SaveScoreForm
            key={`${category}-${difficulty}`}
            onSaveComplete={handleSaveComplete}
            timeTaken={timeTaken}
          />
        ) : null}

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
