import QuizLogo from "../assets/images/quiz.svg?react";
import useQuiz from "../hooks/useQuiz";

function SelectQuiz() {
  const { dispatch, allCategories } = useQuiz();

  const handleClick = (category: string) => {
    dispatch({ type: "setCategory", payload: category });
  };

  return (
    <div className="flex h-full w-full grow flex-col gap-8 overflow-hidden">
      <QuizLogo className="text-primary mx-auto max-w-72 min-w-40" />
      <h3 className="font-secondary text-base-content mx-auto text-2xl">
        Start by selecting a category
      </h3>
      <div className="grid h-full grow grid-cols-2 gap-6 overflow-y-auto p-6">
        {allCategories &&
          allCategories.map((category) => (
            <button
              key={category}
              className="btn btn-primary btn-soft h-full text-2xl"
              onClick={() => handleClick(category)}
            >
              {category}
            </button>
          ))}
      </div>
    </div>
  );
}

export default SelectQuiz;
