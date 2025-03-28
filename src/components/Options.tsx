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
    <div className="flex h-full grow flex-col items-center gap-4">
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
            className={`btn text-base-content hover:bg-warning hover:text-warning-content min-w-[300px] max-w-[300px] text-balance h-auto min-h-10 transition-all duration-300 ${dynamicClasses} ${hasAnswered && "pointer-events-none"}`}
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
