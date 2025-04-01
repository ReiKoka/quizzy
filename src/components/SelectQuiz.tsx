import QuizLogo from "../assets/images/quiz.svg?react";
import useQuiz from "../hooks/useQuiz";

function SelectQuiz() {
  const { dispatch, allCategories } = useQuiz();

  const handleClick = (category: string) => {
    dispatch({ type: "setCategory", payload: category });
  };

  return (
    <div className="flex h-full w-full grow flex-col justify-between gap-4">
      <QuizLogo className="text-primary md:portrait:max-w-96 max-w-40 xl:max-w-72 justify-center mx-auto" />
      <h3 className="font-secondary text-base-content mx-auto max-w-96 text-center text-sm font-medium md:text-base lg:text-lg ">
        Welcome! Get ready to challenge your brain and have some fun. Let's see
        how much trivia you've got packed in there!
      </h3>

      <h4 className="font-secondary text-primary mx-auto max-w-96 text-center text-base md:text-lg lg:text-xl font-medium">
        Start by selecting a category
      </h4>
      <div className="grid max-h-80 grid-cols-2 gap-4 overflow-y-auto ">
        {allCategories &&
          allCategories.map((category) => (
            <button
              key={category}
              className="btn btn-primary btn-soft h-fit min-h-12 text-sm md:min-h-14 xl:min-h-20"
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
