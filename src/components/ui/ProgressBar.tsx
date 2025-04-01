import useQuiz from "../../hooks/useQuiz";

function ProgressBar() {
  const { index, numQuestions, answer } = useQuiz();
  return (
    <div className="px-2.5 pb-1">
      <progress
        className="progress progress-info h-2.5 w-full md:portrait:my-6"
        value={index + Number(answer !== null)}
        max={numQuestions}
      ></progress>
    </div>
  );
}

export default ProgressBar;
