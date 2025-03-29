import useQuiz from "../hooks/useQuiz";
import Error from "./Error";
import Footer from "./Footer";
import Question from "./Question";
import SelectQuiz from "./SelectQuiz";
import Start from "./Start";
import Infographic from "./ui/Infographic";

import Loader from "./ui/Loader";
import ProgressBar from "./ui/ProgressBar";

function Quiz() {
  const state = useQuiz();
  console.log(state);

  return (
    <div className="flex h-full w-full flex-col gap-8">
      <h1 className="font-secondary mt-8 text-center text-4xl text-primary font-semibold">
        Welcome to QuizzThing
      </h1>
      {state.status === "initial" && <SelectQuiz />}
      {state.status === "loading" && <Loader />}
      {state.status === "error" && <Error />}
      {state.status === "ready" && <Start />}
      {state.status === "active" && (
        <>
          <Infographic />
          <ProgressBar />
          <Question />
          <Footer />
        </>
      )}
    </div>
  );
}

export default Quiz;
