import useQuiz from "../../hooks/useQuiz";

function ProgressBar() {
  const { index, numQuestions, answer } = useQuiz();
  return (
    <div className="px-2">
      <progress
        className="progress progress-primary w-full md:portrait:my-6 "
        value={index + Number(answer !== null)}
        max={numQuestions}
      ></progress>
    </div>
  );
}

export default ProgressBar;
