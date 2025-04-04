import useQuiz from "../../hooks/useQuiz";
import { formatSecondsToMMSS } from "../../utils/helpers";
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

  const timeTaken = Math.max(0, (maxPossiblePoints ?? 0) - secondsRemaining);

  const [highScoreMinutes, highScoreSeconds] = formatSecondsToMMSS(
    highScore.time,
  ).split(":");
  const [yourMinutes, yourSeconds] = formatSecondsToMMSS(timeTaken).split(":");

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
            value={`${yourMinutes}:${yourSeconds}`}
            description="MM:SS"
          />
        )}

        <SingleInfographicBox
          title="Fastest Time"
          value={`${highScoreMinutes}:${highScoreSeconds}`}
          description="MM:SS"
        />
      </div>
    </div>
  );
}

export default FinishedInfographic;
