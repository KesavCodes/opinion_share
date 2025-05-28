import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { QuestionOptionsContext } from "../../../store/questionOptionsContext";
import { colors } from "../../../constants/colors";

const PreviewUserQuestion = () => {
  const { userQuestion } = useContext(QuestionOptionsContext);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Question Preview 🧐</Text>
      <ScrollView style={styles.inputHolder}>
        <Text style={styles.text}>{userQuestion}</Text>
      </ScrollView>
    </View>
  );
};

export default PreviewUserQuestion;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    color: colors.textPrimary,
    fontWeight: 900,
    marginBottom: 10,
},
  inputHolder: {
    padding: 12,
    borderWidth: 0.3,
    borderColor: colors.bgDark,
    borderRadius: 6,
    height: "auto",
    maxHeight: 240,
    backgroundColor: colors.bgSecondary,
    elevation: 24,
  },
  text: {
    fontSize: 16,
    color: colors.textPrimary,
  },
});
