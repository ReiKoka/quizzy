export type Theme = "garden" | "sunset";
export type Difficulty = "easy" | "medium" | "hard" | "all";
export type HighScore = {
  highScorePoints: number;
  time: number;
};

export type Question = {
  id: string;
  question: string;
  options: Option[];
  correctAnswerId: string;
  difficulty: Difficulty;
  points: number;
};

export type Option = {
  id: string;
  text: string;
};

export interface QuizType {
  // loading, 'error', 'ready', 'active', 'finished'
  status: "loading" | "error" | "ready" | "active" | "finished";
  index: number;
  answer: string | null;
  points: number;
  highScore: HighScore;
  secondsRemaining: number;
  questions: Question[];
  difficulty: Difficulty;
  numQuestions: number;
  maxPossiblePoints: number;
}
