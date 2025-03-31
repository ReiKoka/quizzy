import useQuiz from "../hooks/useQuiz";
import { Option, Question } from "../utils/types";

type OptionsProps = {
  question: Question;
};

function Options({ question }: OptionsProps) {
  const { dispatch, answer } = useQuiz();
  const hasAnswered = answer !== null;

  const handleOptionClick = (option: Option) => {
    dispatch({ type: "newAnswer", payload: option.id });
  };

  return (
    <div className="h-full grow grid grid-cols-2 w-1/2 mx-auto items-center gap-4">
      {question.options.map((option) => {
        let dynamicClasses = "";

        if (hasAnswered) {
          if (option.id === question.correctAnswerId) {
            dynamicClasses = "btn-success text-success-content";
          } else if (option.id === answer) {
            dynamicClasses = "btn-error btn-error text-error-content";
          } else {
            dynamicClasses = "btn-dash text-base-content border-error";
          }
        } else {
          if (option.id === answer) {
            dynamicClasses = "btn-active";
          }
        }
        return (
          <button
            key={option.id}
            className={`btn h-full text-base-content hover:bg-warning hover:text-warning-content w-full text-balance min-h-10 transition-all duration-300 ${dynamicClasses} ${hasAnswered && "pointer-events-none"}`}
            onClick={() => handleOptionClick(option)}
          >
            {option.text}
          </button>
        );
      })}
    </div>
  );
}

export default Options;
