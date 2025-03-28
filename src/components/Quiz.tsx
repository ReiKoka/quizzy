import useQuiz from "../hooks/useQuiz";
import Error from "./Error";
import Question from "./Question";
import Start from "./Start";
import Infographic from "./ui/Infographic";

import Loader from "./ui/Loader";
import ProgressBar from "./ui/ProgressBar";

function Quiz() {
  const { status } = useQuiz();
  console.log(status);

  return (
    <div className="flex h-full w-full flex-col gap-8">
      <h1 className="font-secondary mt-8 text-center text-4xl font-semibold">
        Welcome to QUIZZY
      </h1>
      {status === "loading" && <Loader />}
      {status === "error" && <Error />}
      {status === "ready" && <Start />}
      {status === "active" && (
        <>
          <Infographic />
          <ProgressBar />
          <Question />
        </>
      )}
    </div>
  );
}

export default Quiz;
