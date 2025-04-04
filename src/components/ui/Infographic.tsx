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
    <div className="flex flex-col items-center gap-2 p-2 md:flex-row">
      <div className="stats dark:shadow-info-content shadow-custom dark:border-primary/20 flex w-full md:flex-2/3 lg:w-fit dark:border dark:shadow-none">
        <SingleInfographicBox
          title="Difficulty"
          value={difficulty}
          description={`${difficulty} questions`}
          className="hidden md:block capitalize"
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

      <div className="stats dark:shadow-info-content shadow-custom dark:border-primary/20 w-full min-w-48 md:h-full md:flex-1/3 lg:w-fit dark:border dark:shadow-none">
        <SingleInfographicBox
          title="Question"
          value={`${index + 1} /  ${numQuestions}`}
        />

        <SingleInfographicBox
          title="Current Score"
          value={`${points} /  ${maxPossiblePoints}`}
        />
      </div>
    </div>
  );
}

export default Infographic;
