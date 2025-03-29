import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";
import { useWindowSize } from "usehooks-ts";
import useQuiz from "../hooks/useQuiz";

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
  return (
    <div>
      {showConfetti && isNewHighScore && (
        <ReactConfetti gravity={0.5} width={width} height={height} />
      )}
      
    </div>
  );
}

export default FinishedQuiz;
