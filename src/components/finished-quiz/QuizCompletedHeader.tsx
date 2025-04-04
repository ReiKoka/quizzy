import useQuiz from "../../hooks/useQuiz";
import NewHighscoreImg from "../../assets/images/highscore.svg?react";
import FinishQuizImg from "../../assets/images/finish-quiz.svg?react";

type QuizCompletedHeaderProps = {
  timeTaken: number;
};

function QuizCompletedHeader({ timeTaken }: QuizCompletedHeaderProps) {
  const { highScoreUpdateInfo, points } = useQuiz();

  const calculateDifference = () => {
    if (!highScoreUpdateInfo.new) return "";
    if (
      highScoreUpdateInfo.prevHighscore &&
      points === highScoreUpdateInfo.prevHighscore.highScorePoints
    ) {
      const diff = Math.abs(timeTaken - highScoreUpdateInfo.prevHighscore.time);
      return `${diff} second${diff !== 1 ? "s" : ""}`;
    } else {
      return highScoreUpdateInfo.prevHighscore
        ? `${points - highScoreUpdateInfo.prevHighscore.highScorePoints} point${points - highScoreUpdateInfo.prevHighscore.highScorePoints !== 1 ? "s" : ""}`
        : "";
    }
  };

  return (
    <>
      {highScoreUpdateInfo.new ? (
        <>
          <h1 className="font-secondary text-center text-lg font-semibold md:text-xl">
            New High Score
          </h1>
          <p className="font-secondary text-secondary text-center text-base font-medium">
            You beat the previous record by {calculateDifference()}!
          </p>
          <NewHighscoreImg className="text-primary animate-jump-in animate-once animate-duration-700 animate-ease-out animate-delay-300 mx-auto w-[250px] max-w-[600px] lg:w-[350px] 2xl:w-[500px] md:portrait:w-[400px]" />
        </>
      ) : (
        <FinishQuizImg className="text-primary animate-jump-in animate-once animate-duration-700 animate-ease-out animate-delay-300 mx-auto w-[250px] max-w-[400px] lg:w-[350px] 2xl:w-[300px] md:portrait:w-[400px]" />
      )}
    </>
  );
}

export default QuizCompletedHeader;
