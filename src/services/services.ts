import axios from "axios";
import {
  Difficulty,
  HighScore,
  HighscoreExtended,
  ImagePuzzleQuestion,
  MultipleChoiceQuestion,
  NewResultData,
  QuizQuestion,
  Result,
} from "../utils/types";
import { URL } from "../utils/constants";

export const getQuestions = async (
  difficulty: Difficulty = "all",
  category: string,
): Promise<QuizQuestion[]> => {
  try {
    // 1. Getting questions from multichoice questions array first
    //prettier-ignore
    const mcResponse = await axios.get<QuizQuestion[]>(
      `${URL}/multipleChoiceQuestions?category=${category}&${difficulty === "all" ? "" : `difficulty=${difficulty}`}`,
    );
    const mcQuestions: MultipleChoiceQuestion[] =
      mcResponse.data as MultipleChoiceQuestion[];

    // 2. Getting questions from puzzle questions array secondly
    const pzResponse = await axios.get<ImagePuzzleQuestion[]>(
      `${URL}/puzzleQuestions?category=${category}`,
    );
    const pzQuestions: ImagePuzzleQuestion[] =
      pzResponse.data as ImagePuzzleQuestion[];

    // 3. Join them together in one array and return this array;
    const response = [...mcQuestions, ...pzQuestions];
    return response;
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        `${error.message || error} - Failed to get all questions`,
      );
    }
    throw error;
  }
};

export const getCategories = async (): Promise<string[]> => {
  try {
    const response = await axios.get<QuizQuestion[]>(
      `${URL}/multipleChoiceQuestions`,
    );

    const categoriesSet = new Set(
      response.data
        .filter(
          (question): question is QuizQuestion & { category: string } =>
            "category" in question,
        )
        .map((question) => question.category),
    );
    const categories = Array.from(categoriesSet);
    return categories;
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        `${error.message || error} - Failed to get all questions`,
      );
    }
    throw error;
  }
};

export const getHighscore = async (
  category: string,
  difficulty: Difficulty,
): Promise<HighScore> => {
  try {
    const response = await axios.get<HighscoreExtended[]>(
      `${URL}/highestScores?id=${category.toLocaleLowerCase()}_${difficulty.toLocaleLowerCase()}`,
    );
    return {
      highScorePoints: response.data[0]?.score || 0,
      time: response.data[0]?.time || 0,
    };
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        `${error.message || error} - Failed to get highscore for ${category} ${difficulty}`,
      );
    }
    throw error;
  }
};

export const createOrEditHighscore = async (
  name: string,
  category: string,
  difficulty: Difficulty,
  currentResult: HighScore,
): Promise<HighscoreExtended> => {
  const recordId = `${category.toLowerCase()}_${difficulty.toLowerCase()}`;
  const specificUrl = `${URL}/highestScores/${recordId}`;
  const collectionUrl = `${URL}/highestScores`;

  try {
    let recordExists = false;
    let existingData: HighscoreExtended | null = null;
    try {
      const response = await axios.get<HighscoreExtended>(specificUrl);
      existingData = response.data;
      recordExists = true;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        recordExists = false;
      } else {
        throw error;
      }
    }

    if (!recordExists) {
      const newHighscore: HighscoreExtended = {
        id: recordId,
        category: category.toLowerCase(),
        difficultySetting: difficulty,
        userName: name,
        score: currentResult.highScorePoints,
        time: currentResult.time,
        date: new Date().toISOString(),
      };
      const postResponse = await axios.post<HighscoreExtended>(
        collectionUrl,
        newHighscore,
      );
      return postResponse.data;
    } else {
      const updatedHighscore: HighscoreExtended = {
        ...(existingData as HighscoreExtended),
        userName: name,
        score: currentResult.highScorePoints,
        time: currentResult.time,
      };
      const putResponse = await axios.put<HighscoreExtended>(
        specificUrl,
        updatedHighscore,
      );
      return putResponse.data;
    }
  } catch (error) {
    console.error("Error in createOrEditHighscore:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to save high score for ${category} (${difficulty}): ${
          error.response?.data?.message || error.message
        }`,
      );
    }
    throw error;
  }
};

export const getAllResults = async (): Promise<Result[]> => {
  try {
    const response = await axios.get<Result[]>(`${URL}/results?_sort=-date`);
    return response.data;
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to get results ${
          error.response?.data?.message || error.message
        }`,
      );
    }
    throw error;
  }
};

export const createResult = async (
  name: string,
  category: string,
  difficulty: Difficulty,
  points: number,
  maxPossiblePoints: number,
  secondsRemaining: number,
): Promise<Result> => {
  try {
    const newResult: NewResultData = {
      category,
      difficultySetting: difficulty,
      userName: name,
      points,
      maxPossiblePoints,
      totalTimeTaken: maxPossiblePoints - secondsRemaining,
      date: new Date().toISOString(),
    };

    const response = await axios.post<Result>(`${URL}/results`, newResult);
    return response.data;
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to save new result | ${
          error.response?.data?.message || error.message
        }`,
      );
    }
    throw error;
  }
};
