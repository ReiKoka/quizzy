import useQuiz from "../hooks/useQuiz";
import { Option, MultipleChoiceQuestion } from "../utils/types";

type OptionsProps = {
  question: MultipleChoiceQuestion;
};

function Options({ question }: OptionsProps) {
  const { dispatch, answer } = useQuiz();
  const hasAnswered = answer !== null;

  const handleOptionClick = (option: Option) => {
    dispatch({ type: "newAnswer", payload: option.id });
  };

  return (
    <div className="mx-auto my-auto grid w-full grid-cols-2 2xl:gap-3 place-items-center gap-2 md:my-0 md:flex md:grow md:flex-col md:justify-center 2xl:flex 2xl:flex-col md:portrait:gap-4">
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
            className={`btn text-base-content 2xl:min-h-16 xl:text-sm hover:bg-warning hover:text-warning-content h-fit min-h-10 w-full max-w-96 text-xs text-balance transition-all duration-300 md:portrait:min-h-14 ${dynamicClasses} ${hasAnswered && "pointer-events-none"}`}
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
