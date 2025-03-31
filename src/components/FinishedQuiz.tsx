import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";
import { useWindowSize } from "usehooks-ts";
import useQuiz from "../hooks/useQuiz";
import NewHighscoreImg from "../assets/images/highscore.svg?react";
import FinishQuizImg from "../assets/images/finish-quiz.svg?react";

import FinishedInfographic from "./FinishedInfographic";

const CONFETTI_DURATION = 5000;

function FinishedQuiz() {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(true);
  const { isNewHighScore } = useQuiz();

  useEffect(() => {
    const timerId = setTimeout(() => {
      setShowConfetti(false);
    }, CONFETTI_DURATION);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  console.log(showConfetti, isNewHighScore);

  return (
    <div className="flex h-full grow flex-col gap-8">
      {showConfetti && isNewHighScore && (
        <ReactConfetti gravity={0.5} width={width} height={height} />
      )}
      {isNewHighScore ? (
        <>
          <h1 className="font-secondary mb-4 text-center text-3xl font-semibold">
            New High Score
          </h1>
          <NewHighscoreImg className="text-primary animate-jump-in animate-once animate-duration-700 animate-ease-out animate-delay-300 mx-auto w-[500px] max-w-[600px]" />
        </>
      ) : (
        <FinishQuizImg className="text-primary animate-jump-in animate-once animate-duration-700 animate-ease-out animate-delay-300 mx-auto w-[500px] max-w-[600px]" />
      )}

      <FinishedInfographic />
    </div>
  );
}

export default FinishedQuiz;
