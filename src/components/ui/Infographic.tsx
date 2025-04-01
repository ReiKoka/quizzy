import useQuiz from "../../hooks/useQuiz";
import SingleInfographicBox from "./SingleInfographicBox";

function Infographic() {
  const {
    highScore,
    maxPossiblePoints,
    index,
    numQuestions,
    points,
    difficulty,
  } = useQuiz();

  const minutes = highScore.time !== null ? Math.floor(highScore.time / 60) : 0;
  const seconds = highScore.time !== null ? highScore.time % 60 : 0;

  return (
    <div className="flex items-center gap-2">
      <div className="stats dark:shadow-info-content shadow-custom dark:border-primary/20 flex w-full flex-2/3 dark:border dark:shadow-none">
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
          title="High Score"
          value={highScore.highScorePoints}
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

      <div className="stats dark:shadow-info-content shadow-custom dark:border-primary/20 w-full flex-1/3 min-w-48 md:h-full dark:border dark:shadow-none">
        <div className="stat place-items-center px-4 py-2">
          <div className="stat-title text-xs">Question</div>
          <div className="stat-value text-primary text-sm capitalize">
            {index + 1} / {numQuestions}
          </div>
        </div>

        <div className="stat place-items-center px-4 py-2">
          <div className="stat-title text-xs">Points</div>
          <div className="stat-value text-primary text-sm">
            {points} / {maxPossiblePoints}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Infographic;
