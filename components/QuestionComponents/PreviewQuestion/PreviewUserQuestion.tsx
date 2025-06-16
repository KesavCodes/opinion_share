import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../../../constants/colors";

type IProps = {
  question: string | undefined;
  type?: string;
};
const PreviewUserQuestion = ({ type, question }: IProps) => {
  if (!question) return null;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Question {type === "preview" && "Preview "}🧐
      </Text>
      <ScrollView style={styles.inputHolder}>
        <Text style={styles.text}>{question}</Text>
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
    marginVertical: 16,
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
