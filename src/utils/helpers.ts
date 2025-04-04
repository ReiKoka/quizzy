export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function formatSecondsToMMSS(
  totalSeconds: number | null | undefined,
): string {
  if (
    totalSeconds === null ||
    totalSeconds === undefined ||
    isNaN(totalSeconds) ||
    totalSeconds < 0
  ) {
    return "00:00";
  }

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const min = String(minutes).padStart(2, "0");
  const sec = String(seconds).padStart(2, "0");

  return `${min}:${sec}`;
}
