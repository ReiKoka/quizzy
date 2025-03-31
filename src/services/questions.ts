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
    console.log(customUrl);
    const response = await axios.get<Question[]>(customUrl);
    console.log(response.data);
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
    console.log(response.data);
    return {
      highScorePoints: response.data[0].score,
      time: response.data[0].time,
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
      console.log(`Existing high score found for ID: ${recordId}`);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        recordExists = false;
        console.log(
          `No existing high score found for ID: ${recordId}. Will create.`,
        );
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
      console.log(`Successfully created high score for ${recordId}.`);
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
      console.log(`Successfully updated high score for ${recordId}.`);
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
