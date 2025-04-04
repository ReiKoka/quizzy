
import { useDroppable } from "@dnd-kit/core";
import { BoardSlot } from "../utils/types";
import { PlacedPiece } from "./PlacedPiece";

type DroppableSlotProps = {
  slot: BoardSlot;
  imageInfo: { url: string; width: number; height: number };
  isSolved: boolean;
};

export function DroppableSlot({
  slot,
  imageInfo,
  isSolved,
}: DroppableSlotProps) {
  const { isOver, setNodeRef: setDroppableNodeRef } = useDroppable({
    id: `slot-${slot.row}-${slot.col}`,
  });

  return (
    <div
      ref={setDroppableNodeRef}
      className={`flex items-center justify-center text-xs ${isSolved ? "" : "shadow"} ${isOver ? 'bg-primary/20': ''}`}
    >
      {slot.piece && <PlacedPiece piece={slot.piece} imageInfo={imageInfo} />}
    </div>
  );
}
