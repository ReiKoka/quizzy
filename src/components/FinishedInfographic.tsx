import useQuiz from "../hooks/useQuiz";

function FinishedInfographic() {
  const {
    highScore,
    maxPossiblePoints,
    // index,
    numQuestions,
    points,
    difficulty,
  } = useQuiz();

  const minutes = highScore.time !== null ? Math.floor(highScore.time / 60) : 0;
  const seconds = highScore.time !== null ? highScore.time % 60 : 0;
  return (
    <div className="mx-auto">
      <div className="stats dark:shadow-info-content shadow-custom dark:border-primary/20 w-fit min-w-48 dark:border dark:shadow-none">
        <div className="stat place-items-center">
          <div className="stat-title">Difficulty</div>
          <div className="stat-value text-primary capitalize">{difficulty}</div>
          <div className="stat-desc capitalize">{difficulty} questions</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Questions</div>
          <div className="stat-value text-primary">{numQuestions}</div>
          <div className="stat-desc">Total</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Points</div>
          <div className="stat-value text-primary">
            {points}
          </div>
          <div className="stat-desc">Max Points {maxPossiblePoints}</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Time</div>
          <div className="stat-value text-primary">
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </div>
          <div className="stat-desc">MM:SS</div>
        </div>
      </div>
    </div>
  );
}

export default FinishedInfographic;
