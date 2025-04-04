import { useEffect, useState } from "react";
import { BoardSlot, ImagePuzzleQuestion, PuzzlePiece } from "../../utils/types";
import { shuffleArray } from "../../utils/helpers";
import {
  DndContext,
  DragEndEvent,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { DraggablePiece } from "./DraggablePiece";
import { DroppableSlot } from "./DroppableSlot";

type ImagePuzzleProps = {
  question: ImagePuzzleQuestion;
  onPuzzleSolved: (points: number) => void;
};

function ImagePuzzle({ question, onPuzzleSolved }: ImagePuzzleProps) {
  // States to store the pieces in the correct order (original pieces) and shuffled order (shuffled)
  const [originalPieces, setOriginalPieces] = useState<PuzzlePiece[]>([]);
  const [shuffledPieces, setShuffledPieces] = useState<PuzzlePiece[]>([]);

  const [boardState, setBoardState] = useState<BoardSlot[][]>([]);
  const [isSolved, setIsSolved] = useState(false);
  const { points, gridSize, imageUrl } = question;
  const { rows, cols } = gridSize;
  const [imageNaturalWidth, setImageNaturalWidth] = useState<number>(0);
  const [imageNaturalHeight, setImageNaturalHeight] = useState<number>(0);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor),
  );

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
    if (!imageUrl || rows <= 0 || cols <= 0) {
      return;
    }

    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      const { naturalWidth, naturalHeight } = img;
      setImageNaturalWidth(naturalWidth);
      setImageNaturalHeight(naturalHeight);

      if (naturalWidth === 0 || naturalHeight === 0) {
        console.error("Image has zero dimensions.");
        return;
      }

      const pieceWidth =
        naturalWidth < 400
          ? Math.floor(naturalWidth / cols)
          : Math.floor(400 / cols);
      const pieceHeight =
        naturalHeight < 400
          ? Math.floor(naturalHeight / rows)
          : Math.floor(400 / rows);

      console.log(pieceWidth, pieceHeight);

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

      setOriginalPieces(calculatedPieces);
      setShuffledPieces(shuffleArray(calculatedPieces));
    };

    img.onerror = () => {
      console.error(`Error loading image: ${imageUrl}`);
    };
  }, [imageUrl, rows, cols]);

  useEffect(() => {
    if (isSolved) {
      onPuzzleSolved(points);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSolved]);

  function checkCompletion(board: BoardSlot[][]) {
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const slot = board[r][c];

        if (
          !slot.piece ||
          slot.piece.correctRow !== r ||
          slot.piece.correctCol !== c
        ) {
          return;
        }
      }
    }
    setIsSolved(true);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over?.id || !active?.id) {
      console.log("Drag ended without a valid target.");
      return;
    }

    // --- Identify Source and Target ---
    const draggedId = active.id as string; // We know it's a string if we passed validation
    const targetId = over.id as string;

    // Is the dragged item a piece? (Should always be true if validation passed)
    const isPiece = draggedId.startsWith("piece-");
    // Is the target a slot?
    const isTargetSlot = targetId.startsWith("slot-");
    // Could also add a check if target is the shuffled area later

    if (!isPiece) return; // Should not happen

    // --- Determine Source Location ---
    // Check if the piece came from the shuffled list
    const cameFromShuffled = shuffledPieces.some((p) => p.id === draggedId);
    // If not from shuffled, it must have come from the board
    const cameFromBoard = !cameFromShuffled;

    // Find the piece data (it's either in shuffled or original)
    const draggedPieceData = originalPieces.find((p) => p.id === draggedId);
    if (!draggedPieceData) {
      console.error("Cannot find data for dragged piece:", draggedId);
      return;
    }

    // --- Scenario 1: Dropping onto a Board Slot ---
    if (isTargetSlot) {
      const [, slotRowStr, slotColStr] = targetId.split("-");
      const targetRow = parseInt(slotRowStr, 10);
      const targetCol = parseInt(slotColStr, 10);

      if (isNaN(targetRow) || isNaN(targetCol)) return; // Invalid slot ID format

      setBoardState((currentBoard) => {
        const newBoard = currentBoard.map((row) =>
          row.map((slot) => ({ ...slot })),
        );
        const targetSlot = newBoard[targetRow][targetCol];
        const pieceInTargetSlot = targetSlot.piece;

        // Find where the piece came from on the board (if applicable)
        let sourceRow: number | null = null;
        let sourceCol: number | null = null;
        if (cameFromBoard) {
          for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
              if (newBoard[r][c].piece?.id === draggedId) {
                sourceRow = r;
                sourceCol = c;
                break;
              }
            }
            if (sourceRow !== null) break;
          }
        }

        // --- Handle Placement/Swap ---

        // A) Placing into an EMPTY slot
        if (!pieceInTargetSlot) {
          targetSlot.piece = draggedPieceData; // Place the piece

          // If it came from the board, clear the source slot
          if (cameFromBoard && sourceRow !== null && sourceCol !== null) {
            newBoard[sourceRow][sourceCol].piece = null;
          }
          // If it came from shuffled, remove it from shuffled list
          if (cameFromShuffled) {
            setShuffledPieces((current) =>
              current.filter((p) => p.id !== draggedId),
            );
          }

          checkCompletion(newBoard);
          return newBoard;
        }
        // B) SWAPPING with a piece in an OCCUPIED slot
        else if (pieceInTargetSlot && pieceInTargetSlot.id !== draggedId) {
          // Only swap if target isn't the source slot itself
          if (
            cameFromBoard &&
            sourceRow === targetRow &&
            sourceCol === targetCol
          ) {
            return currentBoard; // Dropped back onto itself
          }

          targetSlot.piece = draggedPieceData; // Place dragged piece in target

          // If dragged piece came from the board, put target piece in source slot
          if (cameFromBoard && sourceRow !== null && sourceCol !== null) {
            newBoard[sourceRow][sourceCol].piece = pieceInTargetSlot;
          }
          // If dragged piece came from shuffled, put target piece back in shuffled list
          if (cameFromShuffled) {
            setShuffledPieces((current) =>
              current
                .filter((p) => p.id !== draggedId)
                .concat(pieceInTargetSlot),
            );
          }

          checkCompletion(newBoard);
          return newBoard;
        }

        return currentBoard;
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="flex grow flex-col items-center gap-6 p-4">
        <div className="relative flex h-16 w-full items-center justify-center px-2 md:h-auto">
          <h4 className="mt-12 max-w-4/5 text-center text-sm font-medium tracking-wide md:mt-0 md:text-base lg:text-2xl">
            Solve the puzzle to get the biggest amount of points!
          </h4>
          <div className="badge badge-sm bg-primary text-primary-content lg:badge-md absolute top-0 right-0 z-10 md:right-2 lg:top-1">
            {question.points} points
          </div>
        </div>

        <div className="flex items-center gap-10">
          {!isSolved && (
            <div className="shuffled-pieces flex w-fit flex-wrap justify-center gap-2">
              {shuffledPieces.length !== 0 &&
                shuffledPieces.map((piece) => (
                  <DraggablePiece
                    key={piece.id}
                    piece={piece}
                    imageInfo={{
                      url: imageUrl,
                      width: imageNaturalWidth,
                      height: imageNaturalHeight,
                    }}
                  />
                ))}
            </div>
          )}

          <div
            className="puzzle-board grid min-w-fit overflow-hidden rounded-xl shadow-2xl"
            style={{
              gridTemplateRows: `repeat(${rows}, ${Math.floor(imageNaturalHeight / rows)}px)`,
              gridTemplateColumns: `repeat(${cols}, ${Math.floor(imageNaturalWidth / cols)}px)`,
            }}
          >
            {boardState.flat().map((slot) => (
              <DroppableSlot
                key={`slot-${slot.row}-${slot.col}`}
                slot={slot}
                imageInfo={{
                  url: imageUrl,
                  width: imageNaturalWidth,
                  height: imageNaturalHeight,
                }}
                isSolved={isSolved}
              />
            ))}
          </div>
        </div>
      </div>
    </DndContext>
  );
}

export default ImagePuzzle;
