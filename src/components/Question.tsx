import useQuiz from "../hooks/useQuiz";
import Options from "./Options";
import ProgressBar from "./ui/ProgressBar";

function Question() {
  const { questions, index } = useQuiz();
  const question = questions[index];
  return (
    <div className="flex grow flex-col gap-4">
      <ProgressBar />
      <div className="relative flex items-center justify-center px-2">
        <h4 className="mt-12 text-center text-sm font-medium tracking-wide md:mt-0 md:text-base ">
          {question.question}
        </h4>
        <div className="badge badge-sm bg-primary text-primary-content absolute top-0 md:right-2">
          {question.points} points
        </div>
      </div>
      <Options question={question} />
    </div>
  );
}

export default Question;
