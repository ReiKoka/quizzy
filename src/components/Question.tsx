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
        {"question" in question && (
          <h4 className="mt-12 max-w-4/5 text-center text-sm font-medium tracking-wide md:mt-0 md:text-base lg:text-2xl">
            {question.question}
          </h4>
        )}
        <div className="badge badge-sm bg-primary text-primary-content lg:badge-md absolute top-0 md:right-2 lg:top-1">
          {question.points} points
        </div>
      </div>
      <Options question={question} />
    </div>
  );
}

export default Question;
