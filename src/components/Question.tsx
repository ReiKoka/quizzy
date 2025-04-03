import useQuiz from "../hooks/useQuiz";
import ImagePuzzle from "./ImagePuzzle";
import Options from "./Options";
import ProgressBar from "./ui/ProgressBar";
import { showToast } from "./ui/ShowToast";

function Question() {
  const { questions, index, dispatch } = useQuiz();
  const question = questions[index];

  const handlePuzzleSolved = (pointsAwarded: number) => {
    console.log(`Puzzle solved! Awarding ${pointsAwarded} points.`);
    showToast("success", "Puzzle solved successfully! 😃 ");
    console.log(pointsAwarded);
    dispatch({ type: "puzzleSolved", payload: pointsAwarded });
  };

  return (
    <div className="flex grow flex-col gap-4">
      <ProgressBar />
      {question.type === "multiple-choice" && (
        <>
          <div className="relative flex items-center justify-center px-2">
            <h4 className="mt-12 max-w-4/5 text-center text-sm font-medium tracking-wide md:mt-0 md:text-base lg:text-2xl">
              {question.question}
            </h4>
            <div className="badge badge-sm bg-primary text-primary-content lg:badge-md absolute top-0 md:right-2 lg:top-1">
              {question.points} points
            </div>
          </div>
          <Options question={question} />
        </>
      )}

      {question.type === "image-puzzle" && (
        <ImagePuzzle question={question} onPuzzleSolved={handlePuzzleSolved} />
      )}
    </div>
  );
}

export default Question;
