import useQuiz from "../hooks/useQuiz";
import Error from "./Error";
import FinishedQuiz from "./FinishedQuiz";
import Footer from "./Footer";
import Question from "./Question";
import SelectQuiz from "./SelectQuiz";
import Start from "./Start";
import Infographic from "./ui/Infographic";

import Loader from "./ui/Loader";
import ProgressBar from "./ui/ProgressBar";

function Quiz() {
  const { status } = useQuiz();

  const insertTitle = () => {
    switch (status) {
      case "initial":
        return "Welcome to QuizzThing!";
      case "ready":
        return "Welcome to QuizzThing!";
      case "active":
        return "It's quiz time!";
      case "finished":
        return "Congratulations! You finished the quiz.";
      default:
        return "";
    }
  };

  return (
    <div className="flex h-full w-full flex-col">
      <h1 className="font-secondary text-primary text-center text-xl md:text-2xl font-semibold md:portrait:my-4 xl:my-6">
        {insertTitle()}
      </h1>
      {status === "initial" && <SelectQuiz />}
      {status === "loading" && <Loader />}
      {status === "error" && <Error />}
      {status === "ready" && <Start />}
      {status === "active" && (
        <div className="flex h-full grow flex-col gap-4">
          <Infographic />
          <ProgressBar />
          <Question />
          <Footer />
        </div>
      )}
      {status === "finished" && <FinishedQuiz />}
    </div>
  );
}

export default Quiz;
