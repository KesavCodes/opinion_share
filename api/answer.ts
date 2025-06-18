import api from "./axiosConfig";
import { Alert } from "react-native";

type AddQuestionParams = {
  userId: string;
  questionId: string;
  answer: string;
};

export const getAnswersForQuestion = async (questionId: string) => {
  try {
    const res = await api.get(`/question/${questionId}/answers?page=1`);
    return res.data.data;
  } catch (error: any) {
    console.log(error);
    Alert.alert(
      "Answers fetch Failed",
      error.response?.data?.message || error.message
    );
  }
};

export const addAnswer = async ({
  userId,
  questionId,
  answer,
}: AddQuestionParams) => {
  try {
    const body = {
      answer,
    };
    const res = await api.post(`/question/${questionId}/answer`, body);
    return res.data.data;
  } catch (error: any) {
    console.log(error);
    Alert.alert(
      "Answer addition Failed",
      error.response?.data?.message || error.message
    );
  }
};
