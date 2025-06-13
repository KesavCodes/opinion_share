import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/StackNavigation";
import Title from "../components/common/Title";

const QuestionDetailScreen = ({
  route,
}: {
  route: RouteProp<RootStackParamList>;
}) => {
  const questionId = route.params?.questionId;
  return (
    <View>
      <Title />
      <Text>{questionId}</Text>
    </View>
  );
};

export default QuestionDetailScreen;

const styles = StyleSheet.create({});
