import QuizLogo from "../assets/images/quiz.svg?react";
import useQuiz from "../hooks/useQuiz";

function SelectQuiz() {
  const { dispatch, allCategories } = useQuiz();

  const handleClick = (category: string) => {
    dispatch({ type: "setCategory", payload: category });
  };

  return (
    <div className="flex h-full w-full grow flex-col gap-4 justify-between">
      <div className="flex items-center mx-auto gap-6 ">
        <QuizLogo className="text-primary min-w-40  max-w-72 justify-center" />
        <h3 className="font-secondary text-base-content mx-auto max-w-96 text-center text-lg font-medium">
          Welcome! Get ready to challenge your brain and have some fun. Let's see
          how much trivia you've got packed in there!
        </h3>
      </div>
      <h4 className="font-secondary text-primary mx-auto max-w-96 text-center text-2xl font-medium">Start by selecting a category</h4>
      <div className="grid h-full grow grid-cols-2 gap-4 overflow-y-auto max-h-80">
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
