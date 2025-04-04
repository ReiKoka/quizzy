import useQuiz from "../../hooks/useQuiz";
import SingleInfographicBox from "./SingleInfographicBox";

function FinishedInfographic() {
  const {
    maxPossiblePoints,
    numQuestions,
    secondsRemaining,
    points,
    difficulty,
    highScore,
    highScoreUpdateInfo,
  } = useQuiz();

  const highScoreMinutes =
    secondsRemaining !== null ? Math.floor(highScore.time / 60) : 0;
  const highScoreSeconds = secondsRemaining !== null ? highScore.time % 60 : 0;

  const timeTaken = Math.max(0, (maxPossiblePoints ?? 0) - secondsRemaining);

  const yourMinutes =
    secondsRemaining !== null ? Math.floor(timeTaken / 60) : 0;
  const yourSeconds = secondsRemaining !== null ? timeTaken % 60 : 0;

  return (
    <div className="mx-auto flex w-full">
      <div className="stats dark:shadow-info-content shadow-custom dark:border-primary/20 mx-auto w-full min-w-48 md:w-fit dark:border dark:shadow-none">
        <SingleInfographicBox
          title="Difficulty"
          value={difficulty}
          description={`${difficulty} questions`}
          className="hidden capitalize md:block"
        />

        <SingleInfographicBox
          title="Questions"
          value={numQuestions}
          description="Total"
        />

        {!highScoreUpdateInfo.new && (
          <SingleInfographicBox
            title="Your Score"
            value={points}
            description={`Max Points ${maxPossiblePoints}`}
          />
        )}

        <SingleInfographicBox
          title="Highest Score"
          value={highScore.highScorePoints}
          description={`Max Points ${maxPossiblePoints}`}
        />

        {!highScoreUpdateInfo.new && (
          <SingleInfographicBox
            title="Your Time"
            value={`${yourMinutes < 10 ? `0${yourMinutes}` : yourMinutes}:${
              yourSeconds < 10 ? `0${yourSeconds}` : yourSeconds
            }`}
            description="MM:SS"
          />
        )}

        <SingleInfographicBox
          title="Fastest Time"
          value={`${highScoreMinutes < 10 ? `0${highScoreMinutes}` : highScoreMinutes}:${
            highScoreSeconds < 10 ? `0${highScoreSeconds}` : highScoreSeconds
          }`}
          description="MM:SS"
        />
      </div>
    </div>
  );
}

export default FinishedInfographic;
