import useQuiz from "../hooks/useQuiz";
import Options from "./Options";

function Question() {
  const { questions, index } = useQuiz();
  const question = questions[index];
  return (
    <div className="flex flex-col gap-12 grow">
      <div className="relative flex items-center justify-center">
        <h4 className="text-2xl font-medium tracking-wide">
          {question.question}
        </h4>
        <div className="badge badge-xl absolute right-0 bg-primary text-primary-content ">{question.points} points</div>
      </div>
      <Options question={question} />
    </div>
  );
}

export default Question;
