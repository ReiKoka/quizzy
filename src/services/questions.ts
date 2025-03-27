import axios from "axios";
import { Difficulty, Question } from "../utils/types";
import { URL } from "../utils/constants";

export const getQuestions = async (
  difficulty: Difficulty = "all",
): Promise<Question[]> => {
  try {
    const customUrl = `${URL}/questions/${difficulty === "all" ? "" : `?difficulty=${difficulty}`}`;
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
