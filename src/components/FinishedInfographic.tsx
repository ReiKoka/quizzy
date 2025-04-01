import useQuiz from "../hooks/useQuiz";
import SingleInfographicBox from "./ui/SingleInfographicBox";

function FinishedInfographic() {
  const {
    maxPossiblePoints,
    // index,
    numQuestions,
    secondsRemaining,
    points,
    difficulty,
  } = useQuiz();

  const minutes =
    secondsRemaining !== null ? Math.floor(secondsRemaining / 60) : 0;
  const seconds = secondsRemaining !== null ? secondsRemaining % 60 : 0;
  return (
    <div className="mx-auto w-full flex">
      <div className="stats dark:shadow-info-content shadow-custom dark:border-primary/20 mx-auto w-full min-w-48 md:w-fit dark:border dark:shadow-none">
        <SingleInfographicBox
          title="Difficulty"
          value={difficulty}
          description={`${difficulty} questions`}
          className="hidden md:block"
        />

        <SingleInfographicBox
          title="Questions"
          value={numQuestions}
          description="Total"
        />

        <SingleInfographicBox
          title="Points"
          value={points}
          description={`Max Points ${maxPossiblePoints}`}
        />

        <SingleInfographicBox
          title="Fastest Time"
          value={`${minutes < 10 ? `0${minutes}` : minutes}:${
            seconds < 10 ? `0${seconds}` : seconds
          }`}
          description="MM:SS"
        />
      </div>
    </div>
  );
}

export default FinishedInfographic;
