import useQuiz from "../../hooks/useQuiz";

function ProgressBar() {
  const { index, numQuestions, points, maxPossiblePoints, answer } = useQuiz();
  return (
    <div>
      <progress
        className="progress w-full"
        value={index + Number(answer !== null)}
        max={numQuestions}
      ></progress>
    </div>
  );
}

export default ProgressBar;
