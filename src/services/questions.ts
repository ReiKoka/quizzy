import axios from "axios";
import { Question } from "../utils/types";
import { URL } from "../utils/constants";

export const getQuestions = async (): Promise<Question[]> => {
  try {
    const response = await axios.get<Question[]>(`${URL}/questions`);
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
