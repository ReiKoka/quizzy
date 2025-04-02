export type Theme = "garden" | "sunset";
//prettier-ignore
export type StatusType = "initial" | "loading" | "error" | "ready" | "active" | "finished";
export type Difficulty = "easy" | "medium" | "hard" | "all";

export type HighScore = {
  highScorePoints: number;
  time: number;
};

export interface ResultBase {
  id: string;
  category: string;
  difficultySetting: Difficulty;
  userName: string;
  date: string;
}

export interface HighscoreExtended extends ResultBase {
  score: number;
  time: number;
}

export interface Result extends ResultBase {
  points: number;
  maxPossiblePoints: number;
  totalTimeTaken: number;
}

export type NewResultData = Omit<Result, "id">;

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
