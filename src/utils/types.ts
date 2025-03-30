export type Theme = "garden" | "sunset";
//prettier-ignore
export type StatusType = "initial" | "loading" | "error" | "ready" | "active" | "finished";
export type Difficulty = "easy" | "medium" | "hard" | "all";

export type HighScore = {
  highScorePoints: number;
  time: number;
};

export type HighscoreExtended = {
  id: string;
  category: string;
  difficultySetting: Difficulty;
  userId: string;
  score: number;
  time: number;
};

export type Question = {
  id: string;
  question: string;
  options: Option[];
  correctAnswerId: string;
  difficulty: Difficulty;
  points: number;
  category: string;
};

export type Option = {
  id: string;
  text: string;
};

export interface QuizType {
  //initial, loading, 'error', 'ready', 'active', 'finished'
  status: StatusType;
  index: number;
  answer: string | null;
  points: number;
  highScore: HighScore;
  secondsRemaining: number;
  questions: Question[];
  difficulty: Difficulty;
  numQuestions: number;
  maxPossiblePoints: number;
  category: string | null;
  allCategories: string[];
  isNewHighScore: boolean;
}
