import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getQuestionById } from "../../api/question";
import PreviewUserQuestion from "../QuestionComponents/PreviewQuestion/PreviewUserQuestion";
import { iconMapping } from "../homeComponents/QuestionDrawer";

export type QuestionDetailType = {
  id: string;
  createdAt: string;
  createdById: string;
  endTimeStamp: string | null;
  identity: "showName" | "anonymous";
  visibility: "allHands" | "instantReveal";
  isPublic: boolean;
  isTimed: boolean;
  publicLink: string | null;
  questionText: string;
};

const optionMapping = {
  identity: {
    showName: "Show Name",
    anonymous: "Anonymous",
  },
  visibility: {
    allHands: "All Hands",
    instantReveal: "Instant Reveal",
  },
};

const QuestionTextAndOptions = ({ id }: { id: string }) => {
  const [questionData, setQuestionData] = useState<QuestionDetailType>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    const getQuestion = async () => {
      setIsLoading(true);
      const questionRes: QuestionDetailType = await getQuestionById(id);
      setQuestionData(questionRes);
      setIsLoading(false);
    };
    getQuestion();
  }, []);
  if (isLoading) return <Text>Loading...</Text>;
  if (!questionData) return null;
  return (
    <View>
      <PreviewUserQuestion question={questionData.questionText} />
      <View style={styles.optionContainer}>
        <View style={styles.optionTextHolder}>
          <Text style={styles.optionText}>
            {iconMapping[questionData.identity]}{" "}
          </Text>
          <Text style={styles.optionText}>
            {optionMapping.identity[questionData.identity]}
          </Text>
        </View>
        <View style={styles.optionTextHolder}>
          <Text style={styles.optionText}>
            {" "}
            {iconMapping[questionData.visibility]}{" "}
          </Text>
          <Text style={styles.optionText}>
            {optionMapping.visibility[questionData.visibility]}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default QuestionTextAndOptions;

const styles = StyleSheet.create({
  optionContainer: {
    marginVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  optionTextHolder: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
