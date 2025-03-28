import Icon from "supercons";
import useQuiz from "../hooks/useQuiz";

function Footer() {
  const { secondsRemaining, dispatch, index, numQuestions } = useQuiz();

  const isFinalQuestion = index + 1 === numQuestions;

  const minutes =
    secondsRemaining !== null ? Math.floor(secondsRemaining / 60) : 0;
  const seconds = secondsRemaining !== null ? secondsRemaining % 60 : 0;

  const handleClick = () => {
    if (isFinalQuestion) {
      dispatch({ type: "finishedQuiz" });
      return;
    }

    dispatch({ type: "nextQuestion" });
  };

  return (
    <div className="flex items-center justify-between">
      <p className="font-secondary flex items-center gap-2 text-2xl">
        <Icon glyph="stopwatch" size={26} />
        <span className="countdown">
          <span style={{ "--value": minutes } as React.CSSProperties}></span>:
          <span style={{ "--value": seconds } as React.CSSProperties}></span>
        </span>
      </p>
      <button
        className="btn btn-primary text-primary-content"
        onClick={handleClick}
      >
        {isFinalQuestion ? "Finish Quiz" : "Next Question"}
      </button>
    </div>
  );
}

export default Footer;
