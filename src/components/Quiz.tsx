import useQuiz from "../hooks/useQuiz";
import Error from "./Error";
import Start from "./Start";
import Loader from "./ui/Loader";

function Quiz() {
  const { status } = useQuiz();
  console.log(status);

  return (
    <div className="flex h-full w-full flex-col gap-10">
      <h1 className="font-secondary mt-8 text-center text-4xl font-semibold">
        Welcome to QUIZZY
      </h1>
      {status === "loading" && <Loader />}
      {status === "ready" && <Start />}

      {status === "error" && <Error />}
    </div>
  );
}

export default Quiz;
