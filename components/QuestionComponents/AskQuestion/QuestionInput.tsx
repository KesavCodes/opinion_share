import { StyleSheet, Text, TextInput, View } from "react-native";
import { colors } from "../../../constants/colors";
import { useContext } from "react";
import { QuestionOptionsContext } from "../../../store/questionOptionsContext";

const QuestionInput = () => {
  const { userQuestion, updateUserQuestion } = useContext(
    QuestionOptionsContext
  );
  return (
    <View style={styles.container}>
      <View style={styles.labelHolder}>
        <Text style={styles.label}>What's on your mind? 🤔</Text>
        <Text style={styles.count}>{userQuestion.length}/500</Text>
      </View>
      <View style={styles.inputHolder}>
        <TextInput
          multiline
          numberOfLines={8}
          onChangeText={(text) => updateUserQuestion(text)}
          value={userQuestion}
          style={styles.textInput}
          maxLength={500}
          placeholder="Start typing..."
        />
      </View>
    </View>
  );
};

export default QuestionInput;

const styles = StyleSheet.create({
  container: {
    gap: 8,
    marginHorizontal: 16,
  },
  labelHolder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
  },
  count: {
    fontSize: 16,
    fontWeight: "bold",
  },
  inputHolder: {
    borderWidth: 3,
    borderColor: colors.bgDark,
    borderRadius: 6,
    height: 180,
    backgroundColor: colors.bgSecondary,
    elevation: 16,
  },
  textInput: {
    padding: 10,
    color: colors.textPrimary,
    fontSize: 16,
  },
});
