import { SelectedOptionsType } from "../store/questionOptionsContext";
import api from "./axiosConfig";
import { Alert } from "react-native";

type AddQuestionParams = {
  userId: string;
  userQuestion: string;
  selectedOptions: SelectedOptionsType;
  friendsList: string[];
};

export const getQuestions = async () => {
  try {
    const res = await api.get("/question/");
    return res.data.data;
  } catch (error: any) {
    console.log(error);
    Alert.alert(
      "Failed to fetch questions",
      error.response?.data?.message || error.message
    );
  }
};

export const getQuestionById = async (questionId: string) => {
  try {
    const res = await api.get(`/question/${questionId}`);
    return res.data.data;
  } catch (error: any) {}
};

export const addQuestion = async ({
  userId,
  userQuestion,
  selectedOptions,
  friendsList,
}: AddQuestionParams) => {
  try {
    const body = {
      createdById: userId,
      questionText: userQuestion,
      visibility: selectedOptions.visibility,
      identity: selectedOptions.identity,
      isTimed: selectedOptions.timing === "timed",
      isPublic: selectedOptions.shareBy === "public",
      recipientList: friendsList,
    };
    const res = await api.post("/question/", body);
    return res.data;
  } catch (error: any) {
    console.log(error);
    Alert.alert(
      "Question addition Failed",
      error.response?.data?.message || error.message
    );
  }
};
