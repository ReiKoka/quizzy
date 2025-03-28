import useQuiz from "../../hooks/useQuiz";

function ProgressBar() {
  const { index, numQuestions, answer } = useQuiz();
  return (
    <div>
      <progress
        className="progress progress-primary w-full"
        value={index + Number(answer !== null)}
        max={numQuestions}
      ></progress>
    </div>
  );
}

export default ProgressBar;
