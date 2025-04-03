import { useDraggable } from "@dnd-kit/core";
import { PuzzlePiece } from "../utils/types";

type PlacedPiecePropTypes = {
  piece: PuzzlePiece;
  imageInfo: { url: string; width: number; height: number };
};

export function PlacedPiece({ piece, imageInfo }: PlacedPiecePropTypes) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: piece.id,
  });

  const style: React.CSSProperties = {
    width: `${piece.width}px`,
    height: `${piece.height}px`,
    backgroundImage: `url(${imageInfo.url})`,
    backgroundPosition: `${piece.bgX}px ${piece.bgY}px`,
    backgroundSize: `${imageInfo.width}px ${imageInfo.height}px`,
    backgroundRepeat: "no-repeat",
    cursor: "grab",
    touchAction: "none",
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    zIndex: transform ? 10 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}></div>
  );
}
