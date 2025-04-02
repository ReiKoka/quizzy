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

export interface BaseQuestion {
  id: string;
  points: number;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  question: string;
  options: Option[];
  correctAnswerId: string;
  difficulty: Difficulty;
  category: string;
}

export interface ImagePuzzleQuestion extends BaseQuestion {
  type: "image-puzzle";
  prompt: string;
  imageUrl: string;
  gridSize: { rows: number; cols: number };
}

export type QuizQuestion = MultipleChoiceQuestion | ImagePuzzleQuestion;

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
  questions: QuizQuestion[];
  difficulty: Difficulty;
  numQuestions: number;
  maxPossiblePoints: number;
  category: string | null;
  allCategories: string[];
  isNewHighScore: boolean;
}
