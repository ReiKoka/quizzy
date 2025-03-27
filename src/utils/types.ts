export type Theme = "garden" | "sunset";

export type Question = {
  id: string;
  question: string;
  options: Option[];
  correctAnswerId: string;
  category: string;
  difficulty: string;
  points: number;
};

export type Option = {
  id: string;
  text: string;
};

export type QuizActionType =
  | {
      type: "dataReceived";
      payload: Question[];
    }
  | {
      type: "dataFailed";
    };

export interface QuizType {
  status: string;
  index: number;
  answer: string | null;
  points: number;
  highScore: number;
  secondsRemaining: number;
  filterQuestions: Question[];
  difficulty: "easy" | "medium" | "hard" | "all";
  numQuestions: number;
  maxPossiblePoints: number;
}
