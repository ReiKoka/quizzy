import { useDraggable } from "@dnd-kit/core";
import { PuzzlePiece } from "../utils/types";

type DraggablePiecePropTypes = {
  piece: PuzzlePiece;
  imageInfo: { url: string; width: number; height: number };
};

export function DraggablePiece({ piece, imageInfo }: DraggablePiecePropTypes) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: piece.id,
  });

  const style: React.CSSProperties = {
    width: `${piece.width}px`,
    height: `${piece.height}px`,
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    
    ...(imageInfo.width > 0 &&
      imageInfo.height > 0 && {
        backgroundImage: `url(${imageInfo.url})`,
        backgroundPosition: `${piece.bgX}px ${piece.bgY}px`,
        backgroundSize: `${imageInfo.width}px ${imageInfo.height}px`,
        backgroundRepeat: "no-repeat",
      }),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="cursor-grab touch-none border border-base-300 rounded-md"
      {...listeners}
      {...attributes}
    ></div>
  );
}
