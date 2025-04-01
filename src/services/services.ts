import axios from "axios";
import {
  Difficulty,
  HighScore,
  HighscoreExtended,
  Question,
} from "../utils/types";
import { URL } from "../utils/constants";

export const getQuestions = async (
  difficulty: Difficulty = "all",
  category: string,
): Promise<Question[]> => {
  try {
    const customUrl = `${URL}/questions?category=${category}&${difficulty === "all" ? "" : `difficulty=${difficulty}`}`;
    const response = await axios.get<Question[]>(customUrl);
    return response.data;
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
    const response = await axios.get<Question[]>(`${URL}/questions`);
    const categoriesSet = new Set(
      response.data.map((question) => question.category),
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
