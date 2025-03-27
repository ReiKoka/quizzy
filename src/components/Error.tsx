import ErrorImage from "../assets/images/error.svg?react";
import useQuiz from "../hooks/useQuiz";

function Error() {
  const { dispatch } = useQuiz();

  return (
    <div className="flex h-full w-full flex-col justify-center gap-8">
      <ErrorImage className="text-primary dark:text-secondary mx-auto h-fit w-full max-w-[400px]" />
      <p className="text-primary dark:text-secondary font-secondary mt-4 text-center text-xl font-medium">
        Failed to load questions. Please try again.
      </p>
      <button
        onClick={() => {
          dispatch({ type: "restartQuiz" });
        }}
        className="btn btn-primary mx-auto w-fit text-base"
      >
        Retry
      </button>
    </div>
  );
}

export default Error;
