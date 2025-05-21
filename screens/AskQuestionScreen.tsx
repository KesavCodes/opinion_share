import ScreenBaseContainer from "../components/ScreenBaseContainer";
import QuestionInput from "../components/QuestionComponents/AskQuestion/QuestionInput";
import { StyleSheet, Text, View } from "react-native";
import Title from "../components/common/Title";
import QuestionOptions from "../components/QuestionComponents/AskQuestion/QuestionOptions";
import Button from "../components/UI/Button";
import { colors } from "../constants/colors";
import { useContext } from "react";
import { QuestionOptionsContext } from "../store/questionOptionsContext";

const AskQuestionScreen = () => {
  console.log(
    useContext(QuestionOptionsContext).userQuestion,
    "---user question"
  );
  console.log(
    useContext(QuestionOptionsContext).selectedOptions,
    "--- options selected"
  );
  return (
    <ScreenBaseContainer>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Title holderStyle={styles.center} />
        </View>
        <QuestionInput />
        <QuestionOptions />
        <View>
          <Button onPressHandler={() => {}} style={styles.ctaBtn}>
            <Text style={styles.labelText}>Preview and Confirm</Text>
          </Button>
        </View>
      </View>
    </ScreenBaseContainer>
  );
};

export default AskQuestionScreen;

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    flex: 1,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  center: {
    alignItems: "center",
  },
  ctaBtn: {
    backgroundColor: colors.bgSecondary,
    paddingVertical: 10,
    marginTop: 24,
    marginHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    elevation: 8,
    borderTopWidth: 0.075,
    borderLeftWidth: 0.25,
    borderRightWidth: 0.25,
    borderBottomWidth: 0.25,
  },
  labelText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
