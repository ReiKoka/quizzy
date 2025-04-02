import { useEffect, useState } from "react";
import { BoardSlot, ImagePuzzleQuestion, PuzzlePiece } from "../utils/types";
import { shuffleArray } from "../utils/helpers";

type ImagePuzzleProps = {
  question: ImagePuzzleQuestion;
  onPuzzleSolved: (points: number) => void;
};

function ImagePuzzle({ question, onPuzzleSolved }: ImagePuzzleProps) {
  const [originalPieces, setOriginalPieces] = useState<PuzzlePiece[]>([]);
  const [shuffledPieces, setShuffledPieces] = useState<PuzzlePiece[]>([]);
  const [boardState, setBoardState] = useState<BoardSlot[][]>([]);
  const [isSolved, setIsSolved] = useState(false);
  const { points, gridSize, imageUrl } = question;
  const { rows, cols } = gridSize;
  const [imageNaturalWidth, setImageNaturalWidth] = useState<number>(0);
  const [imageNaturalHeight, setImageNaturalHeight] = useState<number>(0);

  useEffect(() => {
    setBoardState(
      Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => ({
          row: r,
          col: c,
          piece: null,
        })),
      ),
    );
    setOriginalPieces([]);
    setShuffledPieces([]);
    setIsSolved(false);
  }, [cols, rows]);

  useEffect(() => {
    // Only proceed if we have a valid image URL and grid dimensions
    if (!imageUrl || rows <= 0 || cols <= 0) {
      console.warn("Image URL or grid size is invalid.");
      return; // Exit if data is missing
    }

    console.log("Effect: Loading image and calculating pieces...");
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      const naturalWidth = img.naturalWidth;
      const naturalHeight = img.naturalHeight;
      setImageNaturalWidth(naturalWidth);
      setImageNaturalHeight(naturalHeight);

      // Prevent division by zero if image dimensions are zero
      if (naturalWidth === 0 || naturalHeight === 0) {
        console.error("Image has zero dimensions.");
        return;
      }

      const pieceWidth = Math.floor(naturalWidth / cols);
      const pieceHeight = Math.floor(naturalHeight / rows);

      // Ensure calculated piece dimensions are valid
      if (pieceWidth <= 0 || pieceHeight <= 0) {
        console.error(
          "Calculated piece dimensions are invalid (<= 0). Check image size and grid dimensions.",
        );
        return;
      }

      const calculatedPieces: PuzzlePiece[] = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const bgX = -(c * pieceWidth);
          const bgY = -(r * pieceHeight);

          const piece: PuzzlePiece = {
            id: `piece-${r}-${c}`,
            correctRow: r,
            correctCol: c,
            width: pieceWidth,
            height: pieceHeight,
            bgX: bgX,
            bgY: bgY,
          };
          calculatedPieces.push(piece);
        }
      }
      console.log("Calculated pieces data:", calculatedPieces);
      setOriginalPieces(calculatedPieces);
      setShuffledPieces(shuffleArray(calculatedPieces));
    };

    img.onerror = () => {
      console.error(`Error loading image: ${imageUrl}`);
    };
  }, [imageUrl, rows, cols]);

  useEffect(() => {
    if (isSolved) {
      console.log("Puzzle is solved, calling onPuzzleSolved");

      onPuzzleSolved(points);
    }
  }, [isSolved, onPuzzleSolved, points]);

  return (
    <div className="flex grow flex-col items-center gap-6 p-4">
      <div className="relative flex h-16 w-full items-center justify-center px-2 md:h-auto">
        <h4 className="mt-12 max-w-4/5 text-center text-sm font-medium tracking-wide md:mt-0 md:text-base lg:text-2xl">
          Solve the puzzle to get the biggest amount of points!
        </h4>
        <div className="badge badge-sm bg-primary text-primary-content lg:badge-md absolute top-0 right-0 z-10 md:right-2 lg:top-1">
          {question.points} points
        </div>
      </div>

      <div
        className="puzzle-board grid border border-gray-400"
        style={{
          // Example styles, adjust later
          gridTemplateRows: `repeat(${rows}, 80px)`,
          gridTemplateColumns: `repeat(${cols}, 80px)`,
          width: `${cols * 80}px`,
          height: `${rows * 80}px`,
        }}
      >
        {boardState.flat().map((slot) => (
          <div
            key={`slot-${slot.row}-${slot.col}`}
            className="flex items-center justify-center border border-dashed border-gray-300 bg-gray-100 text-xs"
          >
            {`(${slot.row},${slot.col})`}
            {slot.piece
              ? ` Has P-${slot.piece.correctRow}-${slot.piece.correctCol}`
              : ""}
          </div>
        ))}
      </div>

      {!isSolved && (
        <div className="shuffled-pieces mt-4 flex min-h-[100px] w-full max-w-md flex-wrap justify-center gap-2 border border-gray-400 p-4">
          {shuffledPieces.length === 0 ? (
            <span className="text-gray-500">Pieces will appear here...</span>
          ) : (
            shuffledPieces.map((piece) => {
              // Determine the style object conditionally
              const pieceStyle: React.CSSProperties = {
                width: `${piece.width}px`,
                height: `${piece.height}px`,
                // Only add background styles if dimensions are loaded and valid
                ...(imageNaturalWidth > 0 &&
                  imageNaturalHeight > 0 && {
                    backgroundImage: `url(${imageUrl})`,
                    backgroundPosition: `${piece.bgX}px ${piece.bgY}px`,
                    backgroundSize: `${imageNaturalWidth}px ${imageNaturalHeight}px`,
                    backgroundRepeat: "no-repeat",
                  }),
              };

              return (
                <div
                  key={piece.id}
                  className="cursor-grab border border-gray-500 bg-gray-200 shadow-md" // Added bg-gray-200 for fallback
                  style={pieceStyle} // Apply the calculated style
                >
                  {/* Content removed */}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Solved Message */}
      {isSolved && (
        <p className="text-success mt-4 text-xl font-bold">
          Puzzle solved and its points are yours! Finish the quiz to check if
          you won the highscore!
        </p>
      )}
    </div>
  );
}

export default ImagePuzzle;
