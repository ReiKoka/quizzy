import useQuiz from "../../hooks/useQuiz";

function Infographic() {
  const { highScore, maxPossiblePoints, questions, difficulty } = useQuiz();
  return (
    <div className="stats dark:shadow-info-content w-fit min-w-48 shadow-custom self-end dark:shadow-none dark:border dark:border-primary/20">
      <div className="stat place-items-center">
        <div className="stat-title">Difficulty</div>
        <div className="stat-value capitalize text-primary">{difficulty}</div>
        <div className="stat-desc capitalize">{difficulty} questions</div>
      </div>

      <div className="stat place-items-center">
        <div className="stat-title">Questions</div>
        <div className="stat-value text-primary">{questions.length}</div>
        <div className="stat-desc">Total</div>
      </div>

      <div className="stat place-items-center">
        <div className="stat-title">Highscore</div>
        <div className="stat-value text-primary">{highScore}</div>
        <div className="stat-desc">Max Points {maxPossiblePoints}</div>
      </div>
    </div>
  );
}

export default Infographic;
